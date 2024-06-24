import prisma from "@/app/lib/prisma";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  console.log(req.url);

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const body = await req.json();

  console.log(body);

  const _res = await prisma.user.update({
    where: {
      id: id,
    },
    data: body,
  });
  return NextResponse.json(_res, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const _res = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(_res, { status: 200 });
}
