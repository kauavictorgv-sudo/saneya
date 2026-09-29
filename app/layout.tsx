import type { Metadata } from "next";
import { Geist } from "next/font/google";
import WaterInteractions from "@/components/WaterInteractions";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Saneyá | Saneamento comunitário",
    template: "%s | Saneyá",
  },
  description:
    "Soluções comunitárias de saneamento e uso responsável da água com diagnóstico técnico, participação local, capacitação e acompanhamento.",
  keywords: [
    "Saneyá",
    "saneamento comunitário",
    "bacia de evapotranspiração",
    "água da chuva",
    "tecnologia social",
    "Saneyá Ambiental",
  ],
  applicationName: "Saneyá",
  category: "sustentabilidade",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Saneyá",
    title: "Saneyá | Saneamento que transforma comunidades",
    description:
      "Tecnologia social, participação comunitária e acompanhamento para ampliar o acesso ao saneamento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saneyá | Saneamento que transforma comunidades",
    description:
      "Tecnologia social, participação comunitária e acompanhamento para ampliar o acesso ao saneamento.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={geist.variable} data-scroll-behavior="smooth">
      <body>
        {children}
        <Footer />
        <CookieBanner />
        <WaterInteractions />
      </body>
    </html>
  );
}
