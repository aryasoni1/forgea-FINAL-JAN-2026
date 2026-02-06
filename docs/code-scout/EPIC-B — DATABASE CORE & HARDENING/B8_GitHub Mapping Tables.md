### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B8 — GitHub Mapping Tables
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

59. Create `GitHubAccount` table
60. Link `GitHubAccount` to `User`
61. Store GitHub user ID and username
62. Create `GitHubRepoMapping` table
63. Link repo mapping to `LabSession`
64. Store repo URL and default branch

---

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `User` model includes `githubId` (String? @unique).
- /forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql — initial migration created `githubId` column and unique index on `User`.
- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-labs/auth.config.ts — GitHub OAuth provider is configured and sets `githubId` on user profiles.
- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts — GitHub webhook handler exists; it parses push payloads and maps push events to `LabSession` by matching fork URLs.
- Seed data references: `/packages/schema/prisma/seed.ts` contains `baseRepoUrl` and `userForkUrl` values used for example sessions.

---

### WHAT IS PARTIALLY IMPLEMENTED

- `githubId` is stored on `User`, satisfying storage of GitHub user ID (task 61 partially satisfied). Username storage is not explicit in DB (no dedicated `githubUsername` field).
- Webhook-based mapping to `LabSession` by `userForkUrl` exists (partial realization of repo mapping/linking to sessions), but there is no dedicated `GitHubRepoMapping` table or structured mapping persisted in DB (tasks 62–64 not implemented).

---

### WHAT IS MISSING

- `GitHubAccount` model/table linking GitHub account metadata (`providerId`, `username`, `profileUrl`, `userId` FK) to `User`.
- `GitHubRepoMapping` model/table linking repository metadata (`repoUrl`, `defaultBranch`, `ownerId`, `repoId`) to `LabSession` (or `LabVersion`) with foreign keys and timestamps.
- Explicit username column or profile fields on `User` or a dedicated `GitHubAccount` table.
- Migrations and seed/backfill guidance for migrating existing `githubId`, `baseRepoUrl`, and `userForkUrl` into the new mapping tables.

---

### RISKS OR CONFLICTS

- Duplication risk: `User.githubId` may overlap with a future `GitHubAccount` table; migration/backfill required to avoid data loss or inconsistent representations.
- PII considerations: storing GitHub usernames and profile URLs may be considered PII; docs-gatekeeper must confirm handling guidance and retention policies.
- Webhook mapping relies on fork URL matching logic; introducing normalized repo mapping requires careful backfill to ensure existing sessions map correctly.
- Adding `GitHubRepoMapping` linked to `LabSession` may change lifecycle and deletion semantics — ensure `ON DELETE` behavior preserves audit/history.

---

### QUESTIONS FOR CLARIFICATION

- None.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B8 — GitHub Mapping Tables (EPIC-B). Use this code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B8_GitHub Mapping Tables.md as the source of truth. Produce the authoritative task document for Feature B8 under /docs/tasks/ following the repository's task document structure. Base the task document on EPIC-B tasks 59–64 and the existing repository artifacts: `User.githubId`, `auth.config.ts` GitHub provider, `apps/forgea-labs/app/api/webhooks/github/route.ts`, and seed data fields `baseRepoUrl`/`userForkUrl`.

The task document must:
- Specify exact schema additions (`GitHubAccount`, `GitHubRepoMapping`) with fields, types, uniqueness constraints, and foreign key behaviors.
- Provide migration/backfill steps to populate new tables from existing `githubId`, `baseRepoUrl`, and `userForkUrl` data.
- Call out PII and retention considerations and reference that Docs Gatekeeper must approve official guidance before implementation.
- Include an acceptance checklist for implementer and test-plan author.

Do not implement code changes — produce only the task document and stop when the task doc is created.
