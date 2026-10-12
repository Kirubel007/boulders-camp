import Link from "next/link";
import { site, whatsappHref } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-night pb-24 pt-20 text-sand/80 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow text-dusk">{site.camp.brand}</p>
          <p className="mt-2 font-serif text-4xl text-sand">{site.camp.name}</p>
          <p className="mt-4 max-w-sm font-serif text-xl italic">{site.footer.statement}</p>
          <p className="eyebrow mt-6 text-dusk">{site.scarcity}</p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-dusk">Reservations</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-sand">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-sand">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-dusk">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {site.nav.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-sand">
                  {l.label}
                </Link>
              </li>
            ))}
            {site.footer.downloads.map((d) => (
              <li key={d.href} className="col-span-2">
                <a href={d.href} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl space-y-2 border-t border-sand/10 px-5 pt-6 text-xs text-sand/50 md:px-10">
        <p>{site.footer.credits}</p>
        <p>{site.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
