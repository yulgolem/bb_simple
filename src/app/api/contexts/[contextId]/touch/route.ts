import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ contextId: string }> }) {
  const { contextId } = await params;
  await prisma.context.update({ where: { id: contextId }, data: { lastActivityAt: new Date() } });
  return NextResponse.json({ ok: true });
}


