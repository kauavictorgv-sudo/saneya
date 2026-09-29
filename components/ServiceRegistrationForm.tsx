"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { environmentalServices, siteLinks } from "@/lib/site-content";

type CopyStatus = "idle" | "copied" | "manual";
const subscribeHydration = () => () => {};
const services = ["BET — Bacia de Evapotranspiração", "CAC — Captação de água da chuva", "Avaliação e diagnóstico", "Educação ambiental", "Acompanhamento de unidade", ...environmentalServices.map((service) => service.title), "Outro serviço"];

const fieldClassName =
  "water-field min-h-12 w-full rounded-xl border-2 border-brand-blue/25 bg-white px-4 text-foreground outline-none transition hover:border-brand-blue/45 placeholder:text-ink-600/55 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10";

function readField(formData: FormData, field: string) {
  return String(formData.get(field) ?? "").trim().replace(/[\u0000-\u001f\u007f]/g, " ");
}

export default function ServiceRegistrationForm() {
  const [summary, setSummary] = useState("");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);

  useEffect(() => {
    function clearOnExit() {
      formRef.current?.reset();
      setSummary("");
      setCopyStatus("idle");
      setError("");
      setFieldErrors({});
    }
    window.addEventListener("pagehide", clearOnExit);
    return () => window.removeEventListener("pagehide", clearOnExit);
  }, []);

  async function copySummary(value: string) {
    if (!navigator.clipboard) {
      setCopyStatus("manual");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("manual");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const city = readField(formData, "city");
    const service = readField(formData, "service");
    const errors: Record<string, string> = {};
    const email = readField(formData, "email");
    const phone = readField(formData, "phone");
    const emailInput = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (email && (!emailInput.validity.valid || email.length > 254)) errors.email = "Informe um e-mail válido, como nome@empresa.com.";
    if (phone && (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 8 || phone.replace(/\D/g, "").length > 15)) errors.phone = "Informe um telefone com 8 a 15 dígitos, incluindo DDD.";
    if (city && (city.length < 2 || city.length > 100)) errors.city = "Informe cidade e estado com 2 a 100 caracteres.";
    if (service && !services.includes(service)) errors.service = "Selecione um dos serviços disponíveis.";
    if (readField(formData, "name").length > 80) errors.name = "Use até 80 caracteres para nome e sobrenome.";
    if (readField(formData, "organization").length > 120) errors.organization = "Use até 120 caracteres para a empresa.";
    if (readField(formData, "message").length > 1200) errors.message = "Use até 1.200 caracteres para a mensagem.";
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setSummary("");
      setError("Revise os campos indicados antes de preparar a solicitação.");
      const invalidInput = event.currentTarget.elements.namedItem(Object.keys(errors)[0]);
      if (invalidInput instanceof HTMLElement) invalidInput.focus();
      return;
    }
    setError("");
    setCopyStatus("idle");
    const message = [
      "Olá, equipe Saneyá! Gostaria de solicitar uma avaliação.",
      "",
      `Nome e sobrenome: ${readField(formData, "name") || "Não informado"}`,
      `E-mail: ${email || "Não informado"}`,
      `Telefone: ${phone || "Não informado"}`,
      `Empresa: ${readField(formData, "organization") || "Não informada"}`,
      `Cidade/UF: ${city || "Não informada"}`,
      `Serviço de interesse: ${service || "Não informado"}`,
      `Necessidade: ${readField(formData, "message") || "Não informada"}`,
    ].join("\n");

    setSummary(message);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate autoComplete="off" onChange={() => { setSummary(""); setCopyStatus("idle"); setError(""); setFieldErrors({}); }} className="surface-card rounded-[2rem] p-5 sm:p-8 lg:p-10">
      <fieldset disabled={!ready}>
      <div>
        <p className="eyebrow">Cadastro de interesse</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
          Dados para o primeiro atendimento
        </h2>
        <p className="mt-3 leading-7 text-ink-700">
          Prepare uma mensagem no seu navegador. A equipe só recebe os dados se você enviar o resumo pelo canal externo. Este formulário não cria conta nem inicia atendimento automaticamente.
        </p>
      </div>

      <div className="mt-8 grid gap-5 rounded-2xl bg-aqua-50/65 p-4 sm:grid-cols-2 sm:p-6">
        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Nome e sobrenome (opcional)
          <input type="text" className={fieldClassName} name="name" maxLength={80} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
          {fieldErrors.name && <span id="name-error">{fieldErrors.name}</span>}
        </label>

        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Empresa em que trabalha ou que representa (opcional)
          <input type="text" className={fieldClassName} name="organization" maxLength={120} aria-invalid={!!fieldErrors.organization} aria-describedby={fieldErrors.organization ? "organization-error" : undefined} />
          {fieldErrors.organization && <span id="organization-error">{fieldErrors.organization}</span>}
        </label>

        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          E-mail (opcional)
          <input type="email" className={fieldClassName} name="email" maxLength={254} inputMode="email" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
          {fieldErrors.email && <span id="email-error">{fieldErrors.email}</span>}
        </label>

        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Telefone (opcional)
          <input type="tel" className={fieldClassName} name="phone" maxLength={30} inputMode="tel" placeholder="Ex.: (21) 99999-9999" aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "phone-error" : undefined} />
          {fieldErrors.phone && <span id="phone-error">{fieldErrors.phone}</span>}
        </label>

        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Cidade e estado (opcional)
          <input className={fieldClassName} name="city" minLength={2} maxLength={100} placeholder="Ex.: Rio de Janeiro/RJ" aria-invalid={!!fieldErrors.city} aria-describedby={fieldErrors.city ? "city-error" : undefined} />
          {fieldErrors.city && <span id="city-error">{fieldErrors.city}</span>}
        </label>

        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Serviço de interesse (opcional)
          <select className={fieldClassName} name="service" defaultValue="" aria-invalid={!!fieldErrors.service} aria-describedby={fieldErrors.service ? "service-error" : undefined}>
            <option value="">Selecione uma opção</option>
            {services.map((service) => <option key={service}>{service}</option>)}
          </select>
          {fieldErrors.service && <span id="service-error">{fieldErrors.service}</span>}
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-brand-navy">
        Conte brevemente o que você precisa (opcional)
        <textarea
          className={`${fieldClassName} min-h-32 resize-y py-3`}
          name="message"
          maxLength={1200}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={`data-minimization-notice${fieldErrors.message ? " message-error" : ""}`}
          placeholder="Contexto do local, situação atual e objetivo do atendimento."
        />
        {fieldErrors.message && <span id="message-error">{fieldErrors.message}</span>}
      </label>

      <p id="data-minimization-notice" className="mt-5 rounded-xl border border-ocean-100 bg-aqua-50 p-4 text-sm leading-6 text-ink-700">Não inclua CPF, documentos, senhas, dados de saúde ou dados pessoais de terceiros. Os campos ficam na memória desta página. Leia a <Link href="/politica-de-privacidade" className="underline underline-offset-4">Política de Privacidade</Link> e consulte seus <Link href="/direitos-lgpd" className="underline underline-offset-4">direitos LGPD</Link>.</p>
      {error && <p role="alert" className="mt-4 font-semibold">{error}</p>}

      <button type="submit" className="button-primary mt-6 w-full sm:w-auto">
        Preparar solicitação
        <Icon name="clipboard" className="size-5" />
      </button>
      <button type="button" className="button-secondary mt-3 w-full sm:ml-3 sm:w-auto" onClick={() => { formRef.current?.reset(); setSummary(""); setCopyStatus("idle"); setError(""); setFieldErrors({}); }}>Limpar formulário</button>

      <p className="mt-4 text-sm leading-6 text-ink-600">
        Preparar não envia nem copia os dados. Limpar remove os campos e o resumo desta página, mas não apaga cópias na área de transferência nem mensagens já enviadas.
      </p>

      {summary && (
        <section className="mt-8 rounded-2xl border border-brand-blue/25 bg-aqua-50 p-5 shadow-inner" aria-labelledby="prepared-request-title">
          <h3 id="prepared-request-title" className="text-lg font-bold text-brand-navy">Solicitação preparada</h3>
          <p className="mt-2 text-sm leading-6 text-ink-700" aria-live="polite">
            {copyStatus === "copied"
              ? "O resumo foi copiado para a área de transferência do dispositivo. Abra o Instagram apenas se desejar enviar a mensagem."
              : copyStatus === "manual"
                ? "Não foi possível copiar automaticamente. Selecione o texto do resumo e copie manualmente, se desejar."
                : "Revise e copie o resumo abaixo antes de abrir o Instagram."}
          </p>
          <textarea className={`${fieldClassName} mt-4 min-h-52 resize-y py-3 font-mono text-sm`} readOnly value={summary} aria-label="Resumo da solicitação" />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="button-secondary" onClick={() => copySummary(summary)}>
              Copiar resumo
              <Icon name="clipboard" className="size-4" />
            </button>
            <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer" className="button-primary">
              Abrir Instagram
              <Icon name="external" className="size-4" />
            </a>
          </div>
          <p className="mt-4 text-sm leading-6">O Instagram é um serviço externo com suas próprias condições de privacidade. Abrir o perfil não envia o resumo. A cópia pode permanecer no histórico da área de transferência do seu dispositivo.</p>
        </section>
      )}
      </fieldset>
      <noscript>Este formulário funciona localmente e precisa de JavaScript. Nenhum dado será enviado com JavaScript desativado.</noscript>
    </form>
  );
}
