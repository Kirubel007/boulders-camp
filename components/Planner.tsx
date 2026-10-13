"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { home, planner, site, suites, whatsappHref } from "@/lib/content";
import Icon from "./Icon";
import { Button, ButtonLink, buttonClass } from "./ui/Button";
import FactRow from "./ui/FactRow";
import { Container, Section } from "./ui/Section";
import { SectionHeading } from "./ui/Typography";

const fmt = (n: number) => `${planner.currency} ${n.toLocaleString("en-GB")}`;

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const field = "text-body w-full border border-line bg-sand px-4 py-3 text-ink placeholder:text-muted focus:border-ink focus:outline-none";

// Square − / + stepper with 44px targets.
function Stepper({ label, hint, value, min, max, onChange }: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4">
      <div>
        <p className="text-body">{label}</p>
        {hint && <p className="text-fine text-soft">{hint}</p>}
      </div>
      <div className="flex items-center">
        <Button variant="outline" size="icon" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Icon name="minus" className="size-4" strokeWidth={1.5} />
        </Button>
        <span className="text-h3 w-12 text-center" aria-live="polite">
          {value}
        </span>
        <Button variant="outline" size="icon" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Icon name="plus" className="size-4" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}

function Legend({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <legend className="text-label text-eyebrow">
      {n} · {children}
    </legend>
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

  // A suite chosen in the Suites listing arrives here.
  useEffect(() => {
    const onSuite = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setSent(false);
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
      ...(message.trim() ? [`Note: ${message.trim()}`] : []),
    ];
  }, [arrival, departure, nights, adults, children, chosen, extras, estimate, message]);

  const text = `Hello Wolwedans, I'd like to enquire about Boulders Camp.\n${summary.join("\n")}${name ? `\nName: ${name}` : ""}`;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent("Boulders Camp enquiry")}&body=${encodeURIComponent(text)}`;

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

  return (
    <Section id="plan" ground="sand" labelledBy="plan-title">
      <Container>
        <div className="mx-auto max-w-[640px]">
          <SectionHeading id="plan-title" eyebrow={home.plan.eyebrow} title={home.plan.title} intro={home.plan.body} align="center" />
          <p className="text-label text-eyebrow mt-6 text-center">{site.scarcity}</p>

          {sent ? (
            <div className="mt-12 border-y border-line py-10 text-center" role="status">
              <h3 className="text-h3">{planner.success.title}</h3>
              <p className="text-body text-soft mx-auto mt-3 measure">{planner.success.body}</p>
              <ul className="text-body mx-auto mt-8 max-w-md space-y-1 text-left">
                {summary.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={whatsappHref(text)} variant="solid">
                  <Icon name="whatsapp" className="size-4" /> Send on WhatsApp
                </ButtonLink>
                <ButtonLink href={mailto} variant="outline">
                  <Icon name="mail" className="size-4" /> Open in email
                </ButtonLink>
              </div>
              <button type="button" onClick={() => setSent(false)} className="text-label mt-6 min-h-11 underline underline-offset-4">
                Edit enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-12 space-y-12">
              <fieldset>
                <Legend n={1}>Dates</Legend>
                <label className="mt-4 block">
                  <span className="text-body">Arrival</span>
                  <input type="date" min={today || undefined} value={arrival} onChange={(e) => setArrival(e.target.value)} className={`${field} mt-2 min-h-11`} />
                </label>
                {departure && <p className="text-fine text-soft mt-2">Departing {prettyDate(departure)}</p>}
                <Stepper label="Nights" hint={`Minimum ${planner.minNights}`} value={nights} min={planner.minNights} max={21} onChange={setNights} />
              </fieldset>

              <fieldset>
                <Legend n={2}>Guests</Legend>
                <Stepper label="Adults" value={adults} min={1} max={planner.maxGuests - children} onChange={setAdults} />
                <Stepper label="Children" hint={`Ages ${planner.minChildAge}+ only`} value={children} min={0} max={planner.maxGuests - adults} onChange={setChildren} />
                <p className="text-fine text-soft mt-3">
                  Maximum {planner.maxGuests} guests, {planner.guestsPerSuite} per suite. Your party needs {suitesNeeded} suite{suitesNeeded > 1 ? "s" : ""}.
                </p>
              </fieldset>

              <fieldset>
                <Legend n={3}>Suites (optional)</Legend>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {suites.map((s) => {
                    const on = chosen.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(chosen, setChosen, s.id)}
                        className={`flex min-h-11 items-center justify-between gap-3 border px-4 py-3 text-left transition-colors ${
                          on ? "border-ink bg-sand-2" : "border-line hover:border-ink"
                        }`}
                      >
                        <span>
                          <span className="text-body block">{s.name}</span>
                          <span className="text-fine text-soft block">{s.pool}</span>
                        </span>
                        {on && <Icon name="check" className="size-4 shrink-0" strokeWidth={2} />}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <Legend n={4}>Activities</Legend>
                <p className="text-body mt-4">Included in every stay</p>
                <ul className="text-body text-soft mt-2 grid gap-x-6 sm:grid-cols-2">
                  {planner.includedActivities.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <Icon name="check" className="mt-1.5 size-4 shrink-0" strokeWidth={1.5} />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="text-body mt-6">Add on request</p>
                <div className="mt-2">
                  {planner.onRequestActivities.map((a) => (
                    <label key={a.id} className="flex min-h-11 cursor-pointer items-center gap-3">
                      <input type="checkbox" checked={extras.includes(a.id)} onChange={() => toggle(extras, setExtras, a.id)} className="size-5 shrink-0 accent-ink" />
                      <span className="text-body">
                        {a.label} <span className="text-soft">· {a.note}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <Legend n={5}>Your details</Legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="sr-only">Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" className={`${field} min-h-11`} />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" className={`${field} min-h-11`} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="sr-only">Message</span>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything we should know? (optional)" rows={3} className={field} />
                  </label>
                </div>
              </fieldset>

              <div>
                <FactRow
                  facts={[
                    { label: "Nights", value: String(nights) },
                    { label: "Guests", value: String(guests) },
                    { label: "Estimate", value: fmt(estimate) },
                  ]}
                />
                <p className="text-fine text-soft mt-3" aria-live="polite">
                  {guests} × {nights} × {fmt(planner.ratePerPersonPerNight)}. {planner.rateNote}
                </p>

                {errors.length > 0 && (
                  <ul className="text-body mt-6 space-y-1 border-l-2 border-umber pl-4 text-umber" role="alert">
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={whatsappHref(text)} variant="solid" className="sm:flex-1">
                    <Icon name="whatsapp" className="size-4" /> Send on WhatsApp
                  </ButtonLink>
                  <button type="submit" className={buttonClass("outline", "sm:flex-1")}>
                    <Icon name="mail" className="size-4" /> Email enquiry
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
