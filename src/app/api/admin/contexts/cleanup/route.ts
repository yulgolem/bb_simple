import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const daysStr = String(form.get("days") ?? "30");
  const days = Math.max(0, Math.min(365, Number(daysStr) || 30));
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const deleted = await prisma.context.deleteMany({ where: { lastActivityAt: { lt: cutoff } } });
  return NextResponse.json({ deleted: deleted.count, olderThanDays: days });
}


