# Launch checklist

Current release status: **BLOCKED**. Implementation can be reviewed locally; do not distribute as a final invitation.

## Content — PENDING

- [ ] Actual date, timezone-aware timestamp, time, venue, location, address and verified map URL.
- [ ] Approved personal letter; replace explanatory placeholder in `data/invitation.ts`.
- [ ] Approve/replace preview section headings, RSVP question/error/success copy and closing statement.
- [ ] Real gallery photos, approved sequence/crops and accurate alt text. Until supplied, Gallery displays one pending-content notice rather than repeated blank prints.
- [ ] Final monogram approval. Existing supplied artwork is reused, but documentation does not establish final sign-off.
- [ ] Approved venue illustration based on a real reference; replace the labelled missing-artwork area.
- [ ] Review final rendered visual composition against the storyboard. Use of supplied botanical illustrations and master-prompt texture/motion was approved on 2026-10-15; obsolete generated botanical SVG has been removed.
- [ ] Remove preview/dummy treatments only after all affected content has been approved. Do not merely hide labels over missing facts.
- [ ] Confirm rights to supplied art; no licensing notes were included. No stock photos have been introduced.

## Technical — PENDING / BLOCKED

- [ ] Accept or revise schema, token/expiry/revocation, operator authentication and CSV export proposals in IMPLEMENTATION-DECISIONS.md.
- [ ] Configure a real Supabase project, apply reviewed migration, set server env, and set APP_ORIGIN to the real HTTPS origin.
- [ ] Test live valid/unknown/revoked/expired tokens, concurrent requests, duplicate responses and attempted overwrites through PostgREST.
- [ ] Verify Supabase Auth login, wrong-password rejection, non-allowlisted-user rejection, expired session, logout, authorized CSV pagination and denied export on the actual deployment.
- [ ] Configure infrastructure rate limits for login/RSVP. Define operator MFA, retention, consent/privacy copy, backup and monitoring policies.
- [ ] Check real service credentials never enter browser bundles, telemetry, URLs or logs. Local scans cannot prove a future deployment's configuration.
- [ ] Resolve/accept five development tooling audit entries caused by braces; recheck the production audit before launch.
- [ ] Choose hosting, HTTPS, security headers/CSP policy and deployment configuration. No deployment has occurred.

## QA still needed

- [ ] Real low/mid-range Android/iOS hardware, battery/performance and slow network.
- [ ] Safari/WebKit and Firefox compatibility.
- [ ] Manual screen-reader testing and zoom/text scaling; axe is not a full accessibility audit.
- [ ] Visual re-review with final photos, venue illustration, actual content and mobile crops.
- [ ] Run the canonical acceptance checklist against the configured release. Refer to QA-REPORT.md for the precise subset already verified.
