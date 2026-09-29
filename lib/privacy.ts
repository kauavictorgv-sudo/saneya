// Preencher somente com informações institucionais confirmadas.
export const privacyContact: { email: string | null } = { email: null };
export const missingInformation = "informação necessária do responsável pelo projeto";
export const policyVersion = "1.0";
export const privacyLinks = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/gerenciar-cookies", label: "Gerenciar Cookies" },
  { href: "/direitos-lgpd", label: "Direitos e canal LGPD" },
] as const;
export const dataRights = [
  "Confirmação de tratamento e acesso aos dados",
  "Correção de dados incompletos, inexatos ou desatualizados",
  "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados irregularmente",
  "Eliminação de dados tratados com consentimento, quando aplicável",
  "Informações sobre compartilhamento de dados",
  "Revogação de consentimento e informação sobre a possibilidade de não consentir e suas consequências",
  "Oposição ao tratamento, quando cabível",
  "Portabilidade, conforme regulamentação aplicável",
  "Revisão de decisões tomadas unicamente por tratamento automatizado, quando aplicável",
] as const;
