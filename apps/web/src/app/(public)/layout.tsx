import type { ReactNode } from "react";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

type PublicLayoutProps = Readonly<{ children: ReactNode }>;

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
