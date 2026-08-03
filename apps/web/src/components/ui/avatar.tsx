type AvatarProps = {
  name: string;
  src?: string;
  className?: string;
};

export function Avatar({ name, src, className = "" }: AvatarProps) {
  const initial = name.trim().at(0)?.toLocaleUpperCase("pt-BR") ?? "?";
  return (
    <div className={`flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--line) bg-(--surface-muted) text-xl font-semibold text-(--ink) ${className}`}>
      {src ? <img src={src} alt={`Avatar de ${name}`} className="size-full object-cover" /> : <span aria-label={`Avatar de ${name}`}>{initial}</span>}
    </div>
  );
}
