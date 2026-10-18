import { cookies } from "next/headers";
import { privateHeaders } from "@/lib/backend";
import { sameOrigin } from "@/lib/rsvp-core";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return new Response(null, { status: 403, headers: privateHeaders });
  (await cookies()).set("operator_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/operator",
    maxAge: 0,
  });
  return Response.json({ ok: true }, { headers: privateHeaders });
}
