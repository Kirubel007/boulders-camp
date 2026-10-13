import Link from "next/link";
import { site, whatsappHref } from "@/lib/content";
import GuideSignup from "./GuideSignup";
import Logo from "./ui/Logo";
import { Container } from "./ui/Section";
import { Eyebrow } from "./ui/Typography";

const link = "text-body inline-flex min-h-11 items-center hover:underline underline-offset-4";

export default function Footer() {
  return (
    <footer className="ground-ink pb-[calc(88px+env(safe-area-inset-bottom))] pt-16 md:pb-12 md:pt-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label="Home" className="inline-flex">
              <Logo variant="light" size="lg" />
            </Link>
            <p className="text-body text-soft mt-6 max-w-xs">{site.footer.statement}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <Eyebrow>Explore</Eyebrow>
            <ul className="mt-3">
              {site.nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-5">
            <Eyebrow>Reservations</Eyebrow>
            <ul className="mt-3">
              <li>
                <a href={`mailto:${site.contact.email}`} className={link}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={link}>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={link}>
                  WhatsApp
                </a>
              </li>
            </ul>
            <Eyebrow className="mt-8">Downloads</Eyebrow>
            <ul className="mt-3">
              {site.footer.downloads.map((d) => (
                <li key={d.href}>
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <GuideSignup />
        </div>

        <div className="text-fine text-soft mt-8 space-y-2">
          <p>{site.footer.credits}</p>
          <p>{site.footer.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
