/*
  Warnings:

  - You are about to alter the column `value` on the `emission_factors` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.
  - You are about to alter the column `uncertainty` on the `emission_factors` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.
  - You are about to alter the column `depreciationPeriod` on the `emission_factors` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.
  - You are about to alter the column `value` on the `session_emissions` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.
  - You are about to alter the column `total` on the `session_emissions` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.
  - You are about to alter the column `uncertainty` on the `session_emissions` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "emission_factors" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "uncertainty" DROP NOT NULL,
ALTER COLUMN "uncertainty" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "depreciationPeriod" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "session_emissions" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "uncertainty" DROP NOT NULL,
ALTER COLUMN "uncertainty" DROP DEFAULT,
ALTER COLUMN "uncertainty" SET DATA TYPE DOUBLE PRECISION;
