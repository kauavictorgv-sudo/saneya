# Requisitos da página 4 — análise e implementação

Fonte: `C:\Users\Kauã\Downloads\requisitos-site-saneya-pagina-4.md`.

## Implementado

- Cards de Mutirões de limpeza de praia e Workshop de reciclagem, com todos os itens descritos no documento, sem substituir os serviços existentes.
- Novos serviços disponíveis na navegação e na seleção do formulário, com o mesmo destaque visual.
- Campos opcionais de nome e sobrenome, e-mail, telefone e empresa representada. Cidade, serviço e descrição também permanecem opcionais até a confirmação da obrigatoriedade.
- Tipos de entrada apropriados, limites de tamanho, validação de e-mail e telefone quando preenchidos, mensagens associadas aos campos e foco no primeiro erro.
- Contatos do footer: saneyaambiental@gmail.com e https://wa.me/5521997949067. Ícones atuais de redes sociais preservados.
- Política de privacidade atualizada para descrever os campos e links realmente presentes, sem definir bases legais ou prazos ainda não confirmados.

## Funcionamento preservado

O cadastro prepara um resumo na memória da página. Não cria conta, não envia dados a uma API e não persiste informações em banco de dados. A cópia é voluntária e o contato externo é manual. O formulário mantém limpeza explícita e limpeza ao sair da página.

Não foram adicionadas dependências, preços, prioridades comerciais ou novos botões de contratação com destinos não definidos.

## Pendências de decisão

1. Ordem e destaque comercial dos serviços, texto e destino dos novos botões.
2. Campos obrigatórios e fluxo de envio, armazenamento e resposta. Antes de implementar coleta no servidor, definir finalidade, base legal aplicável, retenção, responsáveis e controles de acesso.
3. Mensagens de sucesso e falha de envio real: não há envio implementado nesta versão.
4. Foto referenciada como “Imagem 2”: fornecer arquivo original, confirmar autorização de uso, autoria, legenda e texto alternativo. A referência do Google Docs não pôde ser acessada pela ferramenta de leitura; nenhuma nova foto foi publicada.
5. Confirmar o canal específico de atendimento LGPD. O e-mail comercial fornecido não foi presumido como esse canal.

## Arquivos alterados

- `lib/site-content.ts`: conteúdo compartilhado, contatos e navegação dos serviços.
- `components/Solutions.tsx`: novos cards responsivos.
- `components/Footer.tsx`: contatos oficiais.
- `components/ServiceRegistrationForm.tsx`: campos, opções, resumo e validações.
- `app/politica-de-privacidade/page.tsx`: descrição técnica atualizada.
- `docs/analise-requisitos-pagina-4.md`: análise e pendências.
- `scripts/audit-privacy.mjs`: expectativas de campos atualizadas para o cadastro atual.

## Verificação realizada

- ESLint, TypeScript e build de produção concluídos sem erros.
- Teste no navegador Edge: serviços e contatos presentes; sem transbordamento horizontal nas larguras 1440, 768 e 390 px.
- Validação de e-mail e telefone inválidos com foco no primeiro erro; geração de resumo com os novos campos; limpeza dos dados; preparação com campos opcionais vazios.
- Durante o teste, nenhum POST, requisição externa automática ou erro de JavaScript foi observado.
- A suíte anterior de privacidade teve suas expectativas atualizadas, mas não foi executada integralmente nesta alteração.
