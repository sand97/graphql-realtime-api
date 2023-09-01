/*
  Warnings:

  - The `language` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'fr');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "language",
ADD COLUMN     "language" "Locale" DEFAULT 'fr';
