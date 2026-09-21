import type { Metadata } from "next";
import { AuthForm } from "../auth-form";
import { AuthShell } from "../auth-shell";

export const metadata: Metadata = {
  title: "Criar conta | Afiliadoinator 3000",
};

export default function RegisterPage() {
  return (
    <AuthShell
      mode="register"
      title="Crie sua conta."
      description="Cadastre-se para acessar sua mesa de curadoria."
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
