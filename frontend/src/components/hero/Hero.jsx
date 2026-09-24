import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import StatusPill from "../StatusPill";
import DataFlowCanvas from "./DataFlowCanvas";
import { useContent } from "@/context/ContentContext";
import { RESUME_URL } from "@/lib/api";
import { track } from "@/lib/analytics";

export default function Hero() {
  const { content } = useContent();
  const profile = content?.profile || {};
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const lines = [
    "I build data systems",
    "that turn complex data",
    <>into <span className="text-accent">reliable products.</span></>,
  ];

  return (
    <section ref={ref} className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 noise-overlay" />
      <div
        className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #4D9FFF, transparent)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            className="mb-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StatusPill tone="emerald" testId="status-systems">SYSTEMS ONLINE</StatusPill>
            <StatusPill testId="status-availability">{profile.availability ? "OPEN TO OPPORTUNITIES" : ""}</StatusPill>
          </motion.div>

          <h1
            className="font-display text-[42px] font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[62px]"
            data-testid="hero-headline"
          >
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            {profile.subline || "Senior Data Engineer focused on data platforms, distributed processing and cloud-native systems."}
          </motion.p>

          <motion.p
            className="mt-6 font-mono text-xs leading-relaxed text-mute/90 md:text-[13px]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            data-testid="hero-techline"
          >
            {(profile.techLine || []).join("  ·  ")}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <Link
              to="/projects"
              data-testid="hero-cta-work"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#06121f] transition-all hover:brightness-110"
            >
              EXPLORE MY WORK
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-resume"
              onClick={() => track("resume_view", "hero")}
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-xs tracking-wider text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              VIEW RESUME <ArrowUpRight size={14} />
            </a>
            <a
              href={profile.github || "https://github.com/minhazalam"}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-github"
              onClick={() => track("github_click", "hero")}
              aria-label="GitHub profile"
              className="inline-flex items-center gap-2 rounded-md border border-border p-3 text-mute transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Github size={16} />
            </a>
          </motion.div>

          <motion.p
            className="mt-8 font-mono text-[11px] tracking-wide text-mute/70"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.05 }}
          >
            <span className="text-accent">//</span> open to data engineering / data platform
            opportunities — <Link to="/contact" className="text-ink underline decoration-accent/50 underline-offset-4 hover:text-accent" data-testid="hero-recruiter-link">let's talk</Link>
          </motion.p>
        </div>

        <motion.div style={reduce ? undefined : { y: canvasY }} className="hidden lg:block">
          <DataFlowCanvas />
        </motion.div>
      </div>

      <MobilePipeline stages={content?.architecture?.pipeline || []} />
    </section>
  );
}

function MobilePipeline({ stages }) {
  if (!stages.length) return null;
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 lg:hidden" data-testid="mobile-pipeline">
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((s, i) => (
          <span key={s.id} className="flex items-center gap-2">
            <span className="rounded border border-border bg-panel px-2.5 py-1 font-mono text-[10px] text-mute">
              {s.label.toUpperCase()}
            </span>
            {i < stages.length - 1 && <span className="font-mono text-[10px] text-accent/60">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
