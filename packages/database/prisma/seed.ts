import { hash } from "bcryptjs";
import { db } from "../src/client";

const passwordHash = await hash("arkantos-dev", 12);

await db.user.upsert({
  where: { email: "operator@arkantos.local" },
  update: {},
  create: {
    email: "operator@arkantos.local",
    passwordHash,
    displayName: "Arkantos Operator",
    profile: {
      create: {
        bio: "Local development operator",
        preferences: { theme: "dark" },
      },
    },
  },
});

await db.$disconnect();
