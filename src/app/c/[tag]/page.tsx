import { notFound } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Rocket, ThumbsUp, ThumbsDown } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ContextPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag).toLowerCase();
  if (!tag) notFound();

  // Upsert context by tag
  const context = await prisma.context.upsert({
    where: { tag },
    update: { lastActivityAt: new Date() },
    create: { tag },
  });

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <section>
        <h1 className="text-xl font-semibold mb-2">
          Контекст: {context.tag}
        </h1>
        <p className="text-neutral-400 mb-6">Добавляй корпоративные клише. Голосуй за лучшие. Топ-50 попадут в карточки.</p>
        <PhraseComposer contextId={context.id} />
        <PhrasesList contextId={context.id} />
      </section>
      <section>
        <h2 className="text-lg font-medium mb-2">Карточка</h2>
        <p className="text-neutral-400 mb-4">Сгенерируй персональную карточку 5x5 и играй.</p>
        <Link href={`/c/${encodeURIComponent(tag)}/board`} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md shadow-lg shadow-indigo-950/40">
          <Rocket size={18} /> Сгенерировать карточку
        </Link>
      </section>
    </div>
  );
}

async function PhraseComposer({ contextId }: { contextId: string }) {
  return (
    <form action={`/api/contexts/${contextId}/phrases`} method="POST" className="flex gap-2 mb-4">
      <input
        name="text"
        placeholder="Добавить фразу (до 100 символов)"
        maxLength={100}
        className="flex-1 bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/50"
        required
      />
      <button className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md">
        <PlusCircle size={18} /> Добавить
      </button>
    </form>
  );
}

async function PhrasesList({ contextId }: { contextId: string }) {
  const phrases = await prisma.phrase.findMany({
    where: { contextId },
    include: { votes: true },
  });
  const withScore = phrases.map((p) => ({
    ...p,
    score: p.votes.reduce((s, v) => s + v.value, 0),
  }));
  withScore.sort((a, b) => b.score - a.score);

  if (withScore.length === 0) {
    return <p className="text-neutral-500">Фраз пока нет. Будь первым.</p>;
  }

  return (
    <ul className="divide-y divide-neutral-800/80 border border-neutral-800/80 rounded-md overflow-hidden">
      {withScore.map((p) => (
        <li key={p.id} className="p-3 flex items-center justify-between gap-3">
          <span className="text-sm text-neutral-200">{p.text}</span>
          <div className="flex items-center gap-2">
            <VoteButton phraseId={p.id} delta={1} />
            <span className="text-neutral-400 text-sm w-7 text-center">{p.score}</span>
            <VoteButton phraseId={p.id} delta={-1} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function VoteButton({ phraseId, delta }: { phraseId: string; delta: 1 | -1 }) {
  return (
    <form action={`/api/phrases/${phraseId}/vote`} method="POST">
      <input type="hidden" name="delta" value={delta} />
      <button className={`px-2 py-1 rounded-md border border-neutral-700 text-sm hover:bg-neutral-800 inline-flex items-center gap-1 ${delta===1?"text-emerald-400":"text-rose-400"}`}>
        {delta === 1 ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />}
      </button>
    </form>
  );
}


