import { ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Hero from "@/components/hero/Hero";
import ProjectLineage from "@/components/home/ProjectLineage";

function SectionLabel({ number, children }) {
  return (
    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
      {number} <span className="mx-2 text-mute/60">/</span> {children}
    </p>
  );
}

export default function Home() {
  const { content } = useContent();
  const { profile, projects, certifications, experience } = content;
  const currentRole = experience.roles.find((role) => role.current);
  const featuredProjects = projects.projects.filter((project) =>
    ["enterprise-data-platform", "data-engineering-interview-prep"].includes(project.slug),
  );

  usePageMeta({
    title: "Minhaz Alam — Data Engineer",
    description: "Data engineer working on data platforms, distributed processing and cloud-native systems.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
        <section id="work" className="portfolio-section scroll-mt-24" aria-labelledby="work-title">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel number="01">Selected work</SectionLabel>
              <h2 id="work-title" className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">Projects worth a closer look</h2>
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-mute transition-colors hover:text-accent">
              MORE ON GITHUB <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project, index) => <ProjectLineage key={project.slug} project={project} index={index} />)}
          </div>
        </section>

        <section id="experience" className="portfolio-section scroll-mt-24" aria-labelledby="experience-title">
          <SectionLabel number="02">Experience</SectionLabel>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <h2 id="experience-title" className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">Engineering data systems at scale.</h2>
              <p className="mt-4 text-sm leading-relaxed text-mute">{currentRole?.overview}</p>
            </div>
            {currentRole && (
              <article className="role-summary">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{currentRole.title}</h3>
                  <span className="font-mono text-[10px] tracking-wider text-accent">{currentRole.company.toUpperCase()}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentRole.technologies.filter((technology) => !technology.startsWith("[")).map((technology) => (
                    <span className="tech-node" key={technology}>{technology}</span>
                  ))}
                </div>
              </article>
            )}
          </div>
        </section>

        <section id="certifications" className="portfolio-section scroll-mt-24" aria-labelledby="certifications-title">
          <SectionLabel number="03">Certification</SectionLabel>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <h2 id="certifications-title" className="font-display text-xl font-semibold text-ink">Verified credentials</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {certifications.certifications.map((cert) => (
                <a key={cert.name} href={cert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-accent">
                  {cert.name}<ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="portfolio-section scroll-mt-24" aria-labelledby="contact-title">
          <SectionLabel number="04">Contact</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="contact-title" className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">Let’s talk data engineering.</h2>
              <p className="mt-3 text-sm text-mute">Open to data engineering and data platform opportunities.</p>
            </div>
            <div className="flex flex-wrap gap-5 font-mono text-[10px] tracking-wider">
              <a className="output-link" href={`mailto:${profile.email}`}>EMAIL <ArrowUpRight size={13} /></a>
              <a className="output-link" href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={13} /></a>
              <a className="output-link" href={profile.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
