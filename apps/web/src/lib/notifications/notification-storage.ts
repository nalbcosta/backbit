import { NOTIFICATIONS_STORAGE_KEY, type NotificationItem } from "./notification.types";

export function parseStoredNotifications(value: string | null): NotificationItem[] | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    const valid = parsed.every((item) =>
      typeof item === "object" && item !== null &&
      "id" in item && typeof item.id === "string" &&
      "type" in item && (item.type === "game-activity" || item.type === "saved-game" || item.type === "reminder") &&
      "title" in item && typeof item.title === "string" &&
      "description" in item && typeof item.description === "string" &&
      "createdAt" in item && typeof item.createdAt === "string" &&
      "read" in item && typeof item.read === "boolean",
    );
    return valid ? parsed as NotificationItem[] : null;
  } catch {
    return null;
  }
}

export function readStoredNotifications(storage: Storage) {
  return parseStoredNotifications(storage.getItem(NOTIFICATIONS_STORAGE_KEY));
}

export function writeStoredNotifications(storage: Storage, items: readonly NotificationItem[]) {
  storage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(items));
}
