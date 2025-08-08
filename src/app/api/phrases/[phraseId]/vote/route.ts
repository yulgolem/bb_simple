import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request, { params }: { params: Promise<{ phraseId: string }> }) {
  try {
    const form = await req.formData();
    const delta = Number(form.get("delta"));
    const value = delta === 1 ? 1 : -1;
    const jar = await cookies();
    const { phraseId } = await params;
    let userId = jar.get("bb_uid")?.value;
    if (!userId) {
      userId = `u_${Math.random().toString(36).slice(2)}`;
      jar.set("bb_uid", userId, { httpOnly: false, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    }

    // upsert vote
    await prisma.vote.upsert({
      where: { phraseId_userId: { phraseId, userId } },
      update: { value },
      create: { phraseId, userId, value },
    });

    // redirect back
    const phrase = await prisma.phrase.findUnique({ where: { id: phraseId }, include: { context: true } });
    const tag = phrase?.context.tag ?? "";
    return NextResponse.redirect(new URL(`/c/${tag}`, req.url));
  } catch (e) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}


