export function SectionHeading({
  label,
  title,
  description,
  dark = false
}: {
  label: string;
  title?: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12">
      <p className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-[#999]" : "text-[var(--muted)]"}`}>
        ({label})
      </p>
      {title ? (
        <h2 className={`mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl ${dark ? "text-[var(--inverse-fg)]" : "text-[var(--fg)]"}`}>
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={`mt-3 max-w-2xl text-base leading-8 ${dark ? "text-[#999]" : "text-[var(--muted)]"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
