import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InteractiveBoard } from "./client";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function BoardPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag).toLowerCase();
  const context = await prisma.context.findUnique({ where: { tag }, include: { phrases: { include: { votes: true } } } });
  if (!context) notFound();

  // choose top-50 by score
  const phrasesWithScore = context.phrases.map((p) => ({ id: p.id, text: p.text, score: p.votes.reduce((s, v) => s + v.value, 0) }));
  phrasesWithScore.sort((a, b) => b.score - a.score);
  const pool = phrasesWithScore.slice(0, 50).map((p) => p.text);
  if (pool.length < 25) {
    // use all available
  }
  const selected = shuffle(pool).slice(0, Math.min(24, pool.length));
  const cells: string[] = [];
  for (let i = 0; i < 25; i += 1) {
    if (i === 12) {
      cells.push("FREE SPACE");
    } else {
      cells.push(selected.shift() || "—");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Карточка бинго</h1>
      <InteractiveBoard cells={cells.map((t, i) => ({ text: t, free: i === 12 }))} />
      <p className="text-neutral-400 text-sm mt-4">Ячейки кликабельны, отметки сохраняются локально.</p>
    </div>
  );
}
 

