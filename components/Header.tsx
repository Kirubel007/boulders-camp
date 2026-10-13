"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, whatsappHref } from "@/lib/content";
import Icon from "./Icon";
import { openMap } from "./MapWidget";
import Logo from "./ui/Logo";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Section";

// Sand header with a hairline. MENU left, logo centre, gold "Plan your stay" right (768px and up).
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  // Transparent over the hero photo; solid sand once the visitor scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock body scroll, close on Escape, keep Tab inside the overlay.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    overlay.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !overlay.current) return;
      const items = overlay.current.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled ? "ground-sand border-line" : "border-transparent bg-gradient-to-b from-black/55 to-transparent bg-origin-border text-sand"
        }`}
      >
        <Container wide className="grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center">
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-ml-2 flex min-h-11 items-center gap-3 justify-self-start px-2"
          >
            <Icon name="menu" className="size-5" strokeWidth={1.5} />
            <span className="text-label">Menu</span>
          </button>
          <Link href="/" aria-label={`${site.camp.brand} ${site.camp.name}, home`} className="flex min-h-11 items-center">
            <Logo variant={scrolled ? "dark" : "light"} />
          </Link>
          <div className="hidden justify-self-end md:block">
            <ButtonLink href={site.nav.cta.href} variant="gold">
              {site.nav.cta.label}
            </ButtonLink>
          </div>
        </Container>
      </header>

      {open && (
        <div
          ref={overlay}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="ground-sand fixed inset-0 z-[60] flex animate-[fade-in_300ms_ease-out] flex-col overflow-y-auto"
        >
          <div className="border-b border-line">
            <Container wide className="grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center">
              <button type="button" onClick={close} className="-ml-2 flex min-h-11 items-center gap-3 justify-self-start px-2">
                <Icon name="close" className="size-5" strokeWidth={1.5} />
                <span className="text-label">Close</span>
              </button>
              <Link href="/" onClick={close} className="flex min-h-11 items-center" aria-label="Home">
                <Logo />
              </Link>
            </Container>
          </div>

          <Container className="flex flex-1 flex-col justify-between gap-12 py-12 md:py-16">
            <nav aria-label="Main">
              <ul className="space-y-2 md:space-y-3">
                {site.nav.links.map((l) => (
                  <li key={l.href}>
                    {l.href === "#map" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          openMap();
                        }}
                        className="text-h2 inline-flex min-h-11 items-center hover:text-umber"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <Link href={l.href} onClick={close} className="text-h2 inline-flex min-h-11 items-center hover:text-umber">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={site.nav.cta.href} variant="gold" onClick={close}>
                  {site.nav.cta.label}
                </ButtonLink>
                <ButtonLink href={whatsappHref()} variant="outline">
                  <Icon name="whatsapp" className="size-4" /> WhatsApp
                </ButtonLink>
              </div>
              <a href={`mailto:${site.contact.email}`} className="text-body inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
