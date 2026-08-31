/**
 * Pre-launch lead capture for the landing page.
 *
 * Points at the same Supabase project and `emails` table the live site already
 * writes to, so existing leads and new ones stay in one place. The key below is
 * a Supabase *publishable* key: it is safe in the browser and access is governed
 * by row-level security on the table.
 */
const SUPABASE_URL = "https://qmvuykolspuezvergmxv.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ax8wy3DT6h_Cf-c1VBoLGg_Imk-YaQA";

export async function captureLead(email: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({
      email,
      source: "landing_page_demo",
      demo_accessed: true,
      demo_accessed_at: new Date().toISOString(),
    }),
  });

  // fetch() resolves on 4xx/5xx, so HTTP status must be checked explicitly.
  // A silently swallowed 403 here is how lead capture breaks unnoticed.
  if (res.ok) return;
  // emails.email is UNIQUE, so a repeat signup is a returning visitor,
  // not a failure. Postgres 23505 surfaces here as HTTP 409.
  if (res.status === 409) return;
  throw new Error(`${res.status} ${(await res.text()).slice(0, 160)}`);
}

/** Fire-and-forget analytics helpers; all three are optional at runtime. */
export function track(event: string): void {
  try {
    (window as unknown as { plausible?: (e: string) => void }).plausible?.(
      event
    );
  } catch {
    /* analytics blocked */
  }
}
