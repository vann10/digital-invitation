# Nature editorial revision — QA

## Implemented scope

- Supplied Gandrung SVG replaces the venue placeholder, displayed whole.
- Supplied paper grain is more visible on Ivory, Emerald and letter surfaces.
- Finite material-specific entrances replace repetitive ambient motion: name wipe, letter/envelope movement, stationery impression, architectural reveal, photography wipe and subtle fauna arrival. Reduced-motion preferences cancel non-essential animation.
- Hamburger, bottom navigation and pause controls are absent.
- Opening starts temporary music; floating 48px play/stop button supports keyboard, actual playback state and retry. Stop resets playback. Hidden tabs stop audio; direct opened links stay silent until activation.
- New user-requested realistic doves and butterfly complement reused botanical illustrations. Flower repetition is reduced. Story gains an envelope composition.

## Main affected files

`app/page.tsx`, `app/globals.css`, `components/opening.tsx`, `components/artwork.tsx`, `components/reveal.tsx`, new `components/music.tsx`, new `lib/motion.ts`, `data/invitation.ts`; removed navigation component. Browser tests, capture script and current project documentation updated. No animation dependency added.

Existing assets reused: bouquet, botanical ornament, floating leaves, supplied monogram, paper photograph and Gandrung SVG. Two authorized generated decorations preserve PNG sources and use transparent WebP delivery. Exact prompts, paths, sizes and audio attribution: [asset provenance](NATURE-ASSET-PROVENANCE.md).

The temporary song is **Reverie — Scott Buckley**, available on YouTube. Playback uses the official licensed audio download, not a YouTube iframe or stream extraction. Replace track/configuration and attribution together in `data/invitation.ts`.

## Project Manager feedback and revisions

Initial review returned three corrections: letter rotation snapped at completion, music focus contrast was insufficient, and the floating button intersected Hero location on 320×568. Fixed final letter rotation to -3 degrees, changed focus to Emerald with an Ivory halo, and adjusted short-screen Hero top spacing to 64px after the reviewer measured only 2px clearance at 80px. Removed duplicate caption styling. Audio failed-resource retry now calls load before play.

Independent PM code/design review: APPROVED for preview scope, with no further blocking code issue. After that review, root completed the production suite and static captures recorded below. Documentation records the user's override of earlier ambient-loop/pause/navigation requirements. This is not a production release approval.

## Verification

- Production build: PASS, route first-load JavaScript approximately 116 kB.
- Unit tests: PASS, 5/5. Existing Node module-type warning remains non-fatal.
- `npm run lint`, `npm run typecheck`, `git diff --check`: PASS (Git reports only line-ending notices).
- `npm run test:browser`: PASS, 21/21, zero skipped/flaky/unexpected tests (229.4 seconds). Initial run: 18/21 passed; corrected a normalized CSS-value assertion, scoped the music status locator separately from RSVP status, and allowed asynchronously loaded images to finish before checking them.
- Axe accessibility scans: zero violations in cover, opened invitation and selected RSVP states.
- `QA_ROOT=docs/qa/nature-editorial node scripts/capture-visual.mjs after`: PASS, production captures at 390×844 and 1440×900, zero console/page errors. Root visually inspected the mobile full-page composition, Opening, desktop Hero, Story and Venue. New fauna, paper texture and complete venue illustration render correctly; no development badge remains in final captures.
- Browser suite covers six layouts: 320×568, 390×844, 768×1024, 1024×768, 1440×900 and 667×375; Opening handoff, keyboard/touch, reduced motion, no-JavaScript fallback, image loading, overflow, music playback/retry and RSVP transport states.
- Evidence directory: `docs/qa/nature-editorial/`. Final static section captures use `after/`; earlier reviewer captures are historical.

## Remaining release gates

- Actual wedding date/time, venue name/address/map, personal story, approved gallery photographs and final song: PENDING.
- Live Supabase Auth/PostgREST, deployed operator export and production security: NOT TESTED. RSVP success/duplicate browser tests mock transport; they do not prove live database integration.
- Physical iOS/Safari and Android devices: NOT TESTED. Chromium viewport checks do not substitute for physical-device audio testing.
- Venue SVG is approximately 3.14 MB; preserved supplied detail is a known nonblocking payload tradeoff. Sample audio is approximately 2.68 MB and not preloaded.
- No commit, push, deployment or production migration performed. This review approves the implemented development preview, not release to wedding guests.
