# Auditoria técnica de privacidade e proteção de dados

Escopo: aplicação local Saneyá, fontes em `app`, todos os componentes, `lib`, CSS, assets públicos, configuração, manifesto/lock de dependências e documentação. Não foram acessados painéis de hospedagem, mensagens de contas sociais, contratos ou dados de usuários. Artefatos de teste usam somente dados fictícios. Não há evidência de incidentes nesta análise; vulnerabilidade de dependência não prova exploração.

## Arquitetura encontrada

- Next.js App Router, React, TypeScript e Tailwind. Páginas geradas estaticamente; entrega por servidor Next nesta validação.
- Antes da alteração: `/`, `/cadastro` e uma página de privacidade em preparação. Nenhuma rota de API, Server Action, banco, ORM, provedor de autenticação, newsletter ou sistema de pagamentos.
- `/cadastro` era um gerador de texto local. Solicitava nome completo, e-mail e telefone obrigatórios, apesar de o canal de envio ser uma mensagem manual no Instagram; copiava o resumo sem ação separada. Não havia conta autenticada apesar do rótulo Área do cliente.
- Nenhum Analytics, Google Ads, Meta Pixel, GTM, Clarity, Hotjar, vídeo/iframe ou script de marketing. Os links sociais eram links normais. Animações e eventos de ponteiro são efeitos visuais locais, sem telemetria.
- Imagens locais; uma fotografia de atividades com pessoas, usada no hero/caso. A fonte Geist via `next/font/google` é obtida no build e hospedada junto da aplicação; não exige conexão do visitante com Google Fonts.
- Nenhuma credencial/API key encontrada nas fontes da aplicação. `NEXT_PUBLIC_SITE_URL` contém apenas a URL pública; não deve receber segredos. Não foram encontrados arquivos `.env` ou configuração de host no diretório do projeto examinado. Arquivos SVG de exemplo, como `vercel.svg`, não comprovam o provedor contratado.

## Mapa completo dos fluxos

**N/D institucional** nas tabelas significa literalmente **informação necessária do responsável pelo projeto**. “Não implementado” descreve ausência verificada no código, não garantia sobre operações externas.

| Fluxo/origem | Frontend | Backend/API | Armazenamento/destino | Terceiros | Responsáveis com acesso | Retenção | Exclusão |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Visitante digita contexto comercial | Formulário: cidade/UF e serviço; nome de preferência, organização e descrição opcionais | Nenhum envio; texto processado localmente | Memória/DOM da página | Nenhum destinatário automático | Visitante; softwares do dispositivo podem acessar seu navegador | Enquanto a página é utilizada | Limpar formulário; limpeza na saída/pagehide; não controla autofill/extensões |
| Visitante clica em Copiar resumo | `navigator.clipboard.writeText`, sem leitura de clipboard | Nenhum | Área de transferência do sistema | Sincronização do sistema pode existir, conforme dispositivo | Usuário e aplicações/automações com acesso permitido pelo sistema | Critério do dispositivo/histórico; não controlado pelo site | Usuário limpa a área de transferência/histórico; Limpar formulário não apaga clipboard |
| Visitante abre perfil e envia mensagem manualmente | Link simples para Instagram; resumo não vai na URL | Serviço externo, sem API integrada | Mensagem/perfil na plataforma; exportações externas são N/D institucional | Instagram; entidades contratuais e suboperadores: N/D institucional | Equipe que acessa o perfil: N/D institucional | N/D institucional | Procedimento da Saneyá e limites da plataforma: N/D institucional |
| Visitante escolhe preferência | Banner/gerenciador | Nenhum envio de preferência | `localStorage`: `saneya:cookie-preferences` | Nenhum no código | Código executado na mesma origem e usuário/dispositivo; sem acesso remoto implementado | Até substituição/limpeza; versão diferente invalida a preferência | Recusa substitui escolha; limpar dados do site remove registro |
| Visitante navega | Requisições de página, arquivos e imagens; IP e metadados técnicos no transporte | Servidor Next/otimizador local e infraestrutura a identificar | Código sem logging próprio; logs de servidor/CDN: N/D institucional | Host/CDN/proxy: N/D institucional | Administradores/prestadores: N/D institucional | Logs/backups: N/D institucional | Política/configuração de host: N/D institucional |
| Visitante abre link social, documento ou fonte legal | Links com `noopener noreferrer`, sem embed | Servidor externo ao navegar | Instagram, LinkedIn, TikTok, Planalto e gov.br/ANPD | Respectivos destinos; o site não os carrega automaticamente | Equipes dos destinos segundo suas condições; não verificado | Não controlada pelo site | Controles do navegador e canais dos destinos |
| Equipe fornece foto e publica conteúdo | Foto servida do próprio site | Build/servidor e otimização de imagem | `public/saneya-hero.jpg`, saída gerada/cache e infraestrutura | Fornecedor/autor da imagem e host: N/D institucional | Quem edita, publica ou administra: N/D institucional | Finalidade e critério: N/D institucional | Retirar origem/referências, reconstruir e invalidar caches sob controle; cópias de terceiros não garantidas |
| Equipe gera build com fonte Geist | Fonte entregue localmente ao visitante | `next/font/google` obtém fonte no build | Arquivos de fonte no build/host | Google apenas na obtenção pela infraestrutura de build; sem dados do formulário | Operadores do build/host: N/D institucional | Vida do build/cache e critérios do host | Reconstrução/remoção de fonte; limpeza dos caches aplicáveis |
| Titular consulta direitos | Página de instruções/modelo; não coleta campos | Nenhum endpoint; contato ainda nulo | Nenhum pedido é armazenado ou enviado pelo site | Futuro provedor da caixa de e-mail: N/D institucional | Responsável pelo atendimento: N/D institucional | N/D institucional para pedidos futuros | N/D institucional; definir registro mínimo e exceções antes de operar |
| Cadastro de conta, login, newsletter, WhatsApp, marketing | Não implementados | Não implementados | Não há base de usuários no projeto | Nenhum integrado | Não aplicável ao código atual | Não aplicável | Não há conta local a excluir |

## Finalidades e bases

| Tratamento | Finalidade identificável | Base legal institucional |
| --- | --- | --- |
| Formulário local | Organizar contexto para uma solicitação iniciada pelo visitante | Informação necessária do responsável pelo projeto |
| Cópia e envio voluntário | Facilitar comunicação solicitada, mediante ações distintas | Informação necessária do responsável pelo projeto |
| Preferência necessária | Respeitar e lembrar a escolha sobre o inventário | Informação necessária do responsável pelo projeto; não é autorização de marketing |
| Entrega e possíveis logs | Entregar páginas; eventual finalidade de segurança/logging deve ser confirmada | Informação necessária do responsável pelo projeto |
| Imagens de pessoas | Apresentar atividades institucionais | Informação necessária do responsável pelo projeto; autorização/origem não demonstradas |
| Atendimento LGPD futuro | Receber e tratar pedidos de direitos | Informação necessária do responsável pelo projeto; documentar obrigação, escopo e registros |

Não foi escolhida uma base legal apenas por parecer usual. O fato de haver ação voluntária não foi usado como consentimento genérico. As bases correspondentes devem ser validadas e publicadas pelo controlador antes de apresentar a política como completa.

## Cookies, scripts e garantias técnicas

A URL de documento do CEFET/RJ existe em `siteLinks.institutionalSource`, mas não é renderizada por nenhum componente atual. Não representa conexão ou fluxo ativo. As fontes legais e ANPD acrescentadas nas políticas são links simples.

O inventário opcional é vazio. O novo registro local contém somente `version`, `action`, `necessary: true` e `optional: false`. Não contém nome, e-mail, telefone, histórico de páginas, horário, ID individual ou fingerprint. Antes de escolher não há gravação. Sem armazenamento disponível, há fallback em memória com aviso. Registros inválidos ou de outra versão não são aceitos. Mudanças em outras abas são refletidas pelo evento `storage`.

Aceitar todos, recusar e personalizar produzem o mesmo conjunto de serviços ativos nesta versão: apenas a funcionalidade necessária. A ação escolhida é registrada, mas não concede consentimento para futuros opcionais. O gerenciador é uma página, não um modal; não exige armadilha de foco. Não há categorias fictícias marcadas como consentidas.

A CSP limita scripts externos, conexões, imagens, fontes e frames; `form-action 'none'` bloqueia submissões nativas. Scripts inline continuam permitidos para a hidratação estática do Next. Essa CSP não impede scripts maliciosos na mesma origem ou uma integração futura feita incorretamente; não substitui revisão de código. Não foi instalado um carregador genérico de rastreadores inexistentes. Qualquer futuro serviço exige inventário nominal, finalidade/base, gate granular antes de montagem/requisição, revogação com interrupção e limpeza aplicável, revisão de CSP e novos testes de rede. O registro local atual não é prova de consentimento para essa integração.

## Revisão de cadastro e segurança

- Eliminados e-mail e WhatsApp porque o retorno já ocorre no perfil de Instagram usado pelo visitante. Nome completo deixou de ser exigido; nome de preferência é opcional.
- Cidade/UF e serviço permanecem para contextualização técnica; organização e mensagem são opcionais e têm finalidade indicada. Campos limitados a 80/120/100/1200 caracteres, serviço validado por lista e cidade validada após trim. Controles ASCII são removidos do resumo.
- Removido checkbox obrigatório de ciência que não comprovava base legal. Aviso de privacidade e direitos permanece acessível sem aceite obrigatório.
- Preparar não copia nem envia. Copiar é explícito e trata erro/permissão negada. O resumo é renderizado como texto, sem HTML arbitrário. Edição de campo invalida o resumo anterior; limpar reseta campos e estado.
- SSR entrega os campos desabilitados até a hidratação; sem JavaScript não há formulário nativo com dados em query string. CSP fornece uma segunda proteção contra envio acidental.
- Não há senhas, tokens, sessões, consultas SQL ou endpoint mutável. Autorização, hash de senha, exclusão de conta, SQL injection e CSRF de sessão não se aplicam a uma funcionalidade inexistente. Se for adicionada uma API, a validação atual no cliente não será proteção suficiente.
- Não há logging de campos na aplicação. Logs de infraestrutura, proteção de credenciais de administradores, backups e controles de contas externas dependem de verificação operacional.
- Cabeçalhos adicionados: CSP, no-referrer, nosniff, DENY para frames e bloqueio de câmera/microfone/geolocalização. HTTPS/HSTS e controles do host não foram presumidos.
- A auditoria de dependências encontrou riscos críticos no Next original e alto no sharp. Atualização de segurança efetuada e versão final/resultado registrados nas evidências. Não houve migração de stack nem adição de biblioteca à aplicação.

Versões corrigidas verificadas: Next e eslint-config-next **16.3.4**, sharp **0.35.4** e js-yaml **4.3.2** (dependência das ferramentas de desenvolvimento). A auditoria completa, incluindo desenvolvimento, retornou zero vulnerabilidades conhecidas, reconfirmado em 11/09/2026. Isso não garante ausência de vulnerabilidades desconhecidas. A instalação apontou limpeza de um binário temporário bloqueado no Windows e um script de instalação pendente; a compilação e o lint funcionaram sem liberar scripts adicionais.

## Procedimento de atendimento a instituir

1. Confirmar e publicar uma caixa monitorada, responsável e substituto. O código permite configurar e-mail em `lib/privacy.ts`; o link abre um aplicativo e não equivale a envio/recebimento automático.
2. Receber a solicitação com indicação do direito/contexto e o mínimo necessário para localizar dados. Não exigir CPF/documento por padrão. Gerar referência interna somente depois de receber efetivamente; confirmar recebimento pelo canal.
3. Classificar o pedido, verificar identidade proporcionalmente quando a entrega/exclusão puder afetar dados de alguém e encaminhar internamente por acesso restrito.
4. Localizar dados em todos os destinos sob responsabilidade da organização (mensagens, eventuais exportações, imagens, logs e operadores). Documentar inexistência quando não houver tratamento correspondente.
5. Avaliar aplicabilidade, conservação e limitações; executar correção, acesso, bloqueio, anonimização, oposição ou exclusão cabível, envolvendo operadores e destinatários conforme o caso. Não prometer apagar cópias fora de controle.
6. Responder com resultado e motivos de eventual limitação/recusa, sem incluir dados de terceiros. Observar os prazos legais aplicáveis a cada direito; não adotar um prazo único de 15 dias para todos os pedidos. Para confirmação/acesso, validar a aplicação do art. 19 (resposta simplificada imediata ou declaração completa no prazo legal).
7. Registrar apenas evidência necessária de recebimento, decisão e execução, com retenção aprovada e permissões restritas. Acompanhar atraso/incidente e revisão do procedimento. Não há promessa pública de operação desse processo enquanto não for implantado.

## Verificação e evidências

Resultado final: lint, TypeScript e build aprovados. O teste de navegador concluiu 13 grupos de verificações com zero requisições automáticas para outras origens e zero erros JavaScript; o detalhe está em `artifacts/privacy-audit/results.json`. Houve inspeção visual dos registros desktop e mobile de 390px. O teste do formulário utilizou clipboard simulado, incluindo sucesso e permissão negada; envio externo real não foi realizado. A revisão final dos artefatos ocorreu em 11/09/2026.

- `npm.cmd run lint`, `npx.cmd tsc --noEmit`, `npm.cmd run build`.
- `npm.cmd audit --omit=dev --json` e auditoria completa de dependências após correções.
- `scripts/audit-privacy.mjs` testa a versão de produção local em Edge headless. Requer Node com suporte a TypeScript nativo e Playwright já disponível no ambiente; não é dependência da aplicação. Execute com o servidor em `http://127.0.0.1:3100` (ou `PRIVACY_TEST_URL`) e o pacote acessível pelo `NODE_PATH`, quando usar um runtime externo.
- Resultados, versões e imagens ficam em `artifacts/privacy-audit/`. Limites: execução local não certifica infraestrutura publicada, conformidade jurídica, atendimento humano ou outros navegadores.

## Arquivos alterados/criados

- Páginas: `app/politica-de-privacidade/page.tsx`, `app/politica-de-cookies/page.tsx`, `app/termos-de-uso/page.tsx`, `app/gerenciar-cookies/page.tsx`, `app/direitos-lgpd/page.tsx`.
- Estrutura e texto: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/cadastro/page.tsx`, `components/Footer.tsx`, `components/Contact.tsx`, `lib/site-content.ts`.
- Componentes e estado: `components/LegalPage.tsx`, `components/CookieBanner.tsx`, `components/CookiePreferences.tsx`, `components/ServiceRegistrationForm.tsx`, `lib/privacy.ts`, `lib/cookie-consent.ts`.
- Segurança/dependências: `next.config.ts`, `package.json`, `package-lock.json`.
- Documentação/testes: `README.md`, `docs/auditoria-lgpd.md`, `docs/pendencias-para-conformidade-e-publicacao.md`, `scripts/audit-privacy.mjs` e evidências em `artifacts/privacy-audit/`.

O Header manteve apresentação, rótulos e comportamento; não foi criada área autenticada. Leia o relatório **Pendências para conformidade e publicação** antes de publicar.

