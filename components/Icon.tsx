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
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  download: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />,
  bed: <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M3 18v2M21 18v2M6 9V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V9" />,
  pool: <path d="M3 15c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M3 19c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0M8 9h8" />,
  wind: <path d="M3 9h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h7" />,
  deck: <path d="M3 10h18M3 14h18M3 18h18M6 10v10M18 10v10M12 4l9 6H3Z" />,
  sala: <path d="M3 10 12 4l9 6M5 10v9M19 10v9M5 15h14M9 19v-4M15 19v-4" />,
  bath: <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM6 12V5.5A1.5 1.5 0 0 1 9 5M7 19l-1 2M17 19l1 2" />,
  plane: <path d="M10.5 13.5 3 11l1.5-1.5 7.5 1L16.5 6a2 2 0 0 1 3 3L15 13.5l1 7.5-1.5 1.5-2.5-7.5L9 18v2.5L7.5 22 6 18l-4-1.5L3.5 15H6Z" />,
  car: <path d="M5 16h14M5 16v2.5M19 16v2.5M3 12l2-5h14l2 5v4H3ZM3 12h18M7 14h.01M17 14h.01" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M16 5.5a3 3 0 0 1 0 5.5M21 19c0-2.4-1.6-4.2-4-4.8" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4.5" r="1.5" />
      <path d="m9 21 2.5-6 2.5 2.5V21M8 12l2-4 3.5-1 2.5 3.5 2.5 1M11.5 15 13 8" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="18" cy="16" r="3.5" />
      <path d="M6 16 9.5 9h6L18 16M9.5 9 12 16h-6M14 6h3" />
    </>
  ),
  glass: <path d="M8 3h8l-1 7a3 3 0 0 1-6 0ZM12 13v7M8.5 21h7M8.4 7h7.2" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
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
