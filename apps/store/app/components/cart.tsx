"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { id: string; name: string; priceCents: number; quantity: number };
export function Cart() {
  const [items] = useState<Item[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("arkantos_cart") ?? "[]") as Item[];
  });
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  if (!items.length) return <div className="panel"><p className="muted">Seu carrinho está vazio.</p><Link className="button" href="/">Explorar produtos</Link></div>;
  return <section className="panel">
    {items.map((item) => <div className="actions" key={item.id} style={{ justifyContent: "space-between", borderBottom: "1px solid var(--line)", padding: "12px 0" }}><span>{item.name} × {item.quantity}</span><strong>R$ {(item.priceCents * item.quantity / 100).toFixed(2).replace(".", ",")}</strong></div>)}
    <h2>Total: R$ {(total / 100).toFixed(2).replace(".", ",")}</h2>
    <Link className="button" href="/checkout">Ir para checkout</Link>
  </section>;
}
