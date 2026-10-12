import { home } from "@/lib/content";
import Reveal from "./Reveal";

export default function Voices() {
  const { voices } = home;
  return (
    <section className="border-t border-granite/10 bg-sand-deep px-5 py-24 md:px-10 md:py-32" aria-labelledby="voices-title">
      <div className="mx-auto max-w-7xl">
        <p id="voices-title" className="eyebrow text-center text-ochre">
          {voices.eyebrow}
        </p>
        <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
          {voices.quotes.map((q, i) => (
            <li key={i}>
              <Reveal delay={i * 150} className="text-center">
                <blockquote className="font-serif text-2xl font-light italic leading-snug md:text-[1.7rem]">“{q.quote}”</blockquote>
                <p className="eyebrow mt-5 text-[0.6rem] text-stone">
                  {q.author} · {q.origin}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center text-xs text-stone/80">{voices.note}</p>
      </div>
    </section>
  );
}
