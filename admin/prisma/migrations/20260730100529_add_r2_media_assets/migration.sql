-- CreateEnum
CREATE TYPE "MediaKind" AS ENUM ('image', 'document');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('pending', 'ready');

-- CreateTable
CREATE TABLE "media_assets" (
    "id" UUID NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT 'mansa',
    "object_key" TEXT NOT NULL,
    "public_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "byte_size" INTEGER NOT NULL,
    "kind" "MediaKind" NOT NULL,
    "status" "MediaStatus" NOT NULL DEFAULT 'pending',
    "scope" TEXT NOT NULL,
    "entity_type" TEXT,
    "entity_id" UUID,
    "uploaded_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_assets_object_key_key" ON "media_assets"("object_key");

-- CreateIndex
CREATE INDEX "media_assets_company_id_scope_created_at_idx" ON "media_assets"("company_id", "scope", "created_at" DESC);

-- CreateIndex
CREATE INDEX "media_assets_entity_type_entity_id_idx" ON "media_assets"("entity_type", "entity_id");

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
