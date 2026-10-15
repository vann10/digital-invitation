# QA & Acceptance Criteria — Rizal & Dewi Digital Invitation

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
