import { WeddingEventDetails } from "@/types/invitation";

/**
 * Irvan & Hana Digital Invitation — Canonical Data Register
 * Status matches docs/08-CONTENT-AND-ASSET-REGISTER.md:
 * - Couple names: DEFINED (Irvan & Hana)
 * - Date, time, venue, narrative, photos: PENDING (using restrained placeholder baselines)
 */
export const weddingContent: WeddingEventDetails = {
  couple: {
    groom: "Irvan",
    bride: "Hana",
    displayNames: "IRVAN & HANA",
  },
  event: {
    // STATUS: PENDING — Representative baseline for countdown and layout testing
    date: "24",
    displayDay: "Saturday, 24 October",
    displayMonthYear: "October 2026",
    time: "10:00 AM — 01:00 PM",
    venueName: "The Glasshouse Conservatory",
    venueAddress: "Jl. Diponegoro No. 45, Menteng, Jakarta Pusat",
    mapUrl: "https://maps.google.com/?q=Jakarta",
    countdownTarget: "2026-10-24T10:00:00+07:00",
  },
  story: {
    // STATUS: PENDING — Restrained letter format baseline
    title: "A Letter of Love & Intention",
    letterParagraphs: [
      "In the quiet rhythms of our shared journey, love grew not as a sudden spectacle, but like roots finding steady ground—deliberate, gentle, and certain.",
      "As we prepare to join our lives and step forward together, we wish to gather those who have graced our days with warmth, quiet counsel, and enduring friendship.",
      "With gratitude and joyous hearts, we invite you to share in the beginning of our next chapter.",
    ],
  },
  closing: {
    // STATUS: PENDING
    statement: "With love, reverence, and gratitude for your presence in our lives.",
  },
};
