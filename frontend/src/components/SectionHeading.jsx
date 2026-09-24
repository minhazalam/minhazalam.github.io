export default function SectionHeading({ index, label, title, sub }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-mono text-xs tracking-[0.25em] text-accent mb-4" data-testid={`section-eyebrow-${index}`}>
        /// {index} — {label.toUpperCase()}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">{title}</h2>
      {sub ? <p className="mt-3 text-mute max-w-2xl">{sub}</p> : null}
    </div>
  );
}
