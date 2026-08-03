import type { ReactNode } from "react";

/** The private shell is applied by the parent route group. */
export default function AppRouteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
