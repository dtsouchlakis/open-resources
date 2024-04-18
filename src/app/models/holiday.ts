import { User } from "./user";

export interface Holiday {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  requestedByUser?: User;

  requestedByUserId?: string;

  dateFrom?: Date;

  dateTo?: Date;

  days?: number;

  requestedAt?: Date;

  approvedAt?: Date;

  approvedByUser?: User;

  approvedByUserId?: string;

  description?: string;
}
