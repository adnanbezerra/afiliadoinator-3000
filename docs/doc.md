# Coletor de Ofertas — APIs dos Marketplaces

Objetivo: construir um backend capaz de coletar produtos e ofertas automaticamente para um canal de afiliados, priorizando APIs oficiais e mantendo rastreabilidade entre cada implementação e sua documentação de origem.

Marketplaces iniciais:

* Amazon Brasil
* AliExpress
* Mercado Livre Brasil

---

# 0. Fontes oficiais e rastreabilidade

Este documento é uma especificação inicial para implementação.

Antes de implementar ou modificar uma integração, consultar a documentação oficial correspondente. APIs, parâmetros, autenticação, limites e políticas podem mudar.

Cada referência possui um identificador (`AMZ-*`, `ALI-*`, `MELI-*`) que deve ser citado nas partes relevantes do código/documentação interna quando útil.

## Amazon — Creators API

### [AMZ-01] Creators API — API Reference

Referência geral das operações e recursos disponíveis.

https://associados.amazon.com.br/creatorsapi/docs/en-us/api-reference

Documenta oficialmente as operações:

* `SearchItems`
* `GetItems`
* `GetVariations`
* `GetBrowseNodes`

### [AMZ-02] SearchItems

https://associados.amazon.com.br/creatorsapi/docs/en-us/api-reference/operations/search-items

Fonte para:

* pesquisa por keywords;
* SearchIndex;
* filtros;
* paginação;
* ordenação;
* recursos retornados;
* `partnerTag`;
* `OffersV2`;
* URLs dos produtos.

### [AMZ-03] GetItems

https://associados.amazon.com.br/creatorsapi/docs/en-us/api-reference/operations/get-items

Fonte para consulta de produtos conhecidos através de identificadores/ASINs.

### [AMZ-04] GetVariations

https://associados.amazon.com.br/creatorsapi/docs/en-us/api-reference/operations/get-variations

Fonte para obtenção de variações de produtos, como tamanho e cor.

### [AMZ-05] GetBrowseNodes

https://associados.amazon.com.br/creatorsapi/docs/en-us/api-reference/operations/get-browse-nodes

Fonte para navegação na hierarquia de categorias da Amazon.

### [AMZ-06] Usando Creators API via HTTP/cURL

https://associados.amazon.com.br/creatorsapi/docs/en-us/get-started/using-curl

Fonte para:

* Base URL;
* OAuth/access token;
* headers;
* `Authorization: Bearer`;
* `x-marketplace`;
* formato das requisições HTTP.

A documentação informa atualmente:

```text
Base URL:
https://creatorsapi.amazon

API:
https://creatorsapi.amazon/catalog/v1/...
```

### [AMZ-07] Marketplace Brasil

https://associados.amazon.com.br/creatorsapi/docs/en-us/locale-reference/brazil

Fonte para configuração brasileira:

```text
marketplace = www.amazon.com.br
language = pt_BR
currency = BRL
```

Também contém os Search Indexes disponíveis especificamente no Brasil.

### [AMZ-08] Cadastro na Creators API

https://associados.amazon.com.br/creatorsapi/docs/en-us/onboarding/register-for-creators-api

Fonte para requisitos de acesso e criação das credenciais.

### [AMZ-09] Migração PA-API → Creators API

https://associados.amazon.com.br/creatorsapi/docs/en-us/migrating-to-creatorsapi-from-paapi

Fonte importante para evitar implementar exemplos antigos da Product Advertising API.

Também contém exemplos do fluxo OAuth 2.0 e chamadas da Creators API.

### [AMZ-10] Licença / regras de utilização

https://associados.amazon.com.br/creatorsapi/docs/en-us/license-agreement

Consultar antes de definir armazenamento permanente, cache e utilização de conteúdo retornado pela Amazon.

---

# AliExpress — Affiliate API

## [ALI-01] Affiliate Product Query

https://open.alitrip.com/docs/api.htm?apiId=45803

Esta é a principal documentação oficial utilizada para a integração inicial.

Documenta:

```text
aliexpress.affiliate.product.query
```

A mesma área da documentação oficial lista atualmente outras APIs de Promotion Creatives:

```text
aliexpress.affiliate.hotproduct.query
aliexpress.affiliate.category.get
aliexpress.affiliate.product.query
aliexpress.affiliate.product.smartmatch
aliexpress.affiliate.productdetail.get
aliexpress.affiliate.featuredpromo.get
aliexpress.affiliate.featuredpromo.products.get
aliexpress.affiliate.hotproduct.download
aliexpress.affiliate.image.search
```

A documentação também define o gateway:

```text
HTTPS:
https://eco.taobao.com/router/rest

HTTP:
http://gw.api.taobao.com/router/rest
```

Utilizar HTTPS.

Ela documenta parâmetros comuns como:

```text
method
app_key
sign_method
sign
timestamp
format
v
```

e parâmetros específicos de `product.query`, incluindo:

```text
category_ids
fields
keywords
max_sale_price
min_sale_price
page_no
page_size
sort
target_currency
target_language
tracking_id
ship_to_country
delivery_days
```

Também contém exemplos oficiais para:

* cURL;
* Node.js;
* Python;
* PHP;
* Java;
* .NET;
* C/C++.

### Regra para implementação AliExpress

O Codex deve usar `[ALI-01]` como fonte primária para descobrir os links das documentações específicas dos outros métodos.

Não assumir que todos os endpoints listados possuem exatamente os mesmos parâmetros de `product.query`.

Antes de implementar:

```text
hotproduct.query
productdetail.get
product.smartmatch
featuredpromo.get
featuredpromo.products.get
hotproduct.download
image.search
```

abrir a documentação específica daquele método e validar:

* parâmetros;
* autenticação;
* resposta;
* disponibilidade;
* status/depreciação.

---

# Mercado Livre — Developers API

## [MELI-01] Criar uma aplicação

https://developers.mercadolivre.com.br/crie-uma-aplicacao-no-mercado-livre

Fonte para:

* criação da aplicação;
* Client ID;
* Client Secret;
* Redirect URI;
* scopes;
* configuração;
* acesso à API.

A documentação informa que, após criar a aplicação, são fornecidos:

```text
Client ID
Client Secret
```

e orienta seguir posteriormente o fluxo oficial de autenticação/autorização.

## [MELI-02] Itens e buscas

https://developers.mercadolivre.com.br/itens-e-buscas

Fonte oficial para consulta de itens e operações relacionadas.

IMPORTANTE:

A documentação atual informa a descontinuação de:

```text
/items?ids=
```

e sua substituição por:

```text
/items/bulk?ids=
```

Para implementações novas utilizar:

```text
/items/bulk?ids=ITEM_ID1,ITEM_ID2
```

Para seleção de atributos:

```text
/items/bulk?ids=ITEM_ID1,ITEM_ID2&attributes=body.id,body.price,body.title
```

A documentação estabelece prazo de migração até:

```text
25/10/2026
```

Portanto, não implementar código novo utilizando `/items?ids=`.

## [MELI-03] Gestão da aplicação

https://developers.mercadolivre.com.br/pt_br/publicacao-de-produtos/gerencie-seu-aplicativo

Fonte para informações da aplicação, permissões e gerenciamento das credenciais.

Exemplo documentado:

```http
GET https://api.mercadolibre.com/applications/$APP_ID
Authorization: Bearer $ACCESS_TOKEN
```

## [MELI-04] Requisitos/configuração inicial

https://developers.mercadolivre.com.br/pt_br/configuracao-ou-requisitos-previos

Fonte para o fluxo:

```text
Conta Mercado Livre
        ↓
Criar aplicação
        ↓
Client ID + Client Secret
        ↓
Autenticação
        ↓
Access Token
        ↓
API
```

## [MELI-AFF-01] Geração oficial de links de afiliado

https://www.mercadolivre.com.br/l/afiliados-gere-seus-links

Esta documentação pertence ao Programa de Afiliados e Criadores, não à Developers API.

Ela documenta atualmente duas formas oficiais de geração de links:

```text
Gerador de Links
Barra de Afiliados
```

Até que seja encontrada documentação oficial de uma API pública para geração automática de links de afiliado, não assumir a existência de endpoint para essa função.

## [MELI-AFF-02] Programa de Afiliados — começar a recomendar

https://www.mercadolivre.com.br/l/comece-a-recomendar

Referência oficial adicional sobre geração e utilização dos links do Programa de Afiliados e Criadores.

## [MELI-AFF-03] Boas práticas para links

https://www.mercadolivre.com.br/l/boas-praticas-links

Consultar antes da implementação da publicação automática.

Entre outras regras, o Mercado Livre orienta gerar links para produtos/ofertas específicos e verificar a URL antes da publicação.

## [MELI-AFF-04] Páginas não permitidas para links afiliados

https://www.mercadolivre.com.br/l/afiliados-paginas-nao-permitidas

IMPORTANTE para o coletor.

O Mercado Livre informa que links afiliados não devem ser gerados para determinadas páginas, incluindo:

```text
página inicial
páginas de categorias
ranking de mais vendidos
página de vendedores
Ofertas do Dia
entre outras
```

Produtos individuais encontrados nessas páginas podem ser divulgados individualmente.

Portanto, qualquer mecanismo que utilize categorias, rankings ou páginas de descoberta deve resolver o resultado até a página específica do produto antes da etapa de geração do link afiliado.

---

# Regra geral de implementação

Sempre que houver divergência entre este documento e a documentação oficial:

```text
DOCUMENTAÇÃO OFICIAL > ESTE DOCUMENTO
```

O Codex deve tratar este arquivo como:

```text
arquitetura desejada
+
índice de documentação
+
ponto de partida da implementação
```

e tratar as fontes oficiais como autoridade para:

```text
endpoints
request bodies
response schemas
autenticação
rate limits
políticas
campos disponíveis
depreciações
```

Ao encontrar mudança relevante na documentação oficial, atualizar este arquivo junto com a implementação.

---

# 1. Amazon Brasil

## API

Usar a **Amazon Creators API**.

Fontes:

`[AMZ-01] [AMZ-06] [AMZ-09]`

Base:

```text
https://creatorsapi.amazon/catalog/v1/
```

Marketplace brasileiro:

```text
www.amazon.com.br
```

Fonte: `[AMZ-07]`

### SearchItems

```text
POST /catalog/v1/searchItems
```

Fonte primária: `[AMZ-02]`

### GetItems

```text
POST /catalog/v1/getItems
```

Fonte primária: `[AMZ-03]`

### GetVariations

```text
POST /catalog/v1/getVariations
```

Fonte primária: `[AMZ-04]`

### GetBrowseNodes

```text
POST /catalog/v1/getBrowseNodes
```

Fonte primária: `[AMZ-05]`

---

# 2. AliExpress

Gateway:

```text
https://eco.taobao.com/router/rest
```

Fonte: `[ALI-01]`

Principal método inicial:

```text
aliexpress.affiliate.product.query
```

Fonte primária: `[ALI-01]`

Os demais métodos deverão ter sua documentação específica consultada antes da implementação.

---

# 3. Mercado Livre

Base:

```text
https://api.mercadolibre.com
```

Aplicação/autenticação:

`[MELI-01] [MELI-03] [MELI-04]`

Consulta múltipla de itens:

```text
GET /items/bulk?ids=...
```

Fonte primária: `[MELI-02]`

Programa de afiliados e geração de links:

`[MELI-AFF-01] [MELI-AFF-02] [MELI-AFF-03] [MELI-AFF-04]`

Não criar integração programática de geração de links do Mercado Livre sem localizar primeiro documentação oficial que autorize e descreva essa operação.

---

> As demais seções de arquitetura, normalização, histórico de preços, providers, ranking e fluxo geral permanecem conforme especificadas abaixo neste documento.
