import { Compass } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";

export function DiscoverHeader() {
  return (
    <SiteHeader
      logoHref="/"
      navigationLabel="Navegação da descoberta"
      links={[
        { href: "/discover", label: "Descobrir", current: true },
        { href: "/register", label: "Criar conta" },
      ]}
      action={{
        href: "/register",
        label: "Começar",
        icon: <Compass aria-hidden="true" size={14} />,
      }}
      className="sticky top-0 z-30 bg-(--canvas)/95 backdrop-blur"
    />
  );
}
