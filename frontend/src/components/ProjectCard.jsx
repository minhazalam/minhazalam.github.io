import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      data-testid={`project-card-${project.slug}`}
      className="group flex min-h-56 flex-col rounded-xl border border-border bg-panel p-6 transition-colors hover:border-accent/50"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs text-mute/70">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-mono text-[10px] tracking-wider text-accent">{project.category}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <ArrowUpRight size={16} className="mt-1 shrink-0 text-mute" />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{project.tagline}</p>
      <div className="mt-5 font-mono text-[11px] text-mute">{project.tech.join(" · ")}</div>
      <div className="mt-4 font-mono text-[10px] tracking-wider text-accent">VIEW REPOSITORY</div>
    </a>
  );
}
