import { redirect } from "next/navigation";
import { db } from "@arkantos/database";
import { getCurrentUser } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("http://localhost:3000/login");
  if (user.role !== "ADMIN") redirect("/");
  const [products, orders] = await Promise.all([db.product.findMany({ orderBy: { createdAt: "asc" } }), db.order.findMany({ include: { user: true }, orderBy: { createdAt: "desc" }, take: 20 })]);
  return <main><div className="eyebrow">OPERATIONS / ADMIN</div><h1>Store control</h1><section className="panel"><h2>Produtos</h2><table><thead><tr><th>SKU</th><th>Nome</th><th>Estoque</th><th>Preço</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td>{product.sku}</td><td>{product.name}</td><td>{product.stock}</td><td>R$ {(product.priceCents / 100).toFixed(2).replace(".", ",")}</td></tr>)}</tbody></table></section><section className="panel"><h2>Pedidos recentes</h2><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Status</th><th>Total</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.number}</td><td>{order.user.email}</td><td>{order.status}</td><td>R$ {(order.totalCents / 100).toFixed(2).replace(".", ",")}</td></tr>)}</tbody></table></section></main>;
}
