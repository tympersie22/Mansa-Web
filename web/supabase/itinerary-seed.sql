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
  'MIS Group Trip',
  'Jun 1, 2025 - Jun 5, 2025',
  '5 Days / 4 Nights',
  'Private Group Journey',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80',
  'A composed Zanzibar group itinerary balancing arrival support, Stone Town atmosphere, coastal time, curated ocean experiences, and smooth departure logistics. The structure is intentionally clean so guests can follow the journey at a glance while still feeling that every day has shape and purpose.',
  '+255779451655',
  'info@mansatours.com',
  'https://mansatours.com',
  array['Mansa Tours & Travel', 'New Mkunazini Rd', 'Stone Town, Zanzibar'],
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
    ('Arrival support and private airport transfers throughout', 1),
    ('Stone Town and coast sequencing designed for group flow', 2),
    ('Flexible activity pacing to accommodate shared and private moments', 3),
    ('Printable, shareable format for guests before travel', 4)
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
    ('Included', 1),
    ('Support', 2)
) as g (title, sort_order) on true
where i.slug = 'mis-group-trip';

insert into public.itinerary_inclusion_items (group_id, content, sort_order)
select g.id, items.content, items.sort_order
from public.itinerary_inclusion_groups g
join public.itineraries i on i.id = g.itinerary_id
join (
  values
    ('Included', 'Airport arrival and departure transfers', 1),
    ('Included', 'Selected accommodation and daily breakfast', 2),
    ('Included', 'Private ground handling and host coordination', 3),
    ('Included', 'Curated experiences as listed in the day plan', 4),
    ('Support', 'Pre-arrival travel coordination', 1),
    ('Support', 'Day-by-day guest-facing itinerary document', 2),
    ('Support', 'On-ground contact availability during the stay', 3)
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
    ('Personal expenses and optional extras', 4)
) as t (content, sort_order) on true
where i.slug = 'mis-group-trip';

delete from public.itinerary_notes
where itinerary_id in (select id from public.itineraries where slug = 'mis-group-trip');

insert into public.itinerary_notes (itinerary_id, content, sort_order)
select i.id, t.content, t.sort_order
from public.itineraries i
join (
  values
    ('Final timings may shift slightly based on flight schedules, tides, and on-ground conditions.', 1),
    ('Where group preferences differ, private adjustments can be layered into the same wider itinerary.', 2),
    ('This document is designed as a guest-facing version and can be exported or shared digitally.', 3)
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
    (1, 'Jun 1, 2025', 'Arrival in Zanzibar', 'Stone Town', 'Guests arrive into Zanzibar and settle in with light-touch support. The first day prioritizes a smooth landing, clear handover, and enough breathing room to arrive well rather than over-program the day.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80', 1),
    (2, 'Jun 2, 2025', 'Stone Town and Coastal Transfer', 'Stone Town to East Coast', 'The second day combines cultural context with movement across the island. It gives the group a grounded introduction to Zanzibar before shifting toward the coast for the slower beach chapter.', 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80', 2),
    (3, 'Jun 3, 2025', 'Ocean Experience Day', 'East Coast Waters', 'A dedicated ocean day built around the group’s preferred pace. The structure can remain social and shared, or be broken into more private chapters depending on the group profile.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', 3),
    (4, 'Jun 4, 2025', 'Flexible Group Day', 'East Coast', 'This day is intentionally designed with flexibility. It can hold a sandbank escape, a slow beach day, optional wellness, or a more private couple or family split within the wider group.', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80', 4),
    (5, 'Jun 5, 2025', 'Departure Day', 'Zanzibar Airport', 'The final day closes the journey cleanly, with departure sequencing shaped around guest flight times and luggage logistics.', 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80', 5)
) as d (day_number, date_label, title, location, summary, hero_image_url, sort_order) on true
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_stays (itinerary_day_id, name, location, nights, room_type, sort_order)
select d.id, s.name, s.location, s.nights, s.room_type, s.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Stone Town Hotel', 'Stone Town', 1, 'Group rooms', 1),
    (2, 'East Coast Beach Resort', 'Paje / Jambiani', 3, 'Sea-facing rooms', 1)
) as s (day_number, name, location, nights, room_type, sort_order) on s.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_activities (itinerary_day_id, time_label, title, description, sort_order)
select d.id, a.time_label, a.title, a.description, a.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Arrival', 'Airport Meet and Greet', 'Private arrival assistance and transfer coordination for the full group.', 1),
    (1, 'Evening', 'Welcome Briefing', 'A short orientation covering the itinerary flow, support contacts, and the rhythm of the coming days.', 2),
    (2, 'Morning', 'Stone Town Orientation Walk', 'A guided walk focused on architecture, history, and the layered identity of the old town.', 1),
    (2, 'Afternoon', 'Transfer to the Coast', 'Private road transfer to the beach property with arrival support and room settling.', 2),
    (3, 'Morning', 'Mnemba-style Marine Experience', 'Time on the water with snorkeling, open-sea views, and a relaxed pacing between stops.', 1),
    (3, 'Late Afternoon', 'Rest and Beach Time', 'Return to the resort with room for the group to slow down rather than force another heavy activity block.', 2),
    (4, 'Daytime', 'Custom Activity Window', 'Reserved for the group’s preferred activity mix once final travel preferences are confirmed.', 1),
    (4, 'Sunset', 'Optional Dhow Experience', 'A quieter sunset dhow option for guests who want a shared final evening on the water.', 2),
    (5, 'As Scheduled', 'Private Departure Transfers', 'Coordinated transfers to the airport with support aligned to each departure window.', 1)
) as a (day_number, time_label, title, description, sort_order) on a.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_meals (itinerary_day_id, content, sort_order)
select d.id, m.content, m.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Dinner on request', 1),
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
    (2, 'Stone Town hotel to East Coast resort', 1),
    (3, 'Return boat and coastal transfer as required', 1),
    (5, 'Resort to airport transfer', 1)
) as t (day_number, content, sort_order) on t.day_number = d.day_number
where i.slug = 'mis-group-trip';

insert into public.itinerary_day_notes (itinerary_day_id, content, sort_order)
select d.id, n.content, n.sort_order
from public.itinerary_days d
join public.itineraries i on i.id = d.itinerary_id
join (
  values
    (1, 'Keep the first evening light.', 1),
    (1, 'Dinner can be arranged privately depending on arrival timing.', 2),
    (4, 'This is the ideal day for customisation in the builder.', 1)
) as n (day_number, content, sort_order) on n.day_number = d.day_number
where i.slug = 'mis-group-trip';

commit;
