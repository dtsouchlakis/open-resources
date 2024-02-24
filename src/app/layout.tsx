import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import SessionWrapper from "./components/SessionWrapper";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useContext, useEffect } from "react";
import { ThemeContext, ThemeProvider } from "./lib/ThemeProvider";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });
inter.className = "h-full";
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
      <ThemeProvider>
        <html lang="en" className="h-full overflow-hidden">
          <body className={inter.className}>
            <NavBar />
            {children}
            {<Footer />}
          </body>
        </html>
      </ThemeProvider>
    </SessionWrapper>
  );
}
