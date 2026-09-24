import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const flow = (project.dataFlow || []).slice(0, 4);
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-testid={`project-card-${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-panel p-6 transition-all duration-300 hover:border-accent/50 hover:bg-panel2"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs text-mute/70">{String(index + 1).padStart(2, "0")}</span>
        {project.status ? (
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-accent" data-testid={`project-status-${project.slug}`}>
            {project.status.toUpperCase()}
          </span>
        ) : (
          <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-mute/70">
            CASE STUDY
          </span>
        )}
      </div>
      <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent">
        {project.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mute">{project.tagline}</p>
      <div className="mt-5 flex-1" data-testid={`project-flow-${project.slug}`}>
        {flow.map((step, i) => (
          <div key={i}>
            <div className="rounded border border-border bg-[#0b0e14] px-2.5 py-1.5 font-mono text-[10px] leading-snug text-[#9fb7d4]">
              {step}
            </div>
            {i < flow.length - 1 && <div className="ml-5 h-2.5 w-px bg-accent/30" />}
          </div>
        ))}
      </div>
      <div className="mt-5 font-mono text-[11px] text-mute">{project.tech.join(" · ")}</div>
      <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-wider text-accent">
        EXPLORE PROJECT
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
