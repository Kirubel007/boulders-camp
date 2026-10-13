import { day, home } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";
import ArrowButton from "./ui/ArrowButton";
import ImageFrame from "./ui/ImageFrame";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// A day told in five photographs: time and a few words each. Swipe on mobile.
export default function Day() {
  const { day: d } = home;
  return (
    <Section id="day" ground="ochre" labelledBy="day-title">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="day-title" eyebrow={d.eyebrow} title={d.title} />
        <ArrowButton href={d.cta.href} label={d.cta.label} className="shrink-0" />
      </Container>
      <Container className="mt-12 md:mt-16">
        <p className="text-label text-eyebrow mb-4 flex items-center gap-2 lg:hidden" aria-hidden="true">
          Swipe <Icon name="arrowRight" className="size-3.5" strokeWidth={1.5} />
        </p>
        <ol className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:-mx-12 md:scroll-px-12 md:px-12 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {day.map((m) => (
            <li key={m.time} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[34%] lg:w-auto">
              <Reveal>
                <ImageFrame src={m.image.src} alt={m.image.alt} ratio="4/5" sizes="(min-width: 1024px) 20vw, (min-width: 768px) 34vw, 72vw" />
                <p className="text-h3 mt-4">{m.time}</p>
                <h3 className="text-body">{m.title}</h3>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
