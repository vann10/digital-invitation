# QA report — 2026-10-15

**Historical baseline:** this report describes the earlier SVG-drawing implementation. It is not evidence for the subsequent master-prompt revision. See [MASTER-IMPLEMENTATION-QA.md](MASTER-IMPLEMENTATION-QA.md) and `qa/master-implementation/` for the current run; older artifacts below are preserved.

Environment: Windows, Node 26.0.0, Next.js 15.5.27 production build, local Chromium 1228, PostgreSQL 17.9 isolated test cluster. No external database or deployment was changed.

## Commands and evidence

| Check | Result | Evidence / limits |
|---|---|---|
| `npm run lint` | PASS | Application, components, libraries, scripts, tests and root config. Third-party skill scripts are excluded from application lint. |
| `npm run typecheck` | PASS | TypeScript, no emit. |
| `npm test` | PASS | 5 tests: input/option validation, identity hashing, CSV injection/escaping, origin checks and body-size limits. Native TS loader gives a harmless module-type warning on Node 26. |
| `npm run build` | PASS | Optimized production build; 115 kB first-load JS for invitation, no build errors. |
| `npm run test:database` | PASS | `qa/database-results.json`: migration applied in isolated PostgreSQL; four concurrent submissions produce exactly one accepted response; three retain the same final response; invalid/expired/revoked tokens rejected; anonymous table/RPC access rejected; update/delete and duplicate key rejected. Local process stopped after testing. |
| Browser suite | PASS, scoped | Final build: 13/13 tests, 0 flaky/skipped; machine-readable report in `qa/browser-results.json`. Axe reports zero violations on the cover and opened page. Final mask handoff inspected again and included in this passing run. |
| `npm audit --omit=dev --json` | PASS | Zero production vulnerabilities after PostCSS 8.5.30 override. |
| Full dependency audit | PENDING upstream fix | Five high entries in the ESLint → fast-glob → micromatch → braces chain. Latest braces is 3.0.3 and affected. No safe patch was published at execution time; no forced downgrade applied. |
| Client bundle scan | PASS, scoped | No `SUPABASE_SERVICE_ROLE_KEY`, `OPERATOR_USER_IDS`, or private RPC name found under `.next/static`. No real credentials existed to audit. |
| `git diff --check` | PASS | No whitespace defects; Git emitted normal LF/CRLF conversion notices. |

## Browser scope

Viewports: 320×568, 390×844, 768×1024, 1440×900 and 667×375 landscape. Every section was scrolled into view, checked for horizontal overflow, and captured in full-page evidence. Cover and individual mobile/desktop section captures are under `qa/`.

Checked: immediate CTA availability and minimum 44px height; pointer/touch/Enter/Space; visible keyboard outline; correct eight-section order; duplicate activation; interruption of animations; Hero focus and no required scroll; post-opening scrolling; image loading; no-JavaScript native GET fallback; reduced motion; semantic radio selection; mocked network failure, invalid invitation, confirmed success and authoritative duplicate response. Real local endpoints were checked for anonymous-export denial, foreign-origin denial, malformed request denial and disabled-backend 503.

Timing uses browser performance marks on the actual click and the opened state, excluding Playwright action scheduling. Final passing run: 1404–1414ms across the five viewports (within the 1200–1600ms target). Timings are in the machine-readable browser report's stdout. Reduced-motion transition is 100ms in code and checked below 600ms including automation overhead.

Drawing storyboard captures restart and pause the actual CSS animations at 300/1200/2400/3400ms. A path-offset assertion checks the initial drawing is in progress and the final artwork is fully drawn. Handoff captures include intermediate and final states. Layout-shift observation checks CLS below 0.1 in this local browser; this does not establish mobile hardware performance.

## Defects found and fixed

- Initial broad lint included third-party skill scripts; narrowed lint scope to project code and ignored tooling bundles.
- Replaced internal raw anchor with Next Link and corrected browser-test image element types.
- Fixed a focus race by moving focus only after React commits the opened state. Verified even when animations are cancelled.
- Added `role="img"` to the labelled monogram.
- Corrected same-origin comparison for Next's local request URL normalization; APP_ORIGIN is available for production/reverse-proxy deployments.
- Promoted the active Hero to a level-one heading; cover and Hero are mutually exclusive accessible compositions.
- Reduced flower contour intersections; removed desktop photograph-slot overlap; kept all placeholder labels visible.
- Kept cover typography present further into the handoff; changed the cover exit to a restrained clip reveal after frame inspection found overlapping text during an opacity crossfade.
- Patched PostCSS without changing Next.js major version.
- Windows PostgreSQL child-process pipe handling initially stalled local QA; switched pg_ctl to detached output handles, reran successfully, and stopped the temporary server.

## NOT TESTED / BLOCKED

- **BLOCKED:** live Supabase Auth/PostgREST/RLS configuration, operator login/allowlist/session lifecycle, authenticated CSV download and deployment secrets: credentials/project not supplied. Browser success/finality tests mock only transport; local PostgreSQL tests exercise the real proposed SQL, not the hosted service.
- **PENDING:** real wedding facts/copy, real Gallery photos, final monogram approval, venue reference, generated SVG approval, licensing confirmation for supplied assets, and acceptance of backend proposals.
- **NOT TESTED:** physical low/mid-range mobile performance/battery, slow-network conditions, Safari/Firefox, screen-reader and text-zoom audits, infrastructure rate limiting, production monitoring/backups and deployment.
- **NOT TESTED:** final photographic crops and real venue/map accuracy; placeholders cannot establish these criteria.
- Automated axe checks and keyboard checks do not certify full accessibility. See `LAUNCH-CHECKLIST.md` for remaining release gates.

## Affected files

- `app/page.tsx`, `app/globals.css`, `app/layout.tsx`: eight sections, typography/tokens, responsive composition and metadata.
- `components/{botanical,monogram,opening,countdown,reveal,rsvp}.tsx`, `data/invitation.ts`: reusable artwork, interaction, state and content.
- `app/api/rsvp/route.ts`, `app/api/operator/{login,logout,export}/route.ts`, `app/operator/page.tsx`, `lib/{backend,rsvp-core}.ts`: server validation and proposed private export workflow.
- `supabase/migrations/001_proposed_rsvp.sql`, `scripts/{create-invitation,test-database}.mjs`, `.env.example`: proposed schema, offline provisioning and isolated verification.
- `tests/`, `playwright.config.ts`, `eslint.config.mjs`, `package.json`, `package-lock.json`, `.gitignore`: verification tooling, dependency patch and test artifact exclusions.
- `README.md`, canonical documents 07/08/09, implementation decisions, launch checklist, this report and `docs/qa/`: setup, status and evidence. Original supplied image files remain intact.
