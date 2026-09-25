import { ArrowLeft, ArrowUpRight, FolderGit2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import { usePageMeta } from "@/lib/seo";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { content } = useContent();
  const project = content.projects.projects.find((item) => item.slug === slug && item.details);

  usePageMeta({
    title: project ? `${project.name} — Minhaz Alam` : "Project — Minhaz Alam",
    description: project?.details.summary || "Selected data engineering project by Minhaz Alam.",
    path: `/projects/${slug}`,
  });

  if (!project) return <NotFound />;

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <Link to="/#work" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-mute hover:text-accent">
        <ArrowLeft size={13} /> SELECTED WORK
      </Link>
      <header className="mb-10 mt-8 border-b border-border pb-8">
        <p className="font-mono text-[10px] tracking-[0.18em] text-accent">{project.category}</p>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-mute">{project.details.summary}</p>
      </header>

      <section aria-labelledby="project-focus-title" className="border-b border-border py-8">
        <h2 id="project-focus-title" className="font-mono text-[10px] tracking-[0.16em] text-mute">STATED SCOPE</h2>
        <p className="mt-2 text-xs text-mute/80">Areas listed in the repository description.</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.details.focusAreas.map((area) => <li className="tech-node" key={area}>{area}</li>)}
        </ul>
      </section>

      <section aria-labelledby="repo-map-title" className="py-8">
        <div className="flex items-center gap-2">
          <FolderGit2 size={15} className="text-accent" />
          <h2 id="repo-map-title" className="font-mono text-[10px] tracking-[0.16em] text-mute">REPOSITORY MAP</h2>
        </div>
        <p className="mt-3 text-sm text-mute">Explore the repository by folder.</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {project.details.repoAreas.map((area) => (
            <li key={area}>
              <a href={`${project.github}/tree/main/${area}`} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-border bg-card px-4 py-3 text-sm text-mute transition-colors hover:border-accent/50 hover:text-ink">
                <span className="font-mono text-xs">/{area}</span>
                <ArrowUpRight size={14} className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <a href={project.github} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 border-t border-border pt-5 font-mono text-[10px] tracking-wider text-accent hover:text-ink">
        OPEN FULL REPOSITORY <ArrowUpRight size={13} />
      </a>
    </main>
  );
}
