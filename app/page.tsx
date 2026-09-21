import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { PublicUser } from "@/src/modules/identity/application/shared/UserRepository";
import { InvalidSessionError } from "@/src/modules/identity/application/shared/AuthError";
import { getAuthenticatedUserByToken } from "@/src/modules/identity/infra/routes/require-authenticated-user";
import { SESSION_COOKIE } from "@/src/modules/identity/infra/routes/session-cookie";
import { LogoutButton } from "./logout-button";
import styles from "./page.module.css";

async function getCurrentUser(): Promise<PublicUser> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    return await getAuthenticatedUserByToken(token);
  } catch (error) {
    if (error instanceof InvalidSessionError) {
      redirect("/login");
    }

    throw error;
  }
}

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Afiliadoinator 3000">
          Afiliadoinator 3000
        </Link>
        <div className={styles.account}>
          <span>{user.name}</span>
          <LogoutButton />
        </div>
      </header>

      <section className={styles.welcome}>
        <div>
          <h1>Sua mesa de curadoria está pronta.</h1>
          <p>
            Sua sessão está ativa. Você tem acesso às áreas protegidas e às
            operações disponíveis do Afiliadoinator 3000.
          </p>
        </div>
        <dl className={styles.identity}>
          <div>
            <dt>Operador</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Sessão</dt>
            <dd>Protegida por cookie httpOnly</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
