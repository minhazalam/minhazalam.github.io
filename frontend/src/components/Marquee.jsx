export default function Marquee({ items }) {
  return (
    <div
      className="marquee relative overflow-hidden border-y border-border bg-panel/40 py-5"
      data-testid="tech-marquee"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-6 font-mono text-sm tracking-[0.2em] text-mute">{item.toUpperCase()}</span>
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
