/**
 * Public endpoint for the pre-launch interest form on businesstimeback.com.
 *
 * The browser never touches the database. This function inserts with the service
 * role key, so the table can keep RLS on with no policies and the list cannot be
 * read through the REST API.
 *
 * Order matters: the signup is stored first and the notification sent second. A
 * Resend outage must never cost a signup.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://businesstimeback.com",
  "https://www.businesstimeback.com",
]);
/** Cloudflare preview deployments, e.g. https://abc123.timeback-site.pages.dev */
const PREVIEW_ORIGIN = /^https:\/\/[a-z0-9-]+\.timeback-site\.pages\.dev$/;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FROM = "Business Time Back <waitlist@businesstimeback.com>";

function isAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin) || PREVIEW_ORIGIN.test(origin);
}

function headersFor(origin: string | null) {
  return {
    // Echo only origins we actually allow; never reflect an arbitrary origin.
    "Access-Control-Allow-Origin": isAllowed(origin) ? origin! : "https://businesstimeback.com",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
    "Content-Type": "application/json",
  };
}

async function notify(email: string, isNew: boolean): Promise<string | null> {
  const key = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_EMAIL");
  if (!key || !to) return "RESEND_API_KEY or NOTIFY_EMAIL is not set";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: email,
      subject: isNew
        ? `New pre-launch signup: ${email}`
        : `Repeat pre-launch signup: ${email}`,
      text: [
        isNew ? "Someone joined the pre-launch list." : "A returning visitor signed up again.",
        "",
        `Email:  ${email}`,
        `Time:   ${new Date().toISOString()}`,
        "",
        "Reply to this message to reach them directly.",
      ].join("\n"),
    }),
  });

  if (res.ok) return null;
  return `resend ${res.status}: ${(await res.text()).slice(0, 200)}`;
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = headersFor(origin);

  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST" || !isAllowed(origin)) {
    return new Response(JSON.stringify({ error: "Request not allowed." }), { status: 403, headers });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL.test(email) || email.length > 254) {
      return new Response(JSON.stringify({ error: "Enter a complete email address." }), {
        status: 400,
        headers,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. Store the signup. This is the part that must not fail silently.
    const { error } = await supabase.from("prelaunch_interest").insert({ email });

    // email is the primary key, so a repeat signup surfaces as 23505. That is a
    // returning visitor, not an error.
    const isNew = !error;
    if (error && error.code !== "23505") throw error;

    // 2. Notify. A failure here is logged but never fails the request — the
    //    signup is already saved, and the visitor should not see an error.
    const notifyError = await notify(email, isNew).catch((e) => String(e));
    if (notifyError) console.error("notify failed:", notifyError);

    return new Response(JSON.stringify({ ok: true, isNew, notify: notifyError ?? "sent" }), {
      headers,
    });
  } catch (error) {
    console.error("prelaunch-interest", error);
    return new Response(
      JSON.stringify({ error: "We couldn’t save your request. Please try again shortly." }),
      { status: 500, headers },
    );
  }
});
