"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { home, planner, site, suites, whatsappHref } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

const fmt = (n: number) => `${planner.currency} ${n.toLocaleString("en-GB")}`;

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-granite/10 py-4">
      <div>
        <p className="text-sm text-granite">{label}</p>
        {hint && <p className="text-xs text-stone">{hint}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="flex size-9 items-center justify-center rounded-full border border-granite/30 text-lg disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center font-serif text-2xl" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="flex size-9 items-center justify-center rounded-full border border-granite/30 text-lg disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function Planner() {
  // "Today" is read in the browser only (empty on the server), so the page itself stays fully static.
  const today = useSyncExternalStore(
    () => () => {},
    () => new Date().toISOString().slice(0, 10),
    () => "",
  );
  const [arrival, setArrival] = useState("");
  const [nights, setNights] = useState(planner.minNights);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  // A suite chosen in the carousel arrives here.
  useEffect(() => {
    const onSuite = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setChosen((c) => (c.includes(id) ? c : [...c, id]));
    };
    window.addEventListener("planner:suite", onSuite);
    return () => window.removeEventListener("planner:suite", onSuite);
  }, []);

  const guests = adults + children;
  const suitesNeeded = Math.ceil(guests / planner.guestsPerSuite);
  const estimate = guests * nights * planner.ratePerPersonPerNight;
  const departure = arrival ? addDays(arrival, nights) : "";

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const summary = useMemo(() => {
    const suiteNames = chosen.length ? suites.filter((s) => chosen.includes(s.id)).map((s) => s.name).join(", ") : "Any available";
    const extraNames = planner.onRequestActivities.filter((a) => extras.includes(a.id)).map((a) => a.label);
    return [
      `Stay: ${arrival ? `${prettyDate(arrival)} – ${prettyDate(departure)}` : "dates flexible"} (${nights} nights)`,
      `Guests: ${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""} (7+)` : ""}`,
      `Suites: ${suiteNames}`,
      ...(extraNames.length ? [`On request: ${extraNames.join(", ")}`] : []),
      `Estimate: ${fmt(estimate)} excl. Sustainability Levy`,
    ];
  }, [arrival, departure, nights, adults, children, chosen, extras, estimate]);

  const whatsappMessage = `Hello Wolwedans, I'd like to enquire about Boulders Camp.\n${summary.join("\n")}${name ? `\nName: ${name}` : ""}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!arrival) errs.push("Choose an arrival date.");
    else if (today && arrival < today) errs.push("Choose an arrival date in the future.");
    if (chosen.length && chosen.length < suitesNeeded)
      errs.push(`${guests} guests need at least ${suitesNeeded} suites. Choose ${suitesNeeded - chosen.length} more, or clear your choice.`);
    if (!name.trim()) errs.push("Add your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.push("Add a valid email address.");
    setErrors(errs);
    // Front-end only: nothing is sent or stored.
    if (!errs.length) setSent(true);
  }

  const input = "w-full border-b border-granite/25 bg-transparent py-3 text-granite placeholder:text-stone/60 focus:border-ochre focus:outline-none";

  return (
    <section id="plan" className="scroll-mt-20 bg-sand px-5 py-28 md:px-10 md:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-ochre">{home.plan.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">{home.plan.title}</h2>
        <p className="mt-5 text-stone">{home.plan.body}</p>
        <p className="eyebrow mt-6 text-[0.6rem] text-granite">{site.scarcity}</p>
      </Reveal>

      <div className="mx-auto mt-16 max-w-6xl">
        {sent ? (
          <div className="mx-auto max-w-xl border border-granite/15 bg-white/50 p-8 text-center md:p-12" role="status">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-ochre text-white">
              <Icon name="check" className="size-7" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 font-serif text-3xl">{planner.success.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone">{planner.success.body}</p>
            <ul className="mt-6 space-y-1 border-y border-granite/10 py-5 text-left text-sm text-granite">
              {summary.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href={whatsappHref(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Icon name="whatsapp" className="size-4" /> {planner.success.whatsappCta}
              </a>
              <button type="button" onClick={() => setSent(false)} className="btn-ghost text-granite">
                Edit enquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-7">
              {/* 1. Dates */}
              <fieldset>
                <legend className="eyebrow text-stone">1 · Dates</legend>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-granite">Arrival</span>
                    <input type="date" min={today || undefined} value={arrival} onChange={(e) => setArrival(e.target.value)} className={input} />
                  </label>
                  <div>
                    <Stepper label="Nights" hint={`Minimum ${planner.minNights}`} value={nights} min={planner.minNights} max={21} onChange={setNights} />
                  </div>
                </div>
                {departure && <p className="mt-3 text-sm text-stone">Departing {prettyDate(departure)}</p>}
              </fieldset>

              {/* 2. Guests */}
              <fieldset>
                <legend className="eyebrow text-stone">2 · Guests</legend>
                <Stepper label="Adults" value={adults} min={1} max={planner.maxGuests - children} onChange={setAdults} />
                <Stepper
                  label="Children"
                  hint={`Ages ${planner.minChildAge}+ only`}
                  value={children}
                  min={0}
                  max={planner.maxGuests - adults}
                  onChange={setChildren}
                />
                <p className="mt-3 text-xs text-stone">
                  Maximum {planner.maxGuests} guests, {planner.guestsPerSuite} per suite. Your party needs {suitesNeeded} suite{suitesNeeded > 1 ? "s" : ""}.
                </p>
              </fieldset>

              {/* 3. Suites */}
              <fieldset>
                <legend className="eyebrow text-stone">3 · Suites (optional)</legend>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {suites.map((s) => {
                    const on = chosen.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(chosen, setChosen, s.id)}
                        className={`border px-4 py-3 text-left transition-colors ${
                          on ? "border-ochre bg-ochre/10" : "border-granite/15 hover:border-granite/40"
                        }`}
                      >
                        <span className="flex items-center justify-between font-serif text-xl">
                          {s.name}
                          {on && <Icon name="check" className="size-4 text-ochre" strokeWidth={2} />}
                        </span>
                        <span className="text-xs text-stone">{s.pool}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 4. Activities */}
              <fieldset>
                <legend className="eyebrow text-stone">4 · Activities</legend>
                <p className="mt-4 text-sm text-granite">Included in every stay:</p>
                <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-stone sm:grid-cols-2">
                  {planner.includedActivities.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-ochre" strokeWidth={2} />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-granite">Add on request:</p>
                <div className="mt-2 space-y-2">
                  {planner.onRequestActivities.map((a) => (
                    <label key={a.id} className="flex cursor-pointer items-center gap-3 text-sm">
                      <input type="checkbox" checked={extras.includes(a.id)} onChange={() => toggle(extras, setExtras, a.id)} className="size-4 accent-ochre" />
                      <span>
                        {a.label} <span className="text-stone">· {a.note}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 5. Contact */}
              <fieldset>
                <legend className="eyebrow text-stone">5 · Your details</legend>
                <div className="mt-2 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="sr-only">Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" className={input} />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" className={input} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="sr-only">Message</span>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything we should know? (optional)" rows={3} className={input} />
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Live estimate */}
            <aside className="lg:col-span-5">
              <div className="bg-night p-8 text-sand lg:sticky lg:top-28">
                <p className="eyebrow text-dusk">Your estimate</p>
                <p className="mt-4 font-serif text-5xl font-light" aria-live="polite">
                  {fmt(estimate)}
                </p>
                <p className="mt-2 text-sm text-sand/70">
                  {guests} guest{guests > 1 ? "s" : ""} × {nights} nights × {fmt(planner.ratePerPersonPerNight)}
                </p>
                <ul className="mt-6 space-y-1 border-t border-sand/15 pt-5 text-sm text-sand/80">
                  {summary.slice(0, -1).map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-sand/55">{planner.rateNote}</p>

                {errors.length > 0 && (
                  <ul className="mt-5 space-y-1 border-l-2 border-ochre pl-3 text-sm text-[#f0b48a]" role="alert">
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                )}

                <button type="submit" className="btn-primary mt-6 w-full">
                  Send enquiry
                </button>
                <a
                  href={whatsappHref(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-3 w-full border border-sand/30 text-sand hover:bg-sand/10"
                >
                  <Icon name="whatsapp" className="size-4" /> Ask on WhatsApp
                </a>
              </div>
            </aside>
          </form>
        )}
      </div>
    </section>
  );
}
