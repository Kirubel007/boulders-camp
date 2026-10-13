import { home, suites } from "@/lib/content";
import Reveal from "./Reveal";
import SuiteEnquire from "./SuiteEnquire";
import FactRow from "./ui/FactRow";
import ImageFrame from "./ui/ImageFrame";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// Listing rows: a 3/2 image beside an ochre text card. Stacks image-first on mobile.
export default function Suites() {
  const { suites: intro } = home;
  return (
    <Section id="suites" ground="sand" labelledBy="suites-title">
      <Container>
        <SectionHeading id="suites-title" eyebrow={intro.eyebrow} title={intro.title} intro={intro.body} />
        <ul className="mt-12 space-y-10 md:mt-16 md:space-y-12">
          {suites.map((s) => (
            <li key={s.id}>
              <Reveal>
                <article className="grid md:grid-cols-12" aria-labelledby={`${s.id}-title`}>
                  <ImageFrame src={s.image.src} alt={s.image.alt} ratio="3/2" sizes="(min-width: 768px) 58vw, 100vw" className="md:col-span-7" />
                  <div className="ground-ochre flex flex-col justify-center p-6 sm:p-8 md:col-span-5 lg:p-12">
                    <p className="text-label text-eyebrow">{s.name}</p>
                    <h3 id={`${s.id}-title`} className="text-h3 mt-3">
                      {s.tagline}
                    </h3>
                    <FactRow facts={s.facts} className="mt-6" />
                    <p className="text-body text-soft mt-6">{s.description}</p>
                    <div className="mt-8">
                      <SuiteEnquire id={s.id} label={`${intro.cta} ${s.name}`} />
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
