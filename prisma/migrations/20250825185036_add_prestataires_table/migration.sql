-- CreateTable
CREATE TABLE "public"."prestataires" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "domaine" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "description" TEXT,
    "note" DOUBLE PRECISION DEFAULT 0,
    "prix" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestataires_pkey" PRIMARY KEY ("id")
);
