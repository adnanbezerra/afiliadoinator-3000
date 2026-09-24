import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { PublicUser } from "@/src/modules/identity/application/shared/UserRepository";
import { InvalidSessionError } from "@/src/modules/identity/application/shared/AuthError";
import { getAuthenticatedUserByToken } from "@/src/modules/identity/infra/routes/require-authenticated-user";
import { SESSION_COOKIE } from "@/src/modules/identity/infra/routes/session-cookie";
import { Workbench } from "./workbench";

async function getCurrentUser(): Promise<PublicUser> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    return await getAuthenticatedUserByToken(token);
  } catch (error) {
    if (error instanceof InvalidSessionError) redirect("/login");
    throw error;
  }
}

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <template
        dangerouslySetInnerHTML={{
          __html: `<!--
THESIS: A busca é a bancada de trabalho; recusa dashboard, KPIs e navegação intermediária.
OWN-WORLD: Papel quente, índice lateral verde, listas documentais compactas e ficha presa à borda direita.
STORY: Operador pesquisa fontes reais, compara limitações, seleciona um produto e inicia preparação sob aprovação humana.
FIRST VIEWPORT: Índice fixo à esquerda, busca e filtros no topo, resultados no centro e ficha selecionada à direita.
FORM: Bancada operacional derivada do plano aprovado; estrutura fixa pela especificação, sem seed de composição.
-->`,
        }}
      />
      <Workbench user={user} />
    </>
  );
}
