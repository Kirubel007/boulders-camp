import Image from "next/image";

const ratios = { "4/5": "aspect-[4/5]", "3/2": "aspect-[3/2]", "16/9": "aspect-[16/9]" } as const;

// The only way images are shown: fixed ratios, cover, square corners, no shadows, slow zoom on hover.
export default function ImageFrame({
  src,
  alt,
  ratio = "3/2",
  sizes = "(min-width: 768px) 50vw, 100vw",
  preload = false,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: keyof typeof ratios;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden bg-sand-2 ${ratios[ratio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-calm)] group-hover:scale-[1.04]"
      />
    </div>
  );
}
