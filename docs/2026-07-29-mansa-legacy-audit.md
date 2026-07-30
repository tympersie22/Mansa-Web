# Mansa Legacy Audit

Date: 2026-07-29

## Scope

This note documents the currently reachable legacy accommodation and Firebase paths inside the Mansa repository so new operations work does not extend the wrong model.

## Summary

Mansa contains two overlapping backends:

- The current Supabase-backed itinerary and inquiry workflow that should remain the basis for new work
- A legacy accommodation/booking/payment implementation that still contains Firebase usage and old Twiga-oriented identifiers

New Mansa operations features must use Supabase only.

## Confirmed Reachable Legacy Surface

The following public website surface still appears reachable and should be treated as live legacy behavior until replaced:

- `/properties`
- `/properties/[slug]`
- `/properties/[slug]/[roomSlug]`
- `web/components/BookingForm.tsx`
- `web/components/PaymentForm.tsx`
- `web/components/RoomShowcase.tsx`
- `web/components/property/PropertyCard.tsx`
- `web/components/room/RoomCard.tsx`
- `web/lib/data.ts`
- `web/lib/payment-service.ts`

These modules still reference:

- `properties`
- `rooms`
- `bookings`
- `payments`
- Firebase Firestore
- old identifiers such as `twiga-agm` and `twiga-residence`

Because the public property flow is still present, it should not be deleted or migrated silently as part of new Mansa operations work.

## Admin Legacy Mutation Surface

The repository also contains admin mutation routes against missing legacy tables:

- `admin/app/api/admin/bookings/[bookingId]/status/route.ts`
- `admin/app/api/admin/payments/[paymentId]/status/route.ts`
- `admin/app/api/admin/rooms/[roomId]/price/route.ts`

These routes are not exposed in the current admin navigation, but they were still privileged service-role mutation endpoints and therefore required authorization hardening.

## Firebase Usage Found

Firebase is still referenced in:

- `web/lib/firebase.ts`
- `web/lib/data.ts`
- `web/lib/payment-service.ts`
- `web/lib/contact-service.ts`

Notes:

- `web/lib/contact-service.ts` is Firebase-specific legacy code, but the current public planning inquiry flow uses Supabase plus Resend instead
- `web/lib/data.ts` and `web/lib/payment-service.ts` remain tied to the old property/room/booking/payment model
- New Mansa modules should not import from these files

## Missing Legacy Tables

Tracked migrations do not currently define the following legacy tables:

- `properties`
- `rooms`
- `bookings`
- `payments`

Do not create compatibility tables purely to preserve this old model.

## Security Action Applied

Admin service-role mutation routes now use a verified admin-membership guard that requires:

- valid Supabase-authenticated user
- matching `admin_profiles.user_id`
- matching `admin_profiles.company_id = 'mansa'`
- role in `manager | admin | super_admin`

Destructive or sensitive mutations remain restricted to:

- `admin`
- `super_admin`

## Architectural Boundary Going Forward

For new Mansa operations development:

- Use Supabase only
- Keep `company_id = 'mansa'` on operational tables
- Treat the public property flow as legacy until replaced
- Do not extend the Twiga-oriented accommodation model
- Do not introduce Firebase into new modules

## Recommended Next Step

Create new Mansa-native operational modules separately from the public property stack:

- customers
- inquiry CRM enrichment
- suppliers
- hotels
- trips
- live trip itinerary items
- quotation snapshots

Those modules should not depend on:

- `web/lib/data.ts`
- `web/lib/payment-service.ts`
- `web/lib/contact-service.ts`
- `admin/lib/shared/types/property.ts`
