import React from "react";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { weddingContent } from "@/data/wedding-content";

export function OurStorySection() {
  return (
    <section
      id="our-story"
      aria-label="Our Story"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1]"
    >
      <div className="max-w-[800px] mx-auto">
        
        {/* Section Label */}
        <div className="text-center mb-10">
          <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#746A66]">
            Our Story
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#174A4A] font-normal mt-2">
            {weddingContent.story.title}
          </h2>
          <BotanicalFrame variant="divider" className="my-4" />
        </div>

        {/* Editorial Letter Spread Stationery Card */}
        <div className="relative bg-[#FFFFFF] border border-[#D8D0C2] p-8 sm:p-14 md:p-16 shadow-[0_4px_20px_rgba(57,53,52,0.04)]">
          {/* Hairline inner detail */}
          <div className="absolute inset-3 border border-[#E6E0D7]/40 pointer-events-none" />

          {/* Opening salutation */}
          <p className="font-display italic text-lg sm:text-xl text-[#393534] mb-6">
            Dear cherished family & friends,
          </p>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 text-[#393534] leading-relaxed text-[15px] sm:text-[16px] font-sans font-normal">
            {weddingContent.story.letterParagraphs.map((paragraph, idx) => (
              <p key={idx} className="first-letter:font-display first-letter:text-2xl first-letter:font-normal first-letter:mr-0.5">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Editorial Sign-off */}
          <div className="mt-12 pt-6 border-t border-[#E6E0D7] flex flex-col items-end text-right">
            <span className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#746A66]">
              Warmly & devotedly,
            </span>
            <span className="font-display text-2xl sm:text-3xl text-[#174A4A] mt-1">
              Irvan & Hana
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
