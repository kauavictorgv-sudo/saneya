"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { contactFieldNames, contactServices, validateContact, type ContactErrors, type ContactFields, type ContactResult } from "@/lib/contact-request";
import { siteLinks } from "@/lib/site-content";

const subscribeHydration = () => () => {};
const fieldClassName = "water-field min-h-12 w-full rounded-xl border-2 border-brand-blue/25 bg-white px-4 text-base text-foreground outline-none transition hover:border-brand-blue/45 placeholder:text-ink-600 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 aria-[invalid=true]:border-brand-orange";
const textFields: readonly { name: keyof ContactFields; label: string; type: string; maxLength: number; autoComplete: string; required?: boolean; placeholder?: string }[] = [
  { name: "name", label: "Nome", type: "text", maxLength: 80, autoComplete: "name", required: true },
  { name: "email", label: "E-mail", type: "email", maxLength: 254, autoComplete: "email", required: true },
  { name: "phone", label: "Telefone (opcional)", type: "tel", maxLength: 30, autoComplete: "tel", placeholder: "Ex.: (21) 99999-9999" },
  { name: "organization", label: "Empresa ou organização (opcional)", type: "text", maxLength: 120, autoComplete: "organization" },
  { name: "city", label: "Cidade e estado (opcional)", type: "text", maxLength: 100, autoComplete: "address-level2", placeholder: "Ex.: Rio de Janeiro/RJ" },
];

function newReference() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function ServiceRegistrationForm() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [reference, setReference] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLElement>(null);
  const pendingRef = useRef<AbortController | null>(null);
  const attemptRef = useRef("");
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);

  useEffect(() => {
    function clearOnExit() {
      pendingRef.current?.abort();
      pendingRef.current = null;
      attemptRef.current = "";
      formRef.current?.reset();
      setSending(false);
      setReference("");
      setError("");
      setFieldErrors({});
    }
    window.addEventListener("pagehide", clearOnExit);
    return () => { window.removeEventListener("pagehide", clearOnExit); pendingRef.current?.abort(); pendingRef.current = null; };
  }, []);

  useEffect(() => { if (reference) successRef.current?.focus(); }, [reference]);

  function focusFirstError(errors: ContactErrors) {
    const field = contactFieldNames.find((name) => errors[name]);
    const input = field && formRef.current?.elements.namedItem(field);
    if (input instanceof HTMLElement) input.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = validateContact(Object.fromEntries(contactFieldNames.map((field) => [field, formData.get(field) ?? ""])));
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setError("Revise os campos indicados antes de enviar.");
      focusFirstError(validation.errors);
      return;
    }
    setFieldErrors({});
    if (!navigator.onLine) { setError("Confira sua conexão e tente novamente. Seus campos estão preenchidos."); return; }
    const controller = new AbortController();
    pendingRef.current = controller;
    attemptRef.current ||= newReference();
    setSending(true);
    setError("");
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch("/api/atendimento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, reference: attemptRef.current, website: String(formData.get("website") ?? "") }),
        signal: controller.signal,
      });
      const result: ContactResult | null = await response.json().catch(() => null);
      if (pendingRef.current !== controller) return;
      if (response.ok && result?.ok && result.reference === attemptRef.current) {
        form.reset();
        setReference(result.reference);
        return;
      }
      if (result && !result.ok && result.errors) {
        const errors: ContactErrors = {};
        for (const field of contactFieldNames) if (typeof result.errors[field] === "string") errors[field] = result.errors[field];
        setFieldErrors(errors);
        focusFirstError(errors);
      }
      setError(result && !result.ok && typeof result.message === "string" ? result.message
        : response.status === 429 ? "Aguarde alguns minutos e tente novamente."
        : "Não foi possível confirmar o envio. Tente novamente com os mesmos dados.");
    } catch {
      if (pendingRef.current === controller) setError("Não foi possível confirmar o envio. Confira sua conexão e tente novamente.");
    } finally {
      window.clearTimeout(timeout);
      if (pendingRef.current === controller) { pendingRef.current = null; setSending(false); }
    }
  }

  if (reference) return (
    <section ref={successRef} tabIndex={-1} aria-labelledby="request-success-title" className="surface-card rounded-[2rem] p-6 outline-none sm:p-8 lg:p-10">
      <Icon name="check" className="size-10 text-brand-blue" />
      <h2 id="request-success-title" className="mt-6 text-3xl font-bold tracking-tight text-brand-navy">Pedido encaminhado</h2>
      <p role="status" className="mt-4 max-w-[65ch] text-lg leading-8 text-ink-700">Aguarde o contato da equipe pelo e-mail informado para conversar sobre sua necessidade.</p>
      <details className="mt-6 border-y border-brand-blue/20 py-4 text-sm leading-6 text-brand-navy">
        <summary className="cursor-pointer rounded-sm font-bold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-4">Ver referência do envio</summary>
        <p className="mt-2 break-all">{reference}</p>
      </details>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="button-primary">Voltar ao site <Icon name="arrow" className="size-4" /></Link>
        <button type="button" className="button-secondary" onClick={() => { attemptRef.current = ""; setReference(""); }}>Enviar outro pedido</button>
      </div>
      <p className="mt-6 text-sm leading-6 text-ink-700">Para falar com a Saneyá, escreva para <a href={`mailto:${siteLinks.email}`} className="break-all font-bold text-brand-blue underline underline-offset-4">{siteLinks.email}</a>.</p>
    </section>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={sending} onChange={(event) => {
      attemptRef.current = "";
      setError("");
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
        setFieldErrors((previous) => ({ ...previous, [target.name]: undefined }));
      }
    }} className="surface-card rounded-[2rem] p-5 sm:p-8 lg:p-10">
      <h2 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">Solicite atendimento à Saneyá</h2>
      <p className="mt-4 max-w-[65ch] leading-7 text-ink-700">Envie seu pedido para conversar com a equipe sobre a solução que você procura.</p>
      <p id="required-fields-note" className="mt-3 text-sm leading-6 text-ink-700">Preencha nome, e-mail, serviço e descrição. Os demais campos são opcionais.</p>
      <fieldset disabled={!ready || sending} aria-describedby="required-fields-note" className="mt-7 min-w-0 disabled:opacity-70">
        <legend className="sr-only">Dados do pedido de atendimento</legend>
        <div aria-hidden="true" className="hidden">
          <label htmlFor="request-website">Website</label>
          <input id="request-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {textFields.map((field) => (
            <div key={field.name} className="min-w-0">
              <label htmlFor={`request-${field.name}`} className="mb-2 block text-sm font-bold leading-6 text-brand-navy">{field.label}</label>
              <input id={`request-${field.name}`} className={fieldClassName} name={field.name} type={field.type} maxLength={field.maxLength} required={field.required} autoComplete={field.autoComplete} placeholder={field.placeholder} aria-invalid={!!fieldErrors[field.name]} aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : field.name === "email" ? "email-note" : undefined} />
              {field.name === "email" && <p id="email-note" className="mt-2 text-sm leading-6 text-ink-700">É por este endereço que a equipe responderá.</p>}
              {fieldErrors[field.name] && <p id={`${field.name}-error`} className="mt-2 text-sm font-bold leading-6 text-brand-navy">{fieldErrors[field.name]}</p>}
            </div>
          ))}
          <div className="min-w-0">
            <label htmlFor="request-service" className="mb-2 block text-sm font-bold leading-6 text-brand-navy">Serviço de interesse</label>
            <select id="request-service" className={fieldClassName} name="service" defaultValue="" required aria-invalid={!!fieldErrors.service} aria-describedby={fieldErrors.service ? "service-error" : undefined}>
              <option value="">Selecione uma opção</option>
              {contactServices.map((service) => <option key={service}>{service}</option>)}
            </select>
            {fieldErrors.service && <p id="service-error" className="mt-2 text-sm font-bold leading-6 text-brand-navy">{fieldErrors.service}</p>}
          </div>
        </div>
        <label htmlFor="request-message" className="mb-2 mt-6 block text-sm font-bold text-brand-navy">Descreva sua necessidade</label>
        <textarea id="request-message" className={`${fieldClassName} min-h-36 resize-y py-3`} name="message" minLength={10} maxLength={1200} required aria-invalid={!!fieldErrors.message} aria-describedby={`message-note${fieldErrors.message ? " message-error" : ""}`} placeholder="Qual problema você quer resolver e em que tipo de local?" />
        <p id="message-note" className="mt-2 text-sm leading-6 text-ink-700">De 10 a 1.200 caracteres. Evite informações pessoais sensíveis.</p>
        {fieldErrors.message && <p id="message-error" className="mt-2 text-sm font-bold leading-6 text-brand-navy">{fieldErrors.message}</p>}
        <p className="mt-6 border-y border-brand-blue/20 py-4 text-sm leading-6 text-ink-700">Usaremos seus dados para responder a este pedido. <Link href="/politica-de-privacidade" className="font-bold text-brand-blue underline underline-offset-4">Política de Privacidade</Link>.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="button-primary w-full disabled:cursor-wait sm:w-auto">{sending ? "Enviando pedido…" : "Enviar pedido de atendimento"}<Icon name="arrow" className="size-5 shrink-0" /></button>
          <button type="button" className="button-secondary w-full sm:w-auto" onClick={() => { formRef.current?.reset(); attemptRef.current = ""; setError(""); setFieldErrors({}); }}>Limpar formulário</button>
        </div>
      </fieldset>
      {sending && <p role="status" className="mt-4 text-sm leading-6 text-ink-700">Aguarde a confirmação do envio.</p>}
      {error && <div role="alert" className="mt-6 rounded-xl bg-aqua-50 p-4 text-sm leading-6 text-brand-navy"><p className="font-bold">{error}</p>{!Object.values(fieldErrors).some(Boolean) && <p className="mt-2">Ou entre em contato por e-mail: <a href={`mailto:${siteLinks.email}`} className="break-all underline underline-offset-4">{siteLinks.email}</a>.</p>}</div>}
      <noscript>Ative o JavaScript para enviar pelo formulário ou escreva para {siteLinks.email} usando seu aplicativo de e-mail.</noscript>
    </form>
  );
}
