import Link from "next/link";
import { getCurrentUser } from "../lib/auth";

const checkpoints = [
  ["CP-01", "Broken Access Control"],
  ["CP-02", "Security Misconfiguration"],
  ["CP-03", "Software Supply Chain Failures"],
  ["CP-04", "Cryptographic Failures"],
  ["CP-05", "Injection"],
  ["CP-06", "Insecure Design"],
  ["CP-07", "Authentication Failures"],
  ["CP-08", "Software or Data Integrity"],
  ["CP-09", "Logging & Alerting"],
  ["CP-10", "Exceptional Conditions"],
];

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <main className="shell">
      <nav className="nav">
        <span className="eyebrow">ARKANTOS // WARGAME</span>
        <span className="nav-links">
          <Link href="http://localhost:3001">OPEN STORE</Link>
          {user ? <Link href="/profile">OPERATOR / {user.displayName}</Link> : <Link href="/login">AUTHENTICATE</Link>}
        </span>
      </nav>
      <header className="hero">
        <div>
          <div className="eyebrow">LAB ONLINE · PROJECT BLACK MARKET</div>
          <h1>Command Center</h1>
          <p className="muted">A plataforma de operações para laboratórios de segurança ofensiva.</p>
        </div>
        <div className="panel"><span className="muted">PROGRESSO</span><h2>00%</h2><span className="muted">0 / 30 desafios</span></div>
      </header>
      <section className="grid">
        {checkpoints.map(([id, title], index) => (
          <article className="panel checkpoint" key={id}>
            <strong>{id} {"//"} {index === 0 ? "READY" : "LOCKED"}</strong>
            <div>{title}</div>
            <p className="muted">{index === 0 ? "Primeiro checkpoint disponível na próxima sprint." : "Complete o checkpoint anterior para desbloquear."}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
