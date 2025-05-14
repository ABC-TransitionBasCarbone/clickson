/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_created_by` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `admin_username` on the `schools` table. All the data in the column will be lost.
  - Changed the type of `id` on the `comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "id_created_by",
ADD COLUMN     "email_created_by" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "schools" DROP COLUMN "admin_username";
