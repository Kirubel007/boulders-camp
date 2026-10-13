export type Ground = "sand" | "sand-2" | "ochre" | "navy" | "night" | "ink";

// Every section uses the same vertical rhythm and the same container.
export function Section({
  id,
  ground = "sand",
  className = "",
  labelledBy,
  children,
}: {
  id?: string;
  ground?: Ground;
  className?: string;
  labelledBy?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`ground-${ground} py-section ${className}`}>
      {children}
    </section>
  );
}

// `wide` spans the full viewport (same gutters) — used for headers that sit over full-bleed imagery.
export function Container({ className = "", wide = false, children }: { className?: string; wide?: boolean; children: React.ReactNode }) {
  return <div className={`mx-auto w-full ${wide ? "" : "max-w-[1280px]"} px-6 md:px-12 ${className}`}>{children}</div>;
}
