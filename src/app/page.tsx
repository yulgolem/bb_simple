"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [tag, setTag] = useState("");
  return (
    <div className="mx-auto max-w-2xl">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-semibold mb-3 tracking-tight">
        Bullshit Bingo
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="text-neutral-400 mb-6">
        Введи тег контекста встречи. Если он не существует — мы создадим его.
      </motion.p>

      <form action="/join" method="GET" className="flex gap-2">
        <input
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="например: quarterly-all-hands"
          className="flex-1 bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
          maxLength={64}
          required
        />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-md shadow-lg shadow-indigo-950/40">
          <Sparkles size={18} /> Войти
        </motion.button>
      </form>

      <div className="mt-10 border-t border-neutral-800/60 pt-6">
        <h2 className="text-lg font-medium mb-2">Как это работает</h2>
        <ul className="list-disc list-inside text-neutral-400 space-y-1 text-sm">
          <li>Создай или введи тег контекста.</li>
          <li>Добавляй фразы и голосуй за лучшие.</li>
          <li>Сгенерируй карточку 5x5 и отмечай услышанное.</li>
        </ul>
      </div>
    </div>
  );
}
