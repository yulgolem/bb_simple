import { redirect } from "next/navigation";

export default function JoinPage({ searchParams }: { searchParams: { tag?: string } }) {
  const tag = (searchParams?.tag || "").trim().toLowerCase();
  if (!tag) {
    redirect("/");
  }
  redirect(`/c/${encodeURIComponent(tag)}`);
}


