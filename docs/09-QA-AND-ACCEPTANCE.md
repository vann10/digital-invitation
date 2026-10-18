# QA & Acceptance Criteria — Rizal & Dewi Digital Invitation

## Approved master-prompt checks — 2026-10-15

The user approved rich supplied botanical illustrations, subtle paper texture, entrance/idle/exit motion, and removal of generated line-art. Current execution evidence belongs in [MASTER-IMPLEMENTATION-QA.md](MASTER-IMPLEMENTATION-QA.md) and `qa/master-implementation/`. Earlier evidence does not establish a pass for the revised implementation.

- [ ] All displayed botanicals use supplied artwork, preserving shading, detail, color and transparency.
- [ ] Paper grain is subtle and distinct from the artwork's own texture; it does not tint photographs.
- [ ] Botanical groups enter from different directions in approximately 1.4–2.0s; monogram follows with fade/scale.
- [ ] Idle cycles are subtle (6–12s), pauseable, paused in hidden tabs, disabled for reduced motion and stopped on exit.
- [ ] CTA remains available before decorative motion finishes; duplicate activation is guarded.
- [ ] Botanical exit travels outward and fades, monogram shrinks/fades, and the separate Hero is revealed within 1.2–1.6s.
- [ ] Actual mobile/desktop screenshots are compared against all section references; missing content/assets remain explicit.

## Implementation evidence — 2026-10-15

The original checklist below is the canonical release gate; unchecked items must not be interpreted as passed merely because code exists. Scoped execution results, fixes, viewports, screenshots, command outputs and remaining limits are now recorded in [QA-REPORT.md](QA-REPORT.md) and `qa/`. Release remains **BLOCKED** by real content/assets, acceptance of backend proposals and live Supabase configuration. The historical evidence table below describes the baseline before this implementation; use the dated report for current verified results.

**Status:** Criteria defined; execution NOT TESTED unless a result is recorded  
**Purpose:** Define what must be checked before launch. This checklist is not evidence that checks have passed.

## 1. Visual consistency

- [ ] Locked palette and semantic tokens are used consistently.
- [ ] Cormorant Garamond and DM Sans are applied according to role.
- [ ] Script family remains unused or pending until selected.
- [ ] Botanical engraving is detailed but does not overwhelm composition.
- [ ] Whitespace and controlled asymmetry are preserved.
- [ ] Borders, shadows, radius, and texture remain restrained.
- [ ] Photography remains natural and visually dominant in Gallery.
- [ ] No generic wedding-template, SaaS, scrapbook, or overly decorative drift.

## 2. Opening experience

- [ ] Editorial Cover is the initial composition.
- [ ] Monogram, couple names, botanical engraving, whitespace, and `BUKA UNDANGAN` have the intended hierarchy.
- [ ] CTA activates by pointer, touch, Enter, and Space as appropriate for a semantic button.
- [ ] CTA pressed/activation response is restrained and perceivable.
- [ ] Selected cover elements reveal or move in the intended sequence.
- [ ] Cover transitions to the separate Hero composition after activation.
- [ ] Hero transition does not require scrolling.
- [ ] Target transition duration (approximately 1.2–1.6 seconds) is checked in a real browser.
- [ ] Keyboard focus is visible and the CTA has an accessible name.
- [ ] Reduced-motion behavior shortens or removes motion without removing content or functionality.
- [ ] Normal scrolling works after the transition; no scroll trap remains.
- [ ] Mobile cover layout has no clipped content, CTA overlap, or horizontal overflow.

## 3. Section and responsive behavior

- [ ] All eight sections appear in the approved order.
- [ ] Hero contains no photography, countdown, RSVP CTA, or long-form copy.
- [ ] Countdown appears in The Wedding, not as a standalone section.
- [ ] Venue CTA reads `VIEW LOCATION` and opens a valid map URL.
- [ ] Gallery is a vertical editorial photo sequence, not a generic grid/autoplay carousel.
- [ ] Desktop is editorially re-composed rather than simply enlarged.
- [ ] Mobile, tablet, and desktop have no horizontal overflow, clipped text, or illustration overlap.
- [ ] Touch targets remain comfortable.

## 4. RSVP and backend

- [ ] Only `Attending` and `Unable to Attend` are accepted.
- [ ] No unapproved fields are displayed or submitted.
- [ ] Editorial selection indicator is visually clear.
- [ ] Underlying choice control has correct single-choice semantics.
- [ ] Selection/focus is keyboard accessible.
- [ ] Selection state is not communicated by color alone.
- [ ] Success is shown only after backend confirmation.
- [ ] Failure preserves the selected choice and gives clear retry behavior where appropriate.
- [ ] One invitation link is associated with one individual.
- [ ] First accepted response is final according to the locked policy.
- [ ] Invalid and duplicate submissions are handled safely.
- [ ] Private operator authentication is required for exports.
- [ ] Public clients cannot access unrestricted guest records or service-role secrets.

## 5. Accessibility and motion

- [ ] Normal text contrast is at least 4.5:1.
- [ ] Large text contrast is at least 3:1.
- [ ] Keyboard focus is visible.
- [ ] Semantic heading order and reading order are logical.
- [ ] Images have suitable alt text.
- [ ] Reduced motion does not hide information or functionality.
- [ ] RSVP feedback is understandable to assistive technology.
- [ ] No essential information is hidden exclusively behind animation.

## 6. Content and production data

- [ ] Actual wedding date and time confirmed.
- [ ] Venue, full address, and map URL confirmed.
- [ ] Our Story copy and format approved.
- [ ] RSVP question/copy approved.
- [ ] Closing copy approved.
- [ ] Final monogram and venue artwork approved.
- [ ] Gallery photography and order approved.
- [ ] Script typeface decision documented if needed.

## 7. Evidence log

For every check, record date, environment/device, result, defect, and follow-up. Do not mark a check passed without evidence.

| Check group | Status | Evidence |
|---|---|---|
| Visual QA | NOT TESTED | Pending implementation/browser review |
| Responsive QA | NOT TESTED | Pending viewport testing |
| Accessibility QA | NOT TESTED | Pending keyboard/contrast/screen-reader checks |
| Opening motion QA | NOT TESTED | Pending browser review including reduced motion |
| RSVP/backend QA | NOT TESTED | Pending Supabase implementation and test cases |
| Deployment/security QA | NOT TESTED | Pending production configuration and access tests |

Catatan audit
Ada dua hal yang perlu diperhatikan.
1. Kriteria penerimaan sudah cukup luas, tetapi belum seluruhnya kuantitatif.
Sebagian besar kriteria sudah bisa digunakan sebagai checklist. Namun, beberapa hal—seperti kelancaran animasi, kenyamanan touch target, dan tidak adanya overlap—masih memerlukan definisi pengujian yang lebih spesifik saat implementasi. Kita tidak perlu menambahkan angka sembarang sebelum kebutuhan dan lingkungan pengujian ditentukan.
2. Data produksi merupakan bagian dari kesiapan rilis.
Dokumen ini benar karena tidak hanya memeriksa kode dan tampilan, tetapi juga mensyaratkan tanggal pernikahan, venue, cerita, foto, monogram, dan konten lainnya sudah disetujui sebelum undangan dianggap siap dirilis.
Satu catatan tambahan: tabel Evidence Log masih berupa status awal. Nanti, status NOT TESTED hanya boleh diubah setelah hasil pengujian benar-benar tersedia.


## Current user override — nature editorial revision

The latest explicit user request supersedes earlier ambient-loop, pause-control and navigation requirements: remove hamburger/bottom navigation and animation pause controls; use finite varied editorial motion with reduced-motion support. Opening handoff remains approximately 1.4 seconds. Music begins on Opening activation with a floating play/stop control. See [current QA](NATURE-EDITORIAL-QA.md) for evidence and remaining release blockers.
