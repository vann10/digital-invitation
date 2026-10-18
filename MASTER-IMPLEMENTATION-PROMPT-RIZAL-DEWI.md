# MASTER IMPLEMENTATION PROMPT — RIZAL & DEWI
## Strict Visual Fidelity, Realistic Botanical Artwork, Motion Design, and Production QA

You are a senior creative frontend engineer, luxury digital stationery art director, motion designer, and visual QA specialist.

Your assignment is to improve the existing Rizal & Dewi wedding invitation website so its rendered appearance closely matches the supplied storyboard and approved project assets.

**Primary visual reference:** `references/Elegant-Wedding-Website-Storyboard.png`  
**Section references:** `references/01-Opening.png` through `references/08-Closing.png`  
**Motion references:** `references/09-Opening-Animation-Sequence.png` and `references/10-Opening-to-Hero-Transition.png`  
**Color, typography, and texture reference:** `references/11-Color-Typography-Texture-Reference.png`  
**Primary identity asset:** the supplied R&D botanical monogram image.

Reference filenames may vary. Inspect the repository and locate the actual files before assuming these exact paths exist.

This is not a request to invent a new design inspired by the reference. Implement its visual identity, artistic style, artwork, palette, typography, paper texture, decorative language, and motion as faithfully as possible. Placement and spacing may adapt responsively, but the visual identity must remain consistent.

---

# 1. NON-NEGOTIABLE DESIGN PRINCIPLE

**VISUAL FIDELITY FIRST. CREATIVE INTERPRETATION LAST.**

The storyboard is the primary visual authority for appearance. Canonical project documents remain binding for content, architecture, functionality, security, and accessibility.

Core principle: **Intricate Details, Restrained Composition.**

The illustrations must be rich and detailed. The layout must remain elegant, deliberate, balanced, and readable.

Do not interpret “minimal elegance” as removing the visual details that give the reference its identity. Do not replace the design with a generic minimalist wedding website, plain ivory page dominated by empty space and thin lines, monochromatic beige template, generic cards, simple geometric decorations, minimalist botanical outlines as final artwork, or unrelated images when approved project assets exist.

The finished website must be recognizable as an implementation of the supplied storyboard. Do not claim pixel-perfect parity unless demonstrated.

---

# 2. FIRST ACTION — REPOSITORY AND REFERENCE AUDIT

Before changing code, audit the project.

## 2.1 Read project documentation

Inspect relevant files if present:
- `AGENTS.md`
- `PRD.md`
- `README.md`
- `01-PROJECT-CHARTER.md`
- `02-INFORMATION-ARCHITECTURE.md`
- `03-OPENING-EXPERIENCE.md`
- `04-SECTION-ART-DIRECTION.md`
- `05-COLOR-SYSTEM.md`
- `06-DESIGN-SYSTEM.md`
- `07-TECHNICAL-ARCHITECTURE.md`
- `08-CONTENT-AND-ASSET-REGISTER.md`
- `09-QA-AND-ACCEPTANCE.md`
- `10-Memory-Prompt.txt`
- Any supplemental opening-motion specification or approved design notes.

Canonical project documents are binding. The memory prompt is a summary and must not override canonical documents. Identify and resolve conflicts explicitly; do not silently discard requirements.

## 2.2 Inspect the implementation

Inspect Git status and preserve uncommitted work. Inspect framework, routes, components, CSS architecture, tokens, dependencies, build scripts, Opening/Hero behavior, navigation, animation code, backend, invitation validation, and RSVP flow.

Do not revert, delete, overwrite, or regenerate existing files during the initial audit.

## 2.3 Inspect all supplied references

Open and inspect the actual storyboard and section images. Do not rely only on filenames or descriptions. Use the overall storyboard for global art direction and individual images for section-specific composition. Motion images describe intended behavior; they are not executable animation files.

## 2.4 Inventory `/assets`

Recursively inspect actual contents, dimensions, formats, transparency, and quality of:
- Botanical/floral artwork.
- R&D monogram.
- Venue/architectural artwork.
- Landscapes.
- Gallery photographs.
- Borders and ornaments.
- Paper textures.
- Fonts.
- Motion assets.

Do not rely on filenames alone. Inspect actual visual content and create an asset-to-section mapping using real filenames. Identify missing assets explicitly.

Asset rules:
1. Approved existing assets take priority.
2. Reuse suitable artwork without degrading it.
3. Never replace rich approved artwork with simpler generated line art.
4. Never redraw the supplied monogram with ordinary text if the original is available.
5. Do not replace approved photos with unrelated generated or stock images.
6. Do not invent wedding dates, venue facts, addresses, or personal history.
7. Do not crop, recolor, distort, or remove transparency in ways that damage an asset.
8. Create replacement artwork only after confirming the required asset is missing.
9. Record new assets and provenance in the asset register.
10. Reference screenshots are guides, not images to display on the website.

After the audit, report findings and the planned changes briefly, then proceed unless a genuine blocker requires user input.

---

# 3. EXACT VISUAL ART DIRECTION

## 3.1 Overall aesthetic

Luxury high-fashion wedding editorial combined with realistic, richly rendered botanical fine art. The site should feel like premium printed wedding stationery translated into an immersive digital experience.

Required characteristics:
- Realistic hand-engraved botanical illustration.
- Painterly tonal rendering and dimensional shading.
- Detailed flowers, leaves, stems, veins, and natural contours.
- Refined architectural illustration and romantic landscapes.
- Editorial photographic compositions.
- Fine ornamental frames, dividers, and champagne details.
- Controlled layering and organic overlaps.
- Editorial typography.
- Warm ivory paper with tactile texture.
- Deep emerald and sage tones with restrained champagne accents.

Avoid generic SaaS patterns, flat templates, and oversimplified decoration.

## 3.2 Locked color palette

| Color | Hex | Role |
|---|---|---|
| Emerald Blue | `#174A4A` | Primary brand accent, CTA, interaction states, visual anchors |
| Warm Ivory | `#FAF7F1` | Dominant background |
| White | `#FFFFFF` | Selective surfaces and frames |
| Muted Sage | `#899783` | Secondary foliage and accents |
| Deep Sage | `#596957` | Principal botanical foliage |
| Champagne | `#B79A68` | Fine ornaments and highlights |
| Warm Charcoal | `#393534` | Main text |
| Soft Brown | `#746A66` | Secondary text when contrast is sufficient |

Warm Ivory remains dominant, but the site must not look washed out or monochromatic. Emerald Blue must be a recognizable brand color used intentionally for the primary Opening CTA, appropriate brand details, selected states, and meaningful visual accents. Use sage tones for foliage and champagne sparingly. Do not introduce arbitrary colors or change tokens without approval. Do not arbitrarily recolor approved artwork.

## 3.3 Typography

Use:
- Cormorant Garamond for display headings, names, and editorial statements.
- DM Sans for functional text, navigation, labels, and body copy.

Use intentional scale contrast, line breaks, letter spacing, and line height. Use italics where appropriate to the reference. Verify the rendered site actually loads the intended fonts.

## 3.4 Background paper texture

Distinguish:
1. **Canvas texture:** subtle warm ivory paper grain across the background.
2. **Artwork texture:** engraved marks, pigment variation, tonal shading, and fine-art detail inside the illustration.

Background noise alone does not satisfy the artwork-texture requirement. Reuse an approved texture if available; otherwise implement subtle, lightweight paper grain. It must not compete with text or reduce readability. Avoid heavy noise, obvious repetition, strong gradients, excessive shadows, gloss, or glassmorphism.

---

# 4. CRITICAL ART DIRECTION — REALISTIC BOTANICAL ARTWORK

**The primary botanical style is NOT minimalist line art.**

Required style: **Rich, realistic, colored botanical engraving with painterly shading, dimensional depth, intricate natural details, and a tactile luxury-paper aesthetic.**

## 4.1 Required illustration characteristics

**Realistic form and dimensionality**
- Flowers have distinguishable petals, layered structures, natural folds, highlights, and shadows between overlapping petals.
- Leaves have central and secondary veins, natural curvature, tonal variation, and dimensional shading.
- Stems and branches have organic forms and carefully rendered intersections.
- Overlapping elements have convincing depth.
- Botanical clusters are richly composed, not flat icons.

**Engraved and painterly detail**
Combine fine engraved marks with rich tonal rendering:
- Fine etched lines and delicate crosshatching where appropriate.
- Layered shading and tonal transitions.
- Muted color variation within petals and leaves.
- Soft highlights and contact shadows.
- Fine natural irregularities and intricate surface detail.
- Carefully rendered contours.
- Balance between engraved precision and painterly depth.

The result should resemble premium botanical illustration printed on luxury wedding stationery. It must not resemble a basic SVG icon pack, simple outline drawing, wireframe, or unshaded coloring-book illustration.

**Color treatment**
Use nuanced deep green, sage, and muted emerald foliage rather than one flat green. Flowers should have warm ivory tonal variation, subtle champagne details, delicate shadows, and dimensional petal rendering. Preserve approved source-art colors.

**Prohibited as final primary artwork**
- Minimalist outline-only illustrations.
- Thin monochrome contours without shading.
- Flat vector flowers made from a few shapes.
- Simplified botanical icons.
- Geometric or wireframe foliage.
- Uniform stroke-based leaves without realistic vein detail.
- Unshaded coloring-book drawings.
- Generic generated artwork that conflicts with the storyboard.

Line art is allowed only as a deliberate intermediate animation stage when the full colored artwork subsequently appears.

## 4.2 Finished artwork versus animation

Finished artwork and animation mechanism are separate concerns.

**Finished artwork:** detailed, colored, dimensional illustration with realistic engraved and painterly characteristics.

**Animation:** animate approved artwork using transforms, opacity, masking, clipping, or appropriate layered techniques.

Use SVG path drawing only when the artwork is genuinely suitable for vector stroke animation. Do not convert richly rendered raster illustration into simplistic line art merely to animate it. If a drawing-sequence effect is desired, a dedicated line-art layer may appear first, followed by the complete colored artwork. The final state must never remain a bare outline drawing.

For raster artwork, preserve its appearance and animate the image as a complete composition. Separate transparent artwork into layers only when source assets support this without damage.

## 4.3 Illustration acceptance gate

Inspect every new illustration at intended display size. Reject and revise if it is mainly thin outlines, lacks tonal depth or shading, has no visible petal/foliage layers, lacks expected leaf veins, has flat uniform coloring, looks like a generic vector icon, or conflicts with the storyboard. Do not report visual completion until this is checked against the rendered website.

---

# 5. PRIMARY R&D MONOGRAM

Use the supplied R&D botanical monogram as the primary Opening and Closing identity asset.

- Locate the uploaded image in project files or `/assets`.
- Preserve original artwork, proportions, colors, transparency, and detail.
- Use `object-fit: contain` or equivalent.
- Do not redraw, approximate, recolor, or replace it with plain text.
- Ensure sufficient resolution on desktop and mobile.
- Record its path and usage in the asset register.

If it has an opaque background, inspect the source before editing. Do not remove or alter it destructively without verifying that it is appropriate.

The monogram becomes the focal point after the botanical composition enters.

---

# 6. REMOVE THE PERSISTENT NAVBAR FROM THE OPENING

The Opening must feel like an immersive editorial invitation cover, not a conventional landing page.

- Remove the persistent top navbar from the Opening.
- Do not show conventional navigation links across the cover.
- Keep the monogram, botanical artwork, names, and `BUKA UNDANGAN` visually dominant.
- After the invitation opens, provide discreet in-invitation navigation or an on-demand menu.
- Preserve keyboard accessibility and focus behavior.
- Do not remove all useful navigation without an alternative.

---

# 7. OPENING ANIMATION AND TRANSITION

Implement and verify actual behavior in the running application; unused CSS declarations do not count.

## 7.1 Phase A — Botanical entrance

On initial load:
- Botanical artwork starts partially outside the viewport.
- Fade it in while moving into its intended composition.
- Separate groups enter from different directions with staggered timing.
- Motion feels organic and refined.
- Preserve original color and texture.

Target duration: approximately 1.4–2.0 seconds. Prevent offscreen elements from causing horizontal overflow.

## 7.2 Phase B — Living botanical motion

After entrance:
- Apply very subtle continuous motion.
- Use slow horizontal/vertical drift and restrained rotation where appropriate.
- Use long cycles of approximately 6–12 seconds.
- Offset timing and direction between groups.
- Avoid abrupt reversals, bouncing, spinning, exaggerated sway, or distracting motion.
- Keep the monogram dominant.

## 7.3 Phase C — R&D monogram reveal

After botanical entrance begins and the composition is established:
- Reveal the supplied monogram with opacity transition.
- Add a restrained scale-in, starting only slightly smaller than final size.
- Keep it subtle and elegant.
- Let the monogram become the focal point.
- Keep botanical movement gentle behind it.

Botanical appears first; monogram fades in afterward. Do not fade the monogram out during its initial reveal.

## 7.4 Phase D — Opening CTA

Display `BUKA UNDANGAN` beneath the monogram with clear hierarchy and Emerald Blue styling. It must be usable before decorative motion finishes, support pointer/touch/keyboard, show focus styling, remain readable, and use restrained hover/focus transitions.

## 7.5 Phase E — CTA-to-Hero transition

When `BUKA UNDANGAN` is activated:
1. Prevent duplicate activation during transition.
2. Stop or settle floating motion.
3. Move botanical elements outward toward viewport edges while fading them out.
4. Slightly reduce monogram scale and fade it out.
5. Reveal Hero through coordinated crossfade and optional subtle vertical reveal.
6. Complete in approximately 1.2–1.6 seconds.
7. Restore normal interaction after Hero appears.

The transition should feel like the invitation cover opening. Do not use particles, heavy 3D, dramatic zooms, or scroll hijacking.

## 7.6 Accessibility and performance

- Respect `prefers-reduced-motion`.
- Reduced motion: show complete artwork and monogram without continuous floating; use a short opacity transition at most.
- Decorative artwork must not intercept pointer events.
- Prevent horizontal overflow, layout shift, and flashes of missing artwork.
- Do not block the CTA.
- Use CSS transforms and opacity when sufficient.
- Add dependencies only when necessary.

## 7.7 Motion acceptance gate

Verify in a real browser:
- Botanical artwork visibly enters.
- Subtle idle motion continues.
- Monogram fades in after botanical entrance begins.
- CTA works before decorative motion finishes.
- CTA triggers botanical exit and Hero reveal.
- Transition cannot trigger multiple times.
- Reduced-motion behavior works.
- Desktop/mobile compositions remain balanced.
- Artwork remains richly colored and detailed.

Do not report motion as complete based on source code alone.

---

# 8. SECTION-BY-SECTION IMPLEMENTATION

Maintain the exact order:
1. Opening
2. Hero
3. Our Story
4. The Wedding
5. Venue
6. Gallery
7. RSVP
8. Closing

Use the individual section references where available. Adapt placement responsively without changing visual identity.

## 8.1 Opening
Create an immersive editorial cover with rich realistic botanical artwork, supplied R&D monogram, couple names, fine decorative framing where appropriate, warm ivory paper texture, Emerald Blue `BUKA UNDANGAN` CTA, and no persistent navbar. Implement the motion specified in Section 7.

## 8.2 Hero
Create a distinct editorial Hero, not a duplicate Opening. Include `THE WEDDING`, `RIZAL & DEWI`, approved wedding date, approved venue/location, and appropriate rich botanical artwork. Do not invent wedding facts or add unrelated photos or generic countdown widgets.

## 8.3 Our Story
Use an editorial letter/correspondence composition with refined typography, appropriate copy hierarchy, rich botanical artwork, subtle borders/dividers, controlled overlaps, and balanced negative space. Do not make it a generic corporate two-column layout. Do not invent the couple's story; use clearly marked placeholders until copy is approved.

## 8.4 The Wedding
Create a distinctive invitation card with refined ornamental framing and appropriate botanical artwork. Include wedding heading, approved date/venue details, and exact label `UNTIL THE WEDDING`. Use a real countdown only if a confirmed date exists. Do not fabricate a date; if unknown, use a clearly identified pending-content state while preserving hierarchy.

## 8.5 Venue
Use approved architectural artwork as the main visual subject. Include `VENUE`, illustration, approved venue name/address, editorial `VIEW LOCATION` action, and supporting botanical details. Do not use generic outlined architecture when detailed artwork exists. Do not present fictional artwork or a fabricated map as the real venue.

## 8.6 Gallery
Use approved photographs from `/assets`. Recreate varied image sizes, supported portrait/landscape arrangements, controlled offsets, deliberate spacing, refined framing, and botanical supporting details. Do not use a generic uniform grid, autoplay carousel, required horizontal scrolling, repeated placeholders, or unrelated generated photos. Preserve photo character and crop responsively without damaging subjects.

## 8.7 RSVP
Keep the editorial style and the two choices: `Attending` and `Unable to Attend`. Use restrained borders, refined typography, and meaningful Emerald Blue interaction states. Preserve server-side invitation identity validation, one individual per link, first accepted response finality, duplicate/unauthorized submission prevention, privacy of guest information, operator authentication, and private export. Never weaken security for visual effects.

## 8.8 Closing
Create a deliberate final signature with supplied monogram, appropriate rich botanical artwork, display typography, fine ornaments, warm ivory paper texture, and restrained Emerald Blue/champagne accents. It must feel like the final page of the same invitation, not a generic footer.

---

# 9. RESPONSIVE DESIGN

Responsive placement may change, but visual identity must remain.

**Mobile (~390px):**
- Preserve botanical artwork and monogram.
- Maintain display typography and textured ivory.
- Keep Emerald Blue accents visible.
- Preserve meaningful illustration detail.
- Avoid excessive empty vertical space, clipping, and horizontal overflow.
- Do not hide most artwork to simplify layout.

**Desktop (~1440px):**
- Restore intended composition and visual balance.
- Use width for deliberate image-text relationships and layering.
- Keep artwork prominent where shown in the reference.
- Avoid stretching content without compositional purpose.

Mobile must not become a generic separate template.

---

# 10. IMPLEMENTATION CONSTRAINTS

Inspect the current stack first. Preserve existing framework, routes, architecture, working functionality, design tokens, image optimization, and RSVP security where possible. Use CSS/SVG for suitable lightweight motion. Do not install dependencies without a demonstrated need or rewrite the entire application solely to simplify styling.

Do not create a competing design system, bypass approved assets with generated artwork, or silently discard requirements.

If an asset is genuinely missing, document the gap, create a matching replacement only when necessary, and record its origin/review status. Never fabricate real wedding facts.

---

# 11. MANDATORY VISUAL QUALITY ASSURANCE

Do not finish after editing code or seeing a successful build. Run the application in a browser and compare rendered output with the supplied references.

Capture at minimum:
- Desktop at approximately 1440px viewport width.
- Mobile at approximately 390px viewport width.

Inspect:
- Opening initial state.
- Botanical entrance while running.
- Living botanical motion.
- Monogram reveal.
- CTA-to-Hero transition.
- Hero, Our Story, The Wedding, Venue, Gallery, RSVP, Closing.

Use browser automation or existing tools when available. Check broken images, incorrect paths, font loading, animations that never run or only work in development, clipping, overlaps, layering, contrast, overflow, mobile collapse, console errors, failed requests, reduced motion, CTA/RSVP behavior, and security/invitation validation where applicable.

## 11.1 Mandatory visual comparison

Compare actual screenshots against the overall storyboard, individual section references, motion references, and palette/typography/texture reference.

Evaluate:
1. Overall aesthetic similarity.
2. Reuse of approved assets.
3. Botanical artwork quality, scale, and placement.
4. Realistic shading, tonal depth, and engraved detail.
5. Monogram integrity.
6. Architectural artwork.
7. Gallery imagery and composition.
8. Emerald Blue presence.
9. Warm ivory background and paper texture.
10. Typography and hierarchy.
11. Ornaments and visual layering.
12. Motion behavior.
13. Consistency across all eight sections.
14. Mobile preservation of identity.

If the result looks plainer, more generic, more monochromatic, or more outline-based than the reference, it is not finished. Fix significant discrepancies, recapture screenshots, and compare again until the main mismatches are resolved or a concrete asset/content limitation prevents progress.

Do not claim pixel-perfect parity without evidence.

## 11.2 Illustration-style quality gate

Inspect botanical and architectural artwork at full resolution and actual rendered size. Reject newly created artwork if it is predominantly thin, unshaded outline art where the reference requires rich, dimensional illustration.

Verify layered petals/foliage, tonal depth, fine botanical detail, nuanced palette-consistent colors, appropriate artwork texture, storyboard consistency, preserved richness during motion, and mobile quality. Background grain alone does not pass this gate.

## 11.3 Honest QA reporting

Mark a test `PASS` only when performed and observed. Mark untested items `NOT TESTED`. Do not claim animation verification without seeing it in a running browser, or visual parity based solely on source inspection.

---

# 12. DEFINITION OF DONE

Complete only when:
- The website closely matches the storyboard's visual identity.
- Assets are inventoried and correctly reused.
- The supplied R&D monogram is used without distortion or generic recreation.
- Botanical artwork is rich, colored, dimensional, and detailed—not minimalist outline-only art.
- Background has subtle paper texture and artwork has its own engraved/painterly detail.
- Palette is consistent and Emerald Blue is a visible brand color.
- Typography matches the editorial system.
- All eight sections share one cohesive design language.
- Gallery uses approved imagery when available.
- Persistent Opening navbar is absent.
- Botanical entrance and idle motion work.
- Monogram reveal works.
- CTA-to-Hero transition works.
- Reduced-motion behavior works.
- Desktop/mobile layouts have been inspected in a browser.
- RSVP and security remain intact.
- Build and relevant tests have been run.
- Remaining discrepancies and missing assets are documented.

## Final report

Provide:
1. Root causes of the original visual mismatch.
2. Asset inventory and asset-to-section mapping.
3. Files/components modified.
4. Palette, texture, typography, and illustration implementation details.
5. Motion implementation and browser verification.
6. Desktop/mobile screenshots.
7. Build/test results.
8. Missing content/assets.
9. Remaining visual discrepancies.
10. Requirements marked `NOT TESTED`.

**Final instruction:** Optimize for fidelity to the supplied visual reference while preserving accessibility, performance, responsiveness, and security—not for the smallest amount of code or the simplest layout.

The intended result is the Rizal & Dewi website in the supplied storyboard's visual language: not a generic minimalist interpretation, not a line-art-only remake, and not a new design that merely shares its colors.
