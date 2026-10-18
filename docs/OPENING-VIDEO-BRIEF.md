# Opening video amendment

18 October 2026 user amendment: **DEFERRED / SKIPPED**. User explicitly chose to skip video and proceed to Phase 4. Do not resume generation or retry entitlement checks without a new request. The account and request history below is historical context only.

Status: DEFINED direction; Higgsfield connection verified, but video generation BLOCKED by account entitlement. On 18 October 2026, Seedance 2.5 submission returned `Requires plus plan or higher`; account reports plan `free`, 0 credits, trial `bank_processing`, and unlimited generation unavailable. No job ID or footage was created. The user explicitly requested video for Opening / BUKA UNDANGAN after reviewing the code-driven prototype. This supersedes the previous decision to omit video. No video integration is claimed yet.

Prepared reference: `output/opening-video/botanical-reference.jpg`, 640×672, 79,772 bytes; optimized from the existing bouquet with an Ivory background. Visually inspected. Confirmed Higgsfield image ID: `b2624ab0-df0e-4348-8a5b-9dac5271b3d0`. An earlier upload slot `28e6912c-ba07-44d1-bb5f-1e5250cbfd31` was unused and never confirmed.

Prepared generation: `seedance_2_5`, mode `omni_reference`, start_image reference above, 1:1, 720p, 4 seconds, silent, one result. Cost preflight: 28 credits. First test deliberately keeps the bouquet stable and adds subtle leaf/stem movement in the first 1.4 seconds, rather than asking the model to reinvent the whole cover. Exact request is retained in `output/opening-video/generation-request.json`. Recheck entitlement before retrying; do not repeatedly submit the rejected request.

## Selected direction — botanical aperture

Use the existing botanical illustration family as the image-to-video reference. Animate selected leaves gently unfurling and the floral framing parting toward the outer edges, creating a visual passage into the separate Hero. Preserve fine engraving, sage shading, warm ivory and the existing flowers' shapes. No new venue, photographs, wedding facts, lettering or monogram artwork.

Generate decoration only. Couple names, monogram, frame, CTA and Hero copy remain HTML/image layers above the footage. Avoid feeding screenshots containing text to the generator. Use the existing bouquet/leaf artwork or the reviewed Phase 2 reference assets as visual anchors, not independent stylistic reinvention.

## Timing and composition

- Initial cover: still poster from the video opening frame, so there is no compulsory autoplay or endless motion.
- On BUKA UNDANGAN: begin a muted, inline, one-shot video from a ready frame. Branches unfurl and part outward. Text receives a short code-driven departure.
- Desired usable action: 1.4 seconds, within the existing 1.2–1.6 second handoff target. Request a longer source if required by the provider, then select a natural short passage; do not assume drastic speed-up will look good.
- Composite/crossfade into the real Hero with code. Keep the central text area clear throughout the departure. No camera shake, object morphing, shower of petals, aggressive zoom or lighting/color shifts.
- Mobile and desktop require separate framing/crops, verified against 320×568, 390×844, 768×1024 and 1440×900. Prefer a decoration-only corner plate with a soft edge over a full-frame video if that better preserves the current composition.

## Image-to-video prompt

Animate the supplied botanical wedding engraving faithfully. Preserve the exact flowers, fine-line engraved details, muted sage and deep sage foliage, warm ivory ground, soft champagne details and original restrained color treatment. A very gentle organic unfurling begins in the small leaves, then the botanical framing gracefully parts toward the outer edges, opening a clear central space as if revealing an invitation beneath it. Keep the camera locked. Motion is elegant, continuous and spatially coherent, with no warping or growing new objects. Maintain sharp etched detail and a stable ivory background. No text, letters, logo, monogram, people, architecture or photographic objects. End with botanicals settled at the margins and the central area clear. Silent video.

## Delivery and implementation gate

Inspect generated footage before integration for botanical distortions, color changes, edge flicker, framing, central clearance and first/last-frame continuity. Export a poster and optimized silent MP4 with fast-start; WebM only if it has a meaningful tested size advantage. Target <=1MB mobile and <=2MB desktop as provisional budgets, verify the actual exports. Avoid claiming alpha transparency unless the delivered codec and browser support it.

Playback must never gate invitation access. If the clip is not ready, playback rejects, decoding fails, or reduced motion is requested, immediately use the existing code-driven handoff or short reduced-motion state change. Keep the 1400ms handoff independent of the media ended event. Remove/pause the video once the Hero is shown. Do not fetch/play the video for reduced-motion users where practical.

Required browser evidence: actual video plays after pointer and keyboard activation; poster has no visual jump; mobile inline playback; slow/blocked media and rejected-play fallback; reduced motion; Hero focus; normal scrolling; no overflow; actual encoded dimensions/bytes and timing. These video-specific tests remain NOT TESTED until footage is available.
