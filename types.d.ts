import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }

  interface User {
    id: string;
    createdAt?: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
