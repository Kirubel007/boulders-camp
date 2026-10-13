import Image from "next/image";
import Icon from "./Icon";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Section";
import type { ImageRef } from "@/lib/content";

// Full-bleed still photo filling the screen below the header (svh, so the iOS address bar never cuts it).
// Only dark area besides Stars and the footer: a gradient at the bottom so the white text stays readable.
export default function Hero({
  image,
  eyebrow,
  title,
  line,
  cta,
  scrollTo,
  scrollLabel,
}: {
  image: ImageRef;
  eyebrow: string;
  title: string;
  line?: string;
  cta?: { label: string; href: string };
  scrollTo?: string;
  scrollLabel?: string;
}) {
  return (
    <section className="relative flex h-[calc(100svh-var(--header-h)-var(--bar-h))] min-h-[480px] items-end overflow-hidden bg-ink">
      <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="object-cover object-[50%_60%]" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" aria-hidden="true" />

      <Container className="relative pb-12 text-center text-sand md:pb-20">
        <p className="text-label animate-[rise_800ms_var(--ease-calm)_both]">{eyebrow}</p>
        <h1 className="text-h1 mx-auto mt-4 max-w-[14ch] animate-[rise_800ms_var(--ease-calm)_120ms_both] text-balance md:mt-6">{title}</h1>
        {line && (
          <p className="text-lead measure mx-auto mt-5 animate-[rise_800ms_var(--ease-calm)_240ms_both] text-balance md:mt-6">{line}</p>
        )}
        {cta && (
          <div className="mt-8 animate-[rise_800ms_var(--ease-calm)_360ms_both] md:mt-10">
            <ButtonLink href={cta.href} variant="gold" className="w-full max-w-xs sm:w-auto">
              {cta.label}
            </ButtonLink>
          </div>
        )}
        {scrollTo && (
          <a href={scrollTo} className="mx-auto mt-10 hidden min-h-11 w-fit flex-col items-center gap-2 md:flex">
            <span className="text-label">{scrollLabel}</span>
            <Icon name="chevronDown" className="size-5" strokeWidth={1.25} />
          </a>
        )}
      </Container>
    </section>
  );
}
