import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { PrivacySection } from "@/components/privacy/privacy-section";
import { APP_NAME } from "@/config/app";

const footerLinks = [
  { href: "/discover", label: "Descobrir" },
  { href: "/login", label: "Entrar" },
  { href: "/privacidade", label: "Privacidade", current: true },
] as const;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-(--canvas)">
      <SiteHeader
        logoHref="/"
        navigationLabel="Navegação principal"
        links={[{ href: "/discover", label: "Descobrir" }, { href: "/privacidade", label: "Privacidade", current: true }]}
        action={{ href: "/login", label: "Entrar" }}
      />

      <main id="topo">
        <Container className="py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Transparência sem rodapé escondido</p>
            <h1 className="display mt-4 text-5xl leading-[.98] sm:text-7xl">Política de privacidade.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-(--ink-muted)">
              O Backbit foi feito para organizar seus jogos, não para transformar sua rotina em
              um produto de publicidade. Esta página explica, em linguagem direta, quais dados
              usamos e por quê.
            </p>
            <p className="mt-5 text-xs text-(--ink-muted)">Última atualização: 31 de julho de 2026</p>
          </div>

          <div className="mt-16 max-w-4xl">
            <PrivacySection number="01" title="O que coletamos">
              <p>Ao criar uma conta, podemos solicitar nome, e-mail e senha. Durante o uso, armazenamos os jogos adicionados, status, avaliações, reviews e sessões que você escolhe registrar.</p>
              <p>Também recebemos dados técnicos básicos, como navegador, dispositivo e registros de erro, para manter o serviço seguro e funcionando.</p>
            </PrivacySection>
            <PrivacySection number="02" title="Como usamos seus dados">
              <p>Usamos esses dados para entregar as funções do Backbit: autenticar sua conta, sincronizar seu diário, sugerir descobertas e melhorar a experiência.</p>
              <p>Não vendemos seus dados pessoais. Não usamos o conteúdo do seu diário para publicidade comportamental.</p>
            </PrivacySection>
            <PrivacySection number="03" title="Cookies">
              <p>Cookies necessários mantêm preferências essenciais e sessões funcionando. Cookies opcionais podem ser usados para métricas agregadas de uso, somente quando você permitir pelo controle exibido no primeiro acesso.</p>
              <p>Você pode recusar os cookies opcionais e continuar usando o produto. A preferência fica salva no seu navegador e pode ser alterada quando o controle de cookies for disponibilizado novamente.</p>
            </PrivacySection>
            <PrivacySection number="04" title="Compartilhamento e serviços">
              <p>Compartilhamos informações apenas com fornecedores que ajudam a operar o Backbit, como hospedagem, banco de dados e monitoramento de erros. Esses fornecedores recebem somente o necessário para prestar o serviço e devem proteger as informações.</p>
              <p>Podemos divulgar dados quando a lei exigir ou para prevenir fraude, abuso e riscos à segurança.</p>
            </PrivacySection>
            <PrivacySection number="05" title="Seus direitos">
              <p>Você pode solicitar acesso, correção ou exclusão dos seus dados, além de retirar consentimentos quando aplicável. Para isso, entre em contato pelo canal de suporte associado à sua conta.</p>
              <p>Também é possível encerrar sua conta. Alguns registros poderão ser mantidos pelo período exigido por lei ou para resolver disputas.</p>
            </PrivacySection>
            <PrivacySection number="06" title="Fale com a gente">
              <p>Se algo nesta política não estiver claro, queremos saber. Envie sua dúvida pelo canal de suporte do Backbit e informe o e-mail usado na conta para agilizar o atendimento.</p>
              <p className="pt-2"><Link href="/" className="font-semibold text-(--ink) underline underline-offset-4">Voltar para o {APP_NAME}</Link></p>
            </PrivacySection>
          </div>
        </Container>
      </main>

      <SiteFooter logoHref="/" links={footerLinks} backToTopHref="#topo" />
    </div>
  );
}
