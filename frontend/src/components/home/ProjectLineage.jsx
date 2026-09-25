import { ArrowUpRight } from "lucide-react";

export default function ProjectLineage({ project, index }) {
  return (
    <article className="project-index-card" data-testid={`project-lineage-${project.slug}`}>
      <p className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")} <span className="text-mute/60">/</span> {project.category}</p>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink md:text-2xl">{project.name}</h3>
      <p className="mt-3 min-h-12 text-sm leading-relaxed text-mute">{project.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 font-mono text-[10px] text-mute/80">
        {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      <a href={project.github} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent transition-colors hover:text-ink">
        OPEN REPOSITORY <ArrowUpRight size={13} />
      </a>
    </article>
  );
}
