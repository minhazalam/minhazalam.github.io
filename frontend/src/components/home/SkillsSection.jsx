import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const LEVEL_STYLES = {
  production: { label: "PRODUCTION", cls: "text-accent border-accent/30 bg-accent/5" },
  working: { label: "WORKING", cls: "text-mute border-border" },
  exploring: { label: "EXPLORING", cls: "text-amber-400/90 border-amber-400/25 border-dashed" },
};

export default function SkillsSection({ skills }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8" data-testid="skills-section">
      <Reveal>
        <SectionHeading
          index="03"
          label="Engineering Skills"
          title="Skills, honestly categorized"
          sub="No percentage scores. Skills are grouped by how they're actually used: production systems, working knowledge, and active exploration."
        />
      </Reveal>
      <Reveal delay={0.05}>
        <div className="mb-8 flex flex-wrap gap-3" data-testid="skills-legend">
          {Object.entries(skills.levels || {}).map(([key, label]) => (
            <span key={key} className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em] ${LEVEL_STYLES[key]?.cls}`}>
              {LEVEL_STYLES[key]?.label} — {label.toUpperCase()}
            </span>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.categories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-xl border border-border bg-panel p-6" data-testid={`skill-category-${cat.id}`}>
              <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-accent">{cat.title.toUpperCase()}</p>
              {cat.items.map((item) => {
                const st = LEVEL_STYLES[item.level];
                return (
                  <div key={item.name} className="flex items-center justify-between border-b border-border/40 py-2.5 last:border-0">
                    <span className="text-sm text-ink">{item.name}</span>
                    <span className={`rounded border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
