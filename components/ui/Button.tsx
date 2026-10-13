import Link from "next/link";

type Variant = "solid" | "outline" | "gold";

// Square corners, uppercase 11px label, at least 44px tall.
// solid = ink on light grounds; outline = current text colour; gold = the "Plan your stay" action only (ink text).
const base =
  "inline-flex min-h-11 items-center justify-center gap-3 text-label transition-colors duration-300 disabled:opacity-40";
const sizes = { md: "px-6 py-3", icon: "size-11 shrink-0" };
type Size = keyof typeof sizes;
const variants: Record<Variant, string> = {
  solid: "bg-ink text-sand hover:bg-umber",
  outline: "border border-current hover:bg-[var(--fg)] hover:text-[var(--ground)]",
  gold: "bg-gold text-ink hover:bg-ochre",
};

export function buttonClass(variant: Variant = "solid", className = "", size: Size = "md") {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "solid",
  external,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={buttonClass(variant, className)}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...rest
}: { variant?: Variant; size?: Size; className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={buttonClass(variant, className, size)} {...rest}>
      {children}
    </button>
  );
}
