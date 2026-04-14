begin;

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  company_id text not null default 'mansa',
  email text,
  full_name text,
  phone text,
  role text not null default 'manager',
  created_at timestamptz not null default now(),
  updated_at bigint not null default ((extract(epoch from now()) * 1000)::bigint),
  constraint admin_profiles_role_check check (role in ('manager', 'admin', 'super_admin'))
);

alter table public.admin_profiles add column if not exists company_id text not null default 'mansa';
alter table public.admin_profiles add column if not exists email text;
alter table public.admin_profiles add column if not exists full_name text;
alter table public.admin_profiles add column if not exists phone text;
alter table public.admin_profiles add column if not exists role text not null default 'manager';
alter table public.admin_profiles add column if not exists created_at timestamptz not null default now();
alter table public.admin_profiles add column if not exists updated_at bigint not null default ((extract(epoch from now()) * 1000)::bigint);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_profiles_role_check'
  ) then
    alter table public.admin_profiles
      add constraint admin_profiles_role_check
      check (role in ('manager', 'admin', 'super_admin'));
  end if;
end
$$;

create index if not exists idx_admin_profiles_user_id on public.admin_profiles (user_id);
create index if not exists idx_admin_profiles_company_id on public.admin_profiles (company_id);

alter table public.admin_profiles enable row level security;

drop policy if exists "users can read own admin profile" on public.admin_profiles;
create policy "users can read own admin profile"
on public.admin_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own admin profile" on public.admin_profiles;
create policy "users can insert own admin profile"
on public.admin_profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can update own admin profile" on public.admin_profiles;
create policy "users can update own admin profile"
on public.admin_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  property_id text,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  actor jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at bigint not null default ((extract(epoch from now()) * 1000)::bigint)
);

alter table public.admin_logs add column if not exists company_id text not null default 'mansa';
alter table public.admin_logs add column if not exists property_id text;
alter table public.admin_logs add column if not exists action text;
alter table public.admin_logs add column if not exists entity_type text;
alter table public.admin_logs add column if not exists entity_id text;
alter table public.admin_logs add column if not exists actor jsonb not null default '{}'::jsonb;
alter table public.admin_logs add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.admin_logs add column if not exists created_at bigint not null default ((extract(epoch from now()) * 1000)::bigint);

create index if not exists idx_admin_logs_company_created
  on public.admin_logs (company_id, created_at desc);
create index if not exists idx_admin_logs_entity
  on public.admin_logs (entity_type, entity_id);

alter table public.admin_logs enable row level security;

drop policy if exists "admins can read logs" on public.admin_logs;
create policy "admins can read logs"
on public.admin_logs
for select
to authenticated
using (true);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  company_id text not null default 'mansa',
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  source text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries add column if not exists company_id text not null default 'mansa';
alter table public.contact_inquiries add column if not exists name text;
alter table public.contact_inquiries add column if not exists email text;
alter table public.contact_inquiries add column if not exists subject text;
alter table public.contact_inquiries add column if not exists message text;
alter table public.contact_inquiries add column if not exists source text;
alter table public.contact_inquiries add column if not exists status text not null default 'new';
alter table public.contact_inquiries add column if not exists created_at timestamptz not null default now();

create index if not exists idx_contact_inquiries_company_created
  on public.contact_inquiries (company_id, created_at desc);

alter table public.contact_inquiries enable row level security;

drop policy if exists "public can create contact inquiries" on public.contact_inquiries;
create policy "public can create contact inquiries"
on public.contact_inquiries
for insert
to anon, authenticated
with check (
  coalesce(name, '') <> ''
  and coalesce(email, '') <> ''
  and coalesce(subject, '') <> ''
  and coalesce(message, '') <> ''
);

commit;
