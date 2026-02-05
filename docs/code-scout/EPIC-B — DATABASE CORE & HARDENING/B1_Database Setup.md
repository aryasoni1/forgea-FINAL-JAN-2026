## FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B1 — Database Setup
- Source: /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B1_Database Setup.md

### TASKS CHECKED

- 1. Choose PostgreSQL as primary database
- 2. Set database timezone to UTC
- 3. Enable UUID extension in PostgreSQL
- 4. Create separate databases for dev and prod
- 5. Verify database connectivity locally

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — Prisma schema file present (models include User, AuditLog, VerificationLog, ResumeBullet, Lab, LabSession, etc.).
- /forgea-monorepo/packages/schema/prisma/migrations/ — Migration directories and SQL files exist (examples: 20260124065750_init_trust_schema/migration.sql, 20260124070452_add_immutability_triggers/migration.sql, 20260124170000_add_auditlog_immutability_trigger/migration.sql). These contain DDL and trigger SQL related to schema and immutability.
- /forgea-monorepo/.env and apps/\*/.env.local — Environment files include `DATABASE_URL="postgresql://aryasoni@localhost:5432/forgea_db"` (local DB connection string present in repo workspace).
- /docs/official-docs-registry.md — Official docs registry includes PostgreSQL references pinned to v18.1 (Postgres documentation links present in registry).
- Prisma usage in codebase: compiled artifacts show Prisma migrate/shadow DB logic invoking `CREATE DATABASE` for shadow DBs (evidence of Prisma migration usage in the workspace build outputs).

### WHAT IS PARTIALLY IMPLEMENTED

- UTC timezone configuration: Postgres documentation references are registered in `/docs/official-docs-registry.md`, but I did not find any repository scripts, SQL, or Terraform that explicitly set the database timezone to UTC (no explicit `SET TIME ZONE` or server conf files found).
- UUID extension enablement: Prisma schema and model defaults use `uuid()` semantics, and models use UUID columns, but there is no explicit `CREATE EXTENSION` (e.g., `pgcrypto` or `uuid-ossp`) SQL observed in migrations or infra scripts. UUIDs may be generated client-side, but DB-side extension enablement is not found.
- Database provisioning (dev/prod separation): No dedicated DB provisioning scripts (docker-compose, Dockerfiles for Postgres, or Terraform modules) were found for creating dev/prod databases. Prisma migrate-related code can create a shadow DB, but explicit infra provisioning for separate dev/prod DBs is not present in repository sources.

### WHAT IS MISSING

- Explicit DB provisioning scripts or infrastructure-as-code for Postgres (docker-compose, Dockerfile for Postgres, Kubernetes manifests, or Terraform module) — Not found.
- SQL or migration step that runs `CREATE EXTENSION` for UUID support (`pgcrypto` or `uuid-ossp`) — Not found.
- Any repository-level script or config that enforces `SET TIME ZONE 'UTC'` at database or session level — Not found.
- Documentation or scripts that create separate prod and dev databases and manage credentials (no terraform/db provisioning files discovered).
- Evidence that migrations have been applied to a running DB (no runtime state discovered in repo).

### RISKS OR CONFLICTS

- Sensitive values in repository workspace: `DATABASE_URL` with a local connection string is present in `/forgea-monorepo/.env` and app `.env.local` files — risk of accidental exposure or misuse.
- Missing DB extension enablement may lead to UUID generation differences (client vs server) and migration failures in some environments.
- Immutability triggers already present in migrations (see `add_immutability_triggers` and `add_auditlog_immutability_trigger` SQL): any provisioning or migration workflow must account for HARD LOCK policy and trigger behavior before applying changes to production.
- No explicit infra provisioning found: absence of provisioning automation increases manual steps and risk during setup and environment parity issues.

### QUESTIONS FOR CLARIFICATION

- None strictly required to produce this report. Planner should confirm whether DB provisioning is intended to be managed here or by separate infra repositories.

### NEXT AGENT HANDOFF PROMPT (for planner-architect)

You are the Planner-Architect responsible for Feature B1 — Database Setup (EPIC-B). Use this Code-Scout report (`/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B1_Database Setup.md`) and the Docs Gatekeeper output (once provided) as the authoritative facts. Produce the task document at `/docs/tasks/task-B1-database-setup.md` following the project task template. The task document must explicitly reference the factual gaps listed in this report (missing `CREATE EXTENSION`, missing provisioning scripts, missing timezone enforcement, presence of `DATABASE_URL` files, and existing immutability triggers in migrations). Do NOT implement code or migrations; only author the authoritative task with acceptance criteria, preconditions, required approvals (Docs Gatekeeper + Security if needed), and a precise list of artifacts to produce (infra provisioning scripts, DB config steps, migration steps, and verification steps). Include where to place any generated SQL and which agents will implement and verify the changes.

Handoff complete. Provide this report verbatim to the next agent.
