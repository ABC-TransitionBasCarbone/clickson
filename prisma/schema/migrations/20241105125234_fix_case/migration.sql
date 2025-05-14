/*
  Warnings:

  - You are about to drop the `EmissionCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmissionFactors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmissionSubCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmissionTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmissionUnits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionEmissionSubCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionEmissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionStudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmissionCategories" DROP CONSTRAINT "EmissionCategories_id_language_fkey";

-- DropForeignKey
ALTER TABLE "EmissionFactors" DROP CONSTRAINT "EmissionFactors_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "EmissionFactors" DROP CONSTRAINT "EmissionFactors_id_language_fkey";

-- DropForeignKey
ALTER TABLE "EmissionFactors" DROP CONSTRAINT "EmissionFactors_id_type_fkey";

-- DropForeignKey
ALTER TABLE "EmissionFactors" DROP CONSTRAINT "EmissionFactors_id_unit_fkey";

-- DropForeignKey
ALTER TABLE "EmissionSubCategories" DROP CONSTRAINT "EmissionSubCategories_id_emission_categorie_fkey";

-- DropForeignKey
ALTER TABLE "EmissionSubCategories" DROP CONSTRAINT "EmissionSubCategories_id_language_fkey";

-- DropForeignKey
ALTER TABLE "EmissionTypes" DROP CONSTRAINT "EmissionTypes_id_language_fkey";

-- DropForeignKey
ALTER TABLE "EmissionUnits" DROP CONSTRAINT "EmissionUnits_id_language_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_id_school_fkey";

-- DropForeignKey
ALTER TABLE "SessionEmissionSubCategories" DROP CONSTRAINT "SessionEmissionSubCategories_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "SessionEmissionSubCategories" DROP CONSTRAINT "session_emission_sub_categori_id_session_emission_categori_fkey";

-- DropForeignKey
ALTER TABLE "SessionEmissions" DROP CONSTRAINT "SessionEmissions_id_emission_factor_fkey";

-- DropForeignKey
ALTER TABLE "SessionEmissions" DROP CONSTRAINT "SessionEmissions_id_session_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "SessionStudents" DROP CONSTRAINT "SessionStudents_id_group_fkey";

-- DropForeignKey
ALTER TABLE "SessionStudents" DROP CONSTRAINT "SessionStudents_id_school_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_emission_sub_categorie_fkey";

-- DropForeignKey
ALTER TABLE "session_emission_categories" DROP CONSTRAINT "session_emission_categories_id_emission_categorie_fkey";

-- DropTable
DROP TABLE "EmissionCategories";

-- DropTable
DROP TABLE "EmissionFactors";

-- DropTable
DROP TABLE "EmissionSubCategories";

-- DropTable
DROP TABLE "EmissionTypes";

-- DropTable
DROP TABLE "EmissionUnits";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "Languages";

-- DropTable
DROP TABLE "SessionEmissionSubCategories";

-- DropTable
DROP TABLE "SessionEmissions";

-- DropTable
DROP TABLE "SessionStudents";

-- CreateTable
CREATE TABLE "emission_categories" (
    "id" INTEGER NOT NULL,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(2550) NOT NULL,

    CONSTRAINT "emission_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_factors" (
    "id" INTEGER NOT NULL,
    "id_emission_sub_categorie" INTEGER,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "id_type" INTEGER,
    "id_unit" INTEGER,
    "value" DECIMAL,
    "uncertainty" DECIMAL,

    CONSTRAINT "emission_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_sub_categories" (
    "id" INTEGER NOT NULL,
    "id_emission_categorie" INTEGER,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(2550) NOT NULL,

    CONSTRAINT "emission_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_types" (
    "id" INTEGER NOT NULL,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "emission_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_units" (
    "id" INTEGER NOT NULL,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "emission_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_school" UUID,
    "teacher_username" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER DEFAULT date_part('year'::text, CURRENT_DATE),
    "archived" BOOLEAN DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" INTEGER NOT NULL,
    "language_code" CHAR(2) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_emission_sub_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_session_emission_categorie" UUID,
    "id_emission_sub_categorie" INTEGER,

    CONSTRAINT "session_emission_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_emissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_session_emission_sub_categorie" UUID,
    "id_emission_factor" INTEGER,
    "value" DECIMAL,

    CONSTRAINT "session_emissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_students" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_school" UUID,
    "id_group" UUID,
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER DEFAULT date_part('year'::text, CURRENT_DATE),
    "progress" INTEGER DEFAULT 0,
    "archived" BOOLEAN DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "session_students_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "session_emission_sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_categories" ADD CONSTRAINT "emission_categories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "emission_sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "emission_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "emission_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "emission_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_sub_categories" ADD CONSTRAINT "emission_sub_categories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_types" ADD CONSTRAINT "emission_types_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emission_units" ADD CONSTRAINT "emission_units_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_emission_categories" ADD CONSTRAINT "session_emission_categories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "emission_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categori_id_session_emission_categori_fkey" FOREIGN KEY ("id_session_emission_categorie") REFERENCES "session_emission_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_emission_sub_categories" ADD CONSTRAINT "session_emission_sub_categories_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "emission_sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_emission_factor_fkey" FOREIGN KEY ("id_emission_factor") REFERENCES "emission_factors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_emissions" ADD CONSTRAINT "session_emissions_id_session_emission_sub_categorie_fkey" FOREIGN KEY ("id_session_emission_sub_categorie") REFERENCES "session_emission_sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_students" ADD CONSTRAINT "session_students_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_students" ADD CONSTRAINT "session_students_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
