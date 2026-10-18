"use client";
import { useEffect, useRef, useState } from "react";
import { Artwork } from "./artwork";
import { Monogram } from "./monogram";
import { invitation } from "@/data/invitation";
import { useInvitationMusic } from "./music";
import "./opening-motion.css";
export function Opening({
  children,
  approach = "dissolve",
}: {
  children: React.ReactNode;
  approach?: "dissolve" | "lift";
}) {
  const [phase, setPhase] = useState<"closed" | "opening" | "opened">("closed");
  const [enhanced, setEnhanced] = useState(false);
  const playMusic = useInvitationMusic();
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setEnhanced(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (phase !== "opened") return;
    document.getElementById("hero-title")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [phase]);
  function open() {
    if (busy.current) return;
    busy.current = true;
    playMusic();
    setPhase("opening");
    window.scrollTo({ top: 0, behavior: "instant" });
    timer.current = setTimeout(
      () => setPhase("opened"),
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 1400,
    );
  }
  return (
    <div
      className={`invitation opening-prototype approach-${approach} phase-${phase} ${enhanced ? "enhanced" : ""}`}
    >
      <section
        id="opening"
        className="cover"
        aria-label="Opening — sampul undangan"
        aria-hidden={phase === "opened"}
        inert={phase === "opened"}
      >
        <div className="cover-frame" aria-hidden="true" />
        <Artwork priority className="cover-art cover-art--top" />
        <Artwork
          variant="leaves"
          priority
          className="cover-art cover-art--bottom"
        />
        <Artwork
          variant="butterfly"
          priority
          className="cover-art cover-art--side"
          sizes="(min-width: 1024px) 240px, 160px"
        />
        <div className="cover-content">
          <p className="eyebrow">THE WEDDING OF</p>
          <Monogram priority />
          <h1 className="cover-names">
            RIZAL <i>&</i> DEWI
          </h1>
          <span className="fine-rule" aria-hidden="true" />
          <form
            action="/"
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              open();
            }}
          >
            <input type="hidden" name="open" value="1" />
            <button
              className="open-button"
              type="submit"
              aria-disabled={phase !== "closed"}
            >
              BUKA UNDANGAN{" "}
              <svg
                width="24"
                height="12"
                viewBox="0 0 24 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M0 6H23M18 1 23 6 18 11" stroke="currentColor" />
              </svg>
            </button>
          </form>
          <p className="preview-note">{invitation.preview}</p>
        </div>
      </section>
      <div
        className="opened-content"
        inert={enhanced && phase !== "opened"}
        aria-hidden={enhanced && phase !== "opened"}
      >
        {children}
      </div>
    </div>
  );
}
