import { createHash } from "node:crypto";

export type Attendance = "attending" | "unable_to_attend";
export type Submission = { token: string; response: Attendance };
export function parseSubmission(value: unknown): Submission | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (Object.keys(v).sort().join(",") !== "response,token") return null;
  if (typeof v.token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(v.token))
    return null;
  if (v.response !== "attending" && v.response !== "unable_to_attend")
    return null;
  return { token: v.token, response: v.response };
}
export function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
export function csvCell(value: unknown): string {
  let text = String(value ?? "");
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text))
    text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  const expected =
    process.env.APP_ORIGIN ||
    `${url.protocol}//${request.headers.get("host") || url.host}`;
  return Boolean(origin && origin === expected);
}
export async function limitedJson(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new Error("invalid");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 2048) {
        await reader.cancel();
        throw new Error("invalid");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
