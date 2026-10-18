# Section Art Direction — Rizal & Dewi

User correction, 2026-10-16: Hero uses Emerald Blue with Ivory text; The Wedding
uses an Emerald surround behind its Ivory card/countdown composition. Botanical
artwork must not be clipped at inner content-container boundaries. The Opening
keeps Ivory paper with Emerald names/frame. No hamburger/top menu; a text index
follows Closing. These corrections supersede earlier conflicting color/navigation
details below. See `VISUAL-CORRECTIONS-QA.md` for validation and remaining gates.

**Status:** LOCKED baseline; content/assets remain pending where noted  
**Creative direction:** Luxury High-Fashion Wedding Editorial  
**Principle:** Intricate Details, Restrained Composition

**Approved refinement — 2026-10-15:** the master prompt and supplied storyboard govern appearance. References below to botanical engraving/fine line-art now mean the supplied rich colored botanical illustrations, preserving shading, veins and petal layers; generated outline-only art is deprecated. Subtle paper grain and the master-prompt Opening motion are explicitly approved. Real venue art, photographs, landscape and personal content remain pending; reference panels are never production assets.

## Global art direction

The website should feel like premium wedding stationery brought to life digitally. Visual richness comes from illustration, typography, paper materiality, photography, and stationery vocabulary; the layout remains restrained through whitespace, controlled asymmetry, selective color, minimal UI, and deliberate pacing.

## 01 — Opening: Editorial Cover

**Primary composition:** refined editorial cover with a deliberate, typography-led layout.

**Visual focus:** couple monogram, `RIZAL & DEWI`, complex botanical engraving/fine line-art, generous whitespace, and the CTA `BUKA UNDANGAN`.

**Interaction:** CTA activation triggers a restrained, sequential reveal/movement of selected cover elements, followed by a transition to the separate Hero composition.

**Motion:** editorial movement with clear hierarchy and no unnecessary delay; see `03-OPENING-EXPERIENCE.md`.

**Avoid:** complex physical simulation, particles, bounce, shatter, heavy 3D, generic floral backgrounds, and decoration that competes with the CTA.

## 02 — Hero: Opened Editorial Invitation

**Primary object:** opened invitation/editorial spread.  
**Content hierarchy:** `THE WEDDING` → `RIZAL & DEWI` → date → location.  
**Mobile:** centered hierarchy; botanical density controlled.  
**Desktop:** controlled asymmetry, botanical overflow where useful, generous negative space.  
**Photography:** none.  
**Explicit exclusions:** no countdown, RSVP CTA, or long-form copy.  
**Avoid:** generic hero banner, full-screen wedding photo, conventional UI card, large gradient, excessive floral background.

## 03 — Our Story: Editorial Letter Spread

**Primary object:** personal letter.  
**Secondary elements:** printed photograph, editorial typography, botanical framing.  
**Desktop:** letter and photograph can occupy opposite sides in a controlled asymmetrical composition.  
**Mobile order:** section label → letter → narrative → photograph → supporting visual elements.  
**Letter treatment:** Warm Ivory, thin border, very subtle texture, very soft shadow, minimal radius, generous whitespace.  
**Avoid:** torn edges, stains, aged-paper treatment, fake handwriting, postage motifs, vintage scrapbook style.  
**Content:** actual story and narrative format remain pending; do not assume timeline or chapters.

## 04 — The Wedding: Hybrid Editorial Stationery

**Primary objects:** main invitation card + secondary countdown detail card.  
**Main card:** date, time, venue, location.  
**Secondary card:** countdown with label `UNTIL THE WEDDING`.  
**Hierarchy:** date → venue → time → location.  
**Date:** number is the typographic centerpiece; illustrative historical dates are not production data.  
**Mobile:** vertical, centered, restrained layering.  
**Desktop:** asymmetric two-object editorial spread.  
**Motion:** main invitation enters; date establishes; supporting information settles; countdown appears; botanical details settle.  
**Avoid:** progress bars, digital-clock styling, rolling numbers, bounce.

## 05 — Venue: Architectural Plate

**Primary object:** detailed architectural engraving.  
**Relationship:** architecture is the subject; botanical illustration is secondary framing.  
**Mobile order:** `VENUE` → architectural illustration → venue name → location → `VIEW LOCATION`.  
**Desktop:** larger architectural artwork, controlled asymmetry, generous negative space.  
**CTA:** editorial text action in DM Sans uppercase with subtle underline/rule; touch-friendly target, not a large UI button.  
**Actual venue/location:** pending.

## 06 — Gallery: Curated Printed Photo Sequence

**Primary object:** actual couple/wedding photography presented as editorial prints.  
**Mobile:** vertical scrolling, large/small image rhythm, controlled horizontal offset, whitespace, predictable scrolling.  
**Desktop:** asymmetric composition, varied image scales, editorial spread.  
**Motion:** subtle opacity reveal, slight translation, optional restrained parallax.  
**Avoid:** autoplay carousel, required horizontal-scroll interaction, excessive zoom, flashy transitions, decoration that competes with photographs.  
**Photos and order:** pending.

## 07 — RSVP: Editorial Reply Card

**Primary object:** refined reply card.  
**Approved responses only:** `Attending`, `Unable to Attend`.  
**Visual selection:** editorial text options with a subtle line/marker or typographic treatment that clearly identifies the selected state. No conventional radio-button appearance, pill, checkbox, or large CTA treatment.  
**Accessibility:** use appropriate semantic single-choice controls; keyboard operation, visible focus, accessible selected state, and non-color-only state indication are required. The underlying semantics do not need to look like native radio buttons.  
**Motion:** typography and response options reveal subtly; selected state changes are restrained.  
**Avoid:** additional form fields, oversized controls, flashy success animation, or a visual state that depends only on color.

## 08 — Closing: Monogram as Final Signature

**Primary object:** couple monogram.  
**Mobile:** centered and restrained.  
**Desktop:** signature with deliberate negative space.  
**Botanical:** peripheral and subtle only if needed.  
**Avoid:** new decorative card system or a competing closing object.  
**Closing statement and final monogram asset:** pending.

## Shared implementation constraints

- Keep visual language consistent across all sections.
- Warm Ivory remains dominant; Emerald Blue is selective.
- Botanical art must not obscure essential text.
- Photography remains natural; do not tint every photo to match the palette.
- Use whitespace rather than adding decoration to fill empty areas.
- Validate all compositions on mobile, tablet, and desktop.

Catatan audit
Ada tiga aturan penting yang harus dipertahankan:
- Jangan mengisi ruang kosong dengan dekorasi tambahan. Whitespace merupakan bagian dari desain.
- Jangan menyamakan semua foto dengan tint warna palet. Foto harus tetap terlihat natural.
- Jangan mengorbankan keterbacaan demi ilustrasi. Botanical line-art harus menjadi elemen pendukung, bukan menutupi teks penting.
