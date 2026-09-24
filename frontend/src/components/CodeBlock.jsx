import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { highlightCode } from "@/lib/highlight";

export default function CodeBlock({ code, lang = "text", title }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[#0b0e14]" data-testid="code-block">
      <div className="flex items-center justify-between border-b border-border bg-panel px-4 py-2">
        <span className="font-mono text-[11px] text-mute">{title || lang.toUpperCase()}</span>
        <button
          onClick={copy}
          data-testid="copy-code-btn"
          className="flex items-center gap-1.5 font-mono text-[11px] text-mute transition-colors hover:text-accent"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#c9d6ea]">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }} />
      </pre>
    </div>
  );
}
