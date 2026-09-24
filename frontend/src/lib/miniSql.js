const AGGS = { SUM: "sum", COUNT: "count", AVG: "avg", MIN: "min", MAX: "max" };
const RESERVED = new Set([
  "WHERE", "GROUP", "ORDER", "LIMIT", "JOIN", "INNER", "LEFT", "ON", "AND",
  "OR", "AS", "BY", "HAVING", "DESC", "ASC",
]);

function tokenize(sql) {
  return sql.match(/'[^']*'|"[^"]*"|[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?|>=|<=|!=|<>|=|<|>|\*|,|\(|\)|\./g) || [];
}

function parseVal(t) {
  if (t == null) throw new Error("Incomplete condition");
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
  if (/^'.*'$/.test(t) || /^".*"$/.test(t)) return t.slice(1, -1);
  return t;
}

function stripPrefix(col) {
  return col.includes(".") ? col.split(".")[1] : col;
}

// Minimal SQL engine for the playground: SELECT [cols|aggs] FROM t [JOIN j ON a=b] [WHERE ...] [GROUP BY ...] [ORDER BY ...] [LIMIT n]
export function runSql(sql, tables) {
  const cleaned = sql.trim().replace(/;+\s*$/, "");
  if (!cleaned) throw new Error("Write a query first.");
  if (!/^select\s/i.test(cleaned)) throw new Error("Only SELECT queries are supported in this playground.");
  const tokens = tokenize(cleaned);
  let i = 0;
  const up = (s) => (s || "").toUpperCase();
  const peek = (k = 0) => tokens[i + k];
  const eat = (t) => { if (up(tokens[i]) === up(t)) { i++; return true; } return false; };
  const expect = (t) => { if (!eat(t)) throw new Error(`Expected ${t} near "${tokens[i] || "end"}"`); };
  const readName = () => {
    const t = tokens[i++];
    if (t == null) throw new Error("Unexpected end of query");
    if (tokens[i] === ".") i += 2;
    return t;
  };
  const readCol = () => {
    const t = tokens[i++];
    if (t == null) throw new Error("Unexpected end of query");
    if (tokens[i] === ".") { i += 1; return tokens[i++]; }
    return t;
  };

  eat("SELECT");
  const selectList = [];
  while (true) {
    if (peek() === "*") { i++; selectList.push({ type: "star" }); }
    else if (AGGS[up(peek())]) {
      const fnName = up(peek()); i++;
      expect("(");
      const arg = peek() === "*" ? (i++, null) : readCol();
      expect(")");
      let alias = null;
      if (eat("AS")) alias = tokens[i++];
      selectList.push({ type: "agg", fn: AGGS[fnName], arg, alias: alias || `${fnName.toLowerCase()}(${arg || "*"})` });
    } else if (typeof peek() === "string" && !RESERVED.has(up(peek()))) {
      const name = readCol();
      let alias = null;
      if (eat("AS")) alias = tokens[i++];
      selectList.push({ type: "col", name, alias: alias || name });
    } else throw new Error(`Couldn't parse select list near "${peek()}"`);
    if (!eat(",")) break;
  }

  expect("FROM");
  const tableName = tokens[i++];
  let alias = null;
  if (typeof peek() === "string" && !RESERVED.has(up(peek()))) alias = tokens[i++];
  const aliasMap = { [alias || tableName]: tableName };

  const joins = [];
  while (up(peek()) === "INNER" || up(peek()) === "JOIN") {
    if (up(peek()) === "INNER") { i++; }
    if (!eat("JOIN")) throw new Error("Expected JOIN");
    const jTable = tokens[i++];
    let jAlias = null;
    if (typeof peek() === "string" && !RESERVED.has(up(peek()))) jAlias = tokens[i++];
    expect("ON");
    const l = readCol();
    expect("=");
    const r = readCol();
    aliasMap[jAlias || jTable] = jTable;
    joins.push({ table: jTable, left: l, right: r });
  }

  const conds = [];
  if (eat("WHERE")) {
    while (true) {
      const col = readCol();
      const op = tokens[i++];
      const val = parseVal(tokens[i++]);
      if (!["=", "!=", "<>", "<", ">", "<=", ">="].includes(op)) throw new Error(`Unsupported operator "${op}"`);
      conds.push({ col, op, val });
      if (!eat("AND")) break;
    }
  }

  const groupBy = [];
  if (eat("GROUP")) {
    expect("BY");
    while (true) { groupBy.push(stripPrefix(tokens[i++])); if (!eat(",")) break; }
  }

  let orderBy = null;
  if (eat("ORDER")) {
    expect("BY");
    const col = tokens[i++];
    const dir = up(peek()) === "DESC" || up(peek()) === "ASC" ? (tokens[i++], up(tokens[i - 1])) : "ASC";
    orderBy = { col: stripPrefix(col), dir };
  }

  let limit = null;
  if (eat("LIMIT")) limit = Number(tokens[i++]);

  for (const t of [tableName, ...joins.map((j) => j.table)]) {
    if (!tables[t]) throw new Error(`Unknown table "${t}". Available: ${Object.keys(tables).join(", ")}`);
  }

  const resolve = (name) => tables[aliasMap[name] || name] || tables[name];
  let rows = resolve(tableName).map((r) => ({ ...r }));
  for (const j of joins) {
    const right = resolve(j.table);
    const merged = [];
    for (const a of rows) {
      for (const b of right) {
        const av = a[stripPrefix(j.left)] ?? a[j.left];
        const bv = b[stripPrefix(j.right)] ?? b[j.right];
        if (av === bv) merged.push({ ...a, ...b });
      }
    }
    rows = merged;
  }

  const get = (row, col) => row[stripPrefix(col)] ?? row[col];
  const filtered = rows.filter((r) => conds.every((c) => {
    const v = get(r, c.col);
    switch (c.op) {
      case "=": return v === c.val;
      case "!=": case "<>": return v !== c.val;
      case "<": return v < c.val;
      case ">": return v > c.val;
      case "<=": return v <= c.val;
      case ">=": return v >= c.val;
      default: return false;
    }
  }));

  const hasAgg = selectList.some((s) => s.type === "agg");
  let outRows;
  if (hasAgg || groupBy.length) {
    const groups = new Map();
    for (const r of filtered) {
      const key = JSON.stringify(groupBy.map((g) => get(r, g)));
      if (!groups.has(key)) groups.set(key, { keys: groupBy.map((g) => get(r, g)), rows: [] });
      groups.get(key).rows.push(r);
    }
    if (!groupBy.length && groups.size === 0) groups.set("[]", { keys: [], rows: filtered });
    outRows = [...groups.values()].map((g) => {
      const o = {};
      groupBy.forEach((col, idx) => { o[col] = g.keys[idx]; });
      for (const s of selectList) {
        if (s.type !== "agg") continue;
        const vals = s.arg == null ? g.rows.map(() => 1) : g.rows.map((r) => get(r, s.arg)).filter((v) => v != null);
        const n = vals.length;
        switch (s.fn) {
          case "sum": o[s.alias] = vals.reduce((a, b) => a + Number(b), 0); break;
          case "count": o[s.alias] = s.arg == null ? g.rows.length : n; break;
          case "avg": o[s.alias] = n ? vals.reduce((a, b) => a + Number(b), 0) / n : null; break;
          case "min": o[s.alias] = n ? Math.min(...vals.map(Number)) : null; break;
          case "max": o[s.alias] = n ? Math.max(...vals.map(Number)) : null; break;
          default: break;
        }
        if (typeof o[s.alias] === "number") o[s.alias] = Math.round(o[s.alias] * 100) / 100;
      }
      return o;
    });
  } else {
    outRows = filtered.map((r) => {
      if (selectList[0]?.type === "star") return { ...r };
      const o = {};
      for (const s of selectList) o[s.alias] = get(r, s.name);
      return o;
    });
  }

  const columns = selectList[0]?.type === "star"
    ? Object.keys(outRows[0] || {})
    : selectList.map((s) => s.alias);

  if (orderBy) {
    outRows.sort((a, b) => {
      const av = a[orderBy.col] ?? a[Object.keys(a)[0]];
      const bv = b[orderBy.col] ?? b[Object.keys(b)[0]];
      if (av === bv) return 0;
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return orderBy.dir === "DESC" ? -cmp : cmp;
    });
  }
  if (limit != null) outRows = outRows.slice(0, limit);
  if (groupBy.length) {
    const cols = [...groupBy, ...selectList.filter((s) => s.type === "agg").map((s) => s.alias)];
    return { columns: cols, rows: outRows.map((r) => { const o = {}; cols.forEach((c) => (o[c] = r[c])); return o; }) };
  }
  return { columns, rows: outRows };
}
