import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const LINKS = [["work", "Work"], ["experience", "Experience"], ["certifications", "Certifications"], ["contact", "Contact"]];

export default function Navbar() {
  const { content } = useContent();
  return (
    <header className="portfolio-nav">
      <div className="portfolio-nav-inner">
        <a href="#top" className="pipeline-brand" aria-label="Minhaz Alam, back to top">
          <span>{content.profile.shortName}</span><span className="pipeline-brand-divider">/</span><span>DATA ENGINEER</span>
        </a>
        <nav className="portfolio-nav-links" aria-label="Main navigation">
          {LINKS.map(([id, label]) => <a key={id} href={`#${id}`} className="portfolio-nav-link">{label}</a>)}
        </nav>
        <a className="pipeline-nav-github" href={content.profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          GITHUB <ArrowUpRight size={12} />
        </a>
      </div>
    </header>
  );
}
