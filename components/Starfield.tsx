// A drawn night sky: deterministic (seeded) stars so server and client render identically.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Starfield({ count = 220, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  const rand = seeded(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() < 0.92 ? rand() * 0.9 + 0.3 : rand() * 1.2 + 1,
    o: rand() * 0.6 + 0.3,
    twinkle: i % 9 === 0,
    delay: rand() * 6,
  }));

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* Milky Way: a soft diagonal glow */}
      <div className="absolute left-1/2 top-[-20%] h-[140%] w-[38%] -translate-x-1/2 rotate-[28deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,126,0.18),rgba(120,140,200,0.08)_45%,transparent_70%)] blur-2xl" />
      <svg className="absolute inset-0 h-full w-full">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#fff"
            opacity={s.o}
            className={s.twinkle ? "animate-[twinkle_4s_ease-in-out_infinite]" : undefined}
            style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
          />
        ))}
      </svg>
    </div>
  );
}
