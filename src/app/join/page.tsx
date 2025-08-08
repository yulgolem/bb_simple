import { redirect } from "next/navigation";

export default async function JoinPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag: rawTag } = await searchParams;
  const tag = (rawTag || "").trim().toLowerCase();
  if (!tag) {
    redirect("/");
  }
  redirect(`/c/${encodeURIComponent(tag)}`);
}


