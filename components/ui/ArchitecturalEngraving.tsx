import React from "react";

interface ArchitecturalEngravingProps {
  className?: string;
}

export function ArchitecturalEngraving({ className = "" }: ArchitecturalEngravingProps) {
  return (
    <div className={`relative mx-auto max-w-[420px] aspect-[4/3] flex items-center justify-center border border-[#E6E0D7] bg-[#FAF7F1] p-4 shadow-sm ${className}`}>
      {/* Decorative hairline inner border */}
      <div className="absolute inset-2 border border-[#E6E0D7]/60 pointer-events-none" />

      {/* Stylized Architectural Conservatory Engraving Plate */}
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#596957]"
        aria-label="Architectural engraving of the wedding conservatory"
      >
        {/* Ground baseline */}
        <line x1="20" y1="190" x2="300" y2="190" stroke="#393534" strokeWidth="1" />
        <line x1="10" y1="193" x2="310" y2="193" stroke="#899783" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* Central Portico / Conservatory Dome */}
        <path
          d="M100 190V90C100 60 130 40 160 40C190 40 220 60 220 90V190"
          stroke="#393534"
          strokeWidth="1.2"
        />
        {/* Glass Dome Ribs */}
        <path d="M160 40V190" stroke="#899783" strokeWidth="0.75" />
        <path d="M130 50C130 80 135 150 135 190" stroke="#899783" strokeWidth="0.6" strokeDasharray="2 2" />
        <path d="M190 50C190 80 185 150 185 190" stroke="#899783" strokeWidth="0.6" strokeDasharray="2 2" />

        {/* Classical Columns */}
        <line x1="110" y1="90" x2="110" y2="190" stroke="#596957" strokeWidth="1" />
        <line x1="120" y1="90" x2="120" y2="190" stroke="#596957" strokeWidth="1" />
        <line x1="200" y1="90" x2="200" y2="190" stroke="#596957" strokeWidth="1" />
        <line x1="210" y1="90" x2="210" y2="190" stroke="#596957" strokeWidth="1" />

        {/* Left Wing */}
        <path d="M40 190V120H100" stroke="#393534" strokeWidth="1" />
        <line x1="55" y1="135" x2="85" y2="135" stroke="#899783" strokeWidth="0.7" />
        <line x1="55" y1="135" x2="55" y2="180" stroke="#899783" strokeWidth="0.7" />
        <line x1="85" y1="135" x2="85" y2="180" stroke="#899783" strokeWidth="0.7" />

        {/* Right Wing */}
        <path d="M280 190V120H220" stroke="#393534" strokeWidth="1" />
        <line x1="235" y1="135" x2="265" y2="135" stroke="#899783" strokeWidth="0.7" />
        <line x1="235" y1="135" x2="235" y2="180" stroke="#899783" strokeWidth="0.7" />
        <line x1="265" y1="135" x2="265" y2="180" stroke="#899783" strokeWidth="0.7" />

        {/* Pediment & Ornament */}
        <path d="M140 38H180" stroke="#B79A68" strokeWidth="1" />
        <circle cx="160" cy="33" r="2" fill="#B79A68" />

        {/* Framing Botanical Vines at edges */}
        <path
          d="M30 190C25 170 35 150 25 130C20 120 28 110 22 95"
          stroke="#596957"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M290 190C295 170 285 150 295 130C300 120 292 110 298 95"
          stroke="#596957"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute bottom-2 right-3 font-sans text-[10px] uppercase tracking-widest text-[#746A66]/60">
        Pl. No. 01 — Architectural Study
      </span>
    </div>
  );
}
