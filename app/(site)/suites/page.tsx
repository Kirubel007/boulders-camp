import type { Metadata } from "next";
import { suites, suitesPage } from "@/lib/content";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SuiteGallery from "@/components/SuiteGallery";
import { ButtonLink } from "@/components/ui/Button";
import IconFacts from "@/components/ui/IconFacts";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: suitesPage.seo.title,
  description: suitesPage.seo.description,
  openGraph: { title: suitesPage.seo.title, description: suitesPage.seo.description },
};

// Each suite tells its own visual story: a gallery, one evocative line, details as icons.
export default function SuitesPage() {
  const slides = suites.map((s) => s.image);
  return (
    <>
      <Hero slides={slides} title={suitesPage.hero.title} line={suitesPage.hero.line} scrollTo="#suite-1" scrollLabel="See the suites" />

      {suites.map((s, i) => {
        const facts = [{ icon: "pool", label: s.poolShort }, ...suitesPage.features];
        return (
          <Section key={s.id} id={s.id} ground={i % 2 ? "sand-2" : "sand"} labelledBy={`${s.id}-title`}>
            <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <SuiteGallery name={s.name} items={s.gallery} />
              </Reveal>
              <Reveal className="lg:col-span-5">
                <Eyebrow>{s.name}</Eyebrow>
                <h2 id={`${s.id}-title`} className="text-h2 mt-4 max-w-[14ch] text-balance">
                  {s.tagline}
                </h2>
                <IconFacts facts={facts} columns="two" className="mt-10" />
                <div className="mt-10">
                  <ButtonLink href={`/plan?suite=${s.id}`} variant="gold">
                    {suitesPage.ctaLabel} {s.name}
                  </ButtonLink>
                </div>
              </Reveal>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
