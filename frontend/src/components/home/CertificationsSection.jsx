import { Award, ExternalLink } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function CertificationsSection({ certifications }) {
  return (
    <section className="mx-auto max-w-4xl px-0 py-4" data-testid="certifications-section">
      <Reveal>
        <SectionHeading
          index="01"
          label="Certification"
          title="Verified credential"
          sub="Verify directly with Databricks."
        />
      </Reveal>
      <div className="max-w-xl">
        {certifications.certifications.map((certification) => (
          <Reveal key={certification.name}>
            <div className="rounded-xl border border-border bg-panel p-6" data-testid="certification-card">
              <div className="flex items-start gap-4">
                <Award size={20} className="mt-1 shrink-0 text-accent" />
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug text-ink">{certification.name}</h3>
                  <p className="mt-1 text-sm text-mute">{certification.issuer}</p>
                  <a
                    href={certification.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent"
                    data-testid="certification-verify-link"
                  >
                    VERIFY CREDENTIAL <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
