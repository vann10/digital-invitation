# Project Charter — Rizal & Dewi Digital Invitation

**Status:** Active  
**Revision focus:** More expressive art direction with fewer unnecessary layout constraints.

## 1. Project intent

Create a premium digital wedding invitation that feels like bespoke stationery, a fashion-editorial art book, and a botanical illustration portfolio combined. The experience should feel ceremonial, romantic, detailed, elegant, and distinctly digital—not like a generic wedding template or a conventional SaaS landing page.

**Core principle:** Intricate details, expressive composition.

The site should balance rich visual material with clear hierarchy. Do not interpret “elegant” or “editorial” as “mostly empty.” Texture, illustration, framing, layered scenes, typography, and movement can occupy substantial space when they help tell the story.

## 2. Reference interpretation

The eight supplied vertical section illustrations establish the intended visual world:
- warm ivory paper-like backgrounds with visible, restrained texture;
- intricate botanical artwork in varied positions, scale, and density;
- fine ornamental borders and champagne-colored rules used selectively;
- a mix of monograms, invitation typography, editorial letter treatment, architecture, landscapes, and wedding photography;
- section-to-section variation rather than one repeated template;
- rich edge framing and decorative detail without sacrificing legibility.

The supplied video is a motion reference for the ambition and continuity of the experience. Use it as inspiration for layered, choreographed transitions and persistent visual atmosphere. Do not copy unrelated names, content, palette, or assets from it.

## 3. Creative direction

**Luxury High-Fashion Wedding Editorial**  
**Visual character:** botanical engraving, realistic sketch details, premium stationery, textured surfaces, romantic landscape illustration, editorial typography, cinematic but restrained motion.

The final work should feel crafted, not assembled from a standard component library. Each section may use a different composition, surface treatment, illustration crop, border, layering strategy, or typographic rhythm.

## 4. Decision hierarchy

### Hard requirements
- Do not invent real wedding details, venue facts, couple history, or final photography.
- Preserve the approved eight-section sequence unless the user changes it.
- Preserve the approved RSVP choices and data rules in `07-TECHNICAL-ARCHITECTURE.md`.
- Preserve accessibility, privacy, and security requirements.
- Do not silently change a decision explicitly marked `HARD REQUIREMENT` or specifically approved as immutable by the user.
- Respect the named color and typography direction as the baseline identity. Any deliberate deviation should be intentional and justified, not accidental.

### Creative baselines
- The visual world remains luxury editorial, botanical, tactile, romantic, and refined.
- Warm ivory remains the primary surface family; Emerald Blue, sages, champagne, charcoal, and soft brown retain their roles.
- The Opening and Hero are separate compositions connected by an intentional transition.
- Section backgrounds and assets should vary where useful.
- Empty space is a tool, not a goal. Prioritize composition, readability, and emotional impact over maximizing whitespace.

### Agent discretion
Unless the user asks for a faithful reproduction of a specific reference, the agent may independently decide:
- exact layout, alignment, crop, scale, layering, and placement of visual assets;
- how much texture is appropriate per section;
- whether borders, frames, paper edges, engraved flourishes, or subtle shadows improve the result;
- how botanical and landscape assets transition between sections;
- how to compose responsive desktop layouts rather than simply enlarging mobile layouts;
- detailed easing, stagger, parallax, and scroll-linked bird movement within performance and accessibility limits;
- gallery image arrangement, as long as it remains editorial and not a generic tiled grid.

## 5. Eight-section experience

1. Opening — invitation cover and CTA.
2. Hero — opened invitation composition with couple names and essential wedding identity.
3. Our Story — personal narrative with editorial letter treatment.
4. The Wedding — event information and integrated countdown.
5. Venue — architecture, venue information, and location action.
6. Gallery — curated wedding photographs.
7. RSVP — two approved attendance choices.
8. Closing — monogram and final message.

Use `02-INFORMATION-ARCHITECTURE.md` for content responsibilities. The art direction is a guide, not a rigid wireframe.

## 6. Visual density and whitespace

Avoid two extremes:
- **Too sparse:** large unused fields that make the site feel unfinished, especially in Opening, Hero, Venue name/details, and Gallery.
- **Too crowded:** decoration over text, illegible details, excessive competing focal points, or ornamental elements that make controls difficult to use.

Aim for **composed richness**: visible texture, substantial artwork, intentional framing, and a clear hierarchy. If a section looks empty at the actual mobile viewport, revise the composition rather than defending the emptiness as “editorial.”

## 7. Conflict handling

When a real hard requirement conflicts with a visual idea, preserve the hard requirement and find another visual solution. If two approved requirements truly conflict, document the conflict and ask for clarification. Do not ask for approval for ordinary creative decisions that fall within the agent's discretion.

## 8. Definition of success

The website should feel bespoke and memorable, with:
- a convincing textured stationery atmosphere;
- visibly different but coherent section compositions;
- a cinematic Opening-to-Hero transition;
- a realistic-sketch bird that accompanies scrolling;
- no conspicuous dead space in key sections;
- strong legibility, responsive behavior, accessibility, and reliable RSVP functionality.
