import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Playfair_Display } from "next/font/google";
import { APP_NAME } from "@/config/app";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} — Seu backlog, finalmente jogável.`,
  description:
    "Um game tracker mobile-first para backlog, sessões, reviews e descoberta.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${playfair.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try { const theme = localStorage.getItem("backbit-theme"); if (theme === "dark" || theme === "light") document.documentElement.dataset.theme = theme; } catch {}`}
        </Script>
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
