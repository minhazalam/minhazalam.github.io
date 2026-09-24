export default function StatusPill({ children, tone = "accent", testId }) {
  const dot =
    tone === "accent" ? "bg-accent" : tone === "amber" ? "bg-amber-400" : "bg-emerald-400";
  return (
    <span
      data-testid={testId}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-panel/80 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-mute"
    >
      <span className={`dot-pulse h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
