// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import PrismaAdapter from "../../utils/prismaAdapter";
import type { User } from "@prisma/client";
import { log } from "console";

const adapter = new PrismaAdapter();
// To handle a GET request to /api
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const { where, orderBy, select, include, skip, take, cursor } =
    await adapter.parseQuery(searchParams);
  log(
    "where",
    where,
    orderBy,
    select,
    include,
    skip,
    take,
    cursor,
    searchParams
  );
  const data = await prisma.user.findMany({
    where,
    orderBy,
    include,
    skip,
    take,
    cursor,
  });
  console.log(data);
  return NextResponse.json(data);
}

// To handle a POST request to /api
export async function POST(req: NextRequest) {
  const body: User = await req.json();
  const res = await prisma.user.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(res);
}

// Same logic to add a `PATCH`, `DELETE`...
