# Cloudflare R2 media milestone

## What is implemented

- Server-only R2 S3 client with `region: auto`.
- Five-minute presigned `PUT` URLs scoped to one generated object key.
- Server-side `HEAD` verification before an asset becomes ready.
- Auth.js membership required for upload creation and verification.
- Managers may remove only their own pending uploads.
- Only `admin` and `super_admin` roles may delete ready assets.
- Railway-backed `media_assets` records and immutable admin audit events.
- Reusable itinerary image upload fields with a manual URL fallback.
- JPG, PNG, WebP, and AVIF allowlist with a 10 MB limit.

The bucket in this milestone is for public website images only. Do not upload
passports, supplier contracts, invoices, or other private documents. Those
require a separate private R2 bucket and short-lived signed download routes.

## Current external blocker

Cloudflare CLI authentication works for account
`02f453f08cc4b14195891bbe87490372`, but R2 is not enabled for the account.
Cloudflare returns `10042 NotEntitled` when listing buckets.

## One-time Cloudflare setup

1. Open Cloudflare Dashboard, then **Storage & databases > R2** and enable R2.
2. Create the development bucket:

   ```bash
   npx wrangler r2 bucket create mansa-assets-dev
   ```

3. Create an **Object Read & Write** R2 token scoped only to
   `mansa-assets-dev`. Record the Access Key ID and Secret Access Key.
4. Enable the bucket's `r2.dev` URL for development only.
5. Set the variables from `admin/.env.example`.
6. Apply the browser direct-upload CORS policy:

   ```bash
   cd admin
   npm run r2:configure
   ```

7. For production, connect an R2 custom domain such as
   `assets.mansa.travel`, set `R2_PUBLIC_BASE_URL` to that origin, and include
   the production admin origin in `R2_ALLOWED_ORIGINS`.

The `r2.dev` endpoint is intentionally development-only and rate limited.
A custom domain is required for production cache controls and traffic policy.

## Request flow

1. The approved admin sends file metadata to `POST /api/admin/media`.
2. The server validates membership, MIME type, size, and scope.
3. The server creates a pending database row and a five-minute signed R2 URL.
4. The browser uploads directly to the one approved R2 key.
5. The browser calls `PATCH /api/admin/media`.
6. The server verifies object type and size, marks it ready, and writes an
   audit record.

R2 access credentials are never returned to client code.
