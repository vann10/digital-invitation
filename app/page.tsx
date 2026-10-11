"use client";

import React, { useState } from "react";
import { OpeningSection } from "@/components/sections/OpeningSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { TheWeddingSection } from "@/components/sections/TheWeddingSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#FAF7F1] text-[#393534] selection:bg-[#174A4A] selection:text-[#FAF7F1]">
      {/* 01 — Opening Ceremony Envelope */}
      <OpeningSection
        isOpened={isInvitationOpened}
        onOpen={() => setIsInvitationOpened(true)}
      />

      {/* Main Wedding Editorial Experience (Revealed seamlessly upon opening) */}
      <div
        className={`transition-opacity duration-1000 ${
          isInvitationOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* 02 — Hero Section */}
        <HeroSection />

        {/* 03 — Our Story Section */}
        <OurStorySection />

        {/* 04 — The Wedding Section */}
        <TheWeddingSection />

        {/* 05 — Venue Section */}
        <VenueSection />

        {/* 06 — Gallery Section */}
        <GallerySection />

        {/* 07 — RSVP Section */}
        <RsvpSection />

        {/* 08 — Closing Section */}
        <ClosingSection />
      </div>
    </main>
  );
}
