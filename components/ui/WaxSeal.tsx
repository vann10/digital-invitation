"use client";

import React, { useState } from "react";
import { Monogram } from "./Monogram";

interface WaxSealProps {
  onActivate: () => void;
  disabled?: boolean;
  className?: string;
}

export function WaxSeal({ onActivate, disabled = false, className = "" }: WaxSealProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsPressed(true);
      setTimeout(() => {
        setIsPressed(false);
        onActivate();
      }, 150);
    }
  };

  const handlePointerDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    if (disabled) return;
    setIsPressed(false);
    onActivate();
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled && !isPressed) onActivate();
      }}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setIsPressed(false)}
      disabled={disabled}
      aria-label="Open wedding invitation by breaking the wax seal"
      className={`relative inline-flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer select-none transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#174A4A] ${
        isPressed
          ? "scale-95 translate-y-0.5 shadow-sm"
          : "hover:scale-[1.02] hover:-translate-y-0.5"
      } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`}
    >
      {/* Wax Seal SVG Body */}
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Irregular organic wax outer contour */}
        <path
          d="M42 4C51 3.5 59 6 66 12C73 18 78 26 79 35C80 44 77 53 72 61C67 69 58 75 49 77C40 79 30 78 22 73C14 68 8 60 5 51C2 42 4 32 8 24C12 16 20 9 29 6C34 4.5 38 4.2 42 4Z"
          fill="#174A4A"
        />

        {/* Inner rim highlight / tactile bevel */}
        <circle
          cx="42"
          cy="42"
          r="32"
          stroke="#1F5C5C"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <circle
          cx="42"
          cy="42"
          r="30"
          stroke="#0F3333"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Soft highlight arc on upper edge */}
        <path
          d="M24 24C30 18 42 16 54 20"
          stroke="#FAF7F1"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.25"
        />
      </svg>

      {/* Embossed Monogram centered inside seal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Monogram size={44} color="#FAF7F1" className="opacity-95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
      </div>
    </button>
  );
}
