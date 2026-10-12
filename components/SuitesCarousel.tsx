"use client";

import Image from "next/image";
import { useState } from "react";
import { home, suites } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Tells the planner which suite was chosen, then scrolls to it.
export function selectSuite(id: string) {
  window.dispatchEvent(new CustomEvent("planner:suite", { detail: id }));
  document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
}

// Four Seasons-style carousel: outlined inactive cards, one solid active card.
export default function SuitesCarousel() {
  const { suites: intro } = home;
  const [active, setActive] = useState(0);
  const total = suites.length;
  const go = (d: number) => setActive((a) => (a + d + total) % total);

  return (
    <section id="suites" className="relative overflow-hidden bg-night py-24 text-white md:py-32" aria-roledescription="carousel" aria-label="Suites">
      <Image src={intro.background.src} alt="" fill sizes="100vw" className="object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/30 to-night/80" />

      <Reveal className="relative mx-auto max-w-2xl px-5 text-center">
        <p className="eyebrow text-dusk">{intro.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">{intro.title}</h2>
        <p className="mt-5 text-white/80">{intro.body}</p>
      </Reveal>

      <div
        className="relative mx-auto mt-14 flex max-w-7xl items-center gap-4 px-5 md:px-10"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {suites.map((s, i) => {
          const isActive = i === active;
          return (
            <article
              key={s.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${s.name}`}
              // Re-order visually so the active card always sits in the centre.
              style={{ order: (i - active + total + Math.floor(total / 2)) % total }}
              className={`transition-all duration-700 ease-[var(--ease-calm)] ${
                isActive
                  ? "flex-[1_0_100%] bg-sand text-granite shadow-2xl md:flex-[2.2_0_0%]"
                  : "hidden h-[440px] flex-[1_0_0%] border border-white/50 md:block"
              }`}
            >
              {isActive ? (
                <div className="flex h-full flex-col">
                  <h3 className="eyebrow px-6 pb-5 pt-7 text-center text-[0.75rem] text-granite">{s.name}</h3>
                  <div className="relative aspect-[16/10]">
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-6 text-center">
                    <p className="font-serif text-2xl md:text-3xl">{s.tagline}</p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">{s.description}</p>
                    <p className="eyebrow mt-4 text-[0.6rem] text-ochre">{s.pool}</p>
                    <button type="button" onClick={() => selectSuite(s.id)} className="btn mt-6 bg-granite text-sand hover:bg-night">
                      Enquire about {s.name}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="eyebrow flex h-full w-full items-start justify-center pt-8 text-[0.75rem] text-white transition-colors hover:bg-white/10"
                >
                  {s.name}
                </button>
              )}
            </article>
          );
        })}
      </div>

      <div className="relative mt-10 flex items-center justify-center gap-8">
        <button type="button" onClick={() => go(-1)} aria-label="Previous suite" className="p-2 transition-opacity hover:opacity-70">
          <Icon name="arrowLeft" className="size-6" />
        </button>
        <p className="eyebrow min-w-12 text-center text-[0.8rem]" aria-live="polite">
          {active + 1} / {total}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next suite" className="p-2 transition-opacity hover:opacity-70">
          <Icon name="arrowRight" className="size-6" />
        </button>
      </div>
    </section>
  );
}
