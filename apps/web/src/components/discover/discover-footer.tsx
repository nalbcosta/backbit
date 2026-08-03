import { SiteFooter } from "@/components/ui/site-footer";

export function DiscoverFooter() {
  return (
    <SiteFooter
      logoHref="/"
      backToTopHref="#discover-top"
      links={[
        { href: "/", label: "Início" },
        { href: "/discover", label: "Descobrir", current: true },
        { href: "/register", label: "Criar conta" },
      ]}
    />
  );
}
