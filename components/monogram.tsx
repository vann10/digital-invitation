"use client";
import Image from "next/image";
import { useState } from "react";
import { invitation } from "@/data/invitation";
export function Monogram({ priority = false }: { priority?: boolean }) {
  const [missing, setMissing] = useState(false);
  return (
    <div
      className="monogram"
      role="img"
      aria-label="Monogram Rizal dan Dewi — persetujuan final menunggu"
    >
      {missing ? (
        <span className="pending-label">Artwork monogram belum tersedia</span>
      ) : (
        <Image
          src={invitation.monogram}
          alt=""
          width={2048}
          height={1365}
          sizes="(min-width: 1024px) 360px, 280px"
          priority={priority}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}
