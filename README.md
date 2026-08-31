# Business Time Back

The businesstimeback.com marketing site, built from this repo.

## Pages

| Route                                   | Source                                                         |
| --------------------------------------- | -------------------------------------------------------------- |
| `/`                                     | `client/src/pages/Home.tsx` (+ the demo in `client/src/demo/`) |
| `/how-it-works/`                        | `client/src/pages/HowItWorks.tsx`                              |
| `/business-time-back-vs-time-tracking/` | `client/src/pages/VsTimeTracking.tsx`                          |
| `/faq/`                                 | `client/src/pages/Faq.tsx`                                     |
| `/about/`                               | `client/src/pages/About.tsx`                                   |
| `/privacy/`                             | `client/src/pages/Privacy.tsx`                                 |
| `/terms/`                               | `client/src/pages/Terms.tsx`                                   |

## Editing copy

**All site copy lives in [`client/src/content/site.ts`](client/src/content/site.ts)** — headlines, body text,
pricing, FAQs, legal sections, nav labels, and per-page `<title>`/description. The
page components only lay it out, so changing wording (or the target customer)
means editing that one file.

Copy supports a tiny inline markup, rendered by `components/Rich.tsx`:

```
[label](/path)   → link (internal links route client-side)
**bold**         → <strong>
```

## Styling

Two stylesheets, each scoped to a body class so they cannot collide:

- `client/src/styles/home.css` → `body.page-home` — the landing page and demo
- `client/src/styles/site.css` → `body.page-doc` — every other page
- `client/src/styles/base.css` — the global shell and web fonts

Both stylesheets were ported from the live site and are listed in
`.prettierignore` so they stay diffable against that source.

## Build

```bash
pnpm install
pnpm dev      # local dev server
pnpm check    # typecheck
pnpm build    # production build into dist/public
```

`pnpm build` runs Vite and then [`scripts/create-route-pages.mjs`](scripts/create-route-pages.mjs),
which emits a real `index.html` per route. That script also **rewrites relative
asset URLs to the right directory depth** — without it, a page served from
`/privacy/` requests `/privacy/assets/…` and renders blank. It generates
`sitemap.xml` from the same route table, so routes and sitemap cannot drift.

Unknown paths are served `client/public/404.html`, which hands the original path
to the SPA via `?p=` and renders the in-app 404.

## Lead capture

The pre-launch form on the landing page posts to the Supabase `emails` table via
`client/src/lib/leadCapture.ts`, matching the live site so existing and new leads
land in one place. The key in that file is a Supabase _publishable_ key; access is
governed by row-level security on the table.

A separate, more locked-down path exists in `supabase/functions/launch-waitlist`
(server-side insert, no key in the browser) against project `wmpttwpkybynwisdsljl`.
It is not currently wired to the form. To switch to it, point `captureLead` at the
function URL and migrate the existing `emails` rows.

## Deployment

Push to `main` to build and deploy through GitHub Pages (`github-pages` environment).

Note: `businesstimeback.com` currently resolves to Cloudflare, not GitHub Pages, so
a push publishes to `groundtruthindex26.github.io/business-time-back/` rather than
the custom domain. Point the domain's DNS at GitHub Pages (or deploy `dist/public`
to Cloudflare) for this repo to serve the live site.
