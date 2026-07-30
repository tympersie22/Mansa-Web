-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('manager', 'admin', 'super_admin');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('lead', 'active', 'past_guest', 'inactive');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'closed');

-- CreateEnum
CREATE TYPE "InquiryPriority" AS ENUM ('low', 'normal', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "SupplierType" AS ENUM ('hotel', 'transport', 'experience', 'guide', 'restaurant', 'flight', 'other');

-- CreateEnum
CREATE TYPE "SupplierStatus" AS ENUM ('active', 'inactive', 'preferred');

-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('planning', 'quoted', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "ItineraryItemType" AS ENUM ('accommodation', 'experience', 'transfer', 'flight', 'meal', 'guide', 'note', 'other');

-- CreateEnum
CREATE TYPE "ItineraryItemStatus" AS ENUM ('planned', 'requested', 'confirmed', 'cancelled', 'completed');

-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('draft', 'issued', 'accepted', 'declined', 'expired', 'superseded');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMPTZ(6),
    "image" TEXT,
    "password_hash" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL
);

-- CreateTable
CREATE TABLE "admin_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "role" "AdminRole" NOT NULL,
    "display_name" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "admin_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "property_id" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "actor" JSONB NOT NULL DEFAULT '{}',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "phone_whatsapp" TEXT,
    "nationality" TEXT,
    "source" TEXT,
    "status" "CustomerStatus" NOT NULL DEFAULT 'lead',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "notes" TEXT,
    "last_contact_at" TIMESTAMPTZ(6),
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning_inquiries" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "legacy_journey_id" UUID,
    "customer_id" UUID,
    "assigned_to" UUID,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_whatsapp" TEXT,
    "travel_start_date" DATE,
    "travel_end_date" DATE,
    "is_date_flexible" BOOLEAN NOT NULL DEFAULT false,
    "guest_count" INTEGER NOT NULL DEFAULT 1,
    "message" TEXT,
    "source_page" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'new',
    "priority" "InquiryPriority" NOT NULL DEFAULT 'normal',
    "budget_min" DECIMAL(14,2),
    "budget_max" DECIMAL(14,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "destinations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "travel_style" TEXT,
    "source_detail" TEXT,
    "internal_notes" TEXT,
    "next_follow_up_at" TIMESTAMPTZ(6),
    "converted_at" TIMESTAMPTZ(6),
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_term" TEXT,
    "utm_content" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "planning_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "name" TEXT NOT NULL,
    "supplier_type" "SupplierType" NOT NULL,
    "contact_name" TEXT,
    "email" TEXT,
    "phone_whatsapp" TEXT,
    "location" TEXT,
    "website" TEXT,
    "payment_terms" TEXT,
    "notes" TEXT,
    "status" "SupplierStatus" NOT NULL DEFAULT 'active',
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "supplier_id" UUID,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "star_rating" DECIMAL(2,1),
    "contact_name" TEXT,
    "email" TEXT,
    "phone_whatsapp" TEXT,
    "website" TEXT,
    "check_in_time" TIME(6),
    "check_out_time" TIME(6),
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "status" "SupplierStatus" NOT NULL DEFAULT 'active',
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_types" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "hotel_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "max_adults" INTEGER NOT NULL DEFAULT 2,
    "max_children" INTEGER NOT NULL DEFAULT 0,
    "bed_configuration" TEXT,
    "meal_plan" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "default_cost" DECIMAL(14,2),
    "default_sell_price" DECIMAL(14,2),
    "status" "RecordStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "room_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "inquiry_id" UUID,
    "customer_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'planning',
    "start_date" DATE,
    "end_date" DATE,
    "guest_count" INTEGER NOT NULL DEFAULT 1,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "inquiry_snapshot" JSONB NOT NULL DEFAULT '{}',
    "customer_snapshot" JSONB NOT NULL DEFAULT '{}',
    "internal_notes" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_days" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "trip_id" UUID NOT NULL,
    "day_number" INTEGER NOT NULL,
    "trip_date" DATE,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "summary" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "trip_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_items" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "trip_day_id" UUID NOT NULL,
    "supplier_id" UUID,
    "hotel_id" UUID,
    "room_type_id" UUID,
    "item_type" "ItineraryItemType" NOT NULL,
    "start_time" TIME(6),
    "end_time" TIME(6),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "confirmation_reference" TEXT,
    "status" "ItineraryItemStatus" NOT NULL DEFAULT 'planned',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "quantity" DECIMAL(12,2) NOT NULL DEFAULT 1,
    "cost_amount" DECIMAL(14,2),
    "sell_amount" DECIMAL(14,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "supplier_snapshot" JSONB NOT NULL DEFAULT '{}',
    "service_snapshot" JSONB NOT NULL DEFAULT '{}',
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "itinerary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotations" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "trip_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "quotation_number" TEXT NOT NULL DEFAULT 'Q-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6)),
    "revision" INTEGER NOT NULL DEFAULT 1,
    "status" "QuotationStatus" NOT NULL DEFAULT 'draft',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "subtotal" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "valid_until" DATE,
    "terms" TEXT,
    "customer_snapshot" JSONB NOT NULL,
    "trip_snapshot" JSONB NOT NULL,
    "issued_at" TIMESTAMPTZ(6),
    "accepted_at" TIMESTAMPTZ(6),
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_items" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "quotation_id" UUID NOT NULL,
    "trip_day_id" UUID,
    "itinerary_item_id" UUID,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DECIMAL(12,2) NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "total_amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "supplier_snapshot" JSONB NOT NULL DEFAULT '{}',
    "item_snapshot" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotation_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_user_id_key" ON "admin_profiles"("user_id");

-- CreateIndex
CREATE INDEX "admin_profiles_company_id_role_idx" ON "admin_profiles"("company_id", "role");

-- CreateIndex
CREATE INDEX "admin_logs_company_id_created_at_idx" ON "admin_logs"("company_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "admin_logs_entity_type_entity_id_idx" ON "admin_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "customers_company_id_full_name_idx" ON "customers"("company_id", "full_name");

-- CreateIndex
CREATE INDEX "customers_company_id_email_idx" ON "customers"("company_id", "email");

-- CreateIndex
CREATE INDEX "planning_inquiries_company_id_status_created_at_idx" ON "planning_inquiries"("company_id", "status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "suppliers_company_id_supplier_type_name_idx" ON "suppliers"("company_id", "supplier_type", "name");

-- CreateIndex
CREATE INDEX "hotels_company_id_location_name_idx" ON "hotels"("company_id", "location", "name");

-- CreateIndex
CREATE INDEX "room_types_hotel_id_name_idx" ON "room_types"("hotel_id", "name");

-- CreateIndex
CREATE INDEX "trips_company_id_status_start_date_idx" ON "trips"("company_id", "status", "start_date");

-- CreateIndex
CREATE INDEX "trips_inquiry_id_idx" ON "trips"("inquiry_id");

-- CreateIndex
CREATE INDEX "trip_days_trip_id_day_number_idx" ON "trip_days"("trip_id", "day_number");

-- CreateIndex
CREATE UNIQUE INDEX "trip_days_trip_id_day_number_key" ON "trip_days"("trip_id", "day_number");

-- CreateIndex
CREATE INDEX "itinerary_items_trip_day_id_sort_order_idx" ON "itinerary_items"("trip_day_id", "sort_order");

-- CreateIndex
CREATE INDEX "quotations_trip_id_revision_idx" ON "quotations"("trip_id", "revision" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "quotations_company_id_quotation_number_key" ON "quotations"("company_id", "quotation_number");

-- CreateIndex
CREATE UNIQUE INDEX "quotations_trip_id_revision_key" ON "quotations"("trip_id", "revision");

-- CreateIndex
CREATE INDEX "quotation_items_quotation_id_sort_order_idx" ON "quotation_items"("quotation_id", "sort_order");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_profiles" ADD CONSTRAINT "admin_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_inquiries" ADD CONSTRAINT "planning_inquiries_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_inquiries" ADD CONSTRAINT "planning_inquiries_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_types" ADD CONSTRAINT "room_types_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_inquiry_id_fkey" FOREIGN KEY ("inquiry_id") REFERENCES "planning_inquiries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_days" ADD CONSTRAINT "trip_days_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_trip_day_id_fkey" FOREIGN KEY ("trip_day_id") REFERENCES "trip_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_trip_day_id_fkey" FOREIGN KEY ("trip_day_id") REFERENCES "trip_days"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_itinerary_item_id_fkey" FOREIGN KEY ("itinerary_item_id") REFERENCES "itinerary_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Single-company boundary. Multi-tenancy must be introduced through an explicit migration.
ALTER TABLE "admin_profiles" ADD CONSTRAINT "admin_profiles_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "customers" ADD CONSTRAINT "customers_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "planning_inquiries" ADD CONSTRAINT "planning_inquiries_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "room_types" ADD CONSTRAINT "room_types_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "trips" ADD CONSTRAINT "trips_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "trip_days" ADD CONSTRAINT "trip_days_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_company_check" CHECK ("company_id" = 'mansa');
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_company_check" CHECK ("company_id" = 'mansa');

-- Business invariants that Prisma's schema language cannot express.
ALTER TABLE "planning_inquiries" ADD CONSTRAINT "planning_inquiries_guest_count_check" CHECK ("guest_count" > 0);
ALTER TABLE "planning_inquiries" ADD CONSTRAINT "planning_inquiries_dates_check"
  CHECK ("travel_end_date" IS NULL OR "travel_start_date" IS NULL OR "travel_end_date" >= "travel_start_date");
ALTER TABLE "planning_inquiries" ADD CONSTRAINT "planning_inquiries_budget_check"
  CHECK (
    ("budget_min" IS NULL OR "budget_min" >= 0)
    AND ("budget_max" IS NULL OR "budget_max" >= 0)
    AND ("budget_min" IS NULL OR "budget_max" IS NULL OR "budget_max" >= "budget_min")
  );
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_rating_check"
  CHECK ("star_rating" IS NULL OR "star_rating" BETWEEN 0 AND 5);
ALTER TABLE "room_types" ADD CONSTRAINT "room_types_capacity_check"
  CHECK ("max_adults" > 0 AND "max_children" >= 0);
ALTER TABLE "room_types" ADD CONSTRAINT "room_types_prices_check"
  CHECK (
    ("default_cost" IS NULL OR "default_cost" >= 0)
    AND ("default_sell_price" IS NULL OR "default_sell_price" >= 0)
  );
ALTER TABLE "trips" ADD CONSTRAINT "trips_guest_count_check" CHECK ("guest_count" > 0);
ALTER TABLE "trips" ADD CONSTRAINT "trips_dates_check"
  CHECK ("end_date" IS NULL OR "start_date" IS NULL OR "end_date" >= "start_date");
ALTER TABLE "trip_days" ADD CONSTRAINT "trip_days_number_check" CHECK ("day_number" > 0);
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_amounts_check"
  CHECK (
    "quantity" > 0
    AND ("cost_amount" IS NULL OR "cost_amount" >= 0)
    AND ("sell_amount" IS NULL OR "sell_amount" >= 0)
  );
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_revision_check" CHECK ("revision" > 0);
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_amounts_check"
  CHECK ("subtotal" >= 0 AND "tax_amount" >= 0 AND "total_amount" >= 0);
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_values_check"
  CHECK ("quantity" > 0 AND "unit_price" >= 0);

CREATE OR REPLACE FUNCTION prevent_trip_conversion_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW."customer_id" IS DISTINCT FROM OLD."customer_id"
    OR NEW."inquiry_id" IS DISTINCT FROM OLD."inquiry_id"
    OR NEW."customer_snapshot" IS DISTINCT FROM OLD."customer_snapshot"
    OR NEW."inquiry_snapshot" IS DISTINCT FROM OLD."inquiry_snapshot" THEN
    RAISE EXCEPTION 'Trip conversion identity and snapshots are immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "trg_trips_conversion_immutable"
BEFORE UPDATE ON "trips"
FOR EACH ROW EXECUTE FUNCTION prevent_trip_conversion_mutation();

CREATE OR REPLACE FUNCTION guard_quotation_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD."status" <> 'draft' THEN
      RAISE EXCEPTION 'Issued quotations are immutable; create a new revision';
    END IF;
    RETURN OLD;
  END IF;

  IF NEW."trip_id" IS DISTINCT FROM OLD."trip_id"
    OR NEW."customer_id" IS DISTINCT FROM OLD."customer_id"
    OR NEW."customer_snapshot" IS DISTINCT FROM OLD."customer_snapshot"
    OR NEW."trip_snapshot" IS DISTINCT FROM OLD."trip_snapshot" THEN
    RAISE EXCEPTION 'Quotation source identity and snapshots are immutable';
  END IF;

  IF OLD."status" <> 'draft' AND (
    NEW."quotation_number" IS DISTINCT FROM OLD."quotation_number"
    OR NEW."revision" IS DISTINCT FROM OLD."revision"
    OR NEW."currency" IS DISTINCT FROM OLD."currency"
    OR NEW."subtotal" IS DISTINCT FROM OLD."subtotal"
    OR NEW."tax_amount" IS DISTINCT FROM OLD."tax_amount"
    OR NEW."total_amount" IS DISTINCT FROM OLD."total_amount"
    OR NEW."valid_until" IS DISTINCT FROM OLD."valid_until"
    OR NEW."terms" IS DISTINCT FROM OLD."terms"
  ) THEN
    RAISE EXCEPTION 'Issued quotation values are immutable; create a new revision';
  END IF;

  IF NEW."status" IS DISTINCT FROM OLD."status" AND NOT (
    (OLD."status" = 'draft' AND NEW."status" IN ('issued', 'superseded'))
    OR (OLD."status" = 'issued' AND NEW."status" IN ('accepted', 'declined', 'expired', 'superseded'))
  ) THEN
    RAISE EXCEPTION 'Invalid quotation status transition';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER "trg_quotations_immutable"
BEFORE UPDATE OR DELETE ON "quotations"
FOR EACH ROW EXECUTE FUNCTION guard_quotation_mutation();

CREATE OR REPLACE FUNCTION guard_quotation_item_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  quotation_status "QuotationStatus";
BEGIN
  SELECT "status" INTO quotation_status
  FROM "quotations"
  WHERE "id" = CASE WHEN TG_OP = 'DELETE' THEN OLD."quotation_id" ELSE NEW."quotation_id" END;

  IF quotation_status <> 'draft' THEN
    RAISE EXCEPTION 'Issued quotation items are immutable; create a new revision';
  END IF;

  IF TG_OP = 'UPDATE' AND (
    NEW."quotation_id" IS DISTINCT FROM OLD."quotation_id"
    OR NEW."trip_day_id" IS DISTINCT FROM OLD."trip_day_id"
    OR NEW."itinerary_item_id" IS DISTINCT FROM OLD."itinerary_item_id"
    OR NEW."supplier_snapshot" IS DISTINCT FROM OLD."supplier_snapshot"
    OR NEW."item_snapshot" IS DISTINCT FROM OLD."item_snapshot"
  ) THEN
    RAISE EXCEPTION 'Quotation item source identity and snapshots are immutable';
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;

  NEW."total_amount" := NEW."quantity" * NEW."unit_price";
  RETURN NEW;
END;
$$;

CREATE TRIGGER "trg_quotation_items_immutable"
BEFORE INSERT OR UPDATE OR DELETE ON "quotation_items"
FOR EACH ROW EXECUTE FUNCTION guard_quotation_item_mutation();
