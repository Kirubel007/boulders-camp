export type Fact = { label: string; value: string };

// Label/value pairs between hairlines. Two per line on mobile, one line on wider screens.
export default function FactRow({ facts, className = "" }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:flex sm:flex-wrap sm:gap-x-10 ${className}`}>
      {facts.map((f) => (
        <div key={f.label} className="min-w-0">
          <dt className="text-label text-eyebrow">{f.label}</dt>
          <dd className="text-body mt-1">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
