import type { Metadata } from "next";
import Link from "next/link";
import Brand from "@/components/Brand";
import Icon from "@/components/Icon";
import ServiceRegistrationForm from "@/components/ServiceRegistrationForm";

export const metadata: Metadata = {
  title: "Solicitar atendimento",
  description:
    "Envie seu pedido de atendimento à Saneyá e receba o retorno da equipe por e-mail.",
};

const registrationSteps = [
  "Informe seu contato, o serviço e o que você precisa.",
  "Envie seu pedido pelo formulário.",
  "Aguarde o contato da equipe por e-mail.",
];

export default function RegistrationPage() {
  return (
    <main className="section-grid min-h-screen bg-surface-blue px-5 py-5 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="surface-card flex flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <Link href="/" aria-label="Saneyá — voltar ao site" className="water-logo rounded-md py-2 focus-visible:outline-offset-4">
            <Brand />
          </Link>
          <Link href="/" className="button-secondary min-h-11" aria-label="Voltar ao site">
            <Icon name="chevron" className="size-4 rotate-90" />
            <span className="hidden sm:inline">Voltar ao site</span>
          </Link>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start xl:mt-8">
          <section className="relative max-w-xl overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-[var(--shadow-strong)] sm:p-10 lg:sticky lg:top-8 lg:max-w-none">
            <div className="brand-watermark -bottom-20 -right-16 size-56 opacity-[0.075] sm:-bottom-24 sm:-right-20 sm:size-72 lg:opacity-[0.09]" aria-hidden="true" />
            <h1 className="relative text-balance text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl xl:text-6xl">
              Conte o que você precisa.
            </h1>
            <p className="relative mt-6 text-lg leading-8 text-white/70">
              Vamos entender sua necessidade e conversar sobre a solução mais adequada.
            </p>

            <ol className="relative mt-9 border-y border-white/20">
              {registrationSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 border-b border-white/20 py-5 last:border-b-0">
                  <span className="flex size-8 shrink-0 items-center justify-center text-sm font-bold text-brand-orange">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-base font-semibold leading-7 text-white/85">{step}</span>
                </li>
              ))}
            </ol>
            <p className="relative mt-6 text-sm leading-6 text-white/85">Durante o atendimento, alinhamos a solução, o orçamento e os próximos passos com você.</p>
          </section>

          <ServiceRegistrationForm />
        </div>
      </div>
    </main>
  );
}
