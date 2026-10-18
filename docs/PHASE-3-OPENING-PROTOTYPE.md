# Phase 3 — Opening / Hero motion prototype

Scope: Opening and Hero only. The remaining six sections, invitation data and RSVP backend are unchanged in this phase. This is a review prototype, not final creative approval or release approval.

## Review links

- A: http://127.0.0.1:3002/?transition=dissolve
- B: http://127.0.0.1:3002/?transition=lift
- Screenshot comparison: `qa/opening-prototype/index.html`.
- Machine-readable browser evidence: `qa/opening-prototype/results.json`.

Reload to replay. The default is A. Unknown query values also use A. The existing `?open=1` server-rendered fallback is preserved.

## Art and motion decisions

The existing bouquet, leaves, butterfly, floral monogram, ornament and doves are reused without regenerating their appearance. Phase 2 candidate assets remain unintegrated, pending visual review. No actual wedding details were invented. The existing Emerald Hero is preserved.

The cover has an opaque Warm Ivory surface, necessary for the layered transition. A selected-image clipping reveal introduces the botanical plates; this is not a claimed SVG line-drawing effect. Monogram and names arrive separately. A single gentle leaf sway ends after 4.3 seconds from load, avoiding endless ambient motion. CTA access is not delayed by the entrances.

Both CTA sequences finish at 1400ms (100ms for reduced motion). Hero animation is scoped separately from the generic section observer, so it does not replay at handoff. Focus moves to the Hero heading; the document resumes ordinary scrolling without modifying body overflow. The 320px Hero ornament is moved farther into the margin to protect the names.

| Criterion | A — Botanical Dissolve | B — Editorial Lift |
|---|---|---|
| Visual action | Botanicals move outward, frame releases, cover dissolves | Opaque cover is clipped upward like a lifted sheet; botanicals stay attached |
| Continuity | Soft relationship between botanical plates | Strong stationery metaphor and clear cover-to-invitation boundary |
| Readability | Brief opacity mixing during handoff | Moving edge temporarily clips emerging content; fully readable at handoff |
| Performance tradeoff | Transforms and opacity; temporary frame scale | Full-cover clip-path; potentially more paint work on weaker devices |
| Payload | Same existing assets; no video or added dependency | Same as A |

Recommendation: A as the conservative default; B as the more pronounced stationery alternative for review. The identical endpoints make the transition itself the comparison variable.

## Changed files in this phase

- `components/opening.tsx`: approach selection and scoped motion stylesheet.
- `components/opening-motion.css`: shared entrances, finite sway, two handoffs and narrow Hero correction.
- `components/reveal.tsx`: excludes prototype Hero from generic animation to avoid competing sequences; all other sections retain their existing behavior.
- `app/page.tsx`: query parameter selects the transition approach; Hero ornament and leaves receive priority loading after a cold-build QA run caught late imagery.
- `scripts/check-opening-prototype.mjs`: browser interaction, layout, axe and screenshot evidence.
- `scripts/preview-opening-prototype.mjs`: review contact sheet and local HTML.
- This report and `docs/qa/opening-prototype/` evidence.

## Validation and limits

Final rerun results are recorded below after the opaque cover and narrow-screen correction. Screenshots include keyboard focus outlines deliberately. Intermediate screenshots follow a 700ms wait, but capture overhead means they are illustrative samples, not exact synchronized frames.

Final browser run: **PASS**, eight approach/viewport combinations in local Chrome, 18 October 2026 (Asia/Jakarta). Viewports: 320×568, 390×844, 768×1024, 1440×900.

| Approach | 320px | 390px | 768px | 1440px |
|---|---:|---:|---:|---:|
| A handoff, ms | 1415.5 | 1412.7 | 1414.8 | 1420.3 |
| B handoff, ms | 1411.3 | 1413.6 | 1416.9 | 1409.6 |

- Tab reaches CTA; visible outline confirmed. Enter opens both variants at all four sizes. Space activates both with reduced motion. Pointer activation separately passes for both at 390px.
- Hero heading receives focus; scroll position remains zero at handoff; subsequent wheel scrolling moves the document. No horizontal overflow in any combination. Hero images are loaded at handoff; no page errors.
- Reduced-motion runs: handoff completes within the 1000ms test timeout and zero running animations remain. The code uses a 100ms timeout; exact reduced-motion elapsed time was not separately measured.
- Axe: zero violations in Opening and Hero across all eight combinations. Manual screenshot inspection covered narrow/mobile and desktop composition plus both intermediate transitions.
- Observed load CLS ranges from 0.00016 to 0.00271. This is local evidence, not a field Core Web Vitals claim. Production build reports 116kB first-load JavaScript for the home route; both approaches use the same bundle.
- `npm run build` (isolated `.next-editorial-prototype`), `npm run typecheck`, `npm run lint`, focused ESLint and `git diff --check`: passed. `npm test`: 5/5 passed; Node emitted the existing module-type warning. Browser command: `node scripts/check-opening-prototype.mjs`; review sheet: `node scripts/preview-opening-prototype.mjs`.
- Initial sandbox localhost access and font fetching failed; reruns with approved access succeeded. A first browser run exposed late lazy-loaded Hero ornaments; priority loading fixed it and the final full run passed.

No video is used. Video requests are blocked during QA and the interface works entirely through CSS and text; codec failure/fallback testing is **NOT APPLICABLE**, rather than a claimed passing video test.

The raw `imageBytes` diagnostic is incomplete because it filters only `img` initiators (priority preloads can use other initiators) and includes cache effects. It is not a reliable total network budget or an A/B performance ranking.

Local Chromium emulation does not prove real-device Safari performance. FPS, throttled mobile LCP and production Core Web Vitals remain **NOT TESTED**. The collected frame intervals include screenshot overhead and must not be used as an FPS benchmark. Axe results only cover Opening and Hero, not the whole site. Live Supabase, deployment and remaining-section regression testing are outside this phase.

Real date/location and final content remain pending. `10-Memory-Prompt.txt` was not found in the repository. Phase 4 is held for review of these two prototypes, as requested.
