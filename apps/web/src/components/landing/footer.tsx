import { SiteFooter } from "@/components/ui/site-footer";

export function Footer() {
  return (
    <SiteFooter
      logoHref="#inicio"
      backToTopHref="#inicio"
      links={[
        { href: "#como-funciona", label: "Como funciona" },
        { href: "/discover", label: "Descobrir" },
        { href: "/login", label: "Entrar" },
        { href: "/privacidade", label: "Privacidade" },
      ]}
    />
  );
}
