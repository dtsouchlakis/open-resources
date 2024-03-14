export interface VerificationToken {
  id: string;

  identifier: string;

  token: string;

  expires: Date;

  createdAt: Date;

  updatedAt: Date;
}
