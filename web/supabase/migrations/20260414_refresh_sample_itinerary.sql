begin;

insert into public.itineraries (
  slug,
  title,
  travel_dates_label,
  duration_label,
  group_label,
  hero_image_url,
  overview,
  contact_phone,
  contact_email,
  contact_website,
  contact_address_lines,
  published,
  sort_order
)
values (
  'mis-group-trip',
  'Zanzibar Coast & Culture Journey',
  'Jun 1, 2026 - Jun 5, 2026',
  '5 Days / 4 Nights',
  'Private Journey Example',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80',
  'A structured Zanzibar journey designed to show how accommodation, logistics, and experiences can be brought together into one clear guest-facing plan. The flow balances arrival ease, cultural context, coastline time, and enough flexibility for the trip to feel considered rather than over-programmed.',
  '+255 779 451 655',
  'info@mansa.travel',
  'https://mansa.travel',
  array['Mansa Tours & Travel', 'Zanzibar', 'Tanzania'],
  true,
  1
)
on conflict (slug) do update
set
  title = excluded.title,
  travel_dates_label = excluded.travel_dates_label,
  duration_label = excluded.duration_label,
  group_label = excluded.group_label,
  hero_image_url = excluded.hero_image_url,
  overview = excluded.overview,
  contact_phone = excluded.contact_phone,
  contact_email = excluded.contact_email,
  contact_website = excluded.contact_website,
  contact_address_lines = excluded.contact_address_lines,
  published = excluded.published,
  sort_order = excluded.sort_order;

delete from public.itinerary_highlights
where itinerary_id in (select id from public.itineraries where slug = 'mis-group-trip');

insert into public.itinerary_highlights (itinerary_id, content, sort_order)
select i.id, t.content, t.sort_order
from public.itineraries i
join (
  values
    ('Private airport support and well-timed transfers throughout the stay', 1),
    ('A clean journey flow that connects Stone Town with the North Coast', 2),
    ('Curated marine, cultural, and slower-paced coastal experiences', 3),
    ('A guest-facing structure that is easy to share, review, and refine', 4)
) as t (content, sort_order) on true
where i.slug = 'mis-group-trip';

delete from public.itinerary_inclusion_items
where group_id in (
  select g.id
  from public.itinerary_inclusion_groups g
  join public.itineraries i on i.id = g.itinerary_id
  where i.slug = 'mis-group-trip'
);

delete from public.itinerary_inclusion_groups
where itinerary_id in (select id from public.itineraries where slug = 'mis-group-trip');

insert into public.itinerary_inclusion_groups (id, itinerary_id, title, sort_order)
select gen_random_uuid(), i.id, g.title, g.sort_order
from public.itineraries i
join (
  values
    ('Included Services', 1),
    ('Planning & Support', 2)
) as g (title, sort_order) on true
where i.slug = 'mis-group-trip';

insert into public.itinerary_inclusion_items (group_id, content, sort_order)
select g.id, items.content, items.sort_order
from public.itinerary_inclusion_groups g
join public.itineraries i on i.id = g.itinerary_id
join (
  values
    ('Included Services', 'Private airport arrival and departure transfers', 1),
    ('Included Services', 'Selected accommodation and daily breakfast', 2),
    ('Included Services', 'Ground coordination and itinerary support throughout', 3),
    ('Included Services', 'Curated experiences as outlined in the day-by-day plan', 4),
    ('Planning & Support', 'Pre-arrival planning and travel coordination', 1),
    ('Planning & Support', 'Guest-facing itinerary document prepared for review before travel', 2),
    ('Planning & Support', 'Direct on-ground contact during the stay', 3)
) as items (group_title, content, sort_order) on items.group_title = g.title
where i.slug = 'mis-group-trip';

delete from public.itinerary_exclusions
where itinerary_id in (select id from public.itineraries where slug = 'mis-group-trip');

insert into public.itinerary_exclusions (itinerary_id, content, sort_order)
select i.id, t.content, t.sort_order
from public.itineraries i
join (
  values
    ('International flights', 1),
    ('Visa costs', 2),
    ('Travel insurance', 3),
    ('Personal expenses and optional activities not listed in the itinerary', 4)
) as t (content, sort_order) on true
where i.slug = 'mis-group-trip';

delete from public.itinerary_notes
where itinerary_id in (select id from public.itineraries where slug = 'mis-group-trip');

insert into public.itinerary_notes (itinerary_id, content, sort_order)
select i.id, t.content, t.sort_order
from public.itineraries i
join (
  values
    ('Final timing can shift slightly depending on flights, tides, weather, and operational conditions on the ground.', 1),
    ('Experiences can be adjusted in privacy level, pace, and timing once travel preferences are confirmed.', 2),
    ('This sample is intended to show structure, tone, and guest presentation rather than lock in final arrangements.', 3)
) as t (content, sort_order) on true
where i.slug = 'mis-group-trip';

delete from public.itinerary_day_stays
where itinerary_day_id in (
  select d.id
  from public.itinerary_days d
  join public.itineraries i on i.id = d.itinerary_id
  where i.slug = 'mis-group-trip'
);

delete from public.itinerary_day_activities
where itinerary_day_id in (
  select d.id
  from public.itinerary_days d
  join public.itineraries i on i.id = d.itinerary_id
  where i.slug = 'mis-group-trip'
);

delete from public.itinerary_day_meals
where itinerary_day_id in (
  select d.id
  from public.itinerary_days d
  join public.itineraries i on i.id = d.itinerary_id
  where i.slug = 'mis-group-trip'
);

delete from public.itinerary_day_transfers
where itinerary_day_id in (
  select d.id
  from public.itinerary_days d
  join public.itineraries i on i.id = d.itinerary_id
  where i.slug = 'mis-group-trip'
);

delete from public.itinerary_day_notes
where itinerary_day_id in (
  select d.id
  from public.itinerary_days d
  join public.itineraries i on i.id = d.itinerary_id
  where i.slug = 'mis-group-trip'
);

delete from public.itinerary_days
where itinerary_id in (select id from public.itineraries where slug = 'mis-group-trip');

insert into public.itinerary_days (
  itinerary_id,
  day_number,
  date_label,
  title,
  location,
  summary,
  hero_image_url,
  sort_order
)
select
  i.id,
  d.day_number,
  d.date_label,
  d.title,
  d.location,
  d.summary,
  d.hero_image_url,
  d.sort_order
from public.itineraries i
join (
  values
    (1, 'Jun 1, 2026', 'Arrival in Zanzibar', 'Stone Town', 'Arrival day is kept clear and well-paced. The focus is on a smooth airport handover, an easy hotel arrival, and enough room for guests to settle in properly before the journey begins in full.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80', 1),
    (2, 'Jun 2, 2026', 'Stone Town and Transfer to the North Coast', 'Stone Town to North Coast', 'The second day gives the journey cultural context before shifting toward the beach. It is designed to move guests through Stone Town with enough depth, then transition cleanly to the North Coast for the next chapter of the stay.', 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80', 2),
    (3, 'Jun 3, 2026', 'Marine Experience and Coastline Time', 'North Coast Waters', 'This day is shaped around Zanzibar’s marine side, with enough structure for a clear guest experience and enough space for the day to remain relaxed rather than rushed.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', 3),
    (4, 'Jun 4, 2026', 'Flexible North Coast Day', 'North Coast', 'The fourth day is intentionally flexible. It can hold a slower beach rhythm, an additional private experience, or a lightly structured split depending on how guests want the journey to feel by this point.', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80', 4),
    (5, 'Jun 5, 2026', 'Departure Support', 'Zanzibar Airport', 'The final day is structured around a clean departure process, with transfer timing and airport support adjusted to guest flight windows.', 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80', 5)
) as d (day_number, date_label, title, location, summary, hero_image_url, sort_order) on true
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_stays (itinerary_day_id, name, location, nights, room_type, sort_order)
select d.id, s.name, s.location, s.nights, s.room_type, s.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Selected Stone Town hotel', 'Stone Town', 1, 'Standard room category', 1),
    (2, 'Selected North Coast resort', 'Nungwi / Kendwa', 3, 'Garden or sea-facing room category', 1)
) as s (day_number, name, location, nights, room_type, sort_order) on s.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_activities (itinerary_day_id, time_label, title, description, sort_order)
select d.id, a.time_label, a.title, a.description, a.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Arrival', 'Airport meet and greet', 'Private arrival assistance with direct transfer coordination from the airport to the hotel.', 1),
    (1, 'Evening', 'Welcome orientation', 'A short arrival briefing covering the journey flow, support contacts, and the rhythm of the coming days.', 2),
    (2, 'Morning', 'Stone Town cultural walk', 'A guided introduction to the old town, with a focus on architecture, history, and cultural context.', 1),
    (2, 'Afternoon', 'Private transfer to the coast', 'Road transfer to the North Coast with arrival support and time to settle into the beach property.', 2),
    (3, 'Morning', 'Mnemba marine experience', 'A morning on the water built around snorkeling, open-sea views, and a relaxed pace between stops.', 1),
    (3, 'Afternoon', 'Beach and recovery time', 'The afternoon is left open for rest, beach time, or a lighter resort-based pace after the marine experience.', 2),
    (4, 'Daytime', 'Custom planning window', 'Reserved for the preferred mix of downtime, coastline time, or an additional curated experience.', 1),
    (4, 'Sunset', 'Optional sunset dhow', 'A softer shared evening option for guests who want a final moment on the water before departure day.', 2),
    (5, 'As Scheduled', 'Private departure transfers', 'Coordinated airport transfers arranged against the confirmed departure schedule.', 1)
) as a (day_number, time_label, title, description, sort_order) on a.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_meals (itinerary_day_id, content, sort_order)
select d.id, m.content, m.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Dinner can be arranged on request', 1),
    (2, 'Breakfast included', 1),
    (3, 'Breakfast included', 1),
    (3, 'Light refreshments on board', 2),
    (4, 'Breakfast included', 1),
    (5, 'Breakfast included where timing allows', 1)
) as m (day_number, content, sort_order) on m.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_transfers (itinerary_day_id, content, sort_order)
select d.id, t.content, t.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Airport to Stone Town hotel transfer', 1),
    (2, 'Stone Town hotel to North Coast resort', 1),
    (3, 'Boat departure and return transfers as required', 1),
    (5, 'Resort to airport transfer', 1)
) as t (day_number, content, sort_order) on t.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_notes (itinerary_day_id, content, sort_order)
select d.id, n.content, n.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'The first evening is intentionally light to allow guests to arrive well.', 1),
    (1, 'Private dinner arrangements can be added depending on flight timing.', 2),
    (4, 'This is the most flexible day in the sample and is the easiest one to tailor around guest preferences.', 1)
) as n (day_number, content, sort_order) on n.day_number = d.day_number
where i.slug = 'mis-group-trip';

commit;
