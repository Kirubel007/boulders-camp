"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageRef } from "@/lib/content";
import { Container } from "./ui/Section";

// Full-bleed photograph that stays fixed while the page scrolls over it (a window onto the desert),
// under a black overlay so light type pops. The photo only loads when the band nears the viewport.
export default function PhotoBand({
  id,
  image,
  labelledBy,
  tall = false,
  children,
}: {
  id?: string;
  image: ImageRef;
  labelledBy?: string;
  tall?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={`ground-night relative isolate flex items-center overflow-hidden [clip-path:inset(0)] ${
        tall ? "min-h-[min(100svh,960px)]" : "min-h-[min(80svh,760px)]"
      }`}
    >
      <div className="fixed inset-0 -z-10" aria-hidden={!image.alt}>
        {near && <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>
      <Container className="py-section relative text-center">{children}</Container>
    </section>
  );
}
