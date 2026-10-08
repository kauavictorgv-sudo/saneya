export const contactServices = [
  "BET — Bacia de Evapotranspiração",
  "CAC — Captação de água da chuva",
  "Avaliação e diagnóstico",
  "Educação ambiental",
  "Acompanhamento de unidade",
  "Mutirões de limpeza de praia",
  "Workshop de reciclagem",
  "Outro serviço",
] as const;

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  city: string;
  service: string;
  message: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export type ContactResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; errors?: ContactErrors };

export const contactFieldNames: readonly (keyof ContactFields)[] = [
  "name", "email", "phone", "organization", "city", "service", "message",
];

export function isEmail(value: string) {
  if (value.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) return false;
  const [local, domain] = value.split("@");
  return local.length <= 64 && !local.startsWith(".") && !local.endsWith(".") && !local.includes("..")
    && domain.split(".").every((label) => label.length > 0 && label.length <= 63 && !label.startsWith("-") && !label.endsWith("-"));
}

export function validateContact(input: unknown):
  | { ok: true; data: ContactFields }
  | { ok: false; errors: ContactErrors } {
  const source = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown> : {};
  const data = {} as ContactFields;
  const errors: ContactErrors = {};
  for (const field of contactFieldNames) {
    const value = source[field] ?? "";
    if (typeof value !== "string") {
      data[field] = "";
      errors[field] = "Informe um texto válido para este campo.";
      continue;
    }
    data[field] = value.replace(/\r\n?/g, "\n").trim();
    const invalidControls = field === "message" ? /[\u0000-\u0008\u000b-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/;
    if (invalidControls.test(data[field])) errors[field] = "Remova os caracteres inválidos deste campo.";
  }
  if (!errors.name && (data.name.length < 2 || data.name.length > 80)) errors.name = "Informe seu nome com 2 a 80 caracteres.";
  if (!errors.email && !isEmail(data.email)) errors.email = "Informe um e-mail válido, como nome@empresa.com.";
  if (!errors.phone && data.phone && (!/^[+\d\s().-]+$/.test(data.phone) || data.phone.length > 30 || data.phone.replace(/\D/g, "").length < 8 || data.phone.replace(/\D/g, "").length > 15)) errors.phone = "Informe um telefone com 8 a 15 dígitos, incluindo DDD.";
  if (!errors.organization && data.organization.length > 120) errors.organization = "Use até 120 caracteres para a empresa.";
  if (!errors.city && data.city && (data.city.length < 2 || data.city.length > 100)) errors.city = "Informe cidade e estado com 2 a 100 caracteres.";
  if (!errors.service && !contactServices.some((service) => service === data.service)) errors.service = "Selecione o serviço de interesse.";
  if (!errors.message && (data.message.length < 10 || data.message.length > 1200)) errors.message = "Descreva sua necessidade com 10 a 1.200 caracteres.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
