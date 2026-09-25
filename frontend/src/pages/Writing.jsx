import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";

const NOTES_REPO = "https://github.com/minhazalam/data-engineering-interview-prep";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleDateString("en", { year: "numeric", month: "short" });
}

export default function Writing() {
  const { content } = useContent();
  const articles = content.writing.articles;

  usePageMeta({
    title: "Notes — Minhaz Alam",
    description: "Selected data engineering notes and production scenarios by Minhaz Alam.",
    path: "/writing",
  });

  return (
    <main className="notes-page mx-auto min-h-[70vh] max-w-4xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-accent">WRITING <span className="mx-2 text-mute/60">/</span> SELECTED NOTES</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">Notes from the work.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute">Practical data engineering notes and production scenarios, published selectively from my preparation repository.</p>

      {articles.length > 0 ? (
        <div className="mt-12 divide-y divide-border border-y border-border">
          {articles.map((article) => (
            <article key={article.slug} className="py-6 md:py-7">
              <div className="mb-3 flex flex-wrap gap-x-3 font-mono text-[10px] tracking-wider text-mute">
                {article.topic && <span className="text-accent">{article.topic.toUpperCase()}</span>}
                {article.date && <span>{formatDate(article.date).toUpperCase()}</span>}
              </div>
              <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                <Link to={`/writing/${article.slug}`} className="transition-colors hover:text-accent">{article.title}</Link>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">{article.summary}</p>
              <Link to={`/writing/${article.slug}`} className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent hover:text-ink">
                READ NOTE <ArrowUpRight size={13} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 border-y border-border py-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-mute">NO NOTES PUBLISHED YET</p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">When a note is ready, it will appear here from the preparation repository. Only explicitly selected Markdown files are published.</p>
        </div>
      )}

      <a href={NOTES_REPO} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-mute transition-colors hover:text-accent">
        OPEN PREPARATION REPOSITORY <ArrowUpRight size={13} />
      </a>
    </main>
  );
}
