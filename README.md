# Arkantos Wargame

Plataforma open source de treinamento em segurança ofensiva, com um Command
Center separado dos cenários vulneráveis. A Sprint 1 entrega a fundação local:
workspace pnpm, PostgreSQL via Docker Compose, Prisma, autenticação por
credenciais e perfil de operador.

## Requisitos

- Node.js 20.11+
- pnpm 10+
- Docker com Compose

## Executar localmente

```bash
cp .env.example .env
docker compose up -d postgres
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```

Abra `http://localhost:3000`. A conta de desenvolvimento criada pelo seed é:

- Email: `operator@arkantos.local`
- Senha: `arkantos-dev`

Não use essas credenciais em ambientes compartilhados. O cadastro da aplicação
está disponível para desenvolvimento e será endurecido junto com a campanha de
desafios.

Para executar a loja em outro terminal, use `pnpm dev:store` e abra
`http://localhost:3001`. Ela inclui catálogo, carrinho local, checkout com
pagamento simulado, pedidos e uma área administrativa acessível ao operador
seedado.

Vulnerable web wargame in Next.js with a monorepo layout:

```text
arkantos-wargame/
├── apps/
│   ├── platform/          # Command Center Next.js
│   └── store/             # Arkantos Store Next.js
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

### Variáveis de ambiente

Copie `.env.example` para `.env`. `DATABASE_URL` aponta para o PostgreSQL local
e `SESSION_SECRET` documenta o segredo reservado para a evolução do mecanismo
de sessão. As sessões atuais usam IDs aleatórios armazenados no banco e cookie
HttpOnly.
