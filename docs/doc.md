# Coletor de Ofertas — APIs dos Marketplaces

Objetivo: construir um backend capaz de coletar produtos e ofertas automaticamente para um canal de afiliados, evitando scraping sempre que houver API oficial.

Marketplaces iniciais:

* Amazon Brasil
* AliExpress
* Mercado Livre Brasil
* Shopee Brasil

---

# 1. Amazon Brasil

## API

Usar a **Amazon Creators API**, sucessora da Product Advertising API (PA-API 5.0).

A PA-API antiga não deve ser usada em uma implementação nova.

Base da API:

```text
https://creatorsapi.amazon/catalog/v1/
```

Marketplace brasileiro:

```text
www.amazon.com.br
```

A autenticação da Creators API utiliza OAuth 2.0.

Credenciais necessárias:

```env
AMAZON_CREDENTIAL_ID=
AMAZON_CREDENTIAL_SECRET=
AMAZON_CREDENTIAL_VERSION=
AMAZON_PARTNER_TAG=
```

O access token tem validade limitada e deve ser armazenado em cache e renovado automaticamente.

---

## Operações principais

### SearchItems

Principal operação para descoberta automática de ofertas.

```text
POST /catalog/v1/searchItems
```

Uso:

```text
buscar produtos por palavra-chave
filtrar categorias
obter ASIN
obter título
obter imagens
obter preços/ofertas
obter URL afiliada
```

Exemplo conceitual:

```json
{
  "keywords": "mocassim masculino",
  "partnerTag": "PARTNER_TAG",
  "marketplace": "www.amazon.com.br",
  "resources": [
    "images.primary.large",
    "itemInfo.title",
    "offersV2"
  ]
}
```

Header:

```http
Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json
x-marketplace: www.amazon.com.br
```

IMPORTANTE:

`partnerTag` é obrigatório atualmente para `SearchItems`.

---

### GetItems

Consulta produtos conhecidos através de ASIN.

```text
POST /catalog/v1/getItems
```

Útil depois que o produto já estiver armazenado no banco.

Exemplo:

```json
{
  "itemIds": [
    "ASIN"
  ],
  "partnerTag": "PARTNER_TAG",
  "marketplace": "www.amazon.com.br",
  "resources": [
    "images.primary.large",
    "itemInfo.title",
    "offersV2"
  ]
}
```

Usar para atualizar periodicamente:

```text
preço
oferta
disponibilidade
imagem
informações do produto
```

---

### GetVariations

```text
POST /catalog/v1/getVariations
```

Obtém variações de um ASIN.

Útil para:

```text
tamanho
cor
modelo
variações do mesmo produto
```

---

### GetBrowseNodes

```text
POST /catalog/v1/getBrowseNodes
```

Permite navegar pela hierarquia de categorias da Amazon.

Pode ser usado para construir buscas por nicho:

```text
Moda masculina
    ├── Calçados
    ├── Relógios
    ├── Camisas
    └── Acessórios
```

---

## Recursos importantes

Solicitar apenas os recursos necessários.

Exemplos:

```text
itemInfo.title

images.primary.small
images.primary.medium
images.primary.large

images.variants.small
images.variants.medium
images.variants.large

offersV2

browseNodeInfo.browseNodes
browseNodeInfo.browseNodes.salesRank

parentASIN
```

`offersV2` é especialmente importante para obter informações comerciais atuais.

A URL retornada pela API pode conter o Partner Tag, por exemplo:

```text
https://www.amazon.com.br/dp/ASIN?tag=PARTNER_TAG...
```

Portanto, o coletor deve preservar a URL retornada pela API.

---

# 2. AliExpress

## API

Usar a API oficial de afiliados do AliExpress.

Gateway documentado:

```text
https://eco.taobao.com/router/rest
```

A API segue o modelo TOP/AliExpress Open Platform.

Credenciais:

```env
ALIEXPRESS_APP_KEY=
ALIEXPRESS_APP_SECRET=
ALIEXPRESS_TRACKING_ID=
```

As requisições utilizam parâmetros como:

```text
method
app_key
sign_method
sign
timestamp
format
v
```

Versão documentada:

```text
v=2.0
```

---

## aliexpress.affiliate.product.query

Principal endpoint do coletor AliExpress.

Method:

```text
aliexpress.affiliate.product.query
```

Permite pesquisar produtos elegíveis para afiliados.

Parâmetros relevantes:

```text
keywords
category_ids
min_sale_price
max_sale_price
page_no
page_size
sort
target_currency
target_language
tracking_id
ship_to_country
delivery_days
fields
```

Configuração padrão para nosso caso:

```text
target_currency=BRL
target_language=PT
ship_to_country=BR
```

Exemplo:

```text
method=aliexpress.affiliate.product.query
keywords=mocassim masculino
target_currency=BRL
target_language=PT
ship_to_country=BR
page_size=50
tracking_id=TRACKING_ID
```

Ordenações documentadas:

```text
SALE_PRICE_ASC
SALE_PRICE_DESC
LAST_VOLUME_ASC
LAST_VOLUME_DESC
```

---

## Dados retornados

A API consegue retornar informações extremamente úteis para ranking de ofertas:

```text
product_id
product_title

product_detail_url
promotion_link

product_main_image_url
product_small_image_urls
product_video_url

sale_price
original_price
discount

target_sale_price
target_original_price

commission_rate
hot_product_commission_rate
relevant_market_commission_rate

evaluate_rate
lastest_volume

first_level_category_id
first_level_category_name

second_level_category_id
second_level_category_name

shop_id
shop_url

promo_code_info
ship_to_days
```

Um campo especialmente importante é:

```text
promotion_link
```

A documentação mostra esse campo retornando URLs no formato:

```text
https://s.click.aliexpress.com/e/...
```

Portanto, preferir o `promotion_link` retornado diretamente pela API em vez de construir links manualmente.

---

## aliexpress.affiliate.hotproduct.query

Method:

```text
aliexpress.affiliate.hotproduct.query
```

Usar como fonte adicional de descoberta.

Objetivo:

```text
encontrar produtos considerados "hot products"
pelo próprio sistema de afiliados
```

É particularmente interessante para alimentar automaticamente a fila de candidatos.

---

## aliexpress.affiliate.productdetail.get

Method:

```text
aliexpress.affiliate.productdetail.get
```

Usar para atualizar produtos conhecidos.

Fluxo:

```text
product_id
   ↓
productdetail.get
   ↓
dados atuais
```

---

## Outros endpoints disponíveis

A documentação oficial atualmente também lista:

```text
aliexpress.affiliate.category.get

aliexpress.affiliate.product.smartmatch

aliexpress.affiliate.featuredpromo.get

aliexpress.affiliate.featuredpromo.products.get

aliexpress.affiliate.hotproduct.download

aliexpress.affiliate.image.search
```

### product.smartmatch

Recomenda produtos automaticamente.

Pode futuramente complementar nosso sistema de descoberta.

### featuredpromo.get

Obtém campanhas promocionais.

### featuredpromo.products.get

Obtém produtos pertencentes às campanhas.

Pode ser uma fonte excelente para detectar:

```text
campanhas
promoções especiais
eventos
ofertas temporárias
```

### hotproduct.download

Permite trabalhar com dados de produtos em alta em maior escala.

Investigar sua disponibilidade para nossa aplicação depois da obtenção das credenciais.

---

# 3. Mercado Livre Brasil

## API

API oficial:

```text
https://api.mercadolibre.com
```

Site ID brasileiro:

```text
MLB
```

Credenciais:

```env
MELI_CLIENT_ID=
MELI_CLIENT_SECRET=
MELI_ACCESS_TOKEN=
```

---

# ATENÇÃO SOBRE AFILIADOS

Até o momento não foi encontrada na documentação pública uma API equivalente à Creators API/AliExpress Affiliate API que gere automaticamente links de afiliados do Mercado Livre.

Portanto, separar conceitualmente:

```text
Mercado Livre Developers API
        ↓
descoberta e consulta de produtos

Programa de Afiliados Mercado Livre
        ↓
atribuição / geração de links
```

Não implementar engenharia reversa do gerador de links de afiliado.

Criar a abstração:

```ts
interface AffiliateLinkGenerator {
  generate(productUrl: string): Promise<string | null>;
}
```

Para Mercado Livre, inicialmente:

```text
generate() -> null
```

ou utilizar posteriormente um método oficialmente disponibilizado pelo programa.

---

# Busca de produtos no Mercado Livre

Existe uma diferença importante entre catálogo e anúncios.

Para busca de produtos de catálogo:

```text
GET /products/search
```

Exemplo:

```http
GET https://api.mercadolibre.com/products/search?status=active&site_id=MLB&q=mocassim
Authorization: Bearer ACCESS_TOKEN
```

Também aceita:

```text
domain_id
product identifier
part number
product id
```

---

# Consulta de itens

Para obter informações de anúncios conhecidos, utilizar os recursos de itens.

IMPORTANTE:

O Mercado Livre está descontinuando:

```text
/items?ids=
```

Para uma integração nova, usar:

```text
/items/bulk?ids=
```

Exemplo conceitual:

```http
GET https://api.mercadolibre.com/items/bulk?ids=MLB123,MLB456
Authorization: Bearer ACCESS_TOKEN
```

Também é possível selecionar campos:

```text
attributes=body.id,body.price,body.title
```

---

# Best sellers do Mercado Livre

Endpoint extremamente interessante para nosso coletor:

```text
GET /highlights/{SITE_ID}/category/{CATEGORY_ID}
```

Brasil:

```text
GET /highlights/MLB/category/{CATEGORY_ID}
```

Retorna os 20 principais produtos/itens da categoria.

Isso pode ser usado como fonte automática de candidatos:

```text
categoria
   ↓
/highlights
   ↓
20 best sellers
   ↓
consultar detalhes
   ↓
armazenar
   ↓
ranking interno
```

---

# 3.1 Shopee Brasil

A conta deste projeto passou a ter acesso à integração da Shopee.

Manter a Shopee como provider de primeira classe no modelo normalizado:

```text
provider = "shopee"
```

Credenciais previstas:

```env
SHOPEE_APP_ID=
SHOPEE_APP_SECRET=
```

Os endpoints, assinatura e campos devem ser documentados a partir do material
liberado para a conta antes da implementação. Não assumir compatibilidade entre
Seller Open Platform e Affiliate Open Platform.

---

# 4. Modelo normalizado

Todas as APIs devem ser convertidas para um formato interno único.

```ts
interface Product {
  provider: "amazon" | "aliexpress" | "mercado-livre" | "shopee";

  externalId: string;

  title: string;

  currentPrice: number;
  originalPrice?: number;

  currency: "BRL";

  discountPercentage?: number;

  imageUrl?: string;

  productUrl: string;
  affiliateUrl?: string;

  categoryId?: string;
  categoryName?: string;

  rating?: number;
  salesVolume?: number;
  salesRank?: number;

  commissionRate?: number;

  lastSeenAt: Date;
}
```

---

# 5. Providers

Criar:

```ts
interface MarketplaceProvider {
  searchProducts(query: string): Promise<Product[]>;

  getProduct(id: string): Promise<Product | null>;

  getTrendingProducts?(): Promise<Product[]>;

  getCategoryProducts?(categoryId: string): Promise<Product[]>;
}
```

Implementações:

```text
AmazonProvider
AliExpressProvider
MercadoLivreProvider
```

---

# 6. Histórico de preço

Não confiar exclusivamente no "preço anterior" informado pelo marketplace.

Criar:

```text
products
product_price_history
```

Exemplo:

```text
product_price_history

id
product_id
price
original_price
collected_at
```

Assim podemos calcular:

```text
preço atual
menor preço 7 dias
menor preço 30 dias
menor preço 90 dias
preço médio
queda percentual real
```

---

# 7. Descoberta de ofertas

Executar queries predefinidas periodicamente.

Exemplos:

```text
mocassim masculino
loafer masculino
camisa social masculina
camisa linho masculina
relógio masculino
carteira couro
cinto couro
blazer masculino
sapato social masculino
perfume masculino
óculos masculino
polo masculina
```

Amazon:

```text
SearchItems
```

AliExpress:

```text
affiliate.product.query
affiliate.hotproduct.query
featuredpromo.products.get
```

Mercado Livre:

```text
products/search
highlights
```

---

# 8. Ranking interno

Exemplo inicial:

```text
score =
    desconto_real        * 0.30
  + popularidade         * 0.20
  + avaliação            * 0.10
  + comissão             * 0.15
  + aderência_ao_nicho   * 0.25
```

O algoritmo deve ser independente do marketplace.

Campos inexistentes em determinado provider simplesmente não entram no cálculo ou devem receber peso redistribuído.

---

# 9. Fluxo geral

```text
Amazon Creators API ──────────┐
                              │
AliExpress Affiliate API ─────┼──► Normalizer
                              │
Mercado Livre API ────────────┘
                                    │
                                    ▼
                               PostgreSQL
                                    │
                          histórico de preços
                                    │
                                    ▼
                              Offer Scorer
                                    │
                                    ▼
                            Candidate Offers
                                    │
                                    ▼
                             aprovação humana
                                    │
                                    ▼
                           Telegram / WhatsApp
```

---

# 10. Cadastro e credenciais necessárias

## AMAZON

Já existe conta no programa de Associados.

Ainda verificar/realizar:

```text
Associados Amazon
→ Ferramentas
→ Creators API
→ Create Application
→ Add New Credential
```

A Amazon exige que a conta tenha recebido aceitação final no programa. O cadastro da Creators API é disponibilizado a associados aceitos que tenham indicado vendas qualificadas.

Guardar:

```text
Credential ID
Credential Secret
Credential Version
Partner Tag
```

Portal:

https://associados.amazon.com.br/

Documentação:

https://associados.amazon.com.br/creatorsapi/docs/en-us/onboarding/register-for-creators-api

---

## ALIEXPRESS

É necessário ter/acessar o ecossistema de afiliados do AliExpress e criar/configurar acesso de desenvolvedor para obter as credenciais da Open Platform.

Precisamos obter:

```text
App Key
App Secret
Tracking ID
```

Documentação da API:

https://open.alitrip.com/docs/api.htm?apiId=45803

A primeira validação após obter as credenciais deve ser uma chamada simples:

```text
aliexpress.affiliate.product.query
```

com:

```text
keywords=watch
ship_to_country=BR
target_currency=BRL
target_language=PT
page_size=10
```

Se funcionar, habilitar o `AliExpressProvider`.

---

## MERCADO LIVRE

Já existe participação no programa de afiliados.

Para utilizar a Developers API, criar também uma aplicação no portal de desenvolvedores do Mercado Livre.

Portal:

https://developers.mercadolivre.com.br/

Criar aplicação e obter:

```text
Client ID
Client Secret
```

Implementar OAuth do Mercado Livre para obtenção/renovação de:

```text
Access Token
Refresh Token
```

O cadastro de desenvolvedor/API é independente da lógica de afiliados.

Até existir endpoint oficial documentado para geração programática de links de afiliado, tratar:

```text
affiliateUrl = null
```

e permitir inserção/geração externa posteriormente.

---

# 11. Prioridade de implementação

Implementar nesta ordem:

```text
1. estrutura Product normalizada
2. banco + histórico de preços
3. AmazonProvider
4. AliExpressProvider
5. MercadoLivreProvider
6. scheduler de coleta
7. sistema de queries/categorias
8. OfferScorer
9. fila de candidatos
10. publicação
```

Amazon e AliExpress devem suportar links afiliados diretamente quando disponibilizados pela resposta/API.

Mercado Livre deve inicialmente funcionar como fonte de descoberta e monitoramento de preço, mantendo a geração do link afiliado desacoplada.

Não implementar scraping ou bypass de mecanismos anti-bot enquanto existir fonte oficial suficiente para o dado desejado.
