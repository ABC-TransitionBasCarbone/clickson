/*
  Warnings:

  - Made the column `id_language` on table `emission_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_emission_categorie` on table `emission_sub_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "emission_categories" DROP CONSTRAINT "emission_categories_id_language_fkey";

-- DropForeignKey
ALTER TABLE "emission_sub_categories" DROP CONSTRAINT "emission_sub_categories_id_emission_categorie_fkey";

-- AlterTable
CREATE SEQUENCE emission_categories_id_seq;
ALTER TABLE "emission_categories" ALTER COLUMN "id" SET DEFAULT nextval('emission_categories_id_seq'),
ALTER COLUMN "id_language" SET NOT NULL;
ALTER SEQUENCE emission_categories_id_seq OWNED BY "emission_categories"."id";

-- AlterTable
CREATE SEQUENCE emission_sub_categories_id_seq;
ALTER TABLE "emission_sub_categories" ALTER COLUMN "id" SET DEFAULT nextval('emission_sub_categories_id_seq'),
ALTER COLUMN "id_emission_categorie" SET NOT NULL;
ALTER SEQUENCE emission_sub_categories_id_seq OWNED BY "emission_sub_categories"."id";

-- AddForeignKey
ALTER TABLE "emission_categories" ADD CONSTRAINT "emission_categories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "emission_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
