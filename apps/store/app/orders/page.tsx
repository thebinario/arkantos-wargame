import { redirect } from "next/navigation";
import { db } from "@arkantos/database";
import { getCurrentUser } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("http://localhost:3000/login");
  const orders = await db.order.findMany({ where: { userId: user.id }, include: { items: { include: { product: true } } }, orderBy: { createdAt: "desc" } });
  return <main><div className="eyebrow">ACCOUNT / ORDERS</div><h1>Meus pedidos</h1>{orders.length === 0 ? <div className="panel"><p className="muted">Nenhum pedido encontrado.</p></div> : orders.map((order) => <article className="panel" key={order.id}><div className="actions" style={{ justifyContent: "space-between" }}><strong>{order.number}</strong><span className="eyebrow">{order.paymentStatus}</span></div><p className="muted">{order.items.map((item) => `${item.product.name} × ${item.quantity}`).join(", ")}</p><strong>R$ {(order.totalCents / 100).toFixed(2).replace(".", ",")}</strong></article>)}</main>;
}
