import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

const STAGES = [
  { x: 0.34, y: 0.12 },
  { x: 0.66, y: 0.28 },
  { x: 0.34, y: 0.44 },
  { x: 0.66, y: 0.60 },
  { x: 0.34, y: 0.75 },
  { x: 0.58, y: 0.87 },
];

function catmullRom(points, samplesPerSeg) {
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let j = 0; j < samplesPerSeg; j++) {
      const t = j / samplesPerSeg;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

export default function DataFlowCanvas() {
  const { content } = useContent();
  const pipeline = content?.architecture?.pipeline || [];
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext("2d");
    const pts = catmullRom(STAGES, 60);
    const particles = Array.from({ length: 22 }, () => ({
      t: Math.random(),
      v: 0.0008 + Math.random() * 0.0016,
      r: 0.9 + Math.random() * 1.7,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let inView = true;
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(wrap);

    const pointAt = (t) => pts[Math.min(pts.length - 1, Math.floor(t * (pts.length - 1)))];

    const draw = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      pts.forEach((p, i) => {
        const x = p.x * w;
        const y = p.y * h;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "rgba(77,159,255,0.06)";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.strokeStyle = "rgba(77,159,255,0.22)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      STAGES.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, 7, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(77,159,255,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(125,196,255,0.95)";
        ctx.fill();
      });

      for (const p of particles) {
        p.t += p.v;
        if (p.t > 1) p.t -= 1;
        const pt = pointAt(p.t);
        const fade = Math.sin(Math.PI * p.t);
        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, p.r * (0.7 + fade), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125,196,255,${0.5 * fade + 0.12})`;
        ctx.shadowColor = "rgba(77,159,255,0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    let raf = 0;
    const loop = () => {
      if (inView && !document.hidden) draw();
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduce]);

  const stage = pipeline[active];

  return (
    <div
      ref={wrapRef}
      className="relative h-[560px] overflow-hidden rounded-xl border border-border bg-panel/60"
      data-testid="dataflow-canvas"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/70 px-4 py-2.5 backdrop-blur">
        <span className="font-mono text-[10px] tracking-[0.22em] text-mute">PIPELINE — LIVE</span>
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-accent">
          <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent" /> DATA FLOWING
        </span>
      </div>

      {pipeline.map((s, i) => {
        const anchor = STAGES[i];
        if (!anchor) return null;
        const left = i % 2 === 0;
        return (
          <button
            key={s.id}
            data-testid={`pipeline-stage-${s.id}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`absolute z-10 whitespace-nowrap rounded border px-2.5 py-1.5 font-mono text-[10px] tracking-wider transition-all duration-200 ${
              active === i
                ? "border-accent/70 bg-accent/10 text-accent"
                : "border-border bg-background/80 text-mute hover:border-mute/50 hover:text-ink"
            }`}
            style={{
              left: `${anchor.x * 100}%`,
              top: `${anchor.y * 100}%`,
              transform: `translate(${left ? "calc(-100% - 16px)" : "16px"}, -50%)`,
            }}
          >
            {s.label.toUpperCase()}
          </button>
        );
      })}

      <div
        className="absolute inset-x-0 bottom-0 z-10 border-t border-border/60 bg-background/80 px-4 py-3 backdrop-blur"
        data-testid="pipeline-detail"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
          {stage ? `${stage.label.toUpperCase()} — ${stage.nodes.join(" · ")}` : ""}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-mute">{stage ? stage.description : ""}</p>
      </div>
    </div>
  );
}
