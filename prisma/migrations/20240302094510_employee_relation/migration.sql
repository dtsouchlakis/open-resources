-- DropIndex
DROP INDEX "Employee_userId_email_firstName_lastName_departmentId_manag_idx";

-- CreateIndex
CREATE INDEX "Employee_email_firstName_lastName_departmentId_managerId_su_idx" ON "Employee"("email", "firstName", "lastName", "departmentId", "managerId", "subordinateId");
