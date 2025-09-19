-- CreateEnum
CREATE TYPE "public"."RaceType" AS ENUM ('ENDURANCE', 'SPRINT', 'GP', 'RALLY', 'RALLY_RAID', 'ELECTRIC');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Race" (
    "id" TEXT NOT NULL,
    "championship" TEXT NOT NULL,
    "type" "public"."RaceType" NOT NULL,
    "location" TEXT NOT NULL,
    "raceStartTime" TIMESTAMP(3) NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Race_championship_idx" ON "public"."Race"("championship");

-- CreateIndex
CREATE INDEX "Race_type_idx" ON "public"."Race"("type");

-- CreateIndex
CREATE INDEX "Race_raceStartTime_idx" ON "public"."Race"("raceStartTime");
