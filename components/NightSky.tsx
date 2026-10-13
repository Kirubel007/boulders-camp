import Image from "next/image";
import type { ImageRef } from "@/lib/content";
import Reveal from "./Reveal";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

// The one dark section: a full-bleed night sky that mirrors the hero, so the page bookends itself.
export default function NightSky({
  id,
  eyebrow,
  title,
  body,
  image,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: ImageRef;
  cta: { label: string; href: string };
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="ground-night relative flex min-h-[min(90svh,880px)] items-end overflow-hidden">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" loading="lazy" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" aria-hidden="true" />
      <Container className="py-section relative">
        <Reveal>
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={body} align="center" className="text-glow" />
          <div className="mt-10 text-center">
            <ButtonLink href={cta.href} variant="outline">
              {cta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
