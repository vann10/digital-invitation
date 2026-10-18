# QA and Acceptance — Rizal & Dewi Digital Invitation

**Purpose:** Verify function, legibility, responsiveness, and art direction. Passing a checklist alone does not guarantee strong design.

## 1. Creative quality review

Review the actual rendered website, not just the source code or design tokens.

- [ ] Overall atmosphere resembles premium illustrated wedding stationery brought to life.
- [ ] Warm ivory surfaces show subtle, visible texture where appropriate.
- [ ] Botanical artwork is intricate and consistent in style, but not copied into identical positions on every section.
- [ ] Architecture, landscapes, monogram, and photographs have enough scale to matter.
- [ ] Each section has a distinct composition while sharing typography, palette, and illustration language.
- [ ] Opening, Hero, Venue details, and Gallery do not contain conspicuous accidental empty space.
- [ ] Richness does not compromise text contrast or interaction clarity.
- [ ] The design avoids generic wedding-template, SaaS, scrapbook, or over-decorated patterns.
- [ ] The page feels composed at real mobile dimensions, not merely at a desktop preview size.

## 2. Opening and transition

- [ ] `BUKA UNDANGAN` works with pointer and keyboard.
- [ ] The Opening is a distinct composition from the Hero.
- [ ] Transition target is approximately 3–4 seconds, without unnecessary waiting.
- [ ] Transition uses meaningful movement/recomposition of assets, not only fade-in/fade-out.
- [ ] At least some visual continuity is created between Opening and Hero where appropriate.
- [ ] Motion is smooth, staggered, and intentional; no jitter, bounce, or distracting effects.
- [ ] The Hero becomes available without scrolling.
- [ ] Reduced-motion mode gives a short/quiet alternative and preserves all content.
- [ ] No major layout shift or late-loading artwork disrupts the sequence.

## 3. Bird motif

- [ ] A realistic-sketch bird matches the botanical illustration language.
- [ ] The bird changes position in response to scrolling/section progress.
- [ ] Movement follows smooth authored paths or waypoints; no random jitter.
- [ ] The bird does not obscure copy, faces, links, CTA, or RSVP controls.
- [ ] Touch interaction remains usable.
- [ ] Reduced-motion mode keeps the bird static or limits it to discrete, low-motion changes.
- [ ] Decorative bird art is hidden from assistive technology.

## 4. Section-specific checks

- [ ] Opening has texture, monogram/names, botanical detail, and a clear CTA.
- [ ] Hero reads as a composed invitation plate; no accidental empty central field.
- [ ] Our Story is readable and uses only supplied/approved personal content.
- [ ] The Wedding makes date, time, venue, and location easy to scan; countdown is integrated.
- [ ] Venue architecture has presence; actual architecture is not fabricated.
- [ ] Gallery prioritizes real photos, varied scale/crop, and an editorial sequence; no generic grid or autoplay carousel.
- [ ] RSVP offers only `Attending` and `Unable to Attend`, with accessible selection state.
- [ ] Closing feels like a final designed plate, not an empty generic footer.

## 5. Responsive and performance

- [ ] Mobile composition retains the artwork's intended richness without clipping.
- [ ] Desktop is recomposed thoughtfully rather than stretched from mobile.
- [ ] No horizontal overflow, overlapping text, or inaccessible controls.
- [ ] Texture and illustrations are optimized; large assets do not block interaction.
- [ ] Scroll-linked animation remains smooth enough on representative devices.
- [ ] No unnecessary layout thrashing or expensive continuous effects.
- [ ] Image loading, font loading, and transition timing have been tested in-browser.

## 6. Accessibility

- [ ] Contrast meets WCAG AA baseline: 4.5:1 normal text and 3:1 large text.
- [ ] Keyboard focus is visible and controls are keyboard-operable.
- [ ] Semantic headings, buttons, links, and form controls are used.
- [ ] RSVP selected state does not rely on color alone.
- [ ] Reduced motion preserves content and functionality.
- [ ] Decorative imagery is marked appropriately; meaningful images have suitable alt text.

## 7. RSVP and technical acceptance

Follow `07-TECHNICAL-ARCHITECTURE.md` for security and backend requirements. At minimum:
- [ ] One personal invitation link resolves to the correct invitee.
- [ ] Invalid/unknown identifiers do not expose guest data.
- [ ] Only the two approved RSVP responses are accepted.
- [ ] Duplicate and second submissions follow the final-response policy.
- [ ] Success appears only after backend confirmation.
- [ ] Failed submission preserves the choice and gives an appropriate retry path.
- [ ] Operator authentication and private export access are enforced.
- [ ] Secrets remain server-side.
- [ ] Technical checks are evidenced; do not mark them complete based only on documentation.

## 8. Reporting

For each failed check, record:
1. device/viewport and browser;
2. the section or interaction;
3. what was observed;
4. severity and proposed correction;
5. whether the correction was verified afterward.

A checkbox is not evidence by itself. Mark checks `NOT TESTED` until verified.
