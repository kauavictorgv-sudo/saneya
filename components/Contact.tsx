import Link from "next/link";
import Icon from "@/components/Icon";

export default function Contact() {
  return (
    <section id="contato" className="bg-surface-blue px-5 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-10 lg:pb-14">
      <div className="final-cta relative mx-auto grid max-w-7xl gap-9 overflow-hidden rounded-[2rem] bg-brand-navy px-6 py-12 shadow-[var(--shadow-strong)] sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
        <div className="relative z-10 max-w-3xl">
          <p className="eyebrow !text-brand-orange">Próximo passo</p>
          <h2 className="section-title mt-4 !text-white">Vamos encontrar a solução adequada para o seu contexto?</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Envie seu pedido pelo formulário. A equipe da Saneyá analisará a
            necessidade e responderá pelo e-mail informado.
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/cadastro" className="button-primary">
            Solicitar atendimento
            <Icon name="clipboard" className="size-5" />
          </Link>
          <a href="#solucoes" className="button-inverse">
            Rever as soluções
            <Icon name="arrow" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
