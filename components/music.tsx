"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { invitation } from "@/data/invitation";

const MusicContext = createContext<() => void>(() => {});
export const useInvitationMusic = () => useContext(MusicContext);

export function MusicProvider({
  children,
  initiallyAvailable = false,
}: {
  children: React.ReactNode;
  initiallyAvailable?: boolean;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const pending = useRef(false);
  const request = useRef(0);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(initiallyAvailable);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  function stop() {
    request.current += 1;
    pending.current = false;
    setLoading(false);
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
    setPlaying(false);
  }
  function play() {
    setAvailable(true);
    setError(false);
    const player = audio.current;
    if (!player || pending.current || !player.paused) return;
    pending.current = true;
    setLoading(true);
    const current = ++request.current;
    player.volume = 0.3;
    // A failed network/decode resource needs a fresh load before retrying.
    if (player.error) player.load();
    // Call directly from the opening/button gesture for mobile autoplay policies.
    void player
      .play()
      .catch((reason: DOMException) => {
        if (current === request.current && reason.name !== "AbortError")
          setError(true);
      })
      .finally(() => {
        if (current === request.current) {
          pending.current = false;
          setLoading(false);
        }
      });
  }
  useEffect(() => {
    setHydrated(true);
    const player = audio.current;
    const hide = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", hide);
    return () => {
      document.removeEventListener("visibilitychange", hide);
      request.current += 1;
      player?.pause();
    };
  }, []);

  return (
    <MusicContext.Provider value={play}>
      {children}
      <audio
        ref={audio}
        src={invitation.music.src}
        preload="none"
        loop
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setError(true);
        }}
      />
      {available && hydrated && (
        <div className="music-control">
          <button
            type="button"
            className="music-button"
            aria-label={playing || loading ? "Hentikan musik" : "Putar musik"}
            title={playing || loading ? "Hentikan musik" : "Putar musik"}
            aria-pressed={playing}
            onClick={() => (playing || pending.current ? stop() : play())}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              {playing || loading ? (
                <rect x="6" y="6" width="12" height="12" fill="currentColor" />
              ) : (
                <path d="M8 4 20 12 8 20Z" fill="currentColor" />
              )}
            </svg>
          </button>
          {error && (
            <p className="music-error" role="status">
              Musik belum dapat diputar. Tekan play untuk mencoba lagi.
            </p>
          )}
        </div>
      )}
    </MusicContext.Provider>
  );
}

export function MusicCredit() {
  return (
    <p className="music-credit">
      Musik:{" "}
      <a href={invitation.music.source} target="_blank" rel="noreferrer">
        {invitation.music.title} · {invitation.music.artist}
      </a>
      {" · "}
      <a href={invitation.music.licenseUrl} target="_blank" rel="noreferrer">
        CC BY 4.0
      </a>
    </p>
  );
}
