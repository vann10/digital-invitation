# Project structure — no `src/` directory

```text
rizal-dewi-digital-invitation/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── assets/                 # Original supplied SVG/JPG assets
│   │   └── optimized/          # Lossless WebP copies used by the page
│   ├── fonts/                  # Optional self-hosted fonts
│   └── images/                 # Approved couple/gallery photography
├── components/                 # Reusable sections/components
├── lib/                        # Supabase client and utilities, later
├── types/                      # Shared TypeScript types, later
├── supabase/                   # Migrations/schema after technical design
├── docs/
│   └── PROJECT-STRUCTURE.md
├── scripts/
│   └── optimize-assets.mjs     # Regenerate WebP copies from supplied SVGs
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Asset mapping
- `botanical_full_detail_hybrid.svg`: large botanical cover framing.
- `botanical_ornament.svg`: secondary botanical detail.
- `circular_monogram_ornament.svg`: ornament for the Hero.
- `floating_botanical_leaves_fidelity.svg`: light leaf detail.
- `monogram_RD_exact_illustration.svg`: couple monogram.
- `2403.jpg` and `28370685_white_paper_texture_collection.svg`: optional surface cues; keep them nearly imperceptible. Neither is loaded by the current page.

The original assets are included in `public/assets/`. The five illustrations listed above contain embedded PNG images. The page uses corresponding lossless `.webp` copies in `public/assets/optimized/` through `next/image`, with responsive sizes and quality 90, to avoid downloading the larger SVG wrappers. The Hero ornament loads after opening. Original SVG files remain available as source artwork. Run `npm run assets:optimize` after replacing an original illustration.

## Current implementation

- Couple: Rizal & Dewi.
- Opening: editorial cover, opened by the `BUKA UNDANGAN` button.
- Hero: separate editorial composition revealed after opening.
- Styling: plain CSS in `app/globals.css`; no Tailwind dependency.
- After opening, the cover becomes inert and keyboard focus moves to the Hero heading.
- Reduced motion preserves the same final state with minimal animation.
- Date and location remain pending and are displayed as such.
- Additional sections and Supabase RSVP are future work. No simulated submission or placeholder Supabase client is included.

The former envelope/wax-seal implementation and its unused components have been removed. This document is the current reference for the scaffold.
