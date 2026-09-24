import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

const AUDIENCES = [
  { t: "Recruiters", d: "Interested in Data Engineering / Data Platform opportunities? Start with the resume or recruiter view." },
  { t: "Engineers", d: "Want to discuss data systems or distributed processing? Always up for a technical conversation." },
  { t: "Builders", d: "Working on an interesting product? Let's compare notes on data platforms and AI-assisted tooling." },
];

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-28" data-testid="contact-cta">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="mb-5 font-mono text-xs tracking-[0.3em] text-accent">/// GET IN TOUCH</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Let's build something
            <br />
            <span className="text-accent">interesting.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 text-left md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-panel p-6">
                <p className="font-mono text-[10px] tracking-[0.22em] text-accent">{a.t.toUpperCase()}</p>
                <p className="mt-3 text-sm leading-relaxed text-mute">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            data-testid="contact-cta-button"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3.5 font-mono text-xs font-medium tracking-wider text-[#06121f] transition-all hover:brightness-110"
          >
            LET'S TALK
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="mailto:minhazalam365@gmail.com"
            data-testid="contact-cta-email"
            className="rounded-md border border-border px-8 py-3.5 font-mono text-xs tracking-wider text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            EMAIL DIRECTLY
          </a>
        </Reveal>
      </div>
    </section>
  );
}
