import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const _res = await prisma.department.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json(_res, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const _res = await prisma.department.update({
    where: {
      id: body.id,
    },
    data: body,
  });
  return NextResponse.json(_res, { status: 200 });
}
