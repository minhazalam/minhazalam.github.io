import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-panel/40" data-testid="footer">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-mono text-sm tracking-[0.22em] text-ink">MINHAZ ALAM</p>
          <p className="mt-2 text-sm text-mute">Senior Data Engineer</p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-mute">
          <Link to="/projects" className="hover:text-accent">Work</Link>
          <Link to="/writing" className="hover:text-accent">Writing</Link>
          <Link to="/recruiter" className="hover:text-accent">Recruiter</Link>
          <Link to="/about" className="hover:text-accent">About</Link>
          <a href="mailto:minhazalam365@gmail.com" className="hover:text-accent">Email</a>
          <a href="https://github.com/minhazalam" target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="back-to-top-btn" aria-label="Back to top" className="self-start font-mono text-[10px] tracking-wider text-mute transition-colors hover:text-accent md:self-auto">
          TOP <ArrowUp size={12} className="inline" />
        </button>
      </div>
    </footer>
  );
}
