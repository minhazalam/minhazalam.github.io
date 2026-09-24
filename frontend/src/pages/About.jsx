import { useEffect, useState } from "react";
import { Star, GitFork, ArrowUpRight, Github as GithubIcon } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import { RESUME_URL, GITHUB_REPOS_ENDPOINT, GITHUB_PROFILE, CURATED_FALLBACK_REPOS } from "@/lib/api";
import Reveal from "@/components/Reveal";
import TechChips from "@/components/TechChips";

function GithubRepos() {
  const [state, setState] = useState({ loading: true, repos: [], stale: false });

  useEffect(() => {
    fetch(GITHUB_REPOS_ENDPOINT)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((rows) => {
        const repos = rows
          .filter((r) => !r.fork)
          .map((r) => ({
            name: r.name,
            description: r.description,
            primary_language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            updated_at: r.updated_at,
            html_url: r.html_url,
          }))
          .sort((a, b) => (b.stars || 0) - (a.stars || 0));
        setState({ loading: false, repos, stale: false });
      })
      .catch(() => setState({ loading: false, repos: CURATED_FALLBACK_REPOS, stale: true }));
  }, []);

  return (
    <div data-testid="github-repos">
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
          {state.stale ? "SELECTED REPOSITORIES" : "SELECTED REPOSITORIES — LIVE FROM GITHUB API"}
        </p>
        {state.stale && !state.loading ? (
          <span className="font-mono text-[10px] text-mute/60">GITHUB API RATE LIMITED — CURATED LIST</span>
        ) : null}
      </div>
      {state.loading ? (
        <p className="font-mono text-xs text-mute" data-testid="github-loading">FETCHING REPOSITORIES...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {state.repos.map((r) => (
            <a
              key={r.name}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              data-testid={`repo-card-${r.name}`}
              className="group rounded-xl border border-border bg-panel p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm text-ink group-hover:text-accent">{r.name}</p>
                <ArrowUpRight size={14} className="text-mute" />
              </div>
              <p className="mt-2 line-clamp-2 min-h-[32px] text-xs text-mute">{r.description || "No description"}</p>
              <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-mute/80">
                {r.primary_language ? <span>{r.primary_language}</span> : null}
                <span className="flex items-center gap-1"><Star size={11} /> {r.stars ?? "—"}</span>
                <span className="flex items-center gap-1"><GitFork size={11} /> {r.forks ?? "—"}</span>
                {r.updated_at ? <span>UPD {new Date(r.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase()}</span> : null}
              </div>
            </a>
          ))}
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer"
            data-testid="repo-card-profile"
            className="group flex items-center justify-between rounded-xl border border-dashed border-border p-5 transition-colors hover:border-accent/50"
          >
            <p className="font-mono text-sm text-mute group-hover:text-accent">VIEW FULL PROFILE ON GITHUB</p>
            <ArrowUpRight size={14} className="text-mute" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const { content } = useContent();
  const profile = content.profile;
  usePageMeta({
    title: "About — Minhaz Alam",
    description: "About Minhaz Alam: Senior Data Engineer focused on data platforms, distributed processing and cloud-native systems.",
    path: "/about",
  });

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <div className="grid gap-12 md:grid-cols-[auto_1fr]">
        <Reveal>
          <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-accent/30 bg-accent/5 font-display text-4xl font-bold text-accent">
            MA
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// ABOUT</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{profile.name}</h1>
          <p className="mt-3 font-mono text-xs tracking-wider text-mute">{profile.headline.toUpperCase()}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-[#b9c3d4]">{profile.summary}</p>
          <TechChips items={profile.focus} className="mt-6 gap-2.5" />
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-mute/60">
            CURRENTLY EXPLORING: {profile.exploring.join(" · ").toUpperCase()}
          </p>
        </Reveal>
      </div>

      <div className="mt-20" id="resume">
        <Reveal>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-7 md:p-9" data-testid="resume-section">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-accent">RECRUITER-FRIENDLY SUMMARY</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                  {profile.resumeSummary.title} — {profile.resumeSummary.years}
                </h2>
                <p className="mt-2 font-mono text-xs text-mute">{profile.resumeSummary.stack}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.resumeSummary.domains.map((d) => (
                    <span key={d} className="rounded border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent">
                      {d.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="about-resume-github"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-center font-mono text-xs font-medium tracking-wider text-[#06121f] hover:brightness-110"
                >
                  RESUME ON GITHUB
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20">
        <Reveal>
          <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Open source & code</h2>
          <GithubRepos />
        </Reveal>
      </div>
    </div>
  );
}
