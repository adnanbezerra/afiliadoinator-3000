"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import styles from "./auth.module.css";

type AuthMode = "login" | "register";
type FieldName = "name" | "email" | "password";

interface AuthFormProps {
  mode: AuthMode;
}

interface ErrorPayload {
  error?: string;
  fields?: Partial<Record<FieldName, string[]>>;
}

function FieldIcon({ type }: { type: FieldName }) {
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6.5h18v11H3zM3.8 7.3 12 13l8.2-5.7" />
      </svg>
    );
  }

  if (type === "password") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="10" width="14" height="11" rx="1" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c.8-5 3.5-7.5 8-7.5s7.2 2.5 8 7.5" />
    </svg>
  );
}

const genericErrors: Record<string, string> = {
  "Email already registered": "Este e-mail já está cadastrado.",
  "Invalid email or password": "E-mail ou senha incorretos.",
};

function translateFieldError(field: FieldName, error: string): string {
  if (field === "name") return "Informe um nome com pelo menos 2 caracteres.";
  if (field === "email") return "Informe um e-mail válido.";
  if (error.includes("letter")) return "Inclua pelo menos uma letra.";
  if (error.includes("number")) return "Inclua pelo menos um número.";
  return "Use entre 8 e 72 caracteres.";
}

async function readError(response: Response): Promise<{
  message: string;
  fields: Partial<Record<FieldName, string>>;
}> {
  const payload = (await response.json().catch(() => ({}))) as ErrorPayload;
  const fields: Partial<Record<FieldName, string>> = {};

  for (const field of ["name", "email", "password"] as const) {
    const firstError = payload.fields?.[field]?.[0];
    if (firstError) fields[field] = translateFieldError(field, firstError);
  }

  return {
    message:
      (payload.error && genericErrors[payload.error]) ||
      "Não foi possível concluir. Confira os dados e tente novamente.",
    fields,
  };
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldName, string>>
  >({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    try {
      if (isRegister) {
        const registerResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(form.get("name") ?? ""),
            email,
            password,
          }),
        });

        if (!registerResponse.ok) {
          const error = await readError(registerResponse);
          setMessage(error.message);
          setFieldErrors(error.fields);
          return;
        }
      }

      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const error = await readError(loginResponse);
        setMessage(
          isRegister
            ? "Conta criada. Entre novamente com o e-mail e a senha cadastrados."
            : error.message,
        );
        setFieldErrors(error.fields);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setMessage("Não foi possível conectar ao servidor. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const alternateHref = isRegister ? "/login" : "/cadastro";
  const alternateLabel = isRegister ? "Entrar" : "Criar conta";

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {isRegister ? (
        <label className={styles.field}>
          <span>Nome</span>
          <span className={styles.inputControl}>
            <span className={styles.fieldIcon}><FieldIcon type="name" /></span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={120}
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              placeholder="Como devemos chamar você?"
            />
          </span>
          {fieldErrors.name && (
            <small id="name-error">{fieldErrors.name}</small>
          )}
        </label>
      ) : null}

      <label className={styles.field}>
        <span>E-mail</span>
        <span className={styles.inputControl}>
          <span className={styles.fieldIcon}><FieldIcon type="email" /></span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            placeholder="seu@email.com"
          />
        </span>
        {fieldErrors.email && (
          <small id="email-error">{fieldErrors.email}</small>
        )}
      </label>

      <label className={styles.field}>
        <span>Senha</span>
        <span className={styles.passwordControl}>
          <span className={styles.fieldIcon}><FieldIcon type="password" /></span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 8 : 1}
            maxLength={72}
            required
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password
                ? "password-error"
                : isRegister
                  ? "password-help"
                  : undefined
            }
            placeholder={isRegister ? "Crie uma senha segura" : "Sua senha"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-pressed={showPassword}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </span>
        {fieldErrors.password ? (
          <small id="password-error">{fieldErrors.password}</small>
        ) : isRegister ? (
          <small id="password-help">
            Mínimo de 8 caracteres, com uma letra e um número.
          </small>
        ) : null}
      </label>

      {message && (
        <p className={styles.error} role="alert">
          {message}
        </p>
      )}

      <button
        className={styles.submit}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? isRegister
            ? "Criando conta…"
            : "Entrando…"
          : isRegister
            ? "Criar conta e acessar →"
            : "Continuar →"}
      </button>

      <p className={styles.alternate}>
        {isRegister ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
        <Link href={alternateHref}>{alternateLabel}</Link>
      </p>
    </form>
  );
}
