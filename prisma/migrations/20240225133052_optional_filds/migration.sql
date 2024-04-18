-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_subordinateId_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "subordinateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_subordinateId_fkey" FOREIGN KEY ("subordinateId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
