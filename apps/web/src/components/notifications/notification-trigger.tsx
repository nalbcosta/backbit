import { Bell } from "lucide-react";

export function NotificationTrigger({ unreadCount, onClick }: { unreadCount: number; onClick: () => void }) {
  const label = unreadCount ? `${unreadCount} notificações não lidas` : "Notificações";
  return <button type="button" aria-label={label} aria-haspopup="dialog" onClick={onClick} className="relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-(--line) text-(--ink) transition-colors hover:border-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"><Bell aria-hidden="true" size={17} strokeWidth={1.75} />{unreadCount > 0 && <span aria-hidden="true" className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-(--accent) text-[.62rem] font-bold text-(--accent-ink)">{unreadCount > 9 ? "9+" : unreadCount}</span>}</button>;
}
