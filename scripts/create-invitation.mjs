// Offline provisioning proposal: prints a private bearer link and SQL for review.
// Does not connect to Supabase or write guest records.
import { randomBytes, createHash } from "node:crypto";
const [name, expiry, origin] = process.argv.slice(2);
if (
  !name ||
  name.length > 200 ||
  !expiry ||
  !Number.isFinite(Date.parse(expiry)) ||
  Date.parse(expiry) <= Date.now() ||
  !origin
) {
  throw new Error(
    'Usage: node scripts/create-invitation.mjs "Guest name" "future ISO expiry with timezone" "https://site.example"',
  );
}
const url = new URL(origin);
if (
  url.protocol !== "https:" &&
  !["localhost", "127.0.0.1"].includes(url.hostname)
)
  throw new Error("Use HTTPS");
const token = randomBytes(32).toString("base64url");
const hash = createHash("sha256").update(token).digest("hex");
const escapedName = name.replaceAll("'", "''");
console.log(
  "PRIVATE LINK — share only with this individual; do not commit or log in shared systems.",
);
console.log(`${url.origin}/#invite=${token}`);
console.log("PROPOSED SQL — review before running in the intended project:");
console.log(
  `insert into public.invitees(display_name,token_hash,expires_at) values ('${escapedName}','${hash}','${new Date(expiry).toISOString()}');`,
);
