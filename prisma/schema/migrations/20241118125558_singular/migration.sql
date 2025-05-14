/*
  Warnings:

  - You are about to drop the column `id_emission_sub_categorie` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `id_emission_categorie` on the `emission_sub_categories` table. All the data in the column will be lost.
  - You are about to drop the column `id_emission_categorie` on the `session_emission_categories` table. All the data in the column will be lost.
  - You are about to drop the column `id_emission_sub_categorie` on the `session_emission_sub_categories` table. All the data in the column will be lost.
  - You are about to drop the column `id_session_emission_categorie` on the `session_emission_sub_categories` table. All the data in the column will be lost.
  - You are about to drop the column `id_session_emission_sub_categorie` on the `session_emissions` table. All the data in the column will be lost.
  - Added the required column `id_emission_category` to the `emission_sub_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "emission_factors" DROP CONSTRAINT "emission_factors_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "emission_sub_categories" DROP CONSTRAINT "emission_sub_categories_id_emission_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_categories" DROP CONSTRAINT "session_emission_categories_id_emission_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categori_id_session_emission_categori_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_sub_categories" DROP CONSTRAINT "session_emission_sub_categories_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_emissions" DROP CONSTRAINT "session_emissions_id_session_emission_sub_categorie_fkey";

-- AlterTable
ALTER TABLE "emission_factors" DROP COLUMN "id_emission_sub_categorie",
ADD COLUMN     "id_emission_sub_category" INTEGER;

-- AlterTable
ALTER TABLE "emission_sub_categories" DROP COLUMN "id_emission_categorie",
ADD COLUMN     "id_emission_category" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "session_emission_categories" DROP COLUMN "id_emission_categorie",
ADD COLUMN     "id_emission_category" INTEGER;

-- AlterTable
ALTER TABLE "session_emission_sub_categories" DROP COLUMN "id_emission_sub_categorie",
DROP COLUMN "id_session_emission_categorie",
ADD COLUMN     "id_emission_sub_category" INTEGER,
ADD COLUMN     "id_session_emission_category" UUID;

-- AlterTable
ALTER TABLE "session_emissions" DROP COLUMN "id_session_emission_sub_categorie",
ADD COLUMN     "id_session_emission_sub_category" UUID;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_emission_category_fkey" FOREIGN KEY ("id_emission_category") REFERENCES "emission_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_categories" ADD CONSTRAINT "session_emission_categories_id_emission_category_fkey" FOREIGN KEY ("id_emission_category") REFERENCES "emission_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_session_emission_catego_fkey" FOREIGN KEY ("id_session_emission_category") REFERENCES "session_emission_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_emission_sub_category_fkey" FOREIGN KEY ("id_emission_sub_category") REFERENCES "emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_session_emission_sub_category_fkey" FOREIGN KEY ("id_session_emission_sub_category") REFERENCES "session_emission_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
