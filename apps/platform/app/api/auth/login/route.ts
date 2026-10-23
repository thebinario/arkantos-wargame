import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@arkantos/database";
import { createSession } from "../../../../lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await createSession(user.id);
  return NextResponse.json({ ok: true });
}
