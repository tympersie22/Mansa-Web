# Mansa Operations Foundation

## Authorization

- Authentication alone does not grant admin access.
- Every privileged route calls `requireAdminContext()` and requires an `admin_profiles` row for the authenticated user with `company_id = 'mansa'`.
- Missing, invalid, or cross-company profiles receive `403 Forbidden`.
- Browser clients cannot insert `admin_profiles`.
- Browser clients can update only their own `full_name` and `phone` columns.
- Role, company, user, and email changes require trusted administration.
- New profiles can be provisioned through Supabase administration or `POST /api/admin/admin-profiles` by an existing Mansa `super_admin`.

Apply `20260729_harden_admin_profile_authorization.sql` before exposing the new admin routes.

## Operations Model

- `customers` stores reusable CRM identity, preferences, tags, and notes.
- `planning_inquiries` retains the public inquiry and adds assignment, priority, budget, destination, follow-up, and conversion fields.
- `suppliers`, `hotels`, and `room_types` provide the partner and accommodation directory.
- `trips` links customers and optional inquiries. Customer and inquiry values are copied into JSON snapshots at conversion time.
- `trip_days` and `itinerary_items` are the editable live operational itinerary.
- `quotations` and `quotation_items` store customer, trip, supplier, and source-item snapshots.
- Snapshot JSON cannot be changed after creation. Once a quotation leaves `draft`, the quotation and its items cannot be updated or deleted; a new revision is required.

All operations tables are scoped to `company_id = 'mansa'`, use row-level security, and are accessible to authenticated Mansa admins only.

## Admin Workspace

The initial CRUD workspace is available under:

- `/operations/customers`
- `/operations/inquiries`
- `/operations/suppliers`
- `/operations/hotels`
- `/operations/room-types`
- `/operations/trips`
- `/operations/trip-days`
- `/operations/itinerary-items`
- `/operations/quotations`
- `/operations/quotation-items`

Managers can create and update records. Destructive deletion requires `admin` or `super_admin`. Database foreign keys and quotation immutability rules remain authoritative regardless of API role.

## Deployment Order

1. Apply all existing migrations through `20260414_sync_admin_and_contact.sql`.
2. Apply `20260729_harden_admin_profile_authorization.sql`.
3. Apply `20260729_create_mansa_operations.sql`.
4. Pre-provision at least one Mansa `super_admin` through trusted Supabase administration.
5. Deploy the admin app with `NEXT_PUBLIC_SUPABASE_URL`, the public Supabase key, and `SUPABASE_SERVICE_ROLE_KEY`.
