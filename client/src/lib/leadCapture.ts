/**
 * Pre-launch interest capture for the landing page.
 *
 * Posts to the `prelaunch-interest` Supabase edge function, which stores the
 * signup server-side and emails a notification. No key ships in the browser and
 * the table is not reachable from the client.
 */
const FUNCTION_URL = "https://lzaxogmrznaxudqekoua.supabase.co/functions/v1/prelaunch-interest";

export async function captureLead(email: string): Promise<void> {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  // fetch() resolves on 4xx/5xx, so the status must be checked explicitly.
  // A silently swallowed failure here is how lead capture breaks unnoticed.
  if (res.ok) return;
  throw new Error(`${res.status} ${(await res.text()).slice(0, 160)}`);
}

/** Fire-and-forget analytics helper; optional at runtime. */
export function track(event: string): void {
  try {
    (window as unknown as { plausible?: (e: string) => void }).plausible?.(event);
  } catch {
    /* analytics blocked */
  }
}
