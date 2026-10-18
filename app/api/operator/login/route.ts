import { cookies } from "next/headers";
import { configuration, operatorUser, privateHeaders } from "@/lib/backend";
import { limitedJson, sameOrigin } from "@/lib/rsvp-core";
export async function POST(request: Request) {
  const reply = (status: number) =>
    Response.json({ ok: false }, { status, headers: privateHeaders });
  if (!sameOrigin(request)) return reply(403);
  try {
    const value = (await limitedJson(request)) as Record<string, unknown>;
    if (
      !value ||
      typeof value.email !== "string" ||
      typeof value.password !== "string" ||
      value.email.length > 254 ||
      value.password.length > 256
    )
      return reply(400);
    const config = configuration();
    if (!config) return reply(503);
    const response = await fetch(
      `${config.url}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
        headers: { apikey: config.apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ email: value.email, password: value.password }),
      },
    );
    if (!response.ok) return reply(401);
    const session = await response.json();
    if (
      typeof session.access_token !== "string" ||
      !(await operatorUser(session.access_token))
    )
      return reply(401);
    (await cookies()).set("operator_session", session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/operator",
      maxAge: Math.min(Number(session.expires_in) || 900, 900),
    });
    return Response.json({ ok: true }, { headers: privateHeaders });
  } catch {
    return reply(503);
  }
}
