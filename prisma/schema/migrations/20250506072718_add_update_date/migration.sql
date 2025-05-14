    -- AlterTable
ALTER TABLE "emission_categories" ALTER COLUMN "id_emission_category" DROP DEFAULT;
DROP SEQUENCE "emission_categories_id_emission_category_seq";

-- AlterTable
ALTER TABLE "emission_sub_categories" ALTER COLUMN "id_emission_sub_category" DROP DEFAULT;
DROP SEQUENCE "emission_sub_categories_id_emission_sub_category_seq";

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "school_admins" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "schools" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "session_emission_categories" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "session_emission_sub_categories" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "session_emissions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "session_students" ALTER COLUMN "updated_at" DROP DEFAULT;
