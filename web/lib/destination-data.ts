export type DestinationRegion = 'zanzibar' | 'mainland';

export type Destination = {
  slug: string;
  region: DestinationRegion;
  title: string;
  shortDescription: string;
  heroImage: string;
  intro: string;
  pace: string;
  bestFor: string;
  routeSegment?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  introParagraphs?: string[];
  areaCards?: {
    title: string;
    description: string;
    traits: string[];
    bestFor: string[];
  }[];
  activityLinks?: {
    label: string;
    href: string;
  }[];
  staysIntro?: string;
  hotels?: {
    name: string;
    descriptor: string;
    image: string;
  }[];
};

export type MapZone = {
  slug: string;
  label: string;
  tooltip: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const zanzibarDestinations: Destination[] = [
  {
    slug: 'north-coast',
    region: 'zanzibar',
    title: 'North Coast',
    shortDescription:
      'Zanzibar’s most active beach area, known for its swimmable waters and sunset coastline.',
    heroImage:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
    intro:
      'The North Coast combines some of Zanzibar’s most swimmable beaches with a more social coastal atmosphere. It works well for guests who want a stronger beach chapter, easier sea access, and a livelier rhythm in the evenings.',
    pace: 'Balanced and beach-led, with a more active coastal atmosphere.',
    bestFor: 'First-time visitors, couples, and guests who want easy beach time with stronger sunset energy.',
    routeSegment: 'zanzibar',
    heroTitle: 'North Coast',
    heroSubtitle:
      'Zanzibar’s most swimmable and accessible coastline, known for its clear waters, sunset views, and variety of beach experiences.',
    introParagraphs: [
      'Located at the northern tip of Zanzibar, this region offers some of the island’s most consistent beach conditions, with minimal tidal impact and easy access to the ocean throughout the day.',
      'It combines a range of settings — from lively beachfront areas to quieter, more private stretches — making it one of the most versatile parts of the island to stay in.',
    ],
    areaCards: [
      {
        title: 'Nungwi',
        description:
          'Zanzibar’s most active beach area, with a wide range of hotels, restaurants, and direct access to swimmable waters throughout the day.',
        traits: ['Swimmable Beaches', 'Lively', 'Sunset Views'],
        bestFor: ['First-time visitors', 'Groups', 'Easy, accessible stays'],
      },
      {
        title: 'Kendwa',
        description:
          'A more open and relaxed beachfront setting, offering calm waters and a quieter atmosphere while still maintaining access to beach activity and dining.',
        traits: ['Swimmable Beaches', 'Relaxed but Social', 'Open Beachfront'],
        bestFor: ['Couples', 'Honeymooners', 'Balanced stays'],
      },
      {
        title: 'Kidoti',
        description:
          'A quieter and more private stretch of coastline, offering a more natural and secluded experience away from the busier areas.',
        traits: ['Quiet', 'Secluded', 'Nature-focused'],
        bestFor: ['Couples', 'Privacy seekers', 'High-end travelers'],
      },
    ],
    activityLinks: [
      { label: 'Mnemba Island Marine Experience', href: '/experiences/mnemba-island-marine-experience' },
      { label: 'Sunset Dhow Cruise', href: '/experiences/dhow-sunset-cruise' },
      { label: 'Watersports', href: '/plan-your-trip' },
      { label: 'Skydiving', href: '/plan-your-trip' },
      { label: 'Horse Riding', href: '/plan-your-trip' },
      { label: 'Aquarium Visit', href: '/plan-your-trip' },
    ],
    staysIntro:
      'Accommodation is selected based on your preferences, travel dates, and availability. These are examples of properties commonly used in this area.',
    hotels: [
      {
        name: 'Zuri Zanzibar',
        descriptor: 'A design-led northern coast stay with a more private, premium feel.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'The Z Hotel Zanzibar',
        descriptor: 'A central Nungwi base with direct beach access and easier walkability.',
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Kidoti Villas by Z',
        descriptor: 'A quieter and more secluded option for guests prioritising privacy.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Hotel Riu Jambo',
        descriptor: 'A lively beachfront option suited to easier, more social stays.',
        image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Hotel Riu Palace Zanzibar',
        descriptor: 'An adults-focused stay with a stronger premium positioning.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Hotel Riu Palace Swahili',
        descriptor: 'A polished resort base with strong access to the northern coastline.',
        image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Nungwi Dreams by Mantis',
        descriptor: 'A modern stay that works well for a softer beach chapter.',
        image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Gold Zanzibar Beach House & Spa',
        descriptor: 'A Kendwa stay known for open beachfront and stronger sunset atmosphere.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Essque Zalu Zanzibar',
        descriptor: 'A more distinctive architectural stay with quieter positioning.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Sunset Kendwa Beach Hotel',
        descriptor: 'A beach-facing option well suited to a simpler Kendwa stay.',
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Kendwa Rocks Hotel',
        descriptor: 'A more social Kendwa option with direct access to the open beachfront.',
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    slug: 'northeast-coast',
    region: 'zanzibar',
    title: 'Northeast Coast',
    shortDescription:
      'Clear waters and quieter beaches, ideal for premium stays.',
    heroImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    intro:
      'The Northeast Coast is shaped by lighter, clearer waters and a calmer overall feel. It is often one of the strongest areas for premium stays, private marine experiences, and a more composed beach chapter.',
    pace: 'Quieter, more polished, and suited to a slower premium stay.',
    bestFor: 'Private stays, premium hotels, and marine-focused journeys.',
    routeSegment: 'zanzibar',
  },
  {
    slug: 'stone-town',
    region: 'zanzibar',
    title: 'Stone Town',
    shortDescription:
      'Historic center with cultural depth and architectural character.',
    heroImage:
      'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Stone Town brings historical depth, architecture, and cultural texture into a Zanzibar journey. It is best used as the place where the island first becomes legible, adding context before guests move into the coast.',
    pace: 'Layered, cultural, and best experienced at a measured pace.',
    bestFor: 'Travelers who want heritage, architecture, and stronger local context.',
    routeSegment: 'zanzibar',
  },
  {
    slug: 'southeast-coast',
    region: 'zanzibar',
    title: 'Southeast Coast',
    shortDescription:
      'Laid-back villages with a strong lifestyle and ocean focus.',
    heroImage:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    intro:
      'The Southeast Coast is known for its slower villages, ocean rhythm, and lifestyle-oriented feel. It works well when a journey needs softer pacing, longer beach days, and a destination with a little more texture than a pure resort stay.',
    pace: 'Relaxed, village-led, and strongly connected to daily coastal life.',
    bestFor: 'Longer stays, slower travel, and guests who want a softer local atmosphere.',
    routeSegment: 'zanzibar',
  },
  {
    slug: 'south-coast',
    region: 'zanzibar',
    title: 'South Coast',
    shortDescription:
      'More remote and less developed, offering privacy and quiet.',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    intro:
      'The South Coast is more remote, less developed, and often chosen for privacy. It suits journeys that want quiet, distance from busier areas, and a more stripped-back connection to place.',
    pace: 'Remote, quiet, and lower-density by design.',
    bestFor: 'Guests prioritising privacy, quiet, and a less developed coastline.',
    routeSegment: 'zanzibar',
  },
];

export const mainlandDestinations: Destination[] = [
  {
    slug: 'northern-circuit',
    region: 'mainland',
    title: 'Northern Circuit',
    shortDescription:
      'Tanzania’s most iconic safari region, offering some of the best wildlife experiences in the world across diverse and dramatic landscapes.',
    heroImage:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
    intro:
      'The Northern Circuit is Tanzania’s most iconic safari region, bringing together strong wildlife viewing, dramatic landscapes, and the best-known national parks. It is often the right fit for a first safari or a classic extension from Zanzibar.',
    pace: 'Strong safari rhythm with clear, iconic movement between parks.',
    bestFor: 'First-time safari travelers and guests wanting Tanzania’s most recognized wildlife route.',
    routeSegment: 'mainland-tanzania',
  },
  {
    slug: 'southern-circuit',
    region: 'mainland',
    title: 'Southern Circuit',
    shortDescription:
      'A more remote and less crowded safari experience, known for its scale, raw landscapes, and sense of true wilderness.',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    intro:
      'The Southern Circuit offers a more remote safari atmosphere, with larger scale, fewer crowds, and a stronger sense of wilderness. It suits travelers who want safari to feel less familiar and more expansive.',
    pace: 'More remote and immersive, with a stronger wilderness character.',
    bestFor: 'Guests wanting a quieter, less crowded safari chapter.',
    routeSegment: 'mainland-tanzania',
  },
  {
    slug: 'kilimanjaro',
    region: 'mainland',
    title: 'Kilimanjaro',
    shortDescription:
      'Africa’s highest peak and one of the world’s most recognised climbs, offering a challenging and rewarding high-altitude experience.',
    heroImage:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Kilimanjaro is less about safari and more about ascent, structure, and endurance. It is a destination for travelers who want one of Africa’s defining climbs as the main purpose of the journey.',
    pace: 'Purposeful, physical, and shaped around ascent structure.',
    bestFor: 'Climbers and guests building a peak-led Tanzania journey.',
    routeSegment: 'mainland-tanzania',
  },
  {
    slug: 'mahale-mountains',
    region: 'mainland',
    title: 'Mahale Mountains',
    shortDescription:
      'A remote and unique destination where forested mountains meet the shores of Lake Tanganyika, known for chimpanzee tracking.',
    heroImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Mahale Mountains is one of Tanzania’s most distinctive remote destinations, combining forest, lake, and chimpanzee tracking. It is best suited to travelers seeking something rarer and less conventional.',
    pace: 'Remote, specialist, and more expedition-like in feel.',
    bestFor: 'Repeat Tanzania travelers and guests wanting unusual, high-value wilderness experiences.',
    routeSegment: 'mainland-tanzania',
  },
  {
    slug: 'mafia-island',
    region: 'mainland',
    title: 'Mafia Island',
    shortDescription:
      'A quiet and untouched island focused on marine life, offering some of the region’s best diving and snorkeling experiences.',
    heroImage:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Mafia Island is quieter and more marine-led than Zanzibar, offering a different type of island chapter focused on diving, snorkeling, and a calmer sense of seclusion.',
    pace: 'Marine-focused, quiet, and lightly developed.',
    bestFor: 'Divers, marine travelers, and guests wanting a quieter island alternative.',
    routeSegment: 'mainland-tanzania',
  },
];

export const allDestinations = [...zanzibarDestinations, ...mainlandDestinations];

export const zanzibarMapZones: MapZone[] = [
  { slug: 'north-coast', label: 'Nungwi', tooltip: 'Nungwi — Swimmable beaches & lively atmosphere', x: 106, y: 18, w: 70, h: 28 },
  { slug: 'north-coast', label: 'Kendwa', tooltip: 'Kendwa — Sunset coastline & easy beach time', x: 22, y: 30, w: 64, h: 26 },
  { slug: 'north-coast', label: 'Kidoti', tooltip: 'Kidoti — Quieter northern inlets and softer pace', x: 48, y: 64, w: 64, h: 26 },
  { slug: 'northeast-coast', label: 'Northeast Coast', tooltip: 'Northeast Coast — Clear water & premium stays', x: 132, y: 92, w: 104, h: 62 },
  { slug: 'stone-town', label: 'Stone Town', tooltip: 'Stone Town — Cultural depth & architectural character', x: 24, y: 170, w: 92, h: 36 },
  { slug: 'southeast-coast', label: 'Southeast Coast', tooltip: 'Southeast Coast — Laid-back villages & ocean rhythm', x: 108, y: 230, w: 128, h: 64 },
  { slug: 'south-coast', label: 'South Coast', tooltip: 'South Coast — Remote privacy & quieter coastline', x: 74, y: 316, w: 108, h: 44 },
];

export const mainlandMapZones: MapZone[] = [
  { slug: 'northern-circuit', label: 'Northern Circuit', tooltip: 'Northern Circuit — Iconic parks and classic safari flow', x: 70, y: 30, w: 126, h: 62 },
  { slug: 'kilimanjaro', label: 'Kilimanjaro', tooltip: 'Kilimanjaro — High-altitude climb and mountain-led travel', x: 210, y: 18, w: 84, h: 42 },
  { slug: 'southern-circuit', label: 'Southern Circuit', tooltip: 'Southern Circuit — Wilder, larger, less crowded safari', x: 96, y: 150, w: 150, h: 84 },
  { slug: 'mahale-mountains', label: 'Mahale Mountains', tooltip: 'Mahale Mountains — Chimpanzees, forest, and Lake Tanganyika', x: 8, y: 170, w: 78, h: 88 },
  { slug: 'mafia-island', label: 'Mafia Island', tooltip: 'Mafia Island — Marine life, diving, and quiet island time', x: 266, y: 246, w: 82, h: 46 },
];

export function getDestinationBySlug(slug: string) {
  return allDestinations.find((destination) => destination.slug === slug);
}

export function getDestinationHref(destination: Destination) {
  return `/destinations/${destination.routeSegment || destination.region}/${destination.slug}`;
}

export function getDestinationByRegionAndSlug(region: string, slug: string) {
  return allDestinations.find(
    (destination) =>
      destination.slug === slug &&
      (destination.routeSegment || destination.region) === region
  );
}
