import Reveal from "./Reveal";
import { Container, Section } from "./ui/Section";

// One centred serif statement with plenty of space around it.
export default function Intro({ text }: { text: string }) {
  return (
    <Section id="intro" ground="sand">
      <Container>
        <Reveal>
          <p className="text-h2 mx-auto max-w-[26ch] text-balance text-center">{text}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
