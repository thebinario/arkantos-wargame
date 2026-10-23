"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Checkout() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const items = JSON.parse(localStorage.getItem("arkantos_cart") ?? "[]") as Array<{ id: string; quantity: number }>;
    const address = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ items: items.map(({ id, quantity }) => ({ productId: id, quantity })), shippingAddress: address }) });
    if (response.status === 401) { router.push("http://localhost:3000/login"); return; }
    if (!response.ok) { setError((await response.json()).error ?? "Não foi possível criar o pedido."); setLoading(false); return; }
    localStorage.removeItem("arkantos_cart"); router.push("/orders");
  }
  return <form className="panel" onSubmit={submit}>
    <label>Nome para entrega<input name="name" required /></label><label>Endereço<input name="street" required /></label><label>Cidade<input name="city" required /></label><label>Cartão de teste<input name="card" inputMode="numeric" placeholder="4242 4242 4242 4242" required /></label>
    <p className="muted">Nenhuma cobrança real será realizada.</p>{error && <p className="notice">{error}</p>}<button className="button" disabled={loading}>{loading ? "PROCESSANDO..." : "CONFIRMAR PEDIDO"}</button>
  </form>;
}
