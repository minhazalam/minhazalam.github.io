import { usePageMeta } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

export default function Writing() {
  usePageMeta({
    title: "Notes — Minhaz Alam",
    description: "Data engineering notes by Minhaz Alam.",
    path: "/writing",
  });

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent">/// NOTES</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Field notes
        </h1>
        <p className="mt-4 max-w-2xl text-mute">
          I’ll publish selected notes here as I write them. For now, the preparation repository is the source of truth.
        </p>
        <a href="https://github.com/minhazalam/data-engineering-interview-prep" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent hover:text-ink">
          OPEN PREPARATION REPOSITORY <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </div>
  );
}
