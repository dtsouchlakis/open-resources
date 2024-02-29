// app/api/route.js

import { NextRequest, NextResponse } from "next/server";
import type { User } from "@prisma/client";
import { log } from "console";
import prisma from "@/app/lib/prisma";
import { NextApiRequest } from "next";

// To handle a PUT request to /api

export async function GET(req: NextApiRequest, res: NextResponse) {
  const { id } = req.query;

  const response = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return NextResponse.json(res, {
    status: 200,
  });
}
export async function PUT(req: NextRequest, { params }: { params: any }) {
  const body: User = await req.json();

  const response = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(response, {
    status: 200,
  });
}
