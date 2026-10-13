import type { Metadata } from "next";
import { day, experience, home, planner } from "@/lib/content";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import NightSky from "@/components/NightSky";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { ButtonLink } from "@/components/ui/Button";
import ImageFrame from "@/components/ui/ImageFrame";
import { Container, Section } from "@/components/ui/Section";
import Split from "@/components/ui/Split";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: experience.seo.title,
  description: experience.seo.description,
  openGraph: { title: experience.seo.title, description: experience.seo.description },
};

export default function ExperiencePage() {
  const { hero } = experience;
  const daylight = day.slice(0, -1);
  const night = day[day.length - 1];
  const slides = [{ ...hero.image, caption: hero.title }, ...daylight.map((m) => ({ ...m.image, caption: `${m.time} · ${m.title}` }))];

  return (
    <>
      <Hero eyebrow={hero.eyebrow} title={hero.title} line={hero.subtitle} slides={slides} cta={hero.cta} />
      <Intro text={experience.intro} />

      {/* One moment per section, alternating grounds and image sides */}
      {daylight.map((m, i) => (
        <Section key={m.time} ground={i % 2 ? "sand" : "sand-2"} labelledBy={`moment-${i}`}>
          <Container>
            <Split image={m.image} ratio="3/2" imageSide={i % 2 ? "right" : "left"}>
              <SectionHeading id={`moment-${i}`} eyebrow={m.time} title={m.title} intro={m.text} />
            </Split>
          </Container>
        </Section>
      ))}

      <NightSky id="antares" eyebrow={night.time} title={night.title} body={night.text} image={night.image} cta={{ ...home.stars.cta, href: "/#plan" }} />

      <Section ground="sand" labelledBy="included-title">
        <Container className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeading id="included-title" title={experience.included.title} />
            <ul className="mt-8">
              {planner.includedActivities.map((a) => (
                <li key={a} className="text-body flex items-start gap-3 border-t border-line py-3 last:border-b">
                  <Icon name="check" className="mt-1.5 size-4 shrink-0" strokeWidth={1.5} />
                  {a}
                </li>
              ))}
            </ul>
            <Eyebrow className="mt-10">{experience.included.onRequestTitle}</Eyebrow>
            <ul className="text-body text-soft mt-3">
              {planner.onRequestActivities.map((a) => (
                <li key={a.id}>{a.label}</li>
              ))}
            </ul>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {experience.gallery.map((g) => (
              <Reveal key={g.src}>
                <ImageFrame src={g.src} alt={g.alt} ratio="4/5" sizes="(min-width: 768px) 28vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section ground="sand-2" labelledBy="experience-cta">
        <Container className="text-center">
          <Reveal>
            <h2 id="experience-cta" className="text-h2 mx-auto max-w-[20ch] text-balance">
              {experience.cta.title}
            </h2>
            <div className="mt-10">
              <ButtonLink href={experience.cta.href} variant="gold">
                {experience.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
