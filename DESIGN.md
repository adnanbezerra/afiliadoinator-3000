---
name: Afiliadoinator 3000
description: Curadoria editorial de ofertas com contexto e decisão humana.
colors:
  paper: "#f3f0e8"
  paper-deep: "#eae5d9"
  ink: "#252a2d"
  ink-muted: "#555954"
  ink-soft: "#575a55"
  approval: "#315c4c"
  ochre-detail: "#d6a740"
  danger: "#9e3732"
  line: "rgba(37, 42, 45, 0.14)"
  line-strong: "rgba(37, 42, 45, 0.28)"
  on-approval: "#f8f4e9"
typography:
  display:
    fontFamily: "var(--font-slab), serif"
    fontSize: "clamp(2.55rem, 4.4vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-slab), serif"
    fontSize: "clamp(2.25rem, 4.4vw, 4rem)"
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "0.84rem"
    fontWeight: 720
rounded:
  action: "4px"
  control: "4px"
  frame: "4px"
spacing:
  xs: "4px"
  sm: "9px"
  md: "12px"
  lg: "22px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.approval}"
    textColor: "{colors.on-approval}"
    rounded: "{rounded.control}"
    height: "62px"
  button-primary-hover:
    backgroundColor: "#244b3c"
    textColor: "{colors.on-approval}"
    rounded: "{rounded.control}"
    height: "62px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.approval}"
    padding: "7px 0"
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.22)"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "58px"
  authentication-frame:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "0px"
---

# Design System: Afiliadoinator 3000

## Overview

**Creative North Star: "Passaporte de Inspeção"**

O sistema apresenta a curadoria como um dossiê físico aberto sobre uma mesa de trabalho: papéis empilhados, índice lateral, etiquetas de evidência e marcas de aprovação. A composição é deliberadamente rica e tátil, enquanto o formulário permanece central e imediatamente reconhecível.

A materialidade vem da mesa grafite, fibras de papel, folhas kraft, clips, fita adesiva, selos e etiquetas ocres. Roboto Slab dá voz editorial à marca, aos títulos e às ações principais; Geist e Geist Mono mantêm explicações e metadados legíveis.

**Key Characteristics:**

- Mesa grafite com um dossiê de papel quente em três colunas.
- Camadas físicas visíveis: kraft, clip, fita, textura e selo.
- Formulário central ladeado por índice e processo.
- Ocre usado em etiquetas de evidência e pequenos detalhes.
- Serifado restrito à marca e aos títulos; Geist no restante.

## Colors

Paleta de arquivo editorial: papel e grafite dominam, verde indica ação e aprovação, ocre identifica evidências.

### Primary

- **Verde de Curadoria:** identifica ação, foco, rota ativa e aprovação.

### Secondary

- **Ocre de Arquivo:** colore etiquetas, fita e marcas documentais; nunca substitui a ação principal verde.

### Neutral

- **Papel Quente:** fundo da página, superfície do formulário e base contínua da experiência.
- **Papel Profundo:** variação tonal disponível para superfícies secundárias discretas.
- **Tinta de Inspeção:** texto principal, títulos e conteúdo funcional.
- **Tinta Atenuada:** texto explicativo e metadados.
- **Tinta Suave:** notas, ajuda e contexto secundário.
- **Linha e Linha Forte:** separação e contorno sem peso decorativo.
- **Marfim de Ação:** texto sobre o verde de curadoria.
- **Vermelho de Exceção:** reservado a erros de campo e alertas de formulário.

### Named Rules

**The Evidence Tag Rule.** Use ocre for documentary tags and tape, never for primary actions or body text.

**The Approval Green Rule.** Use green for action, focus, current navigation and approval marks.

## Typography

**Display Font:** Roboto Slab, with serif fallback

**Body Font:** Geist, with sans-serif fallback
**Label/Mono Font:** Geist Mono, with monospace fallback

**Character:** Roboto Slab gives brand, headings, labels, and actions the robust low-contrast lettering of the approved comp. Geist keeps explanations practical; Geist Mono gives process metadata an archival cadence.

### Hierarchy

- **Display:** Bold Roboto Slab for the editorial proposition; compact leading and tight tracking create a strong, measured silhouette.
- **Headline:** Responsive Roboto Slab for authentication titles; balanced wrapping and compact leading preserve calm hierarchy.
- **Body:** Regular Geist for descriptions and explanatory copy, generally constrained near 38–48 characters.
- **Label:** Strong Geist for form labels and controls; small uppercase with measured tracking is reserved for marketplace sources.

### Named Rules

**The Three Voices Rule.** Use Roboto Slab for identity and decisive form text, Geist for explanations, and Geist Mono for compact process metadata.

## Layout

Desktop authentication uses one centered three-column dossier over the dark curator desk. A narrow paper index carries brand, routes, and seal; the dominant central sheet carries the form; the right paper rail explains Coleta, Histórico de preço, and Aprovação humana. The frame caps near 1200px while the form column caps at 560px.

Below 860px, the process rail hides while index and form remain. Below 640px, the desk scenery and layered props disappear, the index becomes a compact header, and the form fills a single paper column.

Spacing follows a quiet vertical rhythm: tight gaps inside labels, medium gaps between controls, and large pauses between headline, process context, and form. The frame and central sheet repeat the 512px raster fiber asset at low opacity. Keep supporting context concise so it never delays authentication.

## Elevation & Depth

Depth is physical and explicit on desktop: a dark desk supports offset kraft and paper sheets, the main dossier casts a deep ambient shadow, and authored clips and tape sit above the surface. Inner controls remain comparatively flat so the physical frame does not reduce usability. Mobile removes the layered scenery and shadow.

### Shadow Vocabulary

- **Frame Ambient** (`0 28px 70px rgba(8, 15, 14, 0.38), 0 5px 12px rgba(8, 15, 14, 0.24)`): separates the complete authentication composition from the dark desk on wide screens.
- **Approval Hover** (`0 9px 20px rgba(36, 75, 60, 0.24)`): gives the primary action a restrained lift during hover.
- **Focus Halo** (`0 0 0 3px rgba(49, 92, 76, 0.17)`): makes keyboard focus explicit on fields.

### Named Rules

**The Layered Dossier Rule.** Depth belongs to the paper stack and attached objects; controls remain flat until interaction.

## Shapes

Controls use restrained 4px corners; the dossier sheets remain square with one-pixel ink borders. The active navigation item forms a pointed tag; process evidence uses clipped ochre tags with circular eyelets; the approval seal is the largest circle. Physical silhouettes are intentional on this surface.

## Components

### Primary Button

Confident and singular; it reads like an approval action printed into the dossier.

- **Shape:** Nearly square paper control with a fixed minimum height.
- **Color:** Curatorial green with warm off-white text.
- **Hover / Focus:** Darkens, rises by one pixel, and gains a restrained green shadow; keyboard focus uses an external translucent halo.
- **Disabled:** Keeps its shape and color family at reduced opacity with a wait cursor.

### Text Button

Quiet utility action used for session exit.

- **Shape:** No container at rest; vertical padding preserves target size.
- **Color:** Curatorial green.
- **Hover / Focus:** Underline on hover; external green outline on keyboard focus.

### Input Field

Large, familiar field with precise state feedback.

- **Shape:** One-pixel ink border, 4px radius, 58px height, and 18px horizontal padding.
- **Color:** Translucent white over paper with dark ink text.
- **Hover / Focus:** Border strengthens on hover; focus shifts border to green, brightens the field, and adds the focus halo.
- **Error:** Border and helper text switch to exception red.

### Password Reveal

Compact text control embedded at the right edge of password fields.

- **Shape:** Transparent text action with 10px horizontal padding inside the field.
- **Color:** Curatorial green.
- **State:** A subtle green tint appears on hover; keyboard focus uses an external outline.

### Authentication Navigation

Two familiar links form the vertical index on the left sheet.

- **Style:** Roboto Slab labels with circular marks.
- **Active:** Warm-white text on a pointed green tag.
- **Responsive:** Vertical on desktop; compact and horizontal on mobile.

### Brand Wordmark

Quiet editorial identity with one controlled color detail.

- **Typography:** Large stacked Roboto Slab in dark ink; the name becomes inline on mobile.
- **Detail:** Shares the index with an authored approval seal and archival caption.
- **Behavior:** Plain link with a green keyboard-focus outline.

### Authentication Frame

One material composition with three functional paper areas.

- **Structure:** Index, central form sheet, and process rail over layered kraft and paper.
- **Corner Style:** Square paper sheets; borderless on mobile.
- **Depth:** Deep desk shadow, offset backing sheets, paperclip and tape.
- **Motion:** One 520ms reveal using the expressive easing; disabled for reduced-motion users.

### Process Rail

Three real product steps: Coleta, Histórico de preço, and Aprovação humana.

- **Structure:** Ochre tag with inline pictogram and eyelet, numbered label, and factual explanation connected by a green vertical rule.
- **Color:** Dark ink on warm paper with ochre evidence tags.
- **Responsive:** Hidden below 860px so the form remains usable.

## Do's and Don'ts

### Do:

- **Do** preserve the three-column passport composition and the dark curator desk on desktop.
- **Do** use warm paper, dark ink, approval green, and ocre evidence tags as the palette hierarchy.
- **Do** keep clips, tape, seals and stacked sheets subordinate to the functional form.
- **Do** keep keyboard focus visible and disable nonessential motion for reduced-motion users.
- **Do** flatten the physical scene on mobile so authentication remains usable.

### Don't:

- **Don't** simplify the desktop surface back into a generic split-screen or empty card.
- **Don't** remove the process rail, evidence tags, seal, clip, tape or layered paper from desktop.
- **Don't** use the slab face for explanatory paragraphs or dense metadata.
- **Don't** invent marketplace claims, metrics or testimonials.
- **Don't** add shadows to individual areas or controls at rest.
