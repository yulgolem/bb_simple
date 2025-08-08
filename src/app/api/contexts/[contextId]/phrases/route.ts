import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const BodySchema = z.object({ text: z.string().trim().min(1).max(100) });

export async function POST(
  req: Request,
  { params }: { params: Promise<{ contextId: string }> }
) {
  try {
    const formData = await req.formData();
    const text = String(formData.get("text") || "");
    const { text: validText } = BodySchema.parse({ text });
    const { contextId } = await params;

    const phrase = await prisma.phrase.create({
      data: { contextId, text: validText },
    });

    return NextResponse.redirect(new URL(`/c/${await getTag(contextId)}`, req.url));
  } catch (e) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

async function getTag(contextId: string): Promise<string> {
  const ctx = await prisma.context.findUnique({ where: { id: contextId } });
  return ctx?.tag ?? "";
}


