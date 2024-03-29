import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signUp") {
        try {
          const url = `https://ui-avatars.com/api/?name=${user.name}&background=random`;
          const res = await fetch(`http://localhost:3000/api/user/${user.id}`, {
            method: "PUT",
            body: JSON.stringify({ image: url }),
          });
        } catch (e) {
          console.log("error", e);
        }
      }
      if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log(token, user, "session");
      //I also tried it this way, according to the docs at:
      //  https://next-auth.js.org/configuration/callbacks
      session.user!.id = token.id;

      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },

  adapter: PrismaAdapter(prisma),
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
