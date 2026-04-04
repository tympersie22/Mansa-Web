export type JourneyFlowDay = {
  dayLabel: string;
  title: string;
  location: string;
  description: string;
  image: string;
};

export type JourneyStayHotel = {
  name: string;
  descriptor: string;
  image: string;
};

export type JourneyStayGroup = {
  location: string;
  nightsLabel: string;
  hotels: JourneyStayHotel[];
};

export type Journey = {
  slug: string;
  title: string;
  duration: string;
  description: string;
  heroTitle?: string;
  heroSubtitle: string;
  heroImage: string;
  intro: string[];
  flow: JourneyFlowDay[];
  staysIntro: string;
  stays: JourneyStayGroup[];
  includedExperiences: string[];
  includedItems: string[];
  flexibility: string;
};

export const journeys: Journey[] = [
  {
    slug: 'a-taste-of-zanzibar',
    title: 'A Taste of Zanzibar',
    duration: '5 Days / 4 Nights',
    description:
      'A balanced introduction to Zanzibar, combining culture, ocean experiences, and time to unwind.',
    heroTitle: 'A Taste of Zanzibar',
    heroSubtitle:
      'A balanced introduction to Zanzibar, combining culture, ocean experiences, and time to unwind along the island’s northern coast.',
    heroImage:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'For those visiting Zanzibar for the first time, this journey brings together the island’s key elements in a natural and unhurried way.',
      'Beginning in Stone Town before moving north to Nungwi, it balances culture, ocean experiences, and time to relax with each day flowing comfortably into the next.',
      'Designed to be flexible and well-paced, it offers a clear structure while allowing space to adapt based on your arrival, preferences, and how you choose to experience the island.',
    ],
    flow: [
      {
        dayLabel: 'Day 1',
        title: 'Arrival & Settle In',
        location: 'Stone Town',
        description:
          'Arrival at Abeid Amani Karume International Airport, where guests are met and transferred to their hotel in Stone Town. The remainder of the day is left open to settle in, with the option to explore independently or arrange a guided walk for earlier arrivals.',
        image:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Day 2',
        title: 'Stone Town & Spice Farm → Transfer to Nungwi',
        location: 'Stone Town to Nungwi',
        description:
          'The day begins with a guided exploration of Stone Town, offering insight into its history, architecture, and daily life. A short visit to a spice farm follows, before transferring north to Nungwi in the afternoon.',
        image:
          'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Day 3',
        title: 'Mnemba Island Marine Experience',
        location: 'Northeast Coast',
        description:
          'A morning on the water along Zanzibar’s northeast coast, including snorkeling and time to relax at sea. The afternoon is left open to enjoy the hotel or surrounding beach at your own pace.',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Day 4',
        title: 'Sunset Dhow Experience',
        location: 'Nungwi',
        description:
          'A relaxed day at leisure in Nungwi. In the late afternoon, guests board a traditional dhow for a sunset cruise along the coastline.',
        image:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Day 5',
        title: 'Departure',
        location: 'Zanzibar Airport',
        description:
          'After breakfast, transfer to Abeid Amani Karume International Airport for departure, with timings shaped around the guest’s outbound flight.',
        image:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Accommodation is selected based on guest preferences, travel dates, and availability. These are examples of properties commonly used for this journey.',
    stays: [
      {
        location: 'Stone Town (1 Night)',
        nightsLabel: '1 Night',
        hotels: [
          {
            name: 'Park Hyatt Zanzibar',
            descriptor: 'A refined waterfront stay with strong heritage character.',
            image:
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
          },
          {
            name: 'Zanzibar Serena Hotel',
            descriptor: 'Historic seafront atmosphere with a quieter pace.',
            image:
              'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
          },
          {
            name: 'Tembo House Hotel',
            descriptor: 'A classic Stone Town base close to the old streets and waterfront.',
            image:
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
      {
        location: 'Nungwi (3 Nights)',
        nightsLabel: '3 Nights',
        hotels: [
          {
            name: 'Riu Palace Zanzibar',
            descriptor: 'A polished northern-coast base with easy beach access.',
            image:
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          },
          {
            name: 'Zuri Zanzibar',
            descriptor: 'Design-led beachfront stay with a calmer, more private feel.',
            image:
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          },
          {
            name: 'Nungwi Dreams',
            descriptor: 'A contemporary north-coast option suited to a relaxed island stay.',
            image:
              'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Stone Town Cultural Walk',
      'Spice Farm Experience',
      'Mnemba Island Marine Experience',
      'Sunset Dhow Cruise',
    ],
    includedItems: [
      'Accommodation (4 nights, mid–high range)',
      'Private airport transfers',
      'Inter-hotel transfers',
      'All listed experiences',
      'Local guides and coordination',
    ],
    flexibility:
      'Each journey is fully customizable. Accommodation, experiences, and overall flow can be adjusted based on guest preferences, travel dates, and availability.',
  },
  {
    slug: 'coast-to-coast',
    title: 'Coast to Coast',
    duration: '10 Days / 9 Nights',
    description:
      'A full exploration of Zanzibar, moving across the island’s regions from north to south.',
    heroSubtitle:
      'A longer island journey moving through Zanzibar’s changing coastlines, with each region offering a slightly different pace and atmosphere.',
    heroImage:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'Coast to Coast is designed for travelers who want to understand Zanzibar through movement rather than staying in a single corner of the island.',
      'It begins with context in Stone Town before extending north, east, and south, allowing each coastline to add something distinct to the wider journey.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–2',
        title: 'Stone Town Arrival & Orientation',
        location: 'Stone Town',
        description:
          'Begin with arrival support, a slower first evening, and time to explore Stone Town with proper cultural context before heading beyond the old town.',
        image:
          'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 3–4',
        title: 'Northern Coast',
        location: 'Nungwi & Kendwa',
        description:
          'Move north for a stronger beach chapter shaped around open coastline, ocean experiences, and slower hotel time.',
        image:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 5–7',
        title: 'Eastern Coastline',
        location: 'Matemwe / Paje',
        description:
          'The eastern coast shifts the rhythm again, with more tide-led scenery, marine access, and space for quieter private experiences.',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 8–10',
        title: 'Southern Finish',
        location: 'Jambiani / Kizimkazi',
        description:
          'Finish in the south with a softer final stretch before departure, balancing the wider island route with a composed ending.',
        image:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Accommodation is mixed across regions so the journey feels layered rather than repetitive.',
    stays: [
      {
        location: 'Stone Town / North / East / South',
        nightsLabel: '9 Nights',
        hotels: [
          {
            name: 'Mixed Regional Stays',
            descriptor: 'Selected to support the route rather than force one hotel style throughout.',
            image:
              'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Stone Town cultural orientation',
      'Regional coastal transfers',
      'Selected ocean and dhow experiences',
      'Flexible beach and private time',
    ],
    includedItems: [
      'Accommodation across multiple regions',
      'Private transfers between stays',
      'Journey coordination throughout',
      'Selected listed experiences',
    ],
    flexibility:
      'This journey is often adapted by reducing regions, extending one preferred coast, or increasing privacy in selected chapters.',
  },
  {
    slug: 'zanzibar-for-two',
    title: 'Zanzibar for Two',
    duration: '7 Nights / 8 Days',
    description:
      'A more intimate journey designed around privacy, pace, and shared experiences.',
    heroSubtitle:
      'A softer, more private journey shaped for couples who want Zanzibar to feel spacious, intentional, and quietly memorable.',
    heroImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'Zanzibar for Two is not about filling each day. It is about creating a travel rhythm that feels intimate, generous, and easy to inhabit.',
      'Private timing, quieter properties, and a stronger sense of control over pace make this one of the most adaptable journeys in the collection.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–2',
        title: 'Arrival & Slow Start',
        location: 'Stone Town or East Coast',
        description:
          'Begin softly with arrival support and a quieter first chapter, allowing space to settle into the island rather than rushing into activity.',
        image:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 3–5',
        title: 'Private Ocean Days',
        location: 'Northeast Coast',
        description:
          'Private marine time, flexible beach hours, and chosen experiences at a more personal pace create the core of the journey.',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 6–8',
        title: 'Shared Evenings & Departure',
        location: 'North or East Coast',
        description:
          'The final days keep the structure light, leaving room for a sunset dhow, a private dinner, and an unhurried departure.',
        image:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Properties are chosen for privacy, atmosphere, and how well they support a quieter two-person journey.',
    stays: [
      {
        location: 'Private Couple-Focused Stays',
        nightsLabel: '7 Nights',
        hotels: [
          {
            name: 'Boutique Beach Properties',
            descriptor: 'Well-suited to privacy, softer pacing, and more personal service.',
            image:
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Private transfers',
      'Selected marine experience',
      'Sunset dhow option',
      'Flexible private dining arrangements',
    ],
    includedItems: [
      'Accommodation',
      'Private airport and hotel transfers',
      'Listed experiences and coordination',
      'Tailored pacing support',
    ],
    flexibility:
      'This journey can lean more romantic, more private, or more experience-led depending on the couple and the reason for travel.',
  },
  {
    slug: 'shared-memories',
    title: 'Shared Memories',
    duration: '7 Nights / 8 Days',
    description:
      'A family-focused journey built around connection and experiences to enjoy together.',
    heroSubtitle:
      'A family-shaped journey balancing coordination, flexibility, and the kind of experiences that work well across different ages.',
    heroImage:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'Shared Memories is built around ease. The journey creates enough structure to feel smooth, while keeping days adaptable for family rhythm.',
      'Transfers, beach time, cultural context, and lighter ocean experiences are sequenced so the journey feels connected rather than overmanaged.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–2',
        title: 'Arrival & Gentle Start',
        location: 'Stone Town or Coast',
        description:
          'Arrivals are handled with support, keeping the first stretch simple and comfortable for families adjusting to travel timing.',
        image:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 3–5',
        title: 'Shared Island Experiences',
        location: 'Beach Coast',
        description:
          'The central chapter focuses on activities families can enjoy together, with options to dial intensity up or down based on ages and interests.',
        image:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 6–8',
        title: 'Flexible Finish',
        location: 'North or East Coast',
        description:
          'The final days preserve free time, creating room for beach hours, easier meals, and optional light-touch experiences before departure.',
        image:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Family-friendly properties are selected for space, layout, and how easily they support a mixed-age stay.',
    stays: [
      {
        location: 'Family-Suited Properties',
        nightsLabel: '7 Nights',
        hotels: [
          {
            name: 'Family Beach Resorts',
            descriptor: 'Chosen for practical comfort, layout, and easy shared time.',
            image:
              'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Family-paced transfers',
      'Flexible beach and cultural activities',
      'Ocean experience adapted to group needs',
    ],
    includedItems: [
      'Accommodation',
      'Private transfers',
      'Listed experiences',
      'Local coordination and support',
    ],
    flexibility:
      'Shared Memories often changes most in pace. We can reduce moving parts, extend rest time, or build in private adjustments for different family needs.',
  },
  {
    slug: 'zanzibar-together',
    title: 'Zanzibar, Together',
    duration: '4 Nights / 5 Days',
    description:
      'Designed for groups and shared travel, combining coordination and flexibility.',
    heroSubtitle:
      'A short group journey where coordination matters as much as the experiences themselves, keeping the wider trip smooth and well-paced.',
    heroImage:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'Zanzibar, Together is built for shared travel where timing, logistics, and guest flow matter just as much as what is included.',
      'It works well for friend groups, hosted travel, or coordinated stays where flexibility still needs to exist within a wider shared plan.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–2',
        title: 'Arrival & Group Orientation',
        location: 'Stone Town or Coast',
        description:
          'Group arrival handling, rooming support, and a smooth first-day transition create the foundation for the rest of the trip.',
        image:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 3–4',
        title: 'Shared Experiences',
        location: 'Zanzibar Coastline',
        description:
          'Experiences are chosen for coordination and broad appeal, while still leaving room for optional private splits or lighter pacing.',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Day 5',
        title: 'Departure',
        location: 'Airport Transfers',
        description:
          'The closing chapter prioritizes clean transfer sequencing, luggage handling, and timing tailored to multiple departures if needed.',
        image:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Group-friendly stays are selected for coordination ease, room mix, and how well they support shared travel.',
    stays: [
      {
        location: 'Group-Friendly Coastal Stays',
        nightsLabel: '4 Nights',
        hotels: [
          {
            name: 'Coordinated Group Properties',
            descriptor: 'Well-suited to shared travel without losing flexibility.',
            image:
              'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Arrival and departure coordination',
      'Shared island experiences',
      'Flexible group support',
    ],
    includedItems: [
      'Accommodation',
      'Private transfers',
      'Journey coordination',
      'Listed group experiences',
    ],
    flexibility:
      'This journey is usually adapted around group size, arrival pattern, and how much private downtime the wider trip needs.',
  },
  {
    slug: 'bush-to-beach',
    title: 'Bush to Beach',
    duration: '8 Nights / 9 Days',
    description:
      'A balanced journey combining Tanzania’s wildlife with time on Zanzibar’s coastline.',
    heroSubtitle:
      'A composed route that connects safari scale with Zanzibar calm, allowing each chapter to feel distinct without breaking the flow.',
    heroImage:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'Bush to Beach is designed around contrast. The first half carries the energy and scale of safari, while Zanzibar provides space to soften the pace afterwards.',
      'When structured well, the two sides should feel connected rather than stitched together, which is the purpose of this journey.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–4',
        title: 'Safari Chapter',
        location: 'Mainland Tanzania',
        description:
          'Begin with game drives and safari logistics arranged to feel clear and efficient, building a strong opening chapter before the shift to the island.',
        image:
          'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 5–9',
        title: 'Zanzibar Coastline',
        location: 'Beach Stay',
        description:
          'The island half focuses on decompression, ocean time, and a gentler travel rhythm after safari.',
        image:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'The route usually combines one safari property with one Zanzibar coastal stay to preserve simplicity.',
    stays: [
      {
        location: 'Safari + Zanzibar',
        nightsLabel: '8 Nights',
        hotels: [
          {
            name: 'Safari Camp and Beach Resort',
            descriptor: 'Selected to support a clean transition between bush and island.',
            image:
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Safari game drives',
      'Domestic transfer coordination',
      'Zanzibar beach chapter',
    ],
    includedItems: [
      'Accommodation',
      'Safari logistics',
      'Airport and inter-region transfers',
      'Selected experiences and coordination',
    ],
    flexibility:
      'Bush to Beach can be made shorter, softer, or more safari-led depending on whether the island is the recovery chapter or the main reason for travel.',
  },
  {
    slug: 'safari-plus-zanzibar',
    title: 'Safari + Zanzibar',
    duration: '8 Nights / 9 Days',
    description:
      'A safari-led journey followed by time to unwind on the island.',
    heroSubtitle:
      'A safari-first route for travelers who want the mainland to lead the journey, with Zanzibar providing a quieter ending rather than equal weighting.',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'Safari + Zanzibar is similar in structure to Bush to Beach, but the balance shifts more clearly toward the mainland safari chapter.',
      'It works well for travelers whose primary focus is wildlife, while still wanting the island as a calmer closing stretch.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–5',
        title: 'Safari-Led Opening',
        location: 'Mainland Tanzania',
        description:
          'The first days are built around game-viewing rhythm, lodge changes if needed, and the sense of immersion that makes safari feel complete.',
        image:
          'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 6–9',
        title: 'Zanzibar Wind-Down',
        location: 'Beach Coast',
        description:
          'The island closeout is simpler and more restful, giving guests time to unwind without overfilling the final days.',
        image:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Properties are chosen to keep the safari chapter strong while ensuring Zanzibar still feels restorative.',
    stays: [
      {
        location: 'Mainland + Island',
        nightsLabel: '8 Nights',
        hotels: [
          {
            name: 'Safari Lodges and Beach Stay',
            descriptor: 'A safari-led mix that closes with quieter island time.',
            image:
              'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Game drives',
      'Domestic travel coordination',
      'Beach downtime and light island experiences',
    ],
    includedItems: [
      'Accommodation',
      'Safari handling',
      'Transfers and domestic movement',
      'Listed experiences',
    ],
    flexibility:
      'This route is often adapted by extending safari, simplifying Zanzibar, or adding one private marine experience to the final chapter.',
  },
  {
    slug: 'zanzibar-through-its-stories',
    title: 'Zanzibar Through Its Stories',
    duration: '6 Nights / 7 Days',
    description:
      'A deeper exploration of Zanzibar’s culture, history, and identity.',
    heroSubtitle:
      'A culture-led journey that approaches Zanzibar through history, architecture, daily life, and the stories that connect place to place.',
    heroImage:
      'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1600&q=80',
    intro: [
      'This journey is for travelers who want Zanzibar to feel legible, not just beautiful. It is led less by beach time and more by context.',
      'Stone Town remains central, but the wider island is included where it deepens understanding rather than distracting from it.',
    ],
    flow: [
      {
        dayLabel: 'Days 1–3',
        title: 'Stone Town in Depth',
        location: 'Stone Town',
        description:
          'Begin with slower, more layered time in Stone Town, guided by architecture, heritage, and local context rather than checklist sightseeing.',
        image:
          'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 4–5',
        title: 'Island Context Beyond the Old Town',
        location: 'Spice Farms and Coastal Communities',
        description:
          'Move beyond the old town into the landscapes and communities that deepen Zanzibar’s story without losing thematic coherence.',
        image:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      },
      {
        dayLabel: 'Days 6–7',
        title: 'Quiet Coastal Finish',
        location: 'Coast',
        description:
          'Close the journey with a softer coastal chapter that gives room to absorb the experience rather than end abruptly.',
        image:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    staysIntro:
      'Accommodation usually begins with a stronger cultural base before shifting to a quieter final stay.',
    stays: [
      {
        location: 'Stone Town + Coast',
        nightsLabel: '6 Nights',
        hotels: [
          {
            name: 'Heritage and Coastal Properties',
            descriptor: 'Chosen to support the cultural intent of the journey while preserving comfort.',
            image:
              'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
    ],
    includedExperiences: [
      'Stone Town cultural exploration',
      'Spice and heritage context',
      'Selected island visits with local perspective',
    ],
    includedItems: [
      'Accommodation',
      'Private transfers',
      'Guides and coordination',
      'Listed cultural experiences',
    ],
    flexibility:
      'This journey can be made more academic, more food-led, or more coastal depending on how deeply guests want to explore the island’s identity.',
  },
];

export const journeyOrder = journeys.map((journey) => journey.slug);

export function getJourneyBySlug(slug: string) {
  return journeys.find((journey) => journey.slug === slug);
}
