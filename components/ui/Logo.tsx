import Image from "next/image";
import { site } from "@/lib/content";

// The real Wolwedans wordmark (dark on light grounds, light on ink), with the camp name as a small label.
// The logo files are used as supplied: never stretched, re-typed or recoloured.
const files = {
  dark: { src: "/brand/wolwedans-dark.svg", width: 570, height: 188 },
  light: { src: "/brand/wolwedans-light.svg", width: 788, height: 258 },
};

export default function Logo({
  variant = "dark",
  size = "md",
  className = "",
}: {
  variant?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  const f = files[variant];
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <Image
        src={f.src}
        width={f.width}
        height={f.height}
        alt={`${site.camp.brand} ${site.camp.name}`}
        className={size === "lg" ? "h-12 w-auto md:h-14" : "h-7 w-auto md:h-9"}
        preload={variant === "dark"}
      />
      <span className="text-label mt-1 leading-none" aria-hidden="true">
        {site.camp.name}
      </span>
    </span>
  );
}
