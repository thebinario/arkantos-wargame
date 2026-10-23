import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arkantos // Command Center",
  description: "Security training operations platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
