import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlock from "./CodeBlock";

const block = (label, text) => (
  <div>
    <p className="font-mono text-[10px] tracking-[0.2em] text-accent">{label}</p>
    <p className="mt-1.5 text-sm leading-relaxed text-mute">{text}</p>
  </div>
);

export default function ArchitectureViewer({ nodes, testPrefix = "arch" }) {
  const [sel, setSel] = useState(nodes[0]?.id);
  const node = nodes.find((n) => n.id === sel) || nodes[0];
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[290px_1fr]" data-testid={`${testPrefix}-viewer`}>
      <div className="min-w-0">
        {nodes.map((n, i) => (
          <div key={n.id}>
            <button
              onClick={() => setSel(n.id)}
              data-testid={`${testPrefix}-node-${n.id}`}
              className={`w-full rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
                sel === n.id
                  ? "border-accent/60 bg-accent/5"
                  : "border-border bg-panel hover:border-mute/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${sel === n.id ? "bg-accent" : "bg-mute/40"}`} />
                <span className={`font-mono text-[13px] ${sel === n.id ? "text-ink" : "text-mute"}`}>
                  {n.label}
                </span>
              </div>
            </button>
            {i < nodes.length - 1 && (
              <div className="relative ml-[27px] h-5 w-px bg-border">
                <motion.span
                  className="absolute -left-[2.5px] h-1.5 w-1.5 rounded-full bg-accent/70"
                  animate={{ top: ["0%", "85%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-panel p-6 md:p-8" data-testid={`${testPrefix}-detail`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mb-2 font-mono text-[11px] tracking-[0.25em] text-accent">
              COMPONENT — {node.label.toUpperCase()}
            </p>
            <p className="text-[15px] leading-relaxed text-ink">{node.description}</p>
            <div className="mt-7 space-y-6">
              {block(`WHY ${node.label.toUpperCase()}?`, node.why)}
              {block("ALTERNATIVES CONSIDERED", node.alternatives)}
              {block("TRADEOFFS", node.tradeoffs)}
              {node.code ? <CodeBlock code={node.code} lang="python" title={`${node.label.toLowerCase().replace(/\s+/g, "-")}.py`} /> : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
