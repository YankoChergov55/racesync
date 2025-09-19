/*
  Warnings:

  - Added the required column `title` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Race" ADD COLUMN     "title" TEXT NOT NULL;
