import { home } from "@/lib/content";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="px-5 py-28 md:py-40">
      <Reveal className="mx-auto max-w-4xl text-center">
        <span className="mx-auto mb-10 block h-14 w-px bg-dusk" aria-hidden="true" />
        <p className="font-serif text-3xl font-light leading-snug text-granite md:text-5xl md:leading-tight">
          {home.intro.statement}
        </p>
      </Reveal>
    </section>
  );
}
