# Design System — Rizal & Dewi

**Status:** Baseline system; details may evolve during implementation.  
**Goal:** Maintain a recognizable brand while allowing composition and illustration to vary.

## 1. Design principle

**A consistent visual language does not require identical layouts.** Keep typography, color roles, illustration style, and interaction quality coherent; let each section develop its own composition.

## 2. Color system

Use `05-COLOR-SYSTEM.md` as the canonical palette. Treat palette roles as the stable baseline, but allow different proportions and combinations between sections. Do not add a new brand color casually. If a new hue materially improves an illustration or section, treat it as a proposed extension and keep it subordinate to the established palette.

## 3. Typography

- **Cormorant Garamond:** couple names, display headings, dates, editorial statements.
- **DM Sans:** body copy, labels, location, links, controls, metadata.
- A script typeface is optional and remains unselected. Do not invent one as a core font. Use script only if a later asset or explicit decision establishes it.

The font pairing is a baseline, not a demand that every section use identical type sizes or alignment. Create hierarchy through scale, line breaks, spacing, contrast, and selective letter spacing. Avoid tiny all-caps copy that becomes illegible on mobile.

## 4. Surfaces, texture, and ornament

- Warm ivory is the principal surface family, not a requirement that every section have a flat identical background.
- Subtle paper texture should be visible in the rendered site. Use optimized textures or CSS layers, with careful contrast and performance.
- Fine rules, ornamental corners, paper layers, illustrated borders, and restrained shadows are available tools.
- Radius and shadow values are not rigid constraints. Use small radii or sharp stationery-like corners by default; introduce layering/shadow only when it adds depth.
- Avoid default modern SaaS patterns, oversized rounded cards, glassmorphism, heavy gradients, strong noise, and conspicuous drop shadows.

## 5. Illustration and imagery

Use intricate botanical engraving, realistic sketch details, architectural plates, landscapes, and supplied wedding photography. Asset reuse is allowed, but each section should not look like a copy of the previous section.

Vary:
- scale and crop;
- density and placement;
- background texture;
- layering and framing;
- illustration/photo balance;
- edge decoration and borders.

The same motif may recur to provide continuity, but change its crop, scale, placement, or role so it feels intentionally art-directed.

## 6. Layout and visual density

Avoid fixed global whitespace rules. Use enough spacing for legibility and hierarchy, but fill key sections with purposeful content and visual detail.

Pay particular attention to:
- **Opening:** substantial botanical artwork, texture, monogram, names, CTA.
- **Hero:** names, date, venue/location, and illustration should read as one composed plate without excessive dead space.
- **Venue:** architecture and venue details need presence and balance.
- **Gallery:** photos should form a continuous editorial rhythm with limited accidental gaps.

A layout is too sparse if it feels unfinished at the actual device size. A layout is too dense if focal hierarchy collapses or text becomes difficult to read.

## 7. Motion system

Motion should feel like illustrated stationery and editorial artwork becoming alive.

Supported techniques include:
- coordinated transform paths;
- staggered entrances and exits;
- masking and clip-path reveals;
- botanical line drawing;
- layered movement and subtle parallax;
- section-aware movement of the bird motif;
- photograph reveals and controlled depth.

### Opening-to-Hero transition
Target approximately 3–4 seconds for the full choreography. It must include meaningful asset movement/recomposition; fades may support the transition but must not be the only effect. See `03-OPENING-EXPERIENCE.md`.

### Scroll motion
Use scroll progress or section entry to coordinate small, deliberate changes. Avoid constant high-frequency movement, jitter, scroll hijacking, or motion that makes reading difficult. The bird should travel between authored positions in response to scrolling.

### Motion constraints
- Avoid bounce/elastic easing, spinning, flashy particles, heavy 3D, and gratuitous zoom.
- Respect `prefers-reduced-motion`.
- Motion must not delay access to important content or block controls.
- Prefer transform/opacity/masking and avoid expensive effects over large surfaces.
- Validate on mobile and lower-powered devices.

Timing values are starting points for browser testing, not immutable specifications.

## 8. Accessibility baseline

These are hard requirements:
- Normal text contrast ≥4.5:1; large text ≥3:1.
- Visible keyboard focus.
- Interactive controls work by keyboard.
- State is not indicated by color alone.
- Use semantic buttons and links.
- Preserve logical heading and reading order.
- Provide appropriate alt text; decorative art should use empty alt text or be hidden from assistive technology.
- Reduced motion must preserve content and functionality.
- Touch targets must be comfortable.
- No horizontal overflow or clipped text.
- RSVP feedback must be announced accessibly and shown only after backend confirmation.

## 9. Implementation latitude

The agent may introduce local tokens, responsive breakpoints, section-specific compositions, and reusable motion utilities when they improve the implementation. Avoid unnecessary abstraction that forces every section into the same component layout. Reuse should support quality, not erase visual variation.
