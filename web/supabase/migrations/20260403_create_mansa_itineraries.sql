begin;

create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  travel_dates_label text not null,
  duration_label text,
  group_label text,
  hero_image_url text,
  overview text,
  contact_phone text,
  contact_email text,
  contact_website text,
  contact_address_lines text[] not null default '{}',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint itineraries_slug_check check (slug = lower(slug))
);

create table if not exists public.itinerary_highlights (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_inclusion_groups (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  title text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_inclusion_items (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.itinerary_inclusion_groups(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_exclusions (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_notes (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_days (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  day_number integer not null,
  date_label text not null,
  title text not null,
  location text,
  summary text,
  hero_image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (itinerary_id, day_number)
);

create table if not exists public.itinerary_day_stays (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references public.itinerary_days(id) on delete cascade,
  name text not null,
  location text,
  nights integer not null default 1,
  room_type text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint itinerary_day_stays_nights_check check (nights > 0)
);

create table if not exists public.itinerary_day_activities (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references public.itinerary_days(id) on delete cascade,
  time_label text,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_day_meals (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references public.itinerary_days(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_day_transfers (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references public.itinerary_days(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.itinerary_day_notes (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references public.itinerary_days(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

drop trigger if exists trg_itineraries_updated_at on public.itineraries;
create trigger trg_itineraries_updated_at
before update on public.itineraries
for each row execute function public.set_updated_at();

drop trigger if exists trg_itinerary_days_updated_at on public.itinerary_days;
create trigger trg_itinerary_days_updated_at
before update on public.itinerary_days
for each row execute function public.set_updated_at();

create index if not exists idx_itineraries_published_sort
  on public.itineraries (published, sort_order, title);
create index if not exists idx_itineraries_slug on public.itineraries (slug);
create index if not exists idx_itinerary_highlights_itinerary
  on public.itinerary_highlights (itinerary_id, sort_order);
create index if not exists idx_itinerary_inclusion_groups_itinerary
  on public.itinerary_inclusion_groups (itinerary_id, sort_order);
create index if not exists idx_itinerary_inclusion_items_group
  on public.itinerary_inclusion_items (group_id, sort_order);
create index if not exists idx_itinerary_exclusions_itinerary
  on public.itinerary_exclusions (itinerary_id, sort_order);
create index if not exists idx_itinerary_notes_itinerary
  on public.itinerary_notes (itinerary_id, sort_order);
create index if not exists idx_itinerary_days_itinerary
  on public.itinerary_days (itinerary_id, sort_order, day_number);
create index if not exists idx_itinerary_day_stays_day
  on public.itinerary_day_stays (itinerary_day_id, sort_order);
create index if not exists idx_itinerary_day_activities_day
  on public.itinerary_day_activities (itinerary_day_id, sort_order);
create index if not exists idx_itinerary_day_meals_day
  on public.itinerary_day_meals (itinerary_day_id, sort_order);
create index if not exists idx_itinerary_day_transfers_day
  on public.itinerary_day_transfers (itinerary_day_id, sort_order);
create index if not exists idx_itinerary_day_notes_day
  on public.itinerary_day_notes (itinerary_day_id, sort_order);

alter table public.itineraries enable row level security;
alter table public.itinerary_highlights enable row level security;
alter table public.itinerary_inclusion_groups enable row level security;
alter table public.itinerary_inclusion_items enable row level security;
alter table public.itinerary_exclusions enable row level security;
alter table public.itinerary_notes enable row level security;
alter table public.itinerary_days enable row level security;
alter table public.itinerary_day_stays enable row level security;
alter table public.itinerary_day_activities enable row level security;
alter table public.itinerary_day_meals enable row level security;
alter table public.itinerary_day_transfers enable row level security;
alter table public.itinerary_day_notes enable row level security;

drop policy if exists "public can read published itineraries" on public.itineraries;
create policy "public can read published itineraries"
on public.itineraries
for select
to anon, authenticated
using (published = true);

drop policy if exists "public can read published itinerary highlights" on public.itinerary_highlights;
create policy "public can read published itinerary highlights"
on public.itinerary_highlights
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itineraries i
    where i.id = itinerary_highlights.itinerary_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary inclusion groups" on public.itinerary_inclusion_groups;
create policy "public can read published itinerary inclusion groups"
on public.itinerary_inclusion_groups
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itineraries i
    where i.id = itinerary_inclusion_groups.itinerary_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary inclusion items" on public.itinerary_inclusion_items;
create policy "public can read published itinerary inclusion items"
on public.itinerary_inclusion_items
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itinerary_inclusion_groups g
    join public.itineraries i on i.id = g.itinerary_id
    where g.id = itinerary_inclusion_items.group_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary exclusions" on public.itinerary_exclusions;
create policy "public can read published itinerary exclusions"
on public.itinerary_exclusions
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itineraries i
    where i.id = itinerary_exclusions.itinerary_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary notes" on public.itinerary_notes;
create policy "public can read published itinerary notes"
on public.itinerary_notes
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itineraries i
    where i.id = itinerary_notes.itinerary_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary days" on public.itinerary_days;
create policy "public can read published itinerary days"
on public.itinerary_days
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itineraries i
    where i.id = itinerary_days.itinerary_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary day stays" on public.itinerary_day_stays;
create policy "public can read published itinerary day stays"
on public.itinerary_day_stays
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itinerary_days d
    join public.itineraries i on i.id = d.itinerary_id
    where d.id = itinerary_day_stays.itinerary_day_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary day activities" on public.itinerary_day_activities;
create policy "public can read published itinerary day activities"
on public.itinerary_day_activities
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itinerary_days d
    join public.itineraries i on i.id = d.itinerary_id
    where d.id = itinerary_day_activities.itinerary_day_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary day meals" on public.itinerary_day_meals;
create policy "public can read published itinerary day meals"
on public.itinerary_day_meals
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itinerary_days d
    join public.itineraries i on i.id = d.itinerary_id
    where d.id = itinerary_day_meals.itinerary_day_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary day transfers" on public.itinerary_day_transfers;
create policy "public can read published itinerary day transfers"
on public.itinerary_day_transfers
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itinerary_days d
    join public.itineraries i on i.id = d.itinerary_id
    where d.id = itinerary_day_transfers.itinerary_day_id
      and i.published = true
  )
);

drop policy if exists "public can read published itinerary day notes" on public.itinerary_day_notes;
create policy "public can read published itinerary day notes"
on public.itinerary_day_notes
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.itinerary_days d
    join public.itineraries i on i.id = d.itinerary_id
    where d.id = itinerary_day_notes.itinerary_day_id
      and i.published = true
  )
);

commit;
