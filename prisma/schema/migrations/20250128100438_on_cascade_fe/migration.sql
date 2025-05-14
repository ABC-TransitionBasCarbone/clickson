-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_emission_sub_category_fkey";

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "emission_sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
