import React from "react";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { weddingContent } from "@/data/wedding-content";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Invitation Hero"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1]"
    >
      {/* Decorative Outer Border Lines */}
      <div className="absolute inset-4 sm:inset-10 border border-[#E6E0D7] pointer-events-none" />
      <div className="absolute inset-5 sm:inset-12 border border-[#E6E0D7]/40 pointer-events-none" />

      {/* Main Opened Stationery Spread */}
      <div className="relative w-full max-w-[640px] md:max-w-[720px] bg-[#FFFFFF] border border-[#D8D0C2] p-8 sm:p-14 md:p-16 shadow-[0_6px_24px_rgba(57,53,52,0.05)] text-center">
        
        {/* Subtle decorative inner frame */}
        <div className="absolute inset-3 sm:inset-4 border border-[#E6E0D7]/50 pointer-events-none" />

        {/* Botanical Crest Top Framing */}
        <div className="flex justify-center mb-6">
          <BotanicalFrame variant="crest" />
        </div>

        {/* Section Lead Typography */}
        <p className="font-sans text-[11px] sm:text-[13px] tracking-[0.3em] uppercase text-[#746A66] mb-4 sm:mb-6">
          The Wedding Celebration Of
        </p>

        {/* Couple Names - Cormorant Garamond */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#174A4A] tracking-wide leading-tight sm:leading-none my-4 sm:my-6">
          {weddingContent.couple.displayNames}
        </h1>

        <BotanicalFrame variant="divider" className="my-6 opacity-75" />

        {/* Date and Location Centerpiece - Strictly no countdown or RSVP CTA */}
        <div className="flex flex-col items-center gap-2 mt-4 text-[#393534]">
          <p className="font-display text-xl sm:text-2xl text-[#393534] tracking-wider italic">
            {weddingContent.event.displayDay}
          </p>
          <p className="font-sans text-[12px] sm:text-[13px] tracking-[0.2em] text-[#746A66] uppercase mt-1">
            {weddingContent.event.venueName}
          </p>
          <p className="font-sans text-[11px] sm:text-[12px] tracking-[0.15em] text-[#746A66]/80 uppercase">
            Jakarta, Indonesia
          </p>
        </div>

        {/* Bottom subtle botanical accent */}
        <div className="mt-10 pt-4 flex justify-center">
          <span className="w-12 h-[1px] bg-[#B79A68]/60" />
        </div>
      </div>
    </section>
  );
}
