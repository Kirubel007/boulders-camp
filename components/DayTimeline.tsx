import Image from "next/image";
import Link from "next/link";
import { day, home } from "@/lib/content";
import Reveal from "./Reveal";
import Starfield from "./Starfield";

// The page itself darkens through this section: sand at sunrise, dusk, then night.
export default function DayTimeline() {
  return (
    <section
      id="day"
      className="bg-[linear-gradient(to_bottom,var(--color-sand)_0%,#efe2d1_45%,#dcbd9e_100%)] pt-28 md:pt-40"
    >
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p className="eyebrow text-ochre">{home.day.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">{home.day.title}</h2>
      </Reveal>

      <ol className="mx-auto mt-16 flex max-w-7xl snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:grid md:grid-cols-5 md:overflow-visible md:px-10">
        {day.map((m, i) => (
          <li key={m.time} className="w-[72vw] shrink-0 snap-start sm:w-[45vw] md:w-auto">
            <Reveal delay={i * 120}>
              <div className="relative aspect-[3/4] overflow-hidden bg-night">
                {m.image ? (
                  <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 768px) 20vw, 72vw" className="object-cover transition-transform duration-[1500ms] hover:scale-105" />
                ) : (
                  <Starfield count={70} seed={3} />
                )}
                <span className="absolute left-3 top-3 bg-sand/90 px-2 py-1 font-serif text-sm text-granite">{m.time}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{m.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-14 text-center">
        <Link href={home.day.cta.href} className="btn-ghost text-granite hover:bg-granite hover:text-sand">
          {home.day.cta.label}
        </Link>
      </div>

      {/* Dusk falls: the day fades into the night-sky section below */}
      <div className="mt-24 h-48 bg-[linear-gradient(to_bottom,#dcbd9e,#8a6f6a_45%,var(--color-night))]" aria-hidden="true" />
    </section>
  );
}
