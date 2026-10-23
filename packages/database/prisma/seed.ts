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
    role: "ADMIN",
    profile: {
      create: {
        bio: "Local development operator",
        preferences: { theme: "dark" },
      },
    },
  },
});

const products = [
  {
    sku: "OPS-001",
    slug: "terminal-field-kit",
    name: "Terminal Field Kit",
    description: "Kit compacto para operações de campo e análise de aplicações.",
    priceCents: 12990,
    stock: 12,
  },
  {
    sku: "OPS-002",
    slug: "neon-network-guide",
    name: "Neon Network Guide",
    description: "Guia ilustrado de redes, protocolos e observabilidade.",
    priceCents: 4990,
    stock: 30,
  },
  {
    sku: "OPS-003",
    slug: "black-market-hoodie",
    name: "Project Black Market Hoodie",
    description: "Moletom oficial do laboratório Project Black Market.",
    priceCents: 8990,
    stock: 8,
  },
];

for (const product of products) {
  await db.product.upsert({
    where: { sku: product.sku },
    update: product,
    create: product,
  });
}

await db.$disconnect();
