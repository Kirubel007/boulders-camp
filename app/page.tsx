import Image from "next/image";
import { home, site } from "@/lib/content";

export default function Home() {
  const { hero } = home;
  return (
    <section className="relative flex h-svh items-center justify-center overflow-hidden text-center text-white">
      <Image src={hero.slides[0].src} alt={hero.slides[0].alt} fill preload sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative px-6">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl font-light md:text-8xl">{hero.title}</h1>
        <p className="eyebrow mt-8 text-dusk">{site.scarcity}</p>
      </div>
    </section>
  );
}
