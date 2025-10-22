import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/fonts.css";

export const metadata: Metadata = {
  title: "Mobo",
  description: "Monitoramento e Colheita Automatizada de Lichias",
  icons: {
    icon: "/mobo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
