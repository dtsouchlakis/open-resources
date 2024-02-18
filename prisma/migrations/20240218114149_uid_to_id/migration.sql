/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `Company` table. All the data in the column will be lost.
  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyUid` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `Department` table. All the data in the column will be lost.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyUid` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyUid` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `trainingUid` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `File` table. All the data in the column will be lost.
  - The primary key for the `Holiday` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `Holiday` table. All the data in the column will be lost.
  - The primary key for the `Training` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `departmentUid` on the `User` table. All the data in the column will be lost.
  - Added the required column `id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_subordinateId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_trainingUid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentUid_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "uid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
DROP COLUMN "companyUid",
DROP COLUMN "uid",
ADD COLUMN     "companyid" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "companyUid",
DROP COLUMN "uid",
ADD COLUMN     "companyid" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "companyUid",
DROP COLUMN "trainingUid",
DROP COLUMN "uid",
ADD COLUMN     "companyid" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "trainingid" TEXT,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Holiday" DROP CONSTRAINT "Holiday_pkey",
DROP COLUMN "uid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Training" DROP CONSTRAINT "Training_pkey",
DROP COLUMN "uid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Training_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "departmentUid",
ADD COLUMN     "departmentid" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentid_fkey" FOREIGN KEY ("departmentid") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_trainingid_fkey" FOREIGN KEY ("trainingid") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_subordinateId_fkey" FOREIGN KEY ("subordinateId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
