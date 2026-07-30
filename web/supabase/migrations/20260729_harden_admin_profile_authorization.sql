begin;

alter table public.admin_profiles enable row level security;

drop policy if exists "users can insert own admin profile" on public.admin_profiles;
drop policy if exists "users can update own admin profile" on public.admin_profiles;
drop policy if exists "users can read own admin profile" on public.admin_profiles;

create policy "users can read own mansa admin profile"
on public.admin_profiles
for select
to authenticated
using (
  auth.uid() = user_id
  and company_id = 'mansa'
);

create policy "users can update own mansa profile details"
on public.admin_profiles
for update
to authenticated
using (
  auth.uid() = user_id
  and company_id = 'mansa'
)
with check (
  auth.uid() = user_id
  and company_id = 'mansa'
);

-- RLS controls rows; column grants ensure the browser cannot change membership or role.
revoke insert on table public.admin_profiles from authenticated;
revoke update on table public.admin_profiles from authenticated;
grant select on table public.admin_profiles to authenticated;
grant update (full_name, phone) on table public.admin_profiles to authenticated;

commit;
