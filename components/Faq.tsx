import Icon from "@/components/Icon";
import WaveEdges from "@/components/WaveEdges";
import { faqItems } from "@/lib/site-content";

export default function Faq() {
  return (
    <section id="duvidas" className="faq-water-surface section-shell relative isolate overflow-hidden">
      <WaveEdges variant="ambient" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="section-title mt-5">
            Informação clara antes de qualquer decisão.
          </h2>
          <p className="section-lead mt-7">
            Respostas diretas sobre diagnóstico, implantação, participação local
            e acompanhamento das soluções.
          </p>
        </div>

        <div className="faq-water-panel border-y-2 border-brand-navy">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="faq-item group border-b border-brand-blue/20 last:border-b-0"
            >
              <summary className="water-accordion flex cursor-pointer list-none items-center gap-5 py-6 text-left sm:py-7">
                <span className="shrink-0 text-xs font-black tracking-[0.16em] text-brand-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg font-bold leading-snug text-brand-navy sm:text-xl">
                  {item.question}
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand-blue/25 text-brand-blue transition duration-300 group-open:rotate-180 group-open:bg-brand-navy group-open:text-white">
                  <Icon name="chevron" className="size-4" />
                </span>
              </summary>
              <p className="faq-answer pb-7 pl-0 pr-12 text-base leading-7 text-ink-700 sm:pl-11 sm:pr-16">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
