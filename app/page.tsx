"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import botanicalTop from "@/public/assets/optimized/botanical_full_detail_hybrid.webp";
import botanicalSide from "@/public/assets/optimized/botanical_ornament.webp";
import botanicalBottom from "@/public/assets/optimized/floating_botanical_leaves_fidelity.webp";
import monogram from "@/public/assets/optimized/monogram_RD_exact_illustration.webp";
import heroOrnament from "@/public/assets/optimized/circular_monogram_ornament.webp";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [monogramMissing, setMonogramMissing] = useState(false);
  const heroHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (opened) heroHeading.current?.focus({ preventScroll: true });
  }, [opened]);
  const hideMissing = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <main className={`invitation ${opened ? "is-opened" : ""}`}>
      <section className="cover" aria-label="Sampul undangan" aria-hidden={opened} inert={opened}>
        <div className="cover__frame" aria-hidden="true"><span>✦</span><span>✦</span></div>
        <div className="botanical botanical--top" aria-hidden="true">
          <Image src={botanicalTop} alt="" sizes="(max-width: 540px) 43vw, (max-width: 899px) 37vw, 440px" priority quality={90} onError={hideMissing} />
        </div>
        <div className="botanical botanical--side" aria-hidden="true">
          <Image src={botanicalSide} alt="" sizes="(max-width: 540px) 18vw, 155px" quality={90} onError={hideMissing} />
        </div>
        <div className="botanical botanical--bottom" aria-hidden="true">
          <Image src={botanicalBottom} alt="" sizes="(max-width: 540px) 46vw, (max-width: 899px) 40vw, 470px" quality={90} onError={hideMissing} />
        </div>

        <div className="cover__content">
          <p className="eyebrow">THE WEDDING INVITATION</p>
          <div className="monogram" aria-label="Monogram Rizal dan Dewi">
            {!monogramMissing && <Image src={monogram} alt="" sizes="(max-width: 540px) 158px, 230px" priority quality={90} onError={() => setMonogramMissing(true)} />}
            {monogramMissing && <span className="monogram__fallback" aria-hidden="true">R<span>&</span>D</span>}
          </div>
          <h1 className="couple-names">Rizal <i>&</i> Dewi</h1>
          <div className="ornament-rule" aria-hidden="true"><span /><b>✧</b><span /></div>
          <p className="cover__note">Dengan penuh kebahagiaan, kami mengundang Anda</p>
          <button className="open-button" type="button" onClick={() => setOpened(true)} aria-label="Buka undangan Rizal dan Dewi">
            <span>BUKA UNDANGAN</span><span className="open-button__arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <p className="cover__footnote">A CELEBRATION OF LOVE</p>
      </section>

      <section className="hero" aria-label="Undangan pernikahan Rizal dan Dewi" aria-hidden={!opened} inert={!opened}>
        <div className="hero__ornament" aria-hidden="true">
          {opened && <Image src={heroOrnament} alt="" sizes="(max-width: 540px) 42vw, 220px" quality={90} onError={hideMissing} />}
        </div>
        <p className="eyebrow">THE WEDDING OF</p>
        <h2 ref={heroHeading} tabIndex={-1} className="hero__names">Rizal <i>&</i> Dewi</h2>
        <div className="ornament-rule" aria-hidden="true"><span /><b>✧</b><span /></div>
        <p className="hero__placeholder">Hari istimewa kami akan segera dibagikan.</p>
        <p className="hero__meta">TANGGAL DAN LOKASI MENYUSUL</p>
      </section>
    </main>
  );
}
