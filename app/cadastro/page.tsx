import type { Metadata } from "next";
import Link from "next/link";
import Brand from "@/components/Brand";
import Icon from "@/components/Icon";
import ServiceRegistrationForm from "@/components/ServiceRegistrationForm";

export const metadata: Metadata = {
  title: "Cadastro de interesse",
  description:
    "Cadastre seu interesse em soluções de saneamento da Saneyá e prepare as informações para o primeiro atendimento.",
};

const registrationSteps = [
  "Conte o contexto e prepare o resumo no navegador.",
  "Revise, copie e envie pelo Instagram se desejar atendimento.",
  "Prazo e orçamento são alinhados antes de qualquer implantação.",
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
            <p className="eyebrow !text-brand-orange">Contrate uma solução</p>
            <h1 className="relative mt-4 text-balance text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl xl:text-6xl">
              Conte o que você precisa.
            </h1>
            <p className="relative mt-6 text-lg leading-8 text-white/70">
              Este cadastro organiza as informações iniciais para que a conversa comece com mais clareza técnica e comercial.
            </p>

            <ol className="relative mt-9 grid gap-3">
              {registrationSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-brand-navy">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm font-semibold leading-6 text-white/80">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <ServiceRegistrationForm />
        </div>
      </div>
    </main>
  );
}
