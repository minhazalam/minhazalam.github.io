export default function TechChips({ items, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <span
          key={t}
          className="rounded border border-border bg-panel px-2 py-0.5 font-mono text-[10px] text-mute"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
