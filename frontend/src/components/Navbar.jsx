import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const STAGES = [
  ["source", "Source"],
  ["ingest", "Ingest"],
  ["transform", "Transform"],
  ["gold", "Gold"],
  ["serve", "Serve"],
  ["output", "Output"],
];

export default function Navbar() {
  const [active, setActive] = useState("source");

  useEffect(() => {
    const targets = STAGES.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pipeline-nav">
      <div className="pipeline-nav-inner">
        <a href="#top" className="pipeline-brand" aria-label="Minhaz Alam, back to top">
          <span>MINHAZ ALAM</span><span className="pipeline-brand-divider">/</span><span>DATA ENGINEER</span>
        </a>
        <nav className="pipeline-nav-stages" aria-label="Career pipeline">
          {STAGES.map(([id, label], index) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} className={`pipeline-nav-link ${active === id ? "is-active" : ""}`}>
              <span>{String(index).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>
        <a className="pipeline-nav-github" href="https://github.com/minhazalam" target="_blank" rel="noreferrer">
          GITHUB <ArrowUpRight size={12} />
        </a>
      </div>
    </header>
  );
}
