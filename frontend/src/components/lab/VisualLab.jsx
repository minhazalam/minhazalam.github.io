import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

function BatchVisual() {
  return (
    <div className="flex h-44 items-center justify-center gap-5 rounded-lg border border-border bg-[#0b0e14] p-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative h-28 w-24 overflow-hidden rounded-lg border border-border bg-panel">
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-accent/25"
            animate={{ height: ["0%", "100%", "100%", "0%"] }}
            transition={{ duration: 4, times: [0, 0.45, 0.8, 1], repeat: Infinity, delay: i * 1.3, ease: "easeInOut" }}
          />
          <span className="absolute inset-x-0 top-2 text-center font-mono text-[9px] text-mute">WINDOW {i + 1}</span>
        </div>
      ))}
      <div className="flex h-28 w-24 items-center justify-center rounded-lg border border-accent/40 bg-accent/5">
        <span className="text-center font-mono text-[9px] leading-relaxed text-accent">JOB RUNS<br />WHEN FULL</span>
      </div>
    </div>
  );
}

function StreamingVisual() {
  return (
    <div className="relative h-44 overflow-hidden rounded-lg border border-border bg-[#0b0e14]">
      <span className="absolute left-4 top-4 font-mono text-[9px] text-mute">PRODUCER</span>
      <span className="absolute right-4 top-4 font-mono text-[9px] text-accent">ENGINE</span>
      <div className="absolute inset-x-8 top-1/2 h-px bg-border" />
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
          style={{ boxShadow: "0 0 8px rgba(77,159,255,0.8)" }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
        />
      ))}
      <span className="absolute bottom-3 left-4 font-mono text-[9px] text-mute/60">EVENTS PROCESSED ON ARRIVAL — NO WINDOW BOUNDARY</span>
    </div>
  );
}

function PartitioningVisual() {
  const parts = ["2025-01", "2025-02", "2025-03", "2025-04"];
  return (
    <div className="grid h-44 grid-cols-4 gap-3 rounded-lg border border-border bg-[#0b0e14] p-4">
      {parts.map((p, pi) => (
        <div key={p} className="relative rounded border border-border bg-panel">
          <span className="absolute inset-x-0 top-1.5 text-center font-mono text-[8px] text-mute">{p}</span>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 h-1 -translate-x-1/2 rounded bg-accent/50"
              style={{ top: `${28 + i * 14}px` }}
              animate={{ width: ["10%", "68%"], opacity: [0.2, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 2, delay: pi * 0.3 + i * 0.2, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkewVisual() {
  const [skewed, setSkewed] = useState(true);
  const widths = skewed ? [78, 10, 8, 4] : [25, 25, 25, 25];
  return (
    <div className="h-44 rounded-lg border border-border bg-[#0b0e14] p-4" data-testid="lab-visual-skew">
      <div className="mb-3 flex justify-end gap-2">
        {["normal", "skewed"].map((m) => (
          <button
            key={m}
            data-testid={`skew-toggle-${m}`}
            onClick={() => setSkewed(m === "skewed")}
            className={`rounded border px-3 py-1 font-mono text-[9px] tracking-wider transition-colors ${
              (m === "skewed") === skewed ? "border-accent/60 bg-accent/10 text-accent" : "border-border text-mute"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      {widths.map((w, i) => (
        <div key={i} className="mb-2 flex items-center gap-3">
          <span className="w-20 font-mono text-[9px] text-mute">PARTITION {i + 1}</span>
          <div className="h-4 flex-1 rounded bg-panel">
            <motion.div
              className={`h-full rounded ${skewed && i === 0 ? "bg-amber-400/70" : "bg-accent/50"}`}
              animate={{ width: `${w}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PipelineRow({ title, order }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[9px] text-mute">{title}</p>
      <div className="flex items-center gap-2">
        {order.map((s, i) => (
          <div key={s} className="relative flex-1 overflow-hidden rounded border border-border bg-panel px-2 py-2.5 text-center font-mono text-[10px] text-ink">
            {s}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-accent"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "linear" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ETLeltVisual() {
  return (
    <div className="flex h-44 flex-col justify-center gap-6 rounded-lg border border-border bg-[#0b0e14] p-4">
      <PipelineRow title="ETL — TRANSFORM IN PIPELINE" order={["EXTRACT", "TRANSFORM", "LOAD"]} />
      <PipelineRow title="ELT — TRANSFORM IN WAREHOUSE" order={["EXTRACT", "LOAD", "TRANSFORM"]} />
    </div>
  );
}

function LakeWhVisual() {
  const files = ["raw/*.parquet", "events/*.json", "scans/*.csv"];
  const tables = ["dim_customer", "fct_orders", "mart_revenue"];
  return (
    <div className="grid h-44 grid-cols-2 gap-3 rounded-lg border border-border bg-[#0b0e14] p-4">
      <div className="rounded border border-border bg-panel p-3">
        <p className="font-mono text-[9px] text-accent">DATA LAKE — S3</p>
        <div className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <motion.div
              key={f}
              className="rounded border border-border/70 px-2 py-1 font-mono text-[9px] text-mute"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded border border-border bg-panel p-3">
        <p className="font-mono text-[9px] text-accent">WAREHOUSE — SNOWFLAKE</p>
        <div className="mt-3 space-y-1.5">
          {tables.map((t, i) => (
            <motion.div
              key={t}
              className="rounded border border-accent/20 bg-accent/5 px-2 py-1 font-mono text-[9px] text-ink"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 + 0.3 }}
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QualityVisual() {
  return (
    <div className="relative h-44 overflow-hidden rounded-lg border border-border bg-[#0b0e14]">
      <div className="absolute right-8 top-1/2 h-28 w-px -translate-y-1/2 bg-accent/60" />
      <span className="absolute bottom-2 right-2 font-mono text-[8px] tracking-wider text-accent">QUALITY GATE</span>
      {[...Array(5)].map((_, i) => {
        const bad = i === 2;
        return (
          <motion.div
            key={i}
            className={`absolute flex h-5 w-28 items-center justify-between rounded px-1.5 font-mono text-[8px] ${
              bad ? "bg-red-500/15 text-red-400" : "bg-emerald-500/10 text-emerald-400"
            }`}
            style={{ top: `${16 + i * 21}px` }}
            animate={{ left: ["-30%", "105%"] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.9, ease: "linear" }}
          >
            <span>ROW {100 + i}</span>
            <span>{bad ? "FAIL → QUARANTINE" : "PASS"}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function ScdVisual() {
  const rows = [
    { v: "v1", city: "Berlin", from: "2023-01", to: "2024-06", current: false },
    { v: "v2", city: "Dublin", from: "2024-06", to: "NOW", current: true },
  ];
  return (
    <div className="h-44 rounded-lg border border-border bg-[#0b0e14] p-4">
      <p className="mb-3 font-mono text-[9px] text-mute">CUSTOMER-42 — CITY ATTRIBUTE OVER TIME (SCD TYPE 2)</p>
      {rows.map((r, i) => (
        <motion.div
          key={r.v}
          className="mb-2 flex items-center justify-between rounded border border-border bg-panel px-3 py-2.5"
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.25 }}
        >
          <span className="font-mono text-[10px] text-mute">
            {r.from} → {r.to}
          </span>
          <span className="font-mono text-[10px] text-ink">{r.city}</span>
          <span className={`font-mono text-[9px] ${r.current ? "text-accent" : "text-mute/50"}`}>
            {r.current ? "● IS_CURRENT" : "○ HISTORICAL"}
          </span>
        </motion.div>
      ))}
      <p className="mt-2 font-mono text-[9px] text-mute/60">JOINS CAN RECONSTRUCT POINT-IN-TIME STATE</p>
    </div>
  );
}

const VISUALS = {
  batch: BatchVisual,
  streaming: StreamingVisual,
  partitioning: PartitioningVisual,
  skew: SkewVisual,
  "etl-elt": ETLeltVisual,
  "lake-wh": LakeWhVisual,
  quality: QualityVisual,
  scd: ScdVisual,
};

export default function VisualLab({ topics }) {
  const [active, setActive] = useState(topics[0]?.id);
  const topic = topics.find((t) => t.id === active) || topics[0];
  if (!topic) return null;
  const Visual = VISUALS[topic.visual] || BatchVisual;

  return (
    <div className="rounded-xl border border-border bg-panel" data-testid="visual-lab">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-ink">
          <FlaskConical size={14} className="text-accent" /> HOW DATA SYSTEMS WORK
        </span>
        <span className="font-mono text-[10px] tracking-wider text-mute/70">SELECT A CONCEPT</span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border p-5">
        {topics.map((t) => (
          <button
            key={t.id}
            data-testid={`lab-topic-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
              active === t.id
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-border text-mute hover:border-mute/50 hover:text-ink"
            }`}
          >
            {t.title.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="p-5">
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-mute">{topic.intro}</p>
        <Visual />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {topic.sections.map((s) => (
            <div key={s.h}>
              <p className="font-mono text-[10px] tracking-[0.18em] text-accent">{s.h.toUpperCase()}</p>
              <ul className="mt-2 space-y-2">
                {s.b.map((b, j) => (
                  <li key={j} className="text-xs leading-relaxed text-mute">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
