# Phase 4 — Section implementation and review

User authorized moving beyond the Opening prototype and explicitly skipped video. Work is limited to the remaining six sections. Each section is implemented, rendered and inspected before proceeding to the next. Phase 2 motifs are now authorized for use by the request to use the existing asset library; no new images, venue facts, personal story or photographs are fabricated.

Evidence lives in `docs/qa/phase4/`. Per-section JSON records viewport, image loading, overflow and scoped axe results; PNGs show the actual local browser output. Development screenshots may include the Next.js development badge; this is not part of the production design.

## Section decisions

- Our Story: letter/envelope composition retained; connected branch replaces repeated hanging floral ornament. A separate bud sprig sits at the letter edge. Copy and signature have explicit staggered timing. Actual personal story and photography remain pending.
- The Wedding: an offset stationery backing gives depth without a large shadow. Date reveal precedes venue/time/location and the secondary countdown. A peony anchors the main card while a branch frames `UNTIL THE WEDDING`. No date is invented; countdown remains inactive.
- Venue: an architectural plate with an arched fine-rule surround; desktop separates illustration and location details, while mobile retains the required order. The image receives a progressive mask reveal, not a claimed animated vector drawing. Botanical sprig is secondary. Supplied Gandrung art is now explicitly labelled as reference artwork, not a confirmed actual venue.
- Gallery: varied vertical print proportions repeat safely beyond three images; white print margins and a restrained settling entrance preserve natural photographic appearance. Current empty state uses a small peony beside an honest pending-photo notice. Actual photo cropping, sequence and the print animation with real photographs remain **NOT TESTED**, pending approved files.
- RSVP: text rows replace large decorated option boxes; a checked state uses an underline and check mark, with a separate visible keyboard focus outline. Two native radio choices are retained. Added `aria-busy` while sending. No server, database, request payload or response-finality rule is changed.
- Closing: original monogram resolves the composition. A short center-out ornamental rule and perimeter branch/peony repeat earlier motifs without creating another card. Final closing copy stays pending.

Continuity comes from the same branch, sprig and flower at different scales/positions across the six compositions. There is no artificial bird-flight rig, scroll hijacking, persistent ambient loop, or new scroll listener. All added entrance motion is finite and respects the existing reduced-motion cancellation path.

## Files changed

- `app/page.tsx`: section-specific markup, motion hooks and illustration placement.
- `components/section-editorial.css`: scoped mobile/desktop composition and RSVP selection styling.
- `components/reveal.tsx`: optional per-layer delay, clamped to 0–1200ms.
- `components/rsvp.tsx`: removes repeated decorative option images; adds sending busy state.
- `lib/motion.ts`: date, print and ornamental rule entrances.
- `data/artwork.ts`: branch, sprig and peony entries.
- `public/assets/optimized/rd-connecting-branch-v1.webp`, `rd-bud-sprig-v1.webp`, `rd-peony-accent-v1.webp`: copied Phase 2 delivery assets; no regenerated appearance.
- `scripts/check-phase4-section.mjs`, `scripts/check-phase4-flow.mjs`, `scripts/preview-phase4.mjs`: repeatable QA and review artifacts.
- This report, `docs/qa/phase4/`, and the user-requested video deferral note in `docs/OPENING-VIDEO-BRIEF.md`.

The three added delivery files total 373,798 bytes on disk before Next Image delivery optimization. Below-fold illustrations remain lazy-loaded with responsive size hints. No new dependency was installed. Existing monogram, architectural illustration, butterfly, paper and Opening/Hero assets are reused.

## Validation

All six sections were implemented and inspected sequentially in local Chromium at **390×844 and 1440×900**, with successful image decode, zero horizontal overflow, and **zero scoped axe violations in all 12 section/viewport checks**. Our Story was corrected and recaptured after its desktop branch initially approached the heading too closely.

Additional flow checks at **320×568, 667×375, 768×1024 and 1024×768** passed for all six sections: no horizontal overflow or clipping of the tested headings, letter copy, response rows and submit button; reduced motion left zero active animations. These geometry checks do not claim a manual visual review of every pixel at all four additional sizes.

The normal-motion flow recorded distinct letter, date, stationery, engraving, reply and rule animation calls. Changing to reduced motion cancelled active animations. Opening still revealed Hero and focused its heading. All eight sections remained in the required order. RSVP Space/ArrowDown single-choice operation, visible focus, checked marker and >=44px radio targets passed. No real response was submitted.

Three existing browser tests passed: error/retry and backend-confirmed success with mocked transport; authoritative already-submitted choice with mocked transport; real local API rejection of anonymous export, foreign origin, malformed input and disabled backend. This is not a live Supabase integration test.

`npm run lint`: passed. `npm test`: 5/5 passed (existing Node module-type warning). Isolated production `npm run build`: passed, including type validation; home route reports **117kB first-load JS**, versus the previous prototype's rounded 116kB. This is bundle evidence, not a field performance or Core Web Vitals claim.

Review sheet: `qa/phase4/index.html`; overview: `qa/phase4/section-review.png`. The gallery and story intentionally retain visible pending-content notices rather than fake material. The final production flow rerun is recorded in `qa/phase4/flow-results.json`.

## Scope boundaries

Opening/Hero transitions and RSVP server/database rules are preserved. Video is deferred at the user's request. The Phase 2 branch, sprig and peony delivery files supplement the existing illustration family. Real photo gallery composition cannot receive final visual approval until approved photographs and order exist.

Still pending: real wedding date/time/location/map, approved story and closing copy, approved couple photographs and ordering, actual venue confirmation, and live Supabase setup/verification. Real-device Safari, throttled-network loading, production Core Web Vitals and deployment remain **NOT TESTED**. No commit, push, deployment or production database action was performed. Phase 4 implementation is ready for review, not guest release.
