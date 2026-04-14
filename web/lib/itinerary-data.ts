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
    title: 'Zanzibar Coast & Culture Journey',
    travelDates: 'Jun 1, 2026 - Jun 5, 2026',
    durationLabel: '5 Days / 4 Nights',
    groupLabel: 'Private Journey Example',
    heroImage:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80',
    contact: {
      phone: '+255 779 451 655',
      email: 'info@mansa.travel',
      website: 'https://mansa.travel',
      address: ['Mansa Tours & Travel', 'Zanzibar', 'Tanzania'],
    },
    overview:
      'A structured Zanzibar journey designed to show how accommodation, logistics, and experiences can be brought together into one clear guest-facing plan. The flow balances arrival ease, cultural context, coastline time, and enough flexibility for the trip to feel considered rather than over-programmed.',
    published: true,
    travelersSummary: [
      'Private airport support and well-timed transfers throughout the stay',
      'A clean journey flow that connects Stone Town with the North Coast',
      'Curated marine, cultural, and slower-paced coastal experiences',
      'A guest-facing structure that is easy to share, review, and refine',
    ],
    inclusions: [
      {
        title: 'Included Services',
        items: [
          'Private airport arrival and departure transfers',
          'Selected accommodation and daily breakfast',
          'Ground coordination and itinerary support throughout',
          'Curated experiences as outlined in the day-by-day plan',
        ],
      },
      {
        title: 'Planning & Support',
        items: [
          'Pre-arrival planning and travel coordination',
          'Guest-facing itinerary document prepared for review before travel',
          'Direct on-ground contact during the stay',
        ],
      },
    ],
    exclusions: [
      'International flights',
      'Visa costs',
      'Travel insurance',
      'Personal expenses and optional activities not listed in the itinerary',
    ],
    importantNotes: [
      'Final timing can shift slightly depending on flights, tides, weather, and operational conditions on the ground.',
      'Experiences can be adjusted in privacy level, pace, and timing once travel preferences are confirmed.',
      'This sample is intended to show structure, tone, and guest presentation rather than lock in final arrangements.',
    ],
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        dateLabel: 'Jun 1, 2026',
        title: 'Arrival in Zanzibar',
        location: 'Stone Town',
        summary:
          'Arrival day is kept clear and well-paced. The focus is on a smooth airport handover, an easy hotel arrival, and enough room for guests to settle in properly before the journey begins in full.',
        heroImage:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
        stays: [
          {
            name: 'Selected Stone Town hotel',
            location: 'Stone Town',
            nights: 1,
            roomType: 'Standard room category',
          },
        ],
        activities: [
          {
            timeLabel: 'Arrival',
            title: 'Airport meet and greet',
            description: 'Private arrival assistance with direct transfer coordination from the airport to the hotel.',
          },
          {
            timeLabel: 'Evening',
            title: 'Welcome orientation',
            description: 'A short arrival briefing covering the journey flow, support contacts, and the rhythm of the coming days.',
          },
        ],
        notes: [
          'The first evening is intentionally light to allow guests to arrive well.',
          'Private dinner arrangements can be added depending on flight timing.',
        ],
        meals: ['Dinner can be arranged on request'],
        transfers: ['Airport to Stone Town hotel transfer'],
      },
      {
        id: 'day-2',
        dayNumber: 2,
        dateLabel: 'Jun 2, 2026',
        title: 'Stone Town and Transfer to the North Coast',
        location: 'Stone Town to North Coast',
        summary:
          'The second day gives the journey cultural context before shifting toward the beach. It is designed to move guests through Stone Town with enough depth, then transition cleanly to the North Coast for the next chapter of the stay.',
        heroImage:
          'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
        stays: [
          {
            name: 'Selected North Coast resort',
            location: 'Nungwi / Kendwa',
            nights: 3,
            roomType: 'Garden or sea-facing room category',
          },
        ],
        activities: [
          {
            timeLabel: 'Morning',
            title: 'Stone Town cultural walk',
            description: 'A guided introduction to the old town, with a focus on architecture, history, and cultural context.',
          },
          {
            timeLabel: 'Afternoon',
            title: 'Private transfer to the coast',
            description: 'Road transfer to the North Coast with arrival support and time to settle into the beach property.',
          },
        ],
        meals: ['Breakfast included'],
        transfers: ['Stone Town hotel to North Coast resort'],
      },
      {
        id: 'day-3',
        dayNumber: 3,
        dateLabel: 'Jun 3, 2026',
        title: 'Marine Experience and Coastline Time',
        location: 'North Coast Waters',
        summary:
          'This day is shaped around Zanzibar’s marine side, with enough structure for a clear guest experience and enough space for the day to remain relaxed rather than rushed.',
        heroImage:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
        activities: [
          {
            timeLabel: 'Morning',
            title: 'Mnemba marine experience',
            description: 'A morning on the water built around snorkeling, open-sea views, and a relaxed pace between stops.',
          },
          {
            timeLabel: 'Afternoon',
            title: 'Beach and recovery time',
            description: 'The afternoon is left open for rest, beach time, or a lighter resort-based pace after the marine experience.',
          },
        ],
        meals: ['Breakfast included', 'Light refreshments on board'],
        transfers: ['Boat departure and return transfers as required'],
      },
      {
        id: 'day-4',
        dayNumber: 4,
        dateLabel: 'Jun 4, 2026',
        title: 'Flexible North Coast Day',
        location: 'North Coast',
        summary:
          'The fourth day is intentionally flexible. It can hold a slower beach rhythm, an additional private experience, or a lightly structured split depending on how guests want the journey to feel by this point.',
        heroImage:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
        activities: [
          {
            timeLabel: 'Daytime',
            title: 'Custom planning window',
            description: 'Reserved for the preferred mix of downtime, coastline time, or an additional curated experience.',
          },
          {
            timeLabel: 'Sunset',
            title: 'Optional sunset dhow',
            description: 'A softer shared evening option for guests who want a final moment on the water before departure day.',
          },
        ],
        notes: [
          'This is the most flexible day in the sample and is the easiest one to tailor around guest preferences.',
        ],
        meals: ['Breakfast included'],
      },
      {
        id: 'day-5',
        dayNumber: 5,
        dateLabel: 'Jun 5, 2026',
        title: 'Departure Support',
        location: 'Zanzibar Airport',
        summary:
          'The final day is structured around a clean departure process, with transfer timing and airport support adjusted to guest flight windows.',
        heroImage:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
        activities: [
          {
            timeLabel: 'As Scheduled',
            title: 'Private departure transfers',
            description: 'Coordinated airport transfers arranged against the confirmed departure schedule.',
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
