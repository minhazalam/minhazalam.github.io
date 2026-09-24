import { useState } from "react";
import { motion } from "framer-motion";
import { Braces, ArrowRight } from "lucide-react";
import CodeBlock from "../CodeBlock";

const ORDERS = [
  { order_id: 1001, customer_id: 1, product: "laptop", revenue: 1200, status: "completed" },
  { order_id: 1002, customer_id: 2, product: "monitor", revenue: 350, status: "completed" },
  { order_id: 1003, customer_id: 3, product: "keyboard", revenue: 90, status: "refunded" },
  { order_id: 1004, customer_id: 1, product: "dock", revenue: 220, status: "completed" },
  { order_id: 1005, customer_id: 4, product: "laptop", revenue: 1450, status: "completed" },
  { order_id: 1006, customer_id: 5, product: "monitor", revenue: 410, status: "completed" },
  { order_id: 1007, customer_id: 6, product: "webcam", revenue: 120, status: "pending" },
  { order_id: 1008, customer_id: 2, product: "laptop", revenue: 980, status: "completed" },
];

const CUSTOMERS = [
  { customer_id: 1, name: "Acme Corp" },
  { customer_id: 2, name: "Globex" },
  { customer_id: 3, name: "Initech" },
  { customer_id: 4, name: "Umbrella Ltd" },
];

const TRANSFORMS = [
  {
    id: "agg",
    label: "GROUPBY + AGG",
    code: 'df.groupBy("customer_id") \\\n  .agg(sum("revenue").alias("total_revenue"))',
    output: () => {
      const m = new Map();
      ORDERS.forEach((o) => m.set(o.customer_id, (m.get(o.customer_id) || 0) + o.revenue));
      return { columns: ["customer_id", "total_revenue"], rows: [...m.entries()].map(([k, v]) => ({ customer_id: k, total_revenue: v })) };
    },
  },
  {
    id: "filter",
    label: "FILTER",
    code: 'df.filter(col("revenue") > 400)',
    output: () => ({ columns: Object.keys(ORDERS[0]), rows: ORDERS.filter((o) => o.revenue > 400) }),
  },
  {
    id: "withcolumn",
    label: "WITHCOLUMN",
    code: 'df.withColumn("revenue_k", round(col("revenue") / 1000, 1))',
    output: () => ({
      columns: ["order_id", "revenue", "revenue_k"],
      rows: ORDERS.map((o) => ({ order_id: o.order_id, revenue: o.revenue, revenue_k: Math.round((o.revenue / 1000) * 10) / 10 })),
    }),
  },
  {
    id: "join",
    label: "JOIN",
    code: 'df.join(customers, "customer_id") \\\n  .select("customer_id", "name", "revenue")',
    output: () => ({
      columns: ["customer_id", "name", "revenue"],
      rows: ORDERS.map((o) => {
        const c = CUSTOMERS.find((x) => x.customer_id === o.customer_id);
        return { customer_id: o.customer_id, name: c ? c.name : "—", revenue: o.revenue };
      }),
    }),
  },
  {
    id: "sort",
    label: "ORDERBY + LIMIT",
    code: 'df.orderBy(desc("revenue")).limit(5)',
    output: () => ({
      columns: ["order_id", "customer_id", "revenue"],
      rows: [...ORDERS].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((o) => ({ order_id: o.order_id, customer_id: o.customer_id, revenue: o.revenue })),
    }),
  },
];

function Table({ columns, rows, testId, title }) {
  return (
    <div className="min-w-0 flex-1 rounded-lg border border-border bg-[#0b0e14]" data-testid={testId}>
      <p className="border-b border-border px-4 py-2 font-mono text-[10px] tracking-wider text-mute">{title}</p>
      <div className="max-h-64 overflow-auto">
        <table className="w-full border-collapse font-mono text-[11px]">
          <thead>
            <tr className="border-b border-border">
              {columns.map((c) => (
                <th key={c} className="px-3 py-2 text-left font-medium text-accent">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/30 last:border-0">
                {columns.map((c) => (
                  <td key={c} className="whitespace-nowrap px-3 py-1.5 text-[#c9d6ea]">{r[c]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PysparkDemo() {
  const [idx, setIdx] = useState(0);
  const t = TRANSFORMS[idx];
  const out = t.output();

  return (
    <div className="rounded-xl border border-border bg-panel" data-testid="pyspark-demo">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-ink">
          <Braces size={14} className="text-accent" /> PYSPARK DEMO
        </span>
        <span className="font-mono text-[10px] tracking-wider text-mute/70">
          INPUT → TRANSFORMATION → OUTPUT
        </span>
      </div>

      <div className="p-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {TRANSFORMS.map((tr, i) => (
            <button
              key={tr.id}
              data-testid={`pyspark-transform-${tr.id}`}
              onClick={() => setIdx(i)}
              className={`rounded border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
                idx === i
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-border text-mute hover:border-mute/50 hover:text-ink"
              }`}
            >
              {tr.label}
            </button>
          ))}
        </div>

        <CodeBlock code={t.code} lang="python" title={`transformation_${t.id}.py`} />

        <div className="mt-5 flex flex-col items-stretch gap-4 md:flex-row md:items-start">
          <Table
            columns={Object.keys(ORDERS[0])}
            rows={ORDERS}
            testId="pyspark-input-table"
            title="INPUT — df (orders)"
          />
          <div className="flex items-center justify-center py-2 md:py-12">
            <ArrowRight size={18} className="text-accent" />
          </div>
          <motion.div key={t.id} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-w-0 flex-1">
            <Table columns={out.columns} rows={out.rows} testId="pyspark-output-table" title="OUTPUT — result" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
