import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const STAGES = [
  ["source", "Source"],
  ["ingest", "Ingest"],
  ["transform", "Transform"],
  ["gold", "Gold"],
  ["serve", "Serve"],
  ["output", "Output"],
];

export default function Hero() {
  const { content } = useContent();
  const profile = content.profile;

  return (
    <section className="hero-pipeline">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">{profile.name.toUpperCase()} <span className="text-mute/60">/</span> DATA ENGINEER</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Building systems that turn data into decisions.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">{profile.subline}</p>
          <div className="mt-7 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-mute">
            {profile.techLine.map((skill, i) => <span key={skill}>{skill}{i < profile.techLine.length - 1 && <span className="ml-3 text-accent/60">·</span>}</span>)}
          </div>
          <a href="#source" className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent hover:text-ink focus-visible:text-ink">
            EXPLORE THE PIPELINE <ArrowDown size={14} />
          </a>
        </div>

        <nav className="hero-lineage mt-16 md:mt-24" aria-label="Portfolio pipeline stages">
          <div className="hero-lineage-track" aria-hidden="true"><span className="hero-lineage-packet" /></div>
          <ol className="hero-lineage-nodes">
            {STAGES.map(([id, label], index) => (
              <li key={id}>
                <a href={`#${id}`} className="hero-lineage-link" aria-label={`Explore ${label} stage`}>
                  <span className="hero-lineage-dot">{String(index).padStart(2, "0")}</span>
                  <span className="hero-lineage-name">{label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex gap-5 font-mono text-[10px] tracking-wider text-mute">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">GITHUB <ArrowUpRight size={11} className="inline" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LINKEDIN <ArrowUpRight size={11} className="inline" /></a>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">EMAIL <ArrowUpRight size={11} className="inline" /></a>
          </div>
        </nav>
      </div>
    </section>
  );
}
