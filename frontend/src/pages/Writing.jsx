import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import { formatDate } from "@/components/home/WritingSection";

export default function Writing() {
  const { content } = useContent();
  usePageMeta({
    title: "Engineering Writing — Minhaz Alam",
    description: "Practical writing on Spark optimization, data skew, AWS pipeline design, dbt + Snowflake and building developer tools.",
    path: "/writing",
  });

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// ENGINEERING WRITING</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Notes from the pipeline
        </h1>
        <p className="mt-4 max-w-2xl text-mute">
          Practical articles on distributed processing, cloud architecture and transformation layers.
        </p>
      </Reveal>

      <div className="mt-14 space-y-4">
        {content.writing.articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link
              to={`/writing/${a.slug}`}
              data-testid={`article-card-${a.slug}`}
              className="group block rounded-xl border border-border bg-panel p-6 transition-all duration-300 hover:border-accent/50 hover:bg-panel2 md:p-7"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                    {a.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute">{a.summary}</p>
                </div>
                <div className="shrink-0 md:text-right">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-mute/80">
                    {formatDate(a.date).toUpperCase()} · {a.readingTime.toUpperCase()}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] text-accent/80">{a.tags.join(" · ").toUpperCase()}</p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
