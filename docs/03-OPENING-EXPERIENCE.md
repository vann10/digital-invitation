# Opening Experience Specification — Irvan & Hana

**Status:** LOCKED — art direction approved  
**Core principle:** Ceremonial interaction, invisible interface  
**Experience:** Editorial envelope + wax seal + inner invitation

## 1. Concept

The Opening is a ceremonial digital interpretation of a premium wedding invitation. It should feel like one invitation object changing state, not navigation to a separate page.

**Locked object:** envelope, Emerald Blue wax seal, and inner invitation all remain part of the concept.

The envelope flap opens with a simple, stylized editorial movement. Do not simulate a complex, physically realistic envelope mechanism.

## 2. Interaction sequence

`CLOSED ENVELOPE`
→ user activates wax seal
→ seal press
→ subtle seal release
→ stylized envelope flap opening
→ inner invitation emergence
→ typography and botanical reveal
→ opened invitation resolves into Hero
→ normal page scroll

The Hero is the final state of this transition. Scrolling must not be the mechanism that opens the invitation.

## 3. Visual hierarchy

### Closed state
1. Wax seal / interaction target
2. Monogram
3. Botanical illustration
4. `WITH LOVE`
5. Envelope and invitation object
6. Supporting details

The closed state should create curiosity without exposing all wedding information.

### Opened state
1. Couple names
2. Inner invitation
3. Wax seal / monogram
4. Botanical composition
5. Wedding date
6. Location
7. Micro-copy

Couple names become the primary typographic anchor after opening.

## 4. Material and composition

- Background: Warm Ivory `#FAF7F1`.
- Invitation card: Warm Ivory surface, fine border, extremely subtle material cues, very soft shadow, minimal elevation.
- Card edges: precise stationery-like edges; radius target 0–3px.
- Desktop visual target: card height approximately 60–68vh, width approximately 38–44vw, max width around 560px. Treat as initial art-direction targets, not immutable code requirements.
- Mobile visual target: card width approximately 78–84vw with comfortable viewport margins.
- Preserve generous negative space.
- Material should read as flat from a distance and tactile only on closer inspection.

Avoid heavy paper grain, distressed texture, strong noise, vignette, large gradients, floating particles, or background clutter.

## 5. Illustration

Complex botanical engraving / fine line-art: fine strokes, detailed leaves and veins, organic curves, intertwined stems, intricate flowers, and refined negative space.

Botanical art is an editorial framing element, not a generic floral background. Some elements may extend beyond the invitation boundary to create controlled depth.

- Primary botanical: Deep Sage `#596957` and selective Emerald Blue `#174A4A`.
- Secondary botanical: Muted Sage `#899783`, lighter visual weight.
- Champagne `#B79A68` only as a restrained ornamental highlight.

## 6. Wax seal

- Emerald Blue.
- Matte/semi-matte appearance with a slightly irregular edge.
- Embossed monogram.
- Restrained highlight and subtle texture.
- Preferred position: bottom-center, slightly overlapping the envelope flap.
- Hover: subtle scale around 1.02, translateY around -1px, slight shadow increase.
- Press: approximately 100–150ms, scale around 0.97.
- Release: subtle separation/release cue.

Do not use a dramatic hue shift, glow, particle explosion, destructive shatter, or bounce.

## 7. Motion direction and approved enrichment

Motion must feel like paper unfolding, an object being revealed, typography appearing, and botanical line-art being drawn. Keep the composition restrained and the interaction understandable.

The user has approved **some additional Opening animations**. This permits refinement of the existing sequence, not a new visual concept. Suitable motion layers include:
1. A restrained seal press/release response.
2. A simple flap-opening movement.
3. Inner invitation emergence with subtle depth/translation.
4. Staggered typography reveal.
5. Botanical line-art reveal or short draw-on.
6. A final settling state that hands off naturally to the Hero.

These are approved motion directions, not a claim that every layer must be implemented or that timing/performance has been validated. Keep the sequence short, avoid overlapping so many effects that the opening becomes a spectacle, and do not delay access to essential information.

Existing Opening timing guidance is the baseline. The original specification targets a major opening experience around 1.2–1.6 seconds overall; validate actual perceived duration in browser. Do not extend it into a long intro without explicit approval.

### Motion anti-patterns
- Particle systems or explosion.
- Bounce, elastic easing, spinning.
- Complex or heavy 3D.
- Scroll hijacking or scroll lock after completion.
- Long animations that hide essential content.
- Decorative motion that competes with names or invitation information.

## 8. Accessibility and input behavior

- Wax seal interaction must be operable by pointer and keyboard.
- Use a semantic interactive element with an accessible name.
- Provide a visible keyboard focus state.
- Ensure adequate touch target.
- Do not make essential information available only after an animation.
- The Opening must not permanently trap or lock scrolling.
- Keep the functional states clear even when motion is reduced.

### Reduced motion

Respect `prefers-reduced-motion: reduce`:
- Disable seal cracking/release effects that are complex.
- Disable complex card movement.
- Disable prolonged botanical drawing.
- Use short opacity transitions or an immediate state transition.
- Preserve the same content, final state, and functionality.

## 9. Performance and validation

Avoid heavy background video, large unoptimized images, multiple oversized botanical assets, heavy 3D rendering, and excessive animation libraries.

Required browser checks before release:
- pointer and keyboard activation,
- focus visibility,
- mobile viewport composition,
- no clipped text or horizontal overflow,
- reduced-motion behavior,
- no essential information hidden,
- final transition to Hero and normal scrolling,
- perceived duration and motion smoothness.

**Status:** art direction LOCKED; implementation and browser QA NOT TESTED until evidenced.

Catatan audit
Ada dua hal yang perlu dipertahankan saat implementasi:
1. Tidak semua lapisan animasi wajib digunakan sekaligus. Dokumen secara eksplisit mengizinkan penyempurnaan gerak, tetapi tetap melarang efek berlebihan dan penundaan akses ke informasi penting.
2. Statusnya masih spesifikasi desain, bukan bukti implementasi. Durasi, kelancaran animasi, tampilan mobile, keyboard, dan reduced motion harus diuji di browser sebelum dinyatakan lolos.
