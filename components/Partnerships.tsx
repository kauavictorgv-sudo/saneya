import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

const servicePaths: Array<{ audience: string; icon: IconName; title: string; description: string; items: string[]; cta: string; featured?: boolean }> = [
  { audience: "Primeiro atendimento", icon: "map", title: "Avaliação e diagnóstico", description: "Entenda a viabilidade antes de definir obra, prazo ou investimento.", items: ["Triagem inicial", "Avaliação do local", "Escopo recomendado"], cta: "Solicitar avaliação" },
  { audience: "Serviço completo", icon: "building", title: "Implantação da solução", description: "Planejamento, implantação participativa, capacitação e entrega acompanhada.", items: ["Proposta e orçamento", "Execução técnica", "Capacitação local"], cta: "Contratar implantação", featured: true },
  { audience: "Continuidade", icon: "wrench", title: "Acompanhamento da unidade", description: "Inspeções, orientações de manutenção e registro da situação da unidade.", items: ["Rotina de inspeção", "Orientação", "Registro técnico"], cta: "Solicitar acompanhamento" },
];

export default function CommercialOptions() {
  return (
    <section id="contratacao" className="section-shell bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl"><p className="eyebrow">Formas de contratação</p><h2 className="section-title mt-5">Escolha o ponto de entrada. <span className="text-brand-blue">A equipe orienta o caminho.</span></h2><p className="section-lead mt-7">O cadastro inicial organiza contexto, elegibilidade, escopo, prazo e orçamento.</p></div>
        <div className="mt-14 border-y-2 border-brand-navy">
          {servicePaths.map((path, index) => (
            <article key={path.title} className={`water-card grid gap-6 border-b border-brand-blue/20 p-6 last:border-b-0 md:grid-cols-[4rem_0.7fr_1.15fr_auto] md:items-center md:p-8 ${path.featured ? "water-card--dark bg-brand-navy text-white" : ""}`}>
              <span className={`flex size-12 items-center justify-center rounded-[1rem_0.3rem_1rem_1rem] ${path.featured ? "bg-brand-orange text-brand-navy" : "bg-aqua-100 text-brand-blue"}`}><Icon name={path.icon} className="size-5" /></span>
              <div><p className={`text-[0.65rem] font-black uppercase tracking-[0.16em] ${path.featured ? "text-brand-orange" : "text-brand-blue"}`}>0{index + 1} · {path.audience}</p><h3 className={`mt-2 text-2xl font-bold ${path.featured ? "text-white" : "text-brand-navy"}`}>{path.title}</h3></div>
              <div><p className={`leading-7 ${path.featured ? "text-white/70" : "text-ink-700"}`}>{path.description}</p><p className={`mt-2 text-xs font-bold ${path.featured ? "text-white/80" : "text-brand-blue"}`}>{path.items.join(" · ")}</p></div>
              <Link href="/cadastro" className={path.featured ? "button-primary" : "button-secondary"}>{path.cta}<Icon name="arrow" className="size-4" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
