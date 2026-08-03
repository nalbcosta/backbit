"use client";

import { useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog } from "@/components/ui/dialog";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationItem } from "./notification-item";
import { NotificationTrigger } from "./notification-trigger";

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, ready, markAsRead, markAllAsRead, remove } = useNotifications();
  return <><NotificationTrigger unreadCount={unreadCount} onClick={() => setOpen(true)} />
    <Dialog open={open} onClose={() => setOpen(false)} title="Alertas" description="Acompanhe o que mudou no seu espaço.">
      <div className="flex items-center justify-between gap-4"><p className="text-sm text-(--ink-muted)">{unreadCount ? `${unreadCount} ${unreadCount === 1 ? "novo alerta" : "novos alertas"}` : "Tudo visto por aqui."}</p>{unreadCount > 0 && <button type="button" onClick={markAllAsRead} className="min-h-10 text-sm font-semibold text-(--accent) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)">Marcar todas como lidas</button>}</div>
      <div className="mt-5 space-y-3">{!ready ? <p className="py-8 text-center text-sm text-(--ink-muted)">Carregando alertas…</p> : notifications.length ? notifications.map((item) => <NotificationItem key={item.id} item={item} onRead={markAsRead} onRemove={remove} onClose={() => setOpen(false)} />) : <EmptyState title="Sem alertas por enquanto" description="Quando algo pedir sua atenção, aparece aqui." />}</div>
    </Dialog>
  </>;
}
