"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryItem } from "@/lib/content";
import Icon from "./Icon";

// Fullscreen photo viewer over a blurred, darkened page.
// Arrows, swipe, keyboard ← → , Esc and X. Focus stays inside and returns to the opener on close.
export default function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const many = items.length > 1;
  const step = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      root.style.overflow = "";
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (many && e.key === "ArrowRight") step(1);
      if (many && e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialog.current) {
        const els = [...dialog.current.querySelectorAll<HTMLElement>("button")];
        const i = els.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [many, onClose, step]);

  const item = items[index];
  const nav = "flex size-12 shrink-0 items-center justify-center border border-sand/40 text-sand transition-colors hover:bg-sand hover:text-black";

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? item.alt}
      className="fixed inset-0 z-[80] flex animate-[fade-in_400ms_ease-out] flex-col bg-black/75 text-sand backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
        <p className="text-label" aria-live="polite">
          {many && (
            <>
              <span className="text-gold">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
            </>
          )}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className="flex min-h-11 items-center gap-3 px-2" aria-label="Close photo viewer">
          <span className="text-label hidden sm:inline">Close</span>
          <Icon name="close" className="size-6" strokeWidth={1.25} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center gap-4 px-2 md:px-8" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {many && (
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${nav} hidden md:flex`}>
            <Icon name="arrowLeft" className="size-5" strokeWidth={1.25} />
          </button>
        )}
        <div className="relative h-full flex-1">
          <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="animate-[fade-in_500ms_ease-out] object-contain" />
        </div>
        {many && (
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${nav} hidden md:flex`}>
            <Icon name="arrowRight" className="size-5" strokeWidth={1.25} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 md:justify-center md:px-8 md:pb-8">
        {many && (
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${nav} md:hidden`}>
            <Icon name="arrowLeft" className="size-5" strokeWidth={1.25} />
          </button>
        )}
        <p className="text-h3 text-center font-normal italic">{item.caption ?? ""}</p>
        {many && (
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${nav} md:hidden`}>
            <Icon name="arrowRight" className="size-5" strokeWidth={1.25} />
          </button>
        )}
      </div>
    </div>
  );
}
