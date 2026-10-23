"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/login", { method: "POST", body: new FormData(event.currentTarget) });
    if (!response.ok) {
      setError("Credenciais inválidas.");
      setLoading(false);
      return;
    }
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={submit}>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Senha<input name="password" type="password" required minLength={8} autoComplete="current-password" /></label>
      {error && <p className="error">{error}</p>}
      <button disabled={loading}>{loading ? "VALIDANDO..." : "ENTRAR"}</button>
    </form>
  );
}
