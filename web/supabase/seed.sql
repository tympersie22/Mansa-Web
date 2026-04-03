begin;

insert into public.experience_categories (
  slug,
  title,
  description,
  intro,
  curation_line,
  hero_image_url,
  sort_order,
  published
)
values
  (
    'ocean-and-islands',
    'Ocean & Islands',
    'Sandbanks, reefs, and open water — Zanzibar at its most natural.',
    'Ocean experiences reveal Zanzibar in motion: shifting light, clear water, and the quieter rhythm that comes from time spent offshore.',
    'Ocean experiences can be adapted in timing, privacy, and pace depending on how you want the day to feel.',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    1,
    true
  ),
  (
    'culture-and-place',
    'Culture & Place',
    'History, architecture, and local context that give Zanzibar depth.',
    'These experiences are shaped around Stone Town, heritage, food, and the lived texture of the island beyond its coastline.',
    'Cultural experiences can remain light-touch or become more layered, depending on how deeply you want to engage.',
    'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
    2,
    true
  ),
  (
    'slow-zanzibar',
    'Slow Zanzibar',
    'A more private, spacious way of moving through the island.',
    'Some of the most memorable time in Zanzibar comes from doing less, but doing it well.',
    'Slow travel is often about subtraction: fewer moving parts, more room to enjoy what is already there.',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    3,
    true
  ),
  (
    'adventure-and-exploration',
    'Adventure & Exploration',
    'More active days shaped by coastline, nature, and movement.',
    'For travelers who want energy and variation, these experiences bring together landscapes, activity, and a stronger sense of discovery.',
    'Adventure experiences can be softened or intensified depending on your comfort level and preferred pace.',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    4,
    true
  ),
  (
    'safari-and-beyond',
    'Safari & Beyond',
    'Island time connected to the mainland’s larger landscapes.',
    'These experiences extend the journey beyond Zanzibar, linking coast and bush in a way that feels intentional rather than overpacked.',
    'Safari extensions work best when they are integrated early, so the island and mainland feel like one journey.',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
    5,
    true
  ),
  (
    'private-experiences',
    'Private Experiences',
    'Discreet, flexible experiences with a stronger sense of exclusivity.',
    'Private experiences offer more control over timing, privacy, atmosphere, and how the day unfolds from beginning to end.',
    'Privacy is not a style on its own. It is a way of shaping the experience more closely around you.',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    6,
    true
  )
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  intro = excluded.intro,
  curation_line = excluded.curation_line,
  hero_image_url = excluded.hero_image_url,
  sort_order = excluded.sort_order,
  published = excluded.published;

insert into public.experiences (
  category_id,
  slug,
  title,
  subtitle,
  intro,
  narrative,
  hero_image_url,
  duration_label,
  experience_type,
  departure_location,
  start_time_label,
  best_time_label,
  ideal_for,
  card_line,
  sort_order,
  published
)
select
  c.id,
  x.slug,
  x.title,
  x.subtitle,
  x.intro,
  x.narrative,
  x.hero_image_url,
  x.duration_label,
  x.experience_type::public.experience_type,
  x.departure_location,
  x.start_time_label,
  x.best_time_label,
  x.ideal_for,
  x.card_line,
  x.sort_order,
  true
from (
  values
    (
      'ocean-and-islands',
      'mnemba-island-marine-experience',
      'Mnemba Island Marine Experience',
      'A morning on the water exploring Zanzibar’s reefs, open ocean, and the natural beauty surrounding Mnemba Island.',
      'Set out along Zanzibar’s northeast coast for a morning shaped by the rhythm of the ocean. The waters surrounding Mnemba Island are known for their clarity, vibrant coral reefs, and diverse marine life.' || E'\n\n' ||
      'This experience combines time on the water with guided snorkeling and the possibility of encountering marine wildlife along the way — all at a relaxed and unhurried pace.',
      'The experience begins with a departure from Muyuni Beach, heading out towards the protected marine area surrounding Mnemba Island. The journey itself offers a chance to take in the coastline and open water, with occasional sightings of marine life along the way.' || E'\n\n' ||
      'Once at the reef, you’ll enter the water for a guided snorkeling session, exploring coral formations and the variety of fish that inhabit them. The calm conditions in the morning make this one of the best times to experience the area.' || E'\n\n' ||
      'Between snorkeling stops, there is time to relax on board, enjoy fresh seasonal fruit, and take in the surroundings before returning to shore before midday.',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'Half Day (~3 hours)',
      'both',
      'Muyuni Beach',
      'Morning (around 08:00 AM)',
      'Morning hours for calm seas and clear visibility',
      'Couples, families, and ocean lovers',
      'Snorkeling, open water, and reef time around Mnemba.',
      1
    ),
    (
      'ocean-and-islands',
      'private-sandbank-escape',
      'Private Sandbank Escape',
      'A slower day offshore with time to swim, pause, and enjoy Zanzibar’s shifting coastline.',
      'This experience is built around timing and atmosphere rather than activity density. Depending on tide and weather, the sandbank becomes a natural setting for swimming, light refreshments, and uninterrupted time on the water.',
      'The day begins with a private departure timed to suit conditions on the water. As you head offshore, the focus is less on rushing between stops and more on allowing the setting itself to carry the experience.',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
      'Half Day',
      'private',
      'Nungwi or Matemwe',
      'Morning or late afternoon',
      'Tide-dependent',
      'Couples and private groups',
      'A private escape shaped around tide, weather, and stillness.',
      2
    ),
    (
      'culture-and-place',
      'stone-town-cultural-walk',
      'Stone Town Cultural Walk',
      'A guided introduction to history, architecture, and the layered identity of Stone Town.',
      'Stone Town is best approached with context. Its streets, buildings, and public spaces reveal more when they are connected through story rather than simply viewed as landmarks.',
      'The walk moves through Stone Town at a measured pace, allowing time to notice detail rather than rushing between stops.',
      'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80',
      'Half Day',
      'both',
      'Stone Town',
      'Morning or late afternoon',
      'Cooler hours',
      'First-time visitors and culture-led travelers',
      'Architecture, stories, and local context in the heart of Stone Town.',
      1
    ),
    (
      'adventure-and-exploration',
      'jozani-forest-and-coastline-trail',
      'Jozani Forest and Coastline Trail',
      'An active day moving between forest habitat, boardwalks, and quieter stretches of Zanzibar’s natural coastline.',
      'This experience suits travelers who want more movement in the day while still staying connected to Zanzibar’s softer, more atmospheric landscapes.',
      'The route combines the forest environment with time along the coast, creating a day that feels varied without becoming rushed.',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      'Half Day',
      'both',
      'Jozani Area',
      'Morning',
      'Dry season and cooler hours',
      'Active travelers and nature lovers',
      'Forest trails, coastline, and a stronger sense of movement.',
      1
    ),
    (
      'safari-and-beyond',
      'fly-in-selous-safari-extension',
      'Fly-In Selous Safari Extension',
      'A mainland extension that shifts the journey from ocean rhythm to larger wildlife landscapes.',
      'A fly-in safari changes the scale of the journey quickly and decisively. It is one of the most effective ways to pair Zanzibar with the mainland without losing momentum.',
      'The experience is designed as an extension rather than a separate trip, making the transition between island and bush feel composed and deliberate.',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
      '2 to 3 Days',
      'private',
      'Zanzibar Airport',
      'Morning flight',
      'Year-round with seasonal tailoring',
      'Couples, families, and first safari add-ons',
      'A fly-in safari chapter integrated into the wider itinerary.',
      1
    )
) as x (
  category_slug,
  slug,
  title,
  subtitle,
  intro,
  narrative,
  hero_image_url,
  duration_label,
  experience_type,
  departure_location,
  start_time_label,
  best_time_label,
  ideal_for,
  card_line,
  sort_order
)
join public.experience_categories c on c.slug = x.category_slug
on conflict (slug) do update
set
  category_id = excluded.category_id,
  title = excluded.title,
  subtitle = excluded.subtitle,
  intro = excluded.intro,
  narrative = excluded.narrative,
  hero_image_url = excluded.hero_image_url,
  duration_label = excluded.duration_label,
  experience_type = excluded.experience_type,
  departure_location = excluded.departure_location,
  start_time_label = excluded.start_time_label,
  best_time_label = excluded.best_time_label,
  ideal_for = excluded.ideal_for,
  card_line = excluded.card_line,
  sort_order = excluded.sort_order,
  published = excluded.published;

delete from public.experience_highlights
where experience_id in (
  select id from public.experiences
  where slug in (
    'mnemba-island-marine-experience',
    'private-sandbank-escape',
    'stone-town-cultural-walk',
    'jozani-forest-and-coastline-trail',
    'fly-in-selous-safari-extension'
  )
);

insert into public.experience_highlights (experience_id, content, sort_order)
select e.id, h.content, h.sort_order
from public.experiences e
join (
  values
    ('mnemba-island-marine-experience', 'Snorkeling in clear waters around Mnemba Island', 1),
    ('mnemba-island-marine-experience', 'Healthy coral reefs with tropical fish', 2),
    ('mnemba-island-marine-experience', 'Time to relax on the boat between stops', 3),
    ('mnemba-island-marine-experience', 'Light refreshments served on board', 4),
    ('mnemba-island-marine-experience', 'Opportunity to encounter marine wildlife', 5),
    ('private-sandbank-escape', 'Private boat setup', 1),
    ('private-sandbank-escape', 'Tide-shaped sandbank stop', 2),
    ('private-sandbank-escape', 'Swimming in calm waters', 3),
    ('stone-town-cultural-walk', 'Historic streets and architecture', 1),
    ('stone-town-cultural-walk', 'Swahili, Arab, and Indian influences', 2),
    ('jozani-forest-and-coastline-trail', 'Forest habitat and mangrove boardwalks', 1),
    ('jozani-forest-and-coastline-trail', 'A more active day on the island', 2),
    ('fly-in-selous-safari-extension', 'Fly-in safari access', 1),
    ('fly-in-selous-safari-extension', 'Mainland wildlife landscapes', 2)
) as h (slug, content, sort_order) on h.slug = e.slug;

delete from public.experience_options
where experience_id in (
  select id from public.experiences
  where slug in (
    'mnemba-island-marine-experience',
    'private-sandbank-escape',
    'stone-town-cultural-walk',
    'jozani-forest-and-coastline-trail',
    'fly-in-selous-safari-extension'
  )
);

insert into public.experience_options (experience_id, title, description, sort_order)
select e.id, o.title, o.description, o.sort_order
from public.experiences e
join (
  values
    ('mnemba-island-marine-experience', 'Shared Experience', 'A small group setting, offering a social and cost-effective way to explore Mnemba’s waters.', 1),
    ('mnemba-island-marine-experience', 'Private Experience', 'A more flexible and exclusive option, allowing you to move at your own pace and tailor the experience.', 2),
    ('private-sandbank-escape', 'Morning Departure', 'Clearer light and a quieter rhythm earlier in the day.', 1),
    ('private-sandbank-escape', 'Sunset Departure', 'A warmer, more atmospheric version of the same experience.', 2),
    ('stone-town-cultural-walk', 'Classic Walk', 'A strong introduction for travelers new to Stone Town.', 1),
    ('stone-town-cultural-walk', 'Private Deep-Dive', 'Longer, more tailored pacing with additional thematic focus.', 2),
    ('jozani-forest-and-coastline-trail', 'Classic Route', 'A balanced route with comfortable pacing and natural variety.', 1),
    ('fly-in-selous-safari-extension', '2-Day Extension', 'A shorter safari chapter that still creates a distinct mainland contrast.', 1),
    ('fly-in-selous-safari-extension', '3-Day Extension', 'Adds more time on game drives and a stronger sense of safari rhythm.', 2)
) as o (slug, title, description, sort_order) on o.slug = e.slug;

delete from public.experience_inclusions
where experience_id in (
  select id from public.experiences
  where slug in (
    'mnemba-island-marine-experience',
    'private-sandbank-escape',
    'stone-town-cultural-walk',
    'jozani-forest-and-coastline-trail',
    'fly-in-selous-safari-extension'
  )
);

insert into public.experience_inclusions (experience_id, content, sort_order)
select e.id, i.content, i.sort_order
from public.experiences e
join (
  values
    ('mnemba-island-marine-experience', 'Snorkeling equipment', 1),
    ('mnemba-island-marine-experience', 'Seasonal fruit platter', 2),
    ('mnemba-island-marine-experience', 'Bottled drinking water', 3),
    ('mnemba-island-marine-experience', 'Marine conservation fees', 4),
    ('mnemba-island-marine-experience', 'Local guide', 5),
    ('private-sandbank-escape', 'Private boat', 1),
    ('private-sandbank-escape', 'Bottled water', 2),
    ('stone-town-cultural-walk', 'Local guide', 1),
    ('stone-town-cultural-walk', 'Flexible routing', 2),
    ('jozani-forest-and-coastline-trail', 'Guide support', 1),
    ('jozani-forest-and-coastline-trail', 'Park access where applicable', 2),
    ('fly-in-selous-safari-extension', 'Flight coordination', 1),
    ('fly-in-selous-safari-extension', 'Safari logistics', 2)
) as i (slug, content, sort_order) on i.slug = e.slug;

delete from public.experience_what_to_bring
where experience_id in (
  select id from public.experiences
  where slug in (
    'mnemba-island-marine-experience',
    'private-sandbank-escape',
    'stone-town-cultural-walk',
    'jozani-forest-and-coastline-trail',
    'fly-in-selous-safari-extension'
  )
);

insert into public.experience_what_to_bring (experience_id, content, sort_order)
select e.id, b.content, b.sort_order
from public.experiences e
join (
  values
    ('mnemba-island-marine-experience', 'Swimwear', 1),
    ('mnemba-island-marine-experience', 'Towel', 2),
    ('mnemba-island-marine-experience', 'Sunscreen', 3),
    ('mnemba-island-marine-experience', 'Sunglasses', 4),
    ('mnemba-island-marine-experience', 'Camera', 5),
    ('private-sandbank-escape', 'Swimwear', 1),
    ('private-sandbank-escape', 'Sun protection', 2),
    ('stone-town-cultural-walk', 'Comfortable footwear', 1),
    ('stone-town-cultural-walk', 'Water', 2),
    ('jozani-forest-and-coastline-trail', 'Comfortable shoes', 1),
    ('jozani-forest-and-coastline-trail', 'Light clothing', 2),
    ('fly-in-selous-safari-extension', 'Soft luggage', 1),
    ('fly-in-selous-safari-extension', 'Neutral clothing', 2)
) as b (slug, content, sort_order) on b.slug = e.slug;

delete from public.experience_notes
where experience_id in (
  select id from public.experiences
  where slug in (
    'mnemba-island-marine-experience',
    'private-sandbank-escape',
    'stone-town-cultural-walk',
    'jozani-forest-and-coastline-trail',
    'fly-in-selous-safari-extension'
  )
);

insert into public.experience_notes (experience_id, content, sort_order)
select e.id, n.content, n.sort_order
from public.experiences e
join (
  values
    ('mnemba-island-marine-experience', 'Marine wildlife sightings vary and are not guaranteed.', 1),
    ('mnemba-island-marine-experience', 'This experience may be shared unless booked privately.', 2),
    ('mnemba-island-marine-experience', 'Weather and sea conditions may affect the schedule.', 3),
    ('private-sandbank-escape', 'Exact timing depends on tide conditions.', 1),
    ('stone-town-cultural-walk', 'The route may shift depending on crowd levels and interests.', 1),
    ('jozani-forest-and-coastline-trail', 'Conditions can vary with rainfall and season.', 1),
    ('fly-in-selous-safari-extension', 'Best arranged early as part of the wider trip planning process.', 1)
) as n (slug, content, sort_order) on n.slug = e.slug;

commit;
