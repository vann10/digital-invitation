# Editorial elevation — 17 October 2026

## Authority and audit

The current user brief authorizes supporting decorative illustrations, richer
balanced composition and contextual motion. It amends earlier restrictions on
decorative generation and excessive whitespace. Existing Emerald Hero/Wedding
fields remain consistent with the topic-specific color amendments. No new palette,
font, personal facts, venue design or photograph is introduced.

Read README and canonical documents 01–09. `10-Memory-Prompt.txt` is absent from
the repository (including hidden-file search); it cannot supply additional rules.
The working tree already contained extensive uncommitted implementation work.
This revision preserves that architecture and the backend.

Phase 1 deliverable: baseline browser captures in `qa/editorial-elevation/before`
at 390×844 and 1440×900, zero console/page errors. Findings: strong cover and
coherent existing illustration family, sparse Story/RSVP margins, disconnected
section boundaries, Hero text replaying its entrance after the cover handoff,
and an unnecessarily large raster-containing Venue SVG.

## Phase 2 — curated library

`data/artwork.ts` centralizes reusable dimensions and delivery names. Preserve
the source artwork, colors, engraved shading and transparency. No new generated
art or video is needed. CSS rules/arches are interface framing, not venue art.

| Asset | Role | Provenance / limitation |
|---|---|---|
| botanical_full_detail_hybrid | Cover focal bouquet; final peripheral signature | Supplied; rights notes unavailable |
| botanical_ornament | Tall peripheral garden; letter and venue framing | Supplied; rights notes unavailable |
| floating_botanical_leaves_fidelity | Continuity between compositions; finite settling | Supplied; rights notes unavailable |
| romantic-doves | Hero's paired natural-history illustration | Existing generated asset; see NATURE-ASSET-PROVENANCE.md |
| naturalist-butterfly | Small correspondence / gallery punctuation | Existing generated asset; same provenance document |
| monogram_RD_exact_illustration | Opening and Closing identity | Existing supplied monogram preserved |
| paper-grain | Restrained material background | Existing supplied photograph derivative |
| gandrung-venue | Architectural plate | Existing user-selected SVG rendered losslessly to WebP; 1024×1536 RGBA, 629,126 bytes |

The venue illustration does not establish the actual event venue, address or map.
The original SVG is preserved. The WebP is a delivery derivative, not generated
art. Next Image can now serve responsive sizes instead of the full SVG payload.

## Phase 3 — Opening → Hero

Retain the existing immediately available semantic CTA and 1.4s handoff. Add a
fine Hero frame, an arch behind the existing doves, and peripheral botanical art.
Start Hero layer entrances during the crossfade, preventing a second text wipe
after handoff. Focus transfer and reduced-motion behavior remain intact.

## Unresolved inputs and release gate

Phase 5 real-content integration is BLOCKED: date/time, location/address/map,
personal letter, approved photographs/order, closing text and final RSVP copy
remain PENDING. Existing central placeholders are preserved. No photographs or
story are fabricated. Live Supabase, operator authentication and deployment are
NOT TESTED in this visual revision; schema decisions remain pending acceptance.
Final creative acceptance and real-device Safari/performance remain NOT TESTED.

## Prototype gate evidence

Production prototype compiled, lint passed, and browser captures at 390×844 and
1440×900 showed the new Hero framing with readable names and separated artwork.
`qa/editorial-elevation/prototype/performance.json`: handoff 1430ms / 1429ms,
scrollY 0, no horizontal overflow. Names were visible at handoff (opacity 1;
ampersand approximately 0.98). The composition passed the engineering gate for
extension; this does not claim user creative approval.

## Phase 4 — extended composition

Story receives a tall botanical margin beside its existing correspondence;
Wedding a leaf study above its countdown; Venue a small peripheral garden while
the architecture remains primary. Gallery receives a single butterfly near its
heading without substitute photographs. RSVP gains a botanical counterweight
beside the reply form; Closing echoes the cover bouquet at the outer edge.
Finite 2.4s settling motion gives leaves a material-specific arrival without
continuous activity. All decorative imagery stays outside the reading area.

## Phase 6 — validation

Final results will be recorded after execution. Initial prototype local LCP was
5.2–6.7s and is not a performance pass. These unthrottled local measurements are
diagnostic, not field Core Web Vitals. Source SVG/WebP decoded pixels compared
equal (6,291,456 RGBA bytes); original source is preserved.

### Executed results

- `npm run build`: PASS, including compilation, lint and type validation; main
  route first-load JavaScript 116 kB. `npm run lint`: PASS.
- `npm run typecheck`: PASS, including a final check after restoring automatic
  build-directory changes to tsconfig/next-env. `npm test`: 5/5 PASS.
- Full browser suite: 19/21 PASS; the added bounding-box test caught a 1.84px
  desktop countdown collision. Increased desktop clearance by 24px. Targeted
  rerun at 1024×768 and 1440×900: 2/2 PASS. All 21 scenarios now have passing
  evidence across the full run and scoped correction rerun, not one clean run.
- Other tested viewports: 320×568, 390×844, 768×1024, 667×375 landscape.
  Pointer/touch, Enter/Space, duplicate/early activation, focus transfer,
  natural scrolling, no-JavaScript fallback, dynamic reduced motion, music
  playback/retry and RSVP failure/finality states were exercised.
- Local API rejection checks PASS; RSVP success/final-response UI used mocked
  transport and does not establish hosted Supabase correctness.
- Axe: zero reported violations for cover/opened/selected RSVP states. Manual
  screen-reader and real iOS Safari testing remain NOT TESTED.
- Static captures of all sections at 390×844 and 1440×900: zero console/page
  errors. Visually inspected Hero, Story, Wedding, Venue, Gallery, RSVP, Closing
  and Opening. Fixed the observed countdown overlap before final scoped rerun.
- Final local diagnostics (`performance.json`): handoff 1414/1433ms, scrollY 0,
  no horizontal overflow, CLS 0.00108/0.000163. Image transfer approximately
  1.03/1.31 MB across 14 requests. The resource filter now includes preloaded
  images, so it is not directly comparable to prototype image totals.
- LCP diagnostic 8.76/7.44s during concurrent local QA: NOT a performance pass.
  The script uses programmatic opening and therefore may observe post-opening
  candidates; it is not a standardized Lighthouse or field measurement. Mobile
  network/CPU throttling and production field performance remain NOT TESTED.
- `git diff --check`: PASS (only existing Windows line-ending notices).

Phase 1 audit, phase 2 curated library, phase 3 prototype and phase 4 extension
have concrete implementation and browser evidence. Phase 5 remains BLOCKED by
missing real content. Phase 6 has scoped Chromium evidence; release remains
BLOCKED by content, live integration and production performance validation.

### Files affected by this revision

- Composition: `app/page.tsx`, `app/globals.css`.
- Curated assets: `data/artwork.ts`, `components/artwork.tsx`,
  `scripts/optimize-assets.mjs`, `public/assets/optimized/gandrung-venue.webp`.
- Motion: `components/reveal.tsx`, `lib/motion.ts`.
- Isolated validation: `next.config.ts`, `.gitignore`, `playwright.config.ts`,
  `tests/browser/invitation.spec.ts`, `scripts/capture-visual.mjs`,
  `scripts/check-editorial.mjs`.
- Documentation: `README.md`, `docs/08-CONTENT-AND-ASSET-REGISTER.md`, this report,
  and evidence under `docs/qa/editorial-elevation/`.

No backend, RSVP fields, credentials, migrations, guest records or deployment
configuration were changed. Nothing was committed, pushed or deployed.
