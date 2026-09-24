import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ArchitectureViewer from "../ArchitectureViewer";

export default function ArchitectureSection({ pipeline }) {
  return (
    <section className="border-y border-border bg-panel/30 py-20" data-testid="architecture-section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            label="Interactive Architecture"
            title="How my stack fits together"
            sub="A reference data platform. Click any component to see why it's there, what was considered instead, and the tradeoffs involved."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-6 font-mono text-[10px] tracking-[0.2em] text-mute/70">
            ▸ CLICK A COMPONENT — WHY · ALTERNATIVES · TRADEOFFS · CODE
          </p>
          <ArchitectureViewer nodes={pipeline} testPrefix="home-arch" />
        </Reveal>
      </div>
    </section>
  );
}
