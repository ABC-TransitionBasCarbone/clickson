/*
  Warnings:

  - Added the required column `label` to the `session_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `session_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `session_emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_emissions" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;
