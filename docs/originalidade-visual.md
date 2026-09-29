# Critérios de originalidade visual — Saneyá

Este documento é a régua de decisão para a página inicial e para futuras páginas do site. Referências externas podem orientar qualidade, clareza e experiência de uso, mas não definem a composição final.

## Assinatura visual do Saneyá

- **Estrutura editorial:** alternar blocos panorâmicos, faixas informativas e composições assimétricas. Evitar sequências previsíveis de título centralizado seguido por três cards iguais.
- **Layout próprio:** usar proporções desiguais, conteúdo deslocado e linhas de leitura que lembrem percurso e território. Grids regulares só entram quando a informação realmente exige comparação.
- **Hierarquia tipográfica:** títulos compactos, grandes e com quebra editorial; textos de apoio com largura controlada; rótulos acompanhados por um traço de fluxo, nunca isolados como decoração genérica.
- **Componentes:** botões, cards e painéis usam cantos recortados e assimétricos. Listas de serviços, etapas e indicadores recebem composições diferentes conforme sua função.
- **Elementos gráficos:** curvas, linhas de água, recortes e a marca d'água da logo formam o vocabulário gráfico. Círculos decorativos genéricos e grades quadriculadas não fazem parte do sistema.
- **Imagens:** preferência por enquadramento panorâmico ou recortes deslocados, com legendas integradas e molduras próprias. Não repetir a mesma proporção ou o mesmo posicionamento entre hero e cases.
- **Movimento:** entradas com revelação por recorte, deslocamentos diagonais curtos e expansão de linhas. Evitar flutuação contínua e elevação vertical genérica de cards.
- **Espaçamento:** seções usam ritmo amplo e variável, com respiros maiores entre capítulos e intervalos menores dentro de conjuntos relacionados.
- **Cores:** azul escuro `#003785` e azul médio `#1465BB` dominam; off-white `#FCF7F1` organiza o fundo; laranja `#E77515` marca ação, direção ou evidência.
- **Hero, header e footer:** cada um deve ser reconhecível mesmo isolado: hero panorâmico com painel editorial, header em dois níveis no desktop e footer em formato manifesto, sem colunas institucionais convencionais.

## Identidade de interação aquática

O movimento reforça a relação do Saneyá com a água sem transformar a navegação em espetáculo. Cada família de componente possui uma resposta própria:

- **CTAs e botões:** uma lâmina azul sobe pela base e preenche o controle; o ícone acompanha a corrente com deslocamento máximo de `0.18rem`.
- **Links e navegação:** uma linha formada por pequenas ondas percorre a base do texto, sem alterar a largura do item.
- **Menus:** o fundo entra lateralmente com uma borda irregular, como uma corrente atravessando o item.
- **Cards e linhas informativas:** recebem uma variação de superfície e contraste. Cards sem ação não ganham cursor, escala ou comportamento que sugira clique.
- **Accordions:** uma faixa fluida atravessa a pergunta; o estado aberto mantém uma lavagem azul estável.
- **Ícones acionáveis:** a cor se expande do centro como uma gota. Ícones apenas decorativos permanecem estáticos.
- **Campos:** foco e hover elevam uma lâmina azul suave a partir da base, preservando fundo claro e legibilidade.
- **Clique, toque e teclado:** controles acionáveis recebem um ripple localizado no ponto de contato; ativações por teclado partem do centro.

### Cores e estados

| Estado | Cor predominante | Comportamento |
| --- | --- | --- |
| Repouso | Paleta original do componente | Sem movimento contínuo. |
| Hover | Azul Saneyá `#1465BB` e azul profundo `#003785` | Preenchimento, corrente ou ondulação conforme o componente. |
| Foco visível | Mistura de 68% de `#1465BB` com branco | Contorno de `3px`, halo externo e efeito aquático equivalente ao hover. |
| Ativo/toque | Azul `#1465BB`, ripple azul/branco | Compressão máxima de 1,5% e retorno suave. |
| Aberto/selecionado | Lavagem de 5% a 12% de azul | Estado persistente, sem animação contínua. |
| Desabilitado | Cor original com 52% de opacidade | Sem ripple, preenchimento ou deslocamento. |

### Limites de usabilidade e desempenho

- Animações duram entre `220ms` e `660ms`; não existem loops infinitos, cursor trail, ondas em tela cheia ou distorções de texto.
- Movimento usa principalmente `transform` e `opacity`; sombras e cores mudam em áreas pequenas.
- Nenhum efeito altera a geometria do layout, reduz a área de toque ou cobre permanentemente texto e ícones.
- Hover completo só roda em dispositivos com mouse preciso. Em touch, o retorno ocorre durante o toque, sem estado preso.
- Com `prefers-reduced-motion: reduce`, ripple e deslocamentos são removidos; contraste, foco, cor e indicação de estado permanecem.
- O ripple global usa um único listener delegado, evitando um manipulador por botão ou link.

## Regra de colisão

Se um elemento coincidir com uma referência em **estrutura + estilo + posicionamento**, pelo menos duas dessas três dimensões devem ser redesenhadas antes da publicação.

## Verificação antes de aprovar

1. Comparar desktop e celular lado a lado com as referências usadas na pesquisa.
2. Procurar sequências repetidas de cards, divisões 50/50 e CTAs posicionados da mesma forma.
3. Confirmar que cada seção tem função visual própria sem perder consistência de tipografia, cor e espaçamento.
4. Testar foco por teclado, redução de movimento, contraste, menu móvel e ausência de rolagem horizontal.
