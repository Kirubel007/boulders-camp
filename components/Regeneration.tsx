import Image from "next/image";
import { home } from "@/lib/content";
import { Container, Section } from "./ui/Section";
import Split from "./ui/Split";
import { Eyebrow, SectionHeading } from "./ui/Typography";

// Same split as Arrive, mirrored (image left) to keep the rhythm.
export default function Regeneration() {
  const { regeneration: r } = home;
  return (
    <Section id="regeneration" ground="sand" labelledBy="regeneration-title">
      <Container>
        <Split image={r.image} ratio="3/2" imageSide="left">
          <SectionHeading id="regeneration-title" eyebrow={r.eyebrow} title={r.title} intro={r.body} />
          <div className="mt-10 border-t border-line pt-6">
            <Eyebrow>{r.partnersTitle}</Eyebrow>
            <ul className="mt-6 grid grid-cols-3 items-center gap-6 sm:grid-cols-5">
              {r.partners.map((p) => (
                <li key={p.name} className="relative h-12">
                  <Image src={p.logo} alt={p.name} fill sizes="120px" className="object-contain mix-blend-multiply grayscale" />
                </li>
              ))}
            </ul>
          </div>
        </Split>
      </Container>
    </Section>
  );
}
