import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@arkantos/database";
import { AddToCart } from "../../components/add-to-cart";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product || !product.active) notFound();
  return <main className="panel">
    <div className="eyebrow">PRODUCT / {product.sku}</div><h1>{product.name}</h1><p className="muted">{product.description}</p>
    <p className="price">R$ {(product.priceCents / 100).toFixed(2).replace(".", ",")}</p>
    <p className="muted">{product.stock > 0 ? `${product.stock} unidades disponíveis` : "Esgotado"}</p>
    <div className="actions"><AddToCart product={{ id: product.id, name: product.name, priceCents: product.priceCents }} disabled={product.stock < 1} /><Link className="button secondary" href="/">Continuar comprando</Link></div>
  </main>;
}
