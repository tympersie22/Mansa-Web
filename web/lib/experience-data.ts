export interface ExperienceCategory {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  curationLine: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
}

export interface ExperienceEntry {
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  summary: string;
  duration: string;
  experienceType: string;
  departure: string;
  startTime: string;
  bestTime: string;
  idealFor: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
  cardLine: string;
  intro: string[];
  highlights: string[];
  narrative: string[];
  itinerary: ExperienceTimelineItem[];
  options: Array<{ title: string; description: string }>;
  included: string[];
  bring: string[];
  notes: string[];
  brochure: ExperienceBrochure;
  cta: ExperienceCallToAction;
}

export interface ExperienceTimelineItem {
  label: string;
  title: string;
  description: string;
}

export interface ExperienceBrochure {
  overview: string;
  highlights: string[];
  fullItinerary: ExperienceTimelineItem[];
  includes: string[];
  excludes: string[];
  notes: string;
}

export interface ExperienceCallToAction {
  title: string;
  text: string;
}

type ExperienceSeedEntry = Omit<ExperienceEntry, 'summary' | 'itinerary' | 'brochure' | 'cta'> & {
  cta?: ExperienceCallToAction;
};

export interface JourneyItem {
  slug: string;
  title: string;
  category: string;
  duration: string;
}

export const experienceCategories: ExperienceCategory[] = [
  {
    slug: 'ocean-and-islands',
    title: 'Ocean & Islands',
    shortTitle: 'Ocean & Islands',
    description: 'Sandbanks, reefs, and open water — Zanzibar at its most natural.',
    intro:
      'Ocean experiences reveal Zanzibar in motion: shifting light, clear water, and the quieter rhythm that comes from time spent offshore.',
    curationLine:
      'Ocean experiences can be adapted in timing, privacy, and pace depending on how you want the day to feel.',
    image: '/images/experiences/pexels-dajana-reci-289671698-30125141.jpg',
    imagePosition: 'center 42%',
  },
  {
    slug: 'culture-and-place',
    title: 'Culture & Place',
    shortTitle: 'Culture & Place',
    description: 'History, architecture, and local context that give Zanzibar depth.',
    intro:
      'These experiences are shaped around Stone Town, heritage, food, and the lived texture of the island beyond its coastline.',
    curationLine:
      'Cultural experiences can remain light-touch or become more layered, depending on how deeply you want to engage.',
    image: '/images/experiences/stone-town/pexels-roman-odintsov-11025240.jpg',
    imageFit: 'contain',
    imagePosition: 'center 56%',
  },
  {
    slug: 'slow-zanzibar',
    title: 'Slow Zanzibar',
    shortTitle: 'Slow Zanzibar',
    description: 'A more private, spacious way of moving through the island.',
    intro:
      'Some of the most memorable time in Zanzibar comes from doing less, but doing it well. These experiences are designed around pace, stillness, and atmosphere.',
    curationLine:
      'Slow travel is often about subtraction: fewer moving parts, more room to enjoy what is already there.',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'adventure-and-exploration',
    title: 'Adventure & Exploration',
    shortTitle: 'Adventure & Exploration',
    description: 'More active days shaped by coastline, nature, and movement.',
    intro:
      'For travelers who want energy and variation, these experiences bring together landscapes, activity, and a stronger sense of discovery.',
    curationLine:
      'Adventure experiences can be softened or intensified depending on your comfort level and preferred pace.',
    image: '/images/experiences/adventure/pexels-marri-shyam-366418-32457066.jpg',
    imagePosition: 'center 45%',
  },
  {
    slug: 'nature-and-wildlife',
    title: 'Nature & Wildlife',
    shortTitle: 'Nature & Wildlife',
    description: 'Forest habitats, conservation sites, and wildlife encounters rooted in care and context.',
    intro:
      'These experiences focus on Zanzibar’s ecological side: protected forest, sea life, rescued animals, and places where conservation and quieter observation matter more than spectacle.',
    curationLine:
      'Wildlife experiences work best when they are guided with respect, patience, and a clear understanding of the environments they depend on.',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'adventure-and-ocean',
    title: 'Adventure & Ocean',
    shortTitle: 'Adventure & Ocean',
    description: 'Open-water pursuits shaped by adrenaline, movement, and the Indian Ocean.',
    intro:
      'These experiences lean into the ocean as a place of action: speed, depth, fishing, and a stronger sense of challenge beyond a simple beach day.',
    curationLine:
      'Ocean adventure depends on timing, weather, and the right crew. When handled well, it feels exhilarating without becoming chaotic.',
    image: '/images/experiences/pexels-dajana-reci-289671698-30125141.jpg',
    imagePosition: 'center 45%',
  },
  {
    slug: 'safari-and-beyond',
    title: 'Safari & Beyond',
    shortTitle: 'Safari & Beyond',
    description: 'Island time connected to the mainland’s larger landscapes.',
    intro:
      'These experiences extend the journey beyond Zanzibar, linking coast and bush in a way that feels intentional rather than overpacked.',
    curationLine:
      'Safari extensions work best when they are integrated early, so the island and mainland feel like one journey.',
    image: '/images/experiences/safari/pexels-adrien-olichon-1257089-36702544.jpg',
  },
  {
    slug: 'private-experiences',
    title: 'Private Experiences',
    shortTitle: 'Private Experiences',
    description: 'Discreet, flexible experiences with a stronger sense of exclusivity.',
    intro:
      'Private experiences offer more control over timing, privacy, atmosphere, and how the day unfolds from beginning to end.',
    curationLine:
      'Privacy is not a style on its own. It is a way of shaping the experience more closely around you.',
    image: '/images/experiences/private/pexels-keeganjchecks-10294337.jpg',
    imagePosition: 'center 48%',
  },
];

const defaultExperienceCta: ExperienceCallToAction = {
  title: 'Ready To Start Planning?',
  text:
    'When the experience direction feels right, we can help shape it into a well-paced plan around your timing, style, and wider journey.',
};

const experienceSeed: ExperienceSeedEntry[] = [
  {
    slug: 'mnemba-island-marine-experience',
    title: 'Mnemba Island Marine Experience',
    subtitle:
      'A morning on the water exploring Zanzibar’s reefs, open ocean, and the natural beauty surrounding Mnemba Island.',
    categorySlug: 'ocean-and-islands',
    duration: 'Half Day (~3 hours)',
    experienceType: 'Shared / Private',
    departure: 'Muyuni Beach',
    startTime: 'Morning (around 08:00 AM)',
    bestTime: 'Morning hours for calm seas and clear visibility',
    idealFor: 'Couples, families, and ocean lovers',
    image: '/images/experiences/Mnemba.jpg',
    imagePosition: 'center 48%',
    cardLine: 'Snorkeling, open water, and reef time around Mnemba.',
    intro: [
      'Set out along Zanzibar’s northeast coast for a morning shaped by the rhythm of the ocean. The waters surrounding Mnemba Island are known for their clarity, vibrant coral reefs, and diverse marine life.',
      'This experience combines time on the water with guided snorkeling and the possibility of encountering marine wildlife along the way — all at a relaxed and unhurried pace.',
    ],
    highlights: [
      'Snorkeling in clear waters around Mnemba Island',
      'Healthy coral reefs with tropical fish',
      'Time to relax on the boat between stops',
      'Light refreshments served on board',
      'Opportunity to encounter marine wildlife',
    ],
    narrative: [
      'The experience begins with a departure from Muyuni Beach, heading out towards the protected marine area surrounding Mnemba Island. The journey itself offers a chance to take in the coastline and open water, with occasional sightings of marine life along the way.',
      'Once at the reef, you’ll enter the water for a guided snorkeling session, exploring coral formations and the variety of fish that inhabit them. The calm conditions in the morning make this one of the best times to experience the area.',
      'Between snorkeling stops, there is time to relax on board, enjoy fresh seasonal fruit, and take in the surroundings before returning to shore before midday.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A small group setting, offering a social and cost-effective way to explore Mnemba’s waters.',
      },
      {
        title: 'Private Experience',
        description:
          'A more flexible and exclusive option, allowing you to move at your own pace and tailor the experience.',
      },
    ],
    included: ['Snorkeling equipment', 'Seasonal fruit platter', 'Bottled drinking water', 'Marine conservation fees', 'Local guide'],
    bring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses', 'Camera'],
    notes: [
      'Marine wildlife sightings vary and are not guaranteed.',
      'This experience may be shared unless booked privately.',
      'Weather and sea conditions may affect the schedule.',
    ],
  },
  {
    slug: 'blue-safari',
    title: 'Blue Safari',
    subtitle:
      'A full-day ocean experience sailing Zanzibar’s turquoise waters, sandbanks, reefs, and hidden lagoons.',
    categorySlug: 'ocean-and-islands',
    duration: 'Full Day',
    experienceType: 'Shared / Private',
    departure: 'Fumba',
    startTime: 'Morning Departure (around 09:00 AM)',
    bestTime: 'Daytime hours with favorable tide conditions',
    idealFor: 'Couples, families, groups, and ocean lovers',
    image: '/images/experiences/pexels-dajana-reci-289671698-30125141.jpg',
    imagePosition: 'center 52%',
    cardLine:
      'A full-day dhow experience built around sandbanks, snorkeling, island lunch, and Zanzibar’s southwest coast.',
    intro: [
      'Set sail across the Indian Ocean on a traditional dhow for one of Zanzibar’s most iconic marine experiences. Blue Safari combines crystal-clear waters, white sandbanks, vibrant coral reefs, and freshly prepared seafood into a full day shaped by the rhythm of the ocean.',
      'From snorkeling among tropical fish to relaxing on secluded sandbanks and exploring the natural beauty surrounding Kwale Island, the experience offers a perfect balance of adventure, relaxation, and authentic coastal atmosphere.',
    ],
    highlights: [
      'Traditional dhow sailing experience across turquoise waters',
      'Relaxing on a pristine sandbank surrounded by the ocean',
      'Guided snorkeling among coral reefs and tropical fish',
      'Seafood BBQ lunch served on Kwale Island',
      'Swimming in the Blue Lagoon during high tide conditions',
      'Fresh tropical fruits and refreshments throughout the day',
    ],
    narrative: [
      'The experience begins in Fumba, where you’ll board a traditional wooden dhow and set sail across Zanzibar’s southwest coastline. As the boat moves through the calm turquoise waters, the journey offers sweeping ocean views and a chance to fully disconnect into the rhythm of island life.',
      'The first stop is typically a pristine sandbank, where there is time to swim, relax, and enjoy the surrounding scenery before continuing towards the snorkeling areas. Guided snorkeling sessions allow you to explore coral reefs filled with colorful tropical fish and marine life in clear, shallow waters.',
      'Later in the day, the journey continues to Kwale Island, where a freshly prepared seafood BBQ lunch is served beneath the shade of tropical trees. Depending on the tides and sea conditions, the experience may also include a stop at the Blue Lagoon before sailing back towards Fumba in the late afternoon.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A social and lively group experience aboard a traditional dhow, shared with other travelers exploring Zanzibar’s coastline.',
      },
      {
        title: 'Private Experience',
        description:
          'A more exclusive option offering added privacy, flexibility, and a personalized pace throughout the day.',
      },
    ],
    included: [
      'Traditional dhow trip with crew',
      'Snorkeling equipment',
      'Seafood BBQ lunch',
      'Tropical fruits',
      'Bottled water and soft drinks',
      'Marine conservation fees',
      'Professional guide',
    ],
    bring: [
      'Swimwear',
      'Towel',
      'Sunscreen',
      'Hat and sunglasses',
      'Waterproof phone pouch or dry bag',
      'Camera',
    ],
    notes: [
      'This experience is typically operated as a shared tour (approximately 10–14 guests per boat).',
      'Private dhow arrangements are available upon request.',
      'The itinerary and timings may vary depending on tide and sea conditions.',
      'Access to the Blue Lagoon depends on water levels and weather conditions.',
      'Marine wildlife sightings vary and cannot be guaranteed.',
    ],
    cta: {
      title: 'Sail Zanzibar’s Turquoise Waters',
      text:
        'Experience a full day of sailing, snorkeling, island flavors, and coastal beauty aboard a traditional Zanzibar dhow.',
    },
  },
  {
    slug: 'nakupenda-sandbank-experience',
    title: 'Nakupenda Sandbank Experience',
    subtitle:
      'A magical disappearing sandbank in the Indian Ocean where turquoise waters, white sand, and ocean views meet.',
    categorySlug: 'ocean-and-islands',
    duration: '4–5 Hours',
    experienceType: 'Shared / Private',
    departure: 'Stone Town',
    startTime: 'Morning (around 09:00 AM – 10:00 AM)',
    bestTime: 'Low tide for full sandbank exposure',
    idealFor: 'Couples, families, groups, and ocean lovers',
    image: '/images/experiences/pexels-dajana-reci-289671698-30125141.jpg',
    imagePosition: 'center 50%',
    cardLine:
      'A tide-shaped sandbank escape from Stone Town with swimming, snorkeling, and open-ocean views.',
    intro: [
      'Escape to one of Zanzibar’s most iconic natural wonders — Nakupenda Sandbank. Located just off the coast of Stone Town, this pristine sandbank appears and disappears with the tides, offering a perfect setting for swimming, sunbathing, snorkeling, and relaxing in crystal-clear waters.',
      'This experience combines ocean adventure with pure relaxation in one of the most beautiful marine environments in Zanzibar.',
    ],
    highlights: [
      'Relax on a pristine white sandbank in the middle of the ocean',
      'Swim in crystal-clear turquoise waters',
      'Snorkel among tropical fish and coral reefs nearby',
      'Fresh seafood BBQ served on the sandbank (optional depending on package)',
      'Scenic boat ride from Stone Town',
      'Perfect photography and sunset moments',
    ],
    narrative: [
      'The experience begins with a boat departure from Stone Town, cruising across calm turquoise waters toward the Nakupenda Sandbank. Along the way, you’ll enjoy views of the historic coastline and the open Indian Ocean.',
      'Upon arrival, you step onto soft white sand surrounded entirely by ocean. The sandbank offers time to swim, relax, and explore the shallow waters filled with marine life. Depending on conditions, snorkeling is available nearby coral areas where tropical fish are commonly seen.',
      'A seafood BBQ lunch or fruit platter is typically served on the sandbank, allowing you to enjoy fresh island flavors in a truly unique ocean setting. After free time for swimming, photography, and relaxation, you will cruise back to Stone Town as the sandbank slowly disappears with the tide.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A relaxed group boat trip to Nakupenda Sandbank with shared dining and activities.',
      },
      {
        title: 'Private Experience',
        description:
          'A more exclusive boat experience with flexible timing, privacy, and customized setup.',
      },
    ],
    included: [
      'Boat transfer from Stone Town',
      'Visit to Nakupenda Sandbank',
      'Swimming and relaxation time',
      'Snorkeling equipment (if included in package)',
      'Fruit platter or seafood BBQ (depending on package)',
      'Professional boat crew',
    ],
    bring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses', 'Camera or phone', 'Waterproof bag'],
    notes: [
      'This experience is tide dependent and may vary in timing.',
      'Sandbank size changes depending on ocean conditions.',
      'Seafood BBQ may be shared or optional depending on package type.',
      'Weather conditions may affect snorkeling visibility.',
    ],
    cta: {
      title: 'Discover Zanzibar’s Floating Paradise',
      text:
        'Spend a day on a magical sandbank surrounded by the Indian Ocean — swim, relax, and enjoy one of Zanzibar’s most iconic experiences.',
    },
  },
  {
    slug: 'private-sandbank-escape',
    title: 'Private Sandbank Escape',
    subtitle: 'A slower day offshore with time to swim, pause, and enjoy Zanzibar’s shifting coastline.',
    categorySlug: 'ocean-and-islands',
    duration: 'Half Day',
    experienceType: 'Private',
    departure: 'Nungwi or Matemwe',
    startTime: 'Morning or late afternoon',
    bestTime: 'Tide-dependent',
    idealFor: 'Couples and private groups',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A private escape shaped around tide, weather, and stillness.',
    intro: [
      'This experience is built around timing and atmosphere rather than activity density. Depending on tide and weather, the sandbank becomes a natural setting for swimming, light refreshments, and uninterrupted time on the water.',
      'It works best for travelers looking for something slower, more private, and visually striking without feeling overly produced.',
    ],
    highlights: ['Private boat setup', 'Tide-shaped sandbank stop', 'Swimming in calm waters', 'Light refreshments', 'Flexible pace'],
    narrative: [
      'The day begins with a private departure timed to suit conditions on the water. As you head offshore, the focus is less on rushing between stops and more on allowing the setting itself to carry the experience.',
      'Once at the sandbank, there is time to swim, relax, and take in the changing light and sea around you. The simplicity of the setup is part of what makes the experience feel elevated.',
    ],
    options: [
      { title: 'Morning Departure', description: 'Clearer light and a quieter rhythm earlier in the day.' },
      { title: 'Sunset Departure', description: 'A warmer, more atmospheric version of the same experience.' },
    ],
    included: ['Private boat', 'Bottled water', 'Light refreshments', 'Host support'],
    bring: ['Swimwear', 'Towel', 'Sun protection', 'Phone or camera'],
    notes: ['Exact timing depends on tide conditions.', 'The sandbank appearance varies by day and season.'],
  },
  {
    slug: 'dhow-sunset-cruise',
    title: 'Dhow Sunset Cruise',
    subtitle:
      'A magical evening sail across Zanzibar’s coastline as the sun sets over the Indian Ocean.',
    categorySlug: 'ocean-and-islands',
    duration: '2 Hours',
    experienceType: 'Private / Shared',
    departure: 'Stone Town or Kendwa Beach',
    startTime: '5:00 PM – 7:00 PM (daily)',
    bestTime: 'Clear weather evenings for optimal sunset views',
    idealFor: 'Couples, honeymooners, families, and sunset lovers',
    image: '/images/experiences/sunset-cruise/pexels-goodcitizen-3361818.jpg',
    cardLine: 'A classic Zanzibar sunset cruise shaped by light, calm water, and uninterrupted ocean views.',
    intro: [
      'Sail into the golden Zanzibar sunset aboard a traditional wooden dhow. As the boat drifts across calm waters, the sky transforms into shades of gold, orange, and deep pink, creating one of the most unforgettable natural spectacles on the island.',
      'This experience is designed for pure relaxation — soft ocean breezes, gentle waves, and uninterrupted views of the horizon as day turns into night over the Indian Ocean.',
    ],
    highlights: [
      'Private sailing experience on a traditional dhow',
      'Stunning sunset views over the Indian Ocean',
      'Relaxed coastal cruise along Zanzibar’s shoreline',
      'Refreshing drinks served on board',
      'Optional live music for a premium atmosphere',
      'Ideal for couples, families, and small groups',
    ],
    narrative: [
      'The experience begins in the late afternoon as you board your traditional dhow from either Stone Town or Kendwa Beach. As you set sail, the coastline slowly fades behind you and the open ocean becomes your backdrop for the evening.',
      'The dhow glides along the water at a relaxed pace, offering uninterrupted views of the horizon as the sun begins its descent. Soft music, refreshments, and the sound of the waves create a calm and intimate atmosphere throughout the journey.',
      'As sunset approaches, the sky transforms into vibrant colours, offering the perfect setting for photography and quiet moments on deck. After sunset, the dhow gently returns to shore, completing a peaceful end to the day.',
    ],
    options: [
      {
        title: 'Private Experience',
        description:
          'A fully private dhow cruise offering exclusivity, flexibility, and a personalized sunset experience.',
      },
      {
        title: 'Shared Experience',
        description:
          'A relaxed group cruise sharing the beauty of Zanzibar’s sunset with other travelers.',
      },
    ],
    included: [
      'Traditional dhow cruise',
      'Professional crew',
      'Refreshments on board',
      'Sunset sailing experience',
      'Optional live band (on request)',
    ],
    bring: ['Light jacket or cover-up', 'Camera or phone', 'Sunglasses', 'Relaxed evening wear', 'Smile and good energy'],
    notes: [
      'This experience is weather dependent and may be adjusted for safety.',
      'Sunset visibility varies depending on seasonal conditions.',
      'Private upgrades and live music are available upon request.',
    ],
    cta: {
      title: 'End Your Day on the Water',
      text:
        'Experience Zanzibar’s most iconic sunset from a traditional dhow, surrounded by ocean, sky, and silence.',
    },
  },
  {
    slug: 'stone-town-cultural-walk',
    title: 'Stone Town Tour – Zanzibar',
    subtitle:
      'Walk through history, culture, and flavors in the heart of Zanzibar.',
    categorySlug: 'culture-and-place',
    duration: '2–3 Hours',
    experienceType: 'Shared / Private',
    departure: 'Stone Town (Flexible Meeting Point)',
    startTime: '8:00 AM – 4:00 PM (Flexible)',
    bestTime: 'Morning or late afternoon for cooler temperatures',
    idealFor: 'Culture lovers, history enthusiasts, and first-time visitors',
    image: '/images/experiences/stone-town/pexels-roman-odintsov-11025240.jpg',
    imageFit: 'contain',
    imagePosition: 'center 56%',
    cardLine: 'A guided Stone Town walk through landmarks, markets, carved doors, and Zanzibar’s layered past.',
    intro: [
      'Step into the living heart of Zanzibar with a guided Stone Town tour. This UNESCO World Heritage Site is a maze of winding alleys, historic buildings, bustling markets, and rich cultural influences shaped by centuries of trade and tradition.',
      'This experience offers a deep dive into the island’s history, architecture, and daily life, with the flexibility to tailor the journey based on your interests and pace.',
    ],
    highlights: [
      'Visit the Sultan’s Palace and Old Slave Market',
      'Explore the House of Wonders and Old Fort',
      'Wander through narrow historic streets and alleys',
      'Experience the vibrant Forodhani Night Market',
      'Discover Zanzibar’s cultural and trading history',
      'Optional stops at cafes and rooftop viewpoints',
    ],
    narrative: [
      'The experience begins with a flexible meet-up in Stone Town, where your guide introduces you to the city’s layered history and cultural significance. From there, you’ll walk through key landmarks, exploring architectural highlights and historic sites that tell the story of Zanzibar’s past.',
      'As you move through the narrow streets, you’ll pass bustling markets, carved wooden doors, local shops, and hidden corners that reflect the city’s unique identity. Your guide will share stories of trade, culture, and the people who shaped Stone Town over centuries.',
      'Depending on your pace and preferences, the tour can include time for shopping, photography, and optional stops at local cafés or rooftop restaurants overlooking the ocean.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A guided group walking tour through Stone Town’s key cultural and historical sites.',
      },
      {
        title: 'Private Experience',
        description:
          'A fully personalized walking experience tailored to your interests, pace, and preferred stops.',
      },
    ],
    included: [
      'Professional local guide',
      'Entry fees to main attractions',
      'Guided walking tour of Stone Town',
    ],
    bring: ['Comfortable walking shoes', 'Light clothing', 'Hat and sunscreen', 'Camera', 'Water bottle'],
    notes: [
      'This is a flexible walking tour that can be customized.',
      'Some attractions may have varying opening times.',
      'Moderate walking is required throughout the experience.',
    ],
    cta: {
      title: 'Discover the Soul of Zanzibar',
      text:
        'Walk through centuries of history, culture, and flavor in one of Africa’s most iconic coastal towns.',
    },
  },
  {
    slug: 'prison-island-tour',
    title: 'Prison Island Tour',
    subtitle:
      'A short journey from Stone Town combining history, wildlife, and ocean views.',
    categorySlug: 'culture-and-place',
    duration: '3–4 Hours',
    experienceType: 'Shared / Private',
    departure: 'Stone Town',
    startTime: 'Flexible Daily Departures (09:00 AM – 03:00 PM)',
    bestTime: 'Daytime hours with calm sea conditions',
    idealFor: 'Couples, families, history lovers, and first-time visitors to Zanzibar',
    image: '/images/experiences/stone-town/pexels-george-john-35128998-7101641.jpg',
    imagePosition: 'center 48%',
    cardLine:
      'A short island excursion pairing prison history, giant tortoises, and open-water views off Stone Town.',
    intro: [
      'Just off the coast of Stone Town, Prison Island — also known as Changuu Island — offers a unique blend of history, nature, and coastal scenery. Originally used as a detention island and later home to giant Aldabra tortoises, the island today is one of Zanzibar’s most popular short excursions.',
      'The experience combines a scenic boat ride, a visit to the historic prison ruins, and time spent with the island’s famous tortoises, all surrounded by clear turquoise waters and relaxed island atmosphere.',
    ],
    highlights: [
      'Meet the giant Aldabra tortoises',
      'Explore the historic prison ruins',
      'Scenic boat ride from Stone Town',
      'Relax by the beach with ocean views',
      'Excellent photography opportunities',
      'Optional snorkeling and sandbank lunch add-ons',
    ],
    narrative: [
      'The experience begins with a short boat ride departing from Stone Town, crossing the turquoise waters towards Prison Island. Along the way, there are views of Zanzibar’s coastline and the historic skyline of Stone Town fading into the distance.',
      'Upon arrival, you’ll explore the island’s old prison ruins while learning about the island’s history and its changing role over time. The island is also home to giant Aldabra tortoises, some of which are over a century old, offering the opportunity to observe and photograph these remarkable animals up close.',
      'After visiting the tortoise sanctuary and historical areas, there is time to relax along the shoreline, enjoy the ocean surroundings, and take photos before returning to Stone Town. Optional snorkeling or lunch experiences can also be arranged nearby for guests wanting to extend the excursion.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A relaxed shared island excursion with other travelers exploring Prison Island together.',
      },
      {
        title: 'Private Experience',
        description:
          'A more flexible and personalized option allowing you to explore the island at your own pace.',
      },
    ],
    included: [
      'Boat transfer between Stone Town and Prison Island',
      'Entrance fees',
      'Guided tour of the prison ruins',
      'Visit to the giant tortoise sanctuary',
      'Professional local guide',
    ],
    bring: [
      'Comfortable clothing',
      'Hat and sunglasses',
      'Sunscreen',
      'Camera',
      'Comfortable footwear',
      'Swimwear and towel (if adding snorkeling)',
    ],
    notes: [
      'This experience may be shared unless booked privately.',
      'Boat crossings depend on sea and weather conditions.',
      'Snorkeling and sandbank lunch experiences are optional add-ons.',
      'Wildlife interactions should always be respectful and guided by local instructions.',
    ],
    cta: {
      title: 'Discover Zanzibar’s Historic Island Escape',
      text:
        'Meet giant tortoises, explore island history, and enjoy the coastal beauty surrounding Prison Island.',
    },
  },
  {
    slug: 'spice-farm-and-local-table',
    title: 'Spice Tour',
    subtitle:
      'Smell, taste, and discover the essence of Zanzibar’s famous Spice Island heritage.',
    categorySlug: 'culture-and-place',
    duration: '2–3 Hours',
    experienceType: 'Shared / Private',
    departure: 'Spice Farm (Kijichi)',
    startTime: '09:00 AM – 03:00 PM (Flexible Daily Departures)',
    bestTime: 'Morning or early afternoon for cooler conditions',
    idealFor: 'Culture lovers, families, food enthusiasts, and curious travelers',
    image: '/images/experiences/spice/pexels-julia-volk-5769698.jpg',
    imagePosition: 'center 50%',
    cardLine:
      'A sensory walk through Zanzibar’s spice heritage, from cloves and cinnamon to fruit, herbs, and tradition.',
    intro: [
      'Uncover Zanzibar’s world-famous Spice Island identity with a guided walk through a local spice farm. This experience takes you into the heart of traditional cultivation, where spices, herbs, and tropical fruits are grown, harvested, and used in everyday life.',
      'From cloves and cinnamon to vanilla and nutmeg, this tour offers a sensory journey through Zanzibar’s agricultural heritage, combining education, tasting, and authentic local interaction.',
    ],
    highlights: [
      'Guided farm walk with a local spice expert',
      'Smell, touch, and taste fresh spices and tropical fruits',
      'Learn traditional medicinal, culinary, and cosmetic uses',
      'See plants like vanilla, cinnamon, cloves, and cardamom',
      'Fresh fruit and spice tasting experience',
      'Opportunity to purchase local spice products',
    ],
    narrative: [
      'The experience begins with arrival at a local spice farm in Kijichi, where you are welcomed by a local guide who introduces the history and importance of spice cultivation in Zanzibar.',
      'You will walk through lush plantations, learning how different spices grow and how they are used in daily Zanzibari life. Along the way, your guide will demonstrate harvesting techniques and explain the cultural and economic importance of each plant.',
      'The tour continues with a sensory tasting session where you will sample fresh tropical fruits, spices, and herbal teas directly from the farm. After the guided walk, there is time to browse the spice shop and purchase locally produced items before the experience concludes.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A guided group spice farm tour with other travelers exploring Zanzibar’s spice heritage.',
      },
      {
        title: 'Private Experience',
        description:
          'A more personalized and flexible experience with dedicated attention from your guide.',
      },
    ],
    included: [
      'Guided spice farm tour',
      'Fresh fruit and spice tasting',
      'Professional local guide',
      'Entrance fees',
    ],
    bring: ['Comfortable walking shoes', 'Light clothing', 'Hat and sunscreen', 'Camera', 'Water bottle'],
    notes: [
      'This experience may be shared unless booked privately.',
      'Spice availability varies depending on season.',
      'Some plants may not be in harvest year-round.',
      'Respect for farm instructions and natural environment is required.',
    ],
    cta: {
      title: 'Discover Zanzibar’s Spice Island Roots',
      text:
        'Step into the world of spices, aromas, and tradition in one of Zanzibar’s most iconic cultural experiences.',
    },
  },
  {
    slug: 'swahili-culinary-experience',
    title: 'Swahili Culinary Experience',
    subtitle:
      'Cook, taste, and celebrate the flavors of Zanzibar with local chefs.',
    categorySlug: 'culture-and-place',
    duration: '2.5–3.5 Hours',
    experienceType: 'Shared / Private',
    departure: 'Kijichi – Culinary Experience Venue',
    startTime: '10:00 AM & 03:00 PM (Daily Sessions)',
    bestTime: 'Mid-morning or late afternoon sessions',
    idealFor: 'Food lovers, couples, families, and cultural explorers',
    image: '/images/experiences/spice/pexels-julia-volk-5769698.jpg',
    imagePosition: 'center 50%',
    cardLine:
      'A hands-on cooking session rooted in Swahili spices, techniques, and shared table culture.',
    intro: [
      'Step into the heart of Zanzibar’s food culture with a hands-on cooking experience guided by local chefs. This immersive class introduces you to traditional Swahili cuisine, blending African, Arab, and Indian influences through spices, techniques, and storytelling.',
      'From preparation to tasting, this experience connects you directly with the island’s culinary heritage in a warm and interactive setting.',
    ],
    highlights: [
      'Learn to cook signature Swahili dishes like pilau rice, coconut curry, and chapati',
      'Discover Zanzibar’s famous spices and their everyday uses',
      'Hands-on cooking experience with local chefs',
      'Enjoy a shared meal of your prepared dishes',
      'Take home authentic recipes',
      'Cultural and interactive food experience',
    ],
    narrative: [
      'The experience begins with arrival at a traditional cooking venue in Kijichi, where you are welcomed by your local chef and introduced to the ingredients and spices that define Swahili cuisine.',
      'You will then take part in a guided cooking session, learning step by step how to prepare several traditional dishes. The chef will explain techniques, spice combinations, and cultural influences behind each recipe as you cook.',
      'Once the cooking is complete, everyone gathers to enjoy a shared meal featuring the dishes you have prepared together. After dining, you will receive recipe guidance so you can recreate the experience at home.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A group cooking class where guests learn and cook together in a social, interactive environment.',
      },
      {
        title: 'Private Experience',
        description:
          'A more personalized cooking session with dedicated chef guidance and flexible pacing.',
      },
    ],
    included: [
      'Guided cooking class with local chef',
      'All ingredients provided',
      'Meal (lunch or dinner depending on session)',
      'Recipe booklet to take home',
    ],
    bring: ['Comfortable clothing', 'Camera or phone', 'Appetite', 'Handwashing essentials (optional)', 'Open mind for cooking and learning'],
    notes: [
      'This is a shared cooking experience unless booked privately.',
      'Menu may vary depending on seasonal ingredients.',
      'Guests are encouraged to participate actively in cooking.',
      'Hygiene and food safety standards are followed throughout.',
    ],
    cta: {
      title: 'Taste the Flavors of Zanzibar',
      text:
        'Learn, cook, and enjoy authentic Swahili dishes in a hands-on cultural cooking experience.',
    },
  },
  {
    slug: 'mamas-of-zanzibar-experience',
    title: 'Mamas of Zanzibar Experience',
    subtitle:
      'Step into a real Zanzibari home and experience authentic Swahili culture, cooking, and connection through the women who preserve it.',
    categorySlug: 'culture-and-place',
    duration: '3–4 Hours',
    experienceType: 'Shared / Private',
    departure: 'Ngalawa Road / Bububu Area (Mamas of Zanzibar Home Base)',
    startTime: '09:00 AM (advance booking required)',
    bestTime: 'Morning sessions for active market and cooking experience',
    idealFor: 'Culture seekers, food lovers, couples, and meaningful travel experiences',
    image: '/images/experiences/spice/pexels-julia-volk-5769698.jpg',
    imagePosition: 'center 52%',
    cardLine:
      'A home-based cultural exchange through cooking, storytelling, and shared time with local Zanzibari women.',
    intro: [
      'Experience Zanzibar through the eyes of its local women in one of the island’s most authentic cultural encounters. Hosted by the Mamas of Zanzibar, this experience takes place in a real local home where food, stories, and traditions are shared in a warm and welcoming environment.',
      'This is not a staged tour — it is a genuine cultural exchange centered around Swahili cuisine, community, and everyday life.',
    ],
    highlights: [
      'Cook traditional Swahili dishes with local Zanzibari women',
      'Visit a real local home and community setting',
      'Learn the stories and cultural traditions behind each dish',
      'Enjoy a shared home-cooked meal with your hosts',
      'Experience authentic, non-touristy Zanzibar culture',
      'Support women-led community tourism initiatives',
    ],
    narrative: [
      'The experience begins with a warm welcome into a local Zanzibari home where the Mamas introduce themselves and share the story behind their community-led initiative.',
      'You will then head into a hands-on cooking session where you participate in preparing traditional Swahili dishes using fresh local ingredients and spices. The Mamas guide you step by step, sharing techniques, family recipes, and cultural meaning behind the food.',
      'Once cooking is complete, everyone gathers to enjoy a shared meal together in a relaxed, family-style setting. This is where conversation flows naturally — stories are exchanged, laughter is shared, and guests gain a deeper understanding of daily life in Zanzibar.',
      'The experience concludes with time to relax, take photos, and reflect before departure.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A social and interactive group setting where guests cook and dine together with the Mamas.',
      },
      {
        title: 'Private Experience',
        description:
          'A more intimate version of the experience with personalized interaction and flexible pacing.',
      },
    ],
    included: [
      'Guided cultural cooking experience',
      'All ingredients and cooking materials',
      'Home-cooked Swahili meal',
      'Local host (Mamas) experience',
      'Cultural storytelling and interaction',
    ],
    bring: ['Comfortable clothing', 'Open mind and appetite', 'Camera or phone', 'Respectful attire (modest dress recommended)', 'Cash for optional donations or local products'],
    notes: [
      'This is a shared community-based experience.',
      'Advance booking is required.',
      'Modest dress is expected to respect local culture.',
      'This experience directly supports local women and families.',
      'Punctual arrival is important (starts at 09:00 AM).',
    ],
    cta: {
      title: 'Experience the Real Zanzibar',
      text:
        'Step beyond tourism and into a real Zanzibari home — cook, connect, and share a meaningful cultural experience with local women.',
    },
  },
  {
    slug: 'forodhani-evening-food-walk',
    title: 'Forodhani Evening Food Walk',
    subtitle: 'A guided evening shaped around Zanzibar’s street-food atmosphere and coastal energy.',
    categorySlug: 'culture-and-place',
    duration: 'Evening',
    experienceType: 'Private',
    departure: 'Stone Town',
    startTime: 'Around sunset',
    bestTime: 'Dry evenings',
    idealFor: 'Curious eaters and city walkers',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A city-led food experience with atmosphere and local context.',
    intro: [
      'The evening food market atmosphere in Stone Town is one of the city’s most recognisable scenes, but it is best enjoyed with a bit of structure and local interpretation.',
      'This walk combines that atmosphere with a more curated route and pacing.',
    ],
    highlights: ['Evening market setting', 'Street-food tastings', 'Guided local context', 'Flexible pace'],
    narrative: [
      'The experience moves through the waterfront and surrounding streets at a relaxed pace, making space for observation as much as tasting.',
      'Rather than trying to cover everything, the focus is on a few well-chosen stops and a stronger sense of place.',
    ],
    options: [
      { title: 'Tasting Walk', description: 'Focused on a small number of representative stops.' },
      { title: 'Extended Evening', description: 'Includes additional city time and a slower pace.' },
    ],
    included: ['Guide', 'Selected tastings', 'Walking route support'],
    bring: ['Comfortable footwear', 'Cash for extras', 'Light layer'],
    notes: ['The exact selection changes with the evening and vendor availability.'],
  },
  {
    slug: 'east-coast-wellness-day',
    title: 'East Coast Wellness Day',
    subtitle: 'A slower coastal day built around recovery, calm, and a lighter pace.',
    categorySlug: 'slow-zanzibar',
    duration: 'Half Day to Full Day',
    experienceType: 'Private',
    departure: 'East Coast',
    startTime: 'Flexible',
    bestTime: 'Morning to afternoon',
    idealFor: 'Couples and slower travelers',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A quieter day shaped around stillness, coast, and recovery.',
    intro: [
      'Not every day in Zanzibar needs to be active. This experience is designed for travelers who want a more restorative stretch within a broader itinerary.',
      'The focus is on calm pacing, a strong setting, and very few moving parts.',
    ],
    highlights: ['Flexible timing', 'Low movement day', 'Private pacing', 'Wellness-oriented tone'],
    narrative: [
      'The day is structured lightly, leaving space for sea views, a slower lunch, and quiet time without the sense of being locked into a rigid schedule.',
      'It works especially well between more active experiences or as part of a honeymoon or private couple journey.',
    ],
    options: [
      { title: 'Half Day Reset', description: 'A shorter version with space to breathe and unwind.' },
      { title: 'Full Day Slow Living', description: 'An extended version with more room to settle into the coast.' },
    ],
    included: ['Private arrangements', 'Light refreshments', 'Host coordination'],
    bring: ['Light clothing', 'Reading material', 'Sun protection'],
    notes: ['This experience is intentionally light-touch.', 'Timing can be adapted to your stay rhythm.'],
  },
  {
    slug: 'private-beach-picnic',
    title: 'Private Beach Picnic',
    subtitle: 'A simple, private setup designed around atmosphere rather than activity.',
    categorySlug: 'slow-zanzibar',
    duration: '2 to 3 hours',
    experienceType: 'Private',
    departure: 'Selected coastlines',
    startTime: 'Late morning or sunset',
    bestTime: 'Dry season and calm weather',
    idealFor: 'Couples and celebrations',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A quieter private setup for couples or special moments.',
    intro: [
      'This is a simpler experience built around atmosphere, privacy, and good timing. It is less about activity and more about how the setting is prepared and held.',
      'It suits travelers who want a more intimate, lightly styled moment without turning the day into an event.',
    ],
    highlights: ['Private setup', 'Beachfront atmosphere', 'Flexible timing', 'Celebration-friendly'],
    narrative: [
      'The setup is arranged in advance at a selected beach location, with timing chosen to suit light, tide, and your wider plans.',
      'Once in place, the experience is yours to inhabit slowly, whether as a quiet midday pause or an early-evening moment before dinner.',
    ],
    options: [
      { title: 'Daytime Picnic', description: 'A brighter, lighter version ideal for a relaxed afternoon.' },
      { title: 'Sunset Setup', description: 'More atmospheric and suited to couples or celebrations.' },
    ],
    included: ['Private setup', 'Refreshments', 'Host coordination'],
    bring: ['Camera', 'Light layer', 'Sun protection'],
    notes: ['Setup style can be adjusted depending on the tone you want.', 'Weather may affect exact location.'],
  },
  {
    slug: 'sunset-sailing-and-dinner',
    title: 'Sunset Sailing and Dinner',
    subtitle: 'A slower evening arrangement that moves from the water into a considered dinner setting.',
    categorySlug: 'slow-zanzibar',
    duration: 'Evening',
    experienceType: 'Private',
    departure: 'West Coast or Stone Town',
    startTime: 'Late afternoon',
    bestTime: 'Sunset',
    idealFor: 'Couples and special occasions',
    image: '/images/experiences/sunset-cruise/pexels-mashauri-lumbas-2147951045-34678339.jpg',
    imagePosition: 'center 48%',
    cardLine: 'A composed evening with light sailing and a dinner follow-through.',
    intro: [
      'This experience is designed around how an evening should unfold rather than around a single activity. The goal is a graceful shift from water to table, without friction in between.',
      'It is best suited to travelers who value atmosphere, privacy, and sequencing.',
    ],
    highlights: ['Private evening setup', 'Sunset water time', 'Dinner continuation', 'Celebration-friendly'],
    narrative: [
      'You begin on the water in the late afternoon, allowing the coastline and light to establish the tone. From there, the experience continues directly into a dinner arrangement without needing to reset the evening.',
      'That continuity is what gives the experience its value: everything feels connected, calm, and intentional.',
    ],
    options: [
      { title: 'Sailing Focus', description: 'Longer time on the water, lighter dinner element.' },
      { title: 'Balanced Evening', description: 'A more even split between sailing and dinner.' },
    ],
    included: ['Boat arrangement', 'Dinner coordination', 'Host support'],
    bring: ['Light layer', 'Evening footwear', 'Phone or camera'],
    notes: ['Exact sailing time depends on weather and location.', 'Dinner setting can be adapted to style preferences.'],
  },
  {
    slug: 'kuza-cave-and-south-coast-day',
    title: 'Kuza Cave and South Coast Day',
    subtitle: 'A more active day combining inland atmosphere with time along the south-east coast.',
    categorySlug: 'adventure-and-exploration',
    duration: 'Half Day to Full Day',
    experienceType: 'Private',
    departure: 'South-East Coast',
    startTime: 'Morning',
    bestTime: 'Dry conditions',
    idealFor: 'Active travelers and repeat visitors',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'An active south-coast day with inland contrast and coastal movement.',
    intro: [
      'This experience brings together one of Zanzibar’s more distinctive inland locations with the open character of the south-east coast.',
      'It works well for travelers who want a little more variation and movement within the day.',
    ],
    highlights: ['Cave setting', 'South coast scenery', 'Flexible pacing', 'More active route'],
    narrative: [
      'The day moves between inland atmosphere and coastline, creating a useful contrast to more conventional beach time.',
      'It is not intense, but it does feel more exploratory and suits travelers who enjoy seeing different sides of the island in one day.',
    ],
    options: [
      { title: 'Half Day Route', description: 'A shorter version with a tighter focus.' },
      { title: 'Extended Exploration', description: 'A fuller day with more coast and local stops.' },
    ],
    included: ['Private transport support', 'Guide coordination', 'Entry logistics'],
    bring: ['Comfortable footwear', 'Water', 'Sun protection'],
    notes: ['Ground conditions can vary depending on weather.', 'This experience suits travelers comfortable with a more active pace.'],
  },
  {
    slug: 'jungle-and-coast-bike-experience',
    title: 'Quad Bike Adventure – Zanzibar',
    subtitle:
      'Ride through villages, farmlands, and coastal landscapes on an off-road Zanzibar experience.',
    categorySlug: 'adventure-and-exploration',
    duration: '3 Hours',
    experienceType: 'Shared / Private',
    departure: 'Kiwengwa / Jambiani',
    startTime: '09:00 AM or 02:00 PM',
    bestTime: 'Morning or late afternoon for cooler riding conditions',
    idealFor: 'Adventure seekers, couples, groups, and cultural explorers',
    image: '/images/experiences/adventure/pexels-deffo-manizo-64452317-20897828.jpg',
    imagePosition: 'center 48%',
    cardLine:
      'An off-road Zanzibar ride through villages, rice fields, fishing communities, and everyday island landscapes.',
    intro: [
      'Get off the beaten path and experience Zanzibar from a completely different perspective. This quad bike adventure takes you through rural villages, rice fields, fishing communities, and scenic landscapes that reveal the island’s authentic local life beyond the beaches.',
      'It’s a hands-on, immersive journey combining adventure, culture, and everyday island life — guided by locals who know the terrain and communities deeply.',
    ],
    highlights: [
      'Start your ride from Kiwengwa with safety briefing and quad introduction',
      'Explore Pwani Mchangani community square and local life',
      'Ride through Kinyasini village and scenic rice fields',
      'Pass traditional mud houses and rural settlements',
      'Visit fishing villages and local fish markets',
      'Experience authentic Zanzibari countryside landscapes',
    ],
    narrative: [
      'The experience begins in Kiwengwa, where you’ll receive a full safety briefing and introduction to your quad bike before setting off into Zanzibar’s interior landscapes.',
      'As you ride along guided trails, you’ll pass through small villages where daily life unfolds naturally — farmers working in fields, children playing, and local markets operating at a relaxed island pace. The journey continues through rice fields, sandy tracks, and coastal village routes that showcase Zanzibar’s rural charm.',
      'Along the way, there are stops to explore community areas, interact respectfully with locals, and take photos of the diverse landscapes. The route also includes fishing villages where you can observe traditional coastal livelihoods before returning to the starting point after an adventurous ride through the island’s heartland.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A guided group quad bike adventure following a set route through Zanzibar’s villages and landscapes.',
      },
      {
        title: 'Private Experience',
        description:
          'A more exclusive ride with greater flexibility, privacy, and personalized stops along the route.',
      },
    ],
    included: [
      'Quad bike rental',
      'Professional local guide',
      'Safety briefing and equipment',
      'Refreshment stop during the ride',
    ],
    bring: [
      'Valid driving license',
      'Comfortable clothing suitable for outdoor riding',
      'Sun protection (hat, sunscreen, sunglasses)',
      'Camera or phone',
      'Cash for optional local purchases',
    ],
    notes: [
      'All riders must follow safety instructions provided by guides.',
      'This experience operates on designated safe routes through villages and rural areas.',
      'Weather conditions may affect ride timing or route selection.',
      'Respect for local communities is essential throughout the experience.',
    ],
    cta: {
      title: 'Explore Zanzibar Beyond the Roads',
      text:
        'Ride through villages, landscapes, and coastal communities on an unforgettable off-road adventure.',
    },
  },
  {
    slug: 'jozani-forest-exploration',
    title: 'Jozani Forest Tour',
    subtitle:
      'Wild, green, and home to Zanzibar’s rare Red Colobus monkeys.',
    categorySlug: 'nature-and-wildlife',
    duration: '2–3 Hours',
    experienceType: 'Shared / Private',
    departure: 'Jozani Chwaka Bay National Park',
    startTime: '09:00 AM – 02:00 PM (Flexible Daily Departures)',
    bestTime: 'Morning hours for active wildlife viewing',
    idealFor: 'Nature lovers, families, photographers, and wildlife enthusiasts',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80',
    cardLine:
      'A guided forest walk through Zanzibar’s only national park, centered on red colobus monkeys and mangrove habitat.',
    intro: [
      'Step into Zanzibar’s only national park and a sanctuary of rich biodiversity. Jozani Forest is home to the rare Red Colobus monkey and offers a peaceful escape into dense greenery, mangrove ecosystems, and ancient coastal forest.',
      'This experience combines wildlife encounters, guided nature walks, and educational insight into Zanzibar’s unique ecosystem.',
    ],
    highlights: [
      'See the endangered Red Colobus monkeys',
      'Guided walk through lush forest trails',
      'Discover mangrove ecosystems and medicinal plants',
      'Spot butterflies, birds, and small wildlife',
      'Explore Zanzibar’s protected natural environment',
      'Ideal for nature photography and quiet exploration',
    ],
    narrative: [
      'The experience begins at the entrance of Jozani Chwaka Bay National Park, where you are welcomed by a professional local guide who introduces the forest and its ecological importance.',
      'You will then walk through shaded forest trails where Red Colobus monkeys are often seen moving freely among the trees. Your guide will explain their behavior, conservation efforts, and the unique biodiversity of the forest.',
      'The journey continues to the mangrove boardwalk, where you will learn about the coastal ecosystem and its role in protecting Zanzibar’s shoreline. After the guided exploration, there is time for photos and a relaxed return from the forest.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A guided group forest walk exploring Jozani’s main highlights alongside other travelers.',
      },
      {
        title: 'Private Experience',
        description:
          'A more personalized nature experience with a dedicated guide and flexible pacing.',
      },
    ],
    included: ['Entrance fees to Jozani Forest', 'Guided forest walk', 'Mangrove boardwalk visit', 'Professional local guide'],
    bring: ['Comfortable walking shoes', 'Light clothing suitable for forest conditions', 'Hat and sunscreen', 'Camera', 'Insect repellent', 'Water bottle'],
    notes: [
      'Wildlife sightings are natural and cannot be guaranteed.',
      'Please follow all park rules and guide instructions.',
      'Stay on designated trails for safety and conservation.',
      'Weather conditions may affect visibility and walking conditions.',
    ],
    cta: {
      title: 'Discover Zanzibar’s Wild Side',
      text:
        'Walk among ancient trees and meet the island’s rare red colobus monkeys in their natural habitat.',
    },
  },
  {
    slug: 'nungwi-aquarium',
    title: 'Nungwi Aquarium',
    subtitle:
      'Swim, protect, and discover Zanzibar’s sea turtles in a natural tidal sanctuary.',
    categorySlug: 'nature-and-wildlife',
    duration: '1.5–2 Hours',
    experienceType: 'Shared / Private',
    departure: 'Nungwi Village – Aquarium',
    startTime: '09:00 AM – 05:00 PM (Daily Slots)',
    bestTime: 'Morning or late afternoon for calmer conditions and fewer crowds',
    idealFor: 'Families, wildlife lovers, couples, and educational travelers',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    cardLine:
      'A conservation-led sea turtle sanctuary visit with guided swimming, feeding, and marine education.',
    intro: [
      'Located at the northern tip of Zanzibar in Nungwi village, the Nungwi Aquarium is a conservation-based sanctuary where rescued sea turtles are cared for in a natural tidal pool. This experience offers visitors the chance to observe, learn about, and responsibly swim alongside these gentle marine creatures.',
      'The visit combines conservation education with a meaningful wildlife encounter in a calm coastal setting.',
    ],
    highlights: [
      'Swim with sea turtles in a natural tidal pool',
      'Learn about turtle rescue and rehabilitation programs',
      'Feed and observe turtles up close',
      'Conservation-focused guided experience',
      'Family-friendly wildlife activity',
      'Located in the vibrant village of Nungwi',
    ],
    narrative: [
      'The experience begins with arrival at the Nungwi Aquarium, where you will be welcomed and given an introduction to the sanctuary’s conservation work and purpose.',
      'You will then enter the tidal pool area, where rescued sea turtles live in a protected natural environment connected to the ocean. Guests are guided through a safe and respectful interaction, including the opportunity to swim alongside and feed the turtles under supervision.',
      'Throughout the visit, you will learn about turtle conservation efforts, rehabilitation processes, and the importance of protecting marine ecosystems. After your swim and learning session, there is time for photos and relaxation before concluding the experience.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A guided group visit shared with other guests at scheduled entry times.',
      },
      {
        title: 'Private Experience',
        description:
          'A more exclusive and personalized visit with additional flexibility and dedicated guidance.',
      },
    ],
    included: ['Entry to Nungwi Aquarium', 'Turtle swim and feeding experience', 'Basic guide and orientation', 'Conservation briefing'],
    bring: ['Swimwear', 'Towel', 'Change of clothes', 'Waterproof bag', 'Sunscreen', 'Camera'],
    notes: [
      'This is a conservation-focused experience.',
      'All interactions with turtles must follow guide instructions.',
      'Wildlife behavior may vary depending on conditions.',
      'Respect for animals and environment is strictly required.',
    ],
    cta: {
      title: 'Support Turtle Conservation in Zanzibar',
      text:
        'Swim with rescued sea turtles and be part of a meaningful conservation experience in Nungwi.',
    },
  },
  {
    slug: 'sky-diving-zanzibar',
    title: 'Sky Diving Zanzibar',
    subtitle:
      'Jump from 10,000 feet above turquoise waters and experience Zanzibar from the sky.',
    categorySlug: 'adventure-and-exploration',
    duration: '~2 Hours',
    experienceType: 'Shared / Private',
    departure: 'Kendwa / Nungwi Drop Zone',
    startTime: 'Daily (weather dependent)',
    bestTime: 'Clear weather mornings for optimal visibility',
    idealFor: 'Adventure seekers and thrill lovers',
    image:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1400&q=80',
    cardLine:
      'A tandem skydive above Zanzibar’s coastline with freefall, canopy glide, and beach landing at Kendwa.',
    intro: [
      'Experience the ultimate adrenaline rush with a tandem skydive over Zanzibar’s breathtaking coastline. From high above the Indian Ocean, you’ll freefall over turquoise waters and white sand beaches before gliding gently back down to a soft landing on Kendwa’s shoreline.',
      'This is one of the most extreme and unforgettable ways to experience Zanzibar — a true once-in-a-lifetime perspective of paradise.',
    ],
    highlights: [
      'Tandem skydive with a certified professional instructor',
      'Jump from 10,000 feet above Zanzibar’s coastline',
      '30–40 seconds of freefall over the Indian Ocean',
      '5–10 minute parachute glide with panoramic views',
      'Soft beach landing at Kendwa Rocks',
      'Personalized certificate of your jump',
    ],
    narrative: [
      'The experience begins with arrival at the designated drop zone near Kendwa, where you will complete registration and meet your certified instructor. A full safety briefing and gear fitting will follow, ensuring you are fully prepared for the jump.',
      'Once ready, you will board the aircraft for a scenic climb to 10,000 feet. During the ascent, you’ll enjoy panoramic views of Zanzibar’s coastline, coral reefs, and surrounding islands.',
      'At altitude, you will exit the aircraft in tandem with your instructor for an exhilarating freefall lasting approximately 30–40 seconds. After the parachute opens, you will transition into a calm glide lasting several minutes, floating above the ocean with uninterrupted views of the coastline.',
      'The experience concludes with a smooth beach landing at Kendwa, followed by certificate presentation and optional media collection.',
    ],
    options: [
      {
        title: 'Standard Tandem Jump',
        description:
          'A fully guided skydive experience with a certified instructor and all safety equipment included.',
      },
      {
        title: 'Premium Media Package Upgrade',
        description:
          'Includes professional photo and video capture of your entire jump experience.',
      },
    ],
    included: [
      'Certified tandem skydiving instructor',
      'Full safety briefing and equipment',
      'Scenic aircraft ascent',
      'Tandem skydive experience',
      'Personalized completion certificate',
    ],
    bring: ['Comfortable clothing', 'Secure closed shoes', 'Valid ID or passport', 'Hair tie (if needed)', 'Sense of adventure'],
    notes: [
      'Maximum weight limit: 105 kg per person.',
      'Not suitable for pregnant guests or those with serious medical conditions.',
      'This activity is weather dependent and may be rescheduled for safety reasons.',
      'All safety instructions must be followed strictly at all times.',
    ],
    cta: {
      title: 'Take the Leap of a Lifetime',
      text:
        'See Zanzibar from a perspective few ever experience — freefall above paradise and land on its golden shores.',
    },
  },
  {
    slug: 'beach-horse-riding',
    title: 'Beach Horse Riding',
    subtitle:
      'Ride along Zanzibar’s coastline where ocean waves meet golden sands.',
    categorySlug: 'adventure-and-exploration',
    duration: '1–2 Hours',
    experienceType: 'Shared / Private',
    departure: 'East Coast (Michamvi Kae) / North Coast (Nungwi)',
    startTime: 'Flexible Daily (Sunrise to Sunset)',
    bestTime: 'Early morning or sunset for optimal conditions',
    idealFor: 'Couples, families, beginners, and adventure seekers',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    cardLine:
      'A guided horseback ride along Zanzibar’s shoreline with ocean-edge views and flexible timing from sunrise to sunset.',
    intro: [
      'Experience the freedom of horseback riding along Zanzibar’s stunning beaches. This guided coastal adventure takes you across soft white sands and shallow waters, offering breathtaking views of the Indian Ocean.',
      'Whether you are a beginner or experienced rider, this experience blends relaxation, adventure, and unforgettable coastal scenery in one unique journey.',
    ],
    highlights: [
      'Scenic horseback ride along Zanzibar’s beaches',
      'Suitable for beginners and experienced riders',
      'Ride along sunrise, daytime, or sunset settings',
      'Guided experience with professional instructors',
      'Opportunity for ocean-edge photography',
      'Ideal for couples, families, and solo travelers',
    ],
    narrative: [
      'The experience begins with a safety briefing from your professional instructor, where you will be introduced to your horse and provided with all necessary riding equipment.',
      'Once ready, you will set off along the shoreline, riding across soft sand and shallow waters while enjoying uninterrupted views of the ocean. The pace is relaxed and guided, ensuring comfort and safety for all experience levels.',
      'Along the route, there are stops for photography and moments to take in the scenery before gently returning to the stables. Depending on the selected time, sunrise and sunset rides offer especially dramatic lighting and atmosphere.',
    ],
    options: [
      {
        title: 'Shared Experience',
        description:
          'A guided group horseback ride along the beach with other participants.',
      },
      {
        title: 'Private Experience',
        description:
          'A more exclusive riding experience with personalized pacing and route flexibility.',
      },
    ],
    included: ['Horse rental and riding equipment (helmet, saddle, reins)', 'Professional riding instructor', 'Safety briefing and guidance'],
    bring: ['Comfortable clothing suitable for riding', 'Closed or secure footwear', 'Sunscreen', 'Camera or phone', 'Hat (optional for waiting areas)'],
    notes: [
      'All rides are guided for safety and comfort.',
      'Riders must follow instructor instructions at all times.',
      'Weather and tide conditions may affect route selection.',
      'Weight and age restrictions may apply depending on horse availability.',
    ],
    cta: {
      title: 'Ride Along Zanzibar’s Shores',
      text:
        'Experience the magic of horseback riding where the ocean meets the sand in one of Zanzibar’s most scenic coastal adventures.',
    },
  },
  {
    slug: 'game-fishing-zanzibar',
    title: 'Game Fishing Zanzibar',
    subtitle:
      'Head into the Indian Ocean for a deep-sea fishing adventure and the thrill of the big catch.',
    categorySlug: 'adventure-and-ocean',
    duration: '4–8 Hours',
    experienceType: 'Shared / Private',
    departure: 'Kendwa / Nungwi / Matemwe / Kiwengwa (sea dependent)',
    startTime: '06:00 AM – 07:00 AM (recommended)',
    bestTime: 'Early morning for optimal fishing conditions',
    idealFor: 'Fishing enthusiasts, adventure seekers, and ocean lovers',
    image:
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=1400&q=80',
    cardLine:
      'A deep-sea charter into Zanzibar’s offshore fishing grounds with local crew support and open-ocean time.',
    intro: [
      'Head out into the Indian Ocean for an unforgettable deep-sea fishing experience. Zanzibar is known for its rich marine waters where anglers have the chance to target some of the most exciting game fish, including tuna, marlin, barracuda, dorado, and kingfish.',
      'This experience combines sport, adventure, and ocean exploration with guidance from an experienced local crew aboard a fully equipped fishing boat.',
    ],
    highlights: [
      'Deep-sea fishing with a professional local crew',
      'Fully equipped boat with rods, bait, and fishing gear',
      'Chance to catch tuna, marlin, barracuda, dorado, and kingfish',
      'Scenic time on the open Indian Ocean',
      'Refreshments served on board',
      'Ideal for beginners and experienced anglers',
    ],
    narrative: [
      'The experience begins early in the morning as you meet your crew at one of the designated departure points in Kendwa, Nungwi, Matemwe, or Kiwengwa, depending on sea and tide conditions. After a short briefing, you will board a fully equipped fishing vessel and head offshore into deeper waters.',
      'Once at the fishing grounds, the crew will guide you through trolling and casting techniques depending on the conditions and target species. Throughout the session, you’ll have continuous support whether you are a beginner or experienced angler.',
      'Between fishing sessions, you can relax on board, enjoy light refreshments, and take in the vast open ocean surroundings. In a full-day trip, additional time is spent fishing with a lunch break served on board before returning to shore with your catch.',
    ],
    options: [
      {
        title: 'Half-Day Fishing Charter',
        description:
          'A 4-hour guided fishing experience focusing on key offshore fishing grounds.',
      },
      {
        title: 'Full-Day Fishing Charter',
        description:
          'An extended 8-hour experience with more fishing time and a full lunch served on board.',
      },
    ],
    included: [
      'Boat charter with professional fishing crew',
      'Fishing rods, bait, and equipment',
      'Soft drinks and snacks (half-day)',
      'Lunch (full-day trips only)',
    ],
    bring: ['Comfortable clothing', 'Hat and sunglasses', 'Sunscreen', 'Camera', 'Motion sickness tablets (if needed)'],
    notes: [
      'Fishing locations depend on sea and weather conditions.',
      'Catch success is not guaranteed as this is a natural activity.',
      'This is a shared charter unless booked privately.',
      'Safety instructions from crew must be followed at all times.',
    ],
    cta: {
      title: 'The Ultimate Ocean Fishing Adventure',
      text:
        'Spend a day on the Indian Ocean chasing the thrill of the catch in one of Zanzibar’s most exciting marine experiences.',
    },
  },
  {
    slug: 'cheetahs-rock-zanzibar',
    title: 'Cheetah’s Rock Zanzibar',
    subtitle:
      'A once-in-a-lifetime ethical wildlife encounter where rescued animals and conservation come together.',
    categorySlug: 'nature-and-wildlife',
    duration: '3–4 Hours',
    experienceType: 'Shared Experience (Limited Capacity)',
    departure: 'Cheetah’s Rock – West Coast Zanzibar (near Kama Village)',
    startTime: 'Scheduled sessions (pre-booking required)',
    bestTime: 'Midday to afternoon sessions',
    idealFor: 'Animal lovers, educational travelers, families (15+ age restriction applies)',
    image:
      'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1400&q=80',
    cardLine:
      'A conservation-led rescue sanctuary visit focused on storytelling, animal welfare, and highly controlled encounters.',
    intro: [
      'Experience one of Zanzibar’s most unique wildlife encounters at Cheetah’s Rock, a conservation-focused rescue center where animals that cannot return to the wild are cared for and protected.',
      'This is not a traditional zoo. It is an intimate guided experience where guests meet rescued wildlife up close, learn their stories, and support ongoing conservation efforts through responsible tourism.',
    ],
    highlights: [
      'Meet rescued cheetahs, lions, zebras, lemurs, and more',
      'Guided wildlife encounter with expert animal caretakers',
      'Learn real rescue and conservation stories behind each animal',
      'Close-up photo opportunities with select animals',
      'Small-group, limited-capacity experience for animal welfare',
      'Educational and conservation-focused tour',
    ],
    narrative: [
      'The experience begins with arrival at Cheetah’s Rock, located on Zanzibar’s west coast near Kama Village. Guests are welcomed by the team and introduced to the sanctuary’s mission of rescue, rehabilitation, and education.',
      'You will then join a guided wildlife tour where trained staff lead you through carefully managed animal encounters. Each animal has its own rescue story, and during the visit you will learn how they came to the sanctuary and how they are cared for today.',
      'Depending on the tour flow, guests may encounter cheetahs, lions, zebras, lemurs, monkeys, hyenas, and other rescued species. All interactions are strictly supervised and designed around animal welfare and natural behavior, ensuring respectful and safe contact.',
      'The experience is highly immersive, combining education, photography opportunities, and direct engagement with conservation work in action.',
    ],
    options: [
      {
        title: 'Wildlife Tour Experience',
        description:
          'The main guided tour featuring multiple rescued animals and storytelling-focused encounters.',
      },
      {
        title: 'Combined Tour (Wildlife + Otters)',
        description:
          'A full-day experience combining the wildlife tour with a VIP otter encounter for a more extended visit.',
      },
      {
        title: 'VIP Otter Experience',
        description:
          'A separate interactive experience focused on rescued otters in a controlled natural environment.',
      },
    ],
    included: [
      'Guided wildlife tour',
      'Professional animal caretakers and guides',
      'Educational conservation briefing',
      'Supervised animal encounters',
      'Access to rescued wildlife areas',
    ],
    bring: ['Comfortable closed clothing (no loose items or strong scents)', 'Closed shoes (required)', 'Camera (no flash in some areas)', 'Booking confirmation', 'Respectful attitude toward wildlife rules'],
    notes: [
      'Minimum age: 15 years and above.',
      'Strict dress and scent guidelines apply for animal safety.',
      'No perfumes, strong lotions, or insect repellents allowed.',
      'Advance booking is required due to limited capacity.',
      'All interactions are controlled for animal welfare and safety.',
    ],
    cta: {
      title: 'A Rare Wildlife Encounter in Zanzibar',
      text:
        'Meet rescued animals face-to-face and discover the powerful conservation stories behind Zanzibar’s most unique wildlife sanctuary.',
    },
  },
  {
    slug: 'selous-fly-in-safari',
    title: 'Selous Day Safari (Nyerere National Park)',
    subtitle:
      'A full-day fly-in safari from Zanzibar into one of Africa’s largest protected wilderness areas.',
    categorySlug: 'safari-and-beyond',
    duration: 'Full Day',
    experienceType: 'Shared Safari',
    departure: 'Zanzibar Airport',
    startTime: 'Early Morning Departure',
    bestTime: 'Year-round',
    idealFor: 'Couples, families, groups, photographers, and wildlife lovers',
    image: '/images/experiences/safari/pexels-wussol-2147803031-30894532.jpg',
    imagePosition: 'center 46%',
    cardLine:
      'A same-day fly-in safari from Zanzibar into the scale and wildlife of Nyerere National Park.',
    intro: [
      'Experience Africa’s wilderness in just one day with a fly-in safari to Selous, now part of Nyerere National Park. Known for its elephants, lions, hippos, crocodiles, and rich birdlife, this vast protected area offers an unforgettable safari experience only a short flight away from Zanzibar.',
      'The journey combines scenic flights, guided game drives, and time immersed in Tanzania’s natural landscapes — making it the perfect safari addition to your Zanzibar holiday.',
    ],
    highlights: [
      'Same-day return safari from Zanzibar',
      'Scenic flight over Tanzania’s coastline and landscapes',
      'Game drive through Nyerere National Park',
      'Opportunity to encounter elephants, lions, giraffes, zebras, hippos, and crocodiles',
      'Picnic lunch surrounded by nature',
      'One of Africa’s largest protected wildlife areas',
    ],
    narrative: [
      'The experience begins with an early morning departure from Zanzibar, flying across the Tanzanian coastline towards the vast wilderness of Nyerere National Park. Upon arrival at the Selous airstrip, you’ll meet your safari guide and begin a full-day game drive through diverse landscapes shaped by rivers, open plains, and dense bush.',
      'Throughout the day, there are opportunities to encounter some of Africa’s most iconic wildlife, including elephants moving across the savannah, giraffes feeding among the trees, hippos resting near water sources, and, with luck, predators such as lions in their natural habitat. The park’s scale and remote atmosphere create a safari experience that feels both wild and authentic.',
      'Midway through the experience, you’ll pause for a picnic lunch in the bush before continuing the afternoon game drive through different areas of the park. After a full day exploring the wilderness, the journey concludes with a return flight back to Zanzibar in the late afternoon.',
    ],
    options: [
      {
        title: 'Shared Safari Experience',
        description:
          'A professionally guided shared safari experience, offering a social and efficient way to explore Nyerere National Park in a single day.',
      },
      {
        title: 'Private Safari Experience',
        description:
          'A more exclusive safari option with greater flexibility and a more personalized experience throughout the day.',
      },
    ],
    included: [
      'Return flights between Zanzibar and Selous',
      'Park entrance fees',
      'Full-day safari game drive',
      'Picnic lunch',
      'Bottled drinking water',
      'English-speaking safari guide',
      '4x4 safari vehicle',
    ],
    bring: [
      'Comfortable lightweight clothing',
      'Walking shoes',
      'Hat and sunglasses',
      'Sunscreen',
      'Camera or binoculars',
      'Small personal bag',
    ],
    notes: [
      'This experience is typically operated as a shared safari.',
      'Private safari arrangements are available upon request.',
      'Wildlife sightings vary and cannot be guaranteed.',
      'Flight and safari schedules may vary depending on weather and operational conditions.',
      'Exact departure times will be confirmed prior to travel.',
    ],
    cta: {
      title: 'Fly Into Tanzania’s Wilderness',
      text:
        'Discover the landscapes, wildlife, and atmosphere of Nyerere National Park in a seamless full-day safari experience from Zanzibar.',
    },
  },
  {
    slug: 'mikumi-safari-from-zanzibar',
    title: 'Mikumi Safari from Zanzibar',
    subtitle:
      'A full-day safari adventure from Zanzibar into the wild landscapes of mainland Tanzania.',
    categorySlug: 'safari-and-beyond',
    duration: 'Full Day',
    experienceType: 'Shared Safari',
    departure: 'Zanzibar Airport',
    startTime: 'Early Morning Departure',
    bestTime: 'Year-round',
    idealFor: 'Couples, families, groups, and wildlife lovers',
    image: '/images/experiences/safari/pexels-adrien-olichon-1257089-36702544.jpg',
    imagePosition: 'center 52%',
    cardLine: 'A fly-in full-day safari that pairs Zanzibar with mainland wildlife in one clean extension.',
    intro: [
      'We all know that feeling — you’ve booked your Zanzibar escape, but the dream of experiencing an African safari is still calling. This full-day safari to Mikumi National Park offers the opportunity to combine both in one unforgettable journey.',
      'Fly from Zanzibar to mainland Tanzania and spend the day exploring one of the country’s most accessible national parks, home to elephants, giraffes, lions, zebras, buffalo, and a wide variety of birdlife. The experience combines adventure, nature, and comfort, making it an ideal addition to your Zanzibar holiday.',
    ],
    highlights: [
      'Wildlife encounters including elephants, giraffes, lions, and zebras',
      'Guided safari game drive in a 4x4 vehicle',
      'Scenic landscapes across Mikumi National Park',
      'Picnic lunch surrounded by nature',
      'Fly-in safari experience directly from Zanzibar',
      'Opportunity to experience Tanzania’s wildlife in a single day',
    ],
    narrative: [
      'The experience begins with an early morning flight from Zanzibar to Mikumi National Park, offering views of the coastline before transitioning into Tanzania’s vast inland landscapes. Upon arrival, you’ll meet your safari guide and begin a game drive through the park’s open savannah and wildlife-rich areas.',
      'Mikumi is known for its abundant wildlife and expansive plains, providing excellent opportunities to encounter elephants, giraffes, zebras, buffalo, and, with luck, lions resting in the shade. Throughout the journey, your guide will help you understand the ecosystem, wildlife behavior, and the natural beauty of the region.',
      'Midway through the experience, there is a stop for a scenic picnic lunch within the park before continuing the safari drive through different sections of Mikumi. After a full day immersed in nature, you’ll return to the airstrip for your flight back to Zanzibar.',
    ],
    options: [
      {
        title: 'Shared Safari Experience',
        description:
          'A professionally guided shared safari experience, offering a social and efficient way to explore Mikumi National Park in a single day.',
      },
    ],
    included: [
      'Return flights between Zanzibar and Mikumi',
      'National park entry fees',
      'Guided safari game drive',
      'Picnic lunch',
      'Bottled drinking water',
      'Professional safari guide',
    ],
    bring: [
      'Comfortable lightweight clothing',
      'Walking shoes',
      'Hat and sunglasses',
      'Sunscreen',
      'Camera or binoculars',
      'Small personal bag',
    ],
    notes: [
      'This is a shared safari experience.',
      'Wildlife sightings vary and cannot be guaranteed.',
      'Flight and safari schedules may vary depending on weather and operational conditions.',
      'Exact departure times will be confirmed prior to travel.',
    ],
    cta: {
      title: 'Add a Safari to Your Zanzibar Journey',
      text:
        'Experience the contrast between Zanzibar’s coastline and Tanzania’s wildlife in one seamless adventure.',
    },
  },
  {
    slug: 'serengeti-short-extension',
    title: 'Serengeti Short Extension',
    subtitle: 'A premium mainland add-on for travelers who want iconic safari without turning the whole trip into logistics.',
    categorySlug: 'safari-and-beyond',
    duration: '2 to 3 Nights',
    experienceType: 'Private',
    departure: 'Zanzibar Airport',
    startTime: 'Morning departure',
    bestTime: 'Season-dependent',
    idealFor: 'Travelers wanting a stronger safari chapter',
    image: '/images/experiences/safari/pexels-hugosykes-30705849.jpg',
    cardLine: 'A shorter Serengeti chapter built to integrate with Zanzibar cleanly.',
    intro: [
      'For travelers who want a more recognisable safari chapter, the Serengeti can be added in a way that still respects the wider flow of the journey.',
      'The goal is not to cram the itinerary, but to give the safari enough space to feel worthwhile.',
    ],
    highlights: ['Iconic safari setting', 'Short premium extension', 'Works well after Zanzibar', 'Private arrangement'],
    narrative: [
      'This extension is structured to avoid the feeling of overbuilding the trip. Transfers, timing, and pacing are arranged so the safari fits as a deliberate second movement rather than a bolt-on.',
      'It works especially well for couples or milestone trips where the contrast between island and mainland is part of the appeal.',
    ],
    options: [
      { title: '2-Night Extension', description: 'A concise safari chapter with strong impact.' },
      { title: '3-Night Extension', description: 'A slightly fuller version with more breathing room.' },
    ],
    included: ['Flight and transfer coordination', 'Safari handling', 'Lodge alignment support'],
    bring: ['Travel documents', 'Neutral layers', 'Camera'],
    notes: ['Seasonality affects routing and wildlife rhythm.', 'Advance planning is strongly recommended.'],
  },
  {
    slug: 'mainland-bush-and-coast-combination',
    title: 'Mainland Bush and Coast Combination',
    subtitle: 'A longer combination route that connects safari and Zanzibar with a smoother overall flow.',
    categorySlug: 'safari-and-beyond',
    duration: 'Multi-Day Extension',
    experienceType: 'Private',
    departure: 'Custom',
    startTime: 'Custom',
    bestTime: 'Season-dependent',
    idealFor: 'Couples and milestone trips',
    image: '/images/experiences/safari/pexels-marri-shyam-366418-32457066.jpg',
    cardLine: 'A longer-flow safari and coast route designed as one journey.',
    intro: [
      'Some trips benefit from being designed as a full sequence rather than island-first and safari-second. This route is for travelers who want the whole itinerary composed as one narrative.',
      'It allows for stronger pacing between movement, stillness, and contrast.',
    ],
    highlights: ['Longer integrated journey', 'Coast and safari sequencing', 'Private arrangement', 'Higher planning value'],
    narrative: [
      'The structure is built around transitions: how you leave one setting, enter another, and maintain continuity in the experience rather than simply moving locations.',
      'That makes this a strong option for travelers who care about how the trip feels as a whole, not only what is included on paper.',
    ],
    options: [
      { title: 'Balanced Combination', description: 'A stronger split between coast and bush.' },
      { title: 'Safari-Led Combination', description: 'More time allocated to the mainland chapter.' },
    ],
    included: ['Routing design', 'Ground coordination', 'Planning support'],
    bring: ['Travel documents', 'Flexible wardrobe', 'Camera'],
    notes: ['This route is best planned in advance.', 'Itinerary length depends on how much depth you want on each side.'],
  },
  {
    slug: 'private-dhow-charter-day',
    title: 'Private Dhow Charter Day',
    subtitle: 'A fully private water day shaped around your own timing and route.',
    categorySlug: 'private-experiences',
    duration: 'Half Day to Full Day',
    experienceType: 'Private',
    departure: 'Flexible coastline departure',
    startTime: 'Flexible',
    bestTime: 'Weather and tide dependent',
    idealFor: 'Couples, families, and private groups',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A private boat day designed around your pace rather than a shared schedule.',
    intro: [
      'Private chartering changes the feel of an ocean day completely. Instead of adapting to a fixed departure and stop sequence, the experience is shaped around your own priorities.',
      'It is one of the clearest ways to add privacy and flexibility to a Zanzibar itinerary.',
    ],
    highlights: ['Private boat use', 'Flexible route', 'Adaptable timing', 'More privacy'],
    narrative: [
      'The day is structured around conditions and preference, whether that means more swimming, more cruising, or simply more time in one place.',
      'That flexibility is the real value: the experience feels calmer because it is not being shared or rushed.',
    ],
    options: [
      { title: 'Half Day Charter', description: 'A lighter private ocean chapter.' },
      { title: 'Full Day Charter', description: 'More room for multiple stops and slower pacing.' },
    ],
    included: ['Private charter setup', 'Crew support', 'Refreshments depending on routing'],
    bring: ['Swimwear', 'Towel', 'Sun protection'],
    notes: ['Route depends on tide and sea conditions.', 'Planning is adjusted to suit your preferred tone.'],
  },
  {
    slug: 'private-stone-town-after-hours',
    title: 'Private Stone Town After Hours',
    subtitle: 'A quieter private version of the city, designed around atmosphere and lower crowd levels.',
    categorySlug: 'private-experiences',
    duration: 'Evening',
    experienceType: 'Private',
    departure: 'Stone Town',
    startTime: 'Late afternoon or evening',
    bestTime: 'Evening',
    idealFor: 'Couples and repeat visitors',
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A more private, more atmospheric version of Stone Town.',
    intro: [
      'Stone Town changes significantly once the day begins to soften. A private evening route allows the city to feel less crowded and more atmospheric.',
      'This experience is shaped for travelers who want context and mood rather than daytime intensity.',
    ],
    highlights: ['Evening atmosphere', 'Private guide pacing', 'Less crowded route', 'Flexible add-ons'],
    narrative: [
      'The experience moves through selected streets and vantage points as the city transitions into evening. The slower pace makes space for architecture, air, and atmosphere in a different way from a standard daytime walk.',
      'It can also be paired with dinner or another evening continuation if desired.',
    ],
    options: [
      { title: 'Walk Only', description: 'A clean, private cultural route with evening timing.' },
      { title: 'Walk and Dinner Continuation', description: 'Extends the experience into the evening smoothly.' },
    ],
    included: ['Private guide', 'Flexible routing', 'Evening planning'],
    bring: ['Comfortable footwear', 'Light layer'],
    notes: ['Route depends on preferred tone and current activity in town.'],
  },
  {
    slug: 'exclusive-celebration-arrangement',
    title: 'Exclusive Celebration Arrangement',
    subtitle: 'A private experience built for proposals, anniversaries, or milestone moments.',
    categorySlug: 'private-experiences',
    duration: 'Custom',
    experienceType: 'Private',
    departure: 'Custom location',
    startTime: 'Custom',
    bestTime: 'Depends on the concept',
    idealFor: 'Celebrations and milestone trips',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A custom private arrangement for significant moments during the journey.',
    intro: [
      'Certain moments in a trip need more than a standard experience. This arrangement is designed to support a milestone in a way that still feels elegant and controlled.',
      'The focus is on tone, privacy, and execution rather than spectacle for its own sake.',
    ],
    highlights: ['Custom concepting', 'Private handling', 'Discreet coordination', 'Celebration-focused'],
    narrative: [
      'The arrangement begins with the mood you want to create, then works backwards through timing, setting, privacy, and flow. That planning discipline keeps the outcome feeling polished rather than overworked.',
      'It can sit within a broader itinerary or become the defining moment of the trip itself.',
    ],
    options: [
      { title: 'Private Dinner Setting', description: 'A quieter celebration built around a private table and atmosphere.' },
      { title: 'Custom Proposal Concept', description: 'A more tailored arrangement with stronger planning support.' },
    ],
    included: ['Concept development', 'Coordination support', 'Private setup handling'],
    bring: ['Any personal items required for the occasion'],
    notes: ['Advance notice is strongly recommended.', 'Final setup depends on privacy level and location.'],
  },
];

type ExperienceBrochureOverride = Partial<ExperienceBrochure>;

const brochureOverrides: Partial<Record<string, ExperienceBrochureOverride>> = {
  'mnemba-island-marine-experience': {
    overview:
      'Increase your chances of spotting some of Tanzania’s rarest marine life on a guided snorkeling tour around Mnemba Island, one of Zanzibar’s most famous marine conservation areas. This morning experience blends dolphin encounters, clear reef water, and a lighter on-board rhythm that keeps the trip scenic rather than rushed.',
    highlights: [
      'Cruise from Muyuni toward Mnemba waters for a chance to spot spinner dolphins',
      'Snorkeling in one of Zanzibar’s best-known conservation areas',
      'Seasonal fruit and refreshments served on board',
      'A clean morning flow that works well within a wider itinerary',
    ],
    fullItinerary: [
      {
        label: '08:00',
        title: 'Departure from Muyuni',
        description: 'Board the boat on Zanzibar’s northeast coast and set out toward Mnemba Island.',
      },
      {
        label: '08:30',
        title: 'Dolphin search en route',
        description: 'Cruise through Mnemba waters with the chance to encounter spinner dolphins along the way.',
      },
      {
        label: '09:30',
        title: 'Snorkeling at the reef',
        description: 'Enter the marine conservation area for a guided snorkeling session above coral and tropical fish.',
      },
      {
        label: '10:30',
        title: 'Fruit and recovery time on board',
        description: 'Relax between stops with fresh fruit, bottled water, and open-water views.',
      },
      {
        label: '11:30',
        title: 'Return to Muyuni',
        description: 'Head back to shore before midday so the experience remains light and well-paced.',
      },
    ],
    includes: [
      'Boat transfer',
      'Snorkeling equipment',
      'Seasonal fruit platter',
      'Refreshments',
      'Entry fees to Mnemba Marine Conservation',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional meals'],
    notes:
      'Marine sightings are never guaranteed, and this experience may operate on a shared basis unless arranged privately in advance.',
  },
  'blue-safari': {
    overview:
      'Blue Safari is one of Zanzibar’s best-known full-day ocean experiences, combining dhow sailing, snorkeling, sandbanks, seafood lunch, and the island-dotted waters off the southwest coast. It works best when approached as a full-day marine rhythm rather than a sequence of rushed stops.',
    highlights: [
      'Traditional dhow sailing from Fumba across Zanzibar’s southwest waters',
      'Time on a white sandbank for swimming, photos, and a slower ocean pause',
      'Guided snorkeling above coral reefs and tropical fish',
      'Seafood BBQ lunch served on Kwale Island',
      'Possible Blue Lagoon swim depending on tide and sea conditions',
    ],
    fullItinerary: [
      {
        label: '09:00',
        title: 'Departure from Fumba',
        description:
          'Board a traditional dhow in Fumba and set out along Zanzibar’s southwest coast through calm turquoise water.',
      },
      {
        label: 'Morning',
        title: 'Sandbank stop',
        description:
          'Pause at a sandbank for swimming, relaxing, and taking in the open-water setting before continuing onward.',
      },
      {
        label: 'Late Morning',
        title: 'Snorkeling session',
        description:
          'Join a guided snorkeling stop in clear, shallow water around reef areas known for tropical fish and coral.',
      },
      {
        label: 'Midday',
        title: 'Kwale Island lunch',
        description:
          'Continue to Kwale Island for a freshly prepared seafood BBQ lunch, fruit, and shaded time ashore.',
      },
      {
        label: 'Afternoon',
        title: 'Blue Lagoon or return sail',
        description:
          'Depending on tide and weather, include a Blue Lagoon swim before sailing back toward Fumba later in the day.',
      },
      {
        label: 'Late Afternoon',
        title: 'Return to Fumba',
        description:
          'Close the experience with a relaxed sail back after a full day of reef, island, and ocean time.',
      },
    ],
    includes: [
      'Traditional dhow trip with crew',
      'Snorkeling equipment',
      'Seafood BBQ lunch',
      'Tropical fruits',
      'Bottled water and soft drinks',
      'Marine conservation fees',
      'Professional guide',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional alcoholic drinks'],
    notes:
      'This experience is typically operated as a shared tour of around 10 to 14 guests per boat, though private dhow arrangements are available on request. The itinerary and timings vary with tide and sea conditions, and access to the Blue Lagoon depends on water levels and weather.',
  },
  'nakupenda-sandbank-experience': {
    overview:
      'Nakupenda is one of Zanzibar’s most iconic tide-shaped marine settings: a sandbank that appears and disappears with the ocean, creating a short-lived platform of white sand surrounded by clear turquoise water. The experience works best when built around low tide timing, slower pacing, and the simple contrast between Stone Town’s shoreline and the open sea beyond it.',
    highlights: [
      'Boat crossing from Stone Town to a tide-shaped ocean sandbank',
      'Swimming, relaxation, and shallow-water marine time',
      'Optional snorkeling near nearby coral areas',
      'Fruit platter or seafood BBQ depending on package type',
      'A highly photogenic open-ocean setting that changes with the tide',
    ],
    fullItinerary: [
      {
        label: 'Morning',
        title: 'Departure from Stone Town',
        description:
          'Leave by boat from Stone Town and cross turquoise water with views of the historic coastline behind you.',
      },
      {
        label: 'Arrival',
        title: 'Sandbank time',
        description:
          'Step onto Nakupenda Sandbank for swimming, sun, photos, and a slower ocean pause in shallow clear water.',
      },
      {
        label: 'Mid-Visit',
        title: 'Snorkeling and marine exploration',
        description:
          'Depending on conditions and package, move to nearby reef areas for a lighter snorkeling stop.',
      },
      {
        label: 'Lunch',
        title: 'Seafood BBQ or fruit service',
        description:
          'Enjoy a fruit platter or seafood BBQ setup directly on the sandbank depending on the arrangement selected.',
      },
      {
        label: 'Return',
        title: 'Cruise back to Stone Town',
        description:
          'Head back as the tide reshapes the sandbank and the open-water chapter closes.',
      },
    ],
    includes: [
      'Boat transfer from Stone Town',
      'Visit to Nakupenda Sandbank',
      'Swimming and relaxation time',
      'Snorkeling equipment when included',
      'Fruit platter or seafood BBQ depending on package',
      'Professional boat crew',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional drinks beyond standard setup'],
    notes:
      'Timing is tide dependent, and the visible size of the sandbank changes with ocean conditions. Snorkeling visibility and meal setup also depend on weather and package type.',
  },
  'stone-town-cultural-walk': {
    overview:
      'Step into the living heart of Zanzibar with a guided Stone Town tour through winding alleys, historic landmarks, markets, and centuries of layered cultural influence. This UNESCO World Heritage Site rewards context, and the experience works best when it balances major landmarks with the smaller details that make the old town feel alive.',
    highlights: [
      'Visit the Sultan’s Palace and Old Slave Market',
      'Explore the House of Wonders and Old Fort',
      'Walk through narrow alleys, carved doors, and market streets',
      'Optional cafe, rooftop, shopping, or Forodhani extensions depending on timing',
    ],
    fullItinerary: [
      {
        label: 'Flexible Start',
        title: 'Meet your guide',
        description:
          'Begin at a flexible meeting point in Stone Town and start with an introduction to the city’s layered history.',
      },
      {
        label: 'Historic Core',
        title: 'Major landmarks and heritage sites',
        description:
          'Walk between key highlights such as the Sultan’s Palace, Old Slave Market, House of Wonders, and Old Fort.',
      },
      {
        label: 'Streets & Markets',
        title: 'Alleys, doors, and daily life',
        description:
          'Move through markets, narrow streets, carved wooden doors, and local shopfronts as the city reveals its lived texture.',
      },
      {
        label: 'Optional Continuation',
        title: 'Cafe, rooftop, shopping, or evening extension',
        description:
          'Add time for photography, shopping, cafe stops, rooftop views, or a later continuation toward Forodhani depending on your pace.',
      },
    ],
    includes: ['Professional local guide', 'Entry fees to main attractions', 'Guided walking tour of Stone Town'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Meals unless added on'],
    notes:
      'This is a flexible walking tour that can be customized around interests, pace, and current opening times. Moderate walking is required throughout the experience.',
  },
  'prison-island-tour': {
    overview:
      'Prison Island, also known as Changuu Island, offers one of Zanzibar’s easiest half-day contrasts to Stone Town: a short boat crossing, layered island history, giant Aldabra tortoises, and clear coastal views back toward the old town. It is most rewarding when treated as a light island chapter rather than a rushed checklist stop.',
    highlights: [
      'Short scenic boat ride from Stone Town across turquoise water',
      'Visit to the historic prison ruins and island heritage site',
      'Time with giant Aldabra tortoises in the sanctuary area',
      'Relaxed shoreline atmosphere with strong photography opportunities',
      'Optional snorkeling or sandbank lunch extension nearby',
    ],
    fullItinerary: [
      {
        label: 'Departure',
        title: 'Boat ride from Stone Town',
        description:
          'Leave from Stone Town by boat and cross to Prison Island with open-water views and the old town skyline behind you.',
      },
      {
        label: 'Arrival',
        title: 'Island history and orientation',
        description:
          'Arrive on Changuu Island and begin with an introduction to the island’s history and changing role over time.',
      },
      {
        label: 'Exploration',
        title: 'Prison ruins and tortoise sanctuary',
        description:
          'Walk the old prison site and continue to the Aldabra tortoise sanctuary for guided viewing and photos.',
      },
      {
        label: 'Leisure Time',
        title: 'Shoreline pause',
        description:
          'Spend time by the shore enjoying ocean views, taking photographs, or extending the excursion with optional add-ons.',
      },
      {
        label: 'Return',
        title: 'Boat back to Stone Town',
        description:
          'Return to Stone Town after a short island chapter that blends history, wildlife, and coastal atmosphere.',
      },
    ],
    includes: [
      'Boat transfer between Stone Town and Prison Island',
      'Entrance fees',
      'Guided tour of the prison ruins',
      'Visit to the giant tortoise sanctuary',
      'Professional local guide',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Optional snorkeling or lunch add-ons'],
    notes:
      'This experience may be shared unless booked privately. Boat crossings depend on sea and weather conditions, and wildlife interactions should always remain respectful and guided by local instructions.',
  },
  'spice-farm-and-local-table': {
    overview:
      'Uncover Zanzibar’s world-famous Spice Island identity with a guided walk through a local farm in Kijichi, where spices, herbs, and tropical fruits are cultivated as part of everyday life. This is a sensory experience as much as a cultural one, built around aroma, touch, taste, and the stories that connect Zanzibar’s agricultural heritage to its wider identity.',
    highlights: [
      'Guided walk through a local spice farm with a knowledgeable local expert',
      'Smell, touch, and taste fresh spices, herbs, and tropical fruits',
      'Learn traditional medicinal, culinary, and cosmetic uses',
      'Browse locally produced spice products after the tour',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Welcome at the spice farm',
        description:
          'Arrive in Kijichi and begin with an introduction to Zanzibar’s spice history and the role of cultivation on the island.',
      },
      {
        label: 'Farm Walk',
        title: 'Spices, herbs, and tropical plants',
        description:
          'Walk through the plantation with your guide and learn how cloves, cinnamon, vanilla, nutmeg, cardamom, and other plants grow and are used.',
      },
      {
        label: 'Tasting',
        title: 'Fruit, spice, and tea tasting',
        description:
          'Pause for a sensory tasting session featuring fresh fruits, spices, and herbal teas directly from the farm.',
      },
      {
        label: 'Close',
        title: 'Spice shop and return',
        description:
          'Finish with time to browse local products at the spice shop before the experience concludes.',
      },
    ],
    includes: ['Guided spice farm tour', 'Fresh fruit and spice tasting', 'Professional local guide', 'Entrance fees'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional meals'],
    notes:
      'This experience may be shared unless booked privately. Spice availability varies by season, and some plants may not be in harvest year-round. Respect for the farm environment and local instructions is expected throughout.',
  },
  'swahili-culinary-experience': {
    overview:
      'This hands-on Swahili cooking experience is designed as both a food session and a cultural introduction. Rather than only serving a meal, it brings guests directly into the spices, techniques, and storytelling that shape Zanzibar’s cuisine through African, Arab, and Indian influence.',
    highlights: [
      'Hands-on preparation of signature Swahili dishes with local chefs',
      'Ingredient and spice introductions rooted in Zanzibar’s food culture',
      'Shared meal of the dishes prepared during the session',
      'Recipe guidance to take home after the class',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Welcome at the culinary venue',
        description:
          'Arrive in Kijichi and meet your chef for an introduction to the session, ingredients, and cooking plan.',
      },
      {
        label: 'Preparation',
        title: 'Spices, chopping, and technique',
        description:
          'Begin preparing ingredients while learning how spice combinations and cooking methods shape Swahili cuisine.',
      },
      {
        label: 'Cooking',
        title: 'Guided hands-on dish preparation',
        description:
          'Cook step by step with the chef, building dishes such as pilau, coconut curry, and chapati depending on the menu.',
      },
      {
        label: 'Meal',
        title: 'Shared tasting and dining',
        description:
          'Sit down together to enjoy the dishes prepared during the class in a more relaxed communal setting.',
      },
      {
        label: 'Close',
        title: 'Recipes and wrap-up',
        description:
          'Finish with recipe guidance and the chance to ask questions before departing.',
      },
    ],
    includes: ['Guided cooking class with local chef', 'All ingredients provided', 'Meal depending on session', 'Recipe booklet to take home'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional beverages unless arranged'],
    notes:
      'Menus vary slightly with seasonality and ingredient availability, but the emphasis remains on active participation and well-handled food preparation throughout.',
  },
  'mamas-of-zanzibar-experience': {
    overview:
      'Mamas of Zanzibar is one of the island’s strongest community-based cultural experiences because it takes place inside a real home, with real hosts, and a format built around exchange rather than performance. The value lies in cooking, conversation, and time shared with the women who preserve and pass on everyday Swahili traditions.',
    highlights: [
      'Hosted inside a real Zanzibari home by local women',
      'Hands-on Swahili cooking and shared meal',
      'Stories, recipes, and cultural context passed on directly by the hosts',
      'A community-based experience that supports local women and families',
    ],
    fullItinerary: [
      {
        label: 'Welcome',
        title: 'Arrival at the home base',
        description:
          'Arrive in the Bububu area and receive a warm welcome from the Mamas with an introduction to their initiative.',
      },
      {
        label: 'Cooking Session',
        title: 'Hands-on preparation with the Mamas',
        description:
          'Cook together using local ingredients and spices while learning the family techniques and cultural meaning behind the dishes.',
      },
      {
        label: 'Shared Meal',
        title: 'Eat together in a family-style setting',
        description:
          'Gather around the table to enjoy the meal and let conversation, laughter, and exchange unfold naturally.',
      },
      {
        label: 'Close',
        title: 'Stories, photos, and reflection',
        description:
          'Take time for photos, slower conversation, and a gentle close to the experience before departing.',
      },
    ],
    includes: ['Guided cultural cooking experience', 'All ingredients and cooking materials', 'Home-cooked Swahili meal', 'Local host interaction and storytelling'],
    excludes: ['Personal expenses', 'Tips or donations beyond what you choose to give', 'Transport unless arranged separately'],
    notes:
      'This is a community-based shared experience unless arranged privately. Modest dress and punctual arrival are important, and the experience directly supports local women and families.',
  },
  'dhow-sunset-cruise': {
    overview:
      'Sail into the golden Zanzibar sunset aboard a traditional wooden dhow and experience one of the island’s most iconic evening settings. Calm water, open sky, and a slower pace define the experience more than anything else, making it a simple but memorable way to end the day.',
    highlights: [
      'Traditional dhow sailing along Zanzibar’s coastline',
      'Open-water sunset views across the Indian Ocean',
      'Refreshments served on board during the cruise',
      'Optional live music to elevate the atmosphere',
      'Strong fit for couples, honeymooners, families, and small groups',
    ],
    fullItinerary: [
      {
        label: 'Boarding',
        title: 'Set sail from Stone Town or Kendwa',
        description:
          'Board your traditional dhow in the late afternoon and leave the shoreline behind as the evening begins.',
      },
      {
        label: 'Cruise',
        title: 'Relaxed coastal sailing',
        description:
          'Glide along the coast with ocean breeze, refreshments, and a calm pace designed for pure relaxation.',
      },
      {
        label: 'Sunset',
        title: 'Golden-hour and horizon views',
        description:
          'Watch the sky transform into gold, orange, and pink as the sun drops over the Indian Ocean.',
      },
      {
        label: 'Return',
        title: 'Back to shore',
        description:
          'Return gently to shore after sunset for a peaceful close to the day.',
      },
    ],
    includes: [
      'Traditional dhow cruise',
      'Professional crew',
      'Refreshments on board',
      'Sunset sailing experience',
      'Optional live band on request',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Meals'],
    notes:
      'This experience is weather dependent and may be adjusted for safety. Sunset visibility varies by season and conditions, and private upgrades or live music can be arranged on request.',
  },
  'jungle-and-coast-bike-experience': {
    overview:
      'This quad bike route is designed to show a different side of Zanzibar: villages, rice fields, fishing communities, and the rural spaces between the coastline and the island’s interior. The value is not only in the ride itself, but in how the route reveals everyday island life beyond the resort corridor.',
    highlights: [
      'Quad bike departure from Kiwengwa after a full safety briefing',
      'Ride through Pwani Mchangani and Kinyasini community areas',
      'Pass rice fields, sandy tracks, mud houses, and rural settlements',
      'Observe fishing villages and local coastal livelihoods',
      'A guided route shaped around both scenery and respectful local context',
    ],
    fullItinerary: [
      {
        label: 'Start',
        title: 'Safety briefing in Kiwengwa',
        description:
          'Begin in Kiwengwa with a full quad introduction, safety briefing, and equipment setup before setting off.',
      },
      {
        label: 'Village Route',
        title: 'Pwani Mchangani and local community stops',
        description:
          'Ride through village routes and community areas where daily life unfolds naturally around the trail.',
      },
      {
        label: 'Interior Landscapes',
        title: 'Kinyasini and rice field tracks',
        description:
          'Continue inland through rice fields, rural settlements, and sandy routes that reveal Zanzibar beyond the beaches.',
      },
      {
        label: 'Coastal Chapter',
        title: 'Fishing villages and shoreline life',
        description:
          'Pass through fishing communities and observe local coastal livelihoods with selected photo and refreshment stops.',
      },
      {
        label: 'Return',
        title: 'Ride back to the starting point',
        description:
          'Complete the route with a return to the base after an off-road journey through the island’s heartland.',
      },
    ],
    includes: [
      'Quad bike rental',
      'Professional local guide',
      'Safety briefing and equipment',
      'Refreshment stop during the ride',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Optional local purchases'],
    notes:
      'All riders must follow guide safety instructions throughout the experience. Routes are selected for safety and community respect, and weather conditions may affect timing or route choice.',
  },
  'jozani-forest-exploration': {
    overview:
      'Jozani Chwaka Bay National Park offers one of Zanzibar’s clearest ecological contrasts to the coast: shaded trails, mangrove systems, and the chance to encounter the rare Red Colobus monkey in a protected forest setting. The experience works best as a calm, guided nature walk with strong educational value rather than a fast wildlife checklist.',
    highlights: [
      'See the endangered Red Colobus monkeys',
      'Guided walk through shaded forest trails',
      'Mangrove boardwalk and ecosystem interpretation',
      'Strong fit for nature lovers, photographers, and families',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Park welcome and briefing',
        description:
          'Arrive at Jozani Chwaka Bay National Park and begin with an introduction to the forest and its ecological importance.',
      },
      {
        label: 'Woodland Route',
        title: 'Forest trails and red colobus viewing',
        description:
          'Follow shaded trails where red colobus monkeys are often seen while learning about their behavior and conservation.',
      },
      {
        label: 'Mangroves',
        title: 'Mangrove boardwalk and coastal ecology',
        description:
          'Continue into the mangrove zone to understand how these systems protect shoreline and support biodiversity.',
      },
      {
        label: 'Close',
        title: 'Photos and return',
        description:
          'Finish with time for photographs and a slower return from the forest.',
      },
    ],
    includes: ['Entrance fees to Jozani Forest', 'Guided forest walk', 'Mangrove boardwalk visit', 'Professional local guide'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Meals'],
    notes:
      'Wildlife sightings are natural and cannot be guaranteed. Weather and trail conditions vary, and all visitors should remain on designated routes and follow park guidance.',
  },
  'nungwi-aquarium': {
    overview:
      'Nungwi Aquarium is best approached as a conservation-led sanctuary visit rather than a simple swim stop. The natural tidal pool setting, rescue story, and guided turtle interaction create a marine experience that feels more meaningful when guests understand the rehabilitation work behind it.',
    highlights: [
      'Swim with rescued sea turtles in a natural tidal pool',
      'Learn about rescue, rehabilitation, and release efforts',
      'Feed and observe turtles under supervision',
      'A family-friendly marine conservation activity in Nungwi village',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Welcome and sanctuary introduction',
        description:
          'Arrive at the Nungwi Aquarium and begin with an overview of the sanctuary’s conservation role.',
      },
      {
        label: 'Pool Access',
        title: 'Guided turtle interaction',
        description:
          'Enter the tidal pool area for supervised swimming, observation, and feeding where permitted.',
      },
      {
        label: 'Learning',
        title: 'Conservation insight',
        description:
          'Learn how turtles are rescued, cared for, and protected within the wider marine ecosystem.',
      },
      {
        label: 'Close',
        title: 'Photos and wind-down',
        description:
          'Take photos, relax briefly, and close the experience after your guided session.',
      },
    ],
    includes: ['Entry to Nungwi Aquarium', 'Turtle swim and feeding experience', 'Basic guide and orientation', 'Conservation briefing'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Transport unless arranged'],
    notes:
      'This is a conservation-focused experience, and all turtle interaction must follow guide instructions closely. Wildlife behavior varies naturally, and respect for the sanctuary environment is essential.',
  },
  'sky-diving-zanzibar': {
    overview:
      'A tandem skydive over Zanzibar is less about duration than intensity: a short but unforgettable sequence of preparation, ascent, freefall, parachute glide, and beach landing. What makes it exceptional is the contrast between extreme adrenaline and the calm beauty of the coast below.',
    highlights: [
      'Tandem jump from 10,000 feet with certified instructor',
      '30 to 40 seconds of freefall above ocean and beach',
      'Several minutes of panoramic glide under canopy',
      'Beach landing at Kendwa with optional media upgrade',
    ],
    fullItinerary: [
      {
        label: 'Check-In',
        title: 'Registration and safety briefing',
        description:
          'Arrive at the drop zone near Kendwa for check-in, gear fitting, and a full tandem safety briefing.',
      },
      {
        label: 'Ascent',
        title: 'Scenic climb to altitude',
        description:
          'Board the aircraft and climb to 10,000 feet with wide views over Zanzibar’s coast, reefs, and surrounding sea.',
      },
      {
        label: 'Jump',
        title: 'Freefall and parachute glide',
        description:
          'Exit in tandem for a brief but intense freefall, then transition into a calmer canopy glide over the shoreline.',
      },
      {
        label: 'Landing',
        title: 'Beach touchdown and certificate',
        description:
          'Land back near Kendwa, debrief, and collect your completion certificate with optional media afterward.',
      },
    ],
    includes: ['Certified tandem skydiving instructor', 'Full safety briefing and equipment', 'Scenic aircraft ascent', 'Tandem skydive experience', 'Completion certificate'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Premium media package unless booked'],
    notes:
      'Strict weight, weather, and medical suitability requirements apply. This activity may be rescheduled for safety, and all instructor guidance must be followed without exception.',
  },
  'game-fishing-zanzibar': {
    overview:
      'Game fishing in Zanzibar combines open-water adventure with real offshore sport. Conditions, species movement, and location all vary, so the best trips are those approached with patience, a good crew, and an understanding that the reward is the whole experience as much as the catch itself.',
    highlights: [
      'Deep-sea charter with professional local fishing crew',
      'Rods, bait, gear, and support provided on board',
      'Chance to target tuna, marlin, dorado, barracuda, and kingfish',
      'Half-day and full-day options depending on appetite for time offshore',
    ],
    fullItinerary: [
      {
        label: 'Early Start',
        title: 'Meet crew and depart',
        description:
          'Meet at the selected departure point and leave early for offshore grounds based on conditions and tide.',
      },
      {
        label: 'Fishing Grounds',
        title: 'Trolling and casting session',
        description:
          'Begin fishing with crew support, adjusting techniques and target species according to the day’s conditions.',
      },
      {
        label: 'Mid-Trip',
        title: 'Refreshments and reset',
        description:
          'Take breaks on board for drinks, snacks, and ocean views between active fishing windows.',
      },
      {
        label: 'Extended Option',
        title: 'Lunch and continued fishing',
        description:
          'On full-day charters, continue into a longer fishing session with a lunch break served on board.',
      },
      {
        label: 'Return',
        title: 'Back to shore',
        description:
          'Return to shore after the session with your crew once the charter window concludes.',
      },
    ],
    includes: ['Boat charter with professional fishing crew', 'Fishing rods, bait, and equipment', 'Soft drinks and snacks for half-day trips', 'Lunch for full-day trips'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Catch preparation unless separately arranged'],
    notes:
      'Fishing grounds and results vary naturally with sea, weather, and species movement. This is a shared charter unless booked privately, and all crew safety instructions must be followed.',
  },
  'cheetahs-rock-zanzibar': {
    overview:
      'Cheetah’s Rock is one of Zanzibar’s most distinctive wildlife experiences because it is built around rescue, rehabilitation, and close but controlled educational encounters. It is not a zoo visit in the conventional sense; the value lies in the stories behind the animals and the sanctuary’s welfare-first approach.',
    highlights: [
      'Meet rescued cheetahs, lions, zebras, lemurs, and other species',
      'Guided encounters led by trained caretakers',
      'Conservation storytelling and rescue insight throughout the visit',
      'Small-group structure designed around animal welfare',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Welcome and sanctuary introduction',
        description:
          'Arrive near Kama Village and begin with an introduction to the rescue center’s mission and visitor guidelines.',
      },
      {
        label: 'Guided Tour',
        title: 'Animal encounters and storytelling',
        description:
          'Move through carefully managed encounters with trained staff while learning each animal’s rescue history and care plan.',
      },
      {
        label: 'Immersion',
        title: 'Photos and conservation context',
        description:
          'Continue through selected interaction points where photography and explanation are built around safety and respect.',
      },
      {
        label: 'Close',
        title: 'Wrap-up and departure',
        description:
          'Finish with final questions, reflection, and departure after the guided sanctuary experience.',
      },
    ],
    includes: ['Guided wildlife tour', 'Professional animal caretakers and guides', 'Educational conservation briefing', 'Supervised animal encounters', 'Access to rescued wildlife areas'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Special upgrades unless pre-booked'],
    notes:
      'Advance booking, age rules, dress guidance, and scent restrictions are strictly enforced for animal welfare and safety. All interactions remain fully controlled by the sanctuary team.',
  },
  'selous-fly-in-safari': {
    overview:
      'Experience Africa’s wilderness in just one day with a fly-in safari to Selous, now part of Nyerere National Park. This full-day safari connects Zanzibar to one of the continent’s largest protected areas through scenic flights, guided game drives, and a strong sense of scale once you enter the mainland landscape.',
    highlights: [
      'Same-day return safari from Zanzibar',
      'Scenic flight over Tanzania’s coastline and inland terrain',
      'Game drive through Nyerere National Park',
      'Chance to encounter elephants, lions, giraffes, zebras, hippos, and crocodiles',
      'Picnic lunch in the bush before continuing the afternoon drive',
    ],
    fullItinerary: [
      {
        label: 'Early Morning',
        title: 'Flight from Zanzibar',
        description:
          'Depart Zanzibar early and fly across the coast toward the Selous/Nyerere side of mainland Tanzania.',
      },
      {
        label: 'Arrival',
        title: 'Meet safari guide',
        description:
          'Arrive at the Selous airstrip, meet your guide, and transfer directly into the park for the day’s safari chapter.',
      },
      {
        label: 'Morning Drive',
        title: 'Game drive through Nyerere',
        description:
          'Explore the park by 4x4 through riverside areas, open plains, and dense bush with strong wildlife-viewing potential.',
      },
      {
        label: 'Midday',
        title: 'Bush picnic lunch',
        description:
          'Pause for a picnic lunch in the bush before continuing into a different section of the park.',
      },
      {
        label: 'Afternoon',
        title: 'Second game drive',
        description:
          'Continue the safari drive through different wildlife areas before heading back toward the airstrip.',
      },
      {
        label: 'Return',
        title: 'Flight back to Zanzibar',
        description:
          'Return to Zanzibar in the late afternoon after a full day immersed in the wilderness.',
      },
    ],
    includes: [
      'Return flights Zanzibar to Selous',
      'Park entrance fees',
      'Full-day safari game drive',
      'Picnic lunch',
      'Bottled drinking water',
      'English-speaking safari guide',
      '4x4 safari vehicle',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional beverages beyond standard inclusions'],
    notes:
      'This experience is typically operated as a shared safari, though private arrangements are available on request. Wildlife sightings vary and cannot be guaranteed. Flight and safari schedules may vary depending on weather and operational conditions.',
  },
  'mikumi-safari-from-zanzibar': {
    overview:
      'A full-day fly-in safari from Zanzibar to Mikumi National Park, designed for travelers who want to experience mainland wildlife without adding a longer overnight chapter to the journey. The contrast is the point: coastline in the morning, open savannah by the day’s main chapter, and a return to the island by evening.',
    highlights: [
      'Early morning flight from Zanzibar to Mikumi National Park',
      'Guided game drive through one of Tanzania’s most accessible safari parks',
      'Strong chance to encounter elephants, giraffes, zebras, buffalo, and varied birdlife',
      'Picnic lunch in the park before continuing the afternoon drive',
      'A clean one-day safari addition to a Zanzibar stay',
    ],
    fullItinerary: [
      {
        label: 'Early Morning',
        title: 'Flight from Zanzibar',
        description:
          'Depart Zanzibar Airport early and cross to mainland Tanzania as the island coastline gives way to inland landscapes.',
      },
      {
        label: 'Arrival',
        title: 'Meet your safari guide',
        description:
          'Arrive near Mikumi, meet your guide, and transfer directly into the safari chapter for the day.',
      },
      {
        label: 'Morning Drive',
        title: 'Game drive in Mikumi National Park',
        description:
          'Begin exploring Mikumi’s open plains and wildlife-rich areas in a 4x4 vehicle with guiding throughout.',
      },
      {
        label: 'Midday',
        title: 'Picnic lunch in the park',
        description:
          'Pause for a scenic picnic lunch surrounded by nature before continuing into a new section of the park.',
      },
      {
        label: 'Afternoon',
        title: 'Second safari drive',
        description:
          'Continue the game drive with more time to track wildlife movement and experience the wider landscape of Mikumi.',
      },
      {
        label: 'Evening',
        title: 'Return flight to Zanzibar',
        description:
          'Transfer back to the airstrip and fly to Zanzibar after a full day on safari.',
      },
    ],
    includes: [
      'Return flights between Zanzibar and Mikumi',
      'National park entry fees',
      'Guided safari game drive',
      'Picnic lunch',
      'Bottled drinking water',
      'Professional safari guide',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional snacks or beverages beyond standard inclusions'],
    notes:
      'This is a shared safari experience. Wildlife sightings vary and cannot be guaranteed. Flight and safari schedules may vary depending on weather and operational conditions. Exact departure times will be confirmed prior to travel.',
  },
};

function buildDefaultItinerary(experience: ExperienceSeedEntry): ExperienceTimelineItem[] {
  return [
    {
      label: experience.startTime || 'Start',
      title: `Departure from ${experience.departure}`,
      description:
        experience.intro[0] ||
        `Begin from ${experience.departure} with a clear introduction to the experience and its pace.`,
    },
    {
      label: 'Main Experience',
      title: experience.title,
      description:
        experience.narrative[0] ||
        experience.intro[1] ||
        experience.subtitle,
    },
    {
      label: 'Close',
      title: 'Wrap-up and continuation',
      description:
        experience.narrative[1] ||
        experience.notes[0] ||
        'The experience closes with a smooth return or continuation into the rest of your journey.',
    },
  ];
}

function enrichExperience(experience: ExperienceSeedEntry): ExperienceEntry {
  const override = brochureOverrides[experience.slug];
  const brochure: ExperienceBrochure = {
    overview: override?.overview || experience.intro.join(' '),
    highlights: override?.highlights || experience.highlights,
    fullItinerary: override?.fullItinerary || buildDefaultItinerary(experience),
    includes: override?.includes || experience.included,
    excludes: override?.excludes || [],
    notes: override?.notes || experience.notes.join(' '),
  };

  return {
    ...experience,
    cta: experience.cta || defaultExperienceCta,
    summary: experience.cardLine,
    itinerary: brochure.fullItinerary,
    brochure,
  };
}

export const experiences: ExperienceEntry[] = experienceSeed.map(enrichExperience);

export const featuredExperienceSlugs = [
  'mnemba-island-marine-experience',
  'blue-safari',
  'private-sandbank-escape',
  'stone-town-cultural-walk',
  'mikumi-safari-from-zanzibar',
];

export function getCategoryBySlug(slug: string) {
  return experienceCategories.find((category) => category.slug === slug);
}

export function getExperienceBySlug(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}

export function getExperiencesByCategory(slug: string) {
  return experiences.filter((experience) => experience.categorySlug === slug);
}

export function getJourneyItem(experience: ExperienceEntry): JourneyItem {
  return {
    slug: experience.slug,
    title: experience.title,
    category: getCategoryBySlug(experience.categorySlug)?.title || experience.categorySlug,
    duration: experience.duration,
  };
}
