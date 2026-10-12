import Image from "next/image";
import { home } from "@/lib/content";
import Reveal from "./Reveal";

export default function Regeneration() {
  const { regeneration: r } = home;
  return (
    <section id="regeneration" className="bg-sand px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow text-ochre">{r.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">{r.title}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-stone">{r.body}</p>
          <p className="eyebrow mt-12 text-stone">{r.partnersTitle}</p>
          <ul className="mt-6 grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5">
            {r.partners.map((p) => (
              <li key={p.name} className="relative h-14">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="120px"
                  className="object-contain opacity-75 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
