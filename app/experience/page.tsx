import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { day, experience, planner } from "@/lib/content";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  title: experience.seo.title,
  description: experience.seo.description,
  openGraph: { title: experience.seo.title, description: experience.seo.description, images: [experience.hero.image.src] },
};

// Each hour of the day gets its own light, from sunrise sand to night.
const tones = [
  "bg-sand text-granite",
  "bg-[#efe2d1] text-granite",
  "bg-[#e5cdb1] text-granite",
  "bg-[#7a5d55] text-sand",
  "bg-night text-sand",
];

export default function ExperiencePage() {
  const { hero } = experience;
  return (
    <>
      <section className="relative flex h-[85svh] min-h-[520px] items-end overflow-hidden bg-night text-white">
        <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="100vw" className="animate-[kenburns_16s_ease-out_both] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 md:px-10 md:pb-20">
          <p className="eyebrow animate-[fadeup_1.6s_var(--ease-calm)_0.2s_both]">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl animate-[fadeup_1.6s_var(--ease-calm)_0.4s_both] font-serif text-5xl font-light leading-[1.05] md:text-8xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg animate-[fadeup_1.6s_var(--ease-calm)_0.7s_both] text-white/90 md:text-lg">{hero.subtitle}</p>
        </div>
      </section>

      <section className="px-5 py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-3xl font-light leading-snug md:text-[2.6rem] md:leading-tight">{experience.intro}</p>
        </Reveal>
      </section>

      <ol>
        {day.map((m, i) => (
          <li key={m.time} className={`${tones[i % tones.length]} relative overflow-hidden`}>
            {!m.image && <Starfield seed={11} />}
            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
              {m.image && (
                <Reveal className={i % 2 ? "md:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>
              )}
              <Reveal delay={150} className={m.image ? "" : "py-16 text-center md:col-span-2"}>
                <p className="font-serif text-6xl font-light opacity-40 md:text-8xl">{m.time}</p>
                <h2 className="mt-2 font-serif text-4xl font-light md:text-5xl">{m.title}</h2>
                <p className={`mt-4 max-w-md leading-relaxed opacity-80 ${m.image ? "" : "mx-auto"}`}>{m.text}</p>
              </Reveal>
            </div>
          </li>
        ))}
      </ol>

      <section className="bg-sand px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="font-serif text-4xl font-light md:text-5xl">{experience.included.title}</h2>
            <ul className="mt-8 space-y-3">
              {planner.includedActivities.map((a) => (
                <li key={a} className="flex items-start gap-3 border-b border-granite/10 pb-3">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-ochre" strokeWidth={2} />
                  {a}
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10 text-stone">{experience.included.onRequestTitle}</p>
            <ul className="mt-4 space-y-2 text-stone">
              {planner.onRequestActivities.map((a) => (
                <li key={a.id}>{a.label}</li>
              ))}
            </ul>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {experience.gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 100} className={i % 3 === 0 ? "col-span-2" : ""}>
                <div className={`relative overflow-hidden ${i % 3 === 0 ? "aspect-[16/7]" : "aspect-square"}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-deep px-5 py-24 text-center md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-serif text-4xl font-light md:text-6xl">{experience.cta.title}</h2>
          <Link href={experience.cta.href} className="btn-primary mt-10">
            {experience.cta.label}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
