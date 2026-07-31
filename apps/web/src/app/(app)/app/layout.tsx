import type { ReactNode } from "react";

import { AppShell } from "@/components/app/app-shell";

export default function PrivateAppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
