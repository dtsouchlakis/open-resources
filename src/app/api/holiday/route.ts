// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import PrismaAdapter from "../../utils/prismaAdapter";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

const adapter = new PrismaAdapter();
// To handle a GET request to /api
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const { where, orderBy, select, include, skip, take, cursor } =
    await adapter.parseQuery(searchParams);

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
  const { start, end, wholeDay } = body;
  const days = wholeDay
    ? 1
    : (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const _res = await prisma.holiday.create({
    data: {
      dateFrom: start,
      dateTo: end,
      days,
      requestedByUser: { connect: { id: session?.user?.id } },
      requestedAt: new Date(),
    },
  });

  return NextResponse.json(_res, { status: 201 });
}

export async function Delete(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const _res = await prisma.holiday.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json(_res, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const _res = await prisma.holiday.update({
    where: {
      id: body.id,
    },
    data: body,
  });
  return NextResponse.json(_res, { status: 201 });
}
