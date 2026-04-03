## MANSA Supabase Setup

Run these files in order inside Supabase:

1. `supabase/migrations/20260403_create_mansa_backend.sql`
2. `supabase/seed.sql`

What they do:

- create the MANSA experience CMS tables
- create journey and planning inquiry tables
- enable RLS policies for public website access
- seed the six experience categories
- seed core sample experiences including Mnemba Island Marine Experience

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
