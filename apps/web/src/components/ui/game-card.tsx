import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export type GameCardData = {
  status: string;
  meta: string;
  title: string;
  description: string;
  footer?: ReactNode;
};

type GameCardProps = GameCardData & { className?: string };

export function GameCard({
  status,
  meta,
  title,
  description,
  footer,
  className = "",
}: GameCardProps) {
  return (
    <article
      aria-label={`${title}, ${status}`}
      className={`art min-h-96 p-5 sm:p-8 ${className}`}
    >
      <div className="flex justify-between text-xs uppercase tracking-[.13em]">
        <Badge variant="inverse">{status}</Badge>
        <Badge variant="inverse">{meta}</Badge>
      </div>
      <div className="art-rule mt-28 border-t pt-5">
        <p className="art-muted text-xs uppercase tracking-[.13em]">
          Sessão de hoje
        </p>
        <h2 className="display mt-2 text-4xl leading-none">{title}</h2>
        <p className="art-muted mt-5 max-w-58 text-sm leading-6">
          {description}
        </p>
        {footer}
      </div>
    </article>
  );
}
