/*
  Warnings:

  - Made the column `year` on table `session_students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `progress` on table `session_students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `archived` on table `session_students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `session_students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "emission_categories" DROP CONSTRAINT "emission_categories_id_language_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_language_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_type_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_unit_fkey";

-- DropForeignKey
ALTER TABLE "emission_sub_categories" DROP CONSTRAINT "emission_sub_categories_id_emission_categorie_fkey";

-- DropForeignKey
ALTER TABLE "emission_sub_categories" DROP CONSTRAINT "emission_sub_categories_id_language_fkey";

-- DropForeignKey
ALTER TABLE "emission_types" DROP CONSTRAINT "emission_types_id_language_fkey";

-- DropForeignKey
ALTER TABLE "emission_units" DROP CONSTRAINT "emission_units_id_language_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_id_school_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_id_session_student_fkey";

-- DropForeignKey
ALTER TABLE "school_admins" DROP CONSTRAINT "school_admins_school_id_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_categories" DROP CONSTRAINT "session_emission_categories_id_emission_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categori_id_session_emission_categori_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categories_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_emissions" DROP CONSTRAINT "session_emissions_id_emission_factor_fkey";

-- DropForeignKey
ALTER TABLE "session_emissions" DROP CONSTRAINT "session_emissions_id_session_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_students" DROP CONSTRAINT "session_students_id_school_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "rights" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "session_students" ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "progress" SET NOT NULL,
ALTER COLUMN "archived" SET NOT NULL,
ALTER COLUMN "deleted" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_id_session_student_fkey" FOREIGN KEY ("id_session_student") REFERENCES "session_students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_categories" ADD CONSTRAINT "emission_categories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "emission_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "emission_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "emission_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_types" ADD CONSTRAINT "emission_types_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_units" ADD CONSTRAINT "emission_units_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_admins" ADD CONSTRAINT "school_admins_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "session_emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_categories" ADD CONSTRAINT "session_emission_categories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "emission_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categori_id_session_emission_categori_fkey" FOREIGN KEY ("id_session_emission_categorie") REFERENCES "session_emission_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_emission_factor_fkey" FOREIGN KEY ("id_emission_factor") REFERENCES "emission_factors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_session_emission_sub_categorie_fkey" FOREIGN KEY ("id_session_emission_sub_categorie") REFERENCES "session_emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_students" ADD CONSTRAINT "session_students_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
