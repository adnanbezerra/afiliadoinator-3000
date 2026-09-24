---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/workbench.tsx","app/page.module.css"]
---

# Initial curation workspace

- Scope: `/`; Operate mode. Primary authenticated workspace, including search, channels, and dispatch history views.
- Audience and job: one affiliate-channel operator searches active marketplaces, compares normalized products, and starts publication preparation without leaving the result context.
- Primary action: select a product, inspect its attached side sheet, then choose “Preparar publicação”; human approval remains mandatory.
- Content and states: real API results; initial, per-source loading, partial failure, no results, missing affiliate link, selected product, and preparation-started states. Shopee remains disabled and marked “Em breve”.
- Direction: a lower-materiality extension of Passaporte de Inspeção. The sidebar behaves as an archive index, results as a compact inspection ledger, and the selected product becomes a sheet clipped to the right edge (bottom sheet on mobile).
- Constraints: PT-BR, BRL, no invented KPIs or integrations, no decorative gradients, responsive search-first order, visible keyboard focus, reduced motion, existing authenticated search endpoint.
- Memorable moment: selection visibly extracts one item from the ledger into a pinned review sheet while keeping the search and comparison list available.
- Unresolved: Telegram credentials, WhatsApp provider, and persistent publication-preparation workflow do not exist yet; corresponding controls must not claim successful external configuration or delivery.
