"use client";
import { usePathname } from "next/navigation";
import CookiePreferences from "@/components/CookiePreferences";
export default function CookieBanner() {
  const pathname = usePathname();
  // As páginas de informação e escolha permanecem desobstruídas.
  if (["/gerenciar-cookies", "/politica-de-cookies", "/politica-de-privacidade", "/direitos-lgpd", "/termos-de-uso"].includes(pathname)) return null;
  return <CookiePreferences />;
}
