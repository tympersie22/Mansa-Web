import { NextResponse } from 'next/server';
import {
  getActorWithProfile,
  getServiceClient,
  getUserRole,
  logAdminAction,
  requireAuthenticatedUser,
} from '../../_lib';

type ItineraryPayload = {
  slug: string;
  title: string;
  travelDates: string;
  durationLabel: string;
  groupLabel: string;
  heroImage: string;
  overview: string;
  published?: boolean;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string[];
  };
  travelersSummary: string[];
  inclusions: Array<{ title: string; items: string[] }>;
  exclusions: string[];
  importantNotes: string[];
  days: Array<{
    id: string;
    dayNumber: number;
    dateLabel: string;
    title: string;
    location: string;
    summary: string;
    heroImage: string;
    stays?: Array<{ name: string; location: string; nights: number; roomType?: string }>;
    activities: Array<{ timeLabel?: string; title: string; description: string }>;
    notes?: string[];
    meals?: string[];
    transfers?: string[];
  }>;
};

export async function PUT(req: Request, context: { params: Promise<{ slug: string }> }) {
  const auth = await requireAuthenticatedUser(req);
  if ('error' in auth) return auth.error;

  const service = getServiceClient();
  if (!service) {
    return NextResponse.json({ ok: false, error: 'Service role is not configured' }, { status: 500 });
  }

  const role = await getUserRole(service, auth.user.id);
  if (!role) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const { slug } = await context.params;
  const body = (await req.json()) as ItineraryPayload;
  if (!slug || !body?.title || !body?.travelDates) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  const normalizedSlug = String(slug).trim().toLowerCase();
  const now = new Date().toISOString();

  const { data: itinerary, error: itineraryError } = await service
    .from('itineraries')
    .upsert(
      {
        slug: normalizedSlug,
        title: body.title,
        travel_dates_label: body.travelDates,
        duration_label: body.durationLabel,
        group_label: body.groupLabel,
        hero_image_url: body.heroImage,
        overview: body.overview,
        contact_phone: body.contact.phone,
        contact_email: body.contact.email,
        contact_website: body.contact.website,
        contact_address_lines: body.contact.address,
        published: body.published ?? true,
        updated_at: now,
      },
      { onConflict: 'slug' }
    )
    .select('id, slug, published')
    .single();

  if (itineraryError || !itinerary) {
    return NextResponse.json({ ok: false, error: itineraryError?.message || 'Unable to save itinerary' }, { status: 500 });
  }

  const itineraryId = itinerary.id as string;

  await service.from('itinerary_highlights').delete().eq('itinerary_id', itineraryId);
  await service.from('itinerary_exclusions').delete().eq('itinerary_id', itineraryId);
  await service.from('itinerary_notes').delete().eq('itinerary_id', itineraryId);

  const { data: existingGroups } = await service
    .from('itinerary_inclusion_groups')
    .select('id')
    .eq('itinerary_id', itineraryId);
  const groupIds = (existingGroups || []).map((group) => group.id as string);
  if (groupIds.length) {
    await service.from('itinerary_inclusion_items').delete().in('group_id', groupIds);
  }
  await service.from('itinerary_inclusion_groups').delete().eq('itinerary_id', itineraryId);

  const { data: existingDays } = await service
    .from('itinerary_days')
    .select('id')
    .eq('itinerary_id', itineraryId);
  const dayIds = (existingDays || []).map((day) => day.id as string);
  if (dayIds.length) {
    await Promise.all([
      service.from('itinerary_day_stays').delete().in('itinerary_day_id', dayIds),
      service.from('itinerary_day_activities').delete().in('itinerary_day_id', dayIds),
      service.from('itinerary_day_meals').delete().in('itinerary_day_id', dayIds),
      service.from('itinerary_day_transfers').delete().in('itinerary_day_id', dayIds),
      service.from('itinerary_day_notes').delete().in('itinerary_day_id', dayIds),
    ]);
  }
  await service.from('itinerary_days').delete().eq('itinerary_id', itineraryId);

  if (body.travelersSummary.length) {
    const { error } = await service.from('itinerary_highlights').insert(
      body.travelersSummary.map((content, index) => ({
        itinerary_id: itineraryId,
        content,
        sort_order: index + 1,
      }))
    );
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (body.exclusions.length) {
    const { error } = await service.from('itinerary_exclusions').insert(
      body.exclusions.map((content, index) => ({
        itinerary_id: itineraryId,
        content,
        sort_order: index + 1,
      }))
    );
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (body.importantNotes.length) {
    const { error } = await service.from('itinerary_notes').insert(
      body.importantNotes.map((content, index) => ({
        itinerary_id: itineraryId,
        content,
        sort_order: index + 1,
      }))
    );
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (body.inclusions.length) {
    const groupsToInsert = body.inclusions.map((group, index) => ({
      itinerary_id: itineraryId,
      title: group.title,
      sort_order: index + 1,
    }));
    const { data: insertedGroups, error: groupsError } = await service
      .from('itinerary_inclusion_groups')
      .insert(groupsToInsert)
      .select('id, title');

    if (groupsError) return NextResponse.json({ ok: false, error: groupsError.message }, { status: 500 });

    const groupMap = new Map((insertedGroups || []).map((group) => [group.title as string, group.id as string]));
    const itemsToInsert = body.inclusions.flatMap((group) =>
      group.items.map((content, index) => ({
        group_id: groupMap.get(group.title),
        content,
        sort_order: index + 1,
      }))
    ).filter((item) => item.group_id);

    if (itemsToInsert.length) {
      const { error } = await service.from('itinerary_inclusion_items').insert(itemsToInsert);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  }

  if (body.days.length) {
    const daysToInsert = body.days.map((day, index) => ({
      itinerary_id: itineraryId,
      day_number: day.dayNumber,
      date_label: day.dateLabel,
      title: day.title,
      location: day.location,
      summary: day.summary,
      hero_image_url: day.heroImage,
      sort_order: index + 1,
      updated_at: now,
    }));

    const { data: insertedDays, error: daysError } = await service
      .from('itinerary_days')
      .insert(daysToInsert)
      .select('id, day_number');

    if (daysError) return NextResponse.json({ ok: false, error: daysError.message }, { status: 500 });

    const dayMap = new Map((insertedDays || []).map((day) => [Number(day.day_number), String(day.id)]));

    const stays = body.days.flatMap((day) =>
      (day.stays || []).map((stay, index) => ({
        itinerary_day_id: dayMap.get(day.dayNumber),
        name: stay.name,
        location: stay.location,
        nights: stay.nights,
        room_type: stay.roomType || null,
        sort_order: index + 1,
      }))
    ).filter((item) => item.itinerary_day_id);

    const activities = body.days.flatMap((day) =>
      day.activities.map((activity, index) => ({
        itinerary_day_id: dayMap.get(day.dayNumber),
        time_label: activity.timeLabel || null,
        title: activity.title,
        description: activity.description,
        sort_order: index + 1,
      }))
    ).filter((item) => item.itinerary_day_id);

    const meals = body.days.flatMap((day) =>
      (day.meals || []).map((content, index) => ({
        itinerary_day_id: dayMap.get(day.dayNumber),
        content,
        sort_order: index + 1,
      }))
    ).filter((item) => item.itinerary_day_id);

    const transfers = body.days.flatMap((day) =>
      (day.transfers || []).map((content, index) => ({
        itinerary_day_id: dayMap.get(day.dayNumber),
        content,
        sort_order: index + 1,
      }))
    ).filter((item) => item.itinerary_day_id);

    const dayNotes = body.days.flatMap((day) =>
      (day.notes || []).map((content, index) => ({
        itinerary_day_id: dayMap.get(day.dayNumber),
        content,
        sort_order: index + 1,
      }))
    ).filter((item) => item.itinerary_day_id);

    for (const [table, payload] of [
      ['itinerary_day_stays', stays],
      ['itinerary_day_activities', activities],
      ['itinerary_day_meals', meals],
      ['itinerary_day_transfers', transfers],
      ['itinerary_day_notes', dayNotes],
    ] as const) {
      if (!payload.length) continue;
      const { error } = await service.from(table).insert(payload);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  }

  const actor = await getActorWithProfile(service, auth.user);
  await logAdminAction(service, 'itinerary.update', 'itinerary', itineraryId, actor, {
    slug: normalizedSlug,
    published: body.published ?? true,
    dayCount: body.days.length,
    role,
  });

  return NextResponse.json({ ok: true, slug: normalizedSlug, published: body.published ?? true });
}
