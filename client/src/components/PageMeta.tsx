/**
 * Keeps <title>, the meta description and the canonical URL in sync during
 * client-side navigation. The pre-rendered value in each route's index.html is
 * what crawlers and social unfurlers read; this keeps the SPA honest afterwards.
 */
import { useEffect } from "react";
import { BRAND, PageMeta as Meta } from "@/content/site";

function setMeta(
  selector: string,
  create: () => HTMLElement,
  value: string,
  attr = "content"
) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function PageMeta({ meta }: { meta: Meta }) {
  useEffect(() => {
    document.title = meta.title;

    setMeta(
      'meta[name="description"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "description");
        return el;
      },
      meta.description
    );

    setMeta(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      },
      `${BRAND.origin}${meta.path}`,
      "href"
    );

    setMeta(
      'meta[property="og:title"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:title");
        return el;
      },
      meta.title
    );

    setMeta(
      'meta[property="og:description"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:description");
        return el;
      },
      meta.description
    );

    setMeta(
      'meta[property="og:url"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:url");
        return el;
      },
      `${BRAND.origin}${meta.path}`
    );
  }, [meta]);

  return null;
}
