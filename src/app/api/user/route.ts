// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import PrismaAdapter from "../../utils/prismaAdapter";

const adapter = new PrismaAdapter();
// To handle a GET request to /api
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const { where, orderBy, include, skip, take, cursor } =
    await adapter.parseQuery(searchParams);

  const data = await prisma.user.findMany({
    where,
    include,
    skip,
    take,
  });

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const _res = await prisma.user.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json(_res, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const body = await req.json();
  const { where, orderBy, include, skip, take, cursor } =
    await adapter.parseQuery(searchParams);
  const response = await prisma.user.update({
    where: where,
    data: body,
  });

  return NextResponse.json(response, {
    status: 200,
  });
}
