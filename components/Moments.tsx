"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { home } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

const ratios = { "4/5": "aspect-[4/5]", "3/2": "aspect-[3/2]" } as const;

// A masonry of small, memorable moments. Tap one to open a full-screen black lightbox.
export default function Moments() {
  const { moments } = home;
  const items = moments.items;
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialog.current) {
        // Keep focus cycling through the lightbox controls.
        const items = [...dialog.current.querySelectorAll<HTMLElement>("button")];
        const i = items.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : items[open];

  return (
    <Section id="moments" ground="sand" labelledBy="moments-title">
      <Container>
        <SectionHeading id="moments-title" eyebrow={moments.eyebrow} title={moments.title} intro={moments.intro} />
        <ul className="mt-12 columns-2 gap-3 md:mt-16 md:columns-3 md:gap-4 lg:columns-4">
          {items.map((m, i) => (
            <li key={m.src} className="mb-3 break-inside-avoid md:mb-4">
              <Reveal>
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(i);
                  }}
                  className="group block w-full text-left"
                  aria-label={`Open photo: ${m.caption}`}
                >
                  <span className={`relative block overflow-hidden bg-sand-2 ${ratios[m.ratio as keyof typeof ratios]}`}>
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-calm)] group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="text-label text-soft mt-2 block">{m.caption}</span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {current && open !== null && (
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="ground-night fixed inset-0 z-[70] flex animate-[fade-in_300ms_ease-out] flex-col"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <p className="text-label" aria-live="polite">
              <span className="text-gold">{String(open + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
            </p>
            <button ref={closeBtn} type="button" onClick={close} className="flex min-h-11 items-center gap-3 px-2">
              <span className="text-label">Close</span>
              <Icon name="close" className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="relative flex-1">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="animate-[fade-in_400ms_ease-out] object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="flex size-11 items-center justify-center border border-sand/50 hover:bg-sand hover:text-black">
              <Icon name="arrowLeft" className="size-4" strokeWidth={1.5} />
            </button>
            <p className="text-h3 text-center">{current.caption}</p>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="flex size-11 items-center justify-center border border-sand/50 hover:bg-sand hover:text-black">
              <Icon name="arrowRight" className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
