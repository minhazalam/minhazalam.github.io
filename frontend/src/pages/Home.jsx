import { ArrowUpRight, Check } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Hero from "@/components/hero/Hero";
import PipelineStage from "@/components/home/PipelineStage";
import ProjectLineage from "@/components/home/ProjectLineage";

export default function Home() {
  const { content } = useContent();
  const { profile, projects, certifications, careerPipeline: pipeline } = content;

  usePageMeta({
    title: "Minhaz Alam — Data Engineer",
    description: "A data engineering career mapped as a pipeline: foundations, experience, engineering practice, selected work, and what it serves.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="career-pipeline">
          <PipelineStage id="source" number="01" label="SOURCE" title={pipeline.source.title}>
            <p className="max-w-2xl text-sm leading-relaxed text-mute md:text-base">{pipeline.source.summary}</p>
            <dl className="source-inputs mt-7">
              {pipeline.source.inputs.map((input) => (
                <div className="source-input" key={input.label}>
                  <dt>{input.label}</dt><dd>{input.value}</dd>
                </div>
              ))}
            </dl>
          </PipelineStage>

          <PipelineStage id="ingest" number="02" label="INGEST" title={pipeline.ingest.title}>
            <div className="ingest-node">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">{pipeline.ingest.company}</h3>
                <span className="font-mono text-[10px] tracking-wider text-accent">CURRENT ROLE</span>
              </div>
              <p className="mt-1 text-sm text-mute">{pipeline.ingest.role}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mute">{pipeline.ingest.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {pipeline.ingest.technologies.map((technology) => <span key={technology} className="tech-node">{technology}</span>)}
              </div>
            </div>
          </PipelineStage>

          <PipelineStage id="transform" number="03" label="TRANSFORM" title={pipeline.transform.title}>
            <p className="max-w-2xl text-sm leading-relaxed text-mute md:text-base">{pipeline.transform.summary}</p>
            <ol className="transform-flow mt-7">
              {pipeline.transform.steps.map((step, index) => (
                <li key={step} className="transform-step">
                  <span className="transform-step-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="capability-line mt-6">
              {pipeline.transform.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
            </div>
          </PipelineStage>

          <PipelineStage id="gold" number="04" label="GOLD" title="What came out of the pipeline.">
            <p className="max-w-2xl text-sm leading-relaxed text-mute">Selected data engineering work and one preparation resource. Open each source repository for implementation details.</p>
            <div className="mt-7 space-y-4">
              {projects.projects.map((project, index) => <ProjectLineage key={project.slug} project={project} index={index} />)}
            </div>
          </PipelineStage>

          <PipelineStage id="serve" number="05" label="SERVE" title={pipeline.serve.title}>
            <div className="serve-output">
              <div>
                <p className="pipeline-overline">CURRENT FOCUS</p>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-ink">{pipeline.serve.focus}</p>
              </div>
              <div>
                <p className="pipeline-overline">SYSTEM QUALITIES</p>
                <ul className="serve-principles mt-3">
                  {pipeline.serve.principles.map((principle) => <li key={principle}><Check size={13} />{principle}</li>)}
                </ul>
              </div>
            </div>
            <div className="credential-output mt-6">
              <span className="pipeline-overline">VERIFIED CREDENTIAL</span>
              {certifications.certifications.map((cert) => (
                <a key={cert.name} href={cert.verifyUrl} target="_blank" rel="noreferrer" className="credential-link">
                  {cert.name}<ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </PipelineStage>

          <PipelineStage id="output" number="06" label="OUTPUT" title={pipeline.output.title} last>
            <div className="output-node">
              <p className="text-sm leading-relaxed text-mute">{pipeline.output.summary}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a href={profile.github} target="_blank" rel="noreferrer" className="output-link">GITHUB <ArrowUpRight size={13} /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="output-link">LINKEDIN <ArrowUpRight size={13} /></a>
                <a href={`mailto:${profile.email}`} className="output-link">EMAIL <ArrowUpRight size={13} /></a>
              </div>
            </div>
          </PipelineStage>
        </div>
      </main>
    </>
  );
}
