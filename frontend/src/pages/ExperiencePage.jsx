import { ArrowUpRight, CircleAlert } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import { RESUME_URL } from "@/lib/api";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import CertificationsSection from "@/components/home/CertificationsSection";

export default function ExperiencePage() {
  const { content } = useContent();
  usePageMeta({
    title: "Experience & Certifications — Minhaz Alam",
    description: "Career timeline of Minhaz Alam: Senior Software Engineer (Data Engineering) at Accenture, previously Oracle — 6 years in data and software engineering.",
    path: "/experience",
  });

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// EXPERIENCE</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Six years of building data systems
        </h1>
        <p className="mt-4 max-w-2xl text-mute">
          Roles focused on measurable engineering outcomes — pipelines designed, systems operated,
          time and cost saved.
        </p>
      </Reveal>

      <Reveal className="mt-6">
        <p className="flex items-start gap-2 font-mono text-[10px] leading-relaxed text-mute/60" data-testid="experience-note">
          <CircleAlert size={12} className="mt-0.5 shrink-0" />
          {content.experience.note ? content.experience.note.toUpperCase() : ""}
        </p>
      </Reveal>

      <div className="mt-14">
        <Timeline roles={content.experience.roles} />
      </div>

      <Reveal className="mt-6">
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-7">
          <h2 className="font-display text-xl font-semibold text-ink">Resume</h2>
          <p className="mt-2 max-w-xl text-sm text-mute">
            {content.profile.resumeSummary.title} · {content.profile.resumeSummary.years} ·{" "}
            {content.profile.resumeSummary.stack}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="experience-resume-github"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-[#06121f] hover:brightness-110"
            >
              RESUME ON GITHUB <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-20">
        <CertificationsSection certifications={content.certifications} />
      </div>
    </div>
  );
}
