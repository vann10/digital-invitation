# Content & Asset Register — Rizal & Dewi

## Editorial elevation — 2026-10-17

The latest user brief authorizes additional decorative illustration and richer
contextual compositions. This pass reuses the existing family; no new generated
art is required. `data/artwork.ts` is its curated dimensions/path registry.
The supplied Gandrung SVG now has a lossless 1024×1536 WebP derivative at
`public/assets/optimized/gandrung-venue.webp` (629,126 bytes; decoded pixels
verified identical). The original remains preserved; Next Image delivers
responsive versions. Real venue facts, photos and personal copy remain pending.
See [phase evidence and limitations](EDITORIAL-ELEVATION.md).

## Current master-prompt asset mapping — 2026-10-15

The user explicitly approved reuse of the supplied botanical illustrations, master-prompt paper texture and motion. Every rendered botanical now comes from `public/assets`; the generated SVG component and its stroke-drawing CSS are removed. Source artwork remains intact. No new artwork was generated.

| Actual path | Metadata verified | Current use |
|---|---|---|
| `public/assets/optimized/botanical_full_detail_hybrid.webp` | 1224×1285, alpha, 1,434,622 bytes | Opening, Hero, Story, Wedding, RSVP, Closing framing |
| `public/assets/optimized/botanical_ornament.webp` | 1024×1536, alpha, 1,403,612 bytes | Opening side group; Story/Wedding/Venue/RSVP framing |
| `public/assets/optimized/floating_botanical_leaves_fidelity.webp` | 1374×1145, alpha, 409,726 bytes | Hero and RSVP option accents |
| `public/assets/optimized/monogram_RD_exact_illustration.webp` | 2048×1365, alpha, 1,199,480 bytes | Opening/Closing signature and small in-invitation navigation identity |
| `public/assets/optimized/circular_monogram_ornament.webp` | 1024×1024, alpha, 283,906 bytes | Retained; not required alongside ornate monogram |
| `public/assets/2403.jpg` → `public/assets/optimized/paper-grain.webp` | 1500×1500; derivative 91,056 bytes, opaque WebP | Supplied paper photograph compressed at quality 60; canvas grain below content, no recoloring/cropping, no overlay over artwork/photos |

The botanical SVG source files wrap raster images; use complete responsive WebPs, not synthetic path tracing. Next Image delivers appropriately sized derivatives. All existing original SVG/PNG/JPEG files and prior QA artifacts are preserved. Rights notes remain unavailable. Venue illustration, real Gallery photos and separate landscape artwork are still **PENDING**; reference screenshots are guides only.

Gallery's three central content slots remain unfilled. The current page renders one labelled pending notice until real images are supplied, then renders only available approved photos in the vertical editorial sequence. It does not repeat empty print placeholders. No venue/landscape/photo substitute was generated.

## Historical inventory (superseded by current mapping above)

## Implementation inventory — 2026-10-15

The explicit asset authorization in `PROMPT.md` permits original SVG work for this implementation. All source artwork was inspected first. Final wedding content and approval statuses below remain unchanged.

| Path / content | Purpose and dimensions | Status | Source / license / attribution | Replacement |
|---|---|---|---|---|
| `public/assets/optimized/monogram_RD_exact_illustration.webp` | Cover and Closing; 2048×1365 RGBA, 1,199,480 bytes source; Next Image serves responsive compressed derivatives | Supplied asset reused; final approval PENDING | Repository supplied; rights/attribution notes not provided | Replace central monogram path after approval |
| `botanical_full_detail_hybrid.webp` | Inspected 1224×1285, 1,434,622 bytes | Existing, retained but not delivered by new layout | Repository supplied; rights notes absent | Raster-in-SVG cannot provide true path drawing |
| `botanical_ornament.webp` | Inspected metadata 1024×1536, 1,403,612 bytes | Existing, retained, unused | Repository supplied; rights notes absent | Avoid unnecessary mobile payload |
| `floating_botanical_leaves_fidelity.webp` | Inspected 1374×1145, 409,726 bytes | Existing, retained, unused | Repository supplied; rights notes absent | Keep available for future approved composition |
| `circular_monogram_ornament.webp` | Inspected 1024×1024, 283,906 bytes | Existing, retained, unused | Repository supplied; rights notes absent | Avoid redundant framing |
| Original SVGs, optional paper textures, peony PNG | Existing source assets preserved | Unused | Repository supplied; license notes absent | No prominent texture introduced |
| `components/botanical.tsx` | Original vector stems, leaves, veins, flowers, accents; viewBox 360×560; two cover instances and one Hero instance | GENERATED — REVIEW REQUIRED | Original code artwork created for this task; no external source or attribution dependency | User art approval still required; static and reduced-motion fallback included |
| Architectural SVG in `app/page.tsx` | Abstract paired arches, viewBox 800×400; labelled as not the venue | GENERATED — REVIEW REQUIRED / PLACEHOLDER | Original code artwork; no external source | Replace using approved actual venue reference |
| `data/invitation.ts` gallery entries | Three varied portrait/landscape print slots | PLACEHOLDER; no photographs loaded | No stock image, license, source URL or attribution dependency | Supply local photo paths, alt text and sequence centrally |
| Date/time/place/address/map/story/closing/RSVP wording | Central editable content and visible labels | DUMMY DATA / PENDING approval | No personal facts invented | Replace only with approved content; countdown stays off until real ISO date exists |
| `docs/qa/*.png` | Engineering browser/asset review evidence | QA artifacts, not website assets | Locally captured from repository | Not served to guests |

The source WebP retains transparent pixels that may look odd against a viewer's default backdrop; a flattened preview on Warm Ivory confirmed the monogram's intended rendering. Original files were not altered. No image-generation service or stock photo was used.

**Status:** Living register; do not fabricate missing inputs  
**Purpose:** Track real wedding data, copy, and visual assets required before release.

## 1. Content register

| Item | Current status | Notes |
|---|---|---|
| Couple names | DEFINED | Rizal & Dewi |
| Wedding date | PENDING | Any date examples in historical documents are illustrative |
| Wedding time | PENDING | Do not infer |
| Venue name | PENDING | Do not infer |
| Full venue address | PENDING | Do not infer |
| Map URL | PENDING | Must be validated before `VIEW LOCATION` is wired |
| Our Story copy | PENDING | Actual narrative not supplied |
| Our Story format | PENDING | Do not assume timeline/chapters/chronology |
| RSVP question/copy | PENDING | Only response choices are locked |
| RSVP choices | LOCKED | `Attending`; `Unable to Attend` |
| Closing statement | PENDING | Do not invent as final copy |
| Monogram | DEFINED — supplied asset | Reuse of the existing RD artwork approved; final composed-page acceptance remains pending |
| Venue reference/artwork | ASSET PENDING | Architectural engraving direction is locked |
| Gallery photographs | ASSET PENDING | Actual images and sequence not supplied |
| Script typeface | PENDING | Family not selected |

## 2. Visual asset direction

### Opening — Editorial Cover
- Editorial Cover artwork/layout centered on monogram, couple names, botanical engraving, whitespace, and CTA `BUKA UNDANGAN`.
- Final couple monogram artwork/source file and responsive exports.
- Supplied rich colored botanical illustration, preserving engraved/painterly detail, palette and transparency.
- Supporting cover assets only where they improve the composition without adding clutter.
- Separate Hero artwork/supporting assets, if required by the final Hero implementation.

### Venue
- Architectural engraving is the primary subject.
- Botanical details remain secondary.
- Use an actual venue reference when available; do not fabricate a specific building.

### Gallery
- Use real couple/wedding photographs supplied or approved by the user.
- Preserve natural photographic character; integrate through crop, framing, and whitespace rather than uniform tinting.
- Determine final sequence only after assets are available.

### Monogram
- Refined intertwined serif/ornamental monogram.
- Reuse selectively across Opening, invitation, dividers, RSVP, Closing, and favicon where appropriate.
- Avoid overuse.

## 3. Asset consistency checklist

- [ ] Botanical illustrations preserve engraved detail, layered petals, veins and tonal depth at actual mobile/desktop display sizes.
- [ ] Color use respects the locked palette.
- [ ] Assets retain negative space and do not obscure essential content.
- [ ] Venue art depicts the actual approved venue/reference.
- [ ] Gallery uses approved real photography.
- [ ] Image crops and alt text are defined.
- [ ] Asset dimensions/performance are checked for mobile.
- [ ] Final monogram has an approved source file and export format.

## 4. Content completion gate

Do not treat the invitation as production-ready until actual date/time/venue/location, story copy, RSVP question/copy, closing copy, final photography, and required monogram/venue assets have been supplied or explicitly marked not applicable.

Catatan audit
Ada dua hal yang perlu dipertahankan:
1. Jangan membuat data pernikahan atau konten personal berdasarkan asumsi. Dokumen dengan tepat membedakan data yang sudah diketahui dari informasi yang masih menunggu konfirmasi.
2. Aset visual harus berasal dari referensi yang disetujui. Khusus ilustrasi venue, jangan menggambar bangunan spesifik seolah-olah itu venue sebenarnya sebelum referensinya tersedia.


## Current supplied/generated assets — nature editorial revision

- Supplied venue artwork: public/assets/gandrung-venue-lineart-black-white.svg is implemented intact. Venue name/address/map remain PENDING. Earlier missing-artwork status is superseded.
- User-requested realistic nature additions: romantic-doves and naturalist-butterfly PNG sources and optimized transparent WebP delivery assets.
- Reused botanical bouquet, ornament, leaves, monogram and paper photograph; fewer repeated bouquets.
- Temporary music: Reverie by Scott Buckley, official CC BY 4.0 audio with visible attribution. Final song remains PENDING.
- [Provenance, generation prompts and sizes](NATURE-ASSET-PROVENANCE.md). [Rendered QA](NATURE-EDITORIAL-QA.md).
