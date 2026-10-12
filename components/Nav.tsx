"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import Icon from "./Icon";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Transparent over the hero, solid sand once the visitor scrolls.
  const solid = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-sand/95 text-granite shadow-[0_1px_0_rgba(46,41,37,0.08)] backdrop-blur" : "text-white"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10" aria-label="Main">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="eyebrow text-[0.55rem] opacity-80">{site.camp.brand}</span>
          <span className="font-serif text-2xl tracking-wide md:text-[1.7rem]">{site.camp.name}</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {site.nav.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm tracking-wide opacity-90 transition-opacity hover:opacity-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={site.nav.cta.href} className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            {site.nav.cta.label}
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-16 bg-night text-sand transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6 px-8 pt-12">
          {site.nav.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="font-serif text-4xl font-light">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link href={site.nav.cta.href} onClick={() => setOpen(false)} className="btn-primary">
              {site.nav.cta.label}
            </Link>
          </li>
        </ul>
        <p className="eyebrow absolute bottom-24 left-8 text-dusk">{site.scarcity}</p>
      </div>
    </header>
  );
}
