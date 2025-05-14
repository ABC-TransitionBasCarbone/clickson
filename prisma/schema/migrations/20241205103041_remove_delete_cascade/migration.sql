/*
  Warnings:

  - Made the column `id_session_student` on table `session_emission_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_emission_category` on table `session_emission_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_emission_sub_category` on table `session_emission_sub_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_session_emission_category` on table `session_emission_sub_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "session_emission_categories" DROP CONSTRAINT "session_emission_categories_id_emission_category_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_categories" DROP CONSTRAINT "session_emission_categories_id_session_student_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categories_id_emission_sub_category_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categories_id_session_emission_catego_fkey";

-- AlterTable
ALTER TABLE "session_emission_categories" ALTER COLUMN "id_session_student" SET NOT NULL,
ALTER COLUMN "id_emission_category" SET NOT NULL;

-- AlterTable
ALTER TABLE "session_emission_sub_categories" ALTER COLUMN "id_emission_sub_category" SET NOT NULL,
ALTER COLUMN "id_session_emission_category" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "session_emission_categories" ADD CONSTRAINT "session_emission_categories_id_emission_category_fkey" FOREIGN KEY ("id_emission_category") REFERENCES "emission_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_categories" ADD CONSTRAINT "session_emission_categories_id_session_student_fkey" FOREIGN KEY ("id_session_student") REFERENCES "session_students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_session_emission_catego_fkey" FOREIGN KEY ("id_session_emission_category") REFERENCES "session_emission_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "emission_sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
