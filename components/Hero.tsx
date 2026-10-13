"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import Icon from "./Icon";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Section";

type Slide = { src: string; alt: string };

const SLIDE_MS = 6500;
const noop = () => () => {};

// Full-screen, slowly zooming, cross-fading photographs behind a black gradient.
// Less talk, more showing: a headline, one line and one call to action.
// Only the first photo loads up front (fast LCP); the rest load once the page is interactive.
export default function Hero({
  slides,
  title,
  line,
  cta,
  scrollTo,
  scrollLabel,
  pauseLabel = "Pause slideshow",
  playLabel = "Play slideshow",
}: {
  slides: Slide[];
  title: string;
  line?: string;
  cta?: { label: string; href: string };
  scrollTo?: string;
  scrollLabel?: string;
  pauseLabel?: string;
  playLabel?: string;
}) {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    noop,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const many = slides.length > 1;
  const playing = many && !paused && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [playing, slides.length]);

  return (
    <section
      aria-roledescription={many ? "carousel" : undefined}
      aria-label="Boulders Camp in pictures"
      className="relative flex h-[calc(100svh-var(--bar-h))] min-h-[520px] flex-col justify-end overflow-hidden bg-black text-sand"
    >
      {slides.map((s, i) =>
        i === 0 || hydrated ? (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              key={i === index ? `on-${index}` : "off"}
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              preload={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              className={`object-cover ${i === index && !reducedMotion ? "animate-[kenburns_9s_ease-out_both]" : ""}`}
            />
          </div>
        ) : null,
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25" aria-hidden="true" />

      <Container className="relative pb-6 text-center md:pb-16">
        <span className="mx-auto mb-6 block h-12 w-px animate-[rise_900ms_var(--ease-calm)_both] bg-gold md:mb-8 md:h-16" aria-hidden="true" />
        <h1 className="text-h1 text-glow mx-auto mt-4 max-w-[14ch] animate-[rise_1100ms_var(--ease-calm)_200ms_both] text-balance font-medium md:mt-6">
          {title}
        </h1>
        {line && (
          <p className="text-lead text-glow measure mx-auto mt-5 animate-[rise_1100ms_var(--ease-calm)_350ms_both] text-balance font-normal md:mt-6">
            {line}
          </p>
        )}
        {cta && (
          <div className="mt-8 animate-[rise_1100ms_var(--ease-calm)_500ms_both] md:mt-10">
            <ButtonLink href={cta.href} variant="gold" className="w-full max-w-xs sm:w-auto">
              {cta.label}
            </ButtonLink>
          </div>
        )}
        {scrollTo && (
          <a href={scrollTo} aria-label={scrollLabel} className="text-glow mx-auto mt-6 hidden size-11 items-center justify-center md:flex">
            <Icon name="chevronDown" className="size-6" strokeWidth={1.25} />
          </a>
        )}

        {many && (
          <div className="mt-6 flex items-center justify-start gap-4 md:absolute md:bottom-8 md:left-12 md:mt-0">
            <div className="flex gap-2" aria-hidden="true">
              {slides.map((s, i) => (
                <span key={s.src} className="relative h-px w-6 overflow-hidden bg-sand/30 md:w-8">
                  {i === index && (
                    <span key={index} className={`absolute inset-y-0 left-0 bg-sand ${playing ? "animate-[progress_6500ms_linear_both]" : "w-full"}`} />
                  )}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={playing ? pauseLabel : playLabel}
              className="flex size-11 items-center justify-center rounded-full border border-sand/50 transition-colors hover:bg-sand hover:text-black"
            >
              <Icon name={playing ? "pause" : "play"} className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
