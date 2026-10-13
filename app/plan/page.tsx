import type { Metadata } from "next";
import { Suspense } from "react";
import PlanFlow from "@/components/plan/PlanFlow";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Plan your stay · Boulders Camp, Wolwedans",
  description: "Five short steps to plan your stay at Boulders Camp in the NamibRand, Namibia.",
};

// Its own calm, full-screen space, like Singita's "Plan your trip". Reads ?suite= and ?interest= to pre-select.
export default function PlanPage() {
  return (
    <Suspense
      fallback={
        <div className="ground-sand min-h-svh">
          <div className="border-b border-line">
            <Container className="flex h-[var(--header-h)] items-center">
              <Logo />
            </Container>
          </div>
        </div>
      }
    >
      <PlanFlow />
    </Suspense>
  );
}
