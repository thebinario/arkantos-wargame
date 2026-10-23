# Arquitetura

## Sprint 1

O `apps/platform` é o Command Center e é o único aplicativo implementado nesta
fase. O pacote `packages/database` encapsula o Prisma Client e o schema
PostgreSQL. Cenários vulneráveis não compartilham banco, credenciais ou rede
com a plataforma; serão adicionados como runtimes isolados nas próximas
sprints.

### Identidade e sessão

O fluxo inicial usa credenciais, `bcryptjs` para armazenamento irreversível de
senhas e IDs de sessão aleatórios persistidos na tabela `Session`. O cookie
`arkantos_session` é HttpOnly, SameSite=Lax e Secure em produção. Rotas e
páginas devem consultar `getCurrentUser()` no servidor, nunca confiar em um
identificador de usuário enviado pelo cliente.

### Banco local

O Compose fornece apenas PostgreSQL, sem montar o socket do Docker ou diretórios
do host. Dados persistem no volume `arkantos-postgres-data` e podem ser
descartados em desenvolvimento com `docker compose down -v`.
