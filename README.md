# Business Time Back

The public, static GitHub Pages preview of Business Time Back.

## Waitlist architecture

The public waitlist form calls the Supabase Edge Function `launch-waitlist`; it never includes a Supabase service key in browser code.

Before the first function deployment, add a repository Actions secret named `SUPABASE_ACCESS_TOKEN`. Create a Supabase personal access token with permission to deploy Edge Functions for project `wmpttwpkybynwisdsljl`, then add it at **GitHub repository → Settings → Secrets and variables → Actions**. Pushing changes under `supabase/` will deploy the function.

## Local development

```bash
pnpm install
pnpm dev
```

## Deployment

Push to `main` to build and deploy the site through GitHub Pages. The published site is served from the `github-pages` environment.
