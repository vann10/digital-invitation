import React from "react";
import { BotanicalFrame } from "../ui/BotanicalFrame";

interface GalleryPhotoPlaceholder {
  id: string;
  caption: string;
  aspect: string;
  offset: string; // Tailwind class for controlled editorial offset
}

const photoPlaceholders: GalleryPhotoPlaceholder[] = [
  {
    id: "photo-01",
    caption: "A quiet morning in the garden",
    aspect: "aspect-[3/4]",
    offset: "sm:ml-0 sm:mr-auto sm:max-w-[70%]",
  },
  {
    id: "photo-02",
    caption: "Echoes of unspoken promises",
    aspect: "aspect-[4/5]",
    offset: "sm:ml-auto sm:mr-0 sm:max-w-[75%]",
  },
  {
    id: "photo-03",
    caption: "Walking beneath the canopy",
    aspect: "aspect-[16/10]",
    offset: "mx-auto sm:max-w-[85%]",
  },
];

export function GallerySection() {
  return (
    <section
      id="gallery"
      aria-label="Editorial Photo Gallery"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF7F1]"
    >
      <div className="max-w-[880px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#746A66]">
            Gallery
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#174A4A] font-normal mt-2">
            Moments in Stillness
          </h2>
          <BotanicalFrame variant="divider" className="my-4" />
        </div>

        {/* Vertical Editorial Sequence with Varied Scale & Offsets (NO grid/carousel) */}
        <div className="space-y-20 sm:space-y-32">
          {photoPlaceholders.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative ${photo.offset} transition-transform duration-500`}
            >
              {/* Printed Editorial Matting & Frame */}
              <div className="bg-[#FFFFFF] p-3 sm:p-5 border border-[#D8D0C2] shadow-[0_4px_16px_rgba(57,53,52,0.04)]">
                
                {/* Photo Area (Placeholder frame until real couple photos are provided) */}
                <div
                  className={`w-full ${photo.aspect} bg-[#FAF7F1] border border-[#E6E0D7] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
                >
                  {/* Subtle inner framing accent */}
                  <div className="absolute inset-2 border border-[#E6E0D7]/40 pointer-events-none" />

                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#899783] mb-3 opacity-60"
                  >
                    <rect x="6" y="6" width="28" height="28" stroke="currentColor" strokeWidth="1" />
                    <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M7 28L18 19L33 33" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                  
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#746A66]/70">
                    Editorial Print — {index + 1}
                  </span>
                  <span className="font-sans text-[10px] text-[#746A66]/50 mt-1">
                    (Final photo pending)
                  </span>
                </div>

                {/* Editorial Caption */}
                <div className="mt-4 pt-2 text-center">
                  <p className="font-display italic text-[#746A66] text-[15px]">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
