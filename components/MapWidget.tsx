"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import Icon from "./Icon";
import { ButtonLink } from "./ui/Button";

export const OPEN_MAP_EVENT = "map:open";

// Opens the map card from anywhere (menu, footer links).
export function openMap() {
  window.dispatchEvent(new Event(OPEN_MAP_EVENT));
}

export function MapLink({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openMap} className={className}>
      {label}
    </button>
  );
}

// Floating round map button (bottom-right) that opens a small card with an embedded Google map,
// directions and how to get here. Near full-width sheet on mobile. Closes with X, Esc or a click outside.
export default function MapWidget() {
  const { map } = site;
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const coords = `${map.lat},${map.lng}`;

  const show = useCallback(() => {
    opener.current = (document.activeElement as HTMLElement) ?? trigger.current;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    (opener.current ?? trigger.current)?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_MAP_EVENT, show);
    return () => window.removeEventListener(OPEN_MAP_EVENT, show);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const els = [...panel.current.querySelectorAll<HTMLElement>("a, button, iframe")];
        const i = els.indexOf(document.activeElement as HTMLElement);
        if ((e.shiftKey && i <= 0) || (!e.shiftKey && i === els.length - 1)) {
          e.preventDefault();
          els[e.shiftKey ? els.length - 1 : 0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => (open ? close() : show())}
        aria-expanded={open}
        aria-controls="map-card"
        aria-label={map.buttonLabel}
        className="fixed bottom-[calc(var(--bar-h)+16px)] right-4 z-40 flex size-12 items-center md:size-14 justify-center rounded-full bg-black text-sand ring-1 ring-sand/25 shadow-[0_8px_30px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-[var(--ease-calm)] hover:scale-105 md:bottom-8 md:right-8"
      >
        <Icon name={open ? "close" : "pin"} className="size-6" strokeWidth={1.5} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[55] animate-[fade-in_300ms_ease-out] bg-black/40 md:bg-transparent" onClick={close} aria-hidden="true" />
          <div
            ref={panel}
            id="map-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-card-title"
            className="ground-sand fixed inset-x-3 bottom-[calc(var(--bar-h)+12px)] z-[56] max-h-[calc(100svh-var(--bar-h)-var(--header-h)-24px)] animate-[rise_500ms_var(--ease-calm)_both] overflow-y-auto border border-line shadow-[0_20px_60px_rgb(0_0_0/0.35)] md:inset-x-auto md:bottom-28 md:right-8 md:w-[400px]"
          >
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-label text-eyebrow">{map.heading}</p>
                <h2 id="map-card-title" className="text-h3 mt-1">
                  {map.place}
                </h2>
                <p className="text-fine text-soft">{map.region}</p>
              </div>
              <button type="button" onClick={close} aria-label="Close map" className="-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center">
                <Icon name="close" className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <iframe
              title={map.title}
              src={`https://www.google.com/maps?q=${coords}&z=${map.zoom}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block aspect-[4/3] w-full border-0 [filter:grayscale(.4)_sepia(.15)]"
            />
            <div className="space-y-4 p-5">
              <p className="text-fine text-soft flex gap-3">
                <Icon name="plane" className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                {map.note}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <ButtonLink href={`https://www.google.com/maps/dir/?api=1&destination=${coords}`} variant="solid" className="flex-1">
                  {map.directionsLabel}
                </ButtonLink>
                <ButtonLink href={`https://www.google.com/maps/search/?api=1&query=${coords}`} variant="outline" className="flex-1">
                  {map.openLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
