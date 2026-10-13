import { home } from "@/lib/content";
import MapEmbed from "./MapEmbed";
import Reveal from "./Reveal";
import { ButtonLink } from "./ui/Button";
import FactRow from "./ui/FactRow";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// Copy left, map right (4fr / 7fr). On mobile the map comes after the text.
export default function FindUs() {
  const { findUs: f } = home;
  const coords = `${f.map.lat},${f.map.lng}`;
  return (
    <Section id="find-us" ground="sand-2" labelledBy="find-us-title">
      <Container className="grid gap-10 md:grid-cols-[4fr_7fr] md:gap-16">
        <Reveal>
          <SectionHeading id="find-us-title" eyebrow={f.eyebrow} title={f.title} intro={f.body} />
          <FactRow facts={f.facts} className="mt-10" />
        </Reveal>
        <Reveal>
          <MapEmbed {...f.map} />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`https://www.google.com/maps/search/?api=1&query=${coords}`} variant="gold">
              {f.openLabel}
            </ButtonLink>
            <ButtonLink href={`https://www.google.com/maps/dir/?api=1&destination=${coords}`} variant="outline">
              {f.directionsLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
