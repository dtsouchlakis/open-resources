import { User } from "./user";
import { Department } from "./department";
import { Company } from "./company";

export interface Employee {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  user?: User;

  email?: string;

  firstName?: string;

  lastName?: string;

  dateOfBirth?: Date;

  gender?: string;

  title?: string;

  hiredAt?: Date;

  lastDayWorkedAt?: Date;

  mobile?: string;

  phone?: string;

  address?: string;

  positionTitle?: string;

  department?: Department;

  departmentId?: string;

  manager?: Employee;

  managerId?: string;

  image?: string;

  bio?: string;

  holidayAllowance?: number;

  subordinate?: Employee;

  subordinateId?: string;

  Company?: Company;

  companyid?: string;

  userId?: string;
}
