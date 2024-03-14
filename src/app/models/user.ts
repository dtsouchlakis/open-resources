import { Account } from "./account";
import { Session } from "./session";
import { File } from "./file";
import { Employee } from "./employee";
import { Department } from "./department";
import { Holiday } from "./holiday";
import { Training } from "./training";

export interface User {
  id?: string;

  name?: string;

  email?: string;

  emailVerified?: Date;

  image?: string;

  createdAt?: Date;

  updatedAt?: Date;

  passwordHash?: string;

  accounts?: Account[];

  sessions?: Session[];

  files?: File[];

  employee?: Employee;

  Department?: Department;

  departmentid?: string;

  HolidaysRequested?: Holiday[];

  HolidaysApproved?: Holiday[];

  Training?: Training[];
}
