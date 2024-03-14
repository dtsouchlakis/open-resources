import { User } from "./user";
import { File } from "./file";

export interface Training {
  id?: string;

  name?: string;

  createdAt?: Date;

  updatedAt?: Date;

  user?: User;

  userId?: string;

  dateFrom?: Date;

  dateTo?: Date;

  description?: string;

  files?: File[];
}
