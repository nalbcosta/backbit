import Link from "next/link";
import { BellRing, Bookmark, Clock3, Trash2 } from "lucide-react";
import { formatNotificationDate } from "@/lib/notifications/notification-utils";
import type { NotificationItem as NotificationItemData } from "@/lib/notifications/notification.types";

const notificationIcons = { "game-activity": BellRing, "saved-game": Bookmark, reminder: Clock3 } as const;

export function NotificationItem({ item, onRead, onRemove, onClose }: { item: NotificationItemData; onRead: (id: string) => void; onRemove: (id: string) => void; onClose: () => void }) {
  const Icon = notificationIcons[item.type];
  const content = <><Icon aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-(--ink-muted)" /><span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="font-semibold text-(--ink)">{item.title}</span>{!item.read && <span className="size-2 rounded-full bg-(--accent)" aria-label="Não lida" />}</span><span className="mt-1 block text-sm leading-5 text-(--ink-muted)">{item.description}</span><span className="mt-2 block text-xs text-(--ink-muted)">{formatNotificationDate(item.createdAt)}</span></span></>;
  return <article className={`flex gap-3 rounded-2xl border p-4 ${item.read ? "border-(--line) bg-(--surface)" : "border-(--line) bg-(--surface-muted)/45"}`}>
    {item.href ? <Link href={item.href} onClick={() => { onRead(item.id); onClose(); }} className="flex min-w-0 flex-1 gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)">{content}</Link> : <button type="button" onClick={() => onRead(item.id)} className="flex min-w-0 flex-1 gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)">{content}</button>}
    <button type="button" aria-label={`Remover ${item.title}`} onClick={() => onRemove(item.id)} className="inline-flex size-10 shrink-0 items-center justify-center self-start rounded-full text-(--ink-muted) hover:bg-(--surface-muted) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"><Trash2 aria-hidden="true" size={16} /></button>
  </article>;
}
