# Opening Motion Specification --- Rizal & Dewi

**Status:** Visual direction LOCKED; implementation and browser QA NOT
TESTED\
**Applies to:** Opening / Editorial Cover only\
**Authority:** Supplemental implementation specification. It does not
override the canonical project files, especially
`03-OPENING-EXPERIENCE.md`, `04-SECTION-ART-DIRECTION.md`,
`05-COLOR-SYSTEM.md`, `06-DESIGN-SYSTEM.md`, and
`09-QA-AND-ACCEPTANCE.md`.

## 1. Locked direction

-   **Creative direction:** Luxury High-Fashion Wedding Editorial.
-   **Principle:** Intricate Details, Restrained Composition.
-   **Animation style:** Live-drawn botanical line-art.
-   **Illustration density:** Rich botanical engraving.
-   **Background:** Warm Ivory `#FAF7F1`.
-   **Primary botanical:** Deep Sage `#596957`.
-   **Secondary botanical:** Muted Sage `#899783`, used at lighter
    visual weight.
-   **Selective accent:** Emerald Blue `#174A4A`.
-   **Ornamental highlight:** Champagne `#B79A68`, used sparingly and
    never as small functional text.
-   **Display type:** Cormorant Garamond.
-   **Functional/supporting type:** DM Sans.
-   **Script typeface:** Not selected; do not introduce one without
    approval.

The opening must feel like premium digital stationery being illustrated
in real time. Richness comes from intricate linework and careful
sequencing, not from a crowded layout or excessive effects.

## 2. Composition and hierarchy

The initial Editorial Cover must preserve the canonical hierarchy:

1.  Couple monogram.
2.  `RIZAL & DEWI`.
3.  Complex botanical engraving / fine line-art.
4.  Generous, intentional negative space and precise editorial framing.
5.  Primary CTA: `BUKA UNDANGAN`.
6.  Supporting micro-copy only if separately approved and necessary.

The illustration is an editorial framing element, not a generic floral
background. Use controlled asymmetry and maintain text legibility. Do
not reveal the wedding date, venue details, countdown, or other Hero
content on the cover unless the canonical content model is explicitly
revised.

### Responsive composition

-   **Mobile first:** Keep monogram, names, key illustration, and CTA
    within the initial viewport wherever practical. Preserve safe
    spacing and prevent clipping or overlap.
-   **Desktop:** Re-compose with controlled asymmetry and deliberate
    negative space; do not merely scale up the mobile layout.
-   **Detail management:** Keep the overall illustration rich, but
    reduce or simplify micro-details that become visually noisy or
    illegible on small screens. Do not scale all SVG linework
    indiscriminately.
-   **Surface:** Flat and refined. No prominent paper grain, distressed
    texture, heavy shadow, strong vignette, large gradients, or
    background clutter.

## 3. Live-draw illustration direction

### Intended visual effect

The botanical artwork should appear to be drawn with fine ink strokes,
revealing stems, leaves, veins, and selected floral contours in
deliberate groups. The effect should feel hand-rendered and
editorial---not like a tracing animation applied indiscriminately to
every path.

### Suggested draw order

1.  Main stems and structural botanical curves.
2.  Major leaves and branches.
3.  Secondary leaves and selected vein details.
4.  Intricate flower contours and ornamental intersections.
5.  Secondary framing strokes and restrained accent details.
6.  Monogram and couple-name reveal, coordinated with the illustration's
    final beat.

This is a sequencing guide, not a requirement to animate every path.
Prioritize visual hierarchy, legibility, and performance.

### Implementation approach

-   Prefer optimized inline SVG for illustration paths and CSS
    animations for line reveal and opacity/transform transitions.
-   Use `stroke-dasharray` and `stroke-dashoffset` where appropriate to
    create a draw-on effect.
-   Group related paths into semantic layers so timing can be controlled
    without hundreds of independent animations.
-   Set stable SVG `viewBox` values and responsive dimensions. Avoid
    hard-coded pixel geometry that breaks at narrow viewports.
-   Keep line caps and joins deliberate; use fine strokes that remain
    visible at mobile scale.
-   Use opacity and small, restrained positional changes only when they
    improve the reveal. Do not add bounce, elastic easing, spinning,
    particles, shatter effects, heavy 3D, or simulated physical
    page-opening.
-   Avoid making the illustration dependent on a large autoplay
    background video or an unnecessarily heavy animation library.

## 4. Motion sequence

The full CTA-triggered transition from the cover to the separate Hero
has a canonical target of approximately **1.2--1.6 seconds**. The
initial illustration can be visible in a partially drawn state, but do
not add a long mandatory intro that delays access. The timing below is a
proposed implementation sequence and must be validated in a real
browser.

### Initial state --- Editorial Cover

-   Warm Ivory canvas is immediately available.
-   The cover composition is stable and readable.
-   Botanical artwork may begin a subtle draw-on reveal on initial load
    only if it does not delay interaction or content access.
-   The CTA remains available and operable; it must not be hidden until
    a decorative animation finishes.

### CTA activation --- target total transition 1.2--1.6 seconds

1.  **0.00--0.12 s --- Activation feedback:** restrained pressed/active
    response on `BUKA UNDANGAN`.
2.  **0.08--0.55 s --- Selected linework reveal:** a short, staggered
    draw/reveal of selected botanical groups, only where it improves the
    composition.
3.  **0.25--0.85 s --- Cover hierarchy transition:** monogram, names,
    and selected ornamental elements move or fade in a controlled
    sequence. Preserve legibility for as long as practical.
4.  **0.65--1.20 s --- Cover exit:** the Editorial Cover composition
    recedes or fades away with restrained movement. Do not simulate a
    heavy physical object opening.
5.  **1.20--1.60 s --- Hero handoff:** reveal the separate Hero
    composition and make it the active page content.

Timing ranges can overlap. The total transition, not each layer
independently, should stay within the target. If browser testing shows
that the sequence feels slow or obscures content, shorten it.

### After transition

-   The Hero is a separate composition with its own hierarchy.
-   The Hero must become visible through CTA activation; scrolling must
    not be required to reveal it.
-   Normal page scrolling works after completion. Do not leave a scroll
    lock or trap.
-   Prevent duplicate CTA activations from starting overlapping
    transitions.
-   The transition must not expose intermediate states that leave the
    guest with no readable content.

## 5. Interaction and accessibility

-   Implement `BUKA UNDANGAN` as a semantic button with an accessible
    name.
-   Support pointer/touch and keyboard activation; preserve a clearly
    visible focus indicator.
-   Provide a comfortable touch target and adequate contrast.
-   Do not make essential information available only through animation.
-   Respect `prefers-reduced-motion: reduce`: remove or sharply shorten
    staggered drawing and movement; use an immediate state change or a
    short opacity transition. Preserve the same content and
    functionality.
-   Ensure the animation does not permanently trap focus or scrolling.
-   Avoid communicating state through color alone.

## 6. Color and typography rules

  -----------------------------------------------------------------------
  Role                    Token                   Usage
  ----------------------- ----------------------- -----------------------
  Main canvas             Warm Ivory `#FAF7F1`    Dominant opening
                                                  background

  Primary botanical       Deep Sage `#596957`     Main botanical linework

  Secondary botanical     Muted Sage `#899783`    Lighter secondary
                                                  details

  Selective accent        Emerald Blue `#174A4A`  Monogram or selective
                                                  brand emphasis

  Ornamental highlight    Champagne `#B79A68`     Small ornamental
                                                  details only

  Display typography      Cormorant Garamond      Couple names /
                                                  editorial display

  Functional typography   DM Sans                 CTA and supporting
                                                  interface text
  -----------------------------------------------------------------------

Do not use Champagne for small functional text. Check actual rendered
contrast; token selection alone is not evidence of compliance.

## 7. Performance expectations

-   Optimize SVG path count and complexity while preserving the approved
    rich engraving character.
-   Prefer grouped animations over one animation per tiny path.
-   Avoid layout shifts during drawing; reserve the composition's
    dimensions before animation starts.
-   Avoid continuous ambient animation after the cover settles.
-   Validate on representative mobile hardware and constrained network
    conditions.
-   If the rich animation harms responsiveness, prioritize readable
    composition, CTA responsiveness, and successful transition over
    animating every detail.

## 8. Acceptance checklist

Mark items PASS only with observed evidence. Otherwise keep status as
NOT TESTED.

### Visual

-   [ ] Warm Ivory `#FAF7F1` is the dominant canvas.
-   [ ] Rich botanical engraving is detailed but does not overwhelm
    names or CTA.
-   [ ] Palette roles follow the locked color system.
-   [ ] Monogram and `RIZAL & DEWI` retain the intended hierarchy.
-   [ ] Whitespace and controlled asymmetry are preserved.
-   [ ] No generic floral background, scrapbook treatment, heavy
    texture, or excessive effects.

### Motion and interaction

-   [ ] Selected botanical strokes appear to be drawn in a deliberate
    sequence.
-   [ ] The complete CTA-triggered transition measures approximately
    1.2--1.6 seconds in a real browser, or any deviation is documented.
-   [ ] CTA feedback is restrained and perceptible.
-   [ ] The CTA is available before decorative animation completes.
-   [ ] Pointer, touch, Enter, and Space activation work.
-   [ ] The cover transitions to the separate Hero without requiring
    scrolling.
-   [ ] Repeated activation does not create overlapping transitions.
-   [ ] Normal scrolling works after the transition.

### Responsive and accessibility

-   [ ] Mobile composition has no clipping, CTA overlap, or horizontal
    overflow.
-   [ ] Desktop is re-composed rather than simply enlarged.
-   [ ] Focus indicator is visible.
-   [ ] Reduced-motion mode preserves content and functionality while
    shortening/removing motion.
-   [ ] No essential information is hidden exclusively behind animation.
-   [ ] Contrast is checked on actual rendered text and controls.

### Performance

-   [ ] SVG assets are optimized.
-   [ ] No avoidable layout shift occurs during reveal.
-   [ ] Animation remains smooth on representative mobile hardware.
-   [ ] No heavy background video, particles, or unnecessary 3D
    rendering is introduced.

## 9. Explicit exclusions and unresolved items

-   This specification does not approve a new monogram design, wedding
    portrait, venue illustration, or other new asset. Inspect existing
    assets first and request approval before generating new
    wedding-specific assets.
-   The script font remains unselected.
-   The Hero composition remains separate from the Opening cover.
-   Wedding date/time, venue, story, and other production content must
    come from approved project content; do not invent them.
-   Implementation and browser QA remain **NOT TESTED** until actual
    results are recorded.
