export type Fact = { label: string; value: string };

// Label/value pairs between hairlines. Two per line on mobile; short rows sit on one line on wider screens,
// longer rows (4+) stay an even 2×2 grid.
export default function FactRow({ facts, className = "" }: { facts: Fact[]; className?: string }) {
  const layout = facts.length > 3 ? "" : "sm:flex sm:flex-wrap sm:gap-x-10";
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 ${layout} ${className}`}>
      {facts.map((f) => (
        <div key={f.label} className="min-w-0">
          <dt className="text-label text-eyebrow">{f.label}</dt>
          <dd className="text-body mt-1">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
