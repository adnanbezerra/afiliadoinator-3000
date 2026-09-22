# Handoff — autenticação e preparação do Orca no WSL

Data: 2026-09-21

## Objetivo da próxima sessão

Continuar o projeto a partir da autenticação concluída e, quando conveniente, instalar e configurar o Orca no Windows para trabalhar com este repositório dentro do WSL. A configuração do Orca ainda não foi executada.

## Estado atual

- O login e o cadastro reais do monólito estão implementados. Qualquer pessoa pode se cadastrar e o cadastro libera acesso ao sistema.
- A interface aprovada é o segundo conceito original, **Passaporte de Inspeção**. O redesign intermediário foi rejeitado e não deve ser retomado.
- A implementação visual e o contrato de design estão nos commits:
  - `5d8a1bb feat(auth): restore inspection passport design`
  - `faa564d docs(design): align auth system with approved comp`
- A base funcional da autenticação e sua documentação anterior estão nos commits:
  - `77a9673 feat(auth): add protected account experience`
  - `dd4b1fa docs(design): record authentication visual system`
- Na conclusão, `pnpm typecheck`, `pnpm test` e `pnpm lint` passaram. Foram aprovados 9 testes em 6 arquivos; `/login` e `/cadastro` responderam com HTTP 200.
- O worktree estava limpo após os commits.

## Referências existentes

Evite repetir ou reescrever o que já está documentado. Consulte:

- `DESIGN.md` — sistema visual vigente.
- `.impeccable/auth-surface-brief.md` — brief da autenticação.
- `.impeccable/surfaces/app-auth-login-page-tsx.md` — descrição da superfície.
- `.impeccable/design.json` — contrato estruturado do design.
- `.impeccable/mocks/auth-inspection-passport.png` — comp original aprovado.
- `app/(auth)/auth-shell.tsx`, `app/(auth)/auth-form.tsx` e `app/(auth)/auth.module.css` — implementação principal.

Embora a conversa mencionasse quatro opções, os artefatos recuperados continham três comps visuais; o quarto item era a ação para gerar novas opções. O modelo aprovado continua sendo `auth-inspection-passport.png`.

## Decisões e preferências do usuário

- Comunicar em português.
- Não usar o modo Caveman; o usuário pediu explicitamente `caveman nao` nesta sessão.
- A tela deve ser rica e informativa, mas não carregada. Não reduzir a interface a uma superfície vazia ou seca.
- Preservar fielmente o segundo modelo aprovado em vez de iniciar outro redesign.
- Usar `pnpm` e criar commits semânticos ao finalizar mudanças.
- Não criar migrations Prisma manualmente.
- Não iniciar servidor para o usuário testar, salvo quando permitido pelo fluxo do Impeccable.

## Pendência de validação visual

A implementação foi validada por tipos, testes, lint e carregamento das rotas, mas não houve captura final automatizada. Naquele ambiente não estavam disponíveis Orca, Playwright nem Chromium/Chrome/Firefox. Depois de configurar o Orca, vale abrir `/login` e `/cadastro` no navegador integrado e comparar com `.impeccable/mocks/auth-inspection-passport.png`, especialmente em desktop e com largura de 320 px.

## Tutorial pendente — instalar Orca usando WSL

O fluxo recomendado é instalar o aplicativo no **Windows host**, não instalar o pacote Linux dentro do Ubuntu WSL. A partir do shell WSL, executar:

```bash
powershell.exe -NoProfile -Command "winget install --id StablyAI.Orca --exact --accept-package-agreements --accept-source-agreements"
```

Se `winget` não estiver disponível, usar o instalador oficial silencioso:

```bash
powershell.exe -NoProfile -Command '$p="$env:TEMP\orca-setup.exe"; Invoke-WebRequest "https://github.com/stablyai/orca/releases/latest/download/orca-windows-setup.exe" -OutFile $p; Start-Process $p -ArgumentList "/S" -Wait'
```

Depois da instalação:

1. Abrir o Orca pelo menu do Windows.
2. Em **Settings → Terminal**, selecionar a distribuição WSL como shell.
3. Adicionar o repositório por um caminho semelhante a `\\wsl.localhost\<DISTRO>\home\<USUARIO>\projetos\afiliadoinator-3000`.
4. Nas configurações, procurar **Orca CLI** e registrar a integração com WSL.
5. Abrir um terminal WSL dentro do Orca e executar `orca status --json`.
6. Iniciar o Codex nesse terminal para que a sessão receba acesso ao navegador e ao runtime do Orca.

Referências oficiais:

- https://www.onorca.dev/docs/install
- https://www.onorca.dev/docs/terminal
- https://www.onorca.dev/docs/cli/overview

## Sugestão de skills para a próxima sessão

- `orca-cli`: confirmar a integração WSL, operar o navegador integrado e capturar a validação visual.
- `impeccable`: revisar a fidelidade da tela somente se houver trabalho de UI ou comparação com o comp aprovado.
- `computer-use`: usar apenas se for necessário interagir com janelas do Windows fora do navegador integrado do Orca.

Não sugerir `caveman` para a continuação desta linha de trabalho, pois seu uso foi recusado explicitamente.
