# Afiliadoinator 3000

Monólito modular para descobrir, normalizar e acompanhar ofertas de e-commerces
brasileiros. O projeto usa Next.js App Router, PostgreSQL e Prisma.

## Requisitos

- Node.js 22+
- pnpm 12+
- PostgreSQL

## Configuração

```bash
pnpm install
cp .env.example .env
```

Preencha `DATABASE_URL` e gere um segredo aleatório com pelo menos 32 caracteres
para `JWT_SECRET`.

Crie e aplique a migration pelo Prisma CLI:

```bash
pnpm db:migrate --name init
```

O repositório não inclui migration escrita manualmente. Em produção, aplique as
migrations já versionadas com `pnpm db:deploy`.

## Rotas de autenticação

- `POST /api/auth/register`: recebe `name`, `email` e `password`.
- `POST /api/auth/login`: recebe `email` e `password`; grava JWT em cookie
  `httpOnly`.
- `GET /api/auth/me`: aceita o cookie ou `Authorization: Bearer <token>`.
- `POST /api/auth/logout`: remove o cookie de sessão.

Senhas usam bcrypt com custo 12. O JWT expira em sete dias.

## Arquitetura

```text
app/api/                         adaptadores HTTP exigidos pelo App Router
src/modules/identity/
  application/                  casos de uso, contratos e factories
  infra/                        Prisma, criptografia, validators e rotas
src/modules/marketplaces/
  application/shared/           Product e contratos dos providers
  application/MarketplaceProviderRegistry/
src/shared/infra/database/       composição do Prisma Client
prisma/schema.prisma             schema PostgreSQL
```

`MarketplaceProvider` normaliza Amazon, AliExpress, Mercado Livre e Shopee no
mesmo tipo `Product`. Um novo e-commerce precisa implementar o contrato e ser
registrado no `MarketplaceProviderRegistry`. O cliente HTTP externo deve ficar em
`libs/api-<ecommerce>/`, separado do módulo, quando cada integração for criada.

## Verificação

```bash
pnpm prisma:generate
pnpm typecheck
pnpm test
pnpm lint
pnpm build
```
