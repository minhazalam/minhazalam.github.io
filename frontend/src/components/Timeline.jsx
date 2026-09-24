import Reveal from "./Reveal";
import TechChips from "./TechChips";

export default function Timeline({ roles }) {
  return (
    <div className="relative ml-2 border-l border-border md:ml-4" data-testid="timeline">
      {roles.map((role, i) => (
        <Reveal key={role.company} delay={i * 0.08} className="relative pb-12 pl-8 last:pb-0">
          <span
            className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 ${
              role.current ? "border-accent bg-accent/30" : "border-mute/50 bg-background"
            }`}
          />
          {role.current && (
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent/40 dot-pulse" />
          )}
          <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
            {role.period.toUpperCase()}
            {role.current ? <span className="ml-3 text-accent">● CURRENT</span> : null}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">{role.title}</h3>
          <p className="mt-0.5 text-sm text-accent">{role.company} · {role.location}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute">{role.overview}</p>
          <TechChips items={role.technologies} className="mt-4" />
          <ul className="mt-4 space-y-2">
            {role.impact.map((imp, j) => (
              <li key={j} className="flex gap-3 text-sm text-[#b9c3d4]">
                <span className="font-mono text-accent">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
