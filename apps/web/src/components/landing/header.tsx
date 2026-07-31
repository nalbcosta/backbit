import { SiteHeader } from "@/components/ui/site-header";

export function Header() {
  return (
    <SiteHeader
      logoHref="#inicio"
      navigationLabel="Navegação principal"
      containerClassName="min-h-18"
      navigationClassName="hidden gap-6 text-sm text-(--ink-muted) md:flex"
      links={[
        { href: "#como-funciona", label: "Como funciona" },
        { href: "/discover", label: "Descobrir" },
      ]}
      action={{ href: "/login", label: "Entrar" }}
      className="landing-header"
    />
  );
}
