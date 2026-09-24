import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

export default function Work() {
  const { content } = useContent();
  usePageMeta({
    title: "Engineering Work — Minhaz Alam",
    description: "Selected data engineering case studies: OCR automation, CLI tooling, AWS data platforms, dbt + Snowflake modeling and AI product engineering.",
    path: "/projects",
  });

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// ENGINEERING WORK</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Case studies, not screenshots
        </h1>
        <p className="mt-4 max-w-2xl text-mute">
          Every project documents the problem, the architecture, the decisions and the tradeoffs —
          the way the system was actually engineered. A curated selection; the
          GitHub profile has everything else.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {content.projects.projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
