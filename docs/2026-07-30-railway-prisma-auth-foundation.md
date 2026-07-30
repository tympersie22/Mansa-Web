# Railway, Prisma, and Auth.js foundation

## Current milestone

- Railway project: `mansa-operations-dev`
- Database: Railway PostgreSQL
- ORM and migrations: Prisma
- Authentication: Auth.js credentials provider with encrypted JWT cookies
- Authorization: server-only lookup of the authenticated user and its pre-provisioned `admin_profiles` row
- Public registration: intentionally absent
- Storage: Cloudflare R2 is the next milestone and is not configured yet

The remaining Supabase service client is a temporary server-only bridge for business routes that have not yet been
ported to Prisma. It is not used for login or the new protected profile route.

## Authorization boundary

1. Auth.js validates the submitted email and password against a bcrypt hash in `users`.
2. Login also requires an active user with an existing `admin_profiles` row for `company_id = 'mansa'`.
3. Every protected Prisma route calls `requireAdminMembership()`, which re-reads the profile from PostgreSQL.
4. Session role claims are presentation data only; they cannot create membership or override the database check.
5. Administrators are provisioned only through `npm run db:seed` or a future super-admin-only server route.

## Operations relationships

- `customers` is the CRM identity and can be linked to many inquiries, trips, and quotations.
- `planning_inquiries` stores the original request and CRM qualification fields. It may be linked to one customer and
  assigned to one admin.
- `suppliers` represents commercial partners. Hotels can reference a supplier; live itinerary items can reference a
  supplier directly.
- `hotels` contains property-level information and owns its `room_types`.
- `room_types` stores capacity, meal plan, default cost, and default sell price for a hotel.
- `trips` belongs to a customer and may reference its source inquiry. The inquiry and customer payloads are copied
  into immutable JSON snapshots at conversion time.
- `trip_days` gives a trip an ordered, unique day structure.
- `itinerary_items` is the mutable operational plan for each day. It can reference suppliers, hotels, and room types,
  while also carrying service and supplier snapshots for operational continuity.
- `quotations` is a revisioned commercial snapshot of a trip and customer. Once issued, commercial values and source
  snapshots cannot change; lifecycle transitions such as `issued` to `accepted` remain possible.
- `quotation_items` snapshots the quoted line items. Once the parent quotation leaves draft, inserts, updates, and
  deletes are blocked by PostgreSQL.

## Review decisions

- UUID identifiers and snake-case database names were retained to keep the model portable and familiar.
- The database is explicitly single-company. Check constraints reject any `company_id` other than `mansa`.
- RLS was removed. Browser code has no database credentials, and all mutations must pass through authenticated server
  routes.
- PostgreSQL check constraints preserve guest counts, dates, budgets, capacities, ratings, and non-negative amounts.
- PostgreSQL triggers preserve conversion and quotation immutability independently of application code.
- The original quotation trigger was corrected: issued values remain immutable, but valid status transitions are
  allowed.

## Commands

Run Prisma commands against the linked Railway database without copying credentials:

```bash
cd admin
railway run --service Postgres sh -c 'DATABASE_URL="$DATABASE_PUBLIC_URL" npm run db:migrate'
railway run --service Postgres sh -c 'DATABASE_URL="$DATABASE_PUBLIC_URL" npm run db:seed'
```

Required runtime variables for the admin application:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST=true`
