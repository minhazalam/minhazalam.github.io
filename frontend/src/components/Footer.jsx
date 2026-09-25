import { ArrowUp } from "lucide-react";

const HOME = process.env.REACT_APP_BASE_PATH || "";

export default function Footer() {
  return (
    <footer className="pipeline-footer">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-7 md:px-8">
        <p className="font-mono text-[10px] tracking-[0.14em] text-mute">MINHAZ ALAM <span className="mx-2 text-accent/60">/</span> DATA ENGINEER</p>
        <p className="font-mono text-[10px] tracking-wider text-mute">PROJECTS, NOTES &amp; SOURCE ON GITHUB</p>
        <a href={`${HOME}/#top`} className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-mute hover:text-accent">TOP <ArrowUp size={12} /></a>
      </div>
    </footer>
  );
}
