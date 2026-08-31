/**
 * Machine-readable views of the site, derived from site.ts so they can never
 * drift from the visible copy. Consumed at build time by
 * scripts/create-route-pages.mjs, which emits:
 *
 *   - a JSON-LD <script> per route (schemaFor)
 *   - /llms.txt        — a short orientation file for AI crawlers
 *   - /llms-full.txt   — the full text of every page, for crawlers that do
 *                        not execute JavaScript (most of them)
 *
 * Testimonials are deliberately excluded from every derived output.
 */
import {
  ABOUT_PAGE,
  BRAND,
  Block,
  ContentPage,
  FAQ_PAGE,
  HOME,
  HOW_IT_WORKS_PAGE,
  META,
  PRIVACY_PAGE,
  PageMeta,
  TERMS_PAGE,
  VS_TIME_TRACKING_PAGE,
} from "./site";

export { BRAND, META };

const LINKEDIN = "https://www.linkedin.com/company/business-time-back/";

/** Strip the tiny inline markup ([label](url), **bold**) down to plain text. */
const plain = (s: string): string =>
  s
    .replace(/\[([^\]]+)\]\(([^)]*)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");

/* ------------------------------------------------------------- JSON-LD */

const ORG_ID = `${BRAND.parentUrl}#organization`;
const SITE_ID = `${BRAND.origin}/#website`;
const APP_ID = `${BRAND.origin}/#software`;
const PERSON_ID = `${BRAND.origin}/about/#founder`;

type Node = Record<string, unknown>;

const organization: Node = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: BRAND.parent,
  alternateName: BRAND.parentShort,
  url: BRAND.parentUrl,
  email: BRAND.email,
  founder: { "@id": PERSON_ID },
};

const founder: Node = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Brooke Houck, PhD",
  jobTitle: "Founder",
  worksFor: { "@id": ORG_ID },
};

const website: Node = {
  "@type": "WebSite",
  "@id": SITE_ID,
  name: BRAND.name,
  url: `${BRAND.origin}/`,
  publisher: { "@id": ORG_ID },
};

const softwareApplication: Node = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${BRAND.origin}/`,
  image: BRAND.ogImage,
  description: META.home.description,
  creator: { "@id": ORG_ID },
  sameAs: [LINKEDIN],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "29",
    highPrice: "79",
    availability: "https://schema.org/PreOrder",
  },
};

/** Breadcrumb label per route, matching the visible breadcrumbs. */
const CRUMBS: Record<string, string> = {
  [META.howItWorks.path]: HOW_IT_WORKS_PAGE.crumb,
  [META.vsTimeTracking.path]: VS_TIME_TRACKING_PAGE.crumb,
  [META.faq.path]: FAQ_PAGE.crumb,
  [META.about.path]: ABOUT_PAGE.crumb,
  [META.privacy.path]: PRIVACY_PAGE.crumb,
  [META.terms.path]: TERMS_PAGE.crumb,
};

function breadcrumb(meta: PageMeta): Node {
  const items = [
    { name: BRAND.parentShort, item: BRAND.parentUrl },
    { name: BRAND.name, item: `${BRAND.origin}/` },
  ];
  if (meta.path !== "/")
    items.push({
      name: CRUMBS[meta.path] ?? meta.title,
      item: `${BRAND.origin}${meta.path}`,
    });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

function webPage(meta: PageMeta, type: string, extra: Node = {}): Node {
  const url = `${BRAND.origin}${meta.path}`;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": SITE_ID },
    breadcrumb: breadcrumb(meta),
    ...extra,
  };
}

function howToNode(): Node {
  const steps = HOW_IT_WORKS_PAGE.blocks.find(b => b.kind === "steps");
  const items = steps && steps.kind === "steps" ? steps.items : [];
  return {
    "@type": "HowTo",
    "@id": `${BRAND.origin}${META.howItWorks.path}#howto`,
    name: "See where your week goes and win hours back",
    description: META.howItWorks.description,
    step: items.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: plain(s.body),
    })),
  };
}

function faqNode(): Node[] {
  const faq = FAQ_PAGE.blocks.find(b => b.kind === "faq");
  const items = faq && faq.kind === "faq" ? faq.items : [];
  return items.map(i => ({
    "@type": "Question",
    name: plain(i.q),
    acceptedAnswer: { "@type": "Answer", text: plain(i.a) },
  }));
}

/** The JSON-LD @graph for one route. */
export function schemaFor(path: string): Node {
  const meta = Object.values(META).find(m => m.path === path);
  if (!meta) throw new Error(`schemaFor: unknown route ${path}`);

  const graph: Node[] = [organization, founder, website];

  if (path === META.home.path) {
    graph.push(
      softwareApplication,
      webPage(meta, "WebPage", { about: { "@id": APP_ID } })
    );
  } else if (path === META.howItWorks.path) {
    const howTo = howToNode();
    graph.push(
      webPage(meta, "WebPage", { mainEntity: { "@id": howTo["@id"] } }),
      howTo
    );
  } else if (path === META.faq.path) {
    graph.push(webPage(meta, "FAQPage", { mainEntity: faqNode() }));
  } else if (path === META.about.path) {
    graph.push(
      softwareApplication,
      webPage(meta, "AboutPage", { about: { "@id": ORG_ID } })
    );
  } else {
    graph.push(webPage(meta, "WebPage"));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* ------------------------------------------------------------- llms.txt */

function renderBlocks(blocks: Block[]): string {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.kind) {
      case "lead":
      case "p":
        out.push(plain(b.text));
        break;
      case "h2":
        out.push(`## ${plain(b.text)}`);
        break;
      case "h3":
        out.push(`### ${plain(b.text)}`);
        break;
      case "ul":
        out.push(b.items.map(i => `- ${plain(i)}`).join("\n"));
        break;
      case "steps":
        out.push(
          b.items
            .map((s, i) => `${i + 1}. ${s.title} — ${plain(s.body)}`)
            .join("\n")
        );
        break;
      case "table": {
        const clean = (s: string) => plain(s).replace(/\n/g, " ").trim();
        out.push(
          [
            b.head.map(clean).join(" | "),
            ...b.rows.map(r => r.map(clean).join(" | ")),
          ].join("\n")
        );
        break;
      }
      case "faq":
        out.push(
          b.items.map(i => `Q: ${plain(i.q)}\nA: ${plain(i.a)}`).join("\n\n")
        );
        break;
      case "cta":
        break;
    }
  }
  return out.join("\n\n");
}

function renderHome(): string {
  const h = HOME;
  const parts: string[] = [];
  parts.push(`# ${h.hero.title}`, plain(h.hero.sub));
  parts.push(`## ${h.what.heading}`, plain(h.what.lead), ...h.what.body.map(plain));
  parts.push(
    `## ${h.howItWorks.heading}`,
    h.howItWorks.cards
      .map((c, i) => `${i + 1}. ${c.title} — ${plain(c.body)}`)
      .join("\n"),
    plain(h.howItWorks.footnote)
  );
  parts.push(
    `## ${h.useCases.heading}`,
    plain(h.useCases.intro),
    h.useCases.items.map(i => `- ${i.title}: ${plain(i.body)}`).join("\n")
  );
  parts.push(
    `## ${h.limits.heading}`,
    h.limits.items.map(i => `- ${i.title} ${plain(i.body)}`).join("\n")
  );
  parts.push(
    `## ${h.comparison.heading}`,
    plain(h.comparison.intro),
    h.comparison.advice.map(a => `- ${a.title}: ${plain(a.body)}`).join("\n")
  );
  parts.push(
    `## Pricing (pre-launch)`,
    plain(h.pricing.ctaNote),
    h.pricing.plans
      .map(p =>
        "customPrice" in p && p.customPrice
          ? `- ${p.name}: ${p.customPrice} — ${p.desc}`
          : `- ${p.name}: ${"currency" in p ? p.currency : ""}${"amount" in p ? p.amount : ""}${"period" in p ? p.period : ""} — ${p.desc}`
      )
      .join("\n"),
    ...h.pricing.guarantee.body.map(plain)
  );
  parts.push(
    `## ${h.faq.heading}`,
    h.faq.items.map(i => `Q: ${plain(i.q)}\nA: ${plain(i.a)}`).join("\n\n")
  );
  parts.push(`## ${h.about.heading}`, ...h.about.body.map(plain));
  return parts.join("\n\n");
}

const PAGES: [PageMeta, ContentPage][] = [
  [META.howItWorks, HOW_IT_WORKS_PAGE],
  [META.vsTimeTracking, VS_TIME_TRACKING_PAGE],
  [META.faq, FAQ_PAGE],
  [META.about, ABOUT_PAGE],
  [META.privacy, PRIVACY_PAGE],
  [META.terms, TERMS_PAGE],
];

export function llmsTxt(): string {
  const pageLines = Object.values(META)
    .map(m => {
      const label = m.path === "/" ? "Home" : (CRUMBS[m.path] ?? m.title);
      return `- [${label}](${BRAND.origin}${m.path}): ${m.description}`;
    })
    .join("\n");

  return `# ${BRAND.name}

> ${META.home.description}

Business Time Back is a pre-launch time-intelligence tool from ${BRAND.parent} (${BRAND.parentUrl}) for small business owners. Key facts:

- Works from quick self-reported estimates by task (admin, inventory, customer service, marketing, fulfillment) — no activity tracking, keystroke logging, or screen monitoring.
- Estimates are directional: they identify and rank recoverable hours; they do not guarantee savings.
- Built by ${BRAND.parent}, a thought lab and idea incubator founded by Brooke Houck, PhD, on the same workforce model as ${BRAND.siblingProduct} (${BRAND.siblingProductUrl}).
- Not on sale yet: the pre-launch list gets 35% off at launch. Planned pricing: Starter $29/month, Professional $79/month, Enterprise custom.
- Contact: ${BRAND.email}

Note: this site is a JavaScript application; page HTML contains metadata but body text renders client-side. The full text of every page is in [llms-full.txt](${BRAND.origin}/llms-full.txt).

## Pages

${pageLines}

## Optional

- [LinkedIn](${LINKEDIN}): company page
- [Phronesis Labs](${BRAND.parentUrl}): the maker
`;
}

export function llmsFullTxt(): string {
  const sections = [
    `# ${BRAND.name} — full site text\n\n> ${META.home.description}\n\nSource: ${BRAND.origin}/ · ${BRAND.updated} · ${BRAND.copyright}`,
    `---\n\nPage: ${BRAND.origin}/\nTitle: ${META.home.title}\n\n${renderHome()}`,
    ...PAGES.map(
      ([meta, page]) =>
        `---\n\nPage: ${BRAND.origin}${meta.path}\nTitle: ${meta.title}\n\n# ${plain(page.h1)}\n\n${renderBlocks(page.blocks)}`
    ),
  ];
  return sections.join("\n\n") + "\n";
}
