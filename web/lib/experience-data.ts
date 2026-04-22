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

type ExperienceSeedEntry = Omit<ExperienceEntry, 'summary' | 'itinerary' | 'brochure'>;

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
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
  },
];

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
    subtitle: 'A classic Zanzibar evening on the water, reworked with a calmer and more considered feel.',
    categorySlug: 'ocean-and-islands',
    duration: '2 hours',
    experienceType: 'Shared / Private',
    departure: 'Stone Town or Nungwi',
    startTime: 'Late afternoon',
    bestTime: 'Golden hour into sunset',
    idealFor: 'Couples and first-time visitors',
    image: '/images/experiences/sunset-cruise/pexels-goodcitizen-3361818.jpg',
    cardLine: 'An atmospheric evening cruise with a classic dhow setting.',
    intro: [
      'The dhow cruise is one of Zanzibar’s most familiar experiences, but the tone can vary dramatically depending on how it is arranged.',
      'This version focuses on atmosphere, light, and pacing rather than volume or crowd.',
    ],
    highlights: ['Traditional dhow setting', 'Open-water sunset views', 'Relaxed pacing', 'Soft refreshments', 'Option for private use'],
    narrative: [
      'You board in the late afternoon and head out as the light begins to soften. The experience is intentionally simple: coastline, breeze, open water, and time to settle into the evening.',
      'As sunset approaches, the focus remains on the setting rather than entertainment-heavy additions, making it a strong option for couples or anyone who prefers a quieter atmosphere.',
    ],
    options: [
      { title: 'Shared Cruise', description: 'A lighter-touch option with a small group atmosphere.' },
      { title: 'Private Dhow', description: 'More privacy and flexibility for the setting and pace.' },
    ],
    included: ['Boat arrangement', 'Refreshments', 'Crew support'],
    bring: ['Light layer', 'Phone or camera', 'Sunglasses'],
    notes: ['Departure point may vary by stay location.', 'Timing changes slightly with the season and sunset hour.'],
  },
  {
    slug: 'stone-town-cultural-walk',
    title: 'Stone Town Cultural Walk',
    subtitle: 'A guided introduction to history, architecture, and the layered identity of Stone Town.',
    categorySlug: 'culture-and-place',
    duration: 'Half Day',
    experienceType: 'Shared / Private',
    departure: 'Stone Town',
    startTime: 'Morning or late afternoon',
    bestTime: 'Cooler hours',
    idealFor: 'First-time visitors and culture-led travelers',
    image: '/images/experiences/stone-town/pexels-roman-odintsov-11025240.jpg',
    imageFit: 'contain',
    imagePosition: 'center 56%',
    cardLine: 'Architecture, stories, and local context in the heart of Stone Town.',
    intro: [
      'Stone Town is best approached with context. Its streets, buildings, and public spaces reveal more when they are connected through story rather than simply viewed as landmarks.',
      'This walking experience introduces the town through architecture, trade history, and everyday cultural detail.',
    ],
    highlights: ['Historic streets and architecture', 'Swahili, Arab, and Indian influences', 'Flexible pace', 'Local guiding perspective'],
    narrative: [
      'The walk moves through Stone Town at a measured pace, allowing time to notice detail rather than rushing between stops. Depending on your interests, the focus can lean more historical, more architectural, or more contemporary.',
      'What makes this experience valuable is not volume, but interpretation — the ability to understand what the place is, how it evolved, and how it is still lived today.',
    ],
    options: [
      { title: 'Classic Walk', description: 'A strong introduction for travelers new to Stone Town.' },
      { title: 'Private Deep-Dive', description: 'Longer, more tailored pacing with additional thematic focus.' },
    ],
    included: ['Local guide', 'Flexible routing', 'Heritage context'],
    bring: ['Comfortable footwear', 'Water', 'Sun protection'],
    notes: ['Stone Town streets are best explored on foot.', 'The route may shift depending on crowd levels and interests.'],
  },
  {
    slug: 'spice-farm-and-local-table',
    title: 'Spice Farm and Local Table',
    subtitle: 'A slower cultural experience shaped around Zanzibar’s agricultural heritage and food culture.',
    categorySlug: 'culture-and-place',
    duration: 'Half Day',
    experienceType: 'Private / Shared',
    departure: 'Central Zanzibar',
    startTime: 'Morning',
    bestTime: 'Morning hours',
    idealFor: 'Food lovers and cultural travelers',
    image: '/images/experiences/spice/pexels-julia-volk-5769698.jpg',
    imagePosition: 'center 50%',
    cardLine: 'A more grounded way to connect with Zanzibar through food and landscape.',
    intro: [
      'Spice tours are common, but the experience becomes stronger when it moves beyond demonstration and feels more connected to everyday food culture.',
      'This version pairs the farm setting with a more considered local table experience.',
    ],
    highlights: ['Spice and fruit introductions', 'Food culture context', 'Slower pacing', 'Local lunch element'],
    narrative: [
      'The visit begins on a working spice property, where the focus is placed on how ingredients are grown, used, and understood locally rather than treated as novelty alone.',
      'From there, the experience extends into a meal component that makes the connection between landscape and table feel more complete.',
    ],
    options: [
      { title: 'Farm Visit', description: 'A shorter version centered on the property and produce itself.' },
      { title: 'Farm and Table', description: 'Includes a more complete meal and deeper culinary framing.' },
    ],
    included: ['Guide', 'Farm access', 'Tastings', 'Meal component where applicable'],
    bring: ['Light clothing', 'Water', 'Hat'],
    notes: ['Farm conditions vary by season.', 'Food offerings depend on availability.'],
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
    image: '/images/experiences/spice/pexels-theonlyabdulla-34561170.jpg',
    imageFit: 'contain',
    imagePosition: 'center 54%',
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
    title: 'Jungle and Coast Bike Experience',
    subtitle: 'A more kinetic way to experience Zanzibar’s changing landscapes.',
    categorySlug: 'adventure-and-exploration',
    duration: 'Half Day',
    experienceType: 'Private / Small Group',
    departure: 'Varies by route',
    startTime: 'Morning',
    bestTime: 'Cooler hours',
    idealFor: 'Active travelers',
    image: '/images/experiences/adventure/pexels-deffo-manizo-64452317-20897828.jpg',
    imagePosition: 'center 48%',
    cardLine: 'A more active coastal route for travelers who want movement built in.',
    intro: [
      'Cycling reveals parts of Zanzibar at a very different pace from driving. It gives a stronger sense of texture, transition, and the distance between village, greenery, and coastline.',
      'This experience is designed for travelers who enjoy movement as part of discovery.',
    ],
    highlights: ['Guided bike route', 'Village and coastline contrast', 'Active pacing', 'Smaller-group feel'],
    narrative: [
      'The route is chosen according to comfort level and conditions, keeping the experience engaging without turning it into a performance challenge.',
      'What makes it rewarding is the shift in perspective: you see the island as connected space rather than a series of stops.',
    ],
    options: [
      { title: 'Leisure Route', description: 'Softer terrain and a more relaxed rhythm.' },
      { title: 'Active Route', description: 'Longer distance and more energetic pacing.' },
    ],
    included: ['Bike setup', 'Guide', 'Water support'],
    bring: ['Comfortable activewear', 'Closed shoes', 'Sun protection'],
    notes: ['Routes depend on conditions and guest confidence.', 'Not recommended in heavy rain conditions.'],
  },
  {
    slug: 'jozani-forest-exploration',
    title: 'Jozani Forest Exploration',
    subtitle: 'A nature-led inland experience through one of Zanzibar’s best-known protected areas.',
    categorySlug: 'adventure-and-exploration',
    duration: 'Half Day',
    experienceType: 'Shared / Private',
    departure: 'Jozani Forest',
    startTime: 'Morning',
    bestTime: 'Morning',
    idealFor: 'Nature lovers and families',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80',
    cardLine: 'A nature-focused inland experience with forest and boardwalk settings.',
    intro: [
      'Jozani offers a different mood from the coast: shaded, quieter, and more ecological in focus.',
      'This experience works particularly well as a half-day contrast within a broader island itinerary.',
    ],
    highlights: ['Protected forest environment', 'Wildlife focus', 'Boardwalk and woodland setting', 'Family-friendly'],
    narrative: [
      'The route moves through forest and mangrove environments, giving a stronger sense of Zanzibar’s inland ecology.',
      'It is a straightforward but worthwhile experience when balanced with coast-based days, especially for travelers who want more variety.',
    ],
    options: [
      { title: 'Shared Visit', description: 'A lighter and practical way to access the reserve.' },
      { title: 'Private Visit', description: 'More flexibility in pace and guiding attention.' },
    ],
    included: ['Entry fees', 'Guide support', 'Route coordination'],
    bring: ['Comfortable shoes', 'Water', 'Light insect protection'],
    notes: ['Wildlife visibility varies.', 'Ground may be damp depending on conditions.'],
  },
  {
    slug: 'selous-fly-in-safari',
    title: 'Selous Fly-In Safari',
    subtitle: 'A mainland extension that shifts the journey from ocean rhythm to larger wildlife landscapes.',
    categorySlug: 'safari-and-beyond',
    duration: 'Full Day or Overnight Extension',
    experienceType: 'Private / Shared',
    departure: 'Zanzibar Airport',
    startTime: 'Early morning',
    bestTime: 'Dry season windows',
    idealFor: 'Travelers adding safari to an island stay',
    image: '/images/experiences/safari/pexels-wussol-2147803031-30894532.jpg',
    cardLine: 'A strong mainland extension for travelers pairing coast with safari.',
    intro: [
      'A fly-in safari changes the scale of the journey quickly and decisively. It is one of the most effective ways to pair Zanzibar with the mainland without losing momentum.',
      'This experience works best when planned as part of the wider itinerary from the outset.',
    ],
    highlights: ['Fly-in safari access', 'Mainland wildlife landscapes', 'High contrast to island stay', 'Single-journey feel when well planned'],
    narrative: [
      'The day begins early with an airport transfer and short flight to the mainland. From there, the pace shifts into game drive territory, opening a very different visual and ecological register from Zanzibar.',
      'Because the change is so dramatic, sequencing matters. When arranged properly, the contrast feels like a strength rather than a break in the trip.',
    ],
    options: [
      { title: 'Day Safari', description: 'A shorter, efficient safari extension from Zanzibar.' },
      { title: 'Overnight Extension', description: 'More time on the mainland and a slower safari rhythm.' },
    ],
    included: ['Flight logistics', 'Ground coordination', 'Safari guiding', 'Park handling'],
    bring: ['Neutral clothing', 'Hat', 'Camera', 'Travel documents'],
    notes: ['Flight timing may shift slightly.', 'Safari sightings vary and are never guaranteed.'],
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
  'stone-town-cultural-walk': {
    overview:
      'Step into the heart of Zanzibar with a guided Stone Town walk shaped around architecture, history, and daily life. Rather than pushing volume, the route focuses on cultural layering, context, and the atmosphere that gives the old town its lasting character.',
    highlights: [
      'Visit major cultural and historic landmarks across the old town',
      'Understand Zanzibar through architecture, trade history, and local context',
      'Move at a measured pace with time for markets and street atmosphere',
      'Customizable route depending on interests and energy level',
    ],
    fullItinerary: [
      {
        label: 'Flexible Start',
        title: 'Meet your guide',
        description: 'Begin at a selected point in Stone Town between the morning and late afternoon windows.',
      },
      {
        label: 'Historic Core',
        title: 'Landmarks and city narrative',
        description: 'Walk through key historical areas and connect the architecture to Zanzibar’s Swahili, Arab, and Indian influences.',
      },
      {
        label: 'Markets',
        title: 'Souks and local movement',
        description: 'Move through local markets and public spaces to experience the city as it is lived, not just observed.',
      },
      {
        label: 'Optional Continuation',
        title: 'Lunch, shopping, or cultural extension',
        description: 'Continue into a local lunch stop or a lighter shopping and exploration chapter if desired.',
      },
    ],
    includes: ['Expert guide', 'Entry fees to main attractions where applicable'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Meals unless added on'],
    notes:
      'This walk is fully customizable and works best when adapted to your interests, pace, and the wider rhythm of your stay.',
  },
  'spice-farm-and-local-table': {
    overview:
      'Uncover Zanzibar’s “Spice Island” heritage with a guided visit shaped around cinnamon, cloves, nutmeg, vanilla, and tropical fruits. The experience is strongest when it connects the farm setting to food culture and the table, rather than treating the farm as a novelty stop.',
    highlights: [
      'Guided walk through a working spice property',
      'Smell, taste, and handle fresh produce and spices',
      'Learn culinary, cosmetic, and medicinal uses of Zanzibar’s spices',
      'Finish with tastings that connect the landscape to everyday food culture',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Welcome briefing at the farm',
        description: 'Begin with an introduction to the property, seasonal produce, and the rhythm of the visit.',
      },
      {
        label: 'Farm Walk',
        title: 'Spices, fruits, and plants',
        description: 'Walk through the farm with a local guide and learn how ingredients are grown and understood locally.',
      },
      {
        label: 'Tasting',
        title: 'Fresh fruit, spice, and tea tasting',
        description: 'Pause for a tasting session that makes the connection between landscape, produce, and the table more tangible.',
      },
      {
        label: 'Close',
        title: 'Shopping or return transfer',
        description: 'Finish with optional browsing at the spice shop before returning onward.',
      },
    ],
    includes: ['Guided spice farm tour', 'Fruit and spice tasting', 'Local guide', 'Entrance fees'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional meals'],
    notes:
      'Tour start time is flexible daily, and produce visibility varies slightly by season and harvest conditions.',
  },
  'dhow-sunset-cruise': {
    overview:
      'Sail into the softer end of the day on a traditional dhow with a stronger emphasis on atmosphere than entertainment. This is one of Zanzibar’s classic experiences, but it works best when the pacing stays calm and the setting is allowed to carry the evening.',
    highlights: [
      'Traditional dhow sailing along Zanzibar’s coast',
      'Golden-hour light and open-water sunset views',
      'Refreshments served on board',
      'Strong fit for couples, families, or smaller private groups',
    ],
    fullItinerary: [
      {
        label: 'Boarding',
        title: 'Set sail from the coast',
        description: 'Board your dhow in Stone Town or Kendwa and settle into a slower rhythm on the water.',
      },
      {
        label: 'Cruise',
        title: 'Leisurely sailing',
        description: 'Follow the coastline with sea breeze, refreshments, and optional live music depending on arrangement.',
      },
      {
        label: 'Sunset',
        title: 'Golden-hour viewing',
        description: 'Pause into the best light of the day for photographs, conversation, and a more atmospheric close to the afternoon.',
      },
      {
        label: 'Return',
        title: 'Back to shore',
        description: 'Come back in time for dinner or a continuation into the rest of your evening.',
      },
    ],
    includes: ['Private dhow cruise', 'Refreshments on board', 'Professional crew'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Meals'],
    notes:
      'Live band entertainment is available on request, and a shared basis can also be arranged if preferred.',
  },
  'jozani-forest-exploration': {
    overview:
      'Step into Zanzibar’s best-known protected forest for a nature-led inland contrast to the coast. Jozani combines woodland, mangroves, and the chance to encounter the rare Red Colobus monkey in a way that adds ecological depth to an island itinerary.',
    highlights: [
      'Guided forest walk through protected woodland trails',
      'Chance to spot Red Colobus monkeys and smaller wildlife',
      'Mangrove boardwalk and ecosystem interpretation',
      'A family-friendly inland contrast to beach-based days',
    ],
    fullItinerary: [
      {
        label: 'Arrival',
        title: 'Forest entrance and briefing',
        description: 'Meet your guide at Jozani and begin with a short introduction to the reserve and route.',
      },
      {
        label: 'Woodland Route',
        title: 'Forest trails and wildlife spotting',
        description: 'Walk through the reserve with a focus on Zanzibar’s endemic Red Colobus monkeys and other wildlife.',
      },
      {
        label: 'Mangroves',
        title: 'Boardwalk and ecosystem context',
        description: 'Continue into the mangrove environment to understand how Zanzibar’s inland ecology connects to the coast.',
      },
      {
        label: 'Close',
        title: 'Photos and return',
        description: 'Wrap with lighter photo time and return onward once the forest chapter is complete.',
      },
    ],
    includes: ['Entrance fees', 'Guided forest walk', 'Mangrove boardwalk visit', 'Professional local guide'],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Meals'],
    notes:
      'Wildlife visibility varies by day, and the ground can be damp depending on recent weather conditions.',
  },
  'selous-fly-in-safari': {
    overview:
      'Experience mainland wilderness as a clean extension from Zanzibar with a same-day fly-in safari to Nyerere National Park. The shift from island tempo to safari terrain is dramatic, and when the day is well-sequenced it feels like a true second chapter rather than a logistical interruption.',
    highlights: [
      'Return flights from Zanzibar to the mainland',
      'Full-day game drive in Nyerere National Park',
      'Bush picnic lunch surrounded by wildlife landscapes',
      'Strong safari contrast without committing to a longer mainland stay',
    ],
    fullItinerary: [
      {
        label: '08:00',
        title: 'Flight from Zanzibar',
        description: 'Depart Zanzibar in the morning for the short flight to the Selous/Nyerere side of the mainland.',
      },
      {
        label: 'Arrival',
        title: 'Meet safari guide',
        description: 'Land at the airstrip, transfer into the park environment, and begin the safari chapter directly.',
      },
      {
        label: 'Morning Drive',
        title: 'Wildlife viewing',
        description: 'Explore the park by 4x4 with the chance to encounter elephants, lions, giraffes, zebras, hippos, and more.',
      },
      {
        label: 'Midday',
        title: 'Bush picnic lunch',
        description: 'Pause for lunch inside the safari environment before continuing deeper into the afternoon drive.',
      },
      {
        label: 'Afternoon',
        title: 'Second game drive',
        description: 'Continue exploring the reserve before transferring back toward the airstrip.',
      },
      {
        label: 'Return',
        title: 'Flight back to Zanzibar',
        description: 'Fly back to the island in the evening to close the safari extension cleanly.',
      },
    ],
    includes: [
      'Return flights Zanzibar to Selous',
      'Park entrance fees',
      'Full-day game drive in 4x4 vehicle',
      'Picnic lunch and bottled water',
      'English-speaking driver guide',
    ],
    excludes: ['Personal expenses', 'Tips and gratuities', 'Additional beverages beyond standard inclusions'],
    notes:
      'This safari often operates on a shared basis unless a private arrangement is requested in advance, and wildlife sightings can never be guaranteed.',
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
    summary: experience.cardLine,
    itinerary: brochure.fullItinerary,
    brochure,
  };
}

export const experiences: ExperienceEntry[] = experienceSeed.map(enrichExperience);

export const featuredExperienceSlugs = [
  'mnemba-island-marine-experience',
  'private-sandbank-escape',
  'stone-town-cultural-walk',
  'dhow-sunset-cruise',
  'selous-fly-in-safari',
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
