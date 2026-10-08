"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Brand from "@/components/Brand";
import Icon from "@/components/Icon";
import { navigation } from "@/lib/site-content";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  function closeNavigation() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    }

    function closeServicesOutside(event: PointerEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeServicesOutside);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeServicesOutside);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/80"
    >
      <div className="mx-auto hidden max-w-[92rem] items-center justify-between border-b border-brand-blue/15 px-10 py-3 xl:flex">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-brand-blue">Saneyá Ambiental</p>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand-navy/65">Saneamento comunitário · tecnologia social</p>
      </div>
      <div className="mx-auto grid min-h-[5.5rem] max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8 lg:px-10 xl:min-h-[4.25rem]">
        <button
          type="button"
          className="water-icon-button col-start-1 row-start-1 inline-flex size-11 items-center justify-center justify-self-start rounded-[1rem_0.35rem_1rem_1rem] border border-brand-blue/15 text-brand-navy transition hover:bg-brand-blue/10 xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => {
            setMenuOpen((current) => !current);
            setServicesOpen(false);
          }}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        <Link
          href="/"
          className="water-logo col-start-2 row-start-1 rounded-md py-2 focus-visible:outline-offset-4 xl:col-start-1 xl:justify-self-start"
          aria-label="Saneyá — início"
          onClick={closeNavigation}
        >
          <Brand />
        </Link>

        <nav
          className="col-start-2 row-start-1 hidden justify-self-center xl:block"
          aria-label="Navegação principal"
        >
          <ul className="flex items-center gap-7 text-[0.7rem] font-extrabold uppercase tracking-[0.1em] text-brand-navy">
            {navigation.map((item) => (
              <li
                key={item.label}
                className={"children" in item ? "relative" : undefined}
              >
                {"children" in item ? (
                  <>
                    <button
                      type="button"
                      className="water-nav flex min-h-11 items-center gap-1.5 border-b-2 border-transparent px-1 uppercase tracking-[0.08em] transition-colors hover:border-brand-orange hover:text-brand-blue focus-visible:outline-offset-4"
                      aria-expanded={servicesOpen}
                      aria-controls="desktop-services-menu"
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((current) => !current)}
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        className={`size-3.5 transition-transform ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      id="desktop-services-menu"
                      className={`absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-brand-blue/10 bg-background p-2 shadow-[var(--shadow-menu)] transition duration-150 ${
                        servicesOpen
                          ? "visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <ul aria-label="Serviços disponíveis">
                        {item.children.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="water-menu-item water-no-waves group flex items-start justify-between gap-4 rounded-xl px-4 py-3 text-left normal-case tracking-normal transition hover:bg-aqua-50"
                              onClick={() => setServicesOpen(false)}
                            >
                              <span>
                                <span className="block text-sm font-bold text-brand-navy group-hover:text-brand-blue">
                                  {service.label}
                                </span>
                                <span className="mt-1 block text-xs font-medium leading-5 text-ink-600">
                                  {service.description}
                                </span>
                              </span>
                              <Icon
                                name="arrow"
                                className="mt-1 size-4 shrink-0 text-brand-orange"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="water-nav flex min-h-11 items-center border-b-2 border-transparent px-1 transition-colors hover:border-brand-orange hover:text-brand-blue focus-visible:outline-offset-4"
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-3 row-start-1 flex items-center justify-self-end">
          <Link
            href="/cadastro"
            className="water-fill hidden min-h-11 items-center justify-center gap-2 rounded-[1rem_0.35rem_1rem_1rem] bg-brand-navy px-5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition hover:translate-x-1 hover:bg-brand-blue xl:inline-flex"
            onClick={() => setServicesOpen(false)}
          >
            Solicitar atendimento
            <Icon name="user" className="size-5 shrink-0" />
          </Link>

          <Link
            href="/cadastro"
            className="water-icon-button inline-flex size-11 items-center justify-center rounded-[1rem_0.35rem_1rem_1rem] bg-brand-blue text-white shadow-sm transition hover:bg-brand-navy xl:hidden"
            aria-label="Solicitar atendimento"
            onClick={closeNavigation}
          >
            <Icon name="user" className="size-5" />
          </Link>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${
          menuOpen ? "grid" : "hidden"
        } border-t border-brand-blue/15 bg-background px-5 pb-7 pt-4 shadow-2xl xl:hidden`}
      >
        <Link
          href="/cadastro"
          className="water-fill mb-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-[1rem_0.35rem_1rem_1rem] bg-brand-blue px-5 font-bold text-white transition hover:bg-brand-navy"
          onClick={closeNavigation}
        >
          Solicitar atendimento
          <Icon name="user" className="size-5 shrink-0" />
        </Link>
        <nav aria-label="Navegação em dispositivos móveis">
          <ul className="grid divide-y divide-brand-blue/15">
            {navigation.map((item) => (
              <li key={item.label}>
                {"children" in item ? (
                  <>
                    <button
                      type="button"
                      className="water-nav water-no-waves flex min-h-12 w-full items-center justify-between py-3 text-left text-sm font-bold uppercase tracking-[0.08em] text-brand-navy transition-colors hover:text-brand-blue"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services-menu"
                      onClick={() => setServicesOpen((current) => !current)}
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        className={`size-4 text-coral-300 transition-transform ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <ul
                      id="mobile-services-menu"
                      className={`${
                        servicesOpen ? "grid" : "hidden"
                      } gap-1 pb-3`}
                    >
                      {item.children.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            className="water-menu-item water-no-waves flex min-h-11 items-center justify-between border-l-2 border-brand-orange bg-aqua-50 px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-aqua-100"
                            onClick={closeNavigation}
                          >
                            {service.label}
                            <Icon
                              name="arrow"
                              className="size-4 shrink-0 text-coral-300"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="water-nav water-no-waves flex min-h-12 items-center justify-between py-3 text-sm font-bold uppercase tracking-[0.08em] text-brand-navy transition-colors hover:text-brand-blue"
                    onClick={closeNavigation}
                  >
                    {item.label}
                    <Icon name="arrow" className="size-4 text-coral-300" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
