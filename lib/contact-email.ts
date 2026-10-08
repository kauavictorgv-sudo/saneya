import type { ContactFields } from "./contact-request";

type MailSettings = { apiKey: string; from: string; to: string };
export type DeliveryResult =
  | { accepted: true }
  | { accepted: false; reason: "unavailable" | "conflict" | "rate_limit" | "uncertain" };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function createContactEmail(data: ContactFields, reference: string) {
  const rows = [
    ["Referência", reference],
    ["Nome", data.name],
    ["E-mail para resposta", data.email],
    ["Telefone", data.phone || "Não informado"],
    ["Empresa", data.organization || "Não informada"],
    ["Cidade/UF", data.city || "Não informada"],
    ["Serviço de interesse", data.service],
    ["Necessidade", data.message],
  ];
  const footer = "Responda a esta mensagem para falar com o interessado. Pedido enviado pelo site Saneyá; não confirma contratação. A CEO acompanha o atendimento. Pedidos encerrados sem contratação ou cancelados devem ser excluídos em até 30 dias após o encerramento, conforme a rotina definida pela Saneyá. Documentos de uma contratação seguem critérios próprios de conservação.";
  return {
    subject: `Saneyá | Pedido de atendimento | ${data.service}`,
    text: ["Novo pedido de atendimento — Saneyá Ambiental", "", ...rows.map(([label, value]) => `${label}: ${value}`), "", footer].join("\n"),
    html: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"></head><body style="margin:0;background:#fcf7f1;color:#003785;font-family:Arial,sans-serif;line-height:1.6"><div style="max-width:640px;margin:24px auto;background:#ffffff;padding:32px"><h1 style="margin:0 0 12px;font-size:26px">Novo pedido de atendimento</h1><p style="margin:0 0 24px">Saneyá Ambiental</p><table role="presentation" style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #dbe6f3;vertical-align:top"><strong>${escapeHtml(label)}</strong><div style="white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value)}</div></td></tr>`).join("")}</table><p style="margin-top:24px;font-size:13px">${escapeHtml(footer)}</p></div></body></html>`,
  };
}

export async function sendContactEmail(
  data: ContactFields,
  reference: string,
  settings: MailSettings,
  fetchEmail: typeof fetch = fetch,
): Promise<DeliveryResult> {
  try {
    const response = await fetchEmail("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${settings.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `saneya-contact/${reference}`,
      },
      body: JSON.stringify({
        from: settings.from,
        to: [settings.to],
        reply_to: data.email,
        ...createContactEmail(data, reference),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      if (response.status === 409) return { accepted: false, reason: "conflict" };
      if (response.status === 429) return { accepted: false, reason: "rate_limit" };
      return { accepted: false, reason: response.status >= 500 ? "uncertain" : "unavailable" };
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) return { accepted: false, reason: "uncertain" };
    return { accepted: true };
  } catch {
    // Timeout pode ocorrer após a aceitação. Uma repetição usa a mesma chave.
    return { accepted: false, reason: "uncertain" };
  }
}
