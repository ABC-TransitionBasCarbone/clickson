/*
  Warnings:

  - You are about to drop the column `id_group` on the `session_students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "session_students" DROP CONSTRAINT "session_students_id_group_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "id_session_student" UUID;

-- AlterTable
ALTER TABLE "session_students" DROP COLUMN "id_group";

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_id_session_student_fkey" FOREIGN KEY ("id_session_student") REFERENCES "session_students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
