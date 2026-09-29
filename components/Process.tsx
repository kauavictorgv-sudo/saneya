import Icon from "@/components/Icon";
import { processSteps } from "@/lib/site-content";

export default function Process() {
  return (
    <section id="como-funciona" className="section-shell bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">Percurso Saneyá</p><h2 className="section-title mt-5">Da escuta ao acompanhamento.</h2></div><p className="section-lead">Um processo claro reduz risco e define quem decide, quem executa e quem mantém cada unidade.</p></div>
        <ol className="relative mt-16 before:absolute before:bottom-0 before:left-[1.4rem] before:top-0 before:w-0.5 before:bg-brand-blue/25 lg:before:left-1/2">
          {processSteps.map((step, index) => (
            <li key={step.title} className={`relative mb-5 grid pl-16 lg:grid-cols-2 lg:pl-0 ${index % 2 ? "lg:[&>article]:col-start-2 lg:[&>article]:ml-14" : "lg:[&>article]:mr-14 lg:[&>article]:text-right"}`}>
              <span className="absolute left-0 top-5 z-10 flex size-12 items-center justify-center rounded-[1rem_0.3rem_1rem_1rem] border-4 border-background bg-brand-navy text-xs font-black text-white lg:left-1/2 lg:-translate-x-1/2">0{index + 1}</span>
              <article className="water-card border-t-2 border-brand-orange bg-surface px-6 py-7 shadow-[var(--shadow-soft)]"><h3 className="text-xl font-bold text-brand-navy">{step.title}</h3><p className="mt-3 leading-7 text-ink-700">{step.description}</p></article>
            </li>
          ))}
        </ol>
        <aside className="mt-10 grid gap-5 border-l-4 border-brand-orange bg-surface-blue p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8 lg:mx-auto lg:max-w-4xl"><Icon name="shield" className="size-7 text-brand-blue" /><p className="leading-7 text-ink-700"><strong className="block text-brand-navy">A avaliação vem antes da promessa</strong>Se o local não for elegível, o motivo é registrado e uma alternativa segura pode ser orientada.</p></aside>
      </div>
    </section>
  );
}
