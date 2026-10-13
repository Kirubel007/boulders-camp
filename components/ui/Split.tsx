import ImageFrame from "./ImageFrame";
import Reveal from "../Reveal";
import type { ImageRef } from "@/lib/content";

// Two-column split: text beside one image. On mobile the image always comes first.
export default function Split({
  image,
  ratio = "4/5",
  imageSide = "right",
  children,
}: {
  image: ImageRef;
  ratio?: "4/5" | "3/2";
  imageSide?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
      <Reveal className={imageSide === "right" ? "md:order-2" : ""}>
        <ImageFrame src={image.src} alt={image.alt} ratio={ratio} />
      </Reveal>
      <Reveal>{children}</Reveal>
    </div>
  );
}
