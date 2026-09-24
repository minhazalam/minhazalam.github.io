import Reveal from "../Reveal";

const STATS = [
  { v: "6 Years", l: "DATA & SOFTWARE ENGINEERING" },
  { v: "AWS", l: "CLOUD PLATFORMS" },
  { v: "Spark", l: "DISTRIBUTED PROCESSING" },
  { v: "Databricks", l: "DATA PLATFORMS" },
  { v: "Python + SQL", l: "CORE ENGINEERING" },
];

export default function Credibility() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-5" data-testid="credibility-stats">
          {STATS.map((s, i) => (
            <div key={s.l} className={`bg-panel px-5 py-7 ${i === STATS.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
              <p className="font-display text-xl font-semibold text-ink md:text-2xl">{s.v}</p>
              <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-mute">{s.l}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
