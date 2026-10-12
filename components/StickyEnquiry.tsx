import Link from "next/link";
import { site, whatsappHref } from "@/lib/content";
import Icon from "./Icon";

// Always-visible enquiry route: a bottom bar on mobile, a floating WhatsApp button on desktop.
export default function StickyEnquiry() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-granite/10 bg-sand/95 backdrop-blur md:hidden">
        <Link
          href={site.nav.cta.href}
          className="flex flex-1 items-center justify-center bg-ochre py-4 text-xs font-medium uppercase tracking-[0.2em] text-white"
        >
          {site.nav.cta.label}
        </Link>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 text-xs font-medium uppercase tracking-[0.2em] text-granite"
        >
          <Icon name="whatsapp" className="size-5" />
          WhatsApp
        </a>
      </div>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with reservations on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-granite text-sand shadow-lg transition-transform duration-300 hover:scale-105 md:flex"
      >
        <Icon name="whatsapp" className="size-7" />
      </a>
    </>
  );
}
