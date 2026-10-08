# Pendências para conformidade e publicação

> Atualização de 08/10/2026: o formulário passou a enviar pedidos por API para o e-mail institucional, quando o Resend estiver configurado e habilitado. A caixa de contato foi adotada para atendimento de privacidade, sob acompanhamento operacional da CEO. As referências abaixo a ausência de backend/envio/canal e a campos removidos descrevem a auditoria histórica; não representam o inventário atual. Consulte `envio-pedidos-vercel.md` e a Política de Privacidade atual para o novo fluxo. Identificação jurídica, base legal e condições dos provedores continuam pendentes; a exclusão em até 30 dias para pedidos encerrados sem contratação/cancelados depende da rotina da equipe.

Análise do código e implementação local em 09/09/2026 (horário de Brasília). Este relatório não declara conformidade integral nem autoriza publicação como se as lacunas abaixo estivessem resolvidas. A aplicação foi examinada; contas externas, infraestrutura publicada, contratos, processos administrativos e operações fora do site não foram auditados.

**Resultado:** estrutura técnica e páginas implementadas; publicação definitiva das políticas e atendimento LGPD dependem de informações e ações do responsável. Nenhum CNPJ, endereço, e-mail, prazo institucional, operador ou base legal foi presumido. Em todas as pendências de dados institucionais abaixo, o estado é **informação necessária do responsável pelo projeto**.

**Revisão final em 11/09/2026:** os resultados finais salvos confirmam aprovação do lint, TypeScript, build de produção e 13 grupos de verificações automatizadas em Edge, com inspeção visual desktop e mobile (390px). As verificações cobrem escolhas de cookies, navegação por teclado, sincronização entre abas, ausência de envio do formulário, cópia negada, limpeza, armazenamento bloqueado e JavaScript desativado. Foram observados zero pedidos externos automáticos e zero erros JavaScript nesses cenários. A auditoria completa de dependências foi consultada novamente em 11/09 e retornou zero vulnerabilidades conhecidas. Evidências em `artifacts/privacy-audit/`; isso não substitui auditoria do domínio publicado nem validação jurídica/operacional.

## 1. Informações que preciso fornecer

| Pendência — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Identidade jurídica do controlador | A marca Saneyá Ambiental não identifica quem decide o tratamento | Política de Privacidade §1 e Termos §1 | Nome/razão social, CNPJ se aplicável, endereço e vínculo com a marca | crítica |
| Canal LGPD confirmado e monitorado | Sem um destinatário real, a página de orientações não recebe pedidos | `lib/privacy.ts`, `/direitos-lgpd` e política | Endereço de e-mail institucional, confirmação de recebimento e pessoa/função que o monitora | crítica |
| Responsável pelo atendimento e encarregado, quando aplicável | Direcionar pedidos e dar transparência à governança | Canal LGPD e procedimento interno | Identificação e contato divulgável; avaliar obrigação ou dispensa aplicável | alta |
| Hospedagem e domínio de produção | O código não revela operador, localização, logs ou serviços ativados no painel | Política §5, auditoria de produção e configuração de domínio | Provedor, produto/plano, domínio, regiões, CDN/proxy e recursos habilitados | alta |
| Acessos às mensagens e infraestrutura | Identificar responsáveis com acesso real aos dados | Inventário de dados, política e matriz de acesso | Funções autorizadas, contas compartilhadas, prestadores e responsáveis por exclusão | alta |

## 2. Decisões jurídicas/administrativas necessárias

| Pendência — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Definir base legal por finalidade | Consentimento de cookies não cobre atendimento comercial, imagens ou logs | Política §3 e inventário | Validar fundamento e justificativa para formulário local, preferência necessária, contatos externos, imagens, infraestrutura e pedidos LGPD | alta |
| Aprovar retenção, conservação e exclusão | Não há prazos institucionais comprovados | Política §4 e rotina de exclusão | Critério/prazo por finalidade, marco inicial, exceções legais, tratamento de backups e responsáveis pela execução | alta |
| Instituir processo de direitos e verificação proporcional | Evitar pedidos sem resposta e entrega de dados a pessoa indevida | Procedimento de atendimento | Designar equipe, prazos legais por direito, verificação mínima, escalonamento e registro de resposta | crítica |
| Avaliar contratos e transferência internacional | País do fornecedor não prova onde os dados são tratados | Política §5 e contratos | Levantar operadores/suboperadores, países, contratos, salvaguardas e mecanismo aplicável; validar com apoio jurídico | alta |
| Autorizar publicação das fotografias | Há pessoas identificáveis nas fotos; a autorização não acompanha o código | Hero, caso em destaque e política §2 | Evidências de origem, licenças, autorização/base aplicável, identificação de menores se houver, e procedimento de retirada | alta |
| Aprovar redação final e incidentes | Políticas precisam refletir a operação e o atendimento real | Todas as páginas legais e processo interno | Revisão jurídica/administrativa, aprovação de versão/data e plano de resposta e comunicação a incidentes | alta |

## 3. Serviços externos que precisam ser configurados

| Pendência — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Caixa de atendimento LGPD | Um link de e-mail só abre o aplicativo do usuário; entrega e resposta dependem do serviço | Canal e rotina de atendimento | Criar/designar caixa, restringir acesso, ativar MFA, testar recebimento, resposta e indisponibilidade | crítica |
| Segurança e privacidade da hospedagem | Cabeçalhos do Next precisam chegar ao navegador; o provedor pode injetar analytics ou cookies | Ambiente publicado | Configurar HTTPS, revisar logs/retenção, permissões, backups, serviços automáticos e preservação da CSP; avaliar HSTS após validar domínio/HTTPS | alta |
| Conta institucional de Instagram | Mensagens comerciais passam a existir fora do site | Fluxo comercial | Confirmar controle do perfil, acesso, MFA, atendimento, política de retenção/exclusão e prestadores com acesso | alta |
| Domínio definitivo | Metadados usam localhost na ausência de configuração | `NEXT_PUBLIC_SITE_URL` | Informar e configurar URL HTTPS oficial no ambiente de publicação | média |

## 4. Dados ausentes para completar as políticas

| Pendência — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Identificação, canal, bases, retenção e destinatários completos | São lacunas expressamente visíveis no texto atual | Política de Privacidade §§1, 3, 4 e 5 | Consolidar respostas das seções 1 e 2 e substituir cada marcação de informação necessária | alta |
| Logs/cookies adicionados pela produção | O inventário local não comprova o comportamento do host | Política de Cookies e fluxo de navegação | Relação de cookies, cabeçalhos Set-Cookie, finalidades, terceiros, duração e evidências da inspeção do domínio real | alta |
| Localização e garantias de transferências | Não se pode afirmar armazenamento exclusivo no Brasil | Política §5 | Países de armazenamento/acesso e mecanismos aplicáveis aos serviços efetivamente usados | alta |
| Licenças, imagens e condições institucionais | Termos não podem conceder direitos que a Saneyá não possui | Termos §4 e política de imagens | Titularidade dos materiais, permissões de uso e contato para retirada | média |

## 5. Implementações técnicas ainda pendentes

| Pendência — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Ativar destinatário do canal LGPD | `privacyContact.email` permanece nulo para não inventar contato | `lib/privacy.ts` e `/direitos-lgpd` | Fornecer e-mail validado; depois atualizar configuração e textos relacionados, reconstruir e testar envio manual | crítica |
| Aplicar configurações no ambiente publicado | Alterar arquivos locais não atualiza produção nem servidor em execução | Hospedagem | Publicar versão testada, reconstruir/reiniciar o serviço e verificar cabeçalhos e dependências efetivas | alta |
| Gate por serviço se futuramente houver rastreadores | O inventário atual é vazio; não existe autorização genérica válida para futura integração | Gerenciador, inventário, carregador e CSP | Antes de integrar: fornecer serviço/finalidade, aprovar base, implementar consentimento granular, carregamento condicionado e interrupção/limpeza na revogação; incrementar versão e repetir testes | alta |
| Backend de cadastro/login, somente se futuramente solicitado | Hoje não existe conta a proteger ou excluir; criar um banco agora adicionaria coleta desnecessária | Futuro projeto de área autenticada | Definir requisitos antes de habilitar persistência; prever validação no servidor, autorização, proteção de credenciais, abuso, CSRF conforme arquitetura, logs mínimos e exclusão | baixa |

## 6. Itens que exigem validação manual

| Pendência — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Inspeção do domínio publicado | Extensões, CDN, painéis e proxies podem alterar o inventário | DevTools/Network e armazenamento do navegador | Testar sessão limpa antes de escolha, aceite, recusa, personalização, revogação e navegação entre rotas; registrar cookies, conexões, CSP e ausência de payload pessoal | alta |
| Ensaio completo de solicitação LGPD | Página de orientação não comprova atendimento operacional | Caixa de entrada e equipe responsável | Enviar pedido fictício autorizado, confirmar recebimento, localização, verificação proporcional, resposta e encerramento; não usar dados reais de terceiros | crítica |
| Contas sociais, retenção e exclusão | O site não controla mensagens, cópias e backups de terceiros | Instagram e eventual serviço de e-mail | Testar com conta/dados de teste e documentar limites, responsabilidades e exclusão possível | alta |
| Acessibilidade e dispositivos reais | Os testes automatizados não substituem leitor de tela e navegadores diversos | Banner, gerenciador, formulário e páginas | Validar teclado, NVDA/VoiceOver, zoom 200%, Safari/iOS, Android, clipboard negado e navegadores privados | média |
| Aprovação dos textos pela operação | O responsável deve confirmar que cada afirmação corresponde à prática | Páginas legais e inventário | Revisar todos os fluxos, remover lacunas apenas com evidência e registrar aprovação | alta |

## 7. Possíveis riscos ou inconsistências encontradas

| Pendência/risco — o que falta | Por que é necessário | Onde será utilizado | Informação/ação que você deve fornecer | Prioridade |
| --- | --- | --- | --- | --- |
| Páginas legais ainda incompletas | Publicá-las como prova de conformidade seria incompatível com lacunas visíveis | Comunicação e publicação | Resolver os itens críticos e revisar texto antes de afirmar conformidade | crítica |
| Ausência de canal efetivamente ativo | Não há protocolo, backend nem destinatário confirmado | Direitos LGPD | Ativar e testar o canal; o Instagram não foi apresentado como substituto não verificado | crítica |
| Vulnerabilidades nas dependências originais | A auditoria detectou Next 16.3.1 com avisos críticos e sharp 0.35.3 com aviso alto | Servidor Next e otimização de imagens | Correção local realizada para Next 16.3.4 e dependência de imagem atualizada; a versão publicada precisa ser atualizada e verificada | crítica |
| CSP permite inline de hidratação | É compatível com as páginas estáticas atuais, mas não equivale a uma CSP estrita com nonces/hashes | `next.config.ts` | Manter ausência de HTML não confiável e de scripts inseridos por CMS; se isso mudar, revisar arquitetura de CSP e validar novamente | média |
| Rótulo Área do cliente sem autenticação | Pode sugerir conta e dados armazenados, que não existem | Header e `/cadastro` | Decidir se renomeia para Solicitar atendimento; comportamento e rota foram preservados, com esclarecimento no formulário e termos | média |
| Cópias locais e mensagens externas | Limpar formulário não remove clipboard, autofill, histórico ou mensagem enviada | Formulário e política | Confirmar orientação operacional e procedimentos nos destinos; limitação já informada ao visitante | média |
| Fotos identificáveis sem autorização comprovada | Publicação de imagem é tratamento mesmo sem formulário | Arquivos em `public` e seções com fotos | Validar autorização/base e processo de retirada antes de publicação definitiva | alta |
| Evidência de preferência apenas no navegador | Registro local pode ser apagado; não é comprovante de consentimento para operações externas | Gerenciador | Não reutilizar como prova de consentimento para marketing. Definir evidência adequada se novos serviços forem aprovados | média |

## Checklist de entrega

| Item | Estado | Limite ou próximo passo |
| --- | --- | --- |
| Análise do código e mapa de fluxos | Implementado | Ver `auditoria-lgpd.md`; produção e operação externas ainda não auditadas |
| Política de Privacidade | Parcial | Estrutura e comportamento descritos; informações institucionais pendentes |
| Política de Cookies | Parcial | Inventário local completo; confirmar camada de hospedagem |
| Termos de Uso | Parcial | Texto técnico implementado; validar identidade, licenças e condições |
| Banner Aceitar todos / Recusar opcionais / Personalizar | Implementado | Inventário opcional vazio, sem consentimento antecipado para futuros serviços |
| Gerenciamento, alteração da escolha e persistência local | Implementado | Recusa substitui aceite; nenhum opcional instalado para interromper |
| Links no footer em todas as rotas | Implementado | Cinco links, incluindo direitos LGPD |
| Minimização e proteção do formulário | Implementado | Sem e-mail/WhatsApp, cópia explícita, limpeza, limites e bloqueio de envio nativo |
| Orientações para direitos do titular | Implementado | Página e modelo; não representa pedido enviado |
| Canal de recebimento LGPD | Requer informação do responsável | E-mail monitorado e responsável |
| Operação de atendimento, retenção e exclusão externa | Pendente | Definir processo, configurar serviços e ensaiar atendimento |
| Identificação, bases legais e transferências | Requer informação do responsável | Não inferidas do código |
| Auditoria final no domínio publicado | Pendente | Depende do domínio, acesso e configuração do host |

Fontes oficiais consultadas: [LGPD, texto oficial](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), [Guia de cookies da ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais). Alertas de dependências: [Next/Windows](https://github.com/advisories/GHSA-p293-qw3h-jr36), [Next/imagens AVIF](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4), [sharp/libheif](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c).

