import AnimatedNumber from "@/components/AnimatedNumber";
import Icon from "@/components/Icon";
import WaveEdges from "@/components/WaveEdges";

const impactGroups = [
  {
    title: "BET — Bacia de Evapotranspiração",
    items: [
      { value: 282000, suffix: " L", label: "de esgoto tratado por ano" },
      { value: 90, prefix: "+", suffix: "%", label: "de eficiência do sistema" },
      { value: 8, label: "pessoas com acesso a esgotamento sanitário" },
    ],
  },
  {
    title: "CAC — Captação de água da chuva",
    items: [
      { value: 1, label: "módulo instalado" },
      { value: 1, label: "comunidade beneficiada" },
      { value: 50, suffix: " L", label: "de armazenamento por módulo" },
    ],
  },
] as const;

export default function Impact() {
  return (
    <section id="impacto" className="section-shell impact-background overflow-hidden bg-gradient-to-br from-brand-navy to-brand-blue text-background">
      <WaveEdges />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="eyebrow !text-brand-orange">Evidências</p><h2 className="section-title mt-5 !text-background">Impactos que podem ser conferidos</h2></div><p className="text-lg leading-8 text-background/75">Indicadores de saneamento e captação de água da chuva informados pela equipe da Saneyá.</p></div>
        <div className="mt-12 grid gap-10">
          {impactGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xl font-bold sm:text-2xl">{group.title}</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {group.items.map(({ label, ...number }) => (
                  <li key={label} className="water-card water-card--dark flow-panel border border-white/25 bg-white/[0.1] p-5 sm:p-6">
                    <Icon name="chart" className="mb-4 size-5 text-brand-orange" />
                    <p className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.05em] text-white"><AnimatedNumber {...number} /></p>
                    <p className="mt-4 text-base font-semibold leading-6">{label}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-background/75">O relatório institucional informa uma BET em operação em Fincão, Taquara/RJ. O total de duas BETs construídas segue em validação técnica.</p>
      </div>
    </section>
  );
}
