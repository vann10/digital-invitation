import React from "react";
import { Monogram } from "../ui/Monogram";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { weddingContent } from "@/data/wedding-content";

export function ClosingSection() {
  return (
    <footer
      id="closing"
      aria-label="Closing Signature"
      className="relative py-28 sm:py-40 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1] text-center"
    >
      <div className="max-w-[600px] mx-auto flex flex-col items-center">
        
        {/* Subtle top divider */}
        <div className="w-12 h-[1px] bg-[#B79A68]/50 mb-10" />

        {/* Monogram as the Final Signature */}
        <div className="my-6">
          <Monogram size={80} color="#174A4A" className="mx-auto" />
        </div>

        {/* Couple Names */}
        <h2 className="font-display text-3xl sm:text-4xl text-[#174A4A] font-light tracking-wide mt-4">
          {weddingContent.couple.displayNames}
        </h2>

        {/* Closing Statement */}
        <p className="font-display italic text-[16px] sm:text-[18px] text-[#746A66] max-w-md mx-auto leading-relaxed mt-4">
          {weddingContent.closing.statement}
        </p>

        <BotanicalFrame variant="divider" className="my-8 opacity-60" />

        <p className="font-sans text-[11px] tracking-[0.25em] text-[#746A66]/60 uppercase">
          {weddingContent.event.displayMonthYear}
        </p>
      </div>
    </footer>
  );
}
