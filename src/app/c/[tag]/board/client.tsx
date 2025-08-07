"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { detectWinningLine, hasBingo, type Board as MarkedBoard } from "@/lib/bingo";

export function InteractiveBoard({ cells }: { cells: { text: string; free: boolean }[] }) {
  const [marked, setMarked] = useState<boolean[]>(() => cells.map((c, i) => (c.free ? true : false)));
  const [won, setWon] = useState(false);
  const [winning, setWinning] = useState<number[] | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("bb_marked");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === cells.length) setMarked(parsed);
      } catch {}
    }
  }, [cells.length]);

  useEffect(() => {
    localStorage.setItem("bb_marked", JSON.stringify(marked));
    // bingo detection
    const grid: MarkedBoard = Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => marked[r * 5 + c]));
    const line = detectWinningLine(grid);
    setWon(!!line);
    setWinning(line);
    if (line) {
      confetti({ particleCount: 160, spread: 75, origin: { y: 0.6 }, scalar: 0.9 });
      if (navigator.vibrate) navigator.vibrate(120);
      // sound
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = 880;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        o.start();
        o.stop(ctx.currentTime + 0.5);
      } catch {}
    }
  }, [marked]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {cells.map((c, idx) => (
        <motion.button
          key={idx}
          onClick={() => setMarked((m) => m.map((v, i) => (i === idx ? !v : v)))}
          whileTap={{ scale: 0.98 }}
          animate={{ scale: marked[idx] ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-md border px-3 py-4 text-left text-sm transition min-h-20 relative ${marked[idx] ? "bg-emerald-600/20 border-emerald-500/50" : "bg-neutral-900/80 backdrop-blur border-neutral-800 hover:bg-neutral-800"}`}
        >
          <div className={`font-medium ${c.free ? "text-emerald-400" : "text-neutral-200"}`}>{c.text}</div>
          {winning?.includes(idx) && (
            <span className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-emerald-400/70 animate-pulse"></span>
          )}
        </motion.button>
      ))}
      {won && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="col-span-5 text-center text-emerald-400 font-medium mt-2">
          Линия! Можно продолжать игру
        </motion.div>
      )}
    </div>
  );
}


