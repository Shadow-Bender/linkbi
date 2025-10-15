-- AlterTable
ALTER TABLE "public"."prestataires" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "siteWeb" TEXT,
ADD COLUMN     "twitter" TEXT;
