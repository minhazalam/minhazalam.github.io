import { useState } from "react";
import { Play, Database } from "lucide-react";
import { runSql } from "@/lib/miniSql";

const CUSTOMERS = [
  { id: 1, name: "Acme Corp", region: "EMEA", signup_year: 2023 },
  { id: 2, name: "Globex", region: "AMER", signup_year: 2022 },
  { id: 3, name: "Initech", region: "APAC", signup_year: 2024 },
  { id: 4, name: "Umbrella Ltd", region: "EMEA", signup_year: 2025 },
  { id: 5, name: "Stark Industries", region: "AMER", signup_year: 2021 },
  { id: 6, name: "Wayne Enterprises", region: "APAC", signup_year: 2023 },
];

const ORDERS = [
  { order_id: 1001, customer_id: 1, product: "laptop", revenue: 1200, status: "completed", order_date: "2025-11-02" },
  { order_id: 1002, customer_id: 2, product: "monitor", revenue: 350, status: "completed", order_date: "2025-11-02" },
  { order_id: 1003, customer_id: 3, product: "keyboard", revenue: 90, status: "refunded", order_date: "2025-11-03" },
  { order_id: 1004, customer_id: 1, product: "dock", revenue: 220, status: "completed", order_date: "2025-11-05" },
  { order_id: 1005, customer_id: 4, product: "laptop", revenue: 1450, status: "completed", order_date: "2025-11-05" },
  { order_id: 1006, customer_id: 5, product: "monitor", revenue: 410, status: "completed", order_date: "2025-11-08" },
  { order_id: 1007, customer_id: 6, product: "webcam", revenue: 120, status: "pending", order_date: "2025-11-09" },
  { order_id: 1008, customer_id: 2, product: "laptop", revenue: 980, status: "completed", order_date: "2025-11-11" },
  { order_id: 1009, customer_id: 3, product: "dock", revenue: 240, status: "completed", order_date: "2025-11-12" },
  { order_id: 1010, customer_id: 5, product: "keyboard", revenue: 110, status: "refunded", order_date: "2025-11-14" },
  { order_id: 1011, customer_id: 6, product: "monitor", revenue: 460, status: "completed", order_date: "2025-11-15" },
  { order_id: 1012, customer_id: 4, product: "webcam", revenue: 95, status: "pending", order_date: "2025-11-17" },
  { order_id: 1013, customer_id: 1, product: "monitor", revenue: 390, status: "completed", order_date: "2025-11-18" },
  { order_id: 1014, customer_id: 5, product: "laptop", revenue: 1350, status: "completed", order_date: "2025-11-20" },
  { order_id: 1015, customer_id: 2, product: "dock", revenue: 205, status: "completed", order_date: "2025-11-22" },
  { order_id: 1016, customer_id: 3, product: "laptop", revenue: 1120, status: "pending", order_date: "2025-11-24" },
];

const TABLES = { orders: ORDERS, customers: CUSTOMERS };

const PRESETS = [
  {
    id: "revenue-by-customer",
    label: "REVENUE BY CUSTOMER",
    sql: "SELECT customer_id, SUM(revenue) AS total_revenue\nFROM orders\nGROUP BY customer_id;",
  },
  {
    id: "big-orders",
    label: "BIG ORDERS",
    sql: "SELECT order_id, customer_id, product, revenue\nFROM orders\nWHERE revenue > 400\nORDER BY revenue DESC;",
  },
  {
    id: "revenue-by-region",
    label: "REVENUE BY REGION (JOIN)",
    sql: "SELECT c.region, SUM(o.revenue) AS total_revenue\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nGROUP BY c.region\nORDER BY total_revenue DESC;",
  },
  {
    id: "status-counts",
    label: "STATUS COUNTS",
    sql: "SELECT status, COUNT(*) AS order_count\nFROM orders\nGROUP BY status\nORDER BY order_count DESC;",
  },
  {
    id: "avg-by-product",
    label: "AVG ORDER BY PRODUCT",
    sql: "SELECT product, AVG(revenue) AS avg_revenue\nFROM orders\nGROUP BY product\nORDER BY avg_revenue DESC;",
  },
];

export default function SqlPlayground() {
  const [query, setQuery] = useState(PRESETS[0].sql);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [timing, setTiming] = useState(null);

  const execute = (sql) => {
    const t0 = performance.now();
    try {
      const res = runSql(sql, TABLES);
      setResult(res);
      setError(null);
    } catch (e) {
      setResult(null);
      setError(e.message);
    }
    setTiming(Math.max(1, Math.round(performance.now() - t0)));
  };

  return (
    <div className="rounded-xl border border-border bg-panel" data-testid="sql-playground">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-ink">
          <Database size={14} className="text-accent" /> SQL PLAYGROUND
        </span>
        <span className="font-mono text-[10px] tracking-wider text-mute/70">
          RUNS IN YOUR BROWSER — SAMPLE DATA ONLY
        </span>
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              data-testid={`sql-preset-${p.id}`}
              onClick={() => {
                setQuery(p.sql);
                execute(p.sql);
              }}
              className={`rounded border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
                query === p.sql
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-border text-mute hover:border-mute/50 hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={5}
          spellCheck={false}
          data-testid="sql-query-input"
          aria-label="SQL query"
          className="w-full resize-y rounded-lg border border-border bg-[#0b0e14] p-4 font-mono text-[13px] leading-relaxed text-[#c9d6ea] outline-none transition-colors focus:border-accent/50"
        />

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => execute(query)}
            data-testid="sql-run-btn"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-[#06121f] transition-all hover:brightness-110"
          >
            <Play size={13} /> RUN QUERY
          </button>
          {error ? (
            <p className="font-mono text-xs text-red-400" data-testid="sql-error">{error}</p>
          ) : result ? (
            <p className="font-mono text-xs text-mute" data-testid="sql-meta">
              {result.rows.length} ROWS{timing ? ` · ${timing} MS · BROWSER ENGINE` : ""}
            </p>
          ) : null}
        </div>

        {result && (
          <div className="mt-5 overflow-x-auto rounded-lg border border-border" data-testid="sql-results">
            <table className="w-full min-w-[480px] border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-panel2/60">
                  {result.columns.map((c) => (
                    <th key={c} className="px-4 py-2.5 text-left font-medium tracking-wider text-accent">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-panel2/40">
                    {result.columns.map((c) => (
                      <td key={c} className="px-4 py-2 text-[#c9d6ea]">
                        {typeof row[c] === "number" ? row[c].toLocaleString() : row[c] ?? "NULL"}
                      </td>
                    ))}
                  </tr>
                ))}
                {result.rows.length === 0 && (
                  <tr><td className="px-4 py-4 text-mute" colSpan={result.columns.length}>0 rows returned</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <details className="mt-5 rounded-lg border border-border">
          <summary className="cursor-pointer px-4 py-2.5 font-mono text-[10px] tracking-wider text-mute">
            VIEW SAMPLE DATA (ORDERS · CUSTOMERS)
          </summary>
          <div className="grid gap-4 p-4 md:grid-cols-2">
            <div className="overflow-x-auto">
              <p className="mb-2 font-mono text-[10px] text-accent">ORDERS ({ORDERS.length} rows)</p>
              <pre className="font-mono text-[10px] leading-relaxed text-mute">{`order_id | customer_id | product | revenue | status
         1001 | 1 | laptop  | 1200 | completed
         1002 | 2 | monitor |  350 | completed
         1003 | 3 | keyboard|   90 | refunded
         ...  | ... | ...   |  ... | ...`}</pre>
            </div>
            <div className="overflow-x-auto">
              <p className="mb-2 font-mono text-[10px] text-accent">CUSTOMERS ({CUSTOMERS.length} rows)</p>
              <pre className="font-mono text-[10px] leading-relaxed text-mute">{`id | name             | region | signup_year
1  | Acme Corp        | EMEA   | 2023
2  | Globex           | AMER   | 2022
3  | Initech          | APAC   | 2024
...`}</pre>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
