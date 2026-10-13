"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { planner, site, suites, whatsappHref } from "@/lib/content";
import Icon from "../Icon";
import { ButtonLink, buttonClass } from "../ui/Button";
import { Container } from "../ui/Section";
import Logo from "../ui/Logo";

const flow = planner.flow;
const fmt = (n: number) => `${planner.currency} ${n.toLocaleString("en-GB")}`;
const noop = () => () => {};

function prettyDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function prettyMonth(ym: string) {
  return new Date(`${ym}-15T12:00:00`).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/* ---------- Building blocks ---------- */

// Large tappable option card with a round indicator (single choice = radio, multi = checkbox).
function Option({
  selected,
  onSelect,
  label,
  note,
  icon,
  multi = false,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  note?: string;
  icon?: string;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={`flex min-h-16 w-full items-center gap-4 border px-5 py-4 text-left transition-colors duration-300 ${
        selected ? "border-ink bg-sand-2" : "border-line bg-sand hover:border-ink"
      }`}
    >
      {icon && <Icon name={icon} className="size-6 shrink-0 text-umber" strokeWidth={1.25} />}
      <span className="min-w-0 flex-1">
        <span className="text-body block">{label}</span>
        {note && <span className="text-fine text-soft block">{note}</span>}
      </span>
      <span
        className={`flex size-6 shrink-0 items-center justify-center border transition-colors ${multi ? "" : "rounded-full"} ${
          selected ? "border-ink bg-ink text-sand" : "border-line"
        }`}
        aria-hidden="true"
      >
        {selected && <Icon name="check" className="size-3.5" strokeWidth={2.5} />}
      </span>
    </button>
  );
}

function Stepper({ label, hint, value, min, max, onChange }: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const btn = "flex size-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-sand disabled:border-line disabled:text-muted disabled:hover:bg-transparent";
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4">
      <div>
        <p className="text-body">{label}</p>
        {hint && <p className="text-fine text-soft">{hint}</p>}
      </div>
      <div className="flex items-center">
        <button type="button" className={btn} aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Icon name="minus" className="size-4" strokeWidth={1.5} />
        </button>
        <span className="text-h3 w-12 text-center" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Icon name="plus" className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function Group({ legend, children, multi = false }: { legend: string; children: React.ReactNode; multi?: boolean }) {
  return (
    <fieldset>
      <legend className="text-label text-eyebrow">{legend}</legend>
      <div role={multi ? "group" : "radiogroup"} aria-label={legend} className="mt-4 grid gap-3 sm:grid-cols-2">
        {children}
      </div>
    </fieldset>
  );
}

const field = "text-body min-h-12 w-full border border-line bg-sand px-4 py-3 text-ink placeholder:text-muted focus:border-ink focus:outline-none";

/* ---------- The flow ---------- */

export default function PlanFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const today = useSyncExternalStore(noop, () => new Date().toISOString().slice(0, 10), () => "");

  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [flex, setFlex] = useState("exact");
  const [arrival, setArrival] = useState("");
  const [month, setMonth] = useState("");
  const [nights, setNights] = useState(planner.minNights);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [chosen, setChosen] = useState<string[]>(() => {
    const s = params.get("suite");
    return s && suites.some((x) => x.id === s) ? [s] : [];
  });
  const [interests, setInterests] = useState<string[]>(() => {
    const i = params.get("interest");
    return i && flow.interests.some((x) => x.id === i) ? [i] : [];
  });
  const [from, setFrom] = useState("");
  const [transfer, setTransfer] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const heading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLUListElement>(null);
  const first = useRef(true);

  // Move focus to each new question (not on first load), and start it at the top.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, [step, done]);

  // Bring validation messages into view (they can sit below the fold, under the Back/Next bar).
  useEffect(() => {
    if (errors.length) errorBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  const guests = adults + children;
  const suitesNeeded = Math.ceil(guests / planner.guestsPerSuite);
  const estimate = guests * nights * planner.ratePerPersonPerNight;
  const toggle = (list: string[], set: (v: string[]) => void, id: string) => set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  const label = (list: { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? "";

  const summary = useMemo(() => {
    const when =
      flex === "flexible" ? (month ? `Flexible, ${prettyMonth(month)}` : "Flexible") : arrival ? `${flex === "around" ? "Around " : ""}${prettyDate(arrival)}` : "";
    return [
      { step: 0, label: "Dates", value: `${when} · ${nights} nights` },
      {
        step: 1,
        label: "Guests & suites",
        value: `${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""} · ${
          chosen.length ? suites.filter((s) => chosen.includes(s.id)).map((s) => s.name).join(", ") : "Any available suite"
        }`,
      },
      { step: 2, label: "Interests", value: interests.length ? interests.map((i) => label(flow.interests, i)).join(", ") : "Open to anything" },
      { step: 3, label: "Travel", value: [label(flow.arrivingFrom, from), label(flow.transfers, transfer)].filter(Boolean).join(" · ") },
      { step: 1, label: "Estimate", value: `${fmt(estimate)} excl. Sustainability Levy` },
    ];
  }, [flex, month, arrival, nights, adults, children, chosen, interests, from, transfer, estimate]);

  const text = `Hello Wolwedans, I'd like to plan a stay at Boulders Camp.\n${summary.map((s) => `${s.label}: ${s.value}`).join("\n")}${
    name ? `\nName: ${name}` : ""
  }${phone ? `\nPhone: ${phone}` : ""}${message.trim() ? `\nNote: ${message.trim()}` : ""}`;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent("Boulders Camp enquiry")}&body=${encodeURIComponent(text)}`;

  function validate(s: number) {
    const e: string[] = [];
    if (s === 0) {
      if (flex === "flexible") {
        if (!month) e.push("Choose a month.");
      } else if (!arrival) e.push("Choose an arrival date.");
      else if (today && arrival < today) e.push("Choose a date in the future.");
    }
    if (s === 1 && chosen.length && chosen.length < suitesNeeded)
      e.push(`${guests} guests need ${suitesNeeded} suites. Choose ${suitesNeeded - chosen.length} more, or pick "Any available".`);
    if (s === 3) {
      if (!from) e.push("Tell us where you are travelling from.");
      if (!transfer) e.push("Choose how you would like to arrive.");
    }
    if (s === 4) {
      if (!name.trim()) e.push("Add your name.");
      if (!/^\S+@\S+\.\S+$/.test(email)) e.push("Add a valid email address.");
    }
    setErrors(e);
    return e.length === 0;
  }

  function next() {
    if (!validate(step)) return;
    if (step === flow.steps.length - 1) return setDone(true); // front-end only: nothing is sent or stored
    setStep(step + 1);
    setReached((r) => Math.max(r, step + 1));
  }
  function back() {
    setErrors([]);
    setStep((s) => Math.max(0, s - 1));
  }
  function goTo(s: number) {
    if (s > reached) return;
    setErrors([]);
    setStep(s);
  }
  function closeFlow() {
    if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) router.back();
    else router.push("/");
  }

  const current = flow.steps[step];
  const last = step === flow.steps.length - 1;

  /* ---------- Confirmation ---------- */
  if (done) {
    const c = flow.confirmation;
    return (
      <div className="ground-night relative flex min-h-svh flex-col">
        <Image src={c.image.src} alt={c.image.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <header className="relative">
          <Container className="flex h-[var(--header-h)] items-center justify-between">
            <Link href="/" aria-label="Boulders Camp home" className="flex min-h-11 items-center">
              <Logo variant="light" />
            </Link>
            <button type="button" onClick={closeFlow} aria-label={flow.closeLabel} className="flex size-11 items-center justify-center">
              <Icon name="close" className="size-6" strokeWidth={1.25} />
            </button>
          </Container>
        </header>
        <main id="main" className="relative flex flex-1 items-center">
          <Container className="max-w-[720px] animate-[rise_1000ms_var(--ease-calm)_both] py-16 text-center">
            <span className="mx-auto mb-8 block h-14 w-px bg-gold" aria-hidden="true" />
            <h1 ref={heading} tabIndex={-1} className="text-h1 text-glow outline-none">
              {c.title}
              {name ? `, ${name.split(" ")[0]}` : ""}
            </h1>
            <p className="text-lead text-glow measure mx-auto mt-6">{c.line}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={whatsappHref(text)} variant="gold">
                <Icon name="whatsapp" className="size-4" /> Send on WhatsApp
              </ButtonLink>
              <ButtonLink href={mailto} variant="outline">
                <Icon name="mail" className="size-4" /> Send by email
              </ButtonLink>
            </div>
            <p className="text-fine text-glow mx-auto mt-8 max-w-md">{c.note}</p>
            <Link href="/" className="text-label mt-8 inline-flex min-h-11 items-center underline underline-offset-4">
              {c.home}
            </Link>
          </Container>
        </main>
      </div>
    );
  }

  /* ---------- Steps ---------- */
  return (
    <div className="ground-sand flex min-h-svh flex-col">
      <header className="sticky top-0 z-30 border-b border-line bg-sand">
        <Container className="flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" aria-label="Boulders Camp home" className="flex min-h-11 items-center">
            <Logo />
          </Link>
          <button type="button" onClick={closeFlow} aria-label={flow.closeLabel} className="-mr-2 flex size-11 items-center justify-center">
            <Icon name="close" className="size-6" strokeWidth={1.25} />
          </button>
        </Container>
      </header>

      <main id="main" className="flex-1 pb-[calc(112px+env(safe-area-inset-bottom))] pt-10 md:pt-16">
        <Container className="max-w-[784px]">
          <p className="text-label text-eyebrow">{flow.eyebrow}</p>

          {/* Progress: Step 1–5, completed steps are clickable */}
          <nav aria-label="Progress" className="mt-6">
            <ol className="grid grid-cols-5 gap-2">
              {flow.steps.map((s, i) => {
                const state = i === step ? "current" : i <= reached ? "done" : "todo";
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      disabled={i > reached}
                      aria-current={i === step ? "step" : undefined}
                      className="group flex min-h-11 w-full flex-col items-start gap-2 text-left disabled:cursor-default"
                    >
                      <span className={`block h-0.5 w-full transition-colors duration-500 ${state === "todo" ? "bg-line" : "bg-ink"}`} />
                      <span className={`text-fine ${state === "current" ? "text-umber" : state === "done" ? "text-ink group-hover:underline" : "text-muted"}`}>
                        Step {i + 1}
                        <span className="hidden md:inline"> · {s.label}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div key={step} className="mt-12 animate-[rise_700ms_var(--ease-calm)_both] md:mt-16">
            <h1 ref={heading} tabIndex={-1} className="text-h2 outline-none">
              {current.title}
            </h1>
            <p className="text-body text-soft mt-3">{current.hint}</p>

            <div className="mt-10 space-y-10">
              {step === 0 && (
                <>
                  <Group legend="How fixed are your dates?">
                    {flow.flexibility.map((o) => (
                      <Option key={o.id} selected={flex === o.id} onSelect={() => setFlex(o.id)} label={o.label} note={o.note} />
                    ))}
                  </Group>
                  {flex === "flexible" ? (
                    <label className="block">
                      <span className="text-label text-eyebrow">Month</span>
                      <input type="month" value={month} min={today.slice(0, 7) || undefined} onChange={(e) => setMonth(e.target.value)} className={`${field} mt-3`} />
                    </label>
                  ) : (
                    <label className="block">
                      <span className="text-label text-eyebrow">Arrival</span>
                      <input type="date" value={arrival} min={today || undefined} onChange={(e) => setArrival(e.target.value)} className={`${field} mt-3`} />
                    </label>
                  )}
                  <Stepper label="Nights" hint={`Minimum ${planner.minNights}`} value={nights} min={planner.minNights} max={21} onChange={setNights} />
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <Stepper label="Adults" value={adults} min={1} max={planner.maxGuests - children} onChange={setAdults} />
                    <Stepper label="Children" hint={`Ages ${planner.minChildAge}+`} value={children} min={0} max={planner.maxGuests - adults} onChange={setChildren} />
                    <p className="text-fine text-soft mt-3">
                      Your party needs {suitesNeeded} suite{suitesNeeded > 1 ? "s" : ""}. Estimate {fmt(estimate)} for {nights} nights, excl. levy.
                    </p>
                  </div>
                  <Group legend="Suites" multi>
                    <Option multi selected={chosen.length === 0} onSelect={() => setChosen([])} label="Any available suite" note="We will suggest the best fit" />
                    {suites.map((s) => (
                      <Option key={s.id} multi selected={chosen.includes(s.id)} onSelect={() => toggle(chosen, setChosen, s.id)} label={s.name} note={s.poolShort} />
                    ))}
                  </Group>
                </>
              )}

              {step === 2 && (
                <Group legend="Choose any" multi>
                  {flow.interests.map((o) => (
                    <Option key={o.id} multi icon={o.icon} selected={interests.includes(o.id)} onSelect={() => toggle(interests, setInterests, o.id)} label={o.label} note={o.note} />
                  ))}
                </Group>
              )}

              {step === 3 && (
                <>
                  <Group legend="Arriving from">
                    {flow.arrivingFrom.map((o) => (
                      <Option key={o.id} selected={from === o.id} onSelect={() => setFrom(o.id)} label={o.label} />
                    ))}
                  </Group>
                  <Group legend="Getting to camp">
                    {flow.transfers.map((o) => (
                      <Option key={o.id} icon={o.icon} selected={transfer === o.id} onSelect={() => setTransfer(o.id)} label={o.label} note={o.note} />
                    ))}
                  </Group>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-label text-eyebrow">Name</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={`${field} mt-3`} />
                    </label>
                    <label className="block">
                      <span className="text-label text-eyebrow">Email</span>
                      <input type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={`${field} mt-3`} />
                    </label>
                    <label className="block">
                      <span className="text-label text-eyebrow">Phone (optional)</span>
                      <input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className={`${field} mt-3`} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="text-label text-eyebrow">Anything else? (optional)</span>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={`${field} mt-3`} />
                    </label>
                  </div>
                  <section aria-labelledby="review-title">
                    <h2 id="review-title" className="text-label text-eyebrow">
                      Your plans
                    </h2>
                    <dl className="mt-4 border-t border-line">
                      {summary.map((s) => (
                        <div key={s.label} className="flex items-start justify-between gap-4 border-b border-line py-4">
                          <div className="min-w-0">
                            <dt className="text-fine text-soft">{s.label}</dt>
                            <dd className="text-body">{s.value || "Not set"}</dd>
                          </div>
                          {s.label !== "Estimate" && (
                            <button type="button" onClick={() => goTo(s.step)} className="text-label min-h-11 shrink-0 underline underline-offset-4">
                              Edit<span className="sr-only"> {s.label}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </dl>
                    <p className="text-fine text-soft mt-3">{planner.rateNote}</p>
                  </section>
                </>
              )}
            </div>

            {errors.length > 0 && (
              <ul ref={errorBox} role="alert" className="text-body mt-8 space-y-1 border-l-2 border-umber pl-4 text-umber">
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </main>

      {/* Back / Next, fixed at the bottom */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-sand pb-[env(safe-area-inset-bottom)]">
        <Container className="flex max-w-[784px] items-center justify-between gap-4 py-3 md:py-4">
          <button type="button" onClick={back} className={`${buttonClass("outline")} ${step === 0 ? "invisible" : ""}`}>
            <Icon name="arrowLeft" className="size-4" strokeWidth={1.5} /> {flow.back}
          </button>
          <p className="text-fine text-soft hidden sm:block" aria-hidden="true">
            Step {step + 1} of {flow.steps.length}
          </p>
          <button type="button" onClick={next} className={buttonClass(last ? "gold" : "solid", "min-w-36")}>
            {last ? flow.submit : flow.next} {!last && <Icon name="arrowRight" className="size-4" strokeWidth={1.5} />}
          </button>
        </Container>
      </div>
    </div>
  );
}
