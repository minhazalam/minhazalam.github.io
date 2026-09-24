import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, CircleAlert } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import TechChips from "@/components/TechChips";
import ArchitectureViewer from "@/components/ArchitectureViewer";
import CodeBlock from "@/components/CodeBlock";
import NotFound from "./NotFound";
import { ph } from "@/lib/placeholder.jsx";
import { track } from "@/lib/analytics";

const Sub = ({ n, title }) => (
  <div className="mb-6 mt-14 flex items-center gap-4">
    <span className="font-mono text-xs text-accent">{n}</span>
    <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">{title}</h2>
    <div className="h-px flex-1 bg-border" />
  </div>
);

const ListBlock = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3 text-sm leading-relaxed text-mute">
        <span className="mt-0.5 font-mono text-accent">→</span>
        <span>{ph(it)}</span>
      </li>
    ))}
  </ul>
);

export default function ProjectDetail() {
  const { slug } = useParams();
  const { content } = useContent();
  const projects = content.projects.projects;
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = idx >= 0 ? projects[idx] : null;

  usePageMeta({
    title: p ? `${p.name} — Minhaz Alam` : "Project — Minhaz Alam",
    description: p ? p.tagline : "Data engineering project case study.",
    path: `/projects/${slug}`,
  });

  if (!p) return <NotFound />;

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8" data-testid="project-detail">
      <Link to="/projects" data-testid="project-back-link" className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-mute transition-colors hover:text-accent">
        <ArrowLeft size={14} /> ALL WORK
      </Link>

      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          {p.status ? (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
              {p.status.toUpperCase()}
            </span>
          ) : null}
          <span className="font-mono text-[10px] tracking-wider text-mute">{p.tech.join(" · ").toUpperCase()}</span>
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{p.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-mute">{p.tagline}</p>
      </Reveal>

      <Sub n="01" title="Problem" />
      <Reveal><p className="max-w-3xl text-[15px] leading-relaxed text-[#b9c3d4]">{ph(p.problem)}</p></Reveal>

      <Sub n="02" title="Why It Matters" />
      <Reveal><p className="max-w-3xl text-[15px] leading-relaxed text-[#b9c3d4]">{ph(p.whyItMatters)}</p></Reveal>

      <Sub n="03" title="Architecture" />
      <Reveal>
        <p className="mb-6 font-mono text-[10px] tracking-[0.2em] text-mute/70">
          ▸ CLICK A COMPONENT — WHY · ALTERNATIVES · TRADEOFFS · CODE
        </p>
        <ArchitectureViewer nodes={p.architecture} testPrefix={`proj-${p.slug}-arch`} />
      </Reveal>

      <Sub n="04" title="Data Flow" />
      <Reveal>
        <div className="rounded-xl border border-border bg-panel p-6 md:p-8" data-testid="project-dataflow">
          {p.dataFlow.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-[10px] text-accent">
                  {i + 1}
                </span>
                {i < p.dataFlow.length - 1 && <span className="h-8 w-px bg-border" />}
              </div>
              <p className="pb-2 pt-1.5 text-sm text-[#b9c3d4]">{step}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Sub n="05" title="Technology" />
      <Reveal><TechChips items={p.tech} className="gap-2.5" /></Reveal>

      <Sub n="06" title="Engineering Decisions" />
      <div className="grid gap-5">
        {p.decisions.map((d, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="rounded-xl border border-border bg-panel p-6 md:p-7" data-testid={`decision-card-${i}`}>
              <h3 className="font-display text-base font-semibold text-ink">{ph(d.title)}</h3>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-accent">DECISION</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{ph(d.decision)}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-accent">ALTERNATIVES</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{ph(d.alternatives)}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-accent">TRADEOFFS</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{ph(d.tradeoffs)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Sub n="07" title="Implementation" />
      <Reveal><ListBlock items={p.implementation} /></Reveal>

      <Sub n="08" title="Challenges" />
      <Reveal><ListBlock items={p.challenges} /></Reveal>

      <Sub n="09" title="Performance" />
      <Reveal><ListBlock items={p.performance} /></Reveal>

      <Sub n="10" title="Results" />
      <Reveal><ListBlock items={p.results} /></Reveal>

      <Sub n="11" title="Lessons Learned" />
      <Reveal><ListBlock items={p.lessons} /></Reveal>

      <Reveal className="mt-14">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-accent/30 bg-accent/5 p-7 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">Explore the source</h3>
            <p className="mt-1 text-sm text-mute">Repository and further projects on GitHub.</p>
          </div>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            data-testid="project-github-btn"
            onClick={() => track("github_click", `/projects/${p.slug}`)}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#06121f] transition-all hover:brightness-110"
          >
            VIEW ON GITHUB <ExternalLink size={14} />
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <p className="flex items-start gap-2 font-mono text-[10px] leading-relaxed text-mute/60">
          <CircleAlert size={12} className="mt-0.5 shrink-0" />
          AMBER [PLACEHOLDERS] MARK METRICS AND DETAILS PENDING CONFIRMATION — NOTHING ON THIS PAGE IS INVENTED.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} data-testid="project-prev" className="group rounded-lg border border-border bg-panel p-5 transition-colors hover:border-accent/50">
          <p className="font-mono text-[10px] tracking-wider text-mute">← PREVIOUS</p>
          <p className="mt-2 font-display text-base text-ink group-hover:text-accent">{prev.name}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} data-testid="project-next" className="group rounded-lg border border-border bg-panel p-5 text-right transition-colors hover:border-accent/50">
          <p className="font-mono text-[10px] tracking-wider text-mute">NEXT →</p>
          <p className="mt-2 font-display text-base text-ink group-hover:text-accent">{next.name}</p>
        </Link>
      </div>

      <div className="mt-10">
        <CodeBlock
          code={`# project index\nslug   = "${p.slug}"\nstack  = ${JSON.stringify(p.tech)}\nstatus = "${p.status || "case study"}"`}
          lang="python"
          title="meta.py"
        />
      </div>
    </article>
  );
}
