"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { home, site } from "@/lib/content";
import Icon from "./Icon";

const SLIDE_MS = 7000;

// Cinematic hero: slow cross-fading, slowly zooming photographs in place of a video.
export default function Hero() {
  const { hero } = home;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % hero.slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [playing, hero.slides.length]);

  return (
    <section className="relative flex h-svh min-h-[560px] flex-col overflow-hidden bg-night text-white" aria-label="Introduction">
      {hero.slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            preload={i === 0}
            className={`object-cover ${playing ? "animate-[kenburns_14s_ease-out_both]" : ""}`}
            key={i === index ? `active-${index}` : s.src}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow animate-[fadeup_1.6s_var(--ease-calm)_0.2s_both]">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-5xl animate-[fadeup_1.6s_var(--ease-calm)_0.4s_both] font-serif text-5xl font-light leading-[1.05] sm:text-7xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-xl animate-[fadeup_1.6s_var(--ease-calm)_0.7s_both] text-base text-white/90 md:text-lg">
          {hero.subtitle}
        </p>
        <p className="eyebrow mt-8 animate-[fadeup_1.6s_var(--ease-calm)_0.9s_both] text-white/90">{site.scarcity}</p>
      </div>

      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        className="absolute right-5 top-24 flex size-10 items-center justify-center rounded-full border border-white/60 transition-colors hover:bg-white/15 md:right-10 md:top-28"
      >
        <Icon name={playing ? "pause" : "play"} className="size-4" strokeWidth={1.75} />
      </button>

      {/* Quick navigation row (Mandarin Oriental style) */}
      <nav aria-label="Quick links" className="relative border-t border-white/20 pb-20 md:pb-0">
        <ul className="mx-auto grid max-w-4xl grid-cols-4 md:grid-cols-5">
          {hero.quickLinks.map((q) => (
            <li key={q.href} className={q.href === "#regeneration" ? "hidden md:block" : undefined}>
              <Link
                href={q.href}
                className="flex flex-col items-center gap-2 py-5 text-[0.6rem] uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-white md:text-[0.65rem]"
              >
                <Icon name={q.icon} className="size-6" />
                {q.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
