# Phase 2 — illustration library

Status: asset kit delivered, proposed artwork for review. Website integration is
explicitly deferred. Existing assets and page implementation remain unchanged.

## Style specification

Master anchors: supplied `botanical_ornament.webp`,
`botanical_full_detail_hybrid.webp` and `references/01-Opening.png`.
Fine engraved contours and vein hatching; small ivory highlights; dimensional
but restrained gouache shading. No thick cartoon outline, distressed paper,
metallic gradients or flat generic leaf symbols. Match perceived stroke weight
at the intended display size rather than imposing a vector stroke on raster art.

Palette: Emerald #174A4A, Deep Sage #596957, Muted Sage #899783,
Warm Ivory #FAF7F1, restrained Champagne #B79A68. Background must be genuinely
transparent; paper is supplied by the page, never baked into motif exports.

## Existing asset decisions

| Existing asset | Decision | Reason / motion boundary |
|---|---|---|
| botanical_full_detail_hybrid | Retain as dense focal bouquet | Master style anchor; move as intact group, do not fake petal articulation |
| botanical_ornament | Retain, use more selectively | Strong detail but repetition is visible across sections |
| floating_botanical_leaves_fidelity | Retain for small accents | Disconnected leaves cannot substitute for a coherent branch |
| monogram_RD_exact_illustration | Retain unchanged | No new initials, outlines or monogram details authorized |
| romantic-doves | Retain perched pair | Single raster is unsuitable for anatomically correct flight |
| naturalist-butterfly | Retain | Small finite motion allowed; no independent wing geometry exists |
| gandrung-venue | Retain selected architecture unchanged | Actual venue relationship/address still needs confirmation |
| paper-grain | Retain as separate background | Do not duplicate texture in illustration exports |
| circular_monogram_ornament | Reserve, not default | Avoid redundant ornament around ornate monogram |

No destructive replacement is proposed. New modular motifs supplement the
existing family. No raster bouquet is claimed to have been converted into
editable botanical paths or articulated petals.

## Generation provenance

User requested GPT Image 2.5. Available built-in tool does not expose a model
selector or verifiable model identity. User explicitly authorized the built-in
generator instead. Do not label these outputs as verified GPT Image 2.5.
New outputs are proposals awaiting visual approval; subsequent studies may use
them as technical style references alongside the approved supplied anchors.

## Planned reusable family

| Stem filename | Intended use | Shape | Independent motion |
|---|---|---|---|
| rd-connecting-branch-v1 | Opening/Hero edge; inter-section continuity | Tall S branch | Rotate around base, small translation |
| rd-bud-sprig-v1 | Letter margin, RSVP, narrow mobile edges | Light upright sprig | Gentle finite settling from base |
| rd-peony-accent-v1 | Focal accent layered onto branch | Compact flower | Short opacity/scale reveal, no fake unfolding |

Independent files form a composable layer kit: branch behind, sprig secondary,
peony in front. They are not a flattened screenshot of a page. Keep pivots and
layout coordinates in the eventual scene component rather than baking text or
controls into images. A preview assembly is illustrative, not final layout.

## Responsive and optimization requirements

Preserve original transparent PNG masters. Create proportional WebP delivery
variants without stretching or cropping the silhouette. Use 320px / 640px /
960px maximum-edge tiers where source resolution permits; never upscale.
Evaluate soft alpha edges on both Ivory and Emerald. Use lossless alpha and
quality 85 WebP color; verify actual byte sizes and perceived hatch detail.
Small accent targets: approximately 20–100KB; larger decorative layers:
approximately 60–220KB, subject to measured visual quality. These are budgets,
not claims of achieved performance. Lazy-load below-fold art; avoid priority on
every motif; match `sizes` to the rendered width. No video is needed for this kit.

## Missing real-world references

Approved couple photographs and sequence; actual venue confirmation and any
environment references; final wedding date/time/location; personal story and
closing copy. Nothing in this library establishes those facts. Existing supplied
asset rights/usage notes remain incomplete. No venue, couple, monogram or
personal narrative is fabricated.

## Delivered inventory

Root: `output/illustration-library-v1/`. Master PNGs preserve generated pixels;
delivery variants preserve full composition and alpha, with no upscaling.

| Filename stem | Master / aspect | 320 / 640 / 960 max-edge WebP bytes |
|---|---|---|
| rd-connecting-branch-v1 | 1024×1536, 2:3 | 32,514 / 97,722 / 193,208 |
| rd-bud-sprig-v1 | 1024×1536, 2:3 | 20,194 / 57,684 / 114,042 |
| rd-peony-accent-v1 | 1254×1254, 1:1 | 34,256 / 122,906 / 265,550 |

Naming: `masters/<stem>.png`, `web/<stem>-<max-edge>.webp`. For portrait
assets the 320/640/960 exports are 213×320, 427×640 and 640×960 respectively.
Peony 960 exceeds the provisional 220KB decorative budget: reserve it for
large/high-density display; use 640 or 320 for ordinary placements.

- `manifest.json`: exact file paths, dimensions, sizes, alpha ranges and pivots.
- `layer-composition.json`: independent layers, ordering and example coordinates.
- `preview/asset-preview-sheet.png`: family on Ivory and Emerald.
- `preview/layer-assembly.png`: example assembly of three separate layers.
- `preview.html`: responsive review sheet plus opt-in finite animation preview.
- Exact prompts and input reference chain: `docs/PHASE-2-GENERATION-PROMPTS.md`.
- Repeatable export script: `scripts/prepare-illustration-library.mjs`.

## Validation and review limits

All three masters have alpha with transparent pixels (0) and opaque pixels
(255). Visually inspected the final contact sheet on Ivory and Emerald and the
layer assembly: no rectangular background, missing petals or clipped silhouette
was observed in the delivered preview. Fine hatch details are retained at review
scale. Exact RGB palette membership is not claimed for shaded raster artwork.
Champagne details are more prominent than in some existing assets; final artistic
acceptance remains pending. Motif counts follow generated results, not an exact
botanical specification. No new landscape, birds, monogram or venue was generated.

`node scripts/prepare-illustration-library.mjs` completed successfully. Sharp
reported unwritable external Fontconfig cache directories, but the sheet rendered
and labels were visually verified. `npx eslint scripts/prepare-illustration-library.mjs`
passed. Website source/components were not changed; no full site build or RSVP
test was needed for this isolated asset deliverable.

Preview HTML inspected in Chromium at 390×844 and 1440×900: all four images
decoded, no horizontal overflow. The replay preview is opt-in and uses three
independent image layers; reduced-motion styling removes movement.
