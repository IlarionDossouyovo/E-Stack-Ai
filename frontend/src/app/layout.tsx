import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELECTRON AI OS - Enterprise Artificial Intelligence Operating System",
  description: "Système d'exploitation intelligent pour entreprises - One Intelligence. Infinite Business.",
  keywords: ["AI", "ERP", "CRM", "Business", "Management", "Intelligence Artificielle", "Entreprise", "AIOS", "ELECTRON"],
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
      <body className={`${inter.className} h-full antialiased`}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
