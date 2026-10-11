"use client";

import React, { useState } from "react";
import { BotanicalFrame } from "../ui/BotanicalFrame";
import { RsvpChoice } from "@/types/invitation";

export function RsvpSection() {
  const [selectedChoice, setSelectedChoice] = useState<RsvpChoice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChoice) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Simulate backend submission to Supabase
      // In production, this validates token and inserts into Supabase RSVP table
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      setErrorMessage("Unable to record your response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      aria-label="RSVP Response Card"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1]"
    >
      <div className="max-w-[580px] mx-auto">
        
        {/* Reply Card Stationery */}
        <div className="bg-[#FFFFFF] border border-[#D8D0C2] p-8 sm:p-14 shadow-[0_6px_24px_rgba(57,53,52,0.05)] text-center relative">
          <div className="absolute inset-3 border border-[#E6E0D7]/50 pointer-events-none" />

          {/* Card Header */}
          <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#746A66] block">
            RSVP
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#174A4A] font-normal mt-2">
            The Favor of a Reply
          </h2>
          <BotanicalFrame variant="divider" className="my-6 opacity-75" />

          {isSubmitted ? (
            /* Quiet acknowledgement conforming to 05-COLOR-SYSTEM.md & 07-TECHNICAL-ARCHITECTURE.md */
            <div className="py-8 space-y-4">
              <span className="w-2 h-2 rounded-full bg-[#174A4A] mx-auto block" />
              <h3 className="font-display text-2xl text-[#174A4A]">
                Thank you for your response
              </h3>
              <p className="font-sans text-[14px] text-[#746A66] leading-relaxed max-w-sm mx-auto">
                Your presence in our story is dearly cherished. Your response has been recorded.
              </p>
              <p className="font-sans text-[11px] text-[#746A66]/70 uppercase tracking-widest pt-4">
                Response: {selectedChoice === "attending" ? "Attending" : "Unable to Attend"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <p className="font-sans text-[14px] text-[#746A66] mb-8">
                Kindly respond to let us know if you can join our celebration.
              </p>

              {/* Accessible Editorial Single-Choice Selection */}
              <div
                role="radiogroup"
                aria-label="Attendance response"
                className="flex flex-col gap-4 my-8"
              >
                {/* Option 1: Attending */}
                <div
                  role="radio"
                  aria-checked={selectedChoice === "attending"}
                  tabIndex={0}
                  onClick={() => setSelectedChoice("attending")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedChoice("attending");
                    }
                  }}
                  className={`relative cursor-pointer py-4 px-6 border transition-all duration-200 select-none flex items-center justify-between ${
                    selectedChoice === "attending"
                      ? "border-[#174A4A] bg-[#FAF7F1] text-[#174A4A]"
                      : "border-[#E6E0D7] bg-[#FFFFFF] text-[#393534] hover:border-[#899783]"
                  }`}
                >
                  <span className="font-display text-lg sm:text-xl tracking-wide">
                    Attending
                  </span>
                  {/* Editorial selection marker (NOT standard radio circle) */}
                  <div className="flex items-center gap-2">
                    {selectedChoice === "attending" && (
                      <span className="font-sans text-[11px] tracking-widest uppercase text-[#174A4A]">
                        Selected —
                      </span>
                    )}
                    <span
                      className={`w-3 h-3 border transition-colors ${
                        selectedChoice === "attending"
                          ? "border-[#174A4A] bg-[#174A4A]"
                          : "border-[#D8D0C2] bg-transparent"
                      }`}
                    />
                  </div>
                </div>

                {/* Option 2: Unable to Attend */}
                <div
                  role="radio"
                  aria-checked={selectedChoice === "unable_to_attend"}
                  tabIndex={0}
                  onClick={() => setSelectedChoice("unable_to_attend")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedChoice("unable_to_attend");
                    }
                  }}
                  className={`relative cursor-pointer py-4 px-6 border transition-all duration-200 select-none flex items-center justify-between ${
                    selectedChoice === "unable_to_attend"
                      ? "border-[#174A4A] bg-[#FAF7F1] text-[#174A4A]"
                      : "border-[#E6E0D7] bg-[#FFFFFF] text-[#393534] hover:border-[#899783]"
                  }`}
                >
                  <span className="font-display text-lg sm:text-xl tracking-wide">
                    Unable to Attend
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedChoice === "unable_to_attend" && (
                      <span className="font-sans text-[11px] tracking-widest uppercase text-[#174A4A]">
                        Selected —
                      </span>
                    )}
                    <span
                      className={`w-3 h-3 border transition-colors ${
                        selectedChoice === "unable_to_attend"
                          ? "border-[#174A4A] bg-[#174A4A]"
                          : "border-[#D8D0C2] bg-transparent"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <p className="font-sans text-[12px] text-red-700 my-4">
                  {errorMessage}
                </p>
              )}

              {/* Submit Action */}
              <div className="mt-8 pt-4">
                <button
                  type="submit"
                  disabled={!selectedChoice || isSubmitting}
                  className={`w-full py-3.5 px-6 font-sans text-[12px] sm:text-[13px] tracking-[0.25em] uppercase transition-all duration-300 ${
                    selectedChoice
                      ? "bg-[#174A4A] text-[#FAF7F1] hover:bg-[#123838] cursor-pointer shadow-sm"
                      : "bg-[#E6E0D7] text-[#746A66]/60 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Response"}
                </button>
              </div>

              <p className="font-sans text-[10px] text-[#746A66]/60 tracking-wider mt-4">
                Responses are final once submitted.
              </p>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
