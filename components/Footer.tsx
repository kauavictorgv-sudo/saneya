import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { navigation, siteLinks } from "@/lib/site-content";
import WaveEdges from "@/components/WaveEdges";
import { privacyLinks } from "@/lib/privacy";

const socialLinks = [
  { label: "Instagram", href: siteLinks.instagram, icon: "instagram" as const },
  { label: "LinkedIn", href: siteLinks.linkedin, icon: "linkedin" as const },
  { label: "TikTok", href: siteLinks.tiktok, icon: "tiktok" as const },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white" aria-label="Rodapé do site">
      <WaveEdges bottom={false} fillClassName="fill-surface-blue" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 sm:pb-14 md:pt-24 lg:px-10 xl:pb-16">
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_0.85fr_1.05fr] xl:gap-x-16">
          <section className="max-w-sm" aria-label="Saneyá Ambiental">
            <Link href="/" aria-label="Saneyá — voltar ao início" className="inline-flex rounded-md focus-visible:outline-offset-4">
              <Image src="/saneya-logo-white.svg" alt="Saneyá" width={238} height={66} className="h-10 w-auto sm:h-11" unoptimized />
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/75">
              Soluções comunitárias de saneamento e uso responsável da água com participação, responsabilidade técnica e acompanhamento.
            </p>
            <span className="mt-5 inline-flex rounded-[1rem_0.35rem_1rem_1rem] border border-white/20 bg-white/[0.06] px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
              Saneyá Ambiental
            </span>
          </section>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Navegue</h2>
            <ul className="mt-4 grid gap-1 text-sm text-white/75">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link className="inline-flex min-h-10 items-center rounded-sm transition hover:translate-x-1 hover:text-white focus-visible:outline-offset-4" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Privacidade e direitos">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Privacidade e direitos</h2>
            <ul className="mt-4 grid gap-1 text-sm text-white/75">
              {privacyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-10 items-center rounded-sm py-1 leading-6 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="min-w-0 xl:justify-self-end xl:max-w-[17rem]" aria-labelledby="footer-contact-title">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Próximo passo</p>
            <h2 id="footer-contact-title" className="mt-3 text-2xl font-bold leading-tight tracking-[-0.035em] text-white">
              Vamos conversar?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Conte o que você precisa e a equipe organiza o primeiro atendimento.
            </p>
            <a href={siteLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[1rem_0.35rem_1rem_1rem] bg-brand-orange px-5 text-sm font-bold text-brand-navy shadow-[var(--shadow-orange)] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-offset-4">
              Iniciar conversa
              <Icon name="arrow" className="size-4" />
            </a>
            <a href={`mailto:${siteLinks.email}`} className="mt-6 grid min-h-11 w-full grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm text-sm leading-6 text-white/75 transition hover:text-white focus-visible:outline-offset-4">
              <Icon name="mail" className="size-4 shrink-0" />
              <span className="min-w-0 break-words xl:whitespace-nowrap">{siteLinks.email}</span>
            </a>
          </section>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Redes sociais">
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-white transition hover:-translate-y-1 hover:border-brand-orange hover:bg-brand-orange hover:text-brand-navy focus-visible:outline-offset-4" aria-label={`Acessar ${social.label}`}>
                    <Icon name={social.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={siteLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm font-semibold text-white/80 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-offset-4 sm:self-auto">
            <Icon name="message" className="size-4 shrink-0 text-brand-orange" />
            Conversar pelo WhatsApp
          </a>
        </div>
      </div>

      <div className="relative z-10 bg-brand-blue">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-center text-xs leading-5 text-white/85 sm:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} Saneyá Ambiental. Todos os direitos reservados.</p>
          <p className="text-white/70">Conteúdo sujeito à validação técnica e atualização periódica.</p>
        </div>
      </div>
    </footer>
  );
}
