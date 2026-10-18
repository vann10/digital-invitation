"use client";
import { useEffect, useRef } from "react";
import { editorialMotion } from "@/lib/motion";

// Observe each layer separately so lower content enters when it is actually seen.
// Content stays visible without JavaScript or when animation is interrupted.
export function SectionMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [
      ...root.querySelectorAll<HTMLElement>(
        "[data-reveal], .artwork-motion, .reveal-block:not(:has([data-reveal]))",
      ),
    ].filter(
      (layer) =>
        !(root.closest(".opening-prototype") && layer.closest("#hero")),
    );
    const played = new WeakSet<Element>();
    const pending = new WeakSet<Element>();
    const animations = new Set<Animation>();
    let disposed = false;
    // Hero enters during the cover crossfade; don't hide/reveal its names a
    // second time after the 1.4s handoff. Other sections wait until accessible.
    const isBlocked = (layer: HTMLElement) =>
      !!root.closest("[inert]") &&
      !(layer.closest("#hero") && root.closest(".phase-opening"));
    const stop = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    const reveal = async (layer: HTMLElement, delay: number) => {
      if (pending.has(layer) || played.has(layer)) return;
      pending.add(layer);
      // Wait for lazy illustrations to decode so their entrance is actually seen.
      await Promise.all(
        [...layer.querySelectorAll("img")].map((image) =>
          image.decode().catch(() => {}),
        ),
      );
      pending.delete(layer);
      if (disposed || isBlocked(layer)) return;
      const bounds = layer.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
      played.add(layer);
      observer.unobserve(layer);
      if (preference.matches) return;
      const kind =
        layer.dataset.motion ||
        (layer.dataset.reveal === "photo" ? "photo" : "impression");
      const motion = editorialMotion[kind] || editorialMotion.impression;
      const animation = layer.animate(motion.keyframes, {
        duration: motion.duration,
        delay: layer.dataset.delay
          ? Math.min(1200, Math.max(0, Number(layer.dataset.delay) || 0))
          : delay,
        easing: "cubic-bezier(.2,.65,.25,1)",
        fill: "backwards",
      });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        let sequence = 0;
        for (const entry of entries) {
          const layer = entry.target as HTMLElement;
          if (isBlocked(layer)) continue;
          layer.toggleAttribute("data-in-view", entry.isIntersecting);
          if (!entry.isIntersecting || played.has(layer)) continue;
          void reveal(layer, Math.min(sequence++ * 100, 300));
        }
      },
      { threshold: 0.12 },
    );
    const observe = () => {
      observer.disconnect();
      targets.forEach((target) => observer.observe(target));
    };
    // Defer Hero entrances until the cover has completed its handoff.
    const invitation = root.closest(".invitation");
    const stateObserver = new MutationObserver(observe);
    if (invitation)
      stateObserver.observe(invitation, {
        attributes: true,
        attributeFilter: ["class"],
      });
    observe();
    preference.addEventListener("change", stop);
    return () => {
      disposed = true;
      observer.disconnect();
      stateObserver.disconnect();
      preference.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return (
    <div ref={ref} className="section-motion">
      {children}
    </div>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal-block ${className}`}>{children}</div>;
}
