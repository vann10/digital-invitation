# AGENTS.md — Rizal & Dewi Digital Invitation

## Mission

Build and maintain a premium, mobile-first digital wedding invitation for Rizal & Dewi. Treat the ten canonical project documents as the source of truth. The website should feel like luxury high-fashion editorial stationery brought to life digitally.

**Core principle: Intricate Details, Restrained Composition.**

The result must be visually premium, cohesive, responsive, accessible, and technically reliable. Do not confuse “premium” with excessive decoration, generic wedding-template patterns, or animation for its own sake.

## 1. Read the source documents first

Before making implementation changes, read `README.md` and all ten project source files:

1. `01-PROJECT-CHARTER.md`
2. `02-INFORMATION-ARCHITECTURE.md`
3. `03-OPENING-EXPERIENCE.md`
4. `04-SECTION-ART-DIRECTION.md`
5. `05-COLOR-SYSTEM.md`
6. `06-DESIGN-SYSTEM.md`
7. `07-TECHNICAL-ARCHITECTURE.md`
8. `08-CONTENT-AND-ASSET-REGISTER.md`
9. `09-QA-AND-ACCEPTANCE.md`
10. `10-Memory-Prompt.txt`

Do not rely on this file alone when implementing a feature. Follow the source document with authority for the relevant topic:

- Project-wide purpose, locked decisions, and status: `01-PROJECT-CHARTER.md`
- Eight-section order and content model: `02-INFORMATION-ARCHITECTURE.md`
- Opening sequence, motion, and reduced-motion behavior: `03-OPENING-EXPERIENCE.md`
- Per-section visual direction: `04-SECTION-ART-DIRECTION.md`
- Palette and semantic color use: `05-COLOR-SYSTEM.md`
- Shared typography, layout, tokens, components, accessibility, and motion principles: `06-DESIGN-SYSTEM.md`
- Stack, RSVP rules, security, and export requirements: `07-TECHNICAL-ARCHITECTURE.md`
- Asset and content readiness: `08-CONTENT-AND-ASSET-REGISTER.md`
- Acceptance criteria and evidence requirements: `09-QA-AND-ACCEPTANCE.md`
- `10-Memory-Prompt.txt` is a concise memory aid and cannot override the documents above.

Authority is topic-specific, not based on which file is newest. If canonical documents conflict and no explicit user decision resolves the conflict, record **`CONFLICT — USER CONFIRMATION REQUIRED`**. Never silently alter a locked decision.

## 2. Existing assets first — ask before generating new assets

**Use and inspect assets already available in the repository or explicitly supplied by the user first.**

Before creating or generating a new image, illustration, monogram, photograph, venue artwork, or other visual asset:

1. Inspect the repository and asset directories.
2. Identify reusable assets and check their suitability, quality, format, dimensions, licensing/usage notes where available, and mobile performance.
3. Reuse suitable existing assets and optimize their delivery when necessary without changing their approved appearance.
4. **If a new generated asset appears necessary or would materially improve the result, ask the user for confirmation before generating it. Do not generate it pre-emptively.**
5. If confirmation is not available, implement the layout with an honest, clearly tracked placeholder or a non-deceptive CSS/SVG treatment that does not pretend to be a final approved asset.

Do not fabricate real couple photographs, personal relationship history, a specific venue, final monogram artwork, or other wedding-specific facts/assets. Do not present a generic or generated building as the actual venue. Never use broken or unreliable external image URLs for essential visual content.

Original CSS/SVG work that is part of the interface implementation is allowed when it does not amount to generating a new visual asset requiring approval. If uncertain whether an illustration counts as a new asset, ask first.

## 3. Locked creative direction

- Experience: **Luxury High-Fashion Wedding Editorial**.
- Visual principle: intricate details, restrained composition.
- Feel: refined, romantic, modern, spacious, deliberate, and editorial.
- Use controlled asymmetry, generous negative space, fine rules, detailed engraving, typography, carefully framed photography, and restrained material cues.
- Avoid generic wedding templates, SaaS/dashboard UI, scrapbook styling, distressed vintage treatment, childish styling, excessive floral decoration, heavy gradients/shadows, glassmorphism, large rounded UI cards, and decoration used merely to fill space.
- Whitespace is an intentional compositional element.
- Do not tint every photograph to match the palette; preserve natural photographic character.
- Do not make every section use the same card layout or alternate backgrounds mechanically.

### Locked palette

- Emerald Blue `#174A4A`: selective brand and interaction accent.
- Warm Ivory `#FAF7F1`: dominant canvas.
- White `#FFFFFF`: selected stationery surfaces.
- Muted Sage `#899783`: secondary botanical details.
- Deep Sage `#596957`: primary botanical structure.
- Champagne `#B79A68`: restrained ornament only.
- Warm Charcoal `#393534`: primary readable text.
- Soft Brown `#746A66`: supporting text only when contrast is sufficient.

Do not add brand colors without explicit approval. Champagne and Muted Sage must not be used for small functional text when contrast is inadequate.

### Locked typography

- Cormorant Garamond: couple names, major headings, date centerpiece, invitation typography, selected editorial statements.
- DM Sans: body, labels, metadata, location, links, controls, and functional copy.
- Script family: **PENDING**. Do not select or use a new script font as if approved.

Follow the sizing and spacing baselines in `06-DESIGN-SYSTEM.md`, validating them against actual rendered layouts.

## 4. Mobile-first is mandatory

Design for mobile screen ratios first. Mobile is not a shrunken desktop design; desktop must be an editorial recomposition.

- Prioritize the initial mobile viewport, especially the Opening cover and `BUKA UNDANGAN` CTA.
- Keep all essential cover elements and the CTA comfortably visible without clipping or accidental overlap.
- Use fluid sizing and responsive spacing; avoid fixed heights that only work at one device size.
- Check narrow mobile, typical mobile, tablet, and desktop widths.
- Preserve legibility, comfortable touch targets, and logical reading order.
- Prevent horizontal overflow, clipped typography, overlapping illustration, and layout shifts.
- Keep botanical detail visually rich but subordinate to essential text.
- Do not sacrifice the mobile composition to preserve desktop symmetry.
- Treat desktop as a deliberately recomposed editorial layout, not a stretched mobile column.

Use the responsive baselines in `06-DESIGN-SYSTEM.md`: mobile 0–767px, tablet 768–1023px, desktop 1024px and above, unless the existing implementation has a justified, documented convention that achieves the same behavior.

## 5. Eight required sections and their rules

Implement sections in exactly this order:

1. **Opening** — Editorial Cover with monogram, `RIZAL & DEWI`, complex botanical engraving, whitespace, and `BUKA UNDANGAN`.
2. **Hero** — a separate opened-invitation/editorial composition revealed after the Opening CTA. Content hierarchy: `THE WEDDING`, `RIZAL & DEWI`, actual date, actual location. No photography, countdown, RSVP CTA, or long-form copy.
3. **Our Story** — personal letter/editorial correspondence. Do not assume timeline, chapters, or chronology without approved copy.
4. **The Wedding** — main invitation card plus secondary countdown detail. Information hierarchy: date, venue, time, location. Exact countdown label: `UNTIL THE WEDDING`.
5. **Venue** — architectural engraving is the subject; botanical illustration is secondary framing. Mobile order: `VENUE`, illustration, venue name, location, `VIEW LOCATION`.
6. **Gallery** — vertical editorial photo sequence with varied image scale and controlled offsets. No generic grid, autoplay carousel, or required horizontal scrolling.
7. **RSVP** — only `Attending` and `Unable to Attend`. Use an editorial selection indicator while preserving accessible single-choice semantics. No extra fields.
8. **Closing** — monogram as final signature. Do not add a new decorative card system.

Never fabricate missing wedding information. Keep pending copy/data in a maintainable content layer and make release blockers explicit.

## 6. Motion and animation direction

The site should have a considered, polished motion system across transitions, reveals, static/ambient animation where appropriate, hover/pressed/focus feedback, section entrances, photography reveals, and state changes. **Motion must support the editorial experience, not compete with it.** Do not interpret “full animation support” as animating every element simultaneously or continuously.

Use `06-DESIGN-SYSTEM.md` and, for the Opening, `03-OPENING-EXPERIENCE.md` as the authority.

### Motion principles

- Prefer restrained opacity, clip/mask reveals, subtle translation, carefully timed stagger, botanical line reveals where performant, and deliberate editorial transitions.
- Motion should feel like typography, imagery, or stationery entering a composition—not like a dashboard, game, or generic UI kit.
- Use consistent easing and a coherent timing hierarchy. Design-system baselines are approximately 200–400ms for micro-interactions, 600–900ms for element reveals, and 900–1400ms for major transitions; the Opening has its own target below.
- Use CSS animations/transitions for simple effects. Add an animation dependency only if it provides meaningful value and is justified by the existing stack.
- Avoid bounce, elastic easing, spinning, particle explosions, excessive zoom, heavy 3D, flashing, long blocking intros, scroll hijacking, and motion that obscures content.
- Avoid persistent ambient motion that harms reading, performance, or battery life. Ambient animation must be subtle, limited, and non-essential.
- Do not make essential content available only after animation.
- Motion must not cause layout shifts, prevent scrolling, or block interaction unnecessarily.
- Respect `prefers-reduced-motion: reduce`: shorten or remove non-essential movement while preserving content, state feedback, and functionality.
- Ensure animation does not reduce keyboard focus visibility or accessible state feedback.

### Opening-specific locked behavior

The Opening is a separate Editorial Cover, not the Hero itself:

1. Initial cover is visible.
2. Guest activates `BUKA UNDANGAN` by pointer or keyboard.
3. CTA gives restrained activation feedback.
4. Selected cover elements reveal or move in a deliberate sequence.
5. Cover transitions away.
6. Separate Hero composition becomes visible.
7. Normal page scrolling continues.

Target total transition: approximately **1.2–1.6 seconds**, subject to real-browser validation. Scrolling must not be required to reveal the Hero. Reduced-motion users must receive a short opacity transition or immediate state change.

## 7. Technical and RSVP constraints

Confirmed stack and product rules:

- Frontend: Next.js + TypeScript.
- RSVP backend: Supabase.
- One individual per invitation link.
- First accepted RSVP response is final.
- Operator export requires private authentication.
- Administration uses spreadsheet/export, not a bespoke dashboard.

Technical details still pending in the source documents must not be represented as already approved, including schema, token strategy, authentication details, export implementation, retention policy, deployment target, and environment configuration.

Security requirements:

- Verify invitation identity on the server; do not trust a client-supplied guest ID alone.
- Enforce one accepted response per individual at the database/server level, including repeated or concurrent requests.
- Keep service-role secrets server-side.
- Protect operator authentication and export endpoints with authorization checks.
- Validate all input and handle invalid, duplicate, and already-submitted requests safely.
- Do not expose whether arbitrary invitation identifiers belong to a guest.
- Use environment variables and safe `.env.example` documentation; never commit real secrets.
- Show success only after backend confirmation. Preserve the selected response and allow appropriate retry after failure.
- Do not add unapproved RSVP fields.

If credentials or external services are unavailable, implement only what can be safely verified, document setup requirements, and mark live integration tests as `BLOCKED` or `NOT TESTED`. Never claim unverified security or deployment success.

## 8. Accessibility and performance

- Maintain normal text contrast of at least 4.5:1 and large-text contrast of at least 3:1.
- Provide visible keyboard focus and semantic controls/links.
- Do not communicate state through color alone.
- Ensure logical headings, reading order, useful alt text, and keyboard operation.
- Keep touch targets comfortable.
- Respect reduced-motion settings without removing content or functionality.
- Avoid oversized assets, heavy background video, excessive animation libraries, and unnecessary 3D.
- Optimize images and fonts appropriately; do not trade legibility or art direction for premature micro-optimization.
- Test actual rendered contrast and behavior; palette documentation alone is not proof of passing accessibility QA.

## 9. Implementation workflow

For meaningful implementation tasks:

1. Inspect the repository and relevant canonical documents.
2. Inspect available assets before proposing replacements or generation.
3. Preserve existing working architecture unless there is a concrete reason to change it.
4. Make a concise internal plan and implement the complete relevant workflow rather than stopping at a plan.
5. Run available type checks, linting, builds, and relevant tests.
6. Where browser tooling is available, inspect rendered mobile and desktop layouts, Opening transition, all sections, and RSVP states.
7. Fix observed regressions and rerun relevant checks.
8. Report actual results and unresolved issues.

Use reusable components and semantic design tokens. Avoid monolithic components, duplicated design rules, unnecessary dependencies, and unrelated refactors.

Do not commit, push, deploy, run destructive production migrations, or expose private guest data unless explicitly authorized.

## 10. Status labels and release gate

Use the source documents' status vocabulary accurately:

- **LOCKED** — approved; do not change without explicit user authorization.
- **DEFINED** — specified baseline; implementation may still require validation.
- **PENDING** — required input or decision not yet supplied.
- **PLACEHOLDER** — temporary content, not production data.
- **DEPRECATED** — historical reference that no longer governs implementation.
- **NOT TESTED** — no test evidence has been recorded.
- **BLOCKED** — verification or implementation cannot proceed because a dependency is unavailable.

Do not mark a criterion as passing without evidence. A successful build does not prove visual quality, responsive correctness, accessibility, RSVP integrity, or production readiness.

Before release, verify the acceptance criteria in `09-QA-AND-ACCEPTANCE.md`, including actual wedding data and approved assets. Keep any unverified criteria explicitly marked.

## 11. Final reporting

When finishing a task, report:

- What changed and which files were affected.
- Which existing assets were reused.
- Whether any new asset generation was proposed; do not generate one without user confirmation.
- Commands and tests actually run, with their real results.
- Browser viewports and interactions actually inspected.
- Remaining content, asset, environment, security, or deployment blockers.
- Acceptance criteria still marked `NOT TESTED` or `BLOCKED`.

Be precise. Do not claim a visual inspection, test, integration, or deployment occurred unless it actually did.
