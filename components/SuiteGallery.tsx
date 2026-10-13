"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/lib/content";
import Lightbox from "./Lightbox";

// One large photo and two smaller ones; any of them opens the lightbox at that photo.
export default function SuiteGallery({ name, items }: { name: string; items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const withCaptions = items.map((g) => ({ ...g, caption: g.caption ?? name }));

  const tile = (g: GalleryItem, i: number, cls: string, sizes: string) => (
    <button key={g.src + i} type="button" onClick={() => setOpen(i)} aria-label={`View ${name} photo ${i + 1} of ${items.length}`} className={`group relative block overflow-hidden bg-sand-2 ${cls}`}>
      <Image src={g.src} alt={g.alt} fill sizes={sizes} loading="lazy" className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-calm)] group-hover:scale-[1.05]" />
    </button>
  );

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {tile(items[0], 0, "col-span-2 aspect-[3/2]", "(min-width: 768px) 58vw, 100vw")}
      {items.slice(1, 3).map((g, i) => tile(g, i + 1, "aspect-[3/2]", "(min-width: 768px) 29vw, 50vw"))}
      {open !== null && <Lightbox items={withCaptions} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
