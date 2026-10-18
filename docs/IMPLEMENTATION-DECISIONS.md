# Implementation decisions — 2026-10-15

Status: implementation proposals, not newly LOCKED product decisions.

## Accepted visual refinement — 2026-10-15

### Follow-up correction — 2026-10-16

The user requested removal of botanical cropping in the middle of the page,
removal of the hamburger icon, more visible motion after opening, and stronger
Emerald Blue presence. Section overflow now stays visible; only the viewport edge
clips decorative overflow. Cover flower scale/placement and the preview label were
recomposed to keep blossoms readable. Navigation is a text index after Closing,
with no top menu or hamburger. Individual visible layers reveal independently;
in-view botanical drift continues with pause/reduced-motion support. Emerald fields
on Hero and around the Wedding card are an explicit refinement of the earlier
Ivory section mapping, using the same approved palette. No asset regeneration.

The user approved the implementation plan and explicitly requested (1) texture per the master prompt, (2) motion per the master prompt, and (3) replacement of all code-generated botanical line-art with supplied illustrations in `public/assets`. These visual choices are approved; backend proposals below remain **PENDING acceptance**.

- Use existing transparent WebPs via `Artwork`, original monogram and supplied paper texture; no new generated asset.
- Remove the obsolete botanical SVG component and drawing CSS. Preserve original source assets.
- Entrance 1.6s with 0/180/320ms stagger; monogram begins at 650ms; 8/9/11s gentle idle cycles; 1.4s cover-to-Hero transition. Reduced motion 100ms. Pause control and hidden-tab pause included.
- Keep existing Next.js architecture, no-JavaScript fallback, invitation-fragment preservation and RSVP security boundaries. No new dependency or production migration.
- Record current verification in `MASTER-IMPLEMENTATION-QA.md` and `qa/master-implementation/`; older results below describe the earlier implementation.

## Historical implementation decisions (visual items superseded above)

- Read README, canonical documents 01–09, Opening Motion Specification and PROMPT. `10-Memory-Prompt.txt` and `PRD.md` are absent (including filename search); continue using topic authorities. No locked product conflict was found.
- PROMPT explicitly authorizes original SVG assets, overriding the earlier ask-first asset workflow for this task. Existing assets inspected first. Reuse supplied RD monogram; use original path-based botanicals because supplied SVGs embed raster images. Generated work remains GENERATED — REVIEW REQUIRED.
- Preserve Next.js, React, TypeScript and plain CSS. No animation dependency. Initial drawing ends in 3.4 seconds; CTA works throughout. CTA handoff targets 1.4 seconds; reduced motion 0.1 seconds. Native GET form provides no-JavaScript access at `/?open=1`.
- Missing photos stay honest, labelled print placeholders. Abstract architectural study is explicitly not the venue. No invented wedding facts, stock photos, external image dependencies, script fonts, or artificial countdown date.
- Proposed RSVP schema, tokens and authentication are implemented for review below. They are disabled unless `RSVP_ENABLED=true`. No migration is applied automatically. Credentials, acceptance of these proposals, real database tests and operational controls are launch blockers.

## Proposed backend design (PENDING acceptance)

- Supabase Postgres tables for individual invitees and immutable responses. One response per invitee enforced by primary key. Submission RPC locks the invitee, validates token hash, expiry and revocation, then inserts or returns the final response. No client table grants or public RPC access.
- Personal URLs use a 32-byte cryptographically random base64url token in `/#invite=...`. Only its SHA-256 hash is stored. Fragments do not enter server access logs or referrers; do not add analytics capturing URLs. Bearer links must be kept private. Expiry is explicitly supplied during provisioning; revocation is supported; rotation policy/retention remain PENDING.
- Server-only service-role REST calls to Supabase; no SDK required. Strict same-origin POST checks, small request limits, no-store responses, no guest identifier accepted. Malformed/unknown/expired/revoked invitation tokens share the same outward invalid response. Never return guest names publicly.
- Operator signs in with Supabase Auth password, verified through `/auth/v1/user` and an explicit server-only UUID allowlist. Short-lived HttpOnly SameSite=Strict cookie, Secure in production. Verify authentication and authorization on every export; no dashboard. Export supports all rows via server pagination, CSV escaping and formula-injection neutralization.
- Infrastructure rate limiting (RSVP and operator login), CAPTCHA if needed, MFA policy, retention, monitoring, deployment, and backups are PENDING. No claim of production security or live integration verification.
- Set APP_ORIGIN to the exact public HTTPS origin behind a reverse proxy. Local fallback compares Origin against request protocol and Host; forwarded-host headers are not trusted. All API responses are no-store.

## Working changelog

1. Inspected sources, scripts, empty backend directories, asset dimensions/transparency and rendered previews. Found only Opening/Hero implemented.
2. Built central placeholder content, eight-section composition, SVG botanical layers, fallback form, responsive tokens, RSVP states and motion.
3. Added proposed Supabase migration and server integration, private operator login/export, and tests. See QA report for actual execution results.
4. Verified migration, concurrent finality and denied permissions in an isolated PostgreSQL 17 cluster; no live Supabase credentials used. Fixed browser-reported focus, ARIA and heading issues. Patched production PostCSS dependency; braces tooling issue remains pending upstream.


## Current user override — nature editorial revision

The latest explicit user request supersedes earlier ambient-loop, pause-control and navigation requirements: remove hamburger/bottom navigation and animation pause controls; use finite varied editorial motion with reduced-motion support. Opening handoff remains approximately 1.4 seconds. Music begins on Opening activation with a floating play/stop control. See [current QA](NATURE-EDITORIAL-QA.md) for evidence and remaining release blockers.
