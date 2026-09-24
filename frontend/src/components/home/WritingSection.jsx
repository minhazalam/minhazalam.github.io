import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export function formatDate(iso) {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

export default function WritingSection({ articles }) {
  return (
    <section className="border-y border-border bg-panel/30 py-20" data-testid="writing-section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            index="06"
            label="Engineering Writing"
            title="Notes on building data systems"
            sub="Practical writing on Spark, cloud pipelines and transformation layers."
          />
        </Reveal>
        <div className="space-y-4">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link
                to={`/writing/${a.slug}`}
                data-testid={`writing-link-${a.slug}`}
                className="group block rounded-xl border border-border bg-panel p-6 transition-all duration-300 hover:border-accent/50 hover:bg-panel2 md:p-7"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-3xl">
                    <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-mute">{a.summary}</p>
                  </div>
                  <div className="shrink-0 text-left md:text-right">
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
        <Reveal className="mt-8">
          <Link
            to="/writing"
            data-testid="writing-all-link"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-mute transition-colors hover:text-accent"
          >
            ALL ARTICLES <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
