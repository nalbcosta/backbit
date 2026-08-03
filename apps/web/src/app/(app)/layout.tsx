"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";

export default function PrivateAppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  if (pathname === "/onboarding") return children;

  return <AppShell>{children}</AppShell>;
}
