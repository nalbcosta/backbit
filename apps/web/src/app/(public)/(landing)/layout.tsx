import type { ReactNode } from "react";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

type LandingLayoutProps = Readonly<{ children: ReactNode }>;

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
