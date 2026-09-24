import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import NotFound from "./NotFound";
import { formatDate } from "@/components/home/WritingSection";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function renderBlock(b, key) {
  switch (b.type) {
    case "h2":
      return (
        <h2 key={key} id={slugify(b.text)} className="mt-12 scroll-mt-24 font-display text-2xl font-semibold text-ink">
          {b.text}
        </h2>
      );
    case "p":
      return <p key={key} className="mt-5 leading-relaxed text-[#b9c3d4]">{b.text}</p>;
    case "list":
      return (
        <ul key={key} className="mt-5 space-y-2.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-[#b9c3d4]">
              <span className="mt-0.5 font-mono text-accent">→</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={key} className="mt-7 border-l-2 border-accent/60 pl-5 font-display text-lg italic text-ink">
          {b.text}
        </blockquote>
      );
    case "code":
      return (
        <div key={key} className="mt-6">
          <CodeBlock code={b.code} lang={b.lang} title={b.lang} />
        </div>
      );
    default:
      return null;
  }
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const { content } = useContent();
  const articles = content.writing.articles;
  const idx = articles.findIndex((a) => a.slug === slug);
  const a = idx >= 0 ? articles[idx] : null;

  usePageMeta({
    title: a ? `${a.title} — Minhaz Alam` : "Article — Minhaz Alam",
    description: a ? a.summary : "Data engineering article.",
    path: `/writing/${slug}`,
  });

  if (!a) return <NotFound />;

  const toc = a.body.filter((b) => b.type === "h2");
  const related = (a.relatedProjects || [])
    .map((s) => content.projects.projects.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8" data-testid="article-detail">
      <Link to="/writing" data-testid="article-back-link" className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-mute transition-colors hover:text-accent">
        <ArrowLeft size={14} /> ALL ARTICLES
      </Link>

      <Reveal className="mt-8">
        <p className="font-mono text-[10px] tracking-[0.2em] text-mute">
          {formatDate(a.date).toUpperCase()} · {a.readingTime.toUpperCase()} READ · {a.tags.join(" · ").toUpperCase()}
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          {a.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-mute">{a.summary}</p>
      </Reveal>

      {toc.length > 0 && (
        <Reveal className="mt-10">
          <div className="rounded-xl border border-border bg-panel p-6" data-testid="article-toc">
            <p className="mb-3 font-mono text-[10px] tracking-[0.22em] text-accent">TABLE OF CONTENTS</p>
            <ol className="space-y-2">
              {toc.map((h, i) => (
                <li key={i}>
                  <a href={`#${slugify(h.text)}`} className="text-sm text-mute transition-colors hover:text-accent">
                    <span className="mr-2 font-mono text-[10px] text-mute/60">{String(i + 1).padStart(2, "0")}</span>
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      )}

      <div className="mt-4">{a.body.map((b, i) => renderBlock(b, i))}</div>

      {related.length > 0 && (
        <div className="mt-16">
          <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-accent">RELATED PROJECTS</p>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                data-testid={`related-project-${p.slug}`}
                className="group rounded-xl border border-border bg-panel p-5 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-base font-semibold text-ink group-hover:text-accent">{p.name}</p>
                  <ArrowUpRight size={15} className="text-mute" />
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs text-mute">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
