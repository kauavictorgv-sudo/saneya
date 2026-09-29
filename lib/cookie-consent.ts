export const CONSENT_KEY = "saneya:cookie-preferences";
// Alterar a versão quando o inventário/finalidades mudar. Escolhas antigas não autorizam novos serviços.
export const CONSENT_VERSION = 1;
export type ConsentAction = "all" | "necessary" | "custom";
export type Consent = { version: number; action: ConsentAction; necessary: true; optional: false };
export function createConsent(action: ConsentAction): Consent {
  // Não registrar autorização genérica: nenhum serviço opcional está instalado.
  return { version: CONSENT_VERSION, action, necessary: true, optional: false };
}
export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const candidate = value as Partial<Consent>;
    if (candidate.version !== CONSENT_VERSION || candidate.necessary !== true || candidate.optional !== false ||
      !["all", "necessary", "custom"].includes(candidate.action ?? "")) return null;
    return createConsent(candidate.action as ConsentAction);
  } catch { return null; }
}
