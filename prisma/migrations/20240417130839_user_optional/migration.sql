/*
  Warnings:

  - You are about to drop the column `departmentName` on the `Department` table. All the data in the column will be lost.
  - Added the required column `name` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Department_departmentName_idx";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "departmentName",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Department_name_idx" ON "Department"("name");
