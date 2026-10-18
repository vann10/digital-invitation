"use client";
import { useEffect, useState } from "react";
export function Countdown({ date }: { date: string | null }) {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    if (!date || !Number.isFinite(Date.parse(date))) return;
    const update = () =>
      setRemaining(Math.max(0, Date.parse(date) - Date.now()));
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [date]);
  return (
    <aside className="countdown" aria-label="Hitung mundur pernikahan">
      <p className="eyebrow">UNTIL THE WEDDING</p>
      <div className="countdown-values" aria-hidden={!date}>
        {[
          ["HARI", remaining === null ? "—" : Math.floor(remaining / 86400000)],
          [
            "JAM",
            remaining === null ? "—" : Math.floor(remaining / 3600000) % 24,
          ],
          [
            "MENIT",
            remaining === null ? "—" : Math.floor(remaining / 60000) % 60,
          ],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{value}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>
      {!date && (
        <p className="supporting">Menunggu tanggal yang dikonfirmasi.</p>
      )}
    </aside>
  );
}
