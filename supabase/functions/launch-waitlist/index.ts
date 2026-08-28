// Secure public endpoint for the GitHub Pages launch form; service credentials remain inside Supabase.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://businesstimeback.com",
  "https://www.businesstimeback.com",
  "https://groundtruthindex26.github.io",
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const allowedSources = new Set(["header", "hero", "story", "commercial", "closing"]);

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin && allowedOrigins.has(origin) ? origin : "https://businesstimeback.com",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST" || (origin && !allowedOrigins.has(origin))) return new Response(JSON.stringify({ error: "Request not allowed." }), { status: 403, headers });
  try {
    const { email, source } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!emailPattern.test(normalizedEmail)) return new Response(JSON.stringify({ error: "Enter a complete email address." }), { status: 400, headers });
    if (!allowedSources.has(source)) return new Response(JSON.stringify({ error: "Invalid waitlist source." }), { status: 400, headers });
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { error } = await supabase.from("launch_waitlist").insert({ email: normalizedEmail, source });
    if (error?.code === "23505") return new Response(JSON.stringify({ ok: true, isNew: false }), { headers });
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, isNew: true }), { headers });
  } catch (error) {
    console.error("launch-waitlist", error);
    return new Response(JSON.stringify({ error: "We couldn’t save your request. Please try again shortly." }), { status: 500, headers });
  }
});
