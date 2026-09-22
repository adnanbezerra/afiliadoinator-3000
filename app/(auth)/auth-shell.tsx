import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./auth.module.css";

interface AuthShellProps {
  mode: "login" | "register";
  title: string;
  description: string;
  children: ReactNode;
}

const process = [
  ["Coleta", "Encontramos ofertas em diversas fontes."],
  ["Histórico de preço", "Analisamos a variação ao longo do tempo."],
  ["Aprovação humana", "Você revisa antes de qualquer publicação."],
] as const;

function ProcessIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="11" />
        <path d="M5 16h22M16 5c4 4 5.5 7.6 5.5 11S20 23 16 27c-4-4-5.5-7.6-5.5-11S12 9 16 5Z" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 25V17h5v8M14 25V11h5v14M22 25V5h5v20M4 26h25" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4 26 8v7c0 6.4-3.4 10.7-10 13-6.6-2.3-10-6.6-10-13V8l10-4Z" />
      <path d="m11 16 3.2 3.2L21 12.5" />
    </svg>
  );
}

export function AuthShell({
  mode,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <span className={styles.paperclip} aria-hidden="true" />
        <span className={styles.tape} aria-hidden="true" />

        <aside className={styles.index} aria-label="Autenticação">
          <Link className={styles.brand} href="/">
            Afiliadoinator <span>3000</span>
          </Link>

          <nav>
            <Link
              href="/login"
              aria-current={mode === "login" ? "page" : undefined}
            >
              <span className={styles.navIcon} aria-hidden="true">●</span>
              Entrar
            </Link>
            <Link
              href="/cadastro"
              aria-current={mode === "register" ? "page" : undefined}
            >
              <span className={styles.navIcon} aria-hidden="true">＋</span>
              Criar conta
            </Link>
          </nav>

          <div className={styles.seal} aria-hidden="true">
            <span />
          </div>
          <p>Bons produtos.<br />Melhores escolhas.</p>
        </aside>

        <section className={styles.dossier}>
          <div className={styles.heading}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </section>

        <aside className={styles.evidence} aria-label="Como funciona">
          <h2>Como funciona<br />nosso processo</h2>
          <ol>
            {process.map(([label, text], index) => (
              <li key={label}>
                <span className={styles.tag} aria-hidden="true">
                  <ProcessIcon index={index} />
                </span>
                <div>
                  <h3>{index + 1}. {label}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.evidenceFooter}>
            Mais contexto<br />para melhores escolhas
          </p>
        </aside>
      </div>
    </main>
  );
}
