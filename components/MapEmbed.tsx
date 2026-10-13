"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

// Click-to-load Google map: nothing loads from Google (and no cookies are set) until the visitor asks.
export default function MapEmbed({
  lat,
  lng,
  zoom,
  title,
  loadLabel,
  placeholder,
}: {
  lat: number;
  lng: number;
  zoom: number;
  title: string;
  loadLabel: string;
  placeholder: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden border border-line bg-sand">
      {loaded ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.5)_sepia(.2)]"
        />
      ) : (
        <>
          {/* Decorative contour lines and pin (terracotta is decorative only; no text sits on it) */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="var(--color-terracotta)" strokeWidth="0.3" opacity="0.55">
              <ellipse cx="80" cy="46" rx="14" ry="8" />
              <ellipse cx="80" cy="46" rx="26" ry="15" />
              <ellipse cx="80" cy="46" rx="40" ry="23" />
              <ellipse cx="80" cy="46" rx="56" ry="32" />
              <ellipse cx="80" cy="46" rx="74" ry="42" />
            </g>
            <path d="M80 30c-4.4 0-8 3.4-8 7.7C72 43.5 80 52 80 52s8-8.5 8-14.3c0-4.3-3.6-7.7-8-7.7Z" fill="var(--color-gold)" />
            <circle cx="80" cy="37.7" r="2.6" fill="var(--color-sand)" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-4 text-center sm:p-6">
            <Button variant="solid" onClick={() => setLoaded(true)}>
              {loadLabel}
            </Button>
            <p className="text-fine text-soft bg-sand px-2">{placeholder}</p>
          </div>
        </>
      )}
    </div>
  );
}
