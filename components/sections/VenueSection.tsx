import React from "react";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { ArchitecturalEngraving } from "../ui/ArchitecturalEngraving";
import { weddingContent } from "@/data/wedding-content";

export function VenueSection() {
  return (
    <section
      id="venue"
      aria-label="Venue and Location"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1]"
    >
      <div className="max-w-[780px] mx-auto text-center">
        
        {/* Section Title */}
        <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#746A66] block">
          Venue
        </span>
        <h2 className="font-display text-3xl sm:text-5xl text-[#174A4A] font-normal mt-2 mb-8">
          The Setting
        </h2>

        {/* Architectural Engraving is the Subject */}
        <div className="my-8">
          <ArchitecturalEngraving />
        </div>

        {/* Venue Information */}
        <div className="mt-8 space-y-3">
          <h3 className="font-display text-2xl sm:text-3xl text-[#393534]">
            {weddingContent.event.venueName}
          </h3>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#746A66] max-w-md mx-auto leading-relaxed">
            {weddingContent.event.venueAddress}
          </p>
        </div>

        <BotanicalFrame variant="divider" className="my-8 opacity-70" />

        {/* VIEW LOCATION Editorial Text Action */}
        <div className="mt-6">
          <a
            href={weddingContent.event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-3 px-6 font-sans text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#174A4A] border-b border-[#174A4A] hover:text-[#596957] hover:border-[#596957] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#174A4A]"
            aria-label="View wedding venue location on Google Maps"
          >
            VIEW LOCATION
          </a>
        </div>

      </div>
    </section>
  );
}
