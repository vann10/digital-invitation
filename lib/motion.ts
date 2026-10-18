// Distinct material gestures, shared timing, no dependency or persistent loop.
type Motion = { keyframes: Keyframe[]; duration: number };
export const editorialMotion: Record<string, Motion> = {
  rule: {
    duration: 1000,
    keyframes: [
      { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
      { clipPath: "inset(0)", opacity: 1 },
    ],
  },
  print: {
    duration: 1100,
    keyframes: [
      { opacity: 0, translate: "0 28px", rotate: ".6deg" },
      { opacity: 1, translate: "0 0", rotate: "0deg" },
    ],
  },
  date: {
    duration: 900,
    keyframes: [
      { opacity: 0, translate: "0 16px" },
      { opacity: 1, translate: "0 0" },
    ],
  },
  settle: {
    duration: 2400,
    keyframes: [
      { opacity: 0, rotate: "-5deg", translate: "0 18px" },
      { opacity: 1, rotate: "1.5deg", translate: "0 -3px", offset: 0.65 },
      { opacity: 1, rotate: "0deg", translate: "0 0" },
    ],
  },
  impression: { duration: 850, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  name: {
    duration: 1100,
    keyframes: [
      { clipPath: "inset(0 100% 0 0)", translate: "-12px 0" },
      { clipPath: "inset(0)", translate: "0 0" },
    ],
  },
  signature: {
    duration: 1400,
    keyframes: [
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1 },
    ],
  },
  botanical: {
    duration: 1600,
    keyframes: [
      { opacity: 0, rotate: "-4deg", translate: "-18px 12px" },
      { opacity: 1, rotate: "0deg", translate: "0 0" },
    ],
  },
  perch: {
    duration: 1800,
    keyframes: [
      { opacity: 0, translate: "24px -22px", rotate: "2deg" },
      { opacity: 1, translate: "0 0", rotate: "0deg" },
    ],
  },
  flutter: {
    duration: 2000,
    keyframes: [
      { opacity: 0, translate: "-28px 24px", rotate: "-12deg", scale: 0.96 },
      {
        opacity: 1,
        translate: "5px -4px",
        rotate: "4deg",
        scale: 1,
        offset: 0.65,
      },
      { opacity: 1, translate: "0 0", rotate: "0deg", scale: 1 },
    ],
  },
  envelope: {
    duration: 1100,
    keyframes: [
      {
        opacity: 0,
        clipPath: "polygon(0 35%,50% 35%,100% 35%,100% 100%,0 100%)",
      },
      {
        opacity: 1,
        clipPath: "polygon(0 35%,50% 0,100% 35%,100% 100%,0 100%)",
      },
    ],
  },
  letter: {
    duration: 1400,
    keyframes: [
      { opacity: 0.2, translate: "0 64px", rotate: "3deg" },
      { opacity: 1, translate: "0 0", rotate: "-3deg" },
    ],
  },
  stationery: {
    duration: 1200,
    keyframes: [
      { opacity: 0, scale: 0.97, rotate: "-1.5deg" },
      { opacity: 1, scale: 1, rotate: "0deg" },
    ],
  },
  engraving: {
    duration: 1800,
    keyframes: [
      { opacity: 0.25, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, clipPath: "inset(0)" },
    ],
  },
  photo: {
    duration: 1300,
    keyframes: [
      { opacity: 0, clipPath: "inset(0 100% 0 0)", scale: 1.025 },
      { opacity: 1, clipPath: "inset(0)", scale: 1 },
    ],
  },
  reply: {
    duration: 1000,
    keyframes: [
      { opacity: 0, translate: "24px 0" },
      { opacity: 1, translate: "0 0" },
    ],
  },
};
