import { useEffect } from "react";

function setMeta(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:title", title || document.title);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:title", title || document.title);
      setMeta("name", "twitter:description", description);
    }
    if (path !== undefined) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", window.location.origin + path);
    }
  }, [title, description, path]);
}
