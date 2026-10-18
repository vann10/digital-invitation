"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Travel through the margins; never fly across text or controls.
const stops = [
  { id: "hero", side: 1, y: 0.76 },
  { id: "our-story", side: -1, y: 0.27 },
  { id: "the-wedding", side: 1, y: 0.3 },
  { id: "venue", side: -1, y: 0.7 },
  { id: "gallery", side: 1, y: 0.23 },
  { id: "rsvp", side: -1, y: 0.73 },
  { id: "closing", side: 1, y: 0.4 },
];
export function ScrollBird() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bird = ref.current;
    if (!bird) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let positions: number[] = [];
    let readingAreas: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    }[] = [];
    const render = () => {
      frame = 0;
      const open = bird.closest(".phase-opened, .fallback-open");
      bird.style.visibility = open ? "visible" : "hidden";
      if (!open) return;
      const cursor =
        scrollY + innerHeight >= document.documentElement.scrollHeight - 2
          ? document.documentElement.scrollHeight
          : scrollY + innerHeight * 0.2;
      let index = 0;
      while (index < positions.length - 1 && cursor >= positions[index + 1])
        index++;
      const stop = stops[index];
      const progress = Math.max(
        0,
        Math.min(
          1,
          (cursor - positions[index]) /
            Math.max(
              1,
              (positions[index + 1] ?? document.documentElement.scrollHeight) -
                positions[index],
            ),
        ),
      );
      const size = innerWidth >= 1024 ? 138 : 76;
      const departure = preference.matches
        ? 0
        : Math.max(0, (progress - 0.65) / 0.35);
      const curve = departure * departure * (3 - 2 * departure);
      const x =
        stop.side > 0
          ? innerWidth - size - 10 + curve * (size + 10)
          : 10 - curve * (size + 10);
      const y = preference.matches
        ? innerHeight * 0.72
        : innerHeight * stop.y - Math.sin((curve * Math.PI) / 2) * 65;
      bird.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${preference.matches ? 0 : stop.side * curve * 6}deg)`;
      const overlaps = readingAreas.some(
        (area) =>
          x < area.right + 8 &&
          x + size > area.left - 8 &&
          y + scrollY < area.bottom + 8 &&
          y + scrollY + (size * 2) / 3 > area.top - 8,
      );
      const arrival =
        preference.matches || index === 0 ? 1 : Math.min(1, progress / 0.12);
      bird.style.opacity = String(overlaps ? 0 : (1 - curve) * arrival);
      bird.dataset.section = stop.id;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      positions = stops.map(
        ({ id }) =>
          (document.getElementById(id)?.getBoundingClientRect().top ?? 0) +
          scrollY,
      );
      readingAreas = [
        ...document.querySelectorAll(
          ".section h1, .section h2, .section h3, .section p, .section button, .section a, .section label, .photo-surface, .venue-illustration",
        ),
      ].map((el) => {
        const box = el.getBoundingClientRect();
        return {
          left: box.left,
          right: box.right,
          top: box.top + scrollY,
          bottom: box.bottom + scrollY,
        };
      });
      schedule();
    };
    const observer = new ResizeObserver(resize);
    const suite = bird.closest(".section-motion");
    if (suite) observer.observe(suite);
    const phaseObserver = new MutationObserver(resize);
    const invitation = bird.closest(".invitation");
    if (invitation)
      phaseObserver.observe(invitation, {
        attributes: true,
        attributeFilter: ["class"],
      });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    preference.addEventListener("change", schedule);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      phaseObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      preference.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <div ref={ref} className="scroll-bird" aria-hidden="true">
      <Image
        src="/assets/optimized/romantic-doves.webp"
        alt=""
        width={1200}
        height={800}
        sizes="(min-width: 1024px) 138px, 76px"
      />
    </div>
  );
}
