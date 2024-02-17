"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import React from "react";

const SessionWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
