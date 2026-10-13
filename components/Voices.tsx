import { home } from "@/lib/content";
import PhotoBand from "./PhotoBand";
import Reveal from "./Reveal";

// One quiet, centred row of short quotes over a fixed photograph (trust signal; marked as placeholders).
export default function Voices() {
  const { voices } = home;
  return (
    <PhotoBand image={voices.image} labelledBy="voices-title">
      <h2 id="voices-title" className="text-label text-eyebrow">
        {voices.eyebrow}
      </h2>
      <ul className="mt-10 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-12">
        {voices.quotes.map((q, i) => (
          <li key={i}>
            <Reveal>
              <figure>
                <blockquote className="text-h3 text-glow font-normal italic text-balance">“{q.quote}”</blockquote>
                <figcaption className="text-label text-glow mt-5">
                  {q.author} · {q.origin}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="text-fine text-glow mt-10">{voices.note}</p>
    </PhotoBand>
  );
}
