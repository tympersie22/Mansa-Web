-- Mansa OS owns the editable itinerary document. The JSON document keeps the
-- guest presentation flexible while the operational tables remain normalized.
CREATE TYPE "ItineraryStatus" AS ENUM ('draft', 'published', 'archived');

CREATE TABLE "os_itineraries" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ItineraryStatus" NOT NULL DEFAULT 'draft',
    "document" JSONB NOT NULL DEFAULT '{}',
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    CONSTRAINT "os_itineraries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "os_itineraries_company_id_slug_key" ON "os_itineraries"("company_id", "slug");
CREATE INDEX "os_itineraries_company_id_status_updated_at_idx" ON "os_itineraries"("company_id", "status", "updated_at" DESC);
ALTER TABLE "os_itineraries" ADD CONSTRAINT "os_itineraries_created_by_fkey"
  FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
