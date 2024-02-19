import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import SessionWrapper from "./components/SessionWrapper";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  console.log("session", session);

  return (
    <SessionWrapper session={session}>
      <html lang="en">
        <body className={inter.className}>
          {<NavBar />}
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
