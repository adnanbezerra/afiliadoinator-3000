import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./auth.module.css";

interface AuthShellProps {
  mode: "login" | "register";
  title: string;
  description: string;
  children: ReactNode;
}

const journey = [
  ["Descoberta", "Busca unificada entre marketplaces."],
  ["Evidência", "Histórico de preço, marca e qualidade."],
  ["Decisão", "Ranking assistido e aprovação humana."],
] as const;

export function AuthShell({
  mode,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <aside className={styles.story} aria-label="Sobre o produto">
          <header className={styles.storyHeader}>
            <Link className={styles.brand} href="/">
              Afiliadoinator <span>3000</span>
            </Link>
            <nav aria-label="Autenticação">
              <Link
                href="/login"
                aria-current={mode === "login" ? "page" : undefined}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                aria-current={mode === "register" ? "page" : undefined}
              >
                Criar conta
              </Link>
            </nav>
          </header>

          <div className={styles.storyContent}>
            <h2>Ofertas boas têm contexto.</h2>
            <p>
              Descubra, compare e aprove oportunidades sem depender apenas do
              desconto anunciado.
            </p>

            <ol className={styles.journey}>
              {journey.map(([label, text], index) => (
                <li key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{label}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className={styles.sources}>
            Ecossistema previsto — Amazon Brasil · Mercado Livre · Shopee ·
            AliExpress
          </p>
        </aside>

        <section className={styles.dossier}>
          <div className={styles.heading}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </section>

      </div>
    </main>
  );
}
