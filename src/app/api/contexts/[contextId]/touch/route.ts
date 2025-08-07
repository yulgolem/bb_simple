import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: { contextId: string } }) {
  await prisma.context.update({ where: { id: params.contextId }, data: { lastActivityAt: new Date() } });
  return NextResponse.json({ ok: true });
}


