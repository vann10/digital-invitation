# Illustrated suite — Creative Direction v2

Date: 2026-10-18. Development preview; not released.

## Implementation

- Reworked all eight compositions through `components/section-editorial.css`, preserving section order and the content register. Opening has opposing bouquets, monogram and a visible CTA; Hero is a distinct arched ivory plate. Story remains a letter and envelope; Wedding uses an emerald surround and integrated countdown; Venue uses a large architectural reference plate; Gallery retains a compact honest pending state; RSVP uses bordered reply stationery; Closing is an illustrated monogram signature.
- `components/opening.tsx` and `components/opening-motion.css`: 3600ms handoff with botanical travel, released frame, lifted monogram, central paper aperture and staggered Hero assembly. Reduced-motion completion is 100ms. Focus moves to the Hero after completion. No new animation dependency.
- `components/scroll-bird.tsx`: the existing paired naturalist doves travel along authored section margins, with curved departures and restrained re-entry. Scroll events schedule at most one animation frame; geometry is cached on resize/layout changes. Collision checks hide the ornament near text, controls, photos and venue art. Decorative, non-interactive, no continuous idle loop. Reduced motion uses discrete perches.
- Venue artwork remains intact and labelled `ILUSTRASI REFERENSI · GANDRUNG`. It fills the scenic plate, with information in a quiet adjacent/below area. The small-illustration fallback was not needed; no real venue name was supplied or invented.
- Gallery photo sequence remains ready for approved local photographs. No reference-image people were reused as the couple.

## Assets

Reused the existing bouquet, leaves, ornament, branch, sprig, peony, butterfly, paired doves, monogram, paper grain and Gandrung WebP assets. No new image generation or image edits. Existing provenance is in `NATURE-ASSET-PROVENANCE.md` and `EDITORIAL-ELEVATION.md`. The eight section reference PNGs were visually inspected. `Recording 2026-10-15 104107.mp4` was not found in the repository; video comparison is BLOCKED.

## Refinement evidence

Initial and refined screenshots are in `qa/illustrated-suite/after/` and `qa/illustrated-suite/refined/after/` (390×844 and 1440×900). All sections were inspected in contact sheets, with larger Opening, Hero, Venue and RSVP views.

Three primary corrections after review: reduced harsh white paper texture; replaced disconnected lower-cover leaves with an existing bouquet and enlarged the Hero garden to close dead space; repaired desktop Venue grid placement and stylesheet ordering. Countdown decoration was also moved clear of its label. Both screenshot runs reported zero console/page errors.

## Verification commands and evidence

- `npm run lint`: PASS on final source.
- `npm run typecheck`: PASS on final source.
- `npm test`: PASS, 5 unit tests for validation, token hashing, CSV escaping, origin checks and bounded request bodies.
- `NEXT_BUILD_DIR=.next-suite-build node node_modules/next/dist/bin/next build`: PASS. Invitation first-load JavaScript reported at 118 kB; this is a bundle measurement, not a mobile performance certification.
- `git diff --check`: PASS (line-ending notices only).
- `scripts/capture-visual.mjs after`: two complete 390×844 / 1440×900 captures, zero console/page errors. Refined assets were visually inspected.
- `scripts/capture-suite-motion.mjs`: completed at 390×900 and 1440×900; aperture/assembly/settled frames and section-by-section bird coordinates recorded in `qa/illustrated-suite/motion/`. On mobile, the bird deliberately disappears near content more often than on desktop.
- Initial browser run: 22 passed / 7 failed. Countdown ornament clearance was corrected; old assertions about CSS overflow were replaced with viewport containment checks; the bird test and end-of-page section detection were corrected. An intermediate dev-server rerun was interrupted after compilation caused a navigation timeout. These runs are preserved separately from final production evidence.
- Final production browser suite: 28/29 passed in `qa/illustrated-suite/production/browser-results.json`. The remaining reduced-motion test measured automation round-trip time (722ms). Its timing was corrected to measure browser click-to-state-change directly without relaxing the 600ms limit; the targeted rerun PASSED at 130ms, including cover/opened/selected RSVP axe scans with no violations (`qa/illustrated-suite/reduced-motion-recheck/`). All 29 cases therefore have passing evidence across the full run and targeted rerun; a second complete 29-test run was not performed.
- Production composition checks PASS at 320×568, 390×844, 768×1024, 1024×768, 1440×900 and 667×375. Recorded ordinary transition times: 3613–3625ms. Keyboard Enter/Space, early/repeated activation, touch, no-JavaScript fallback, reduced-motion preference changes, finite/reverse scroll, image failure fallback, mock RSVP success/retry/finality, API rejection cases, audio controls and scroll-bird cases passed. Real Supabase success was not tested.
- Full-page axe scan passed on production. Automated scans do not replace manual screen-reader testing or real-device performance validation.

## Release blockers

- PENDING: date/time, actual venue/address/map URL, approved story/closing/RSVP copy, final photographs/order and final asset approval.
- BLOCKED: live Supabase integration/authentication without configured service and accepted backend proposals. Existing server and database implementation was not changed; mocked browser responses are not live integration evidence.
- NOT TESTED: real low-powered hardware, Safari/iOS and Android browsers, live database concurrency in this revision, production deployment, manual screen-reader review and production security.
- Gallery with real photographs remains NOT TESTED. No commit, push, deployment or production migration was performed.
