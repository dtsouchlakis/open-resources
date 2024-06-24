// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import PrismaAdapter from "../../utils/prismaAdapter";
import { Prisma } from "@prisma/client";

const adapter = new PrismaAdapter();
// To handle a GET request to /api
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const { where, orderBy, include, skip, take, cursor } =
    await adapter.parseQuery<Prisma.UserFindManyArgs>(searchParams);

  const data = await prisma.user.findMany({
    where,
    include,
    skip,
    take,
  });

  return NextResponse.json(data, { status: 200 });
}

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const response = await prisma.user.create({
    data: body,
  });

  return NextResponse.json(response, { status: 200 });
}
