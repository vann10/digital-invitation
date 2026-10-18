import Image from "next/image";
import "@/components/section-editorial.css";
import Link from "next/link";
import { Opening } from "@/components/opening";
import { Artwork } from "@/components/artwork";
import { MusicProvider, MusicCredit } from "@/components/music";
import { Monogram } from "@/components/monogram";
import { Countdown } from "@/components/countdown";
import { RSVP } from "@/components/rsvp";
import { Reveal, SectionMotion } from "@/components/reveal";
import { invitation as content } from "@/data/invitation";
function Pending() {
  return <p className="pending-label">{content.placeholder}</p>;
}
function Sections() {
  const photos = content.gallery.filter((photo) => photo.src);
  return (
    <SectionMotion>
      <section id="hero" className="hero section" aria-labelledby="hero-title">
        <div className="hero-rule" aria-hidden="true" />
        <Artwork
          variant="ornament"
          className="hero-garden"
          priority
          sizes="(min-width: 1024px) 280px, 150px"
        />
        <div className="hero-illustration" aria-hidden="true">
          <Artwork variant="doves" priority />
        </div>
        <Artwork
          variant="leaves"
          className="hero-leaves"
          motion="settle"
          priority
        />
        <div className="hero-copy">
          <p className="eyebrow" data-reveal>
            THE WEDDING
          </p>
          <h1
            id="hero-title"
            tabIndex={-1}
            className="hero-names"
            aria-label="Rizal dan Dewi"
          >
            <span data-reveal data-motion="name">
              RIZAL
            </span>
            <i data-reveal data-motion="signature">
              &
            </i>
            <span data-reveal data-motion="name">
              DEWI
            </span>
          </h1>
          <span className="fine-rule" aria-hidden="true" />
          <Pending />
          <p className="hero-date" data-reveal>
            {content.date}
          </p>
          <p className="supporting" data-reveal>
            {content.location}
          </p>
        </div>
      </section>
      <section
        id="our-story"
        className="section story"
        aria-labelledby="story-title"
      >
        <Artwork
          variant="branch"
          className="story-garden"
          motion="settle"
          sizes="(min-width: 1024px) 330px, 140px"
        />
        <Reveal className="story-spread">
          <div className="section-heading" data-reveal>
            <h2 id="story-title">OUR STORY</h2>
            <span className="fine-rule" aria-hidden="true" />
          </div>
          <div className="letter-composition">
            <div
              className="envelope-back"
              aria-hidden="true"
              data-reveal
              data-motion="envelope"
            />
            <div className="letter" data-reveal data-motion="letter">
              <p className="letter-title">
                Rizal <em>&</em> Dewi
              </p>
              <Pending />
              <p className="letter-copy" data-reveal data-delay="300">
                {content.story}
              </p>
              <span className="fine-rule" aria-hidden="true" />
              <p className="signature" data-reveal data-delay="500">
                Rizal & Dewi
              </p>
              <Artwork variant="sprig" className="letter-sprig" sizes="90px" />
            </div>
            <div className="envelope-fold" aria-hidden="true" />
            <Artwork
              variant="butterfly"
              className="story-butterfly"
              sizes="160px"
            />
          </div>
        </Reveal>
      </section>
      <section
        id="the-wedding"
        className="section wedding"
        aria-labelledby="wedding-kicker wedding-title"
      >
        <Reveal className="wedding-spread">
          <Artwork
            variant="peony"
            className="wedding-art--side"
            sizes="(min-width: 1024px) 150px, 90px"
          />
          <div className="invitation-assembly">
            <div
              className="stationery-underlay"
              aria-hidden="true"
              data-reveal
              data-motion="stationery"
            />
            <div
              className="invitation-card"
              data-reveal
              data-motion="stationery"
            >
              <p className="eyebrow" id="wedding-kicker">
                THE WEDDING
              </p>
              <h2 id="wedding-title">RIZAL & DEWI</h2>
              <Pending />
              <p
                className="date-pending"
                data-reveal
                data-motion="date"
                data-delay="150"
              >
                — / —
              </p>
              <p className="wedding-date" data-reveal data-delay="250">
                {content.date}
              </p>
              <span className="fine-rule" aria-hidden="true" />
              <div data-reveal data-delay="500">
                <h3>{content.venue}</h3>
                <p>{content.time}</p>
                <p className="supporting">{content.location}</p>
              </div>
            </div>
          </div>
          <div
            className="countdown-composition"
            data-reveal
            data-motion="impression"
            data-delay="650"
          >
            <Artwork
              variant="branch"
              className="countdown-leaves"
              sizes="180px"
              motion="settle"
            />
            <Countdown date={content.dateISO} />
          </div>
        </Reveal>
      </section>
      <section
        id="venue"
        className="section venue"
        aria-labelledby="venue-title"
      >
        <Reveal className="venue-spread">
          <h2 id="venue-title" data-reveal>
            VENUE
          </h2>
          <span className="fine-rule" aria-hidden="true" />
          <figure className="venue-plate">
            <Artwork
              variant="sprig"
              className="venue-garden"
              sizes="(min-width: 1024px) 240px, 100px"
            />
            <Image
              src="/assets/optimized/gandrung-venue.webp"
              alt="Ilustrasi detail patung Gandrung dan paviliunnya"
              width={1024}
              height={1536}
              className="venue-illustration"
              data-reveal
              data-motion="engraving"
              sizes="(max-width: 767px) 88vw, 390px"
              quality={85}
            />
            <figcaption>ILUSTRASI REFERENSI · GANDRUNG</figcaption>
          </figure>
          <div className="venue-caption" data-reveal>
            <div>
              <Pending />
              <h3>{content.venue}</h3>
              <p className="supporting">{content.address}</p>
            </div>
            {content.mapUrl ? (
              <a
                className="text-action"
                href={content.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                VIEW LOCATION
              </a>
            ) : (
              <div>
                <button className="text-action" disabled>
                  VIEW LOCATION
                </button>
                <p className="supporting">Tautan peta belum tersedia.</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>
      <section
        id="gallery"
        className="section gallery"
        aria-labelledby="gallery-title"
      >
        <Reveal className="gallery-heading">
          <h2 id="gallery-title">GALLERY</h2>
          <span className="fine-rule" aria-hidden="true" />
          <Artwork
            variant="butterfly"
            className="gallery-butterfly"
            sizes="100px"
          />
        </Reveal>
        <div className="photo-sequence">
          {photos.length === 0 && (
            <Reveal className="gallery-pending">
              <Artwork
                variant="peony"
                className="gallery-flower"
                sizes="(min-width: 1024px) 150px, 90px"
              />
              <div>
                <p className="pending-label">PLACEHOLDER GALERI</p>
                <p className="gallery-pending-title">
                  {content.galleryPending.title}
                </p>
                <p className="supporting">
                  {content.galleryPending.description}
                </p>
              </div>
            </Reveal>
          )}
          {photos.map((photo, i) => (
            <Reveal key={i} className={`photo-item photo-item--${i + 1}`}>
              <figure>
                <div
                  className={`photo-surface ${photo.aspect}`}
                  data-reveal="photo"
                  data-motion="print"
                >
                  <Image
                    src={photo.src!}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 767px) 85vw, 600px"
                  />
                </div>
                <figcaption>
                  <span>0{i + 1}</span>
                  <span>{photo.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="rsvp" className="section rsvp" aria-labelledby="rsvp-title">
        <Artwork
          variant="branch"
          className="reply-garden"
          sizes="(min-width: 1024px) 280px, 130px"
          motion="settle"
        />
        <Reveal className="rsvp-spread">
          <div data-reveal>
            <h2 id="rsvp-title">RSVP</h2>
            <span className="fine-rule" aria-hidden="true" />
          </div>
          <div data-reveal data-motion="reply">
            <RSVP />
          </div>
        </Reveal>
      </section>
      <section
        id="closing"
        className="section closing"
        aria-label="Closing — penutup"
      >
        <Artwork
          variant="branch"
          className="closing-leaves"
          sizes="(min-width: 1024px) 220px, 110px"
        />
        <Artwork
          variant="peony"
          className="closing-garden"
          sizes="(min-width: 1024px) 190px, 100px"
          motion="settle"
        />
        <Reveal className="closing-content">
          <div data-reveal>
            <Pending />
            <p className="supporting">{content.closing}</p>
            <span className="fine-rule" aria-hidden="true" />
          </div>
          <div
            className="closing-signature"
            data-reveal
            data-motion="signature"
          >
            <Monogram />
          </div>
          <span
            className="signature-rule"
            aria-hidden="true"
            data-reveal
            data-motion="rule"
            data-delay="450"
          />
          <p className="closing-names" data-reveal>
            RIZAL & DEWI
          </p>
          <p className="eyebrow">{content.preview}</p>
          <MusicCredit />
        </Reveal>
      </section>
    </SectionMotion>
  );
}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ open?: string; transition?: string }>;
}) {
  const params = await searchParams;
  return (
    <MusicProvider initiallyAvailable={params.open === "1"}>
      <main>
        <div className="paper-texture" aria-hidden="true" />
        {params.open === "1" ? (
          <div className="invitation fallback-open">
            <section className="fallback-cover" aria-label="Opening">
              <Link className="text-action" href="/">
                RIZAL & DEWI
              </Link>
            </section>
            <Sections />
          </div>
        ) : (
          <Opening
            approach={params.transition === "lift" ? "lift" : "dissolve"}
          >
            <Sections />
          </Opening>
        )}
      </main>
    </MusicProvider>
  );
}
