# Project Charter — Rizal & Dewi Digital Invitation

**Status:** Active canonical baseline  
**Project:** Rizal & Dewi  
**Experience:** Luxury High-Fashion Wedding Editorial  
**Core principle:** **Intricate Details, Restrained Composition**

## 1. Purpose

Create a premium digital wedding invitation that feels like luxury wedding stationery brought to life through an intentional digital editorial experience. It should be refined, romantic, modern, spacious, and carefully art-directed.

The website is not a generic wedding template, SaaS dashboard, scrapbook, or overly decorative floral experience.

## 2. Locked creative direction

- Luxury High-Fashion Wedding Editorial.
- Rich, colored botanical illustration with engraved detail and painterly shading, paired with restrained composition. The user approved the master prompt on 2026-10-15; existing `public/assets` artwork replaces code-generated botanical line-art.
- Clean digital stationery with subtle material cues.
- Generous negative space and controlled asymmetry.
- Editorial motion, not UI motion.
- Mobile-first responsive behavior; desktop is an editorial re-composition, not a stretched mobile layout.
- Eight sections in this order: Opening, Hero, Our Story, The Wedding, Venue, Gallery, RSVP, Closing.
- No change to locked visual decisions unless the user explicitly authorizes it.

## 3. Locked visual system

### Palette

| Token | Hex | Role |
|---|---|---|
| Emerald Blue | `#174A4A` | Primary brand/interaction accent |
| Warm Ivory | `#FAF7F1` | Dominant page canvas |
| White | `#FFFFFF` | Selected stationery surfaces |
| Muted Sage | `#899783` | Secondary botanical detail |
| Deep Sage | `#596957` | Primary botanical structure |
| Champagne | `#B79A68` | Restrained ornament only |
| Warm Charcoal | `#393534` | Primary text |
| Soft Brown | `#746A66` | Secondary text/metadata, subject to contrast |

Warm Ivory remains dominant. Emerald Blue is selective, not a full-site background. Champagne is ornamental and must not be used as small functional text where contrast is inadequate.

### Typography

- **Cormorant Garamond:** display, couple names, major headings, date centerpiece, selected editorial statements.
- **DM Sans:** body, labels, metadata, location, links, controls, interaction hints.
- Script family is **PENDING**; use only as a restrained accent if later selected.

## 4. Section-level locked decisions

- **Opening:** Editorial Cover focused on monogram, couple names, botanical engraving, whitespace, and `BUKA UNDANGAN`; CTA-triggered sequential editorial motion transitions to a separate Hero composition. See `03-OPENING-EXPERIENCE.md`.
- **Hero:** separate opened invitation/editorial spread revealed after the Opening CTA; no photography, countdown, RSVP CTA, or long-form copy.
- **Our Story:** personal letter/editorial correspondence; actual narrative and format remain pending.
- **The Wedding:** main invitation card plus secondary countdown detail; countdown label `UNTIL THE WEDDING`.
- **Venue:** architectural engraving is the subject; botanical art is framing; CTA `VIEW LOCATION`.
- **Gallery:** vertical editorial photo sequence, not a generic grid or autoplay carousel.
- **RSVP:** two options only—`Attending` and `Unable to Attend`; editorial selection indicator, not a conventional-looking radio button; accessible semantics and states are required.
- **Closing:** monogram as final signature; no new decorative card system.

## 5. Technical decisions already confirmed

- Frontend: Next.js + TypeScript.
- RSVP backend: Supabase.
- Invitation model: one individual per invitation link.
- RSVP revision policy: final after first submission.
- Operator export access: private login.
- Administration: spreadsheet/export, not a bespoke dashboard.

These are project decisions, not evidence of implementation. Database schema, authentication setup, endpoints, export workflow, deployment, and technical QA must be specified and implemented separately.

## 6. Authority and conflict policy

Authority is **per topic**, not “newest file wins”:

1. Opening behavior and opening motion → `03-OPENING-EXPERIENCE.md`
2. Section sequence/content model → `02-INFORMATION-ARCHITECTURE.md`
3. Section-specific visual direction → `04-SECTION-ART-DIRECTION.md`
4. Palette and semantic color usage → `05-COLOR-SYSTEM.md`
5. Cross-section tokens, components, layout, accessibility → `06-DESIGN-SYSTEM.md`
6. Technical architecture and RSVP data rules → `07-TECHNICAL-ARCHITECTURE.md`
7. Actual copy/assets/data readiness → `08-CONTENT-AND-ASSET-REGISTER.md`
8. Acceptance criteria → `09-QA-AND-ACCEPTANCE.md`
9. Coding-agent memory → `10-Memory-Prompt.txt`, which must defer to the documents above.

If a conflict is not resolved by an explicit user decision, label it `CONFLICT — USER CONFIRMATION REQUIRED`. Do not infer new visual decisions or invent wedding facts.

## 7. Status vocabulary

- **LOCKED:** user-approved decision; do not change without explicit authorization.
- **DEFINED:** specified baseline, subject to implementation validation where stated.
- **PENDING:** required input or decision has not been supplied.
- **PLACEHOLDER:** temporary content or illustrative example, not production data.
- **DEPRECATED:** historical source retained for traceability; not the active implementation reference.
- **NOT TESTED:** no implementation validation has been performed or evidenced.

## 8. Current project readiness

Visual direction and information architecture are defined. Final wedding data, personal story, final photos, monogram asset, script typeface, and implementation/QA remain pending where identified in the relevant register. Do not represent design documentation as proof of a completed site, backend, or QA run.
