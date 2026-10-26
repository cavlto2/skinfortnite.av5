import type { Metadata } from "next";
import "./globals.css";

import Menu from "./components/Menu";

export const metadata: Metadata = {
  title: "Fortnite Arsenal | Coleção de Skins",
  description: "Sistema de cadastro e consulta de skins de Fortnite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={"h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">
        
        <Menu />

        {children}

      </body>
    </html>
  );
}
