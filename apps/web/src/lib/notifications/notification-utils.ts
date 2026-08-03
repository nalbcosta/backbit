import type { NotificationItem } from "./notification.types";

export function getUnreadNotificationCount(items: readonly NotificationItem[]) {
  return items.filter((item) => !item.read).length;
}

export function sortNotifications(items: readonly NotificationItem[]) {
  return [...items].sort((first, second) => {
    if (first.read !== second.read) return first.read ? 1 : -1;
    return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
  });
}

export function formatNotificationDate(createdAt: string) {
  const difference = Date.now() - new Date(createdAt).getTime();
  const hours = Math.max(0, Math.floor(difference / 3_600_000));
  if (hours < 1) return "Agora";
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Ontem" : `${days} dias`;
}
