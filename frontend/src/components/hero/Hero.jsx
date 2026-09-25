import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

const STAGES = [
  { name: "Sources", note: "Databases · APIs · files", icon: "01" },
  { name: "Ingest", note: "Batch · streaming · CDC", icon: "02" },
  { name: "Transform", note: "Spark · SQL · dbt", icon: "03" },
  { name: "Serve", note: "Lakehouse · warehouse · BI", icon: "04" },
];

export default function Hero() {
  const { content } = useContent();
  const profile = content.profile;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="max-w-3xl">
        <p className="font-mono text-xs tracking-[0.18em] text-accent">DATA ENGINEERING · DATA PLATFORMS</p>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Data in. Trusted insights out.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
          {profile.subline}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {profile.techLine.map((skill) => (
            <span key={skill} className="rounded-full border border-border bg-panel px-3 py-1.5 font-mono text-[11px] text-mute">{skill}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90">
            Explore projects <ArrowDown size={15} />
          </Link>
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm text-ink hover:border-accent">
            GitHub <ArrowUpRight size={15} />
          </a>
          <Link to="/recruiter" className="px-2 py-3 text-sm text-mute hover:text-accent">Recruiter view</Link>
        </div>
      </div>

      <div className="mt-14 rounded-xl border border-border bg-panel p-5 shadow-sm md:mt-20 md:p-8" data-testid="pipeline-flow">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
          <h2 className="font-display text-sm font-semibold text-ink md:text-base">A data pipeline, end to end</h2>
          <p className="font-mono text-[10px] tracking-wide text-mute">CAPTURE → PROCESS → DELIVER</p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_28px_1fr_28px_1fr_28px_1fr] md:items-center">
          {STAGES.map((stage, index) => (
            <div key={stage.name} className="contents">
              <div className="relative rounded-lg border border-border bg-background p-4 md:min-h-32 md:p-5" data-testid={`pipeline-stage-${stage.icon}`}>
                <div className="flex items-center gap-3 md:block">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/5 font-mono text-[10px] text-accent md:mb-5">
                    {stage.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink">{stage.name}</h3>
                    <p className="mt-1 text-xs text-mute">{stage.note}</p>
                  </div>
                </div>
                {index < STAGES.length - 1 && (
                  <span className="absolute -bottom-[17px] left-1/2 z-10 -translate-x-1/2 rounded-full bg-panel p-1 text-accent md:-bottom-auto md:-right-[17px] md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2">
                    <ArrowRight size={15} className="hidden md:block" />
                    <ArrowDown size={15} className="md:hidden" />
                  </span>
                )}
              </div>
              {index < STAGES.length - 1 && <div className="hidden md:block" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-mute">
          Reliable systems connect every stage with quality checks, observability, and recoverable processing.
        </p>
      </div>
    </section>
  );
}
