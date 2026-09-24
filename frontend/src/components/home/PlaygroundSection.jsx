import { Link } from "react-router-dom";
import { Database, Braces, FlaskConical, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const CARDS = [
  {
    id: "sql",
    icon: Database,
    title: "SQL Playground",
    desc: "Run real SQL — joins, aggregates, group-bys — against a sample dataset, entirely in your browser.",
  },
  {
    id: "pyspark",
    icon: Braces,
    title: "PySpark Demo",
    desc: "Input → transformation → output. Watch classic DataFrame operations reshape a table step by step.",
  },
  {
    id: "lab",
    icon: FlaskConical,
    title: "Visual Lab",
    desc: "How data systems work: skew, partitioning, streaming, batch, quality — as interactive diagrams.",
  },
];

export default function PlaygroundSection() {
  return (
    <section className="border-y border-border bg-panel/30 py-20" data-testid="playground-section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            label="Engineering Playground"
            title="Don't read about it — run it"
            sub="Interactive technical demonstrations. Everything runs on isolated sample data in the browser."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <Link
                to="/engineering"
                data-testid={`playground-card-${c.id}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-panel p-7 transition-all duration-300 hover:border-accent/50 hover:bg-panel2"
              >
                <c.icon size={22} className="text-accent" />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{c.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent">
                  OPEN <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
