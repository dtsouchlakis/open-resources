import { User } from "./user";
import { Company } from "./company";
import { Training } from "./training";

export interface File {
  id?: string;

  name?: string;

  createdAt?: Date;

  updatedAt?: Date;

  user?: User;

  userId?: string;

  url?: string;

  size?: number;

  type?: string;

  Company?: Company;

  companyid?: string;

  Training?: Training;

  trainingid?: string;
}
