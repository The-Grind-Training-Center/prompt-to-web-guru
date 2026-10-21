import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageMetadata } from "@/lib/pageMetadata";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const matches = document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  const tag = matches[0] ?? document.createElement("meta");
  tag.setAttribute(attribute, key);
  tag.content = content;
  if (!tag.parentNode) document.head.appendChild(tag);
  matches.forEach((match, index) => { if (index > 0) match.remove(); });
}

export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const page = pageMetadata[path] ?? {
      title: "Page Not Found | The Grind Training Center",
      description: "The requested page could not be found. Return to The Grind Training Center homepage.",
    };
    const url = `https://thegrindtrainingcenter.com${path}`;
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", url);
    const links = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    const canonical = links[0] ?? document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = url;
    if (!canonical.parentNode) document.head.appendChild(canonical);
    links.forEach((link, index) => { if (index > 0) link.remove(); });
  }, [pathname]);
  return null;
}