# Nature editorial asset provenance

The user explicitly requested additional realistic nature illustrations, including romantic birds. Existing bouquet, leaves, ornament, monogram and paper assets were inspected and reused first. New assets are decorative, not representations of the couple or wedding venue.

## Generated illustrations

Tool: built-in `image_gen.imagegen`, transparent background. Original PNG files are preserved; delivery copies use Sharp WebP quality 88 with alpha transparency.

- `public/assets/romantic-doves.png` → `public/assets/optimized/romantic-doves.webp`, 1200×800, 236,526 bytes.
- `public/assets/naturalist-butterfly.png` → `public/assets/optimized/naturalist-butterfly.webp`, 800×667, 176,896 bytes.

Doves prompt:

> Create a premium natural-history romantic wedding illustration as a standalone transparent PNG asset. Exactly two realistic ivory Java doves, nestled closely facing one another, beaks nearly touching, perched on one fine curved olive/sage twig with just a few narrow leaves. Entire birds, tails and twig fully visible, ample transparent margin, landscape composition. Hand engraved scientific illustration with intricate fine feather hatching, dimensional soft gouache shading, warm ivory plumage, deep sage #596957 shadows, subtle emerald blue #174A4A tail/wing undertones, tiny champagne #B79A68 highlights. Luxury editorial wedding stationery, richly detailed yet quiet and refined. Realistic anatomy, delicate romantic mood, no cartoon, no heart symbols, no typography, no flowers or floral bouquet, no background/paper/shadow plate, no logo. Not an imitation of any specific artist. Output clean true alpha transparency ready to place on warm ivory or deep emerald website.

Butterfly prompt:

> Single elegant realistic butterfly illustration, three-quarter angle with wings gently open, entire insect including antennae and legs intact, generous transparent margins. For luxury romantic wedding stationery with natural history engraving aesthetic. Intricate engraved veins, delicate scales and realistic dimensional shading, ivory inner wings, muted sage #899783 and emerald blue #174A4A edges, tiny champagne #B79A68 flecks. Soft watercolor/gouache washes over extremely fine hatching. Understated naturalistic beauty, not cartoon or geometric. The butterfly itself only, no flowers, no branch, no scenery, no shadow on ground, no text or numbers, genuine alpha transparent background. Detailed fine art illustration suitable for a small editorial margin decoration.

## Supplied venue illustration

`public/assets/gandrung-venue-lineart-black-white.svg` is displayed intact with `object-fit: contain`. It was explicitly selected by the user. Actual venue name, address and map remain pending; this artwork does not establish those facts. Its approximately 3.14 MB source is a known mobile payload tradeoff retained to preserve supplied detail.

## Temporary music

“Reverie” by Scott Buckley. User requested any replaceable YouTube sample.

- YouTube: https://www.youtube.com/watch?v=U5jC7ouN3e4
- Official track/license: https://www.scottbuckley.com.au/library/reverie/
- Official download: https://www.scottbuckley.com.au/library/wp-content/uploads/2020/03/sb_reverie.mp3
- License: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
- Preserved source: `docs/asset-sources/reverie-scott-buckley-original.mp3`.
- Web delivery: `public/audio/reverie-sample.mp3`, 96 kbps MP3, 2,684,910 bytes, approximately 224 seconds. Re-encoded with FFmpeg; no musical edits. Attribution is visible in Closing.

The implementation uses the licensed official audio file, not YouTube stream extraction or an embedded video. Replace the source and attribution together in `data/invitation.ts`. Audio uses `preload="none"` and begins only after a guest gesture.
