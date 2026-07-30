# Mansa Railway + Cloudflare Workers deployment

## Target architecture

- `web/`: public Next.js site deployed to Cloudflare Workers with OpenNext.
- `admin/`: Mansa OS and server API deployed as a Railway application service.
- Railway PostgreSQL: Prisma database for Auth.js, CRM, trips, quotations, itineraries, and audit logs.
- Cloudflare R2: public media assets and itinerary image uploads.

Cloudflare Pages static export is intentionally not used. The website has server-rendered routes and API behavior; Workers is the supported Cloudflare target for the full Next.js application.

## Railway setup

Create an application service in project `mansa-operations-dev` with root directory `/admin` and config file `/admin/railway.json`.

Required Railway variables:

```env
DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}
AUTH_SECRET=<long-random-secret>
AUTH_TRUST_HOST=true
R2_ACCOUNT_ID=<cloudflare-account-id>
R2_ACCESS_KEY_ID=<bucket-scoped-key>
R2_SECRET_ACCESS_KEY=<bucket-scoped-secret>
R2_BUCKET_NAME=mansa-assets-dev
R2_PUBLIC_BASE_URL=https://assets.mansa.travel
RESEND_API_KEY=<resend-key>
RESEND_FROM_EMAIL=Mansa Travel <info@mansa.travel>
NEXT_PUBLIC_WEBSITE_URL=https://mansa.travel
```

The public `DATABASE_PUBLIC_URL` must be used for local development. The Railway private hostname only works from inside Railway.

## Cloudflare Workers setup

From `web/`:

```bash
npm ci
npm run cf:build
npm run cf:preview
npm run cf:deploy
```

Required Worker variables:

```env
NEXT_PUBLIC_WEBSITE_URL=https://mansa.travel
NEXT_PUBLIC_MANSA_API_URL=https://api.mansa.travel
NEXT_PUBLIC_CONTACT_PHONE=+255 779 451 655
NEXT_PUBLIC_CONTACT_EMAIL=info@mansa.travel
NEXT_PUBLIC_WHATSAPP_NUMBER=255779451655
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/mansa.tours
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@mansa.tours
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/mansa-tours-travel
```

New public writes must call Railway; browser code must never receive database credentials.

## Cutover order

1. Create the Railway application service and set its public database URL.
2. Deploy `admin/railway.json`; run Prisma migrations and provision the first admin.
3. Enable R2, create the media bucket, and set the R2 variables.
4. Deploy the Worker with `web/wrangler.jsonc`.
5. Port remaining public inquiry, booking, payment, and property reads from Supabase/Firebase to Railway APIs.
6. Remove legacy Supabase/Firebase dependencies only after end-to-end tests pass.
