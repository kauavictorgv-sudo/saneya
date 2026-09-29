import Icon from "@/components/Icon";

const problems = [
  { icon: "building" as const, title: "Infraestrutura insuficiente", description: "Nem toda família ou espaço comunitário possui conexão viável a uma rede de esgoto segura." },
  { icon: "shield" as const, title: "Risco sanitário e ambiental", description: "A destinação inadequada pode afetar o entorno, os recursos hídricos e a segurança das pessoas." },
  { icon: "wrench" as const, title: "Soluções sem continuidade", description: "Uma obra sem responsáveis, capacitação e manutenção não garante funcionamento duradouro." },
];

export default function Problem() {
  return (
    <section id="empresa" className="section-shell bg-sand-100">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl"><p className="eyebrow">O ponto de partida</p><h2 className="section-title mt-5">Onde a rede não chega, <span className="text-brand-blue">o risco permanece.</span></h2></div>
        <div className="mt-14 grid overflow-hidden border-y-2 border-brand-navy md:grid-cols-[1.18fr_0.82fr_1.05fr]">
          {problems.map((problem, index) => (
            <article key={problem.title} className="water-row group relative border-b border-brand-blue/20 px-5 py-9 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:last:border-r-0 lg:px-9 lg:py-12">
              <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[0.18em] text-brand-orange">DIAGNÓSTICO 0{index + 1}</span><Icon name={problem.icon} className="size-6 text-brand-blue transition group-hover:translate-x-1" /></div>
              <h3 className="mt-10 text-2xl font-bold leading-8 text-brand-navy">{problem.title}</h3>
              <p className="mt-4 leading-7 text-ink-700">{problem.description}</p>
            </article>
          ))}
        </div>
        <aside className="flow-panel mx-auto mt-8 flex max-w-4xl flex-col items-center border border-white/25 bg-brand-navy px-6 py-9 text-center text-white shadow-[var(--shadow-lifted)] sm:px-10 sm:py-11">
          <span className="flex size-14 items-center justify-center rounded-[1.15rem_0.35rem_1.15rem_1.15rem] bg-brand-orange text-brand-navy shadow-[var(--shadow-orange-soft)]">
            <Icon name="chart" className="size-6" />
          </span>
          <span className="flow-line mt-6 w-16" aria-hidden="true" />
          <h3 className="mt-5 text-xl font-bold text-white sm:text-2xl">
            Nosso compromisso com os dados
          </h3>
          <p className="mt-3 max-w-2xl text-pretty leading-7 text-white/75">
            Estatísticas territoriais só serão publicadas com indicador,
            recorte, ano-base e fonte verificável.
          </p>
        </aside>
      </div>
    </section>
  );
}
