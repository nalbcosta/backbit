type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const placement = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${placement}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-4 text-4xl leading-[.97] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-7 text-(--ink-muted)">
          {description}
        </p>
      )}
    </div>
  );
}
