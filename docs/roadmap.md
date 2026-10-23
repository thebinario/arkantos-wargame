# ARKANTOS WARGAME — Roadmap do projeto

Open Source

Next.js + TypeScript

OWASP Top 10:2025

Web Pentest / AppSec

Minha proposta é desenvolver o Arkantos Wargame como uma plataforma de treinamento em segurança ofensiva, inspirada em laboratórios como PortSwigger Web Security Academy, Hack The Box e OWASP Juice Shop, mas com uma experiência própria.

O jogador terá acesso a um e-commerce funcional e intencionalmente vulnerável, com produtos, carrinho, contas de usuários, pedidos, cupons, pagamentos simulados e área administrativa.

Ao explorar corretamente uma vulnerabilidade, o backend identifica a condição de sucesso, registra a conquista e desbloqueia o próximo checkpoint automaticamente.

# 10

Checkpoints

# 30

Desafios iniciais

# 3

Níveis por checkpoint

## 1. Experiência visual da plataforma

Eu separaria a experiência em duas interfaces: o Arkantos Command Center, no qual o jogador acompanha os checkpoints, e o Arkantos Store, a loja que será atacada nos laboratórios.

Conceito visual do Command Center

ARKANTOS // WARGAME

LAB ONLINE

OPERATION

## Project Black Market

PROGRESSO

## 30%

CP-01

CP-02

CP-03

CP-04

CP-05

CP-06

CP-07

CP-08

CP-09

CP-10

CP-04 // Cryptographic Failures

EM ANDAMENTO

Investigue como a loja protege dados sensíveis e informações de clientes.

Desafio 1 concluído

Desafios 2 e 3 pendentes

Protótipo conceitual — dados ilustrativos.

O visual seria dark, com identidade hacker/terminal, verde neon e azul, mas a loja precisa parecer um e-commerce real — sem indicar visualmente onde estão as vulnerabilidades.

## 2. Roadmap dos 30 desafios

A versão mais recente do OWASP Top 10 é a de 2025. Vamos usar essa classificação, que inclui Software Supply Chain Failures e Mishandling of Exceptional Conditions.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://top10.owasp.org\&sz=32)

OWASP Top 10:2025

+1



Cada checkpoint principal terá três desafios introdutórios. Todos serão testáveis de forma prática, e não apenas perguntas teóricas.

01A01 — Broken Access ControlControle de acesso quebrado · 3 desafios

1

IDOR para consultar um pedido de outro cliente

2

Acessar uma rota administrativa sem autorização

3

Alterar o endereço de entrega pertencente a outro usuário

Cada desafio terá objetivo, pré-requisitos, pistas progressivas, validação automática e explicação da mitigação.

02A02 — Security MisconfigurationConfiguração insegura · 3 desafios

03A03 — Software Supply Chain FailuresCadeia de suprimentos · 3 desafios

04A04 — Cryptographic FailuresFalhas criptográficas · 3 desafios

05A05 — InjectionInjeção · 3 desafios

06A06 — Insecure DesignDesign inseguro · 3 desafios

07A07 — Authentication FailuresFalhas de autenticação · 3 desafios

08A08 — Software or Data Integrity FailuresFalhas de integridade · 3 desafios

09A09 — Security Logging & Alerting FailuresFalhas de logging e alertas · 3 desafios

10A10 — Mishandling of Exceptional ConditionsTratamento incorreto de exceções · 3 desafios

Progressão: 3 desafios resolvidos liberam o próximo checkpoint. O motor também permitirá, futuramente, pré-requisitos não lineares e campanhas com caminhos alternativos.

Para a categoria A09, o verificador precisará de telemetria separada dos logs vulneráveis, justamente para comprovar a ausência de eventos sem perder a capacidade de avaliar o laboratório.

## 3. Arquitetura técnica

Usaria um monorepo com Next.js Full Stack, mas separando a plataforma de treinamento dos cenários vulneráveis. Isso é fundamental para não deixar a própria plataforma comprometida quando alguém explora um laboratório.

Next.js — Arkantos Command Center

Dashboard, autenticação, checkpoints, pontuação e administração

Backend Next.js — Route Handlers

Sessões, API, progresso, controle de acesso e motor de validação

PostgreSQL

Usuários, progresso e evidências

Lab Runtime

E-commerce vulnerável isolado

Docker Compose · Redes isoladas · Dados fictícios · Reset por laboratório

### Stack proposta

| Componente      | Tecnologia                                 |
| --------------- | ------------------------------------------ |
| Frontend        | Next.js 16, React, TypeScript              |
| Backend         | Next.js Route Handlers e Server Actions    |
| UI              | Tailwind CSS, shadcn/ui, Lucide            |
| Banco           | PostgreSQL e Prisma                        |
| Autenticação    | Auth.js ou solução equivalente             |
| Filas e eventos | Redis + worker de validação                |
| Isolamento      | Docker Compose inicialmente                |
| Testes          | Vitest e Playwright                        |
| CI/CD           | GitHub Actions                             |
| Observabilidade | Logs estruturados e eventos de laboratório |

A versão 16 é a linha atual do Next.js no npm, e recomendo utilizar uma versão estável com patches atualizados, evitando canary em produção.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub

+1



### Estrutura do repositório

Organização proposta para `arkantos-wargame`

```
arkantos-wargame/
├── apps/
│   ├── platform/          # Command Center Next.js
│   └── store/             # E-commerce Next.js vulnerável
├── packages/
│   ├── database/          # Prisma e migrations
│   ├── challenge-engine/  # Validação de checkpoints
│   ├── challenge-sdk/     # Eventos dos cenários
│   ├── shared/            # Tipos, schemas e utilitários
│   └── ui/                # Componentes visuais
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
├── docker-compose.yml
└── README.md
```

Essa estrutura permitirá adicionar futuramente outros cenários, como um banco digital vulnerável, APIs de fintech, ambientes JWT, GraphQL, Active Directory e laboratórios de DevSecOps, sem reescrever o motor de checkpoints.

## 4. Como o backend detectará a exploração

Este é o mecanismo mais importante do projeto.

Não quero que o jogador simplesmente clique em "Concluir" ou informe uma flag fixa que possa ser copiada. O sistema precisa reconhecer um resultado concreto produzido no ambiente vulnerável.

1. Jogador inicia o desafio

   A plataforma cria uma sessão de laboratório e fornece um identificador exclusivo.
2. Jogador explora o e-commerce

   Utiliza navegador, DevTools, Burp Suite ou scripts próprios para testar a vulnerabilidade.
3. O cenário registra o efeito

   Uma alteração de pedido, acesso não autorizado ou outro efeito verificável produz evidência vinculada à sessão.
4. Motor de validação confirma

   O backend consulta o estado real do laboratório e verifica uma condição específica de sucesso, sem confiar em declarações do frontend.
5. Checkpoint desbloqueado

   O progresso é persistido, a pontuação é registrada e o próximo desafio aparece automaticamente.

Exemplo: desafio IDOR.

O jogador A deve descobrir como visualizar um pedido pertencente ao usuário B. O objetivo não é simplesmente acessar uma URL, mas demonstrar que o backend forneceu informação de outro usuário sem autorização.

O verificador precisa confirmar:

- Pedido acessado pertence ao usuário B.
- A requisição foi realizada na sessão de A.
- A resposta incluiu dados protegidos.
- O evento está associado ao desafio e à instância correta.

Uma vez confirmados esses critérios, o checkpoint será concluído automaticamente.

Importante: um log de requisição isolado não comprova o sucesso de todos os tipos de exploração. Precisaremos de verificadores específicos para cada desafio, combinando eventos, estado do banco e efeitos observáveis.

## 5. Modelo de checkpoints

Para que a interface seja dinâmica, cada desafio terá metadados declarativos como estes:

```
type Challenge = {
  id: string;
  category: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  prerequisites: string[];
  validatorId: string;
  points: number;
  hints: string[];
};
```

E teremos entidades como `User`, `LabSession`, `Challenge`, `ChallengeAttempt`, `Evidence`, `CheckpointProgress` e `UnlockEvent`.

As alterações de progresso serão atômicas e idempotentes. O jogador não poderá desbloquear desafios manipulando requisições para a API do Command Center.

Além disso, o backend validará um evento antes de publicar a mudança ao frontend, com atualização em tempo real via SSE ou polling.

## 6. Roadmap de implementação

Minha sugestão é construir a primeira versão em seis fases, priorizando uma aplicação realmente funcional antes de expandir os desafios.

1Fundação do projetoSprint 1

Criar monorepo Next.js com pnpm workspaces

Configurar Prisma, PostgreSQL e Docker Compose

Implementar autenticação e perfis

Criar documentação técnica e CI

Critério de entrega

Aplicação executando localmente com banco e autenticação

2E-commerce realistaSprint 2

3Motor de checkpointsSprint 3

4Primeiros 10 desafiosSprint 4

5Expandir para 30 desafiosSprints 5–6

6Versão pública e comunidadeSprint 7+

## 7. Segurança e isolamento dos laboratórios

Como teremos vulnerabilidades exploráveis de propósito, precisamos evitar que o ambiente de treinamento comprometa a máquina do desenvolvedor ou a própria plataforma.

As regras arquiteturais serão:

- Separar o Command Center dos laboratórios vulneráveis, inclusive credenciais, banco de dados e rede.
- Utilizar containers sem privilégios, com limites de CPU, memória e processos.
- Evitar montagem do Docker socket e diretórios sensíveis do host.
- Bloquear acesso dos laboratórios à rede interna e a endpoints de metadata de cloud.
- Usar dados totalmente fictícios e pagamentos simulados.
- Permitir reset e recriação de cada cenário.
- Não expor os laboratórios vulneráveis diretamente à internet na configuração padrão.

Para a primeira versão, eu priorizaria execução local por Docker Compose. Posteriormente podemos implementar instâncias isoladas por jogador para hospedagem pública.

## 8. Definição do MVP

## Arkantos Wargame v0.1

Escopo inicial

A primeira versão deve comprovar a arquitetura de ponta a ponta: o jogador encontra uma vulnerabilidade real no cenário, explora, recebe a conquista e vê o próximo checkpoint liberado.

Checklist de entrega — planejamento, não status de implementação

0/7

Monorepo e infraestrutura Docker

E-commerce com contas, produtos e pedidos

Command Center com 10 checkpoints visíveis

Primeiro desafio IDOR funcional

Validação automática de exploração

Desbloqueio e persistência de progresso

Reset do laboratório e testes automatizados

A evolução seria:

`v0.1` — Primeira exploração ponta a ponta\
`v0.2` — Dez desafios, um por checkpoint\
`v0.3` — Trinta desafios iniciais\
`v1.0` — Plataforma documentada, testada e pronta para contribuições

## 9. Próximo passo no GitHub

A estrutura proposta será para o repositório `arkantos-wargame`. Não consegui confirmar sua existência ou permissão de acesso no GitHub conectado, portanto nenhum repositório, arquivo ou commit foi criado nesta etapa.
