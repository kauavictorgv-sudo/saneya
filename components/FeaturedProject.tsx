import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

const projectFacts = [["Território", "Fincão, Taquara/RJ"], ["Solução", "Bacia de Evapotranspiração"], ["Status público", "Operação informada no Relatório de Gestão 2025"], ["Última verificação", "Em confirmação com a equipe"]] as const;

export default function FeaturedProject() {
  return (
    <section className="section-shell bg-sand-100" aria-labelledby="case-title">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <figure className="flow-frame relative min-h-[38rem] overflow-hidden bg-brand-navy shadow-[var(--shadow-strong)] lg:min-h-[44rem]">
            <Image src="/saneya-featured-project.jpg" alt="Equipe durante atividade de implantação da solução comunitária de saneamento" fill sizes="(max-width: 1279px) 100vw, 1280px" className="object-cover object-[50%_38%] transition duration-700 hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/10 to-transparent" aria-hidden="true" />
            <div className="flow-panel absolute right-5 top-5 flex items-center gap-3 bg-background/95 px-4 py-3 text-brand-navy shadow-lg sm:right-8 sm:top-8"><Icon name="map" className="size-5 text-brand-orange" /><span className="text-sm font-bold">Fincão · Taquara/RJ</span></div>
          </figure>
          <div className="water-card flow-panel relative z-10 -mt-24 ml-4 bg-surface p-7 shadow-[var(--shadow-lifted)] sm:ml-10 sm:p-9 lg:absolute lg:bottom-10 lg:left-10 lg:ml-0 lg:max-w-xl">
            <p className="eyebrow">Caso em destaque</p><h2 id="case-title" className="mt-5 text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-brand-navy sm:text-5xl">Comunidades: da necessidade à solução</h2>
            <p className="mt-6 leading-7 text-ink-700">Um caso completo mostra contexto, decisão técnica, construção, responsáveis locais e situação atual — não apenas a inauguração.</p>
            <Link href="/cadastro" className="button-primary mt-8 w-fit">Quero uma solução como esta <Icon name="arrow" className="size-4" /></Link>
          </div>
        </div>
        <dl className="mt-8 grid border-y-2 border-brand-navy md:grid-cols-4">{projectFacts.map(([term, value]) => <div key={term} className="border-b border-brand-blue/20 px-5 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"><dt className="text-sm font-bold text-ink-600">{term}</dt><dd className="mt-2 font-semibold leading-6 text-brand-navy">{value}</dd></div>)}</dl>
      </div>
    </section>
  );
}
