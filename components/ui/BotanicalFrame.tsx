import React from "react";

interface BotanicalProps {
  className?: string;
  variant?: "corner" | "divider" | "crest" | "branch";
}

export function BotanicalFrame({ className = "", variant = "divider" }: BotanicalProps) {
  if (variant === "divider") {
    return (
      <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
        <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 6H20C24 6 26 2 28 2C30 2 31 5 35 6H48"
            stroke="#596957"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <circle cx="28" cy="2" r="1.5" fill="#B79A68" opacity="0.8" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-[#B79A68] opacity-70" />
        <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M48 6H28C24 6 22 2 20 2C18 2 17 5 13 6H0"
            stroke="#596957"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <circle cx="20" cy="2" r="1.5" fill="#B79A68" opacity="0.8" />
        </svg>
      </div>
    );
  }

  if (variant === "crest") {
    return (
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Botanical leaf flourishes */}
        <path
          d="M60 35C45 35 32 25 24 12C35 15 48 20 60 30C72 20 85 15 96 12C88 25 75 35 60 35Z"
          stroke="#596957"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M60 30V8"
          stroke="#596957"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M50 18C54 16 57 14 60 10C63 14 66 16 70 18"
          stroke="#899783"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
        <circle cx="60" cy="6" r="1.5" fill="#B79A68" />
      </svg>
    );
  }

  // Branch / corner ornament
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 70C20 65 30 50 35 35C40 20 55 10 70 10"
        stroke="#596957"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      {/* Side delicate leaves */}
      <path
        d="M25 55C32 52 35 48 33 42C28 45 26 50 25 55Z"
        stroke="#899783"
        strokeWidth="0.65"
        fill="#FAF7F1"
      />
      <path
        d="M38 32C45 28 47 22 43 18C38 22 37 28 38 32Z"
        stroke="#899783"
        strokeWidth="0.65"
        fill="#FAF7F1"
      />
      <circle cx="70" cy="10" r="1.5" fill="#B79A68" opacity="0.8" />
    </svg>
  );
}
