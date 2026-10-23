import { NextResponse } from "next/server";
import { db } from "@arkantos/database";
import { getCurrentUser } from "../../../lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Autenticação necessária" }, { status: 401 });
  const body = await request.json().catch(() => null) as { items?: Array<{ productId?: string; quantity?: number }>; shippingAddress?: Record<string, string> } | null;
  const items = (body?.items ?? []).filter((item): item is { productId: string; quantity: number } => {
    const quantity = item.quantity;
    return typeof item.productId === "string" && typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0 && quantity <= 20;
  });
  const shippingAddress = body?.shippingAddress;
  if (!items.length || !shippingAddress?.street || !shippingAddress.city) return NextResponse.json({ error: "Carrinho ou endereço inválido" }, { status: 400 });
  const products = await db.product.findMany({ where: { id: { in: items.map((item) => item.productId as string) }, active: true } });
  if (products.length !== items.length) return NextResponse.json({ error: "Produto indisponível" }, { status: 400 });
  const quantities = new Map(items.map((item) => [item.productId, item.quantity]));
  const totalCents = products.reduce((sum, product) => sum + product.priceCents * (quantities.get(product.id) ?? 0), 0);
  const order = await db.$transaction(async (tx) => {
    for (const product of products) {
      const quantity = quantities.get(product.id) ?? 0;
      const updated = await tx.product.updateMany({ where: { id: product.id, stock: { gte: quantity } }, data: { stock: { decrement: quantity } } });
      if (updated.count !== 1) throw new Error("STOCK_UNAVAILABLE");
    }
    return tx.order.create({
      data: { number: `ARK-${Date.now().toString(36).toUpperCase()}`, userId: user.id, totalCents, status: "CONFIRMED", paymentStatus: "SIMULATED", shippingAddress, items: { create: products.map((product) => ({ productId: product.id, quantity: quantities.get(product.id) ?? 0, unitPriceCents: product.priceCents })) } },
    });
  }).catch((error: unknown) => error instanceof Error && error.message === "STOCK_UNAVAILABLE" ? null : (() => { throw error; })());
  if (!order) return NextResponse.json({ error: "Estoque insuficiente" }, { status: 409 });
  return NextResponse.json({ id: order.id, number: order.number }, { status: 201 });
}
