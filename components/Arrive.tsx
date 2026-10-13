import { home } from "@/lib/content";
import IconFacts from "./ui/IconFacts";
import { Container, Section } from "./ui/Section";
import Split from "./ui/Split";
import { Eyebrow } from "./ui/Typography";

// Image + one line + how to get here, as icons.
export default function Arrive() {
  const { arrive } = home;
  return (
    <Section id="arrive" ground="sand-2" labelledBy="arrive-title">
      <Container>
        <Split image={arrive.image} ratio="4/5" imageSide="right">
          <Eyebrow>{arrive.eyebrow}</Eyebrow>
          <h2 id="arrive-title" className="text-h2 mt-4 max-w-[16ch]">
            {arrive.title}
          </h2>
          <p className="text-lead text-soft measure mt-6">{arrive.line}</p>
          <IconFacts facts={arrive.facts} className="mt-10" />
        </Split>
      </Container>
    </Section>
  );
}
