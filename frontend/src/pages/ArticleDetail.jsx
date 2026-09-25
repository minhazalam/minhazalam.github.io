import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import CodeBlock from "@/components/CodeBlock";
import NotFound from "./NotFound";

const NOTES_REPO = "https://github.com/minhazalam/data-engineering-interview-prep";
const PUBLIC_ROOT = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

function safeHref(href) {
  if (/^(https?:|mailto:|#)/i.test(href)) return href;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  return null;
}

function inlineParts(text) {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={index} className="note-inline-code">{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = safeHref(link[2]);
      return href ? <a key={index} href={href} className="text-accent underline decoration-accent/40 underline-offset-4 hover:text-ink" rel={href.startsWith("http") ? "noreferrer" : undefined} target={href.startsWith("http") ? "_blank" : undefined}>{link[1]}</a> : link[1];
    }
    return part;
  });
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function MarkdownContent({ source }) {
  const lines = source.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "").split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }

    const fence = line.match(/^\s*```([\w+-]*)\s*$/);
    if (fence) {
      const code = [];
      i += 1;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) code.push(lines[i++]);
      if (i < lines.length) i += 1;
      blocks.push({ type: "code", lang: fence[1] || "text", text: code.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) { blocks.push({ type: "heading", level: Math.min(heading[1].length, 4), text: heading[2] }); i += 1; continue; }
    if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) { blocks.push({ type: "rule" }); i += 1; continue; }

    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const header = splitTableRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|")) rows.push(splitTableRow(lines[i++]));
      blocks.push({ type: "table", header, rows });
      continue;
    }

    const listMatch = line.match(/^\s*([-*+]|\d+[.)])\s+(.+)$/);
    if (listMatch) {
      const ordered = /^\d/.test(listMatch[1]);
      const items = [];
      while (i < lines.length) {
        const item = lines[i].match(/^\s*([-*+]|\d+[.)])\s+(.+)$/);
        if (!item || /^\d/.test(item[1]) !== ordered) break;
        items.push(item[2]);
        i += 1;
      }
      blocks.push({ type: ordered ? "ordered" : "list", items });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }

    const paragraph = [line.trim()];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*```|\s*>|\s*([-*+]|\d+[.)])\s|\s*(---+|\*\*\*+|___+)\s*$)/.test(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return (
    <div className="note-prose">
      {blocks.map((block, index) => {
        if (block.type === "code") return <CodeBlock key={index} code={block.text} lang={block.lang} title={block.lang.toUpperCase()} />;
        if (block.type === "heading") {
          const Tag = `h${Math.min(block.level + 1, 6)}`;
          return <Tag key={index} className="note-heading">{inlineParts(block.text)}</Tag>;
        }
        if (block.type === "rule") return <hr key={index} className="border-border" />;
        if (block.type === "quote") return <blockquote key={index} className="note-quote">{inlineParts(block.text)}</blockquote>;
        if (block.type === "list" || block.type === "ordered") {
          const Tag = block.type === "ordered" ? "ol" : "ul";
          return <Tag key={index} className="note-list">{block.items.map((item, itemIndex) => <li key={itemIndex}>{inlineParts(item)}</li>)}</Tag>;
        }
        if (block.type === "table") return (
          <div key={index} className="note-table-wrap"><table className="note-table">
            <thead><tr>{block.header.map((cell, cellIndex) => <th key={cellIndex}>{inlineParts(cell)}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{block.header.map((_, cellIndex) => <td key={cellIndex}>{inlineParts(row[cellIndex] || "")}</td>)}</tr>)}</tbody>
          </table></div>
        );
        return <p key={index}>{inlineParts(block.text)}</p>;
      })}
    </div>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const { content } = useContent();
  const article = content.writing.articles.find((item) => item.slug === slug);
  const [markdown, setMarkdown] = useState("");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!article) return undefined;
    const controller = new AbortController();
    setMarkdown("");
    setLoadError(false);
    fetch(`${PUBLIC_ROOT}/writing/${article.slug}.md`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Note unavailable"); return response.text(); })
      .then(setMarkdown)
      .catch((error) => { if (error.name !== "AbortError") setLoadError(true); });
    return () => controller.abort();
  }, [article]);

  usePageMeta({
    title: article ? `${article.title} — Minhaz Alam` : "Note — Minhaz Alam",
    description: article?.summary || "A data engineering note by Minhaz Alam.",
    path: `/writing/${slug}`,
  });

  if (!article) return <NotFound />;

  const sourceUrl = `${NOTES_REPO}/blob/main/${article.sourceFile}`;
  return (
    <main className="mx-auto min-h-[70vh] max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <Link to="/writing" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-mute hover:text-accent"><ArrowLeft size={13} /> ALL NOTES</Link>
      <header className="mb-10 mt-8 border-b border-border pb-8">
        <div className="flex flex-wrap gap-3 font-mono text-[10px] tracking-wider text-mute">
          {article.topic && <span className="text-accent">{article.topic.toUpperCase()}</span>}
          {article.date && <time dateTime={article.date}>{article.date}</time>}
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">{article.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute">{article.summary}</p>
      </header>

      {loadError ? (
        <div className="border-y border-border py-6">
          <p className="text-sm text-mute">This note could not be loaded from the portfolio build.</p>
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-accent">OPEN SOURCE NOTE <ArrowUpRight size={13} /></a>
        </div>
      ) : markdown ? <MarkdownContent source={markdown} /> : <p className="font-mono text-[10px] tracking-wider text-mute">LOADING NOTE…</p>}

      <a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-14 inline-flex items-center gap-2 border-t border-border pt-5 font-mono text-[10px] tracking-wider text-mute hover:text-accent">
        VIEW SOURCE IN GITHUB <ArrowUpRight size={13} />
      </a>
    </main>
  );
}
