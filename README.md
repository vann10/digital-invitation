# Rizal & Dewi — Digital Invitation

Initial Next.js + TypeScript scaffold for the approved luxury editorial direction.

## Run locally
Requires Node.js 20.9+.
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Original assets
Original illustration files are included in `public/assets/`:
- `botanical_full_detail_hybrid.svg`
- `botanical_ornament.svg`
- `circular_monogram_ornament.svg`
- `floating_botanical_leaves_fidelity.svg`
- `monogram_RD_exact_illustration.svg`
- `2403.jpg` (optional paper texture)
- `28370685_white_paper_texture_collection.svg` (optional paper texture)

The page loads lossless WebP copies from `public/assets/optimized/`. The original SVGs contain embedded PNGs; the copies preserve the wrappers' rendered appearance, dimensions, and transparency while reducing download size. Regenerate the copies with `npm run assets:optimize` when updating artwork. Optional paper textures are not loaded.

## Included
- Opening Editorial Cover and separate Hero composition.
- CTA-triggered cover transition.
- Keyboard focus and reduced-motion support.
- Responsive mobile-first styling.

Additional sections and Supabase RSVP are not implemented yet. Date and location remain pending. Unused legacy sections, envelope assets references, and simulated RSVP behavior have been removed from the scaffold.

## Checks
```bash
npm run lint
npm run typecheck
npm run build
```

ESLint uses the Next.js 15 configuration through `FlatCompat`. Styling uses plain CSS; Tailwind is not required. Opening makes the cover inert and moves keyboard focus to the Hero heading.

## Locked palette
Warm Ivory `#FAF7F1`, Emerald Blue `#174A4A`, Deep Sage `#596957`, Muted Sage `#899783`, Champagne `#B79A68`, Warm Charcoal `#393534`. Display: Cormorant Garamond. Functional: DM Sans.
