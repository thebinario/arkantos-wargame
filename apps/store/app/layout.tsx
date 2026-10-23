import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Arkantos Store", description: "Project Black Market store" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR"><body><div className="store-shell">
      <nav className="store-nav">
        <Link className="brand" href="/">ARKANTOS <span>STORE</span></Link>
        <div className="nav-links"><Link href="/">Produtos</Link><Link href="/cart">Carrinho</Link><Link href="/orders">Meus pedidos</Link><Link href="http://localhost:3000">Command Center</Link></div>
      </nav>
      {children}
    </div></body></html>
  );
}
