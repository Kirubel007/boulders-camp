"use client";

import Image from "next/image";
import { useState } from "react";
import { home } from "@/lib/content";
import Icon from "./Icon";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// "Fall for the quiet": a slowly drifting strip of photographs, each gently breathing (Ken Burns).
// Pauses on hover/focus or with the button; reduced-motion users get a still, swipeable row.
// Clicking a photo opens the lightbox at that photo.
const delays = ["[animation-delay:0s]", "[animation-delay:-5s]", "[animation-delay:-9s]", "[animation-delay:-14s]"];

export default function Moments() {
  const { moments } = home;
  const items = moments.items;
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const stop = paused || open !== null;

  const card = (m: (typeof items)[number], i: number, copy: boolean) => (
    <li key={`${copy ? "b" : "a"}-${m.src}`} className={`shrink-0 ${copy ? "motion-reduce:hidden" : "motion-reduce:snap-start"}`} aria-hidden={copy || undefined}>
      <button
        type="button"
        tabIndex={copy ? -1 : undefined}
        onClick={() => setOpen(i)}
        aria-label={`Open photo: ${m.caption}`}
        className="group block text-left"
      >
        <span className={`relative block h-[52svh] max-h-[560px] min-h-[300px] overflow-hidden bg-sand-2 ${m.ratio === "4/5" ? "aspect-[4/5]" : "aspect-[3/2]"}`}>
          <Image
            src={m.src}
            alt={copy ? "" : m.alt}
            fill
            sizes="(min-width: 768px) 40vw, 80vw"
            loading="lazy"
            className={`object-cover transition-[filter] duration-700 group-hover:brightness-110 motion-safe:animate-[breathe_18s_ease-in-out_infinite_alternate] ${delays[i % delays.length]}`}
          />
        </span>
        <span className="text-label text-soft mt-3 block">{m.caption}</span>
      </button>
    </li>
  );

  return (
    <Section id="moments" ground="sand" labelledBy="moments-title" className="overflow-hidden">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="moments-title" eyebrow={moments.eyebrow} title={moments.title} intro={moments.intro} />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? moments.playLabel : moments.pauseLabel}
          className="flex size-11 shrink-0 items-center justify-center self-start border border-current transition-colors hover:bg-ink hover:text-sand motion-reduce:hidden md:self-end"
        >
          <Icon name={paused ? "play" : "pause"} className="size-4" strokeWidth={1.75} />
        </button>
      </Container>

      <Reveal className="mt-12 md:mt-16">
        <div className="motion-reduce:snap-x motion-reduce:overflow-x-auto motion-reduce:px-6">
          <ul
            className={`flex w-max gap-4 pr-4 md:pr-6 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-safe:animate-[drift_110s_linear_infinite] md:gap-6 ${
              stop ? "[animation-play-state:paused]" : ""
            }`}
          >
            {items.map((m, i) => card(m, i, false))}
            {/* Second copy makes the loop seamless; hidden from assistive tech and from reduced-motion users */}
            {items.map((m, i) => card(m, i, true))}
          </ul>
        </div>
      </Reveal>

      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </Section>
  );
}
