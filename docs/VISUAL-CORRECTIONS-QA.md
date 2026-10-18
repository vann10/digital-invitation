# Visual corrections — 2026-10-16

Follow-up to the user's review: botanical clipping, hamburger removal, stronger
motion after opening, and more visible Emerald Blue. This report supersedes the
presentation results in `MASTER-IMPLEMENTATION-QA.md`; backend/content gates remain.

## Changes and causes

- Several sections used `overflow: hidden` on a 1280px inner container. Artwork
  could stop abruptly inside the desktop viewport or at a section boundary.
  Those clips are removed; the page clips horizontal overflow only at the viewport.
  Cover bouquets are recomposed with the main blossoms inside the viewport.
- The Opening preview label had an opaque Ivory rectangle over the lower bouquet.
  It and the pause control now sit in the central content flow below the CTA,
  without covering surfaces. The pause-control overlap was caught in normal-motion
  screenshots after the first 17/17 browser pass and corrected before the final run.
  Hero/RSVP/Closing spacing reserves room for flowers instead of cutting them off
  or allowing them to cover the following section's text. Peripheral foliage can
  still bleed off the screen as a deliberate edge composition.
- Removed the hamburger, its toggle state, top navigation and associated styles.
  A compact, keyboard-accessible text index follows Closing. Navigation still
  preserves `#invite=...` and transfers focus to the destination heading.
- The previous observer triggered every reveal in a tall composition at once.
  One observer now tracks each heading, text group, illustration and photograph
  independently. Hero reveals start after the handoff; lower sections animate
  when reached. Text: 950ms, art/photos: 1200ms, stagger up to 300ms.
- In-view botanical images continue a 10s, 4–6px/0.6-degree drift. Offscreen images
  pause; the existing document-hidden state pauses the whole invitation. The
  footer offers pause/resume, and changing reduced-motion preference cancels
  active reveals and removes decorative CSS motion. No animation dependency added.
- Hero is Emerald Blue with Ivory type. The Wedding has an Emerald surround,
  Ivory stationery and Ivory countdown text. Cover names/frame and section
  headings reinforce Emerald; selected RSVP choices use Emerald with Ivory text
  and a visible check/rule. Existing palette, fonts and original art are retained.

## Assets and files

Reused unchanged: `botanical_full_detail_hybrid.webp`, `botanical_ornament.webp`,
`floating_botanical_leaves_fidelity.webp`, `monogram_RD_exact_illustration.webp`,
and the existing `paper-grain.webp` derivative. No new asset generation proposed
or performed. No dependency, backend, SQL or wedding-content change.

Implementation: `app/globals.css`, `app/page.tsx`, `components/opening.tsx`,
`components/reveal.tsx`, `components/invitation-navigation.tsx`.
Verification: `tests/browser/invitation.spec.ts`, `playwright.config.ts`,
`scripts/capture-visual.mjs` (optional `QA_ROOT` preserves historical evidence).
Documentation: README, canonical 04/05/06, implementation decisions, this report,
and a superseding notice in the previous report. Other uncommitted work preserved.

## Verification

Windows, installed Chromium, production Next.js 15.5.27 preview at port 3000.

| Command / check | Result |
|---|---|
| `rtk proxy npm run lint` | PASS |
| `rtk proxy npm run typecheck` | PASS |
| `rtk proxy npm test` | PASS, 5 tests; existing Node module-type warning |
| `rtk proxy npm run build` | PASS; 115 kB first-load JS |
| `rtk proxy npm run test:browser` | PASS, 17/17 on final production build; no retries/skips |
| `QA_ROOT=docs/qa/visual-corrections` + `node scripts/capture-visual.mjs after` | PASS, final production captures at 390×844 and 1440×900; zero console/page errors |
| Axe cover/opened/selected-RSVP scans | PASS, zero violations in all three states |
| `rtk proxy git diff --check` | PASS; existing LF/CRLF notices only |

Browser suite covers 320×568, 390×844, 768×1024, 1024×768, 1440×900 and 667×375;
final CTA-to-Hero times were 1406–1415ms, within the 1200–1600ms target.
all eight sections, no horizontal overflow, no inner section clipping, CTA bounds,
Opening timing/focus, mobile touch and keyboard, no hamburger, footer links/token
preservation, independent post-opening reveals, actual drift/pause, dynamic reduced
motion and no-JavaScript access. RSVP success/retry/finality tests mock transport;
negative API tests exercise local routes. This is not live Supabase validation.

Evidence: `docs/qa/visual-corrections/` (browser JSON, Axe JSON, motion samples,
six viewport captures) and `after/` (static production mobile/desktop sections).
Final screenshots were visually inspected, including Opening controls, Emerald
Hero and Wedding, the letter composition, venue/gallery pending states, RSVP and
Closing spacing. Normal-motion cover captures were also reviewed at narrow mobile
and short landscape sizes; controls no longer cover botanical artwork.

- [Mobile Opening](qa/visual-corrections/after/opening-390.png)
- [Desktop Opening](qa/visual-corrections/after/opening-1440.png)
- [Mobile Hero](qa/visual-corrections/after/hero-390.png)
- [Desktop Hero](qa/visual-corrections/after/hero-1440.png)
- [Desktop full page](qa/visual-corrections/after/page-1440.png)

## Remaining gates

**BLOCKED / PENDING:** real wedding data/copy, approved gallery photographs,
actual venue artwork/map and live Supabase configuration/acceptance of backend
proposals. These corrections do not fabricate those materials or enable production.

**NOT TESTED:** hosted Supabase/operator export, physical-device performance and
battery/OS background behavior, Safari/Firefox, manual screen readers/text zoom,
slow networks and deployment. No commit, push, migration or deployment performed.
