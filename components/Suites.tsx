import Image from "next/image";
import Link from "next/link";
import { home, suites } from "@/lib/content";
import Reveal from "./Reveal";
import ArrowButton from "./ui/ArrowButton";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// Homepage teaser: five portrait cards, each opening that suite's story on /suites.
export default function Suites() {
  const { suites: s } = home;
  return (
    <Section id="suites" ground="sand" labelledBy="suites-title">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="suites-title" eyebrow={s.eyebrow} title={s.title} intro={s.line} />
        <ArrowButton href={s.cta.href} label={s.cta.label} className="shrink-0" />
      </Container>
      <Container className="mt-12 md:mt-16">
        <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0">
          {suites.map((x) => (
            <li key={x.id} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-auto">
              <Reveal>
                <Link href={`/suites#${x.id}`} className="group block">
                  <span className="relative block aspect-[4/5] overflow-hidden bg-sand-2">
                    <Image
                      src={x.image.src}
                      alt={x.image.alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 72vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-calm)] group-hover:scale-[1.06]"
                    />
                  </span>
                  <span className="text-label text-eyebrow mt-4 block">{x.name}</span>
                  <span className="text-h3 mt-1 block font-normal group-hover:underline group-hover:underline-offset-4">{x.tagline}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
