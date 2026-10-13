"use client";

import ArrowButton from "./ui/ArrowButton";

// Tells the planner which suite was chosen, then scrolls to it.
export function selectSuite(id: string) {
  window.dispatchEvent(new CustomEvent("planner:suite", { detail: id }));
  document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
}

export default function SuiteEnquire({ id, label }: { id: string; label: string }) {
  return <ArrowButton label={label} onClick={() => selectSuite(id)} />;
}
