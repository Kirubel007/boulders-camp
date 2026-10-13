import Icon from "../Icon";

// Square outlined arrow plus a label. Renders a <button> (onClick) or an <a> (href).
export default function ArrowButton({
  label,
  href,
  onClick,
  className = "",
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center border border-current transition-colors duration-300 group-hover:bg-[var(--fg)] group-hover:text-[var(--ground)]">
        <Icon name="arrowRight" className="size-4" strokeWidth={1.5} />
      </span>
      <span className="text-label">{label}</span>
    </>
  );
  const cls = `group inline-flex min-h-11 items-center gap-4 text-left ${className}`;
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
