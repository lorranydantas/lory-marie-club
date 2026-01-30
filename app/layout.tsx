import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lory-Marie Club | Salão de Leitura",
  description: "Um clube do livro íntimo e feminino onde cada livro é tratado como um pequeno ritual de autocuidado.",
  manifest: "/manifest.json",
  themeColor: "#C8AE7D",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lory-Marie Club",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}