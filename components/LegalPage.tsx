import type { ReactNode } from "react";
import Link from "next/link";
import Brand from "@/components/Brand";
import { missingInformation, policyVersion, privacyLinks } from "@/lib/privacy";
export function PendingInformation({ label }: { label: string }) {
  return <p><strong>{label}:</strong> {missingInformation}.</p>;
}
export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return <main className="section-grid bg-surface-blue px-5 py-8 sm:px-8"><div className="mx-auto max-w-5xl">
    <header className="flex flex-wrap items-center justify-between gap-4"><Link href="/" aria-label="Saneyá — início"><Brand /></Link><Link href="/" className="button-secondary">Voltar ao site</Link></header>
    <article className="surface-card mt-8 rounded-3xl p-6 sm:p-10 lg:p-14"><p className="eyebrow">Privacidade e transparência · versão {policyVersion}</p><h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-5xl">{title}</h1><div className="legal-content mt-8 space-y-8 leading-7 text-ink-700">{children}</div></article>
    <nav aria-label="Privacidade e direitos" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">{privacyLinks.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center underline underline-offset-4">{link.label}</Link>)}</nav>
  </div></main>;
}
