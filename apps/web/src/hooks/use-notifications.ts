"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { mockNotifications } from "@/lib/notifications/mock-notifications";
import { readStoredNotifications, writeStoredNotifications } from "@/lib/notifications/notification-storage";
import { getUnreadNotificationCount, sortNotifications } from "@/lib/notifications/notification-utils";
import type { NotificationItem } from "@/lib/notifications/notification.types";

export function useNotifications() {
  const [items, setItems] = useState<readonly NotificationItem[] | null>(null);
  useEffect(() => { setItems(readStoredNotifications(window.localStorage) ?? mockNotifications); }, []);

  const persist = useCallback((next: readonly NotificationItem[]) => {
    writeStoredNotifications(window.localStorage, next);
    setItems(next);
  }, []);
  const markAsRead = useCallback((id: string) => {
    if (!items) return;
    persist(items.map((item) => item.id === id ? { ...item, read: true } : item));
  }, [items, persist]);
  const markAllAsRead = useCallback(() => { if (items) persist(items.map((item) => ({ ...item, read: true }))); }, [items, persist]);
  const remove = useCallback((id: string) => { if (items) persist(items.filter((item) => item.id !== id)); }, [items, persist]);

  const notifications = useMemo(() => items ? sortNotifications(items) : [], [items]);
  return { notifications, unreadCount: getUnreadNotificationCount(notifications), ready: items !== null, markAsRead, markAllAsRead, remove };
}
