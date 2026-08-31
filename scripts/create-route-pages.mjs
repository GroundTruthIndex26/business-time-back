/**
 * Emits a real HTML page for every route.
 *
 * Vite builds one index.html with relative asset URLs ("./assets/app.js"). A route
 * served from /privacy/ would resolve those to /privacy/assets/... and 404, which
 * is why the legal pages used to render blank. Each copy therefore gets its asset
 * URLs rewritten to the right depth, plus its own title/description/canonical so
 * the page is correct before React boots.
 */
import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const OUT = resolve("dist/public");

/** Compile the TS content module so routes and copy have a single source of truth. */
async function loadMeta() {
  const tmp = resolve("dist/.meta.mjs");
  await build({
    entryPoints: [resolve("client/src/content/site.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: tmp,
    logLevel: "silent",
  });
  const mod = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`);
  await rm(tmp, { force: true });
  return { META: mod.META, BRAND: mod.BRAND };
}

const escape = s =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Swap the content of a tag/attribute that already exists in the shell. */
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html))
    throw new Error(`Shell is missing an expected tag: ${pattern}`);
  return html.replace(pattern, replacement);
}

function pageHtml(shell, meta, brand, depth) {
  let html = shell;

  // 1. Re-point relative asset URLs at the right directory depth.
  if (depth > 0) {
    const up = "../".repeat(depth);
    html = html.replace(
      /(src|href)="\.\/([^"]+)"/g,
      (_m, attr, path) => `${attr}="${up}${path}"`
    );
  }

  const url = `${brand.origin}${meta.path}`;
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escape(meta.title)}</title>`
  );
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${escape(meta.description)}" />`
  );
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:title" content="${escape(meta.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:description" content="${escape(meta.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`
  );

  // 2. Stamp the stylesheet scope so the page paints correctly before React mounts.
  const bodyClass = meta.path === "/" ? "page-home" : "page-doc";
  html = replaceTag(
    html,
    /<body class="[^"]*">/,
    `<body class="${bodyClass}">`
  );

  return html;
}

const { META, BRAND } = await loadMeta();
const shell = await readFile(resolve(OUT, "index.html"), "utf8");
const routes = Object.values(META);

for (const meta of routes) {
  const segments = meta.path.split("/").filter(Boolean);
  const html = pageHtml(shell, meta, BRAND, segments.length);
  if (segments.length === 0) {
    await writeFile(resolve(OUT, "index.html"), html);
  } else {
    const dir = resolve(OUT, ...segments);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), html);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(m => `  <url><loc>${BRAND.origin}${m.path}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(OUT, "sitemap.xml"), sitemap);

console.log(`Emitted ${routes.length} route pages + sitemap.xml`);
for (const m of routes) console.log(`  ${m.path}`);
