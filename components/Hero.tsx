import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";

const heroPrinciples = [
  ["01", "Escuta local"],
  ["02", "Responsabilidade técnica"],
  ["03", "Implantação participativa"],
  ["04", "Acompanhamento"],
] as const;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-background overflow-hidden pb-12 sm:pb-16 lg:pb-20">
      <div className="relative min-h-[44rem] overflow-hidden bg-brand-navy shadow-[var(--shadow-strong)] sm:min-h-[48rem] lg:min-h-[52rem]">
        <Image src="/saneya-hero.jpg" alt="Equipe da Saneyá durante a implantação de uma solução comunitária de saneamento em área verde" fill sizes="100vw" className="object-cover object-[58%_center]" preload />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,55,133,0.95)_0%,rgba(0,55,133,0.82)_42%,rgba(0,55,133,0.18)_76%,rgba(0,55,133,0.08)_100%)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[44rem] w-full max-w-[92rem] flex-col justify-between px-5 py-6 sm:min-h-[48rem] sm:px-8 sm:py-10 lg:min-h-[52rem] lg:px-10 lg:py-14 xl:py-16">
          <div className="flex items-center justify-between gap-6">
            <p className="eyebrow !text-brand-orange">Saneyá Ambiental</p>
            <p className="hidden max-w-[15rem] border-l border-white/30 pl-4 text-right text-xs font-semibold uppercase leading-5 tracking-[0.14em] text-white/70 md:block">Saneamento comunitário<br />com continuidade</p>
          </div>

          <div className="max-w-4xl py-12">
            <h1 id="hero-title" className="text-balance text-[clamp(3.35rem,7.8vw,7.8rem)] font-bold leading-[0.88] tracking-[-0.075em] text-white">
              O território aponta. <span className="text-brand-orange">A solução ganha forma.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-white/82 sm:text-xl sm:leading-9">Tecnologia social, participação comunitária e responsabilidade técnica para cuidar das pessoas, da água e do ambiente.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#solucoes" className="button-primary">Conheça nossas soluções <Icon name="arrow" className="size-4" /></a>
              <Link href="/cadastro" className="button-inverse">Solicitar avaliação <Icon name="arrow" className="size-4" /></Link>
            </div>
          </div>

          <ol className="grid border-t border-white/25 sm:grid-cols-2 lg:grid-cols-4">
            {heroPrinciples.map(([number, principle]) => (
              <li key={principle} className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-white/20 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                <span className="text-xs font-black tracking-[0.16em] text-brand-orange">{number}</span>
                <span className="text-sm font-bold text-white/90">{principle}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flow-panel absolute right-5 top-24 hidden max-w-[16rem] border border-white/30 bg-background/95 p-5 text-brand-navy shadow-[var(--shadow-lifted)] backdrop-blur-md lg:block xl:right-10 xl:top-28">
          <Icon name="users" className="size-6 text-brand-orange" />
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-blue">No território</p>
          <p className="mt-2 text-base font-bold leading-6">Técnica e participação lado a lado.</p>
        </div>
      </div>
    </section>
  );
}
