export const siteName = 'MANSA TOURS AND TRAVEL';

export const heroVideo =
  '/videos/web-mansa.m4v?v=3';

export const introImage =
  '/images/home/pexels-taryn-elliott-5859213.jpg';

interface HomepageExperience {
  title: string;
  description: string;
  href: string;
  image: string;
  imagePosition?: string;
  imageFit?: 'cover' | 'contain';
}

export const experiences: HomepageExperience[] = [
  {
    title: 'Ocean & Island',
    description: 'Private dhow charters, reef escapes, sandbanks, and tide-shaped days on the water.',
    href: '/experiences/ocean-and-islands',
    image: '/images/experiences/pexels-dajana-reci-289671698-30125141.jpg',
    imagePosition: 'center 42%',
  },
  {
    title: 'Culture & Heritage',
    description: 'Stone Town stories, historic routes, architecture, and local perspectives that add depth.',
    href: '/experiences/culture-and-place',
    image: '/images/experiences/stone-town/pexels-george-john-35128998-7101641.jpg',
    imagePosition: 'center 45%',
  },
  {
    title: 'Beach & Slow Living',
    description: 'Time shaped by light, tide, and pace, with stays and moments designed to breathe.',
    href: '/experiences/slow-zanzibar',
    image: '/images/experiences/sunset-cruise/pexels-mashauri-lumbas-2147951045-34678339.jpg',
    imagePosition: 'center 48%',
  },
  {
    title: 'Adventure & Exploration',
    description: 'Active days that move between coastline, inland nature, and unexpected terrain.',
    href: '/experiences/adventure-and-exploration',
    image: '/images/experiences/adventure/pexels-marri-shyam-366418-32457066.jpg',
    imagePosition: 'center 45%',
  },
  {
    title: 'Safari Extensions',
    description: 'Mainland Tanzania add-ons that connect island rhythm with iconic wildlife experiences.',
    href: '/experiences/safari-and-beyond',
    image: '/images/experiences/safari/pexels-adrien-olichon-1257089-36702544.jpg',
    imagePosition: 'center 50%',
  },
  {
    title: 'Private & Exclusive',
    description: 'Discreet, high-touch planning for couples, families, groups, and special occasions.',
    href: '/experiences/private-experiences',
    image: '/images/experiences/private/pexels-keeganjchecks-10294337.jpg',
    imagePosition: 'center 48%',
  },
];

export const testimonials = [
  {
    name: 'Sarah M.',
    origin: 'Nairobi, Kenya',
    journey: '6-night Zanzibar escape',
    quote:
      'Our itinerary felt beautifully paced from the first day. We had time to slow down, but nothing ever felt vague or unplanned.',
  },
  {
    name: 'James K.',
    origin: 'London, UK',
    journey: 'Zanzibar and safari extension',
    quote:
      'What impressed us most was how naturally Zanzibar and the mainland safari fit together. It felt like one considered journey, not two separate bookings.',
  },
  {
    name: 'Amina H.',
    origin: 'Zanzibar, TZ',
    journey: 'Private family journey',
    quote:
      'We were travelling as a family, and MANSA adjusted the pace around us without losing the quality of the experience. That flexibility made the whole trip work.',
  },
  {
    name: 'Leila R.',
    origin: 'Dubai, UAE',
    journey: 'Private anniversary trip',
    quote:
      'The private experiences were excellent, but it was the coordination behind them that stood out. Every handover, transfer, and timing detail felt seamless.',
  },
];

export const journeys = [
  {
    title: 'Three Days in Stone Town & Coast',
    blurb: 'A shorter escape balancing heritage, light-touch exploration, and time by the ocean.',
  },
  {
    title: 'Zanzibar in Layers',
    blurb: 'Culture, coastline, food, and slower pacing for travelers who want depth without excess.',
  },
  {
    title: 'Island to Bush',
    blurb: 'A composed route from Zanzibar to mainland safari, built around flow rather than checklist stops.',
  },
];

export const destinations = [
  'Stone Town',
  'Paje & Jambiani',
  'Nungwi & Kendwa',
  'Mnemba surrounds',
  'Mainland Tanzania safari circuits',
];

export const faqs = [
  {
    question: 'How does the planning process work?',
    answer:
      'We begin with your travel dates, preferences, and overall direction, then build a structured proposal that brings everything together — from accommodation to experiences and logistics.',
  },
  {
    question: 'Can you combine Zanzibar with safari?',
    answer:
      'Yes. Safari extensions are part of our core offering and can be integrated from the start of the planning process.',
  },
  {
    question: 'Do you arrange private experiences?',
    answer:
      'Yes. We can build fully private days, discreet transfers, and higher-touch support where needed.',
  },
  {
    question: 'When should we begin planning?',
    answer:
      'Earlier is better for seasonal availability, but we can also support shorter lead times where logistics allow.',
  },
  {
    question: 'How involved do I need to be in the planning process?',
    answer:
      'As much or as little as you prefer. Some guests come with a clear idea, while others rely on us to guide the structure.',
  },
  {
    question: 'Can you work with a rough idea rather than a fixed plan?',
    answer:
      'Yes. Most journeys start that way. We use your initial direction to build a structured proposal.',
  },
  {
    question: 'Will someone be available during our trip?',
    answer:
      'Yes. You’ll be able to reach us directly, and we remain available throughout your stay.',
  },
  {
    question: 'How do you handle last-minute changes or requests?',
    answer:
      'Where possible, we remain flexible and accommodate changes on the ground, while ensuring the overall structure of the journey stays intact.',
  },
  {
    question: 'How do you ensure everything runs smoothly during the trip?',
    answer:
      'Through detailed planning, clear coordination with our partners, and ongoing oversight while you are on the island.',
  },
  {
    question: 'Are your experiences private or shared?',
    answer:
      'Most can be arranged privately. Shared options are available if preferred.',
  },
  {
    question: 'Can we choose which experiences to include?',
    answer:
      'Yes. Everything is flexible and built around your interests.',
  },
  {
    question: 'Can we choose our own hotels?',
    answer:
      'Yes. We can work with your preferred properties or recommend options based on your travel style.',
  },
  {
    question: 'Do you handle corporate groups or large bookings?',
    answer:
      'Yes. We manage group travel, including corporate retreats, incentive trips, and conferences.',
  },
  {
    question: 'How do you approach structuring a trip across different locations?',
    answer:
      'We focus on flow — how each location connects, how time is spent in each place, and how the overall journey feels from start to finish.',
  },
  {
    question: 'What type of traveller do you work best with?',
    answer:
      'We work best with guests who value a well-structured, seamless experience and are open to guidance in shaping their journey.',
  },
];
