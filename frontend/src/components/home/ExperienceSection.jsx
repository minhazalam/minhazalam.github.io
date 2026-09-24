import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import Timeline from "../Timeline";

export default function ExperienceSection({ experience }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8" data-testid="experience-section">
      <Reveal>
        <SectionHeading
          index="05"
          label="Experience"
          title="Career timeline"
          sub="Roles focused on measurable engineering outcomes."
        />
      </Reveal>
      <Timeline roles={experience.roles} />
      <Reveal className="mt-4">
        <Link
          to="/experience"
          data-testid="experience-full-link"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-mute transition-colors hover:text-accent"
        >
          FULL TIMELINE & CERTIFICATIONS <ArrowRight size={14} />
        </Link>
      </Reveal>
    </section>
  );
}
