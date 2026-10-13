import { home } from "@/lib/content";
import FactRow from "./ui/FactRow";
import { Container, Section } from "./ui/Section";
import Split from "./ui/Split";
import { SectionHeading } from "./ui/Typography";

export default function Arrive() {
  const { arrive } = home;
  return (
    <Section id="arrive" ground="sand-2" labelledBy="arrive-title">
      <Container>
        <Split image={arrive.image} ratio="4/5" imageSide="right">
          <SectionHeading id="arrive-title" eyebrow={arrive.eyebrow} title={arrive.title} intro={arrive.body} />
          <FactRow facts={arrive.facts} className="mt-10" />
        </Split>
      </Container>
    </Section>
  );
}
