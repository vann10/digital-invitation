import React from "react";

interface MonogramProps {
  className?: string;
  size?: number;
  color?: string;
}

export function Monogram({
  className = "",
  size = 64,
  color = "currentColor",
}: MonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Irvan and Hana Monogram"
    >
      {/* Outer subtle decorative ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke={color}
        strokeWidth="0.75"
        strokeDasharray="2 3"
        opacity="0.4"
      />
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={color}
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Letter 'I' - refined serif stem */}
      <path
        d="M38 28H48M43 28V72M38 72H48"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="square"
      />

      {/* Ampersand '&' - delicate editorial flourish */}
      <path
        d="M51 55C53.5 52 54.5 49 53.5 46.5C52.5 44 49.5 44 48 46C46.5 48 45 52 47.5 56L53.5 64C54.5 65.5 56.5 66 58 65C59.5 64 60 62 58.5 60.5C57 59 52 57 49 55"
        stroke="#B79A68"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Letter 'H' - refined serif */}
      <path
        d="M54 28H64M59 28V72M54 72H64M59 50H71M66 28H76M71 28V72M66 72H76"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}
