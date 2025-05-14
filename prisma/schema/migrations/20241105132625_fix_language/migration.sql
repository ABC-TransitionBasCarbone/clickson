/*
  Warnings:

  - Added the required column `flag_url` to the `languages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "flag_url" CHAR(2) NOT NULL;
