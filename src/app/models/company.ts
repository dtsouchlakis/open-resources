import { Employee } from "./employee";
import { File } from "./file";
import { Department } from "./department";

export interface Company {
  id?: string;

  name?: string;

  createdAt?: Date;

  updatedAt?: Date;

  employees?: Employee[];

  files?: File[];

  departments?: Department[];

  sectors?: string[];

  locations?: string[];

  telephone?: string;

  email?: string;

  website?: string;

  address?: string;

  description?: string;

  representative?: string;
}
