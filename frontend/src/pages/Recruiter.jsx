import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import { track } from "@/lib/analytics";

export default function Recruiter() {
  const { content } = useContent();
  const { profile, projects, certifications, writing } = content;

  usePageMeta({
    title: "Recruiter Profile — Minhaz Alam",
    description: "Data engineering skills, selected GitHub projects, verified certification, and technical writing.",
    path: "/recruiter",
  });

  useEffect(() => {
    track("recruiter_visit", "/recruiter");
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8" data-testid="recruiter-page">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-accent">/// RECRUITER VIEW</p>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{profile.name}</h1>
        <p className="mt-3 text-lg text-mute">{profile.headline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-xs tracking-wider text-[#06121f]">
            VIEW GITHUB PROFILE <ArrowUpRight size={14} />
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-xs tracking-wider text-ink hover:border-accent/60">
            CONTACT
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.techLine.map((skill) => (
            <span key={skill} className="rounded border border-border px-3 py-1.5 font-mono text-xs text-mute">{skill}</span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Selected GitHub projects</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.projects.map((project) => (
            <a key={project.slug} href={project.github} target="_blank" rel="noreferrer" className="group rounded-lg border border-border bg-panel p-5 hover:border-accent/50">
              <span className="font-mono text-[10px] tracking-wider text-accent">{project.category}</span>
              <span className="mt-2 flex items-center justify-between font-display font-semibold text-ink group-hover:text-accent">
                {project.name}<ArrowUpRight size={15} />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-mute">{project.tagline}</span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Certification</h2>
        {certifications.certifications.map((cert) => (
          <a key={cert.name} href={cert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-mute hover:text-accent">
            {cert.name} · Verify credential <ArrowUpRight size={14} />
          </a>
        ))}
      </Reveal>

      <Reveal className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Writing</h2>
          <a href="/#/writing" className="font-mono text-[10px] tracking-wider text-accent">ALL NOTES ↗</a>
        </div>
        <div className="space-y-3">
          {writing.articles.slice(0, 3).map((article) => (
            <a key={article.slug} href={`/#/writing/${article.slug}`} className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 text-sm text-mute hover:border-accent/50 hover:text-ink">
              <span>{article.title}</span><span className="shrink-0 font-mono text-[10px] text-accent">{article.tags[0]}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
