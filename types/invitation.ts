export type RsvpChoice = 'attending' | 'unable_to_attend';

export interface GuestInvitation {
  token: string;
  guestName: string;
  hasSubmitted: boolean;
  response?: RsvpChoice;
  submittedAt?: string;
}

export interface WeddingEventDetails {
  couple: {
    groom: string;
    bride: string;
    displayNames: string;
  };
  event: {
    // STATUS: PENDING in 08-CONTENT-AND-ASSET-REGISTER.md (Placeholder baseline provided)
    date: string;
    displayDay: string;
    displayMonthYear: string;
    time: string;
    venueName: string;
    venueAddress: string;
    mapUrl: string;
    countdownTarget: string; // ISO date string for countdown calculation
  };
  story: {
    // STATUS: PENDING in 08-CONTENT-AND-ASSET-REGISTER.md
    title: string;
    letterParagraphs: string[];
  };
  closing: {
    // STATUS: PENDING in 08-CONTENT-AND-ASSET-REGISTER.md
    statement: string;
  };
}
