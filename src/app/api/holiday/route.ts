// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import PrismaAdapter from "../../utils/prismaAdapter";
import type { Holiday } from "@prisma/client";

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

  return NextResponse.json(data);
}

// To handle a POST request to /api
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: Holiday = await req.json();
  const _res = await prisma.holiday.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(_res, { status: 201 });
}

// Same logic to add a `PATCH`, `DELETE`...
