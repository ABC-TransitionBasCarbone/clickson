-- DropForeignKey
ALTER TABLE "session_emissions" DROP CONSTRAINT "session_emissions_id_emission_factor_fkey";

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_emission_factor_fkey" FOREIGN KEY ("id_emission_factor") REFERENCES "emission_factors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
