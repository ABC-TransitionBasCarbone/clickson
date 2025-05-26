-- AlterTable
CREATE SEQUENCE emission_factors_id_seq;
ALTER TABLE "emission_factors" ALTER COLUMN "id" SET DEFAULT nextval('emission_factors_id_seq');
ALTER SEQUENCE emission_factors_id_seq OWNED BY "emission_factors"."id";
