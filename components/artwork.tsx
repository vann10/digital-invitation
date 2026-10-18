import Image from "next/image";
import { artworkLibrary as artwork } from "@/data/artwork";

// Reuse the supplied artwork intact. Motion belongs to the wrapper, not a redraw.
export function Artwork({
  variant = "bouquet",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 680px, (min-width: 768px) 520px, 390px",
  motion,
}: {
  variant?: keyof typeof artwork;
  className?: string;
  priority?: boolean;
  sizes?: string;
  motion?: string;
}) {
  const asset = artwork[variant];
  return (
    <div className={`artwork ${className}`} aria-hidden="true">
      <div
        className="artwork-motion"
        data-motion={
          motion ||
          (variant === "doves"
            ? "perch"
            : variant === "butterfly"
              ? "flutter"
              : "botanical")
        }
      >
        <Image
          src={`/assets/optimized/${asset.file}.webp`}
          alt=""
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          quality={85}
          priority={priority}
        />
      </div>
    </div>
  );
}
