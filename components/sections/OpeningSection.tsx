"use client";

import React, { useState } from "react";
import { WaxSeal } from "../ui/WaxSeal";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { weddingContent } from "@/data/wedding-content";

interface OpeningSectionProps {
  isOpened: boolean;
  onOpen: () => void;
}

export function OpeningSection({ isOpened, onOpen }: OpeningSectionProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "opened">(
    isOpened ? "opened" : "closed"
  );

  const handleActivateSeal = () => {
    if (stage !== "closed") return;
    setStage("opening");

    // Sequence per 03-OPENING-EXPERIENCE.md (approx 1.2s - 1.4s overall transition)
    setTimeout(() => {
      setStage("opened");
      onOpen();
    }, 1300);
  };

  if (stage === "opened") {
    // When opened, the invitation has resolved into the page / hero
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Invitation envelope ceremony"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F1] px-4 overflow-hidden transition-opacity duration-700"
    >
      {/* Background subtle paper ambient framing */}
      <div className="absolute inset-4 sm:inset-8 border border-[#E6E0D7] pointer-events-none" />
      <div className="absolute inset-5 sm:inset-9 border border-[#E6E0D7]/40 pointer-events-none" />

      {/* Envelope Stationery Container */}
      <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[4/3] bg-[#FAF7F1] border border-[#D8D0C2] shadow-[0_6px_24px_rgba(57,53,52,0.06)] flex flex-col items-center justify-between p-6 sm:p-8 overflow-visible">
        
        {/* Top Header of Envelope */}
        <div className="w-full text-center transition-opacity duration-500">
          <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.25em] text-[#746A66] uppercase">
            With Love
          </span>
          <BotanicalFrame variant="divider" className="my-2 opacity-80" />
        </div>

        {/* Center Recipient / Monogram Space */}
        <div className="relative flex flex-col items-center justify-center text-center my-auto transition-transform duration-700">
          <p className="font-sans text-[12px] sm:text-[13px] tracking-[0.2em] uppercase text-[#746A66] mb-2">
            The Wedding Of
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#174A4A] tracking-wider font-light">
            {weddingContent.couple.displayNames}
          </h1>
          <p className="font-sans text-[11px] sm:text-[12px] tracking-[0.18em] text-[#746A66] mt-3">
            {weddingContent.event.displayMonthYear}
          </p>
        </div>

        {/* Stylized Envelope Flap Graphic */}
        <div
          className={`absolute inset-x-0 top-0 h-1/2 pointer-events-none transition-all duration-700 ease-in-out origin-top ${
            stage === "opening" ? "-rotate-180 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <svg
            viewBox="0 0 480 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0H480L240 160L0 0Z"
              fill="#FAF7F1"
              stroke="#D8D0C2"
              strokeWidth="1"
            />
            {/* Fine decorative contour */}
            <path
              d="M10 5L240 150L470 5"
              stroke="#E6E0D7"
              strokeWidth="0.75"
            />
          </svg>
        </div>

        {/* Emerald Blue Wax Seal - Positioned slightly overlapping flap bottom-center */}
        <div
          className={`relative z-20 -mb-10 sm:-mb-12 transition-all duration-500 ease-out ${
            stage === "opening" ? "scale-110 opacity-0 -translate-y-4" : "scale-100 opacity-100"
          }`}
        >
          <WaxSeal onActivate={handleActivateSeal} disabled={stage !== "closed"} />
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#746A66] text-center mt-3 select-none">
            Tap to open
          </p>
        </div>
      </div>
    </div>
  );
}
