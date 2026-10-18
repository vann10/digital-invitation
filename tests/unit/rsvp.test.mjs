import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  parseSubmission,
  tokenHash,
  csvCell,
  sameOrigin,
  limitedJson,
} from "../../lib/rsvp-core.ts";
const token = randomBytes(32).toString("base64url");
test("only approved responses and a valid opaque token are accepted", () => {
  for (const response of ["attending", "unable_to_attend"])
    assert.equal(parseSubmission({ token, response })?.response, response);
  for (const value of [
    null,
    [],
    {},
    { token, response: "maybe" },
    { token: "guest-1", response: "attending" },
    { token, response: "attending", guestId: "another" },
    { token, response: "attending", count: 2 },
  ])
    assert.equal(parseSubmission(value), null);
});
test("identity is hashed, deterministic and not stored in plaintext", () => {
  assert.match(tokenHash(token), /^[a-f0-9]{64}$/);
  assert.equal(tokenHash(token), tokenHash(token));
  assert.notEqual(
    tokenHash(token),
    tokenHash(randomBytes(32).toString("base64url")),
  );
});
test("CSV protects formulas, quotes, commas and multiline cells", () => {
  assert.equal(csvCell('Dewi, "R"'), '"Dewi, ""R"""');
  for (const value of ["=1+1", " +cmd", "@SUM(A1)", "-1", "\t=1"])
    assert.ok(csvCell(value).startsWith("\"'"));
  assert.equal(csvCell("Rizal\nDewi"), '"Rizal\nDewi"');
});
test("mutations reject missing or foreign origins", () => {
  const request = (origin) =>
    new Request("https://invitation.test/api/rsvp", {
      headers: origin ? { origin } : {},
    });
  assert.equal(sameOrigin(request("https://invitation.test")), true);
  assert.equal(sameOrigin(request("https://evil.test")), false);
  assert.equal(sameOrigin(request()), false);
});
test("request bodies are bounded even without Content-Length", async () => {
  const request = (body) =>
    new Request("https://invitation.test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  assert.deepEqual(await limitedJson(request('{"ok":true}')), { ok: true });
  await assert.rejects(limitedJson(request("x".repeat(2049))));
  await assert.rejects(limitedJson(request("{invalid")));
});
