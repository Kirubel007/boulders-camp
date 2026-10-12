// Minimal line icons, drawn inline so they cost no extra requests.
const paths: Record<string, React.ReactNode> = {
  tent: <path d="M3 20 12 4l9 16M8.5 20 12 13l3.5 7M2 20h20" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7Z" />,
  leaf: <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Zm0 0 7-7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  arrowLeft: <path d="M15 5l-7 7 7 7" />,
  arrowRight: <path d="M9 5l7 7-7 7" />,
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="M8 5v14l11-7Z" />,
  check: <path d="M5 12.5 10 17 19 7" />,
  download: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />,
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm-3.2 5.2c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.8 1.8c0 .2 0 .3-.1.5l-.5.6c-.1.1-.2.3 0 .5a6.6 6.6 0 0 0 3.2 2.8c.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.3.2.3.3 0 .6-.3 1.4-1 1.7-.7.4-1.6.5-3.3-.2a9 9 0 0 1-4-3.6c-.6-.9-.9-1.9-.8-2.6 0-.7.3-1.2.5-1.7Z" />
  ),
};

export default function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.25,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const filled = name === "whatsapp";
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      fillRule="evenodd"
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
