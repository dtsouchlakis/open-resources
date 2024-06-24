import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json();
  const _res = await prisma.holiday.delete({
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
  const { startDt, endDt, switchValueEnd, switchValueStart, title } = body;

  let days =
    (new Date(endDt).getTime() - new Date(startDt).getTime()) /
    (1000 * 60 * 60 * 24);

  if (switchValueStart || switchValueEnd) {
    days -= 0.5;
  } else {
    days -= 1;
  }
  const _res = await prisma.holiday.update({
    where: {
      id: body.id,
    },
    data: {
      dateFrom: startDt,
      dateTo: endDt,
      days,
      requestedAt: new Date(),
    },
  });

  return NextResponse.json(_res, { status: 200 });
}
