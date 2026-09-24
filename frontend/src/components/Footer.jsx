import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { RESUME_DOWNLOAD_URL } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-panel/40" data-testid="footer">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-sm tracking-[0.22em] text-ink">MINHAZ ALAM</p>
            <p className="mt-2 max-w-xs text-sm text-mute">
              Senior Data Engineer — data platforms, distributed processing and cloud-native systems.
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-emerald-400">
              ● AVAILABLE FOR OPPORTUNITIES
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:gap-16">
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-mute">EXPLORE</p>
              {[
                ["/projects", "Work"],
                ["/engineering", "Engineering"],
                ["/experience", "Experience"],
                ["/writing", "Writing"],
                ["/recruiter", "Recruiter Mode"],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="block py-1 text-sm text-mute transition-colors hover:text-accent" data-testid={`footer-link-${to.slice(1)}`}>
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-mute">CONTACT</p>
              <a href="mailto:minhazalam365@gmail.com" className="block py-1 text-sm text-mute hover:text-accent" data-testid="footer-email">minhazalam365@gmail.com</a>
              <a href="https://www.linkedin.com/in/alam" target="_blank" rel="noreferrer" className="block py-1 text-sm text-mute hover:text-accent" data-testid="footer-linkedin">LinkedIn</a>
              <a href="https://github.com/minhazalam" target="_blank" rel="noreferrer" className="block py-1 text-sm text-mute hover:text-accent" data-testid="footer-github">GitHub</a>
              <a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noreferrer" className="block py-1 text-sm text-mute hover:text-accent" data-testid="footer-resume">Resume (GitHub)</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-mute/70">
            © 2025 MINHAZ ALAM — BUILT AS A PERSONAL DATA PLATFORM
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="back-to-top-btn"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-mute transition-colors hover:text-accent"
          >
            TOP <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
