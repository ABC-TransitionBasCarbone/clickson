-- AlterTable
ALTER TABLE "emission_factors" ADD COLUMN     "depreciationPeriod" DECIMAL;

-- AlterTable
ALTER TABLE "session_emissions" ADD COLUMN     "uncertainty" DECIMAL NOT NULL DEFAULT 0;
