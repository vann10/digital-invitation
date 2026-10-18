# Opening Experience — Cinematic Cover to Hero

**Status:** Creative direction approved; implementation details open to exploration.  
**Primary interaction:** Guest activates `BUKA UNDANGAN`.

## 1. Experience goal

The Opening should feel like a bespoke invitation cover coming alive. On activation, the artwork should choreograph itself into a transition that leads naturally into the Hero. The effect should feel luxurious, smooth, layered, and memorable—not like a standard fade between two screens.

**Target duration:** approximately **3–4 seconds** for the full Opening-to-Hero sequence. This is an experience target, not a requirement to keep guests waiting. Keep motion purposeful and let the Hero become usable as soon as the transition finishes. Consider a skip/fast path for repeat visits if it improves usability.

## 2. Initial Opening composition

Use the supplied `01-Opening` image as visual direction:
- Warm ivory paper-like background with fine texture.
- Ornate but controlled frame/rule.
- Intricate botanical illustration with cream flowers, sage/emerald foliage, and champagne accents.
- Prominent couple monogram and `RIZAL & DEWI`.
- Clear `BUKA UNDANGAN` CTA.
- Meaningful artwork near the top and bottom edges; avoid an empty central column that feels unfinished.

The reference is not a fixed wireframe. The agent may adjust composition, scale, borders, artwork placement, and typography to suit the actual viewport.

## 3. Transition choreography

Create a coherent multi-layer movement. Do not rely on opacity changes alone.

A possible choreography—not a mandatory implementation—is:

1. **Activation (0.0–0.3s):** CTA responds with a subtle press, light, or ornamental rule movement.
2. **Artwork responds (0.2–1.2s):** selected leaves, floral branches, border lines, or decorative elements move, draw, slide, or scale with restrained depth.
3. **Monogram and typography move (0.5–1.8s):** the monogram can separate into fine ornamental layers, scale, travel, or resolve into the Hero's typographic composition. Couple names may move along a coordinated path rather than simply vanish.
4. **Composition transforms (1.0–2.8s):** the cover's framing, paper texture, botanical branches, and ornaments shift or recompose. Some assets can travel toward the edges while others become Hero framing.
5. **Hero assembles (2.0–3.7s):** Hero typography, background details, landscape/botanical illustration, and ornamental elements enter in a coordinated sequence.
6. **Settle (up to 4.0s):** the scene settles into a stable composition; normal scrolling is available.

The agent should invent the actual choreography based on available assets. Use motion paths and transforms where they make visual sense; avoid mechanically moving every asset just because it can move. Movement should imply continuity between compositions.

## 4. Asset continuity

Whenever possible, reuse or visually connect selected assets across the transition:
- botanical branch travels from the cover edge into the Hero edge;
- fine border or ornamental line expands, retracts, or changes its role;
- monogram scales or resolves into a new position;
- paper texture remains continuous while the composition changes;
- small decorative motifs move to make room for the Hero hierarchy.

Assets do not all need to be reused. The Hero should still feel like a distinct composition, not merely the Opening with different text.

## 5. Motion quality

Preferred qualities:
- smooth, intentional acceleration/deceleration;
- staggered timing and overlapping movement;
- moderate parallax/depth through scale, position, masking, and layering;
- graceful handoff between elements;
- enough visual detail to reward attention without delaying access to information.

Avoid:
- fade-in/fade-out as the only transition technique;
- generic zoom-only transitions;
- bounce/elastic easing, spinning, shattering, flashy particles, or heavy 3D;
- motion that obscures the names or CTA for too long;
- scroll locking after the Hero is ready;
- loading large assets only after the transition begins.

## 6. Technical and accessibility requirements

- CTA must be a semantic button and work with pointer and keyboard.
- Keep a visible focus state.
- Respect `prefers-reduced-motion`. In reduced-motion mode, provide a short, calm transition or immediate Hero reveal while preserving all content and meaning.
- Prevent layout shift and avoid blocking interaction longer than necessary.
- Use transform/opacity/masks where possible for performance; avoid expensive continuous filters on large surfaces.
- Test on real mobile viewport sizes and lower-powered devices.
- The Hero must be revealed by CTA activation, not by scrolling.

## 7. Creative latitude

The sequence above is a design brief, not a frame-by-frame storyboard. The agent may use a different sequence, split/merge layers, animate illustrated elements independently, use clip-path/masks, or create a continuous camera-like composition if the result is smooth, performant, accessible, and on-concept.
