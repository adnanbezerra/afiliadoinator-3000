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
    fontFamily: "var(--font-newsreader), serif"
    fontSize: "clamp(2.8rem, 4.6vw, 4.7rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "var(--font-newsreader), serif"
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
  action: "8px"
  control: "12px"
  frame: "14px"
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
    height: "56px"
  button-primary-hover:
    backgroundColor: "#244b3c"
    textColor: "{colors.on-approval}"
    rounded: "{rounded.control}"
    height: "56px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.approval}"
    padding: "7px 0"
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.38)"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "54px"
  authentication-frame:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.frame}"
---

# Design System: Afiliadoinator 3000

## Overview

**Creative North Star: "Mesa de Curadoria"**

O sistema apresenta curadoria de ofertas como trabalho editorial criterioso: papel quente, tinta escura e um painel verde que explica por que contexto importa. A experiência é calma e operacional. A narrativa orienta; o formulário continua sendo a tarefa principal.

A materialidade vem de fibras raster sutis, variações tonais mínimas, linhas finas e uma única camada de profundidade. Newsreader dá voz à marca e às manchetes. Geist mantém controles, etapas e explicações diretos. A referência é uma publicação de curadoria contemporânea, não uma mesa cenográfica nem um arquivo burocrático.

**Key Characteristics:**

- Papel quente com textura raster quase imperceptível.
- Painel editorial verde como contraponto ao formulário em papel.
- Hierarquia serena entre contexto, jornada e tarefa.
- Ocre usado como detalhe único de identidade.
- Serifado restrito à marca e aos títulos; Geist no restante.

## Colors

Paleta contida de papel e grafite, com verde editorial funcional e um único contraponto ocre.

### Primary

- **Verde de Curadoria:** forma o painel narrativo e também confirma ação, foco, estado atual e mensagens positivas.

### Secondary

- **Ocre de Arquivo:** aparece somente como pequeno detalhe de identidade e estado, nunca como segunda cor de ação.

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

**The One Ochre Detail Rule.** Use ocre once per composition as identity punctuation, never as repeated tags or decoration.

**The Green Carries Context Rule.** Use green for the editorial panel, action, focus, selection, approval, and concise positive notes.

## Typography

**Display Font:** Newsreader, with serif fallback

**Body Font:** Geist, with sans-serif fallback
**Label/Mono Font:** Geist Mono, with monospace fallback

**Character:** Newsreader gives brand and editorial statements a humane authority. Geist makes forms, navigation, journey labels, and explanations practical and contemporary. Geist Mono gives the numbered journey a compact archival cadence.

### Hierarchy

- **Display:** Medium Newsreader for the editorial proposition; compact leading and tight tracking create a strong, measured silhouette.
- **Headline:** Responsive Newsreader for authentication titles; balanced wrapping and compact leading preserve calm hierarchy.
- **Body:** Regular Geist for descriptions and explanatory copy, generally constrained near 38–48 characters.
- **Label:** Strong Geist for form labels and controls; small uppercase with measured tracking is reserved for marketplace sources.

### Named Rules

**The Two Voices Rule.** Use Newsreader only for brand and titles. Use Geist for every operational or explanatory element; use Geist Mono only for compact sequence numbers.

## Layout

Desktop authentication uses one centered frame split into two areas: a green editorial panel on the left and a paper form panel on the right. The frame caps at 1180px. The left side carries brand, authentication navigation, the proposition “Ofertas boas têm contexto”, a three-step journey, and marketplace sources. The right side centers one form column capped at 560px.

At 960px, both areas remain visible with reduced padding and a tighter proportion. At 760px and below, they stack into one full-height, borderless page. Mobile keeps brand, navigation, headline, and explanation in the green area, hides the journey and marketplace sources, then gives the paper form the remaining space.

Spacing follows a quiet vertical rhythm: tight gaps inside labels, medium gaps between controls, and large pauses between headline, journey, and form. The page repeats the 512px raster fiber asset at low opacity over the paper background. Keep supporting context concise so it never delays authentication.

## Elevation & Depth

The system is flat by default. Tonal contrast, the green/paper split, low-opacity raster fibers, and hairline borders establish structure. The complete authentication frame alone receives a broad ambient shadow on wide screens; the primary button gains a smaller green-tinted shadow only on hover. Mobile removes frame shadow and radius so both areas become the page.

### Shadow Vocabulary

- **Frame Ambient** (`0 26px 80px rgba(37, 42, 45, 0.12)`): separates the complete authentication composition from the paper field on wide screens.
- **Approval Hover** (`0 10px 26px rgba(36, 75, 60, 0.18)`): gives the primary action a restrained lift during hover.
- **Focus Halo** (`0 0 0 3px rgba(49, 92, 76, 0.16)`): makes keyboard focus explicit on fields.

### Named Rules

**The One Lifted Surface Rule.** Only the complete authentication frame may float at rest; its two areas remain flat.

## Shapes

Controls use gently rounded 12px corners. The outer authentication frame uses a slightly larger 14px radius. Small inline actions use 8px corners. Borders stay one pixel and low contrast. Avoid pills, tags, tickets, seals, or decorative stamps.

## Components

### Primary Button

Confident and singular; it closes the form without ornament.

- **Shape:** Gently rounded control with a fixed minimum height.
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

- **Shape:** One-pixel border, 12px radius, 54px height, and 16px horizontal padding.
- **Color:** Translucent white over paper with dark ink text.
- **Hover / Focus:** Border strengthens on hover; focus shifts border to green, brightens the field, and adds the focus halo.
- **Error:** Border and helper text switch to exception red.

### Password Reveal

Compact text control embedded at the right edge of password fields.

- **Shape:** Transparent 8px action area inside the field.
- **Color:** Curatorial green.
- **State:** A subtle green tint appears on hover; keyboard focus uses an external outline.

### Authentication Navigation

Two familiar links share the top of the editorial panel.

- **Style:** Compact Geist links in warm translucent white.
- **Active:** Full warm-white text plus one thin ocre underline.
- **Responsive:** Remains horizontal on desktop and mobile.

### Brand Wordmark

Quiet editorial identity with one controlled color detail.

- **Typography:** Newsreader in warm white, compact and tightly tracked.
- **Detail:** One short ocre rule below the stacked name; on mobile the name becomes inline while the rule stays singular.
- **Behavior:** Plain link with a warm-white keyboard-focus outline.

### Authentication Frame

One composition with two complementary areas.

- **Structure:** Green editorial panel beside a paper form panel on wide screens; stacked on mobile.
- **Corner Style:** Restrained 14px radius on wide screens; square and borderless on mobile.
- **Depth:** One ambient shadow for the full frame, never per area.
- **Motion:** One 520ms reveal using the expressive easing; disabled for reduced-motion users.

### Editorial Journey

Three real product steps: Descoberta, Evidência, and Decisão.

- **Structure:** Number, short label, and factual explanation separated by translucent hairlines.
- **Color:** Warm-white hierarchy over the green panel.
- **Responsive:** Hidden at 760px and below, together with marketplace sources, while headline and explanation remain visible.

## Do's and Don'ts

### Do:

- **Do** keep the form as the primary task and the green panel as concise orientation.
- **Do** use warm paper, dark ink, curatorial green, and one ocre detail as the complete palette hierarchy.
- **Do** describe the product through the implemented journey: descoberta, evidência, and decisão.
- **Do** keep keyboard focus visible and disable nonessential motion for reduced-motion users.
- **Do** retain the editorial headline on mobile while hiding deeper supporting detail.

### Don't:

- **Don't** restore the former three-column authentication layout or a separate evidence rail.
- **Don't** add approval seals, badges, ornamental stamps, or repeated tags.
- **Don't** use Newsreader for form controls, body copy, journey details, or navigation.
- **Don't** invent marketplace claims beyond the listed sources and implemented product flow.
- **Don't** add shadows to individual areas or controls at rest.
