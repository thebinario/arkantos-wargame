# arkantos-wargame

Vulnerable web wargame in Next.js with a monorepo layout:

```text
arkantos-wargame/
├── apps/
│   ├── platform/          # Command Center Next.js
│   └── store/             # Vulnerable e-commerce Next.js
├── packages/
│   ├── database/          # Prisma and migrations
│   ├── challenge-engine/  # Checkpoint validation engine
│   ├── challenge-sdk/     # Scenario event SDK
│   ├── shared/            # Shared types, schemas and utils
│   └── ui/                # Visual components
├── challenges/
│   └── owasp-2025/
│       ├── a01-access-control/
│       ├── a02-misconfiguration/
│       ├── ...
│       └── a10-exceptions/
├── infra/
│   ├── docker/
│   └── monitoring/
├── docs/
│   ├── architecture/
│   ├── roadmap.md
│   └── challenge-authoring.md
├── tests/
├── .github/workflows/
└── docker-compose.yml
```
