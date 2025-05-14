/*
  Warnings:

  - Made the column `id_emission_sub_category` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_language` on table `emission_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `emission_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uncertainty` on table `emission_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `emission_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unit` on table `emission_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_emission_sub_category` on table `emission_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_school` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `archived` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_session_student` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_emission_factor` on table `session_emissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `session_emissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_session_emission_sub_category` on table `session_emissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_school` on table `session_students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_emission_sub_category_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_emission_sub_category_fkey";

-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_language_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_id_school_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_id_session_student_fkey";

-- DropForeignKey
ALTER TABLE "session_emissions" DROP CONSTRAINT "session_emissions_id_emission_factor_fkey";

-- DropForeignKey
ALTER TABLE "session_emissions" DROP CONSTRAINT "session_emissions_id_session_emission_sub_category_fkey";

-- DropForeignKey
ALTER TABLE "session_students" DROP CONSTRAINT "session_students_id_school_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "id_emission_sub_category" SET NOT NULL;

-- AlterTable
ALTER TABLE "emission_factors" ALTER COLUMN "id_language" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL,
ALTER COLUMN "uncertainty" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "unit" SET NOT NULL,
ALTER COLUMN "id_emission_sub_category" SET NOT NULL;

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "id_school" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "archived" SET NOT NULL,
ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "id_session_student" SET NOT NULL;

-- AlterTable
ALTER TABLE "session_emissions" ALTER COLUMN "id_emission_factor" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL,
ALTER COLUMN "id_session_emission_sub_category" SET NOT NULL;

-- AlterTable
ALTER TABLE "session_students" ALTER COLUMN "id_school" SET NOT NULL;

-- DropEnum
DROP TYPE "Unit";

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "emission_sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_id_session_student_fkey" FOREIGN KEY ("id_session_student") REFERENCES "session_students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "session_emission_sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_emission_factor_fkey" FOREIGN KEY ("id_emission_factor") REFERENCES "emission_factors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_session_emission_sub_category_fkey" FOREIGN KEY ("id_session_emission_sub_category") REFERENCES "session_emission_sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_students" ADD CONSTRAINT "session_students_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
