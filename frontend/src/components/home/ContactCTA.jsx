import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

export default function ContactCTA() {
  return (
    <section className="border-t border-border py-16" data-testid="contact-cta">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent">GET IN TOUCH</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Have a data engineering role or idea?</h2>
        </Reveal>
        <Reveal className="flex gap-3">
          <a
            href="mailto:minhazalam365@gmail.com"
            data-testid="contact-cta-email"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Email me <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
