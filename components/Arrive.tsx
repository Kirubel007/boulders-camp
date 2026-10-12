import Image from "next/image";
import { home } from "@/lib/content";
import Reveal from "./Reveal";

export default function Arrive() {
  const { arrive } = home;
  const [wide, detail] = arrive.images;
  return (
    <section id="arrive" className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-ochre">{arrive.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">{arrive.title}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-stone">{arrive.body}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-granite/15 pt-8">
            {arrive.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-4xl font-light text-granite md:text-5xl">{s.value}</dd>
                <dd className="mt-2 text-xs leading-snug text-stone">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="relative md:col-span-7">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={wide.src} alt={wide.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={250} className="relative -mt-20 ml-auto w-1/2 border-8 border-sand md:-mt-28 md:-mr-6 md:w-[45%]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={detail.src} alt={detail.alt} fill sizes="(min-width: 768px) 26vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
