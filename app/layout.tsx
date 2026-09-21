import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afiliadoinator 3000",
  description: "Curadoria de ofertas com histórico de preços e aprovação humana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <template
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Autenticação como entrada em uma mesa de curadoria; recusa tanto o cartão SaaS genérico quanto o excesso cenográfico.
OWN-WORLD: Painel editorial verde, papel técnico claro, grafite e ocre pontual; contexto útil sem competir com a tarefa.
STORY: Qualquer pessoa cria uma conta, inicia sessão e recebe acesso integral à área protegida.
FIRST VIEWPORT: Proposta e jornada do produto à esquerda, formulário direto à direita; no mobile, a narrativa se comprime antes do formulário.
FORM: Mesa de Curadoria clean, derivada da direção Passaporte de Inspeção; seed a3731eb9.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
