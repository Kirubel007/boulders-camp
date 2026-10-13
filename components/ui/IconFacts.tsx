import Icon from "../Icon";

export type IconFact = { icon: string; label: string; value?: string };

// Key details as small line icons instead of spec lists. Wraps two-up on mobile.
export default function IconFacts({
  facts,
  columns = "auto",
  className = "",
}: {
  facts: IconFact[];
  columns?: "auto" | "two";
  className?: string;
}) {
  const layout = columns === "two" ? "" : "sm:flex sm:flex-wrap sm:gap-x-8";
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 ${layout} ${className}`}>
      {facts.map((f) => (
        <li key={f.label} className="flex min-w-0 items-start gap-3">
          <Icon name={f.icon} className="mt-0.5 size-6 shrink-0 text-eyebrow" strokeWidth={1.25} />
          <span className="min-w-0">
            {f.value ? (
              <>
                <span className="text-label text-eyebrow block">{f.label}</span>
                <span className="text-body block">{f.value}</span>
              </>
            ) : (
              <span className="text-body block">{f.label}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
