import { day, home } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";
import ArrowButton from "./ui/ArrowButton";
import ImageFrame from "./ui/ImageFrame";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// Desktop: a vertical timeline beside one sticky 4/5 image.
// Mobile: swipeable cards (~80% wide, the next one peeking in); the side image is hidden.
export default function Day() {
  const { day: d } = home;
  return (
    <Section id="day" ground="ochre" labelledBy="day-title">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <SectionHeading id="day-title" eyebrow={d.eyebrow} title={d.title} />

            <p className="text-label text-eyebrow mt-8 flex items-center gap-2 md:hidden" aria-hidden="true">
              {d.swipeHint} <Icon name="arrowRight" className="size-3.5" strokeWidth={1.5} />
            </p>
            <ol className="-mx-6 mt-4 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:mt-10 md:block md:overflow-visible md:px-0 md:pb-0">
              {day.map((m) => (
                <li
                  key={m.time}
                  className="w-[80%] shrink-0 snap-start border-t border-line pt-5 md:grid md:w-auto md:grid-cols-[120px_1fr] md:gap-6 md:py-6 md:last:border-b"
                >
                  <p className="text-h3">{m.time}</p>
                  <div className="mt-2 md:mt-0">
                    <h3 className="text-body">{m.title}</h3>
                    <p className="text-body text-soft">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <ArrowButton href={d.cta.href} label={d.cta.label} />
            </div>
          </div>

          <div className="hidden md:col-span-5 md:block">
            <Reveal className="sticky top-[calc(var(--header-h)+32px)]">
              <ImageFrame src={d.image.src} alt={d.image.alt} ratio="4/5" sizes="(min-width: 768px) 40vw, 0px" />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
