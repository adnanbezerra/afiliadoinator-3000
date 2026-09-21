# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O usuário principal atual é o próprio operador do produto, que administra um canal de afiliados e precisa descobrir, avaliar e selecionar ofertas para publicação.

Existe a possibilidade futura de transformar o produto em SaaS para outros operadores de afiliados. Essa evolução ainda não é um requisito do produto atual e não deve gerar complexidade antecipada.

## Product Purpose

O Afiliadoinator 3000 reúne ofertas de marketplaces brasileiros, normaliza os dados, acompanha preços e ranqueia candidatos para apoiar uma decisão humana de publicação em canais como Telegram e WhatsApp.

Sucesso significa reduzir o trabalho manual de encontrar boas ofertas e aumentar a confiança de que cada oferta publicada combina desconto real, qualidade percebida e potencial comercial.

## Positioning

O produto combina dados normalizados de vários marketplaces com histórico próprio de preços e um ranking independente de marketplace. A seleção final permanece sob aprovação humana, em vez de publicar automaticamente com base apenas no desconto anunciado pelo vendedor.

## Operating Context

- Consultas predefinidas e fontes de tendências descobrem produtos periodicamente.
- Amazon Brasil, AliExpress, Mercado Livre Brasil e Shopee são os marketplaces previstos.
- Produtos encontrados passam por normalização, armazenamento, histórico de preços e pontuação.
- O operador revisa uma fila de ofertas candidatas antes da publicação.
- Telegram e WhatsApp são os canais de publicação previstos.

## Capabilities and Constraints

- O sistema opera em português do Brasil, com preços em BRL e foco no mercado brasileiro.
- A coleta deve preferir APIs oficiais e não deve usar scraping ou contornar mecanismos anti-bot quando uma fonte oficial suficiente estiver disponível.
- Links de afiliado devem ser preservados quando fornecidos oficialmente pelas APIs.
- A geração de links de afiliado permanece desacoplada da descoberta de produtos. Para marketplaces sem mecanismo oficial documentado, o link pode permanecer ausente até existir integração legítima.
- O ranking considera desconto real, popularidade, avaliação, comissão e aderência ao nicho, redistribuindo pesos quando um marketplace não fornece algum sinal.
- Marcas conhecidas e indícios confiáveis de materiais de qualidade devem receber preferência quando esses dados estiverem disponíveis. A definição e a confiabilidade desses sinais ainda são uma decisão em aberto; o sistema não deve inferir qualidade sem evidência suficiente.
- A aprovação humana é obrigatória antes da publicação.
- A possibilidade futura de SaaS deve permanecer aberta, mas não é requisito para a implementação atual.

## Brand Commitments

- Nome atual: Afiliadoinator 3000.
- O produto ainda não possui identidade visual ou voz de marca confirmadas.

## Evidence on Hand

- [`README.md`](README.md) documenta a arquitetura atual, autenticação e busca unificada de produtos.
- [`docs/doc.md`](docs/doc.md) registra as fontes oficiais, o modelo normalizado, o histórico de preços, o ranking inicial e o fluxo com aprovação humana.
- [`src/modules/marketplaces/application/shared/Product.ts`](src/modules/marketplaces/application/shared/Product.ts) contém o modelo normalizado implementado.
- [`src/modules/marketplaces/application/SearchProducts/SearchProducts.usecase.ts`](src/modules/marketplaces/application/SearchProducts/SearchProducts.usecase.ts) contém a busca unificada por marketplace.
- Ainda não existem depoimentos, estudos de caso, métricas de resultado ou outras provas comerciais. Trabalhos futuros não devem inventá-los.

## Product Principles

1. Comprovar valor com histórico próprio, não apenas com o preço anterior declarado pelo marketplace.
2. Comparar marketplaces por um modelo comum sem apagar as diferenças e limitações de cada fonte.
3. Priorizar ofertas comercialmente atraentes que também demonstrem qualidade confiável.
4. Manter uma pessoa no controle da decisão de publicar.
5. Automatizar o trabalho repetitivo sem comprometer a legitimidade das integrações.
