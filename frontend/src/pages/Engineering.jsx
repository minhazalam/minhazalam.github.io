import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import SqlPlayground from "@/components/playground/SqlPlayground";
import PysparkDemo from "@/components/playground/PysparkDemo";
import VisualLab from "@/components/lab/VisualLab";

export default function Engineering() {
  const { content } = useContent();
  usePageMeta({
    title: "Engineering Playground — Minhaz Alam",
    description: "Interactive data engineering demos: SQL playground, PySpark transformations and a visual lab explaining how data systems work.",
    path: "/engineering",
  });

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// ENGINEERING PLAYGROUND</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Run the concepts
        </h1>
        <p className="mt-4 max-w-2xl text-mute">
          Interactive demonstrations of data engineering ideas — all running on isolated sample
          data, entirely in your browser. No credentials, no backend secrets.
        </p>
      </Reveal>

      <div className="mt-14 space-y-14">
        <section id="sql" data-testid="section-sql">
          <Reveal><SqlPlayground /></Reveal>
        </section>
        <section id="pyspark" data-testid="section-pyspark">
          <Reveal><PysparkDemo /></Reveal>
        </section>
        <section id="lab" data-testid="section-lab">
          <Reveal><VisualLab topics={content.lab.topics} /></Reveal>
        </section>
      </div>
    </div>
  );
}
