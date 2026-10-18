import { configuration, privateHeaders, supabase } from "@/lib/backend";
import {
  limitedJson,
  parseSubmission,
  sameOrigin,
  tokenHash,
} from "@/lib/rsvp-core";
export const runtime = "nodejs";
const reply = (status: number, body: object) =>
  Response.json(body, { status, headers: privateHeaders });
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { status: "unavailable" });
  let input;
  try {
    input = parseSubmission(await limitedJson(request));
  } catch {
    return reply(404, { status: "invalid_invitation" });
  }
  if (!input) return reply(404, { status: "invalid_invitation" });
  try {
    if (!configuration()) return reply(503, { status: "unavailable" });
    const response = await supabase("/rest/v1/rpc/submit_invitation_response", {
      method: "POST",
      body: JSON.stringify({
        p_token_hash: tokenHash(input.token),
        p_response: input.response,
      }),
    });
    if (!response.ok) return reply(503, { status: "unavailable" });
    const result = await response.json();
    if (result.status === "invalid_invitation")
      return reply(404, { status: "invalid_invitation" });
    if (
      !["accepted", "already_submitted"].includes(result.status) ||
      !["attending", "unable_to_attend"].includes(result.response)
    )
      return reply(503, { status: "unavailable" });
    return reply(200, { status: result.status, response: result.response });
  } catch {
    return reply(503, { status: "unavailable" });
  }
}
