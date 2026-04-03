import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export interface ItineraryContact {
  phone: string;
  email: string;
  website: string;
  address: string[];
}

export interface ItineraryStay {
  name: string;
  location: string;
  nights: number;
  roomType?: string;
}

export interface ItineraryActivity {
  timeLabel?: string;
  title: string;
  description: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  dateLabel: string;
  title: string;
  location: string;
  summary: string;
  heroImage: string;
  stays?: ItineraryStay[];
  activities: ItineraryActivity[];
  notes?: string[];
  meals?: string[];
  transfers?: string[];
}

export interface ItineraryInclusionGroup {
  title: string;
  items: string[];
}

export interface ItineraryDocument {
  slug: string;
  title: string;
  travelDates: string;
  durationLabel: string;
  groupLabel: string;
  heroImage: string;
  contact: ItineraryContact;
  overview: string;
  published?: boolean;
  travelersSummary: string[];
  inclusions: ItineraryInclusionGroup[];
  exclusions: string[];
  importantNotes: string[];
  days: ItineraryDay[];
}

export const itineraryDocuments: ItineraryDocument[] = [
  {
    slug: 'mis-group-trip',
    title: 'MIS Group Trip',
    travelDates: 'Jun 1, 2025 - Jun 5, 2025',
    durationLabel: '5 Days / 4 Nights',
    groupLabel: 'Private Group Journey',
    heroImage:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80',
    contact: {
      phone: '+255779451655',
      email: 'info@mansatours.com',
      website: 'https://mansatours.com',
      address: ['Mansa Tours & Travel', 'New Mkunazini Rd', 'Stone Town, Zanzibar'],
    },
    overview:
      'A composed Zanzibar group itinerary balancing arrival support, Stone Town atmosphere, coastal time, curated ocean experiences, and smooth departure logistics. The structure is intentionally clean so guests can follow the journey at a glance while still feeling that every day has shape and purpose.',
    published: true,
    travelersSummary: [
      'Arrival support and private airport transfers throughout',
      'Stone Town and coast sequencing designed for group flow',
      'Flexible activity pacing to accommodate shared and private moments',
      'Printable, shareable format for guests before travel',
    ],
    inclusions: [
      {
        title: 'Included',
        items: [
          'Airport arrival and departure transfers',
          'Selected accommodation and daily breakfast',
          'Private ground handling and host coordination',
          'Curated experiences as listed in the day plan',
        ],
      },
      {
        title: 'Support',
        items: [
          'Pre-arrival travel coordination',
          'Day-by-day guest-facing itinerary document',
          'On-ground contact availability during the stay',
        ],
      },
    ],
    exclusions: ['International flights', 'Visa costs', 'Travel insurance', 'Personal expenses and optional extras'],
    importantNotes: [
      'Final timings may shift slightly based on flight schedules, tides, and on-ground conditions.',
      'Where group preferences differ, private adjustments can be layered into the same wider itinerary.',
      'This document is designed as a guest-facing version and can be exported or shared digitally.',
    ],
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        dateLabel: 'Jun 1, 2025',
        title: 'Arrival in Zanzibar',
        location: 'Stone Town',
        summary:
          'Guests arrive into Zanzibar and settle in with light-touch support. The first day prioritizes a smooth landing, clear handover, and enough breathing room to arrive well rather than over-program the day.',
        heroImage:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
        stays: [{ name: 'Stone Town Hotel', location: 'Stone Town', nights: 1, roomType: 'Group rooms' }],
        activities: [
          {
            timeLabel: 'Arrival',
            title: 'Airport Meet and Greet',
            description: 'Private arrival assistance and transfer coordination for the full group.',
          },
          {
            timeLabel: 'Evening',
            title: 'Welcome Briefing',
            description: 'A short orientation covering the itinerary flow, support contacts, and the rhythm of the coming days.',
          },
        ],
        notes: ['Keep the first evening light.', 'Dinner can be arranged privately depending on arrival timing.'],
        meals: ['Dinner on request'],
        transfers: ['Airport to Stone Town hotel transfer'],
      },
      {
        id: 'day-2',
        dayNumber: 2,
        dateLabel: 'Jun 2, 2025',
        title: 'Stone Town and Coastal Transfer',
        location: 'Stone Town to East Coast',
        summary:
          'The second day combines cultural context with movement across the island. It gives the group a grounded introduction to Zanzibar before shifting toward the coast for the slower beach chapter.',
        heroImage:
          'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
        stays: [{ name: 'East Coast Beach Resort', location: 'Paje / Jambiani', nights: 3, roomType: 'Sea-facing rooms' }],
        activities: [
          {
            timeLabel: 'Morning',
            title: 'Stone Town Orientation Walk',
            description: 'A guided walk focused on architecture, history, and the layered identity of the old town.',
          },
          {
            timeLabel: 'Afternoon',
            title: 'Transfer to the Coast',
            description: 'Private road transfer to the beach property with arrival support and room settling.',
          },
        ],
        meals: ['Breakfast included'],
        transfers: ['Stone Town hotel to East Coast resort'],
      },
      {
        id: 'day-3',
        dayNumber: 3,
        dateLabel: 'Jun 3, 2025',
        title: 'Ocean Experience Day',
        location: 'East Coast Waters',
        summary:
          'A dedicated ocean day built around the group’s preferred pace. The structure can remain social and shared, or be broken into more private chapters depending on the group profile.',
        heroImage:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
        activities: [
          {
            timeLabel: 'Morning',
            title: 'Mnemba-style Marine Experience',
            description: 'Time on the water with snorkeling, open-sea views, and a relaxed pacing between stops.',
          },
          {
            timeLabel: 'Late Afternoon',
            title: 'Rest and Beach Time',
            description: 'Return to the resort with room for the group to slow down rather than force another heavy activity block.',
          },
        ],
        meals: ['Breakfast included', 'Light refreshments on board'],
        transfers: ['Return boat and coastal transfer as required'],
      },
      {
        id: 'day-4',
        dayNumber: 4,
        dateLabel: 'Jun 4, 2025',
        title: 'Flexible Group Day',
        location: 'East Coast',
        summary:
          'This day is intentionally designed with flexibility. It can hold a sandbank escape, a slow beach day, optional wellness, or a more private couple/family split within the wider group.',
        heroImage:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
        activities: [
          {
            timeLabel: 'Daytime',
            title: 'Custom Activity Window',
            description: 'Reserved for the group’s preferred activity mix once final travel preferences are confirmed.',
          },
          {
            timeLabel: 'Sunset',
            title: 'Optional Dhow Experience',
            description: 'A quieter sunset dhow option for guests who want a shared final evening on the water.',
          },
        ],
        notes: ['This is the ideal day for customisation in the builder.'],
        meals: ['Breakfast included'],
      },
      {
        id: 'day-5',
        dayNumber: 5,
        dateLabel: 'Jun 5, 2025',
        title: 'Departure Day',
        location: 'Zanzibar Airport',
        summary:
          'The final day closes the journey cleanly, with departure sequencing shaped around guest flight times and luggage logistics.',
        heroImage:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
        activities: [
          {
            timeLabel: 'As Scheduled',
            title: 'Private Departure Transfers',
            description: 'Coordinated transfers to the airport with support aligned to each departure window.',
          },
        ],
        meals: ['Breakfast included where timing allows'],
        transfers: ['Resort to airport transfer'],
      },
    ],
  },
];

export function getItineraryBySlug(slug: string) {
  return itineraryDocuments.find((item) => item.slug === slug) || null;
}

function groupItems<T extends { sort_order?: number | null }>(items: T[]) {
  return items.slice().sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export async function fetchPublishedItineraryBySlug(slug: string): Promise<ItineraryDocument | null> {
  if (!isSupabaseConfigured || !supabase) return getItineraryBySlug(slug);

  try {
    const { data: itinerary, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !itinerary) return getItineraryBySlug(slug);

    const itineraryId = itinerary.id as string;

    const [highlightsRes, groupsRes, exclusionsRes, notesRes, daysRes] = await Promise.all([
      supabase.from('itinerary_highlights').select('*').eq('itinerary_id', itineraryId).order('sort_order'),
      supabase.from('itinerary_inclusion_groups').select('*').eq('itinerary_id', itineraryId).order('sort_order'),
      supabase.from('itinerary_exclusions').select('*').eq('itinerary_id', itineraryId).order('sort_order'),
      supabase.from('itinerary_notes').select('*').eq('itinerary_id', itineraryId).order('sort_order'),
      supabase.from('itinerary_days').select('*').eq('itinerary_id', itineraryId).order('sort_order'),
    ]);

    const days = daysRes.data || [];
    const dayIds = days.map((day) => day.id as string);
    const groupIds = (groupsRes.data || []).map((group) => group.id as string);

    const [
      inclusionItemsRes,
      staysRes,
      activitiesRes,
      mealsRes,
      transfersRes,
      dayNotesRes,
    ] = await Promise.all([
      groupIds.length
        ? supabase.from('itinerary_inclusion_items').select('*').in('group_id', groupIds).order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      dayIds.length
        ? supabase.from('itinerary_day_stays').select('*').in('itinerary_day_id', dayIds).order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      dayIds.length
        ? supabase.from('itinerary_day_activities').select('*').in('itinerary_day_id', dayIds).order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      dayIds.length
        ? supabase.from('itinerary_day_meals').select('*').in('itinerary_day_id', dayIds).order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      dayIds.length
        ? supabase.from('itinerary_day_transfers').select('*').in('itinerary_day_id', dayIds).order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      dayIds.length
        ? supabase.from('itinerary_day_notes').select('*').in('itinerary_day_id', dayIds).order('sort_order')
        : Promise.resolve({ data: [], error: null }),
    ]);

    const inclusionItems = inclusionItemsRes.data || [];
    const stays = staysRes.data || [];
    const activities = activitiesRes.data || [];
    const meals = mealsRes.data || [];
    const transfers = transfersRes.data || [];
    const dayNotes = dayNotesRes.data || [];

    return {
      slug: String(itinerary.slug),
      title: String(itinerary.title || ''),
      travelDates: String(itinerary.travel_dates_label || ''),
      durationLabel: String(itinerary.duration_label || ''),
      groupLabel: String(itinerary.group_label || ''),
      heroImage: String(itinerary.hero_image_url || itineraryDocuments[0]?.heroImage || ''),
      contact: {
        phone: String(itinerary.contact_phone || ''),
        email: String(itinerary.contact_email || ''),
        website: String(itinerary.contact_website || ''),
        address: Array.isArray(itinerary.contact_address_lines)
          ? (itinerary.contact_address_lines as string[])
          : [],
      },
      overview: String(itinerary.overview || ''),
      published: Boolean(itinerary.published),
      travelersSummary: groupItems(highlightsRes.data || []).map((item) => String(item.content || '')),
      inclusions: groupItems(groupsRes.data || []).map((group) => ({
        title: String(group.title || ''),
        items: groupItems(inclusionItems.filter((item) => item.group_id === group.id)).map((item) =>
          String(item.content || '')
        ),
      })),
      exclusions: groupItems(exclusionsRes.data || []).map((item) => String(item.content || '')),
      importantNotes: groupItems(notesRes.data || []).map((item) => String(item.content || '')),
      days: groupItems(days).map((day) => ({
        id: String(day.id),
        dayNumber: Number(day.day_number || 0),
        dateLabel: String(day.date_label || ''),
        title: String(day.title || ''),
        location: String(day.location || ''),
        summary: String(day.summary || ''),
        heroImage: String(day.hero_image_url || itinerary.hero_image_url || ''),
        stays: groupItems(stays.filter((item) => item.itinerary_day_id === day.id)).map((item) => ({
          name: String(item.name || ''),
          location: String(item.location || ''),
          nights: Number(item.nights || 1),
          roomType: item.room_type ? String(item.room_type) : undefined,
        })),
        activities: groupItems(activities.filter((item) => item.itinerary_day_id === day.id)).map((item) => ({
          timeLabel: item.time_label ? String(item.time_label) : undefined,
          title: String(item.title || ''),
          description: String(item.description || ''),
        })),
        meals: groupItems(meals.filter((item) => item.itinerary_day_id === day.id)).map((item) =>
          String(item.content || '')
        ),
        transfers: groupItems(transfers.filter((item) => item.itinerary_day_id === day.id)).map((item) =>
          String(item.content || '')
        ),
        notes: groupItems(dayNotes.filter((item) => item.itinerary_day_id === day.id)).map((item) =>
          String(item.content || '')
        ),
      })),
    };
  } catch {
    return getItineraryBySlug(slug);
  }
}
