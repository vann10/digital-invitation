# Information Architecture & Content Model — Irvan & Hana

**Status:** Direction locked; some content pending  
**Sequence:** Opening → Hero → Our Story → The Wedding → Venue → Gallery → RSVP → Closing

## Global experience principles

- Mobile-first and fully responsive.
- Desktop is an editorial re-composition, not a scaled-up mobile layout.
- Preserve the established visual hierarchy, color system, typography, and illustration style.
- Content examples are not final wedding data unless explicitly identified as confirmed.

## 01 — Opening

**Purpose:** Ceremonially open the digital invitation.

**Visual object:** Editorial envelope + Emerald Blue wax seal + inner invitation.

**Interaction flow:**
1. Closed envelope.
2. Guest activates the wax seal by tap/click or keyboard.
3. Seal presses and releases.
4. Envelope flap opens in a stylized, restrained movement.
5. Inner invitation emerges.
6. Typography and botanical details reveal.
7. The opened invitation resolves into the Hero.
8. Normal page scrolling continues.

Opening and Hero are one continuous experience; do not require scrolling to trigger the Hero reveal. Detailed motion and accessibility requirements live in `03-OPENING-EXPERIENCE.md`.

**Status:** LOCKED.

## 02 — Hero

**Purpose:** Establish the couple's wedding identity.

**Content:** `THE WEDDING`, `IRVAN & HANA`, actual date, actual location.

**Visual object:** Opened invitation/editorial spread.

**Composition:** centered and legible on mobile; controlled asymmetry and generous negative space on desktop.

**Explicit exclusions:** no photography, countdown, RSVP CTA, or long-form copy.

**Status:** LOCKED; actual date/location are placeholders until supplied.

## 03 — Our Story

**Purpose:** Present Irvan & Hana's relationship narrative.

**Visual object:** Personal letter/editorial correspondence.

**Composition:** vertical and readable on mobile; asymmetric editorial spread on desktop. Photography may punctuate the narrative.

Do not assume a timeline, chronology, or chapter structure before actual story copy and format are provided.

**Status:** visual direction locked; copy and narrative format PENDING.

## 04 — The Wedding

**Purpose:** Present the formal event details.

**Main invitation card:** date, time, venue, location.  
**Secondary detail card:** countdown.

**Date treatment:** editorial typographic centerpiece, with the date number prominent. Any example date in historical planning material is illustrative, not final data.

**Information hierarchy:** date → venue → time → location.

**Countdown:** integrated in this section, not standalone. Exact label: `UNTIL THE WEDDING`. Cormorant Garamond for numbers; DM Sans for labels/units. No progress bar or digital-clock styling.

**Status:** direction locked; date/time/venue/location PENDING.

## 05 — Venue

**Purpose:** Introduce the venue and make its location accessible.

**Visual object:** Architectural engraving/plate. Architecture is the subject; botanical illustration is secondary framing.

**Mobile order:** `VENUE` → architectural illustration → venue name → location → `VIEW LOCATION`.

`VIEW LOCATION` is an editorial text action with a subtle underline/rule and a touch-friendly target, not a large filled button.

**Status:** direction locked; venue, address, and map URL PENDING.

## 06 — Gallery

**Purpose:** Create a visual memory sequence and an emotional pause before RSVP.

**Visual object:** Printed editorial photographs.

**Behavior:** vertical editorial photo sequence. Use varied image scale and controlled offsets; do not use a generic gallery grid, autoplay carousel, or required horizontal-scroll interaction.

**Motion:** subtle image reveal, gentle movement, optional restrained parallax.

**Status:** behavior locked; photo selection/order PENDING.

## 07 — RSVP

**Purpose:** Collect the guest's attendance response.

**Visual object:** Refined reply card.

**Approved options only:**
- `Attending`
- `Unable to Attend`

No guest count, dietary preference, free-form message, or additional fields are approved.

**Presentation:** editorial text options with a subtle visible selection indicator. Avoid the conventional radio-button appearance, while retaining semantic single-choice interaction, keyboard operation, visible focus, and a state indicator that does not rely on color alone.

**Status:** two-option model and visual direction LOCKED; final question/copy PENDING. Submission/data rules are in `07-TECHNICAL-ARCHITECTURE.md`.

## 08 — Closing

**Purpose:** End the experience with a quiet, recognizable signature.

**Visual object:** Couple monogram as final signature.

Centered and restrained on mobile; monogram with deliberate negative space on desktop. Do not introduce a new decorative card system.

**Status:** direction locked; closing copy and final monogram asset PENDING.

## Content and asset status summary

### PENDING
- Actual wedding date and time.
- Actual venue, full address, and valid map URL.
- Actual Our Story copy and narrative format.
- Final Gallery photos and sequence.
- Final couple monogram asset.
- Closing statement/copy.
- Final RSVP question/copy.
- Script typeface family, if a script accent is retained.

Never infer or fabricate these values.

Catatan audit
Ada tiga hal yang perlu dijaga ketika dokumen implementasi diperiksa nanti:
1. Opening: dokumen ini sudah menentukan urutan interaksi, tetapi detail animasi tambahan tetap harus mengikuti 03-OPENING-EXPERIENCE.md dan preferensi reduced motion.
2. Venue: tautan VIEW LOCATION harus mengarah ke URL peta yang valid setelah alamat venue dikonfirmasi.
3. RSVP: dokumen ini menentukan tampilan dan pilihan, sedangkan aturan penyimpanan, autentikasi, serta pengiriman respons harus konsisten dengan dokumen arsitektur teknis.
Ketiganya merupakan pemeriksaan lanjutan, bukan alasan untuk menolak dokumen ini.
