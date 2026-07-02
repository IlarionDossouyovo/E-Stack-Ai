import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Stack AI - Electron AI Business OS",
  description: "Plateforme Internationale d'Intelligence Artificielle pour la Gestion Intégrale des Entreprises",
  keywords: ["AI", "ERP", "CRM", "Business", "Management", "Intelligence Artificielle", "Entreprise"],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>{children}</body>
    </html>
  );
}
