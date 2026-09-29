import type { Metadata } from "next";
import CookiePreferences from "@/components/CookiePreferences";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Gerenciar Cookies", description: "Consulte e altere suas preferências de cookies neste navegador." };
export default function ManageCookiesPage() {
  return <LegalPage title="Gerenciar Cookies"><CookiePreferences manager /><noscript>Ative JavaScript para salvar uma preferência. Nenhum serviço opcional é carregado sem JavaScript. Você também pode limpar os dados do site nas configurações do navegador.</noscript></LegalPage>;
}
