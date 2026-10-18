# Master implementation — visual changes and QA

Follow-up visual corrections and current evidence: [VISUAL-CORRECTIONS-QA.md](VISUAL-CORRECTIONS-QA.md).
The report below records the earlier master-prompt implementation before user review.

## Scope and authority

The user approved the implementation plan, paper texture and motion from
`MASTER-IMPLEMENTATION-PROMPT-RIZAL-DEWI.md`, and replacement of all code-generated
botanical line-art with illustrations from `public/assets`.

The existing worktree contained substantial uncommitted implementation. It was
preserved and used as the baseline. Existing artwork already restored by that
baseline was retained; this report does not attribute those earlier changes to
this revision. No commit, push, deployment, external database migration, new
dependency, or image-generation service was used.

Read: master prompt, README, AGENTS, canonical documents 01–09, supplemental
Opening specification, implementation decisions and earlier QA/audit. Neither
`PRD.md` nor `10-Memory-Prompt.txt` was found. The complete storyboard and section,
motion, palette/typography/texture references were opened and compared with the
rendered page. Reference panels are not shipped as website images.

## Root causes and corrections

| Finding | Correction |
|---|---|
| Earlier line-art component and drawing CSS survived after supplied artwork had been restored | Removed `components/botanical.tsx` and all obsolete drawing selectors/keyframes. The source scan found no generated botanical/dash-drawing references in app/components. |
| Short, same-direction entrance; missing idle motion and monogram scale reveal | Three independently timed illustration groups enter from different directions. Original monogram fades/scales in after botanical entrance begins. |
| Exit moved illustration only a few pixels and faded text too early | Illustration groups move outward and fade; names stay readable longer, then the monogram/content scale down and crossfade to Hero. Removed duplicated Hero opacity animation to avoid a near-blank handoff. |
| Monogram too small relative to the names | Increased its responsive display size while preserving original proportions and transparency. |
| Texture sat above the entire page | Reused the supplied paper photograph as a lightweight WebP canvas layer below artwork, text and future photos. It does not tint their colors. |
| Short landscape preview label overlapped the CTA | Recompose short landscape cover with monogram beside names/CTA. Browser tests now check CTA-to-label separation. |
| Hero and Wedding landmarks shared the same accessible name | Wedding region now includes its existing section label in `aria-labelledby`. |
| Gallery repeated empty framed slots | Render a single honest pending notice until approved photos exist; render only available photos in the existing varied vertical sequence. |
| Hero ampersand used ornamental Champagne at only 2.51:1 against Ivory | Changed this readable display character to Emerald Blue (9.29:1 against Ivory). Champagne remains decorative. |
| Old documentation and tests still specified drawn strokes | Recorded explicit user approval, marked superseded motion guidance historical, and replaced SVG-path tests with illustration/motion evidence. |

## Artwork, typography and texture

Full asset metadata, paths, provenance and section mapping are in
[08-CONTENT-AND-ASSET-REGISTER.md](08-CONTENT-AND-ASSET-REGISTER.md).

- Reused `botanical_full_detail_hybrid.webp`, `botanical_ornament.webp`,
  `floating_botanical_leaves_fidelity.webp`, and `monogram_RD_exact_illustration.webp`
  from `public/assets/optimized/`. Original source SVG/PNG/JPEG and existing WebPs
  were not rewritten. Their alpha channels and dimensions were inspected with Sharp;
  artwork was inspected on the actual Warm Ivory canvas at mobile and desktop sizes.
- Existing SVG artwork contains embedded raster images. Complete artwork is animated
  through wrappers; no synthetic stroke tracing or simplified replacement is used.
- The only new delivery file is `paper-grain.webp`: a 1500×1500, 91,056-byte quality-60
  WebP derived from supplied `2403.jpg`, without crop/recolor. Canvas opacity is 0.12.
  `scripts/optimize-assets.mjs` can reproduce it. This is optimization, not generated art.
- No new visual asset generation was proposed or performed. Separate venue artwork,
  landscapes and approved couple photographs remain unavailable.
- Cormorant Garamond and DM Sans are retained. Browser tests verify loaded font faces;
  script font remains unused. Palette remains unchanged. Fine frame corners and RSVP
  selection rules are interface CSS, not replacement botanical artwork.

## Motion and accessibility

- Botanical entrance: 1,600ms with 0/180/320ms stagger, ending within 1.92s.
- Monogram: 850ms fade/scale starting at 650ms, from scale 0.965.
- Idle: 9/11/8-second cycles, approximately 3–6px drift and at most 0.7° rotation.
- `Jeda animasi` / `Lanjutkan animasi` controls idle motion; hidden tabs also pause it.
  Idle stops on exit; closed-cover animations cease once the cover is removed from layout.
- CTA transition: 1,400ms; duplicate activation guard, immediate CTA availability,
  keyboard focus transfer and normal scrolling retained. Reduced-motion transition: 100ms.
- Reduced motion disables decorative movement and removes the unnecessary pause control,
  including when preference changes while the page is open.
- Native no-JavaScript GET fallback retained. Navigation preserves `#invite=...` and
  supports keyboard Escape/focus restoration. RSVP retains native radio semantics,
  a non-color-only selection marker, server-confirmed success and retry selection.

## Executed checks

Environment: Windows, Node 26.0.0, Next.js 15.5.27 production build, installed
Chromium 1228 via `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. No dependency installation.

| Check | Result / scope |
|---|---|
| `rtk proxy npm run lint` | PASS, exit 0 |
| `rtk proxy npm run typecheck` | PASS, exit 0 |
| `rtk proxy npm test` | PASS, 5 unit tests; existing Node module-type warning |
| `rtk proxy npm run build` | PASS on final contrast-adjusted production build, exit 0; 115 kB first-load JS |
| `rtk proxy npm run test:browser` | PASS, 16/16 on final production build, exit 0 |
| Axe accessibility scan | PASS, zero violations in both tested cover and opened-invitation states; manual and cross-browser limits below |
| `rtk proxy node scripts/capture-visual.mjs before` | Baseline 390×844 and 1440×900 captured |
| `rtk proxy node scripts/capture-visual.mjs after` | PASS on final production build; mobile/desktop captures, 0 console/page errors |
| Asset metadata and obsolete-artwork source scan | PASS; dimensions/alpha verified, zero obsolete botanical/drawing references |
| `rtk proxy git diff --check` | PASS, exit 0; existing LF/CRLF notices only |

Browser coverage: 320×568, 390×844, 768×1024, 1024×768, 1440×900 and 667×375.
Measured CTA-to-Hero transitions in the final run were 1,407–1,413ms, within the
1,200–1,600ms target. All 16 tests passed without skips, failures or flaky retries.
Every section was visited; cover/section screenshots and page captures were inspected.
Checks include loaded images/fonts, no overflow, CTA visibility/44px minimum height,
no CTA/preview overlap, exact eight-section order, pointer/touch/Enter/Space, early
activation, duplicate activation, cancelled animation recovery, focus, scrolling,
navigation/fragment preservation, reduced motion and no-JavaScript access.

Motion evidence includes real CSS timelines sampled at 0/350/1000/2000ms and a fresh
real-time page for actual idle movement and pause/resume. The test avoids overriding
CSS play state while measuring the pause control. Local cover CLS is asserted below
0.1; this is not a real-device performance certification. Hidden-tab pausing is
implemented but OS background/battery behavior is **NOT TESTED**.

The initial browser run found and prompted correction of duplicate landmark names;
visual inspection separately caught the short-landscape overlap and early text fade.
Test harness corrections: finite initial animation replay, production font names
(spaces vs development aliases), and separation of manually sampled timelines from
live pause/resume. An early dev screenshot ran before hydration and caused a
Playwright caret-style hydration warning; captures now wait for enhancement and the
production capture reports no such error. A dev capture also timed out during a
config-triggered recompilation; subsequent production captures completed.

A later concurrent capture delayed an automation round trip until after the cover
had closed, causing a false intermediate-opacity failure. Exit sampling now happens
inside the browser's 350ms callback, before its completion timer; final acceptance
runs the suite independently of the static capture script.

## Evidence and visual comparison

All current evidence is under `docs/qa/master-implementation/`; earlier `docs/qa/`
artifacts remain historical. Machine-readable results: `browser-results.json` and
`axe.json`. Static before/after comparisons: `before/` and `after/`.

- [Mobile cover](qa/master-implementation/cover-390.png)
- [Desktop cover](qa/master-implementation/cover-1440.png)
- [Short landscape cover](qa/master-implementation/cover-667.png)
- [Botanical entrance](qa/master-implementation/entrance-350.png)
- [Monogram reveal](qa/master-implementation/entrance-1000.png)
- [Idle composition](qa/master-implementation/idle.png)
- [Early handoff](qa/master-implementation/handoff-350.png)
- [Hero handoff](qa/master-implementation/handoff-850.png)

Opening/Hero/Story/Wedding/RSVP/Closing preserve the supplied art's petal layers,
veins, engraved marks, shading and palette at rendered size. Frames, ivory canvas,
serif hierarchy and Emerald actions follow the reference. Desktop is recomposed;
short landscape uses a compact side-by-side arrangement. Botanical artwork is not
recolored or simplified to satisfy animation.

Exact reference parity is not claimed: supplied bouquets/monogram are reused intact
instead of redrawn into different reference shapes, actual text length is pending,
and venue/landscape/photo assets are missing. The Gallery reference collage is
adapted to the canonical vertical photo sequence; its final crops cannot be reviewed
without real photographs. Venue remains a clearly labelled pending architectural
plate. Closing uses the monogram/botanical signature; the reference landscape is absent.

## Remaining gates

**BLOCKED / PENDING:** real wedding date/time/timezone, venue/address/map URL, personal
story, final RSVP and closing copy, venue illustration, gallery photos/order/crops,
landscape artwork if desired, rights confirmation and final visual acceptance with
real content. No fabricated wedding facts, photos, venue or map were introduced.

**BLOCKED:** live Supabase credentials/configuration and acceptance of existing
schema/token/operator/export proposals. RSVP success/finality browser tests mock
transport; API denial tests hit the actual local routes. No SQL/backend code changed,
and the isolated database suite was not rerun for this presentation-only revision.
Earlier database evidence remains historical and is not hosted Supabase verification.

**NOT TESTED:** live operator login/export/session lifecycle, production secrets,
deployment, physical Android/iOS performance/battery, Safari/Firefox, slow networks,
manual screen readers/text zoom, rate limiting, monitoring/backups and final-photo
or venue accuracy. Axe and keyboard checks are scoped evidence, not full certification.

Release remains **BLOCKED**. The local visual implementation is reviewable with the
above limits. See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md).

## Files changed in this revision

- Presentation: `app/page.tsx`, `app/globals.css`, `components/{artwork,opening,monogram,rsvp}.tsx`,
  `data/invitation.ts`, `next.config.ts`; removed obsolete `components/botanical.tsx`.
- Assets/tooling: `public/assets/optimized/paper-grain.webp`, `scripts/optimize-assets.mjs`,
  new `scripts/capture-visual.mjs`, `tests/browser/invitation.spec.ts`, `playwright.config.ts`.
- Documentation: `README.md`, canonical documents 01/02/03/04/06/08/09,
  `OPENING-MOTION-SPECIFICATION.md`, `IMPLEMENTATION-DECISIONS.md`, `LAUNCH-CHECKLIST.md`,
  historical-report notice in `QA-REPORT.md`, this report and new QA evidence.
- Pre-existing backend/API/SQL, package changes and other uncommitted work were preserved.
