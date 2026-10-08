# Pedidos de atendimento por e-mail

Implementação de 08/10/2026. O site e a API continuam na Vercel. O Resend realiza o encaminhamento para `saneyaambiental@gmail.com`.

## Fluxo implementado

1. Visitante preenche nome, e-mail, serviço e descrição (obrigatórios). Telefone, empresa e cidade/UF são opcionais.
2. Navegador valida e envia JSON por `POST /api/atendimento`, na própria origem do site.
3. Servidor valida novamente, verifica origem, campo contra bots, tamanho e frequência.
4. Servidor chama a API HTTPS do Resend, com destinatário fixo e e-mail do interessado em `reply_to`.
5. A tela confirma somente quando o Resend retorna aceitação com identificador. Falhas mantêm os campos.
6. A equipe responde ao e-mail recebido. Referência, serviço e dados estão no corpo da mensagem, com versões HTML e texto.

Não há login, banco de clientes, pagamento, acompanhamento de status ou mensagem automática adicional para o interessado. A referência identifica o envio e ajuda a localizar a mensagem; não equivale a um protocolo persistido no site. Aceitação pelo Resend não comprova entrega na caixa de entrada ou leitura pela equipe.

## Configuração necessária para enviar de verdade

O endpoint retorna 503 enquanto o serviço não estiver habilitado ou faltar credencial/remetente. Não existe modo de sucesso fictício na aplicação. Os testes usam simulações externas ao código de produção.

No projeto da Vercel, em Settings → Environment Variables, configure:

| Variável | Valor |
| --- | --- |
| `RESEND_API_KEY` | Chave do Resend com permissão de envio; restrinja ao domínio quando disponível. |
| `CONTACT_EMAIL_FROM` | Remetente autorizado no Resend, com nome Saneyá Ambiental. |
| `CONTACT_FORM_ORIGIN` | Origem HTTPS exata do site, por exemplo o endereço real do deployment ou domínio próprio, sem caminho. Não use um endereço inventado. |
| `CONTACT_FORM_ENABLED` | `true` somente depois de concluir a configuração e validar a proteção de frequência. |

- Para previews, se `CONTACT_FORM_ORIGIN` estiver vazio, a origem usa a variável `VERCEL_URL` fornecida pela Vercel. Com domínio próprio, informe a origem explicitamente.
- Para teste local em localhost/127.0.0.1, a origem é reconhecida sem configuração. Testes em endereço de rede local não estão liberados automaticamente.
- Nunca use `NEXT_PUBLIC_` para a chave, nunca a coloque no código e não a envie pelo chat.
- Após mudar variáveis na Vercel, faça novo deployment. Cada ambiente precisa de sua própria configuração.
- Não use o e-mail do visitante no campo `from`. O destinatário institucional é definido em `lib/site-content.ts`; o navegador não pode escolher outro destinatário.

### Resend e domínio

Crie a conta e autorize um remetente. Em produção, configure um domínio que a Saneyá controle, incluindo os registros DNS de autenticação solicitados pelo Resend. Isso não exige trocar a hospedagem da Vercel.

Se estiver usando o remetente de testes do Resend, respeite a restrição de destinatários da conta e confirme que a caixa institucional está autorizada para esse teste. Não habilite esse remetente como solução definitiva para produção.

### Firewall da Vercel

Configure no projeto uma regra para `POST` no caminho `/api/atendimento`, com janela fixa, chave por IP e limite inicial de 5 tentativas em 10 minutos. Use resposta 429. Verifique disponibilidade, cobrança e os limites do plano antes de ativar a regra.

O código também limita 5 tentativas válidas por origem de rede em 10 minutos, por instância. Esse contador é temporário, limitado em tamanho e usa HMAC com chave aleatória da instância, sem manter o IP original. Ele é uma proteção complementar: instâncias/regiões diferentes não compartilham esse mapa. O Firewall também possui contadores por região; não trate o limite como um teto global absoluto.

O formulário bloqueia envio simultâneo; repetições sem alteração dos campos reutilizam a referência e a chave de idempotência no Resend. Essa proteção dura até 24 horas no provedor. Alterar os campos, limpar ou reabrir a página inicia outra tentativa. Não há garantia de deduplicação entre páginas distintas.

## Rotina da empresa

- A CEO acompanha a caixa institucional, responde por e-mail e organiza a conclusão ou cancelamento do atendimento.
- Regra adotada: pedidos cancelados ou encerrados sem contratação devem ser excluídos em até 30 dias após o encerramento. Isso é uma decisão operacional, não um prazo fixado pela LGPD.
- A exclusão é manual na caixa de e-mail. Revise lixeira, cópias, encaminhamentos, backups e retenção do Resend/Google. O site não consegue apagar todas essas cópias.
- Pedidos convertidos em contratação requerem critérios próprios de conservação dos documentos necessários.
- Restrinja acesso às contas e ative autenticação multifator.
- O mesmo e-mail institucional foi adotado para dúvidas sobre dados pessoais. A identificação jurídica do controlador, nome do responsável, base legal aplicável e condições de retenção dos provedores ainda precisam ser documentados antes da publicação definitiva das políticas.
- Não há uso dos pedidos para marketing. Isso exige finalidade e decisão próprias se for solicitado no futuro.

## Arquivos principais

- `components/ServiceRegistrationForm.tsx`: campos, validação, envio e estados.
- `lib/contact-request.ts`: campos e validação compartilhados.
- `lib/contact-email.ts`: modelo do e-mail e comunicação com Resend.
- `lib/contact-security.ts`: verificação de origem, corpo e controle local de frequência.
- `app/api/atendimento/route.ts`: endpoint e credenciais exclusivamente no servidor.
- `.env.example`: nomes das variáveis, sem segredos.
- `tests/contact-request.test.mjs`: validação, template, segurança e rota real com provedor simulado.
- `scripts/audit-privacy.mjs`: verificação de privacidade e interação; resultados desta versão vão para `artifacts/privacy-audit-email/`.

## Verificação

Execute `npm.cmd run lint`, `npm.cmd run test:contact` e `npm.cmd run build`. Os testes de contato precisam de Node.js com suporte a TypeScript nativo (22.18 ou superior). Não exigem chave real nem enviam e-mails.

Antes de ativar produção, faça um envio controlado com dados fictícios: confirme o recebimento em `saneyaambiental@gmail.com`, o botão Responder apontando ao e-mail do teste e o tratamento de falhas. Acompanhe rejeições no painel do Resend; o aplicativo não implementa webhooks de entrega. Esta validação de caixa real não pode ser substituída por testes simulados.

### Resultados verificados nesta implementação

- 12 testes de validação, modelo de e-mail, falhas do provedor, origem, tamanho de corpo, frequência e rota real com transporte simulado passaram.
- A suíte de privacidade passou com cabeçalhos de produção, preferências, navegação, falha/aceitação simuladas do envio, limpeza, armazenamento bloqueado e JavaScript desativado. Evidências em `artifacts/privacy-audit-email/results.json`, preservando a auditoria anterior.
- Teste adicional no navegador: sem transbordamento em 1440, 768, 390 e 320 px; envio lento desabilita os controles; respostas 429 em HTML, falha de rede e conflito conservam os dados e a referência; aceitação simulada move o foco à confirmação e limpa o formulário.
- A API real, sem configuração, retornou indisponibilidade e não mostrou sucesso. Nenhum e-mail real foi enviado nesta validação.

Referências: [Vercel — envio de e-mails](https://vercel.com/kb/guide/sending-emails-from-an-application-on-vercel), [Vercel — rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), [Resend — API](https://resend.com/docs/api-reference/emails/send-email), [Resend — idempotência](https://resend.com/docs/dashboard/emails/idempotency-keys), [ANPD — finalidade e término do tratamento](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes).
