"use client";

import React, { useState, useEffect } from "react";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { weddingContent } from "@/data/wedding-content";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function TheWeddingSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingContent.event.countdownTarget).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="the-wedding"
      aria-label="The Wedding Details and Countdown"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1]"
    >
      <div className="max-w-[960px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#746A66]">
            The Wedding Details
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#174A4A] font-normal mt-2">
            Ceremony & Reception
          </h2>
          <BotanicalFrame variant="divider" className="my-4" />
        </div>

        {/* Asymmetrical / Two-card Editorial Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Invitation Card (8 cols on desktop) */}
          <div className="md:col-span-7 bg-[#FFFFFF] border border-[#D8D0C2] p-8 sm:p-12 shadow-[0_4px_20px_rgba(57,53,52,0.04)] text-center relative">
            <div className="absolute inset-3 border border-[#E6E0D7]/40 pointer-events-none" />

            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#746A66]">
              {weddingContent.event.displayMonthYear}
            </span>

            {/* Date Typographic Centerpiece */}
            <div className="my-6">
              <span className="font-display text-7xl sm:text-8xl md:text-9xl text-[#174A4A] font-light leading-none block">
                {weddingContent.event.date}
              </span>
              <span className="font-display italic text-lg sm:text-xl text-[#393534] mt-2 block">
                {weddingContent.event.displayDay}
              </span>
            </div>

            <div className="w-16 h-[1px] bg-[#B79A68] mx-auto my-6 opacity-60" />

            {/* Venue & Time Hierarchy */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-[#393534]">
                {weddingContent.event.venueName}
              </h3>
              <p className="font-sans text-[13px] tracking-wide text-[#746A66]">
                {weddingContent.event.time}
              </p>
              <p className="font-sans text-[12px] text-[#746A66]/80 max-w-sm mx-auto leading-relaxed">
                {weddingContent.event.venueAddress}
              </p>
            </div>
          </div>

          {/* Secondary Countdown Detail Card (5 cols on desktop) */}
          <div className="md:col-span-5 bg-[#FAF7F1] border border-[#D8D0C2] p-6 sm:p-8 shadow-sm text-center relative md:mt-8">
            <div className="absolute inset-2 border border-[#E6E0D7]/50 pointer-events-none" />

            {/* Exact label locked: UNTIL THE WEDDING */}
            <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-[#746A66] font-medium block mb-6">
              UNTIL THE WEDDING
            </span>

            {/* Restrained typographic countdown units */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 my-4">
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#174A4A] block">
                  {timeLeft.days}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#746A66]">
                  Days
                </span>
              </div>
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#174A4A] block">
                  {timeLeft.hours}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#746A66]">
                  Hours
                </span>
              </div>
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#174A4A] block">
                  {timeLeft.minutes}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#746A66]">
                  Mins
                </span>
              </div>
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#174A4A] block">
                  {timeLeft.seconds}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#746A66]">
                  Secs
                </span>
              </div>
            </div>

            <p className="font-sans text-[11px] text-[#746A66]/70 mt-6 tracking-wider">
              Counting each joyful moment
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
