import { ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Reveal from "@/components/Reveal";
import CertificationsSection from "@/components/home/CertificationsSection";

export default function About() {
  const { content } = useContent();
  const { profile, certifications } = content;
  usePageMeta({
    title: "About — Minhaz Alam",
    description: "Senior Data Engineer. More background and work can be found on GitHub.",
    path: "/about",
  });

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// ABOUT</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{profile.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{profile.subline}</p>
        <div className="mt-6 flex flex-wrap gap-5 font-mono text-xs tracking-wider">
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-ink">
            GITHUB <ArrowUpRight size={13} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-ink">
            LINKEDIN <ArrowUpRight size={13} />
          </a>
        </div>
      </Reveal>
      <div className="mt-14">
        <CertificationsSection certifications={certifications} />
      </div>
    </div>
  );
}
