import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const jar = await cookies();
  let uid = jar.get("bb_uid")?.value;
  if (!uid) {
    uid = `u_${Math.random().toString(36).slice(2)}`;
    jar.set("bb_uid", uid, { httpOnly: false, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
  }
  return NextResponse.json({ uid });
}


