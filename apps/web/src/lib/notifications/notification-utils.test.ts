import { describe, expect, it } from "vitest";
import { mockNotifications } from "./mock-notifications";
import { parseStoredNotifications } from "./notification-storage";
import { getUnreadNotificationCount, sortNotifications } from "./notification-utils";

describe("alertas", () => {
  it("prioriza alertas não lidos e conta pendências", () => {
    const sorted = sortNotifications(mockNotifications);
    expect(sorted[0]?.read).toBe(false);
    expect(getUnreadNotificationCount(mockNotifications)).toBe(2);
  });

  it("aceita somente o formato válido no armazenamento", () => {
    expect(parseStoredNotifications(JSON.stringify(mockNotifications))).toHaveLength(3);
    expect(parseStoredNotifications("invalido")).toBeNull();
    expect(parseStoredNotifications(JSON.stringify([{ id: "sem-campos" }]))).toBeNull();
  });
});
