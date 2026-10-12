import Link from "next/link";
import { home } from "@/lib/content";
import Reveal from "./Reveal";
import Starfield from "./Starfield";

export default function StarsSection() {
  const { stars } = home;
  return (
    <section id="stars" className="relative -mt-px overflow-hidden bg-night pb-0 pt-24 text-sand md:pt-36">
      <Starfield />
      <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
        <p className="eyebrow text-dusk">{stars.eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-7xl">{stars.title}</h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-sand/75">{stars.body}</p>
        <Link href={stars.cta.href} className="btn-primary mt-10">
          {stars.cta.label}
        </Link>
      </Reveal>

      {/* Granite outcrop silhouette */}
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="relative mt-20 block h-32 w-full md:h-52" aria-hidden="true">
        <path
          fill="#05080f"
          d="M0 220V170c60-6 120-30 190-28 50 1 70 22 120 18 40-3 60-40 110-46 45-5 70 20 110 16 50-6 70-64 130-78 50-12 85 14 120 6 30-7 50-46 95-50 45-4 70 30 105 36 45 8 70-24 115-18 55 8 70 52 125 60 50 7 80-20 130-14 60 8 90 50 145 56 40 4 60-8 75-10V220Z"
        />
      </svg>
    </section>
  );
}
