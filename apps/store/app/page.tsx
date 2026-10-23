import Link from "next/link";
import { db } from "@arkantos/database";

export const dynamic = "force-dynamic";

function price(cents: number) { return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`; }

export default async function StoreHome() {
  const products = await db.product.findMany({ where: { active: true }, orderBy: { createdAt: "asc" } });
  return <main>
    <section className="hero">
      <div><div className="eyebrow">PROJECT BLACK MARKET / CURATED GOODS</div><h1>Equipamento para quem olha duas vezes.</h1><p className="muted">Produtos selecionados para operações, pesquisa e vida fora do terminal.</p></div>
      <div className="panel"><div className="eyebrow">SECURE CHECKOUT</div><p>Pagamento simulado · Dados fictícios · Entrega local</p><Link className="button secondary" href="/cart">Ver carrinho</Link></div>
    </section>
    <section className="grid">{products.map((product) => <Link className="panel product" href={`/products/${product.slug}`} key={product.id}>
      <div><div className="product-art">{product.sku.slice(-3)}</div><h2>{product.name}</h2><p className="muted">{product.description}</p></div><div className="price">{price(product.priceCents)}</div>
    </Link>)}</section>
  </main>;
}
