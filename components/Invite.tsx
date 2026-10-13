import { home } from "@/lib/content";
import PhotoBand from "./PhotoBand";
import Reveal from "./Reveal";
import { ButtonLink } from "./ui/Button";

// A cinematic pause between sections: one line, one call to action, over a fixed night photograph.
export default function Invite() {
  const { invite } = home;
  return (
    <PhotoBand image={invite.image} labelledBy="invite-title">
      <Reveal>
        <p className="text-label text-eyebrow text-glow">{invite.eyebrow}</p>
        <h2 id="invite-title" className="text-h1 text-glow mx-auto mt-5 max-w-[16ch] text-balance">
          {invite.title}
        </h2>
        <div className="mt-10">
          <ButtonLink href={invite.cta.href} variant="gold">
            {invite.cta.label}
          </ButtonLink>
        </div>
      </Reveal>
    </PhotoBand>
  );
}
