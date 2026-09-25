import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const profile = content.profile;

  return (
    <section className="mx-auto flex min-h-[76vh] max-w-6xl flex-col justify-center px-5 pb-16 pt-32 md:px-8">
      <p className="font-mono text-xs tracking-[0.18em] text-accent">DATA ENGINEERING · DATA PLATFORMS</p>
      <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
        I build reliable data platforms.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
        {profile.subline}
      </p>
      <p className="mt-7 font-mono text-xs tracking-wide text-mute">
        {profile.techLine.join(" · ")}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90">
          Selected work <ArrowDown size={15} />
        </Link>
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm text-ink hover:border-accent">
          GitHub <ArrowUpRight size={15} />
        </a>
        <Link to="/recruiter" className="px-2 py-3 text-sm text-mute hover:text-accent">Recruiter view</Link>
      </div>
      <p className="mt-12 font-mono text-[11px] text-mute">Currently open to data engineering opportunities</p>
    </section>
  );
}
