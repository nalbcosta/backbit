import type { NotificationItem } from "./notification.types";

export const mockNotifications: readonly NotificationItem[] = [
  {
    id: "after-winter-session",
    type: "game-activity",
    title: "Sessão registrada",
    description: "Você jogou 1h 35m de Depois do inverno.",
    createdAt: "2026-08-03T14:30:00.000Z",
    read: false,
    href: "/board",
  },
  {
    id: "small-suns-saved",
    type: "saved-game",
    title: "Jogo guardado",
    description: "Pequenos sóis entrou na sua lista para depois.",
    createdAt: "2026-08-02T19:00:00.000Z",
    read: false,
    href: "/board",
  },
  {
    id: "low-tide-reminder",
    type: "reminder",
    title: "Uma pausa para voltar",
    description: "Maré baixa está em pausa há alguns dias.",
    createdAt: "2026-07-30T10:00:00.000Z",
    read: true,
    href: "/board",
  },
] as const;
