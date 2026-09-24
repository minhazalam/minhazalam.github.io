import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";

export default function FeaturedWork({ projects }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8" data-testid="featured-work">
      <Reveal>
        <SectionHeading
          index="01"
          label="Featured Engineering Work"
          title="Selected Engineering Work"
          sub="Systems, platforms and experiments I've built — with the engineering decisions behind them."
        />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link
          to="/projects"
          data-testid="featured-all-work-link"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-mute transition-colors hover:text-accent"
        >
          ALL CASE STUDIES <ArrowRight size={14} />
        </Link>
      </Reveal>
    </section>
  );
}
