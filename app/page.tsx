import { home } from "@/lib/content";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Arrive from "@/components/Arrive";
import Suites from "@/components/Suites";
import Day from "@/components/Day";
import NightSky from "@/components/NightSky";
import Regeneration from "@/components/Regeneration";
import Voices from "@/components/Voices";
import Planner from "@/components/Planner";
import FindUs from "@/components/FindUs";

// Homepage: discovery → falling in love → enquiry. Grounds alternate sand / sand-2 / ochre, one navy night.
export default function Home() {
  return (
    <>
      <Hero {...home.hero} scrollTo="#intro" scrollLabel={home.hero.scrollCue} />
      <Intro text={home.intro.statement} />
      <Arrive />
      <Suites />
      <Day />
      <NightSky id="stars" {...home.stars} />
      <Regeneration />
      <Voices />
      <Planner />
      <FindUs />
    </>
  );
}
