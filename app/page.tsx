import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Arrive from "@/components/Arrive";
import SuitesCarousel from "@/components/SuitesCarousel";
import DayTimeline from "@/components/DayTimeline";
import StarsSection from "@/components/StarsSection";
import Regeneration from "@/components/Regeneration";
import Voices from "@/components/Voices";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Arrive />
      <SuitesCarousel />
      <DayTimeline />
      <StarsSection />
      <Regeneration />
      <Voices />
    </>
  );
}
