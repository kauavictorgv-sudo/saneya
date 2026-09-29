import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { environmentalServices } from "@/lib/site-content";

const complementarySolutions: Array<{ id: string; status: string; icon: IconName; title: string; description: string; items: string[] }> = [
  { id: "servico-cac", status: "Módulo separado", icon: "droplet", title: "CAC — Água da chuva", description: "Captação dimensionada para usos não potáveis, com objetivo, segurança e métricas próprios.", items: ["Uso definido", "Balanço hídrico", "Qualidade e manutenção"] },
  { id: "servico-educacao-ambiental", status: "Parte do método", icon: "graduation", title: "Educação ambiental", description: "Capacitação para adoção, uso seguro, manutenção e participação comunitária.", items: ["Linguagem visual", "Aprendizagem verificada", "Responsáveis locais"] },
  { id: "servico-mobilizacao", status: "Ação complementar", icon: "users", title: "Mobilização", description: "Atividades conectadas à escuta, à adoção e à continuidade das soluções.", items: ["Escuta local", "Ações educativas", "Articulação de parceiros"] },
];

function BetDiagram() {
  return (
    <div className="flow-panel relative min-h-72 overflow-hidden bg-background p-6 text-brand-navy shadow-[var(--shadow-image)] sm:p-8">
      <p className="relative flex items-center gap-3 text-sm font-bold"><Icon name="building" className="size-5 text-brand-orange" />Águas negras direcionadas com segurança</p>
      <div className="relative mt-14 border-2 border-brand-blue bg-white p-4"><span className="absolute -top-9 left-1/2 h-9 w-3 -translate-x-1/2 rounded-t-full bg-brand-blue" aria-hidden="true" /><div className="h-7 bg-aqua-100" /><div className="mt-2 h-9 bg-sand-300" /><div className="mt-2 h-12 bg-brand-blue" /><div className="mt-4 flex justify-between gap-4 text-xs font-bold text-ink-600"><span>Sistema impermeabilizado</span><span className="text-right">Planejamento obrigatório</span></div></div>
    </div>
  );
}

export default function Solutions() {
  return (
    <section id="solucoes" className="section-shell bg-surface-blue">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow">Atlas de soluções</p><h2 className="section-title mt-5">Uma entrega completa, <span className="text-brand-blue">não apenas uma obra.</span></h2></div><p className="section-lead">A tecnologia é uma parte do serviço. Diagnóstico, responsabilidade técnica, formação local e acompanhamento completam a solução.</p></div>
        <article id="servico-bet" className="water-card water-card--dark flow-frame relative mt-16 grid scroll-mt-36 gap-10 overflow-hidden bg-brand-navy p-6 text-white shadow-[var(--shadow-strong)] sm:p-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-end xl:p-14">
          <div className="relative z-10"><p className="text-xs font-black uppercase tracking-[0.18em] text-brand-orange">Solução 01 · sujeita à elegibilidade</p><h3 className="mt-6 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">BET — Bacia de Evapotranspiração</h3><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Tratamento descentralizado de águas negras em locais tecnicamente compatíveis e sem conexão viável à rede.</p>
            <ul className="mt-8 grid border-y border-white/20 sm:grid-cols-2">{["Avaliação técnica do local", "Plano e responsabilidades", "Implantação participativa", "Capacitação e acompanhamento"].map((item, index) => <li key={item} className="flex items-center gap-3 border-b border-white/15 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:nth-[2]:border-r-0 sm:nth-[4]:border-r-0"><span className="text-[0.65rem] font-black text-brand-orange">0{index + 1}</span>{item}</li>)}</ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/cadastro" className="button-primary">Contratar esta solução <Icon name="arrow" className="size-4" /></Link><a href="#como-funciona" className="button-inverse">Ver o percurso <Icon name="arrow" className="size-4" /></a></div></div>
          <BetDiagram />
        </article>
        <div className="mt-10 border-y-2 border-brand-navy">
          {complementarySolutions.map((solution, index) => (
            <article key={solution.title} id={solution.id} className="water-row group grid scroll-mt-36 gap-5 border-b border-brand-blue/20 py-7 last:border-b-0 md:grid-cols-[4rem_0.7fr_1.2fr_auto] md:items-center md:gap-8 md:py-9">
              <span className="flex size-12 items-center justify-center rounded-[1rem_0.3rem_1rem_1rem] bg-aqua-100 text-brand-blue transition group-hover:bg-brand-navy group-hover:text-white"><Icon name={solution.icon} className="size-5" /></span>
              <div><p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-brand-orange">Solução 0{index + 2} · {solution.status}</p><h3 className="mt-2 text-2xl font-bold text-brand-navy">{solution.title}</h3></div>
              <div><p className="leading-7 text-ink-700">{solution.description}</p><p className="mt-2 text-xs font-bold text-brand-blue">{solution.items.join(" · ")}</p></div>
              <Link href="/cadastro" className="water-text-link water-no-waves inline-flex items-center gap-2 text-sm font-black text-brand-navy transition hover:text-brand-blue">Tenho interesse <Icon name="arrow" className="size-4 text-brand-orange" /></Link>
            </article>
          ))}
        </div>
        <div className="mt-14">
          <p className="eyebrow">Serviços de educação ambiental</p>
          <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-2">
            {environmentalServices.map((service) => (
              <article key={service.id} id={service.id} className="surface-card scroll-mt-36 p-6 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-aqua-100 text-brand-blue">
                  <Icon name={service.id === "servico-mutiroes-praia" ? "users" : "graduation"} className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-brand-navy">{service.title}</h3>
                <ul className="mt-6 grid gap-4 text-ink-700">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-7">
                      <Icon name="check" className="mt-1 size-5 shrink-0 text-brand-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
