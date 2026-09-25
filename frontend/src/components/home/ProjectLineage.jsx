import { ArrowUpRight } from "lucide-react";

export default function ProjectLineage({ project, index }) {
  return (
    <article className="project-lineage group" data-testid={`project-lineage-${project.slug}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-accent">OUTPUT {String(index + 1).padStart(2, "0")} · {project.category}</p>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink md:text-2xl">{project.name}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">{project.tagline}</p>
        </div>
        <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-wider text-mute transition-colors hover:text-accent focus-visible:text-accent">
          SOURCE <ArrowUpRight size={13} />
        </a>
      </div>

      <ol className="project-flow mt-7" aria-label={`${project.name} architecture`}>
        {project.architecture.map((stage, i) => (
          <li className="project-flow-step" key={`${project.slug}-${stage}`}>
            <span className="project-flow-node" aria-hidden="true" />
            <span className="project-flow-label">{stage}</span>
            {i < project.architecture.length - 1 && <span className="project-flow-connector" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 font-mono text-[10px] text-mute/80">
        {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
    </article>
  );
}
