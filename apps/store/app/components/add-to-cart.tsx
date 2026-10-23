"use client";

import { useState } from "react";

type Product = { id: string; name: string; priceCents: number };
export function AddToCart({ product, disabled }: { product: Product; disabled?: boolean }) {
  const [added, setAdded] = useState(false);
  function add() {
    const current = JSON.parse(localStorage.getItem("arkantos_cart") ?? "[]") as Array<Product & { quantity: number }>;
    const existing = current.find((item) => item.id === product.id);
    if (existing) existing.quantity += 1;
    else current.push({ ...product, quantity: 1 });
    localStorage.setItem("arkantos_cart", JSON.stringify(current));
    setAdded(true);
  }
  return <button className="button" disabled={disabled} onClick={add}>{disabled ? "ESGOTADO" : added ? "ADICIONADO" : "ADICIONAR AO CARRINHO"}</button>;
}
