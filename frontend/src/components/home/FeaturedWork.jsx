import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";

export default function FeaturedWork({ projects }) {
  const featured = projects.slice(0, 2);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8" data-testid="featured-work">
      <Reveal>
        <SectionHeading
          index="01"
          label="Selected Work"
          title="Data engineering projects"
          sub="A small selection. Project details and source code live on GitHub."
        />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 text-center">
        <Link to="/projects" className="font-mono text-xs tracking-wider text-mute transition-colors hover:text-accent">
          VIEW ALL SELECTED REPOSITORIES →
        </Link>
      </Reveal>
    </section>
  );
}
