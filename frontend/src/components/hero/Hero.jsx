import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const { profile } = content;

  return (
    <section id="top" className="hero-index">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-36 md:grid-cols-[1.35fr_0.65fr] md:items-end md:px-8 md:pb-28 md:pt-44">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">{profile.name.toUpperCase()} <span className="text-mute/60">/</span> DATA ENGINEER</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Reliable data platforms for real-world workloads.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">{profile.subline}</p>
          <a href="#work" className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent transition-colors hover:text-ink focus-visible:text-ink">
            VIEW SELECTED WORK <ArrowDown size={14} />
          </a>
        </div>

        <aside className="hero-index-aside" aria-label="Technical focus">
          <p className="font-mono text-[10px] tracking-[0.16em] text-mute">CURRENT TOOLKIT</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.techLine.map((technology) => <li className="tech-node" key={technology}>{technology}</li>)}
          </ul>
          <div className="mt-7 flex gap-5 font-mono text-[10px] tracking-wider text-mute">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">GITHUB <ArrowUpRight size={11} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">LINKEDIN <ArrowUpRight size={11} /></a>
          </div>
        </aside>
      </div>
    </section>
  );
}
