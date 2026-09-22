import type { Metadata } from "next";
import { AuthForm } from "../auth-form";
import { AuthShell } from "../auth-shell";

export const metadata: Metadata = {
  title: "Entrar | Afiliadoinator 3000",
};

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      title="Afiliadoinator 3000"
      description="Entre para acessar sua Mesa de Curadoria e encontrar as melhores ofertas, com mais segurança e contexto."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
