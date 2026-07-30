begin;

-- Operations writes must pass through the server API, where requireAdminContext()
-- enforces both Mansa membership and the action-specific role.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'customers',
    'suppliers',
    'hotels',
    'room_types',
    'trips',
    'trip_days',
    'itinerary_items',
    'quotations',
    'quotation_items'
  ]
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      'mansa admins manage ' || table_name,
      table_name
    );
    execute format(
      'drop policy if exists %I on public.%I',
      'mansa admins can read ' || table_name,
      table_name
    );
    execute format(
      'create policy %I on public.%I for select to authenticated using (company_id = ''mansa'' and public.is_mansa_admin())',
      'mansa admins can read ' || table_name,
      table_name
    );
    execute format(
      'revoke insert, update, delete, truncate on public.%I from authenticated',
      table_name
    );
    execute format(
      'grant select on public.%I to authenticated',
      table_name
    );
  end loop;
end
$$;

-- Inquiry submissions remain publicly insertable through the existing constrained
-- policy. Administrative mutations use the trusted server API.
drop policy if exists "mansa admins update planning inquiries" on public.planning_inquiries;
drop policy if exists "mansa admins can update inquiries" on public.planning_inquiries;
revoke update, delete, truncate on public.planning_inquiries from authenticated;

commit;
