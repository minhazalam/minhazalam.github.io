import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

export default function Work() {
  const { content } = useContent();
  usePageMeta({
    title: "Data Engineering Projects — Minhaz Alam",
    description: "Selected data engineering and interview preparation repositories by Minhaz Alam.",
    path: "/projects",
  });

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// SELECTED REPOSITORIES</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Data engineering work
        </h1>
        <p className="mt-4 max-w-2xl text-mute">
          Source code and full project documentation are on GitHub.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {content.projects.projects.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 2) * 0.08}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
