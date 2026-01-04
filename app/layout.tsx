import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lory-Marie Club | Salão de Leitura",
  description: "Um clube do livro íntimo e feminino onde cada livro é tratado como um pequeno ritual de autocuidado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}