// Small uppercase, letter-spaced label. Its colour comes from the section's ground.
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-label text-eyebrow ${className}`}>{children}</p>;
}

// Eyebrow + serif title + optional intro. One alignment per use.
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const centred = align === "center";
  return (
    <header className={`${centred ? "mx-auto text-center" : ""} max-w-[720px] ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id} className={`${Tag === "h1" ? "text-h1" : "text-h2"} ${eyebrow ? "mt-4" : ""}`}>
        {title}
      </Tag>
      {intro && <p className={`text-body text-soft measure mt-6 ${centred ? "mx-auto" : ""}`}>{intro}</p>}
    </header>
  );
}
