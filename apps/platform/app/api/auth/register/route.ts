import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@arkantos/database";
import { createSession } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string; displayName?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;
  const displayName = body?.displayName?.trim();
  if (!email || !password || !displayName || password.length < 8) {
    return NextResponse.json({ error: "Email, nome e senha de 8 caracteres são obrigatórios" }, { status: 400 });
  }
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
  const user = await db.user.create({
    data: { email, displayName, passwordHash: await hash(password, 12), profile: { create: {} } },
  });
  await createSession(user.id);
  return NextResponse.json({ ok: true }, { status: 201 });
}
