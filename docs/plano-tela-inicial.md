# Plano da tela inicial

## Objetivo

A tela inicial do Afiliadoinator 3000 é uma bancada de curadoria. O operador
deve conseguir pesquisar produtos nos marketplaces ativos, comparar resultados
e iniciar a preparação de uma publicação sem navegar por um dashboard
intermediário.

A publicação nunca parte diretamente da busca. A aprovação humana continua
obrigatória.

## Navegação principal

- **Buscar:** tela inicial e principal área de trabalho.
- **Canais:** conexões e destinos de Telegram e WhatsApp.
- **Disparos:** histórico operacional das publicações.
- **Sair:** ação fixa junto aos dados do operador, no rodapé do menu.

Não haverá item chamado “Dashboard”. A busca já cumpre esse papel.

## Composição da tela

```text
┌──────────────┬──────────────────────────────────────────────────┐
│ AFILIADO     │ Buscar produtos                                  │
│ INATOR 3000  │ [ termo, URL ou produto...             ] Buscar │
│              │ [Todos] [Amazon] [AliExpress] [Mercado Livre]   │
│ ● Buscar     ├──────────────────────────────┬───────────────────┤
│   Canais     │ Produtos encontrados         │ Ficha selecionada │
│   Disparos   │                              │                   │
│              │ [foto] Produto...   R$ 199   │ Produto           │
│              │        Amazon      ★ 4,8     │ preço / origem    │
│              │        Ver oferta  Selecionar│ desconto / nota   │
│              │ ──────────────────────────── │                   │
│              │ [foto] Produto...   R$ 219   │ [Preparar         │
│              │        Mercado Livre         │  publicação]      │
│              │                              │                   │
│ Operador     │                              │                   │
│ Sair         │                              │                   │
└──────────────┴──────────────────────────────┴───────────────────┘
```

### Busca

- Campo recebe foco ao entrar na tela.
- Busca consulta todos os marketplaces ativos por padrão.
- Filtros permitem limitar a busca por marketplace.
- Filtros secundários: preço, avaliação e desconto.
- Ordenação inicial por relevância.

### Resultados

Resultados usam lista compacta, não uma grade de cards grandes. Cada item deve
mostrar, quando disponível:

- imagem e título;
- marketplace;
- preço atual;
- preço anterior confiável e desconto;
- avaliação;
- disponibilidade do link de afiliado.

Selecionar um produto mantém a lista visível e abre sua ficha na bandeja
lateral. A ação principal da ficha é **Preparar publicação**.

### Canais

Telegram e WhatsApp ficam agrupados na mesma área.

- **Telegram:** estado da conexão, bot configurado, destino, teste e edição.
- **WhatsApp:** estado da conexão e configuração específica do provedor que for
  escolhido. Até essa decisão, exibir “Não configurado”, sem simular integração.

### Disparos

Lista operacional com data, produto, canal, destino, estado e resumo do erro.
Filtros: canal, período e estado. Estados iniciais: enviado, pendente e falhou.
Gráficos não fazem parte da primeira versão.

## Direção visual

A área autenticada estende a identidade “Passaporte de Inspeção” já definida em
`DESIGN.md`, com menos materialidade que a autenticação para preservar densidade
e velocidade de uso.

- Papel: `#f3f0e8`
- Papel profundo: `#eae5d9`
- Tinta: `#252a2d`
- Verde de ação: `#315c4c`
- Ocre documental: `#d6a740`
- Vermelho de erro: `#9e3732`

Roboto Slab fica restrita à marca, aos títulos e ao produto selecionado. Geist
é usada na interface; Geist Mono, em preços, estados e metadados. Bordas finas,
cantos de 4 px e poucas sombras. Sem KPIs inventados, gradientes ou animações
decorativas.

O elemento característico é a ficha selecionada presa na bancada lateral: o
produto sai visualmente da lista, mas a busca continua disponível como contexto.

## Responsividade

- **Desktop:** menu lateral, lista de resultados e ficha selecionada.
- **Tablet:** ficha selecionada abre como painel sobreposto.
- **Celular:** navegação compacta e ficha em painel inferior ou rota dedicada.

Busca e seleção de marketplace permanecem antes dos resultados em qualquer
largura.

## Estados essenciais

- busca inicial vazia com exemplos de termos;
- carregamento independente por marketplace;
- marketplace desconectado ou indisponível;
- nenhum resultado;
- resultados parciais quando uma fonte falhar;
- produto sem link de afiliado;
- preparação da publicação iniciada.

## Preparação para Shopee

Shopee é marketplace de primeira classe no modelo normalizado, mas ainda não é
uma fonte ativa. A interface deve mostrar Shopee como **Em breve** ou
**Não configurada**, fora da seleção padrão, até existir um adapter registrado.

O backend mantém uma lista única de IDs de marketplace. Requisições com
`provider=shopee` são reconhecidas, mas retornam `501` com o provider enquanto o
adapter não existir. Isso distingue integração pendente de parâmetro inválido.

Quando a API oficial estiver disponível:

1. confirmar se o acesso pertence à Affiliate Open Platform e documentar
   endpoints, autenticação, assinatura e limites;
2. criar `libs/api-shopee` implementando `MarketplaceProvider` por meio de
   `AbstractMarketplaceAdapter`;
3. adicionar alias do pacote ao TypeScript e ao Vitest;
4. registrar `getShopeeAdapter()` em `MarketplaceProviderRegistry.factory.ts`;
5. mapear a resposta oficial para `Product` sem inventar campos ausentes;
6. testar busca, consulta individual, assinatura, erros e normalização;
7. habilitar Shopee na seleção padrão da tela inicial.

Credenciais reservadas no ambiente:

```env
SHOPEE_APP_ID=
SHOPEE_APP_SECRET=
```

Não assumir que endpoints ou assinaturas da Seller Open Platform são
compatíveis com a Affiliate Open Platform.

## Ordem de implementação da interface

1. shell autenticado com menu lateral;
2. formulário de busca e seleção de marketplaces ativos;
3. lista de resultados e estados parciais;
4. ficha lateral e início de “Preparar publicação”;
5. tela de Canais;
6. tela de Disparos.
