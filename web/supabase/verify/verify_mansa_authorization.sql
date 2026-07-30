do $$
declare
  operations_tables constant text[] := array[
    'customers',
    'suppliers',
    'hotels',
    'room_types',
    'trips',
    'trip_days',
    'itinerary_items',
    'quotations',
    'quotation_items'
  ];
  table_name text;
  policy_qual text;
begin
  foreach table_name in array operations_tables
  loop
    if not exists (
      select 1
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relname = table_name
        and c.relrowsecurity
    ) then
      raise exception 'RLS is not enabled on public.%', table_name;
    end if;

    select qual
      into policy_qual
      from pg_policies
     where schemaname = 'public'
       and tablename = table_name
       and policyname = 'mansa admins can read ' || table_name
       and cmd = 'SELECT'
       and roles = array['authenticated']::name[];

    if policy_qual is null
       or policy_qual not like '%company_id%'
       or policy_qual not like '%mansa%'
       or policy_qual not like '%is_mansa_admin%' then
      raise exception 'Expected company-scoped admin SELECT policy is missing on public.%', table_name;
    end if;

    if exists (
      select 1
      from pg_policies
      where schemaname = 'public'
        and tablename = table_name
        and cmd in ('ALL', 'INSERT', 'UPDATE', 'DELETE')
        and 'authenticated' = any (roles)
    ) then
      raise exception 'Authenticated write policy exists on public.%', table_name;
    end if;

    if has_table_privilege('authenticated', format('public.%I', table_name), 'INSERT')
       or has_table_privilege('authenticated', format('public.%I', table_name), 'UPDATE')
       or has_table_privilege('authenticated', format('public.%I', table_name), 'DELETE')
       or has_table_privilege('authenticated', format('public.%I', table_name), 'TRUNCATE') then
      raise exception 'Authenticated retains a write grant on public.%', table_name;
    end if;
  end loop;

  if has_table_privilege('authenticated', 'public.admin_profiles', 'INSERT') then
    raise exception 'Authenticated users can still insert admin profiles';
  end if;

  if has_column_privilege('authenticated', 'public.admin_profiles', 'role', 'UPDATE')
     or has_column_privilege('authenticated', 'public.admin_profiles', 'company_id', 'UPDATE') then
    raise exception 'Authenticated users can update protected admin profile fields';
  end if;

  if exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'planning_inquiries'
      and cmd in ('ALL', 'UPDATE', 'DELETE')
      and 'authenticated' = any (roles)
  ) then
    raise exception 'Authenticated administrative mutation policy exists on planning_inquiries';
  end if;
end
$$;

select
  tablename,
  policyname,
  cmd,
  roles,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'admin_profiles',
    'customers',
    'suppliers',
    'hotels',
    'room_types',
    'trips',
    'trip_days',
    'itinerary_items',
    'quotations',
    'quotation_items'
  )
order by tablename, policyname;
