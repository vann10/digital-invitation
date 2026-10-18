import "server-only";
export function configuration() {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKey = process.env.SUPABASE_ANON_KEY;
  if (process.env.RSVP_ENABLED !== "true" || !url || !secret || !apiKey)
    return null;
  const parsed = new URL(url);
  if (
    parsed.protocol !== "https:" &&
    !(
      process.env.NODE_ENV !== "production" &&
      ["localhost", "127.0.0.1"].includes(parsed.hostname)
    )
  )
    return null;
  return { url: parsed.origin, secret, apiKey };
}
export async function supabase(path: string, init: RequestInit = {}) {
  const config = configuration();
  if (!config) throw new Error("unavailable");
  return fetch(`${config.url}${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: {
      apikey: config.secret,
      Authorization: `Bearer ${config.secret}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}
export async function operatorUser(
  accessToken: string,
): Promise<string | null> {
  const config = configuration();
  if (!config || !accessToken) return null;
  const response = await fetch(`${config.url}/auth/v1/user`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: { apikey: config.apiKey, Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;
  const user = await response.json();
  const allowed = (process.env.OPERATOR_USER_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return typeof user.id === "string" && allowed.includes(user.id)
    ? user.id
    : null;
}
export const privateHeaders = {
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
};
