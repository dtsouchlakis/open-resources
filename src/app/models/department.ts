import { User } from "./user";
import { Employee } from "./employee";
import { Company } from "./company";

export interface Department {
  id?: string;

  name?: string;

  createdAt?: Date;

  updatedAt?: Date;

  users?: User[];

  employees?: Employee[];

  Company?: Company;

  companyid?: string;
}
