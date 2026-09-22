import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Roboto_Slab } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
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

const robotoSlab = Roboto_Slab({
  variable: "--font-slab",
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
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${robotoSlab.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <template
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Autenticação como um passaporte de inspeção aberto sobre a mesa de curadoria, com materialidade e contexto visíveis.
OWN-WORLD: Mesa grafite, folhas sobrepostas, papel quente, verde de aprovação, etiquetas ocres, clipes, fitas e selos editoriais.
STORY: Qualquer pessoa cria uma conta, inicia sessão e recebe acesso integral à área protegida.
FIRST VIEWPORT: Índice e marca à esquerda, formulário dominante no centro e processo de curadoria à direita, sobre uma mesa escura.
FORM: Implementação fiel da composição aprovada Passaporte de Inspeção; seed a3731eb9.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        {children}
        <Toaster timeout={5000} />
      </body>
    </html>
  );
}
