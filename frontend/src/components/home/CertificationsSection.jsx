import { Award, ExternalLink } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function CertificationsSection({ certifications }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8" data-testid="certifications-section">
      <Reveal>
        <SectionHeading
          index="07"
          label="Certifications"
          title="Verified credentials"
          sub="Platform certifications, with verification where available."
        />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certifications.certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-panel p-6" data-testid="certification-card">
              <div className="flex items-start justify-between">
                <Award size={20} className="text-accent" />
                <span className="font-mono text-[10px] tracking-[0.16em] text-mute">{c.date}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold leading-snug text-ink">{c.name}</h3>
              <p className="mt-1 text-sm text-mute">{c.issuer}</p>
              <div className="mt-4 flex-1" />
              {c.credentialId ? (
                <p className="font-mono text-[10px] text-mute/70">ID: {c.credentialId}</p>
              ) : null}
              {c.verifyUrl ? (
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent"
                  data-testid="certification-verify-link"
                >
                  VERIFY CREDENTIAL <ExternalLink size={12} />
                </a>
              ) : (
                <p className="mt-3 font-mono text-[10px] text-mute/60">{c.note}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
