begin;

create extension if not exists pgcrypto;

create type public.experience_type as enum ('private', 'shared', 'both');
create type public.inquiry_status as enum ('new', 'contacted', 'in_progress', 'confirmed', 'closed');

create table if not exists public.experience_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null unique,
  description text,
  intro text,
  curation_line text,
  hero_image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint experience_categories_slug_check check (slug = lower(slug))
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.experience_categories(id) on delete restrict,
  slug text not null unique,
  title text not null,
  subtitle text,
  intro text,
  narrative text,
  hero_image_url text,
  duration_label text,
  experience_type public.experience_type not null default 'both',
  departure_location text,
  start_time_label text,
  best_time_label text,
  ideal_for text,
  card_line text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint experiences_slug_check check (slug = lower(slug))
);

create table if not exists public.experience_gallery_images (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_highlights (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_options (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_inclusions (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_what_to_bring (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_notes (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.journeys (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  visitor_token text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint journeys_identity_check check (session_id is not null or visitor_token is not null)
);

create table if not exists public.journey_items (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null references public.journeys(id) on delete cascade,
  experience_id uuid not null references public.experiences(id) on delete cascade,
  notes text,
  created_at timestamptz not null default now(),
  unique (journey_id, experience_id)
);

create table if not exists public.planning_inquiries (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid references public.journeys(id) on delete set null,
  full_name text not null,
  email text not null,
  phone_whatsapp text,
  travel_start_date date,
  travel_end_date date,
  is_date_flexible boolean not null default false,
  guest_count integer not null default 1,
  message text,
  source_page text,
  status public.inquiry_status not null default 'new',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_inquiries_guest_count_check check (guest_count > 0),
  constraint planning_inquiries_date_check check (
    travel_end_date is null or travel_start_date is null or travel_end_date >= travel_start_date
  )
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_experience_categories_updated_at on public.experience_categories;
create trigger trg_experience_categories_updated_at
before update on public.experience_categories
for each row execute function public.set_updated_at();

drop trigger if exists trg_experiences_updated_at on public.experiences;
create trigger trg_experiences_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists trg_journeys_updated_at on public.journeys;
create trigger trg_journeys_updated_at
before update on public.journeys
for each row execute function public.set_updated_at();

drop trigger if exists trg_planning_inquiries_updated_at on public.planning_inquiries;
create trigger trg_planning_inquiries_updated_at
before update on public.planning_inquiries
for each row execute function public.set_updated_at();

create index if not exists idx_experience_categories_published_sort
  on public.experience_categories (published, sort_order, title);

create index if not exists idx_experiences_category_published_sort
  on public.experiences (category_id, published, sort_order, title);

create index if not exists idx_experiences_slug on public.experiences (slug);
create index if not exists idx_experience_gallery_images_experience on public.experience_gallery_images (experience_id, sort_order);
create index if not exists idx_experience_highlights_experience on public.experience_highlights (experience_id, sort_order);
create index if not exists idx_experience_options_experience on public.experience_options (experience_id, sort_order);
create index if not exists idx_experience_inclusions_experience on public.experience_inclusions (experience_id, sort_order);
create index if not exists idx_experience_what_to_bring_experience on public.experience_what_to_bring (experience_id, sort_order);
create index if not exists idx_experience_notes_experience on public.experience_notes (experience_id, sort_order);
create index if not exists idx_journeys_session_id on public.journeys (session_id);
create index if not exists idx_journeys_visitor_token on public.journeys (visitor_token);
create index if not exists idx_journey_items_journey on public.journey_items (journey_id);
create index if not exists idx_planning_inquiries_status_created on public.planning_inquiries (status, created_at desc);

alter table public.experience_categories enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_gallery_images enable row level security;
alter table public.experience_highlights enable row level security;
alter table public.experience_options enable row level security;
alter table public.experience_inclusions enable row level security;
alter table public.experience_what_to_bring enable row level security;
alter table public.experience_notes enable row level security;
alter table public.journeys enable row level security;
alter table public.journey_items enable row level security;
alter table public.planning_inquiries enable row level security;

drop policy if exists "public can read published categories" on public.experience_categories;
create policy "public can read published categories"
on public.experience_categories
for select
to anon, authenticated
using (published = true);

drop policy if exists "public can read published experiences" on public.experiences;
create policy "public can read published experiences"
on public.experiences
for select
to anon, authenticated
using (
  published = true
  and exists (
    select 1
    from public.experience_categories c
    where c.id = experiences.category_id
      and c.published = true
  )
);

drop policy if exists "public can read published experience gallery" on public.experience_gallery_images;
create policy "public can read published experience gallery"
on public.experience_gallery_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.experiences e
    join public.experience_categories c on c.id = e.category_id
    where e.id = experience_gallery_images.experience_id
      and e.published = true
      and c.published = true
  )
);

drop policy if exists "public can read published experience highlights" on public.experience_highlights;
create policy "public can read published experience highlights"
on public.experience_highlights
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.experiences e
    join public.experience_categories c on c.id = e.category_id
    where e.id = experience_highlights.experience_id
      and e.published = true
      and c.published = true
  )
);

drop policy if exists "public can read published experience options" on public.experience_options;
create policy "public can read published experience options"
on public.experience_options
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.experiences e
    join public.experience_categories c on c.id = e.category_id
    where e.id = experience_options.experience_id
      and e.published = true
      and c.published = true
  )
);

drop policy if exists "public can read published experience inclusions" on public.experience_inclusions;
create policy "public can read published experience inclusions"
on public.experience_inclusions
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.experiences e
    join public.experience_categories c on c.id = e.category_id
    where e.id = experience_inclusions.experience_id
      and e.published = true
      and c.published = true
  )
);

drop policy if exists "public can read published experience what to bring" on public.experience_what_to_bring;
create policy "public can read published experience what to bring"
on public.experience_what_to_bring
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.experiences e
    join public.experience_categories c on c.id = e.category_id
    where e.id = experience_what_to_bring.experience_id
      and e.published = true
      and c.published = true
  )
);

drop policy if exists "public can read published experience notes" on public.experience_notes;
create policy "public can read published experience notes"
on public.experience_notes
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.experiences e
    join public.experience_categories c on c.id = e.category_id
    where e.id = experience_notes.experience_id
      and e.published = true
      and c.published = true
  )
);

drop policy if exists "public can create journeys" on public.journeys;
create policy "public can create journeys"
on public.journeys
for insert
to anon, authenticated
with check (session_id is not null or visitor_token is not null);

drop policy if exists "public can update own anonymous journey by token" on public.journeys;
create policy "public can update own anonymous journey by token"
on public.journeys
for update
to anon, authenticated
using (visitor_token is not null)
with check (visitor_token is not null);

drop policy if exists "public can create journey items" on public.journey_items;
create policy "public can create journey items"
on public.journey_items
for insert
to anon, authenticated
with check (
  exists (
    select 1
    from public.journeys j
    where j.id = journey_items.journey_id
  )
);

drop policy if exists "public can delete journey items" on public.journey_items;
create policy "public can delete journey items"
on public.journey_items
for delete
to anon, authenticated
using (
  exists (
    select 1
    from public.journeys j
    where j.id = journey_items.journey_id
  )
);

drop policy if exists "public can create planning inquiries" on public.planning_inquiries;
create policy "public can create planning inquiries"
on public.planning_inquiries
for insert
to anon, authenticated
with check (guest_count > 0);

commit;
