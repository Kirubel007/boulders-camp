import { site, whatsappHref } from "@/lib/content";
import Icon from "./Icon";
import { ButtonLink } from "./ui/Button";

// Slim sticky enquiry bar below 768px, clear of the iPhone home indicator.
export default function MobileBar() {
  return (
    <div className="ground-sand fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 md:hidden">
      <ButtonLink href={whatsappHref()} variant="outline" className="flex-1">
        <Icon name="whatsapp" className="size-4" /> WhatsApp
      </ButtonLink>
      <ButtonLink href={site.nav.cta.href} variant="gold" className="flex-1">
        {site.nav.cta.label}
      </ButtonLink>
    </div>
  );
}
