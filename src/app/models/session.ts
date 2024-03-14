import { User } from "./user";

export interface Session {
  id?: string;

  userId?: string;

  expires?: Date;

  sessionToken?: string;

  createdAt?: Date;

  updatedAt?: Date;

  user?: User;
}
