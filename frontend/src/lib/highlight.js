function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const KEYWORDS = {
  python: "def|return|for|in|if|else|elif|import|from|with|as|lambda|None|True|False|class|while|try|except|raise|yield|not|and|or",
  sql: "SELECT|FROM|WHERE|GROUP BY|ORDER BY|JOIN|INNER|LEFT|ON|AS|SUM|COUNT|AVG|MIN|MAX|WITH|CASE|WHEN|THEN|END|DISTINCT|LIMIT|MERGE|INSERT|UPDATE|SET|DESC|ASC|AND|OR|NOT|NULL",
  toml: "scripts|project|name|version",
  yaml: "models|columns|tests|unique|not_null|accepted_values|values|name",
  text: "",
  common: "def|return|SELECT|FROM|WHERE|import|class|const|function",
};

export function highlightCode(code, lang) {
  const esc = escapeHtml(code);
  const store = [];
  const stash = (cls, text) => {
    store.push(`<span class="${cls}">${text}</span>`);
    return `\u0000${store.length - 1}\u0000`;
  };
  let out = esc
    .replace(/("[^"\n]*"|'[^'\n]*')/g, (m) => stash("tok-string", m))
    .replace(/(#[^\n]*|--[^\n]*|\/\/[^\n]*)/g, (m) => stash("tok-comment", m))
    .replace(/\b(\d+(?:\.\d+)?)\b/g, (m) => stash("tok-num", m));
  const kw = KEYWORDS[lang] !== undefined ? KEYWORDS[lang] : KEYWORDS.common;
  if (kw) {
    out = out.replace(new RegExp(`\\b(${kw})\\b`, "g"), (m) => stash("tok-kw", m));
  }
  for (let i = store.length - 1; i >= 0; i--) {
    out = out.split(`\u0000${i}\u0000`).join(store[i]);
  }
  return out;
}
