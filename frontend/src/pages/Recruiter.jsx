import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import { RESUME_URL } from "@/lib/api";
import Reveal from "@/components/Reveal";
import StatusPill from "@/components/StatusPill";
import { track } from "@/lib/analytics";

export default function Recruiter() {
  const { content } = useContent();
  const profile = content.profile;
  const roles = content.experience.roles;

  usePageMeta({
    title: "Recruiter Profile — Minhaz Alam",
    description: "Concise recruiter profile: Minhaz Alam, Senior Data Engineer — experience, core skills, selected projects, resume and contact.",
    path: "/recruiter",
  });

  useEffect(() => {
    track("recruiter_visit", "/recruiter");
  }, []);

  const productionSkills = content.skills.categories
    .map((c) => ({ ...c, items: c.items.filter((i) => i.level === "production").map((i) => i.name) }))
    .filter((c) => c.items.length > 0);
  const impact = roles.flatMap((r) => r.impact).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8" data-testid="recruiter-page">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.3em] text-accent">/// RECRUITER VIEW</p>
          <StatusPill testId="recruiter-availability">{profile.availability.toUpperCase()}</StatusPill>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{profile.name}</h1>
        <p className="mt-3 font-mono text-xs tracking-wider text-mute">{profile.headline.toUpperCase()}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-[#b9c3d4]">{profile.summary}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="recruiter-resume-github"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#06121f] hover:brightness-110"
          >
            RESUME ON GITHUB <ArrowUpRight size={13} />
          </a>
          <Link
            to="/contact"
            data-testid="recruiter-contact"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-xs tracking-wider text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            CONTACT ME <ArrowRight size={13} />
          </Link>
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="mb-6 font-display text-xl font-semibold text-ink">Experience</h2>
        <div className="space-y-4">
          {roles.map((r) => (
            <div key={r.company} className="rounded-xl border border-border bg-panel p-6" data-testid="recruiter-role">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-base font-semibold text-ink">{r.title}</p>
                <p className="font-mono text-[10px] tracking-wider text-mute">{r.period.toUpperCase()}</p>
              </div>
              <p className="mt-1 text-sm text-accent">{r.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{r.overview}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="mb-6 font-display text-xl font-semibold text-ink">Core skills</h2>
        <div className="flex flex-wrap gap-2.5">
          {productionSkills.map((c) => c.items.map((i) => (
            <span key={`${c.id}-${i}`} className="rounded border border-accent/30 bg-accent/5 px-3 py-1.5 font-mono text-[11px] text-ink">
              {i}
            </span>
          )))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-mute/60">PRODUCTION EXPERIENCE ONLY — FULL STACK ON THE MAIN SITE</p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="mb-6 font-display text-xl font-semibold text-ink">Selected impact</h2>
        <ul className="space-y-2.5">
          {impact.map((imp, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#b9c3d4]">
              <span className="font-mono text-accent">→</span>
              <span>{imp}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[10px] text-mute/60">[X] MARKERS = METRICS PENDING CONFIRMATION — NOTHING INVENTED</p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="mb-6 font-display text-xl font-semibold text-ink">Selected projects</h2>
        <div className="space-y-3">
          {content.projects.projects.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              data-testid={`recruiter-project-${p.slug}`}
              className="flex items-center justify-between rounded-lg border border-border bg-panel px-5 py-4 transition-colors hover:border-accent/50"
            >
              <div>
                <p className="font-display text-sm font-semibold text-ink">{p.name}</p>
                <p className="mt-1 text-xs text-mute">{p.tagline}</p>
              </div>
              <span className="ml-4 shrink-0 font-mono text-[10px] tracking-wider text-accent">
                {(p.status || "CASE STUDY").toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-7 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">Interested?</h2>
          <p className="mt-2 text-sm text-mute">{profile.email} · linkedin.com/in/alam</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="recruiter-resume-view"
              onClick={() => track("resume_view", "/recruiter")}
              className="rounded-md bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#06121f] hover:brightness-110"
            >
              RESUME ON GITHUB
            </a>
            <Link
              to="/contact"
              data-testid="recruiter-contact-2"
              className="rounded-md border border-border px-6 py-3 font-mono text-xs tracking-wider text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              CONTACT ME
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
