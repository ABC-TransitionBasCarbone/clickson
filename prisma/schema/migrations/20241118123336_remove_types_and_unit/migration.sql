/*
  Warnings:

  - You are about to drop the column `id_type` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `id_unit` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the `emission_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emission_units` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_type_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_unit_fkey";

-- DropForeignKey
ALTER TABLE "emission_types" DROP CONSTRAINT "emission_types_id_language_fkey";

-- DropForeignKey
ALTER TABLE "emission_units" DROP CONSTRAINT "emission_units_id_language_fkey";

-- AlterTable
CREATE SEQUENCE emission_factors_id_seq;
ALTER TABLE "emission_factors" DROP COLUMN "id_type",
DROP COLUMN "id_unit",
ADD COLUMN     "type" TEXT,
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('emission_factors_id_seq');
ALTER SEQUENCE emission_factors_id_seq OWNED BY "emission_factors"."id";

-- DropTable
DROP TABLE "emission_types";

-- DropTable
DROP TABLE "emission_units";
