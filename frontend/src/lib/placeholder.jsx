export function ph(text) {
  const parts = String(text).split(/(\[[^\]]+\])/g);
  return parts.map((p, i) =>
    p.startsWith("[") && p.endsWith("]") ? (
      <span key={i} className="text-amber-400/80">{p}</span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
