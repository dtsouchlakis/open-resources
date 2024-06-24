// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import PrismaAdapter from "../../utils/prismaAdapter";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";

const adapter = new PrismaAdapter();
// To handle a GET request to /api
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const { where, orderBy, include, skip, take, cursor } =
    await adapter.parseQuery<Prisma.HolidayFindManyArgs>(searchParams);

  const data = await prisma.holiday.findMany({
    where,
    orderBy,
    include,
    skip,
    take,
    cursor,
  });

  return NextResponse.json(data, { status: 200 });
}

// To handle a POST request to /api
export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  const body = await req.json();
  const userId = req.credentials;
  const { startDt, endDt, switchValueEnd, switchValueStart, title } = body;

  let days =
    (new Date(endDt).getTime() - new Date(startDt).getTime()) /
    (1000 * 60 * 60 * 24);

  if (switchValueStart || switchValueEnd) {
    days -= 0.5;
  } else {
    days -= 1;
  }
  const _res = await prisma.holiday.create({
    data: {
      dateFrom: startDt,
      dateTo: endDt,
      days,
      requestedByUser: { connect: { id: session?.user?.id } },
      requestedAt: new Date(),
      description: title ? title : `${session?.user?.name} - PTO`,
    },
  });

  return NextResponse.json(_res, { status: 200 });
}
