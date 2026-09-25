export default function PipelineStage({ id, number, label, title, children, last = false }) {
  return (
    <section id={id} data-pipeline-stage={id} className={`pipeline-stage scroll-mt-28 ${last ? "pipeline-stage-last" : ""}`}>
      <div className="pipeline-stage-rail" aria-hidden="true">
        <span className="pipeline-stage-node">{number}</span>
        <span className="pipeline-stage-label">{label}</span>
      </div>
      <div className="pipeline-stage-content">
        <p className="pipeline-stage-kicker">{number} / {label}</p>
        <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
