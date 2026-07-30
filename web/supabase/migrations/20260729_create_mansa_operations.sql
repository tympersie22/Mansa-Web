begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_mansa_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and company_id = 'mansa'
      and role in ('manager', 'admin', 'super_admin')
  );
$$;

revoke all on function public.is_mansa_admin() from public;
grant execute on function public.is_mansa_admin() to authenticated, service_role;

alter table public.planning_inquiries
  add column if not exists company_id text not null default 'mansa',
  add column if not exists customer_id uuid,
  add column if not exists assigned_to uuid references auth.users(id) on delete set null,
  add column if not exists priority text not null default 'normal',
  add column if not exists budget_min numeric(14, 2),
  add column if not exists budget_max numeric(14, 2),
  add column if not exists currency text not null default 'USD',
  add column if not exists destinations text[] not null default '{}',
  add column if not exists travel_style text,
  add column if not exists source_detail text,
  add column if not exists internal_notes text,
  add column if not exists next_follow_up_at timestamptz,
  add column if not exists converted_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'planning_inquiries_priority_check'
  ) then
    alter table public.planning_inquiries
      add constraint planning_inquiries_priority_check
      check (priority in ('low', 'normal', 'high', 'urgent'));
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'planning_inquiries_budget_check'
  ) then
    alter table public.planning_inquiries
      add constraint planning_inquiries_budget_check
      check (
        (budget_min is null or budget_min >= 0)
        and (budget_max is null or budget_max >= 0)
        and (budget_min is null or budget_max is null or budget_max >= budget_min)
      );
  end if;
end
$$;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  full_name text not null,
  email text,
  phone_whatsapp text,
  nationality text,
  source text,
  status text not null default 'lead',
  tags text[] not null default '{}',
  preferences jsonb not null default '{}'::jsonb,
  notes text,
  last_contact_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_status_check check (status in ('lead', 'active', 'past_guest', 'inactive'))
);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'planning_inquiries_customer_id_fkey'
  ) then
    alter table public.planning_inquiries
      add constraint planning_inquiries_customer_id_fkey
      foreign key (customer_id) references public.customers(id) on delete set null;
  end if;
end
$$;

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  name text not null,
  supplier_type text not null,
  contact_name text,
  email text,
  phone_whatsapp text,
  location text,
  website text,
  payment_terms text,
  notes text,
  status text not null default 'active',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint suppliers_type_check check (
    supplier_type in ('hotel', 'transport', 'experience', 'guide', 'restaurant', 'flight', 'other')
  ),
  constraint suppliers_status_check check (status in ('active', 'inactive', 'preferred'))
);

create table if not exists public.hotels (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  supplier_id uuid references public.suppliers(id) on delete set null,
  name text not null,
  location text not null,
  address text,
  star_rating numeric(2, 1),
  contact_name text,
  email text,
  phone_whatsapp text,
  website text,
  check_in_time time,
  check_out_time time,
  amenities text[] not null default '{}',
  notes text,
  status text not null default 'active',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hotels_rating_check check (star_rating is null or star_rating between 0 and 5),
  constraint hotels_status_check check (status in ('active', 'inactive', 'preferred'))
);

create table if not exists public.room_types (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  hotel_id uuid not null references public.hotels(id) on delete cascade,
  name text not null,
  description text,
  max_adults integer not null default 2,
  max_children integer not null default 0,
  bed_configuration text,
  meal_plan text,
  currency text not null default 'USD',
  default_cost numeric(14, 2),
  default_sell_price numeric(14, 2),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint room_types_capacity_check check (max_adults > 0 and max_children >= 0),
  constraint room_types_prices_check check (
    (default_cost is null or default_cost >= 0)
    and (default_sell_price is null or default_sell_price >= 0)
  ),
  constraint room_types_status_check check (status in ('active', 'inactive'))
);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  inquiry_id uuid references public.planning_inquiries(id) on delete set null,
  customer_id uuid not null references public.customers(id) on delete restrict,
  title text not null,
  status text not null default 'planning',
  start_date date,
  end_date date,
  guest_count integer not null default 1,
  currency text not null default 'USD',
  inquiry_snapshot jsonb not null default '{}'::jsonb,
  customer_snapshot jsonb not null default '{}'::jsonb,
  internal_notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trips_status_check check (
    status in ('planning', 'quoted', 'confirmed', 'in_progress', 'completed', 'cancelled')
  ),
  constraint trips_guest_count_check check (guest_count > 0),
  constraint trips_dates_check check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.trip_days (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  trip_id uuid not null references public.trips(id) on delete cascade,
  day_number integer not null,
  trip_date date,
  title text not null,
  location text,
  summary text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trip_days_number_check check (day_number > 0),
  unique (trip_id, day_number)
);

create table if not exists public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  trip_day_id uuid not null references public.trip_days(id) on delete cascade,
  supplier_id uuid references public.suppliers(id) on delete set null,
  hotel_id uuid references public.hotels(id) on delete set null,
  room_type_id uuid references public.room_types(id) on delete set null,
  item_type text not null,
  start_time time,
  end_time time,
  title text not null,
  description text,
  location text,
  confirmation_reference text,
  status text not null default 'planned',
  sort_order integer not null default 0,
  quantity numeric(12, 2) not null default 1,
  cost_amount numeric(14, 2),
  sell_amount numeric(14, 2),
  currency text not null default 'USD',
  supplier_snapshot jsonb not null default '{}'::jsonb,
  service_snapshot jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint itinerary_items_type_check check (
    item_type in ('accommodation', 'experience', 'transfer', 'flight', 'meal', 'guide', 'note', 'other')
  ),
  constraint itinerary_items_status_check check (
    status in ('planned', 'requested', 'confirmed', 'cancelled', 'completed')
  ),
  constraint itinerary_items_amounts_check check (
    quantity > 0
    and (cost_amount is null or cost_amount >= 0)
    and (sell_amount is null or sell_amount >= 0)
  )
);

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  trip_id uuid not null references public.trips(id) on delete restrict,
  customer_id uuid not null references public.customers(id) on delete restrict,
  quotation_number text not null default (
    'Q-' || to_char(now(), 'YYYYMMDD') || '-' ||
    upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))
  ),
  revision integer not null default 1,
  status text not null default 'draft',
  currency text not null default 'USD',
  subtotal numeric(14, 2) not null default 0,
  tax_amount numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  valid_until date,
  terms text,
  customer_snapshot jsonb not null,
  trip_snapshot jsonb not null,
  issued_at timestamptz,
  accepted_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quotations_revision_check check (revision > 0),
  constraint quotations_status_check check (
    status in ('draft', 'issued', 'accepted', 'declined', 'expired', 'superseded')
  ),
  constraint quotations_amounts_check check (
    subtotal >= 0 and tax_amount >= 0 and total_amount >= 0
  ),
  unique (company_id, quotation_number),
  unique (trip_id, revision)
);

create table if not exists public.quotation_items (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  quotation_id uuid not null references public.quotations(id) on delete cascade,
  trip_day_id uuid references public.trip_days(id) on delete set null,
  itinerary_item_id uuid references public.itinerary_items(id) on delete set null,
  category text not null,
  description text not null,
  quantity numeric(12, 2) not null default 1,
  unit_price numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) generated always as (quantity * unit_price) stored,
  sort_order integer not null default 0,
  supplier_snapshot jsonb not null default '{}'::jsonb,
  item_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint quotation_items_values_check check (quantity > 0 and unit_price >= 0)
);

create or replace function public.prevent_trip_conversion_mutation()
returns trigger
language plpgsql
as $$
begin
  if new.customer_id is distinct from old.customer_id
    or new.inquiry_id is distinct from old.inquiry_id
    or new.customer_snapshot is distinct from old.customer_snapshot
    or new.inquiry_snapshot is distinct from old.inquiry_snapshot then
    raise exception 'Trip conversion identity and snapshots are immutable';
  end if;
  return new;
end;
$$;

create or replace function public.prevent_quotation_snapshot_mutation()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'DELETE' then
    if old.status <> 'draft' then
      raise exception 'Issued quotations are immutable; create a new revision';
    end if;
    return old;
  end if;

  if new.customer_id is distinct from old.customer_id
    or new.trip_id is distinct from old.trip_id
    or new.customer_snapshot is distinct from old.customer_snapshot
    or new.trip_snapshot is distinct from old.trip_snapshot then
    raise exception 'Quotation source identity and snapshots are immutable';
  end if;
  if old.status <> 'draft' then
    raise exception 'Issued quotations are immutable; create a new revision';
  end if;
  return new;
end;
$$;

create or replace function public.guard_quotation_item_mutation()
returns trigger
language plpgsql
as $$
declare
  quotation_status text;
begin
  select status into quotation_status
  from public.quotations
  where id = case when tg_op = 'DELETE' then old.quotation_id else new.quotation_id end;

  if quotation_status <> 'draft' then
    raise exception 'Issued quotation items are immutable; create a new revision';
  end if;

  if tg_op = 'UPDATE' and (
    new.quotation_id is distinct from old.quotation_id
    or new.trip_day_id is distinct from old.trip_day_id
    or new.itinerary_item_id is distinct from old.itinerary_item_id
    or new.supplier_snapshot is distinct from old.supplier_snapshot
    or new.item_snapshot is distinct from old.item_snapshot
  ) then
    raise exception 'Quotation item source identity and snapshots are immutable';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_trips_conversion_immutable on public.trips;
create trigger trg_trips_conversion_immutable
before update on public.trips
for each row execute function public.prevent_trip_conversion_mutation();

drop trigger if exists trg_quotations_immutable on public.quotations;
create trigger trg_quotations_immutable
before update or delete on public.quotations
for each row execute function public.prevent_quotation_snapshot_mutation();

drop trigger if exists trg_quotation_items_immutable on public.quotation_items;
create trigger trg_quotation_items_immutable
before insert or update or delete on public.quotation_items
for each row execute function public.guard_quotation_item_mutation();

drop trigger if exists trg_customers_updated_at on public.customers;
create trigger trg_customers_updated_at before update on public.customers
for each row execute function public.set_updated_at();
drop trigger if exists trg_suppliers_updated_at on public.suppliers;
create trigger trg_suppliers_updated_at before update on public.suppliers
for each row execute function public.set_updated_at();
drop trigger if exists trg_hotels_updated_at on public.hotels;
create trigger trg_hotels_updated_at before update on public.hotels
for each row execute function public.set_updated_at();
drop trigger if exists trg_room_types_updated_at on public.room_types;
create trigger trg_room_types_updated_at before update on public.room_types
for each row execute function public.set_updated_at();
drop trigger if exists trg_trips_updated_at on public.trips;
create trigger trg_trips_updated_at before update on public.trips
for each row execute function public.set_updated_at();
drop trigger if exists trg_trip_days_updated_at on public.trip_days;
create trigger trg_trip_days_updated_at before update on public.trip_days
for each row execute function public.set_updated_at();
drop trigger if exists trg_itinerary_items_updated_at on public.itinerary_items;
create trigger trg_itinerary_items_updated_at before update on public.itinerary_items
for each row execute function public.set_updated_at();
drop trigger if exists trg_quotations_updated_at on public.quotations;
create trigger trg_quotations_updated_at before update on public.quotations
for each row execute function public.set_updated_at();

create index if not exists idx_customers_company_name on public.customers (company_id, full_name);
create index if not exists idx_customers_company_email on public.customers (company_id, email);
create index if not exists idx_planning_inquiries_company_status_created
  on public.planning_inquiries (company_id, status, created_at desc);
create index if not exists idx_suppliers_company_type_name
  on public.suppliers (company_id, supplier_type, name);
create index if not exists idx_hotels_company_location_name
  on public.hotels (company_id, location, name);
create index if not exists idx_room_types_hotel_name on public.room_types (hotel_id, name);
create index if not exists idx_trips_company_status_start
  on public.trips (company_id, status, start_date);
create index if not exists idx_trips_inquiry on public.trips (inquiry_id);
create index if not exists idx_trip_days_trip_day on public.trip_days (trip_id, day_number);
create index if not exists idx_itinerary_items_day_sort
  on public.itinerary_items (trip_day_id, sort_order);
create index if not exists idx_quotations_trip_revision
  on public.quotations (trip_id, revision desc);
create index if not exists idx_quotation_items_quotation_sort
  on public.quotation_items (quotation_id, sort_order);

alter table public.customers enable row level security;
alter table public.suppliers enable row level security;
alter table public.hotels enable row level security;
alter table public.room_types enable row level security;
alter table public.trips enable row level security;
alter table public.trip_days enable row level security;
alter table public.itinerary_items enable row level security;
alter table public.quotations enable row level security;
alter table public.quotation_items enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'customers', 'suppliers', 'hotels', 'room_types', 'trips',
    'trip_days', 'itinerary_items', 'quotations', 'quotation_items'
  ]
  loop
    execute format('drop policy if exists "mansa admins manage %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "mansa admins manage %s" on public.%I for all to authenticated using (company_id = ''mansa'' and public.is_mansa_admin()) with check (company_id = ''mansa'' and public.is_mansa_admin())',
      table_name,
      table_name
    );
  end loop;
end
$$;

drop policy if exists "mansa admins read planning inquiries" on public.planning_inquiries;
create policy "mansa admins read planning inquiries"
on public.planning_inquiries
for select
to authenticated
using (company_id = 'mansa' and public.is_mansa_admin());

drop policy if exists "mansa admins update planning inquiries" on public.planning_inquiries;
create policy "mansa admins update planning inquiries"
on public.planning_inquiries
for update
to authenticated
using (company_id = 'mansa' and public.is_mansa_admin())
with check (company_id = 'mansa' and public.is_mansa_admin());

drop policy if exists "public can create planning inquiries" on public.planning_inquiries;
create policy "public can create planning inquiries"
on public.planning_inquiries
for insert
to anon, authenticated
with check (
  company_id = 'mansa'
  and coalesce(full_name, '') <> ''
  and coalesce(email, '') <> ''
  and guest_count > 0
);

drop policy if exists "admins can read logs" on public.admin_logs;
create policy "mansa admins can read logs"
on public.admin_logs
for select
to authenticated
using (company_id = 'mansa' and public.is_mansa_admin());

commit;
