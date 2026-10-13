import { home } from "@/lib/content";
import Reveal from "./Reveal";
import { Container, Section } from "./ui/Section";

// One quiet, centred row of short quotes (trust signal; marked as placeholders).
export default function Voices() {
  const { voices } = home;
  return (
    <Section ground="sand-2" labelledBy="voices-title">
      <Container className="text-center">
        <h2 id="voices-title" className="text-label text-eyebrow">
          {voices.eyebrow}
        </h2>
        <ul className="mt-10 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-12">
          {voices.quotes.map((q, i) => (
            <li key={i}>
              <Reveal>
                <figure>
                  <blockquote className="text-h3 font-normal italic text-balance">“{q.quote}”</blockquote>
                  <figcaption className="text-label text-soft mt-5">
                    {q.author} · {q.origin}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="text-fine text-soft mt-10">{voices.note}</p>
      </Container>
    </Section>
  );
}
