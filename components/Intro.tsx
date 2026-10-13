import type { ImageRef } from "@/lib/content";
import PhotoBand from "./PhotoBand";
import Reveal from "./Reveal";
import { Container, Section } from "./ui/Section";

// One centred serif statement. Over a fixed photograph when an image is given, otherwise on sand.
export default function Intro({ text, image }: { text: string; image?: ImageRef }) {
  const statement = (
    <Reveal>
      <p className={`text-h2 mx-auto max-w-[26ch] text-balance text-center ${image ? "text-glow" : ""}`}>{text}</p>
    </Reveal>
  );
  return image ? (
    <PhotoBand id="intro" image={image} tall>
      {statement}
    </PhotoBand>
  ) : (
    <Section id="intro" ground="sand">
      <Container>{statement}</Container>
    </Section>
  );
}
