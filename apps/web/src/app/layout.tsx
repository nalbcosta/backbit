import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { APP_NAME } from "@/config/app";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME} — Seu backlog, finalmente jogável.`,
  description: "Um game tracker mobile-first para backlog, sessões, reviews e descoberta.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="light" className={`${geistSans.variable} ${playfair.variable}`}>
      <body>{children}<CookieConsent /></body>
    </html>
  );
}
