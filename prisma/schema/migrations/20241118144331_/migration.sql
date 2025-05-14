/*
  Warnings:

  - You are about to drop the column `id_emission_sub_categorie` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_emission_sub_categorie_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "id_emission_sub_categorie",
ADD COLUMN     "id_emission_sub_category" UUID;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "session_emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
