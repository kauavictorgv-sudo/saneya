import Icon, { type IconName } from "@/components/Icon";

const principles: Array<{ title: string; description: string; icon: IconName }> = [
  { icon: "users", title: "Escuta e participação", description: "Necessidades e saberes locais orientam a construção da solução." },
  { icon: "shield", title: "Responsabilidade técnica", description: "A viabilidade é avaliada antes de qualquer promessa de implantação." },
  { icon: "wrench", title: "Cuidado que continua", description: "Capacitação e acompanhamento apoiam a operação e a manutenção." },
] as const;

export default function About() {
  return (
    <section id="sobre-saneya" className="section-shell section-grid bg-background" aria-labelledby="sobre-saneya-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
        <div className="relative overflow-hidden border-l-4 border-brand-orange py-2 pl-6 pr-5 sm:pl-9 sm:pr-8">
          <div className="about-brand-mark brand-watermark size-36 opacity-[0.05] sm:size-44 lg:size-52 lg:opacity-[0.065]" aria-hidden="true" />
          <p className="eyebrow relative z-10">Quem somos</p>
          <h2 id="sobre-saneya-title" className="section-title relative z-10 mt-5">Sobre o <span className="text-brand-orange">Saneyá</span></h2>
          <p className="relative z-10 mt-8 max-w-md text-2xl font-bold leading-9 text-brand-navy">Saneamento construído com quem vive o território.</p>
        </div>
        <div>
          <p className="max-w-4xl text-pretty text-xl leading-9 text-ink-700 sm:text-2xl sm:leading-10">O Saneyá conecta conhecimento técnico e participação local para ampliar o acesso ao saneamento e promover o uso responsável da água.</p>
          <p className="mt-6 max-w-4xl text-pretty text-base leading-8 text-ink-700 sm:text-lg">Cada atendimento começa pela escuta e pela avaliação das condições do local, conectando planejamento, implantação, capacitação e acompanhamento.</p>
          <ol className="mt-12 border-y border-brand-blue/20">
            {principles.map((principle, index) => (
              <li key={principle.title} className="water-row group grid gap-4 border-b border-brand-blue/15 py-6 last:border-b-0 sm:grid-cols-[3rem_3.5rem_0.7fr_1.3fr] sm:items-center">
                <span className="text-xs font-black tracking-[0.16em] text-brand-orange">0{index + 1}</span>
                <span className="flex size-11 items-center justify-center rounded-[1rem_0.3rem_1rem_1rem] bg-aqua-100 text-brand-blue transition group-hover:bg-brand-navy group-hover:text-white"><Icon name={principle.icon} className="size-5" /></span>
                <h3 className="text-lg font-bold text-brand-navy">{principle.title}</h3>
                <p className="leading-7 text-ink-700">{principle.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
