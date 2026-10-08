import { sendContactEmail } from "@/lib/contact-email";
import { isEmail, validateContact, type ContactResult } from "@/lib/contact-request";
import { allowContactAttempt, isAllowedOrigin, readContactBody } from "@/lib/contact-security";
import { siteLinks } from "@/lib/site-content";

export const runtime = "nodejs";
export const maxDuration = 20;

function reply(result: ContactResult, status: number, retryAfter?: number) {
  return Response.json(result, {
    status,
    headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) },
  });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request, process.env.CONTACT_FORM_ORIGIN, process.env.VERCEL_URL)) return reply({ ok: false, message: "Abra o formulário no site da Saneyá para enviar o pedido." }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply({ ok: false, message: "Não foi possível validar o formato do pedido." }, 415);
  let body: unknown;
  try {
    body = await readContactBody(request);
  } catch (error) {
    return reply({ ok: false, message: "Não foi possível ler o pedido. Revise os campos e tente novamente." }, error instanceof RangeError ? 413 : 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply({ ok: false, message: "Revise os dados do pedido." }, 400);
  const payload = body as Record<string, unknown>;
  if (typeof payload.website !== "string" || payload.website.trim()) return reply({ ok: false, message: "Não foi possível validar o envio. Reabra o formulário e tente novamente." }, 400);
  if (typeof payload.reference !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.reference)) return reply({ ok: false, message: "Reabra o formulário para iniciar um novo pedido." }, 400);
  const validation = validateContact(payload);
  if (!validation.ok) return reply({ ok: false, message: "Revise os campos indicados antes de enviar.", errors: validation.errors }, 400);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const fromAddress = from?.match(/<([^<>]+)>$/)?.[1] ?? from ?? "";
  if (process.env.CONTACT_FORM_ENABLED !== "true" || !apiKey || !from || /[\r\n]/.test(from) || !isEmail(fromAddress)) return reply({ ok: false, message: "O formulário está indisponível no momento. Entre em contato por e-mail." }, 503);

  const source = process.env.VERCEL ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown" : "local";
  const limit = allowContactAttempt(source);
  if (!limit.allowed) return reply({ ok: false, message: "Aguarde alguns minutos e tente novamente." }, 429, limit.retryAfter);

  const delivery = await sendContactEmail(validation.data, payload.reference, { apiKey, from, to: siteLinks.email });
  if (delivery.accepted) return reply({ ok: true, reference: payload.reference }, 200);
  if (delivery.reason === "conflict") return reply({ ok: false, message: "O envio ainda não foi confirmado. Aguarde um minuto e tente novamente com os mesmos dados." }, 409);
  if (delivery.reason === "rate_limit") return reply({ ok: false, message: "O serviço de envio está ocupado. Aguarde um minuto e tente novamente." }, 429, 60);
  if (delivery.reason === "uncertain") return reply({ ok: false, message: "Não foi possível confirmar o envio. Tente novamente com os mesmos dados." }, 502);
  return reply({ ok: false, message: "O envio está indisponível no momento. Tente mais tarde ou entre em contato por e-mail." }, 503);
}
