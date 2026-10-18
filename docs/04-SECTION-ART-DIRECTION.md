# Section Art Direction — Rizal & Dewi

**Creative direction:** Luxury High-Fashion Wedding Editorial  
**Principle:** Intricate Details, Expressive Composition

The supplied eight section illustrations are the main visual reference. Treat them as a coherent art direction, not as a strict pixel-by-pixel specification.

## Global visual language

### Surfaces and atmosphere
- Use warm ivory / parchment-like surfaces with subtle visible paper texture.
- Texture may vary by section: fine grain, soft fibers, lightly mottled paper, printed illustration texture, or a subtly layered surface.
- Keep texture visible enough to make the background feel material, but never so strong that text or photography becomes hard to read.
- A section may use an illustrated landscape, architectural scene, or darker contrast area when composition benefits. Do not force every section onto an identical plain ivory background.
- Use fine borders, engraved corner ornaments, thin rules, paper layers, and selective shadows as appropriate.

### Illustration and asset variety
- Botanical art should feel like detailed botanical engraving or realistic fine-line sketching: visible veins, layered leaves, fine stems, flowers with dimensional detail, and controlled irregularity.
- Use varied crops, scale, density, and placement across sections. Do not repeat the same flower cluster in the same corner on every page.
- Add realistic-sketch birds that belong to the same illustration language. Birds can appear perched, in flight, or partially visible near section edges.
- Venue architecture and landscape scenes should have their own visual presence rather than being reduced to tiny decorative thumbnails.
- Preserve room for content, but do not make all sections sparse. Visual richness is part of the intended experience.

### Color and typography
Use `05-COLOR-SYSTEM.md` as the palette baseline and `06-DESIGN-SYSTEM.md` for typography. Color roles are stable; the precise amount and placement may vary by section.
- Display typography: Cormorant Garamond.
- Supporting/functional typography: DM Sans.
- Champagne is an ornamental accent; do not rely on it for low-contrast functional text.

## Section-by-section direction

### 01 — Opening: Illustrated Editorial Cover
Reference: `01-Opening.png`.

Aim for a crafted cover with monogram, couple names, detailed botanical illustration, fine frame, textured background, and clear `BUKA UNDANGAN` CTA. Use artwork at more than one edge where it improves balance. Keep the center purposeful; the composition should feel filled with design intent, not empty.

Do not make the cover visually noisy or let the CTA disappear among ornaments.

### 02 — Hero: Opened Invitation / Illustrated Scene
Reference: `02-Hero.png`.

The Hero should feel like a second, fully composed invitation plate: couple names, `THE WEDDING`, date, venue/location details when confirmed, and an evocative illustrated landscape or botanical/architectural setting. Use large-scale artwork and varied framing to create an immersive composition.

**Avoid excessive empty space**, especially between the names, date, venue, and main illustration. The agent may layer text over quiet parts of an illustration if contrast remains strong. Do not add photography or a countdown by default; those belong elsewhere unless the user changes the information architecture.

### 03 — Our Story: Editorial Letter and Botanical Frame
Reference: `03-Our-Story.png`.

Combine a letter-like text surface with surrounding botanical illustration and optional photography when real assets are available. The letter can be angled or layered subtly; the page may use a larger botanical anchor and fine ornamental details. Maintain comfortable reading width and contrast.

Do not invent personal history, dates, or story chapters. Use supplied copy or clearly marked placeholders.

### 04 — The Wedding: Invitation Details and Countdown
Reference: `04-The-Wedding.png`.

Present the event information as a designed invitation composition. The date can be a typographic centerpiece, supported by venue and location details. Integrate the countdown as part of the stationery composition rather than a separate generic widget.

The layout may use layered cards, borders, corner ornaments, botanical framing, and small visual accents. Keep date and event facts easy to scan.

### 05 — Venue: Architectural Plate
Reference: `05-Venue.png`.

Architecture should be a major visual subject. Use an engraving, realistic architectural sketch, or approved venue artwork, framed by botanical details and optionally a landscape/map treatment. The venue name and location must have enough visual weight to be memorable, not sit in a large unused void.

Use `VIEW LOCATION` as a clear, touch-friendly action. A map preview is optional if it improves the composition and is grounded in the real venue/location.

Do not invent the venue's architectural appearance. If no reference is available, use a neutral placeholder illustration or ask for the correct venue asset before presenting it as factual.

### 06 — Gallery: Curated Editorial Sequence
Reference: `06-Gallery.png`.

Make photography the primary content. Use varied image sizes, crops, overlaps, frames, and offsets to build a vertical visual rhythm. The composition can mix wide landscape photographs with portrait moments and detail images. Botanical artwork may frame or interrupt the photo sequence, but must not dominate the photos.

Do not default to a uniform card grid or autoplay carousel. Avoid excessive blank gaps between photographs. Use actual supplied photographs; do not imply generated people are the couple.

### 07 — RSVP: Illustrated Reply Card
Reference: `07-RSVP.png`.

Keep the RSVP area visually connected to the stationery world: textured surface, botanical illustration, fine borders, carefully styled choices, and a clear submit action. The two approved options remain:
- `Attending`
- `Unable to Attend`

The selection treatment may be an outline, check, filled marker, or typographic change, as long as the state is clear, accessible, and not communicated by color alone. Do not add unapproved fields.

### 08 — Closing: Illustrated Signature
Reference: `08-Closing.png`.

Finish with the couple monogram, a concise closing message, and a substantial illustrated scene or botanical frame. This should feel like the final plate of a printed invitation suite, not an abrupt blank footer. Reuse motifs only when the composition benefits; do not mechanically duplicate the Opening.

## Persistent bird motif

Include one or more realistic-sketch birds consistent with the botanical illustration style. The bird should travel or fly to a new position as the guest scrolls through the invitation, creating a subtle narrative thread.

Behavioral guidance:
- The bird may fly along a short curved path, pause on a branch, leave the viewport, and re-enter near another section.
- Its position should respond to scroll progress or section transitions, not move randomly without context.
- Use a few authored waypoints and smooth interpolation rather than jittery tracking.
- Vary scale/angle slightly where perspective benefits, but avoid cartoonish flapping or exaggerated motion.
- The bird must not obscure text, CTA controls, faces, or important venue artwork.
- It should be decorative for assistive technology (`aria-hidden="true"`) unless it conveys actual content.
- On touch devices, use restrained movement and avoid blocking taps. Under reduced-motion preferences, keep the bird static or move it only between discrete positions.
- Prefer a lightweight transparent asset (SVG/PNG/WebP) with good edge quality. If multiple poses are used, maintain consistent species, proportions, lighting, and sketch style.

## Responsive composition

Mobile references are vertical and should inform the initial composition, but do not blindly scale them for desktop. On desktop, allow wider editorial spreads, larger illustration crops, layered scenes, and asymmetrical balance. On mobile, retain substantial artwork while ensuring that key copy and actions remain legible and reachable.

## Creative rule

When the reference does not specify an exact answer, choose the solution that best supports the section's emotional purpose and the overall art direction. Do not repeat one layout pattern across all eight sections just for consistency.
