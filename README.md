# Rizal & Dewi — Digital Invitation

Next.js 15 + TypeScript editorial wedding invitation. Eight sections, a richly illustrated botanical cover using supplied artwork, subtle paper texture, a separate Hero, accessible two-choice RSVP, and a proposed private CSV export workflow. **Development preview, not ready for wedding guests:** real content, photographs, and live Supabase setup are still pending.

## Run

Latest phased visual revision: [editorial elevation audit and QA](docs/EDITORIAL-ELEVATION.md).
It reuses the existing illustration family, brings Hero entrances into the cover
crossfade, enriches section-specific framing, and serves the supplied Venue art
through a lossless responsive derivative. Actual wedding content remains pending.

For an isolated local preview, set `NEXT_BUILD_DIR=.next-editorial-build` for
both build and start, then use port 3001. QA scripts accept `QA_BASE_URL` and
`QA_ROOT` so new evidence does not overwrite earlier revisions.

Node.js 22.18+ is recommended (the unit tests use native TypeScript stripping). QA ran on Node 26.0.0 and Windows with Chromium.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview: `npm run build`, then `npm start`.

The `BUKA UNDANGAN` button works immediately during the 1.6–1.92-second botanical entrance. The supplied monogram fades/scales in after the botanical entrance begins. Motion is finite and varies by material: typography wipes, a letter emerging from an envelope, architectural engraving and photography reveals. The pause control has been removed as requested. Activation uses a 1.4-second outward-artwork/crossfade handoff, or a 100ms state change with reduced motion. With JavaScript disabled, the native button navigates to `/?open=1`; all invitation content remains accessible. RSVP requires JavaScript and a personal invitation.

## Content and assets

- Edit `data/invitation.ts` for wedding facts, copy, map link, gallery paths/alt text/order, monogram and RSVP messages. Missing facts are visibly labelled; countdown stays inactive without a real timestamp including timezone.
- Gallery currently shows one honest pending-content notice. Approved local photo paths in the central register populate the varied vertical photo sequence; empty entries are not rendered as repeated placeholders. Supply descriptive alt text and approved order before launch.
- Original supplied monogram is reused through Next Image. Existing source artwork and lossless copies are preserved. `npm run assets:optimize` regenerates the existing copies only when source art changes.
- `components/artwork.tsx` delivers the supplied full-detail bouquet, tall ornament and leaf illustrations through Next Image. The former code-generated SVG botanical and its drawing CSS have been removed. Venue uses the supplied gandrung-venue-lineart-black-white.svg intact; factual venue details remain pending.
- Hero and the Wedding surround use Emerald Blue; the cover retains Ivory paper with Emerald names/frame. Botanical artwork clips only at the screen edge. Hamburger, bottom navigation and pause controls are removed. Individual layers reveal once on arrival and respect reduced motion. Doves and a butterfly complement the reused botanical assets.
- See [asset register](docs/08-CONTENT-AND-ASSET-REGISTER.md), [decisions](docs/IMPLEMENTATION-DECISIONS.md), [current QA](docs/NATURE-EDITORIAL-QA.md), and [launch checklist](docs/LAUNCH-CHECKLIST.md).

Music starts from the Opening gesture and has a floating play/stop control. The temporary sample is Reverie by Scott Buckley, available on YouTube and delivered using the official CC BY 4.0 audio download. Replace music and attribution in data/invitation.ts. See [asset provenance and generation prompts](docs/NATURE-ASSET-PROVENANCE.md).

## Proposed Supabase setup

Backend defaults are **PENDING acceptance**, not locked architecture. Review `docs/IMPLEMENTATION-DECISIONS.md` and the SQL before enabling. No migration or external deployment is automatic.

1. Create a separate Supabase development project. Apply `supabase/migrations/001_proposed_rsvp.sql` after review. It creates invitees, immutable responses, RLS restrictions and a service-role-only atomic submission RPC.
2. Copy `.env.example` to `.env.local`. Configure server-only `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `APP_ORIGIN` (exact public origin, e.g. `https://your-domain.example`, no trailing slash). Set `RSVP_ENABLED=true` only after the schema is installed and the proposal is accepted. Never prefix service credentials with `NEXT_PUBLIC_`.
3. Create an operator in Supabase Auth. Put its UUID into `OPERATOR_USER_IDS` (comma-separated if multiple operators). Supabase password authentication is a proposal requiring review. Sign in at `/operator`; the server verifies the user and allowlist before granting a 15-minute HttpOnly session. Every export rechecks authorization. The session cookie is Secure in production, so use HTTPS for operator testing with `npm start`.
4. Provision each individual using the offline helper below. It prints a private link and SQL for review, but never writes guest data. Choose the expiry deliberately. Keep output private; never commit links or guest SQL.

```sh
node scripts/create-invitation.mjs "Guest name" "2030-01-01T00:00:00+07:00" "https://your-domain.example"
```

The command above is syntax guidance, not an approved expiry or wedding date. Tokens are 32 random bytes, stored as SHA-256 hashes. Links use `/#invite=...`; fragments do not reach server access logs. Preserve the fragment when sharing. To revoke access, set the invitee's `revoked_at` through a private operator workflow. Public clients never send a guest ID or receive guest names.

Without configuration, RSVP returns HTTP 503 and preserves selection. It never pretends to save. Missing/invalid/revoked/expired links cannot expose a guest record. Export rejects anonymous requests. Infrastructure rate limiting, retention, operator MFA policy, backups and deployment remain launch blockers; see checklist.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Browser tests require a running production preview at `http://127.0.0.1:3000` and Chromium:

```sh
npx playwright install chromium
npm run test:browser
```

Alternatively set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an existing Chromium executable. Current browser evidence is in `docs/qa/nature-editorial/`; earlier evidence is preserved separately. Set `QA_ROOT=docs/qa/nature-editorial` and run `node scripts/capture-visual.mjs after` for static mobile/desktop section views. Transport-mocked RSVP success tests are explicitly distinguished from live backend tests.

`npm run test:database` starts a fresh local PostgreSQL cluster under ignored `.qa-postgres/run-*`, bound to `127.0.0.1:55432`, applies the proposed migration, runs concurrent/permission/immutability tests, then stops the cluster. It never targets an existing database. Set `POSTGRES_BIN` to your PostgreSQL binary directory; the default is PostgreSQL 17 on Windows. Test data is synthetic. The local cluster uses trust authentication only for this short-lived test; do not use that setup for deployment.

Production dependency audit passes after a compatible PostCSS override. Five development-only audit entries remain in the ESLint → fast-glob → micromatch → braces chain; `braces` 3.0.3 is still the latest published version at this QA date. No forced framework downgrade was performed.

Nothing has been committed, pushed, or deployed. Live Supabase Auth/PostgREST and production security are **NOT TESTED**.
