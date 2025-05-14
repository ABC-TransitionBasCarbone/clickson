-- CreateTable
CREATE TABLE "comments" (
    "id" INTEGER NOT NULL,
    "id_emission_sub_categorie" UUID,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_created_by" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "school_admins" (
    "school_id" UUID NOT NULL,
    "admin_username" TEXT NOT NULL,

    CONSTRAINT "school_admins_pkey" PRIMARY KEY ("school_id","admin_username")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "state" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "town_name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "student_count" INTEGER,
    "staff_count" INTEGER,
    "establishment_year" INTEGER,
    "adress" TEXT,
    "admin_username" TEXT,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_emission_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_session_student" UUID,
    "id_emission_categorie" INTEGER,

    CONSTRAINT "session_emission_categories_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "school_admins" ADD CONSTRAINT "school_admins_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
