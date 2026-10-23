import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import { LogoutButton } from "./logout-button";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main className="shell">
      <nav className="nav"><span className="eyebrow">OPERATOR PROFILE</span><LogoutButton /></nav>
      <section className="panel">
        <div className="eyebrow">IDENTITY VERIFIED</div>
        <h1>{user.displayName}</h1>
        <p className="muted">{user.email}</p>
        <p>{user.profile?.bio ?? "Nenhuma descrição cadastrada."}</p>
      </section>
    </main>
  );
}
