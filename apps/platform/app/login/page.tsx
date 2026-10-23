import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <main className="shell">
      <div className="panel">
        <div className="eyebrow">ARKANTOS // SECURE ACCESS</div>
        <h1>Autenticar operador</h1>
        <p className="muted">Use sua conta para acessar o Command Center.</p>
        <LoginForm />
      </div>
    </main>
  );
}
