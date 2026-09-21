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
      title="Bem-vindo de volta."
      description="Entre para continuar sua curadoria de ofertas."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
