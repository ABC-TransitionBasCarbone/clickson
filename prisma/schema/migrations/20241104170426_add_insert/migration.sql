/*
  Warnings:

  - You are about to drop the `emission_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emission_factors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emission_sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emission_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emission_units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session_emission_sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session_emissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session_students` table. If the table is not empty, all the data it contains will be lost.

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
ALTER TABLE "session_students" DROP CONSTRAINT "session_students_id_group_fkey";

-- DropForeignKey
ALTER TABLE "session_students" DROP CONSTRAINT "session_students_id_school_fkey";

-- DropTable
DROP TABLE "emission_categories";

-- DropTable
DROP TABLE "emission_factors";

-- DropTable
DROP TABLE "emission_sub_categories";

-- DropTable
DROP TABLE "emission_types";

-- DropTable
DROP TABLE "emission_units";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "languages";

-- DropTable
DROP TABLE "session_emission_sub_categories";

-- DropTable
DROP TABLE "session_emissions";

-- DropTable
DROP TABLE "session_students";

-- CreateTable
CREATE TABLE "EmissionCategories" (
    "id" INTEGER NOT NULL,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(2550) NOT NULL,

    CONSTRAINT "EmissionCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionFactors" (
    "id" INTEGER NOT NULL,
    "id_emission_sub_categorie" INTEGER,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "id_type" INTEGER,
    "id_unit" INTEGER,
    "value" DECIMAL,
    "uncertainty" DECIMAL,

    CONSTRAINT "EmissionFactors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionSubCategories" (
    "id" INTEGER NOT NULL,
    "id_emission_categorie" INTEGER,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(2550) NOT NULL,

    CONSTRAINT "EmissionSubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionTypes" (
    "id" INTEGER NOT NULL,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "EmissionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionUnits" (
    "id" INTEGER NOT NULL,
    "id_language" INTEGER,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "EmissionUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_school" UUID,
    "teacher_username" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER DEFAULT date_part('year'::text, CURRENT_DATE),
    "archived" BOOLEAN DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" INTEGER NOT NULL,
    "language_code" CHAR(2) NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionEmissionSubCategories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_session_emission_categorie" UUID,
    "id_emission_sub_categorie" INTEGER,

    CONSTRAINT "SessionEmissionSubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionEmissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_session_emission_sub_categorie" UUID,
    "id_emission_factor" INTEGER,
    "value" DECIMAL,

    CONSTRAINT "SessionEmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionStudents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_school" UUID,
    "id_group" UUID,
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER DEFAULT date_part('year'::text, CURRENT_DATE),
    "progress" INTEGER DEFAULT 0,
    "archived" BOOLEAN DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "SessionStudents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "SessionEmissionSubCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionCategories" ADD CONSTRAINT "EmissionCategories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "Languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionFactors" ADD CONSTRAINT "EmissionFactors_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "EmissionSubCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionFactors" ADD CONSTRAINT "EmissionFactors_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "Languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionFactors" ADD CONSTRAINT "EmissionFactors_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "EmissionTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionFactors" ADD CONSTRAINT "EmissionFactors_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "EmissionUnits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionSubCategories" ADD CONSTRAINT "EmissionSubCategories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "EmissionCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionSubCategories" ADD CONSTRAINT "EmissionSubCategories_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "Languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionTypes" ADD CONSTRAINT "EmissionTypes_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "Languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmissionUnits" ADD CONSTRAINT "EmissionUnits_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "Languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_emission_categories" ADD CONSTRAINT "session_emission_categories_id_emission_categorie_fkey" FOREIGN KEY ("id_emission_categorie") REFERENCES "EmissionCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SessionEmissionSubCategories" ADD CONSTRAINT "session_emission_sub_categori_id_session_emission_categori_fkey" FOREIGN KEY ("id_session_emission_categorie") REFERENCES "session_emission_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SessionEmissionSubCategories" ADD CONSTRAINT "SessionEmissionSubCategories_id_emission_sub_categorie_fkey" FOREIGN KEY ("id_emission_sub_categorie") REFERENCES "EmissionSubCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SessionEmissions" ADD CONSTRAINT "SessionEmissions_id_emission_factor_fkey" FOREIGN KEY ("id_emission_factor") REFERENCES "EmissionFactors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SessionEmissions" ADD CONSTRAINT "SessionEmissions_id_session_emission_sub_categorie_fkey" FOREIGN KEY ("id_session_emission_sub_categorie") REFERENCES "SessionEmissionSubCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SessionStudents" ADD CONSTRAINT "SessionStudents_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SessionStudents" ADD CONSTRAINT "SessionStudents_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
