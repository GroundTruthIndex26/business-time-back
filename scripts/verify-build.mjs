/**
 * Asserts the built output is actually servable before it can reach production.
 *
 * This exists because of a real outage: Cloudflare Pages ran a build with no
 * build command, treated the repo root as the output directory, published an
 * empty directory, reported "success", and promoted it to the live domain. A
 * green build is not evidence that a site was produced — these checks are.
 */
import { readFile, stat } from "node:fs/promises";
import { resolve, dirname, join, relative } from "node:path";

const OUT = resolve("dist/public");
const failures = [];
const checks = [];

function ok(label) {
  checks.push(`  ok    ${label}`);
}
function fail(label, detail) {
  failures.push(`  FAIL  ${label}${detail ? `\n        ${detail}` : ""}`);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/** Routes that must each resolve to their own HTML page. */
const ROUTES = [
  "/",
  "/how-it-works/",
  "/business-time-back-vs-time-tracking/",
  "/faq/",
  "/about/",
  "/privacy/",
  "/terms/",
];

/** Files that must ship alongside the pages. */
const REQUIRED_FILES = [
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
  "og.png",
  "llms.txt",
  "llms-full.txt",
];

const pageFor = route => join(OUT, route.replace(/^\//, ""), "index.html");

// 1. The output directory must exist and hold a root index.html. An empty or
//    wrong output directory is the exact failure mode that caused the outage.
if (!(await exists(OUT))) {
  fail("dist/public exists", `${OUT} not found — did the build run?`);
} else if (!(await exists(join(OUT, "index.html")))) {
  fail("dist/public/index.html exists", "output directory has no root page");
} else {
  ok("output directory has a root index.html");
}

// 2. Every route renders its own page, with its own title.
const titles = new Map();
for (const route of ROUTES) {
  const file = pageFor(route);
  if (!(await exists(file))) {
    fail(`route ${route}`, `missing ${relative(OUT, file)}`);
    continue;
  }
  const html = await readFile(file, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const root = /<div id="root">/.test(html);
  if (!title) fail(`route ${route}`, "no <title>");
  else if (titles.has(title) && titles.get(title) !== route)
    fail(
      `route ${route}`,
      `shares its <title> with ${titles.get(title)} — per-page metadata did not apply`
    );
  else if (!root) fail(`route ${route}`, "no #root mount node");
  else {
    titles.set(title, route);
    ok(`route ${route} → "${title.slice(0, 48)}"`);
  }
}

// 3. Every asset each page references must resolve to a real file *from that
//    page's own directory*. Relative URLs at the wrong depth are why /privacy/
//    and /terms/ used to render blank.
for (const route of ROUTES) {
  const file = pageFor(route);
  if (!(await exists(file))) continue;
  const html = await readFile(file, "utf8");
  const refs = [
    ...html.matchAll(/(?:src|href)="((?!https?:|\/\/|mailto:|#)[^"]+)"/g),
  ].map(m => m[1]);
  if (refs.length === 0) {
    fail(`assets for ${route}`, "page references no local assets at all");
    continue;
  }
  let bad = 0;
  for (const ref of refs) {
    const target = resolve(dirname(file), ref.split(/[?#]/)[0]);
    if (!(await exists(target))) {
      fail(
        `asset for ${route}`,
        `"${ref}" resolves to ${relative(OUT, target)} which does not exist`
      );
      bad++;
    }
  }
  if (!bad) ok(`assets for ${route} (${refs.length} resolved)`);
}

// 4. Every route carries parseable JSON-LD, so structured data survives builds.
for (const route of ROUTES) {
  const file = pageFor(route);
  if (!(await exists(file))) continue;
  const html = await readFile(file, "utf8");
  const m = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  if (!m) {
    fail(`JSON-LD for ${route}`, "no application/ld+json script");
    continue;
  }
  try {
    JSON.parse(m[1]);
    ok(`JSON-LD for ${route} parses`);
  } catch (e) {
    fail(`JSON-LD for ${route}`, `does not parse: ${e.message}`);
  }
}

// 5. Supporting files.
for (const name of REQUIRED_FILES) {
  if (await exists(join(OUT, name))) ok(`${name} present`);
  else fail(`${name} present`, "missing from build output");
}

// 6. The sitemap must list every route, so routes and sitemap cannot drift.
if (await exists(join(OUT, "sitemap.xml"))) {
  const xml = await readFile(join(OUT, "sitemap.xml"), "utf8");
  const missing = ROUTES.filter(r => !xml.includes(`${r}</loc>`));
  if (missing.length)
    fail("sitemap covers every route", `missing: ${missing.join(", ")}`);
  else ok(`sitemap lists all ${ROUTES.length} routes`);
}

console.log(checks.join("\n"));
if (failures.length) {
  console.error(
    `\n${failures.length} check(s) failed:\n${failures.join("\n")}\n`
  );
  process.exit(1);
}
console.log(`\nAll ${checks.length} checks passed — build output is servable.`);
