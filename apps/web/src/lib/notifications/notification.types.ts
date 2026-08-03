export const NOTIFICATIONS_VERSION = 1;
export const NOTIFICATIONS_STORAGE_KEY = `backbit-notifications-v${NOTIFICATIONS_VERSION}`;

export type NotificationType = "game-activity" | "saved-game" | "reminder";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string;
};
