import AnimatedNumber from "@/components/AnimatedNumber";
import Icon from "@/components/Icon";
import WaveEdges from "@/components/WaveEdges";

const impactItems = [
  { value: 2, suffix: "", label: "BETs construídas", context: "Informação em validação técnica pela equipe da Saneyá." },
  { value: 1, suffix: "", label: "unidade informada em operação", context: "Unidade localizada em Fincão, Taquara/RJ, no relatório institucional." },
  { value: 280000, suffix: " L", label: "litros de esgoto tratados por ano", context: "Dado anual informado pela equipe da Saneyá." },
] as const;

export default function Impact() {
  const featured = impactItems[2];
  return (
    <section id="impacto" className="section-shell impact-background overflow-hidden bg-gradient-to-br from-brand-navy to-brand-blue text-background">
      <WaveEdges />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="eyebrow !text-brand-orange">Evidências</p><h2 className="section-title mt-5 !text-background">Impactos que podem ser conferidos</h2></div><p className="text-lg leading-8 text-background/75">Número sem método não entra em destaque. Capacidade projetada, estimativa e medição real são identificadas separadamente.</p></div>
        <div className="mt-16 grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
          <article className="water-card water-card--dark flow-frame relative min-h-[25rem] overflow-hidden border border-white/30 bg-white/[0.09] p-7 backdrop-blur sm:p-10">
            <p className="text-[clamp(4rem,10vw,8.5rem)] font-bold leading-none tracking-[-0.07em] text-white"><AnimatedNumber value={featured.value} suffix={featured.suffix} /></p>
            <div className="absolute bottom-7 left-7 right-7 border-t border-white/25 pt-6 sm:bottom-10 sm:left-10 sm:right-10"><h3 className="text-2xl font-bold">{featured.label}</h3><p className="mt-3 text-sm leading-6 text-white/65">{featured.context}</p></div>
          </article>
          <div className="grid gap-5">
            {impactItems.slice(0, 2).map((item) => <article key={item.label} className="water-card water-card--dark flow-panel border border-white/25 bg-white/[0.1] p-7"><div className="flex items-start justify-between"><p className="text-5xl font-bold tracking-[-0.05em]"><AnimatedNumber value={item.value} suffix={item.suffix} /></p><Icon name="chart" className="size-5 text-brand-orange" /></div><h3 className="mt-6 text-lg font-bold">{item.label}</h3><p className="mt-2 text-sm leading-6 text-white/65">{item.context}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
