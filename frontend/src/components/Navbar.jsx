import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";
import { RESUME_URL } from "@/lib/api";
import { track } from "@/lib/analytics";

const LINKS = [
  { to: "/projects", label: "Work", id: "work" },
  { to: "/experience", label: "Experience", id: "experience" },
  { to: "/about", label: "About", id: "about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link to="/" data-testid="nav-logo" className="font-mono text-sm font-medium tracking-[0.22em] text-ink">
          MINHAZ ALAM
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.id}
              to={l.to}
              data-testid={`nav-link-${l.id}`}
              className={({ isActive }) =>
                `font-mono text-xs tracking-wider transition-colors ${
                  isActive ? "text-accent" : "text-mute hover:text-ink"
                }`
              }
            >
              {l.label.toUpperCase()}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://github.com/minhazalam"
            target="_blank"
            rel="noreferrer"
            data-testid="nav-github-link"
            onClick={() => track("github_click", "nav")}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-mute transition-colors hover:border-mute/50 hover:text-ink"
          >
            <Github size={14} /> GITHUB
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-resume-link"
            onClick={() => track("resume_view", "nav")}
            className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-mute transition-colors hover:border-mute/50 hover:text-ink"
          >
            RESUME
          </a>
          <Link
            to="/contact"
            data-testid="nav-cta-contact"
            className="rounded-md bg-accent px-4 py-1.5 font-mono text-xs font-medium tracking-wider text-[#06121f] transition-all hover:brightness-110"
          >
            LET'S TALK
          </Link>
        </div>

        <button
          className="rounded-md border border-border p-2 text-ink lg:hidden"
          onClick={() => setOpen(!open)}
          data-testid="nav-menu-toggle"
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-3 lg:hidden" data-testid="nav-mobile-menu">
          {LINKS.map((l) => (
            <NavLink
              key={l.id}
              to={l.to}
              data-testid={`nav-mobile-link-${l.id}`}
              className={({ isActive }) =>
                `block py-2.5 font-mono text-sm tracking-wider ${isActive ? "text-accent" : "text-mute"}`
              }
            >
              {l.label.toUpperCase()}
            </NavLink>
          ))}
          <div className="mt-4 flex gap-3">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="nav-mobile-resume"
              className="flex-1 rounded-md border border-border py-2.5 text-center font-mono text-xs text-mute"
            >
              RESUME
            </a>
            <Link
              to="/contact"
              data-testid="nav-mobile-contact"
              className="flex-1 rounded-md bg-accent py-2.5 text-center font-mono text-xs font-medium text-[#06121f]"
            >
              LET'S TALK
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
