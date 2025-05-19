-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categories_id_emission_sub_category_fkey";

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "emission_sub_categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
