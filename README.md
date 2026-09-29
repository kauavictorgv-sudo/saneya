# Site da Saneyá

Página institucional da Saneyá Ambiental, voltada a soluções comunitárias de saneamento e uso responsável da água.

## Tecnologias

- Next.js 16 com App Router;
- React 19;
- TypeScript;
- Tailwind CSS 4.

## Executar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Cadastro comercial

A rota `/cadastro` prepara um resumo local para revisão e envio manual pelo Instagram indicado. Não cria conta, não envia os campos para servidor e não copia automaticamente. Nome de preferência, organização e descrição são opcionais; cidade/UF e serviço contextualizam a solicitação. A cópia para a área de transferência exige um clique separado. Limpar formulário remove campos/resumo, mas não cópias no dispositivo ou mensagens externas.

A ativação de envio direto exige um destino institucional, validação no servidor, proteção contra abuso e uma política de privacidade publicada.

## Conteúdo a confirmar

Links e informações reutilizados em mais de uma seção ficam em `lib/site-content.ts`. Antes da publicação definitiva, ainda precisam ser confirmados:

- dados volumétricos e memória de cálculo dos indicadores;
- situação atual e última inspeção das unidades;
- autorização final de uso das imagens fornecidas;
- e-mail, WhatsApp e formulários institucionais;
- identidade jurídica, bases legais, retenção, responsáveis e canal de privacidade.

Ao publicar, configure `NEXT_PUBLIC_SITE_URL` com a URL definitiva do site para que os metadados de compartilhamento usem o domínio correto.

## Privacidade e LGPD

Páginas disponíveis: `/politica-de-privacidade`, `/politica-de-cookies`, `/termos-de-uso`, `/gerenciar-cookies` e `/direitos-lgpd`. O rodapé aparece em todas as rotas. Informações institucionais desconhecidas estão marcadas explicitamente; a existência dessas páginas não significa conformidade integral.

O inventário de serviços opcionais está vazio. A escolha do banner fica apenas em `localStorage`, na chave `saneya:cookie-preferences`, após ação do visitante. Aceitar não autoriza futuros serviços. Novas integrações exigem atualização do inventário/versão, consentimento granular quando aplicável, gate real de carregamento, revogação e nova auditoria de rede. A CSP bloqueia conexões externas automáticas na versão atual.

O canal LGPD está inativo até o responsável fornecer e testar um e-mail monitorado. O ponto de configuração é `lib/privacy.ts`; atualizar também as lacunas relacionadas nos textos e no inventário após confirmação. Não configurar endereços fictícios.

- [Auditoria e mapa dos fluxos](docs/auditoria-lgpd.md).
- [Pendências para conformidade e publicação](docs/pendencias-para-conformidade-e-publicacao.md).
- Testes de navegador: `scripts/audit-privacy.mjs`; evidências em `artifacts/privacy-audit/`.

Após instalar as dependências pelo lockfile, reconstruir e reiniciar a aplicação para aplicar as correções de segurança e os cabeçalhos. A hospedagem deve preservar esses cabeçalhos. Confirmar HTTPS, logs, cookies do provedor e permissões no domínio publicado.
