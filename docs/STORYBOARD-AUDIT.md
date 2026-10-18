# Storyboard audit — 2026-10-15

## Scope and preservation

Audit completed before presentation edits. The primary reference,
`references/Elegant-Wedding-Website-Storyboard.png`, was opened and inspected directly.
The Opening animation and cover-to-Hero reference images were also inspected.
Existing uncommitted work is the implementation baseline; no revert is recommended.
No source asset was deleted, overwritten, regenerated, or replaced during the audit.

Initial Git status contained modified `.env.example`, `.gitignore`, `README.md`,
`app/globals.css`, `app/layout.tsx`, `app/page.tsx`, canonical documents 07–09,
`eslint.config.mjs`, and both package manifests. Untracked work included the API,
operator page, six presentation components, content layer, backend library, proposed
SQL migration, browser/unit tests, scripts, reference pack, and prior QA evidence.
All of this must be preserved. Git emitted a permission warning for the global ignore
file; repository status was still available through `rtk proxy git status --short`.

Read: AGENTS, README, canonical documents 01–09, implementation decisions, reference
README, and supplemental Opening Motion Specification. Recursive filename searches
found no `PRD.md` or `10-Memory-Prompt.txt`. The source document directory is `docs/`.

## Asset inventory

There is no root `assets/` directory. The public `/assets` URL maps to
`public/assets/`. The complete recursive inventory contains `.gitkeep`, the eight
original files below, and five existing WebP derivatives. No local font, video,
Lottie, animated image, real gallery photo, venue illustration, or landscape art
was found there. Cormorant Garamond and DM Sans are loaded by `next/font/google`.
Repository license/usage documentation for these assets was not found; final rights
and asset approval remain PENDING.

| Original file | Dimensions | Bytes | Actual visual characteristics | Section mapping and implementation |
|---|---:|---:|---|---|
| `botanical_full_detail_hybrid.svg` | 1224×1285 | 4,618,748 | Embedded raster; three ivory peonies, intricately engraved dark sage leaves, gold buds, trailing stems | Opening/Hero primary framing; Story/Wedding/RSVP accents; reuse existing transparent WebP |
| `botanical_ornament.svg` | 1024×1536 | 3,463,880 | Embedded raster; tall peony, foliage and cascading buds | Story/Wedding/Venue peripheral framing; preserve architecture as the future Venue subject |
| `floating_botanical_leaves_fidelity.svg` | 1374×1145 | 1,917,324 | Embedded raster; three separate engraved leaves in sage and ivory/gold | Hero or small peripheral accent; reuse original appearance |
| `monogram_RD_exact_illustration.svg` | 2048×1365 | 2,649,689 | Embedded raster; intertwined emerald/gold RD, peonies and botanical flourishes | Opening/Closing; preserve actual artwork, not ordinary text |
| `circular_monogram_ornament.svg` | 1024×1024 | 2,064,970 | Embedded raster; gold circular flourish with small green leaves | Available but not needed around the already ornate RD signature |
| `Vintage Ivory Peony Botanical Bouquet.png` | 1224×1285 | 2,330,950 | Opaque ivory-backed bouquet matching the full-detail botanical | Source retained; existing transparent WebP better supports composition |
| `2403.jpg` | 1500×1500 | 1,238,067 | White paper fiber/grain | Optional material reference; avoid prominent grain per canonical design system |
| `28370685_white_paper_texture_collection.svg` | 928×332 | 22,396,350 | Four paper texture swatches, not a seamless full-page asset | Reference only; avoid delivering a 22 MB decorative sheet |

| Existing derivative under `public/assets/optimized/` | Bytes | Format |
|---|---:|---|
| `botanical_full_detail_hybrid.webp` | 1,434,622 | RGBA, 1224×1285 |
| `botanical_ornament.webp` | 1,403,612 | RGBA, 1024×1536 |
| `floating_botanical_leaves_fidelity.webp` | 409,726 | RGBA, 1374×1145 |
| `circular_monogram_ornament.webp` | 283,906 | RGBA, 1024×1024 |
| `monogram_RD_exact_illustration.webp` | 1,199,480 | RGBA, 2048×1365 |

Actual PNG/JPEG/WebP content was opened, not inferred from names. Transparent artwork
was also composited over Warm Ivory in memory to inspect its appearance; no source
file was changed. The texture SVG was rendered in memory for inspection. The existing
optimization script confirms the artwork SVGs are raster wrappers, not independent
flower/leaf vector paths. Use Next Image responsive delivery rather than shipping
multi-megabyte SVG wrappers or rerunning source optimization.

Reference pack crops are visual references, explicitly not production assets.
They must not be used as finished venue imagery, photographs, or interface screenshots.

## Eight-section gap analysis

| Section | Observed mismatch and exact cause | Targeted repair / limitation |
|---|---|---|
| Opening | `components/botanical.tsx` uses repeated simple leaf/petal paths; original artwork unused. CSS heavily crops corners. CTA is ivory/outlined. Live 390×844 browser view confirms sparse treatment. | Restore rich supplied bouquet, asymmetric corner mass, emerald filled CTA, monogram hierarchy and fine champagne ornament |
| Hero | Same substitute SVG; mobile width 180px, left −94px, opacity .42. Large desktop line separates art from type. | Restore full-opacity lower/right bouquet, separate leaf accents, centered mobile names and deliberate desktop composition |
| Our Story | Plain white letter with only a top border; extra invented preview headline dominates. No artwork. | Section-name heading, framed ivory letter, original botanical layers; actual personal copy remains PENDING |
| The Wedding | White double-outline card and detached countdown, no flowers; extra preview headline changes hierarchy. | Champagne stationery frame and floral overlap, names/date hierarchy, subordinate countdown; no invented date |
| Venue | Generic paired arches are explicitly a placeholder, but cannot visually match the reference's architecture. | Keep missing-art status honest; remove misleading geometric substitute from the rendered presentation; actual architectural asset BLOCKED |
| Gallery | Three empty framed slots; no approved photos exist. | Preserve vertical varied-scale sequence and natural-image delivery; exact imagery BLOCKED |
| RSVP | Underlined text options without the reference's floral accompaniment; page divided by large rules. | Refined framed options, supplied botanical accent, emerald submission action; retain native radios, selection semantics, finality/error behavior |
| Closing | Monogram and pending copy only; no reveal or rich peripheral artwork. | Preserve monogram signature and restrained botanical context; reference landscape and final copy remain PENDING |

## Motion audit

- Initial cover drawing exists: stroke-dash animations target the substitute SVG,
  with details settling after 3.4 seconds. It is not missing in code; it animates
  the wrong visual material.
- Cover-to-Hero handoff exists at 1,400 ms; reduced motion uses 100 ms. Preserve
  its input guard, focus transfer, no-JavaScript form and scroll behavior.
- `components/reveal.tsx` applies one opacity/translate animation per wrapper at
  a .12 intersection threshold. Story, invitation/countdown and reply compositions
  lack independent staged entrances. Closing has no Reveal wrapper.
- The Hero children are animated together and can complete much of their entrance
  behind the exiting cover. Coordinate their timings with the exposed composition.
- Original bitmap artwork cannot be genuinely stroke-drawn. Fidelity takes priority:
  use restrained mask/opacity/movement on the supplied art, without claiming a true
  path draw. No replacement/generated botanical is required.

## Authority reconciliation

The primary storyboard governs appearance; canonical requirements continue to govern
facts, section sequence, accessibility and behavior. Keep the locked palette and fonts.
The storyboard's illustrative zero date, venue, couple pictures and landscapes are
not supplied wedding facts/assets. Keep truthful pending content instead.

The primary storyboard's Gallery collage is adapted to the required vertical
editorial sequence, as the user explicitly permits responsive placement changes.
The supplied ornate RD monogram takes precedence over recreating the storyboard's
simpler letters, per the user's asset-integrity rule. A secondary transition reference
shows landscape in Hero, but the primary storyboard and canonical Hero requirements
exclude it; retain the botanical Hero. The supplemental path-drawing preference
does not override the explicit instruction to preserve existing detailed artwork.
No unresolved canonical conflict requires changing a locked product decision.

## Proposed implementation and verification

1. Add reusable artwork presentation and reuse existing WebPs through Next Image.
2. Repair `components/opening.tsx`, `app/page.tsx`, `app/globals.css` and RSVP
   presentation while preserving the current Next.js/content/backend architecture.
3. Stage nonessential reveals in `components/reveal.tsx`; keep content available
   without animation and respect preference changes to reduced motion.
4. Update browser assertions to verify original artwork and motion instead of the
   obsolete replacement-SVG paths. Save new evidence separately from prior QA files.
5. Run lint, typecheck, unit tests, production build, browser layouts/interactions,
   accessibility checks and mocked RSVP regression tests.

Release remains BLOCKED by wedding date/time, venue/address/map, story, final RSVP
and closing copy, actual venue artwork, gallery photographs/sequence, final asset
approval/rights, accepted backend proposals and live Supabase configuration.
Live integration, deployment, real-device smoothness and final-content visual
acceptance are NOT TESTED by this audit. No commit, push, deployment or migration
is part of the repair.

## Verification and concurrent editing boundary

Executed during this audit:

- `rtk proxy git status --short`: repository status inspected; global ignore warning noted above.
- Recursive asset metadata inspection with Node/Sharp: dimensions, byte sizes,
  transparency, and raster-in-SVG structure recorded above.
- `rtk proxy npm run dev -- --hostname 127.0.0.1`: local development server started.
- Playwright using the installed Chromium 1228 executable: live Opening inspected
  at 390×844. Default Playwright launch initially failed because it expected the
  absent Chromium 1248; the existing browser was used without installation.
- `rtk proxy npm run lint`: PASS, exit 0.
- `rtk proxy npm run typecheck`: PASS, exit 0.
- `rtk proxy npm test`: PASS, 5 tests. Node emitted the existing typeless-package warning.

Presentation files changed concurrently after the audit reads: `opening.tsx` and
new `artwork.tsx` at approximately 16:10 local time, `page.tsx` and `reveal.tsx`
around 16:12, and `globals.css` around 16:14. A new navigation component also
appeared. An attempted presentation patch rejected its stale context. These
concurrent changes were not overwritten or attributed to this audit. The user
was asked to confirm whether another editor is active before further shared-file
implementation. This audit's completed deliverable is this report.

Production build, final responsive/visual checks, new motion acceptance, browser
RSVP regression checks and post-repair accessibility are NOT TESTED in this audit.
The passing static/unit checks apply only to the changing worktree inspected at
that moment, not to a finalized implementation.
