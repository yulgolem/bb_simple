export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(79,70,229,0.18),transparent_60%),radial-gradient(40%_60%_at_80%_10%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(50%_50%_at_20%_0%,rgba(244,63,94,0.12),transparent_60%)] animate-slow-float" />
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -inset-[20%] blur-3xl opacity-30 bg-gradient-to-tr from-indigo-500/20 via-emerald-400/10 to-rose-400/10 animate-gradient" />
    </div>
  );
}


