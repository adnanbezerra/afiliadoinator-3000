# Authentication surface

- Scope: `/login` and `/cadastro`; Operate mode. Public authentication surfaces that unlock the protected application for any successfully registered user.
- Job: create an account or resume a session with minimum cognitive load; show validation, duplicate-email, invalid-credential, loading, and connection-error states.
- Direction: Mesa de Curadoria. A green editorial panel explains “Ofertas boas têm contexto” and the real product journey; a paper panel keeps the authentication form dominant and direct.
- Constraints: PT-BR, accessible keyboard flow, responsive stacked mobile layout, existing JSON auth endpoints, session in `httpOnly` cookie, no social login, no password recovery claim, no integration settings.

## Fidelity inventory

| Visible ingredient | Commitment | Medium |
| --- | --- | --- |
| Product identity | Warm-white Newsreader wordmark with one short ocre rule | Semantic HTML/CSS |
| Authentication navigation | Entrar and Criar conta share the editorial header; current state uses an ocre underline | Semantic HTML/CSS |
| Editorial proposition | “Ofertas boas têm contexto” plus one concise explanation remains visible at every width | Semantic HTML/CSS |
| Product journey | Descoberta, Evidência, and Decisão use numbered rows with factual descriptions | Semantic HTML/CSS |
| Marketplace sources | The planned ecosystem—Amazon Brasil, Mercado Livre, Shopee, and AliExpress—appears as restrained uppercase copy | Semantic HTML/CSS |
| Form panel | Paper surface with generous whitespace, strong labels, large controls, password reveal, and inline feedback | Semantic HTML/CSS |
| Paper material | Warm paper field with extremely subtle fiber; no desk scenery | CSS background texture |
| Responsive behavior | At 760px, areas stack; headline and explanation remain, while journey and sources hide to prioritize the form | CSS media queries |
| Motion | One frame reveal and one active-link rule reveal; reduced-motion disables both | CSS animation |
