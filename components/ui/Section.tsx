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

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-12 ${className}`}>{children}</div>;
}
