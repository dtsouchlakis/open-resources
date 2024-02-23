/*
  Warnings:

  - You are about to drop the column `name` on the `Holiday` table. All the data in the column will be lost.
  - Added the required column `days` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Holiday" DROP CONSTRAINT "Holiday_approvedByUserId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "holidayAllowance" INTEGER;

-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "name",
ADD COLUMN     "days" INTEGER NOT NULL,
ALTER COLUMN "approvedAt" DROP NOT NULL,
ALTER COLUMN "approvedByUserId" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Holiday" ADD CONSTRAINT "Holiday_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
