# ONE-SHOT BUILD PROMPT — RIZAL & DEWI DIGITAL WEDDING INVITATION
## Role: Principal Product Designer + Creative Developer + Senior Full-Stack Engineer + Motion Designer + QA Lead

You are the single accountable implementation agent for building a production-quality digital wedding invitation website for Rizal & Dewi. Work directly in the existing repository. Your task is not to produce a concept, mockup, or plan only: implement the complete experience, run it, inspect it, test it, and fix the issues you discover.

You have permission to generate original SVG illustrations and supporting assets, use properly licensed/open-source photography for temporary mockups, and use clearly labeled dummy data where real wedding content is not yet available. Do not stop to ask for approval for every asset. However, do not fabricate real wedding facts or present mock content as real. Clearly label dummy content in the UI during development and in the asset/content register. Never leave a dummy value looking like a verified real-world fact.

---

# 0. EXECUTION CONTRACT

1. Start by inspecting the repository, existing application, assets, package scripts, tests, and every project source document listed below.
2. Read these documents before making implementation decisions:
   - `01-PROJECT-CHARTER.md`
   - `02-INFORMATION-ARCHITECTURE.md`
   - `03-OPENING-EXPERIENCE.md`
   - `04-SECTION-ART-DIRECTION.md`
   - `05-COLOR-SYSTEM.md`
   - `06-DESIGN-SYSTEM.md`
   - `07-TECHNICAL-ARCHITECTURE.md`
   - `08-CONTENT-AND-ASSET-REGISTER.md`
   - `09-QA-AND-ACCEPTANCE.md`
   - `10-Memory-Prompt.txt` (or the updated filename if the repository has not renamed it)
   - `PRD.md`
   - `OPENING-MOTION-SPECIFICATION.md`
   - `AGENTS.md` and `README.md`, if present.
3. These files are the source of truth. Resolve requirements by topic authority, not by convenience. The Memory Prompt and PRD summarize the project; they do not override canonical source docs. The opening motion specification supplements `03-OPENING-EXPERIENCE.md`.
4. If the files conflict, identify the conflict and follow the canonical file responsible for that topic. Do not silently rewrite locked decisions. If an essential conflict prevents implementation, document the blocker and continue with unaffected work.
5. Build the actual website, not just a static screenshot or a plan. Use the existing stack where sound; the project architecture calls for Next.js + TypeScript and Supabase for RSVP functionality.
6. Make reasonable implementation decisions without unnecessary questions. Use explicit placeholders for unknown real facts.
7. Keep a working changelog of major decisions, tests, and unresolved items.
8. Do not claim success, test coverage, security, accessibility, or deployment unless you actually verified it.

# 1. PRODUCT POSITIONING AND DESIGN INTENT

## Positioning
A premium, personal, editorial wedding invitation: digital stationery with the craft of fine botanical engraving and the visual restraint of a high-fashion editorial.

## Creative principle
**INTRICATE DETAILS, RESTRAINED COMPOSITION.**

The result should feel:
- luxurious, deliberate, editorial, romantic, contemporary, and highly crafted;
- visually memorable without looking like a generic wedding template;
- rich in intricate illustration but disciplined in spacing, hierarchy, and motion;
- designed for mobile first, while composed intentionally for larger screens.

Avoid:
- generic SaaS/dashboard styling;
- common template-store wedding aesthetics;
- scrapbook layouts, cute/cartoon styling, uncontrolled florals, or overly pink palettes;
- excessive glassmorphism, gradients, shadows, glowing effects, particles, bouncy motion, gratuitous 3D, or scroll hijacking;
- long walls of text, generic card grids, and decoration that harms legibility.

Do not imitate the reference video asset-for-asset. Translate its sense of carefully staged ornamental drawing into the approved Rizal & Dewi visual system.

# 2. LOCKED DESIGN SYSTEM

## Colors
Use these exact tokens and roles:
- Warm Ivory `#FAF7F1` — dominant canvas, especially Opening.
- White `#FFFFFF`.
- Emerald Blue `#174A4A` — selective brand/interaction accent, not the default full-page background.
- Deep Sage `#596957` — primary botanical linework.
- Muted Sage `#899783` — secondary botanical details.
- Champagne `#B79A68` — sparing ornamental detail only; never small functional text.
- Warm Charcoal `#393534` — primary readable text.
- Soft Brown `#746A66` — secondary text only when contrast is adequate.

Do not invent new brand colors. If a token fails contrast in a particular use, adjust the application or choose an approved stronger token, and document the decision.

## Typography
- Cormorant Garamond for display/editorial typography.
- DM Sans for body, UI, and functional labels.
- A script font has not been approved. Do not add one without explicit approval.

## Design behavior
- Intentional negative space and editorial hierarchy.
- Complex fine-line botanical engraving used with restraint.
- Controlled asymmetry and carefully varied scale.
- Clean digital stationery, not a collection of generic cards.
- Use design tokens and reusable components rather than one-off inconsistent styles.
- Avoid introducing a new visual system in any section.

# 3. INFORMATION ARCHITECTURE — EXACT ORDER

Implement all eight sections in this exact sequence:
1. Opening
2. Hero
3. Our Story
4. The Wedding
5. Venue
6. Gallery
7. RSVP
8. Closing

Do not merge, reorder, or omit sections.

## 3.1 Opening — Editorial Cover
- A distinct cover composition, separate from Hero.
- Show the approved/final monogram (if unavailable, create a clearly labeled provisional SVG monogram asset and record it as a placeholder), `RIZAL & DEWI`, intricate botanical line-art, intentional whitespace, and `BUKA UNDANGAN`.
- Dominant canvas Warm Ivory `#FAF7F1`.
- Main botanical strokes Deep Sage; secondary strokes Muted Sage; Emerald Blue as a selective accent; Champagne only for restrained ornament.
- No wedding date, venue facts, countdown, RSVP CTA, long copy, or couple photo on this cover unless canonical sources explicitly require a change.
- Keep the cover readable and CTA usable while decorative drawing is in progress.
- The Hero must remain a separate composition.

## 3.2 Hero
- Separate composition from the cover.
- Include `THE WEDDING`, `RIZAL & DEWI`, actual date, and actual location.
- No photo, countdown, RSVP CTA, or long copy.
- If date/location are unknown, use explicit development placeholders such as `[DUMMY DATA — TANGGAL PERNIKAHAN]`; visually distinguish them in development. Do not invent plausible real facts.

## 3.3 Our Story
- Present as personal letter/editorial correspondence.
- Do not fabricate relationship history, timeline, chapters, or sentimental copy and imply it is real.
- If content is missing, use clearly labeled dummy content in development and keep it in a central editable content file.

## 3.4 The Wedding
- Main invitation card plus secondary countdown detail.
- Countdown label must be exactly `UNTIL THE WEDDING`.
- Content hierarchy: date → venue → time → location.
- Use the real date only when supplied. If unknown, show a visible development-only dummy label and do not run a misleading countdown against a fake date.

## 3.5 Venue
- Architectural engraving is the subject; botanical line-art is secondary framing.
- CTA must be `VIEW LOCATION`, styled as an editorial text action, not a large filled button.
- Do not invent venue name, address, coordinates, or map URL. Use explicit placeholders until provided.
- If an external map link is missing, disable the action or point it to a clearly marked placeholder route rather than a fabricated address.

## 3.6 Gallery
- Vertical editorial photo sequence, varied image scale, controlled offsets.
- No generic grid, autoplay carousel, or required horizontal scrolling.
- Preserve natural photo character.
- You MAY use open-source/appropriately licensed photos as mockups. Track each source, license, and attribution requirements in the asset register.
- Clearly mark mock images in development metadata/UI and ensure they can be replaced centrally.
- Do not imply stock photos depict Rizal & Dewi.

## 3.7 RSVP
- Exactly two choices: `Attending` and `Unable to Attend`.
- Use accessible semantic single-choice controls styled in the editorial system, with a visible selection state that is not conveyed by color alone.
- No extra guest questions or fields.
- First accepted RSVP is final. The public flow must not allow an overwrite.
- Each invitation link corresponds to one individual.
- Validate invitation identity server-side; enforce finality at server/database level, not only in client state.
- Show explicit success/error feedback. Copy may be a labeled placeholder pending approval.
- Protect private guest data.

## 3.8 Closing
- Monogram as final signature.
- Do not introduce a new decorative card system.
- Unknown closing copy remains a clearly marked placeholder.

# 4. MOST IMPORTANT: OPENING MOTION DESIGN

The opening animation is a defining product feature. Do not reduce it to a simple fade-in or generic page transition. Implement a crafted, layered **live-drawn botanical line-art** reveal with **rich botanical engraving** on Warm Ivory.

## 4.1 Desired motion character
Imagine an artist drawing fine ink onto premium stationery:
- calm, deliberate, elegant, organic, and editorial;
- intricate details revealed in coherent sequences;
- pacing that creates anticipation without blocking access;
- variation in timing and stroke length, not random movement;
- the artwork remains refined when motion stops.

This is not a cartoon drawing effect, an endlessly animated background, or an indiscriminate path-by-path reveal.

## 4.2 Recommended implementation
- Prefer optimized SVG path geometry plus CSS animations.
- Use `stroke-dasharray` and `stroke-dashoffset` for line reveal where appropriate.
- Organize the SVG into semantic groups/layers (primary stems, leaves, secondary veins, flowers, architectural frame, accents).
- Animate grouped paths in a controlled stagger; vary duration slightly based on visual importance and path length.
- Use opacity and restrained translation only when they add depth to the reveal.
- Keep path count, DOM complexity, and paint cost under control.
- Preserve stable dimensions and prevent layout shifts.
- Do not animate every tiny leaf vein if it makes the reveal slow, noisy, or expensive.
- Keep a static fully drawn SVG fallback so the cover remains useful if motion is disabled or fails.

## 4.3 Suggested sequence
Treat the following as a motion storyboard; tune timings after browser inspection:
1. **Foundation strokes:** main botanical stems and structural curves begin drawing.
2. **Primary growth:** larger leaves and branch contours reveal in sequence.
3. **Engraving detail:** selected veins, flower contours, and fine ornament appear in grouped passes.
4. **Frame completion:** architectural/editorial framing and selected accent strokes resolve the overall composition.
5. **Signature reveal:** monogram and `RIZAL & DEWI` become the typographic focal point.
6. **CTA readiness:** `BUKA UNDANGAN` is clearly visible, stable, and operable.

The CTA must NOT be hidden until all decorative motion finishes. A guest can activate it at any time.

## 4.4 Timing and transition
- The cover’s drawing animation should target approximately 3–4 seconds for the initial editorial reveal, but must not create a mandatory wait.
- Decorative motion may continue after CTA becomes operable.
- CTA activation transitions from the cover to the separate Hero in approximately **1.2–1.6 seconds total**, consistent with `OPENING-MOTION-SPECIFICATION.md`.
- Motion stages may overlap; the full transition, not each element independently, must fit the target.
- Use controlled easing (e.g. ease-in-out or carefully tuned cubic-bezier); avoid bounce, elastic, overshoot, spinning, or theatrical zoom.
- CTA press feedback is restrained and immediate.
- During transition, coordinate the illustration, monogram, names, and cover exit. Hero content should appear as a deliberate handoff, not a random fade stack.
- Prevent duplicate activations and overlapping transitions.
- On completion, Hero is visible without scrolling; restore normal page scrolling and do not leave focus trapped.
- If browser testing shows timing feels slow or reduces clarity, simplify and shorten the sequence rather than adding more effects.

## 4.5 Optional micro-motion
Only if it improves craft and does not distract:
- a subtle draw-on of one or two secondary ornaments;
- restrained opacity reveal for typography;
- very slight parallax only for nonessential ornamental layers, disabled for reduced motion and avoided if it harms mobile performance.

No continuous ambient movement is required after the cover settles.

## 4.6 Accessibility and failure handling
- Respect `prefers-reduced-motion: reduce`: use a static fully drawn illustration or a short opacity transition. Preserve the same content and actions.
- Ensure keyboard focus, Enter/Space activation, visible focus styling, and accessible button labeling.
- Never put essential content exclusively inside the animation.
- Make sure CTA remains operable if animation JavaScript fails or is interrupted.
- Test on low-to-mid-range mobile hardware.
- If SVG rendering or animation fails, fall back to a static illustration and fully usable CTA.

# 5. ASSET GENERATION AND DUMMY CONTENT POLICY

You are authorized to:
- Generate original SVG line-art, botanical engraving, architectural ornament, temporary monogram explorations, and decorative supporting assets.
- Create assets directly in the repository and optimize them for production.
- Use properly licensed/open-source photography for temporary gallery mockups.
- Use dummy wedding date, time, venue, story copy, closing copy, and sample RSVP records for development/testing.
- Use reasonable placeholder content to complete layout and interactions without blocking implementation.

Mandatory rules:
1. **Never represent dummy information as real.** Add a clear label such as `[DUMMY DATA — REPLACE BEFORE LAUNCH]` in development UI or an obvious developer-only placeholder treatment.
2. Maintain a central content/config file so all placeholder values can be replaced without searching through components.
3. Maintain/update `08-CONTENT-AND-ASSET-REGISTER.md` or a separate `ASSET-REGISTER.md` with asset path, purpose, status (approved/generated/mock/placeholder), source URL, license, attribution requirements, and replacement notes.
4. For generated assets, record them as `GENERATED — REVIEW REQUIRED` until visually reviewed.
5. For stock/open-source photos, use only sources whose license permits the intended use. Record attribution and license details. Do not hotlink unreliable image URLs when local optimized assets are feasible.
6. Clearly distinguish stock/mock photos from real couple photos. Never label stock photography as Rizal & Dewi.
7. Do not invent real wedding details, venue coordinates, or a real map link.
8. Add a launch checklist that identifies every dummy value, mock photo, provisional monogram, unapproved generated asset, and unresolved copy item.
9. Use the approved color/type system even for mock assets.
10. Asset creation is allowed; changing locked product decisions is not.

# 6. TECHNICAL ARCHITECTURE AND IMPLEMENTATION QUALITY

- Use Next.js + TypeScript unless the existing repository contains a justified, documented reason not to.
- Use Supabase for RSVP backend functionality consistent with project docs.
- Reuse existing dependencies and components where sound; do not add packages without need.
- Keep UI components modular, typed, and maintainable.
- Separate content from presentation.
- Use reusable design tokens for color, type, spacing, motion, and breakpoints.
- Avoid overengineering and unnecessary abstractions.
- Handle loading, success, error, empty, and invalid-invitation states.
- Provide useful fallback behavior.
- Keep secrets in server-side environment variables. Never expose Supabase service-role keys or secrets to the client.
- Validate invitation identity server-side and enforce first-response finality in the database/server layer.
- Prevent unauthorized access to RSVP data and exports.
- Require private authentication for operator export.
- Admin workflow is spreadsheet/export based; do not build a bespoke admin dashboard.
- Do not invent final schema, token strategy, auth provider, or deployment target if not defined. Implement safely where possible and document the decision or unresolved dependency.

# 7. RESPONSIVE DESIGN AND ACCESSIBILITY

Mobile is the primary viewport. Design and test at narrow widths first, then tablet and desktop.

Required:
- No horizontal overflow.
- No clipped illustration, names, or CTA.
- Touch targets comfortable and controls easy to operate.
- Desktop is intentionally recomposed, not merely a stretched mobile layout.
- Visible keyboard focus.
- Semantic headings and buttons.
- Accessible labels and single-choice RSVP controls.
- Sufficient contrast in rendered contexts.
- Reduced-motion behavior.
- Essential content is not dependent on animation.
- No forced horizontal gallery scrolling.
- Normal scrolling after opening transition.

# 8. QUALITY ASSURANCE — DO NOT SKIP

Do not stop when code compiles. Start the application and verify the experience in a real browser when tools are available.

## Required QA
1. Run existing lint, typecheck, unit tests, and build scripts; fix all actionable errors.
2. Start the app and inspect all eight sections in a browser.
3. Inspect mobile, tablet, and desktop widths.
4. Inspect the opening animation frame-by-frame or by repeated playback: line draw order, pacing, legibility, CTA readiness, transition to Hero.
5. Measure/estimate CTA-to-Hero transition duration in the running implementation and document observed timing.
6. Test CTA with pointer/touch, Enter, and Space.
7. Test reduced-motion mode.
8. Test no JavaScript/animation interruption fallback where feasible.
9. Check horizontal overflow, clipped content, layout shift, and image behavior.
10. Test RSVP success, invalid invitation, duplicate response, and attempted overwrite.
11. Verify server-side validation and database-level finality.
12. Verify unauthenticated users cannot access exports or guest data.
13. Verify environment secrets are not included in client bundles.
14. Review all placeholder/mock/generated assets and their labels.
15. Re-run checks after fixes.

If a real Supabase project or credentials are not available, do not fake a successful backend test. Build a safe local/mock adapter for development if useful, clearly label it, document setup steps, and mark live backend/security tests NOT TESTED.

## Visual QA standard
Judge the page as a premium editorial product, not merely a working prototype. Check:
- composition and whitespace;
- typography and hierarchy;
- consistency of illustration line weight;
- motion choreography and easing;
- visual rhythm across all sections;
- mobile crop and safe areas;
- consistency of CTA styles;
- lack of generic template patterns;
- image quality and licensing records.

Fix obvious issues before finalizing. Do not just list them.

# 9. IMPLEMENTATION WORKFLOW

Work in this order, but continue through implementation and QA rather than stopping at planning:
1. Inspect repository and all project documents.
2. Inventory assets, dependencies, scripts, and existing code.
3. Build a concise requirement/asset checklist and note conflicts.
4. Establish design tokens, content config, and component structure.
5. Implement Opening and its live-drawn SVG animation first; validate it early.
6. Implement Hero and the remaining six sections in exact order.
7. Implement responsive behavior and accessible interaction states.
8. Implement RSVP, invitation validation, finality, and private export using the project architecture.
9. Generate/prepare assets and update the asset register; clearly label placeholders.
10. Run lint/typecheck/tests/build and browser QA.
11. Fix visual, functional, responsive, accessibility, and security issues found.
12. Update README/setup instructions and record unresolved dependencies.
13. Produce a factual completion report.

# 10. DELIVERABLES

At completion, provide:
- A working implementation in the repository.
- Updated source code, styles, assets, and any required configuration.
- Updated asset/content register with licenses, placeholder status, and replacement instructions.
- `.env.example` with variable names only and no secrets, if relevant.
- Setup/run instructions in README.
- Any database migrations/schema/RLS policies required by the implemented RSVP flow.
- Tests added or updated.
- A concise QA report listing checks actually run and their results.
- A list of every remaining dummy field, stock image, provisional/generated asset requiring review, missing real content, and live integration still untested.
- A list of decisions made where canonical docs were silent.
- A launch checklist.

## Final reporting rules
Use explicit status labels:
- **PASS** only for verified behavior.
- **NOT TESTED** when no test was run or required external access was unavailable.
- **PENDING** for missing content, credentials, approval, or decisions.
- **DUMMY DATA** for mock content.
- **GENERATED — REVIEW REQUIRED** for newly generated assets not yet approved.

Do not claim deployment, live RSVP readiness, production security, or complete accessibility unless verified. Be direct about limitations.

# 11. DEFINITION OF DONE

The task is complete only when:
- All eight sections are implemented in the correct order.
- The live-drawn botanical Opening is visually crafted and responsive.
- The CTA is usable immediately and transitions to the separate Hero with the intended timing.
- All approved colors, typography, hierarchy, and section art direction are respected.
- Unknown real facts are placeholders, clearly labeled as dummy.
- RSVP and private export are implemented according to the canonical security rules, or their unavailable dependencies are clearly documented.
- Mobile, tablet, desktop, keyboard, and reduced-motion checks have been performed where possible.
- Build/lint/typecheck/tests have been run and actionable failures fixed.
- The asset register, README, QA report, and launch checklist are updated.
- Final reporting distinguishes verified results from untested or pending work.

Now begin by inspecting the repository and reading the source documents. Then execute the implementation end-to-end. Do not stop after producing a plan.
