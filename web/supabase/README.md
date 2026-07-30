## MANSA Supabase Setup

Apply every file in `supabase/migrations` in filename order. Prefer the
Supabase CLI so the remote migration history remains synchronized with the
repository. Apply `supabase/seed.sql` and `supabase/itinerary-seed.sql` only
when sample content is required.

After applying migrations, verify the authorization boundary:

```bash
psql "$DATABASE_URL" \
  --set ON_ERROR_STOP=1 \
  --file supabase/verify/verify_mansa_authorization.sql
```

The verification fails if any operations table is missing RLS, if direct
operations writes are exposed to `authenticated`, or if users can provision
or elevate their own admin profile.

What they do:

- create the MANSA experience CMS tables
- create journey and planning inquiry tables
- create itinerary builder tables for admin and guest-facing itineraries
- create the customer, supplier, trip, live itinerary, and quotation operations schema
- enable RLS policies for public website access
- restrict operations mutations to the role-checked server API
- seed the six experience categories
- seed core sample experiences including Mnemba Island Marine Experience
- seed the sample MIS Group Trip itinerary used by the new builder

Frontend notes:

- The planning form already uses `lib/mansa-backend.ts`
- If `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present, the form will:
  - create a journey snapshot
  - attach selected experiences
  - insert into `planning_inquiries`
- If those env vars are missing, the app falls back to the current local contact flow

Recommended Vercel env vars:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_ADDRESS`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_WEBSITE_URL`
