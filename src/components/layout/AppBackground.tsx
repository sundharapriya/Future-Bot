/**
 * Global decorative background: gradient wash, blurred floating blobs,
 * faint neural-network lines and a light dotted grid texture.
 * Purely presentational and pointer-events-none.
 */
export function AppBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden app-backdrop">
      {/* dotted grid texture */}
      <div className="absolute inset-0 bg-dot-grid text-primary/15 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />

      {/* neural-network / circuit lines */}
      <svg
        className="absolute inset-0 h-full w-full text-primary/40 opacity-[0.08]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1.2">
          <path d="M0 180 L220 180 L320 90 L560 90 L660 210 L900 210 L1010 120 L1200 120" />
          <path d="M0 460 L180 460 L300 560 L520 560 L640 430 L880 430 L1000 540 L1200 540" />
          <path d="M160 0 L160 200 L260 300 L260 620 L380 720 L380 800" />
          <path d="M860 0 L860 160 L960 260 L960 640 L1080 740 L1080 800" />
        </g>
        <g fill="currentColor">
          {[
            [220, 180],
            [320, 90],
            [660, 210],
            [1010, 120],
            [300, 560],
            [640, 430],
            [1000, 540],
            [260, 300],
            [960, 260],
            [380, 720],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
          ))}
        </g>
      </svg>

      {/* blurred gradient blobs */}
      <div className="float-slow absolute -left-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-3xl" />
      <div className="float-slower absolute -right-28 top-10 h-[22rem] w-[22rem] rounded-full bg-accent/20 blur-3xl" />
      <div className="float-slower absolute -left-24 bottom-0 h-[20rem] w-[20rem] rounded-full bg-accent/15 blur-3xl" />
      <div className="float-slow absolute -right-40 bottom-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[var(--primary-glow)]/20 blur-3xl" />

      {/* soft abstract geometry */}
      <div className="absolute left-[12%] top-[28%] h-40 w-40 rotate-12 rounded-3xl border border-primary/15" />
      <div className="absolute right-[14%] bottom-[22%] h-52 w-52 -rotate-6 rounded-full border border-accent/20" />
    </div>
  );
}
