/*
  Warnings:

  - Made the column `id_language` on table `emission_sub_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "emission_sub_categories" DROP CONSTRAINT "emission_sub_categories_id_language_fkey";

-- AlterTable
ALTER TABLE "emission_sub_categories" ALTER COLUMN "id_language" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
