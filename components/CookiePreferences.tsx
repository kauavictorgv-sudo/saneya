"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { CONSENT_KEY, createConsent, parseConsent, type ConsentAction } from "@/lib/cookie-consent";

const changeEvent = "saneya:preferences-changed";
let memoryChoice: string | null = null;
let useMemory = false;
function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === CONSENT_KEY || event.key === null) { memoryChoice = null; useMemory = false; callback(); }
  }
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(changeEvent, callback); window.removeEventListener("storage", onStorage); };
}
function snapshot() {
  if (useMemory) return memoryChoice;
  try { return window.localStorage.getItem(CONSENT_KEY); } catch { return memoryChoice; }
}
function save(action: ConsentAction) {
  memoryChoice = JSON.stringify(createConsent(action));
  try { window.localStorage.setItem(CONSENT_KEY, memoryChoice); useMemory = false; } catch { useMemory = true; }
  window.dispatchEvent(new Event(changeEvent));
  return !useMemory;
}
const buttonClass = "min-h-11 rounded-xl border-2 border-brand-blue bg-white px-4 py-3 text-sm font-bold text-brand-navy transition hover:bg-aqua-100 focus-visible:outline-offset-4";

export default function CookiePreferences({ manager = false }: { manager?: boolean }) {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const [notice, setNotice] = useState("");
  const choice = parseConsent(raw);
  function choose(action: ConsentAction) {
    const persisted = save(action);
    setNotice(persisted ? "Preferência salva neste navegador. Nenhum serviço opcional está ativo." : "O navegador bloqueou o armazenamento. A escolha vale apenas enquanto esta página estiver aberta; poderá ser solicitada novamente.");
  }
  if (!manager && choice) return notice ? <p role="status" className="mx-auto max-w-5xl px-5 py-4 text-sm text-brand-navy">{notice}</p> : null;
  return (
    <section aria-label={manager ? "Preferências de cookies" : "Aviso de cookies"} className={manager ? "cookie-preferences rounded-2xl border border-brand-blue/25 bg-aqua-50 p-5 sm:p-7" : "cookie-preferences fixed inset-x-0 bottom-0 z-[80] max-h-[70dvh] overflow-y-auto border-t-2 border-brand-blue bg-white p-5 shadow-2xl sm:p-6"}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-brand-navy">Sua privacidade e suas escolhas</h2>
        <p className="mt-3 text-sm leading-6 text-ink-700">Este site não utiliza cookies de publicidade ou análise de audiência. Ao escolher, salvamos somente sua preferência neste navegador, em armazenamento local. Você pode alterá-la em Gerenciar Cookies, no rodapé.</p>
        <p className="mt-2 text-sm leading-6 text-ink-700">Não há serviços opcionais ativos. Aceitar todos não autoriza serviços que venham a ser adicionados. <Link className="underline underline-offset-4" href="/politica-de-cookies">Leia a Política de Cookies</Link>.</p>
        {manager && <div className="mt-6 space-y-4">
          <p className="text-sm font-semibold">Escolha atual: {choice ? ({ all: "Aceitar todos", necessary: "Recusar opcionais", custom: "Personalizada — somente necessários" }[choice.action]) : "nenhuma preferência salva"}.</p>
          <div className="rounded-xl border border-brand-blue/20 bg-white p-4"><h3 className="font-bold">Necessários — registro da preferência</h3><p className="mt-1 text-sm leading-6">Mantém sua escolha, sem nome, contato ou identificador de publicidade. Não é utilizado para rastreamento.</p></div>
          {["Análise de audiência", "Publicidade e marketing", "Conteúdo externo e funcionalidades opcionais"].map((label) => <div key={label} className="rounded-xl border border-brand-blue/20 bg-white p-4"><h3 className="font-bold">{label}</h3><p className="mt-1 text-sm">Inativo — nenhum serviço instalado nesta categoria.</p></div>)}
        </div>}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" className={buttonClass} onClick={() => choose("all")}>Aceitar todos</button>
          <button type="button" className={buttonClass} onClick={() => choose("necessary")}>Recusar opcionais</button>
          {manager ? <button type="button" className={buttonClass} onClick={() => choose("custom")}>Salvar preferências</button> : <Link href="/gerenciar-cookies" className={`${buttonClass} text-center`}>Personalizar</Link>}
        </div>
        {manager && <p className="mt-4 text-sm leading-6">Para revogar uma escolha anterior, selecione Recusar opcionais. Para remover o registro, limpe os dados deste site nas configurações do navegador; o aviso será exibido novamente. A escolha permanece até ser alterada, removida ou até uma nova versão do inventário. Não há autorização opcional a revogar nesta versão.</p>}
        {notice && <p role="status" className="mt-4 text-sm font-semibold">{notice}</p>}
      </div>
    </section>
  );
}
