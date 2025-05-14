/*
  Warnings:

  - Added the required column `total` to the `session_emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_emissions" ADD COLUMN     "total" DECIMAL NOT NULL;
