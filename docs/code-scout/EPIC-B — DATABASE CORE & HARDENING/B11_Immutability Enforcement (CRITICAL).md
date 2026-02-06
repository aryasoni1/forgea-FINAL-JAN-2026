## FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B11_Immutability Enforcement (CRITICAL)
- Source: docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B11_Immutability Enforcement (CRITICAL).md

### TASKS CHECKED

- forgea-code-scout — Determine existing schema, triggers, and migrations for immutability enforcement.
- docs-gatekeeper — Verify referenced PostgreSQL or audit-hardening docs (not executed yet).
- planner-architect — Produce the approved task document for DB triggers (not executed yet).
- implementer — Implement triggers and migrations per approved task doc (not executed yet).

### WHAT ALREADY EXISTS

- /packages/schema/prisma/schema.prisma — Prisma schema defines `VerificationLog` (immutable record of CI verification) and `AuditLog` (immutable audit trail). Relevant model lines present and referenced by application code.
- /packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql — Creates `VerificationLog` and `AuditLog` tables and constraints (primary keys, foreign keys, unique indexes).
- /packages/schema/prisma/migrations/20260124070452_add_immutability_triggers/migration.sql — Defines `prevent_destructive_action()` function and attaches `verificationlog_immutable` and `auditlog_immutable` triggers to enforce append-only behavior on `VerificationLog` and `AuditLog`.
- /packages/schema/prisma/migrations/20260124170000_add_auditlog_immutability_trigger/migration.sql — Contains `prevent_auditlog_mutations()` function and triggers for `AuditLog` (RAISE EXCEPTION on UPDATE/DELETE).
- /packages/schema/prisma/migrations/20260126160143_auditlog_actor_support/migration.sql — Migration that adds `actorId` column to `AuditLog` (notes migration considerations when table is non-empty).
- /packages/audit/src/audit.service.ts — `AuditService` writes append-only `AuditLog` entries and documents a TODO to archive logs (>12 months) to S3/BigQuery.
- /packages/schema/src/db.ts — Runtime guard that throws if `DATABASE_URL` is not set (precondition enforcement for DB runtime).

### WHAT IS PARTIALLY IMPLEMENTED

- Immutability enforcement: Multiple migrations exist that create DB-level triggers and functions to prevent UPDATE/DELETE on `VerificationLog` and `AuditLog`. These appear to be applied in migrations under `packages/schema/prisma/migrations/*`.
- Migration notes: Some migrations (e.g., adding `actorId`) include commentary about non-empty-table constraints, indicating manual attention is required for some schema changes.

### WHAT IS MISSING

- No explicit `ProofArtifact` Prisma model discovered in the schema (no dedicated table for storing artifact binary payloads or object references found).
- No clear `VerificationAttempt` model by that exact name found in the schema (related verification entities exist as `VerificationLog` / `LabSession` / `Lab` but named `VerificationAttempt` not located).
- No centralized migration rollback or disaster-recovery plan files located in the repo; migrations exist but documented rollback/repair procedures are not present in inspected sources.
- Official PostgreSQL or audit-hardening documents required by planner are not verified by Docs-Gatekeeper (Docs-Gatekeeper step still required). If `/docs/official-docs-registry.md` lacks required entries, Code-Scout cannot approve references — see Questions below.

### RISKS OR CONFLICTS

- High risk: Immutability triggers are present and enforce append-only behavior; any attempted corrective migration or schema change that touches these tables must be carefully planned to avoid irreversible data loss or blocked deployments.
- Migration ordering: Existing migrations include operations that assume table emptiness for altering columns; applying such migrations to populated tables can fail or require complex data-migration steps.
- Missing artifact model: Absence of a `ProofArtifact` model suggests storage/backing for proof payloads may be implemented out-of-band (object store) or not yet implemented — this creates ambiguity for implementers planning to persist proof payloads.

### QUESTIONS FOR CLARIFICATION

- Are there any approved official docs already registered in `/docs/official-docs-registry.md` that the planner must use? (Docs-Gatekeeper must confirm.)

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the Docs Gatekeeper. Use this Code-Scout report in `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B11_Immutability Enforcement (CRITICAL).md` as input. Verify and provide authoritative PostgreSQL or audit-hardening documentation links required for the planner to proceed.

Specifically, check `/docs/official-docs-registry.md` for the following (if missing, respond with `missing` for that line):
- `postgres-triggers` — official PostgreSQL documentation on triggers and exception handling (pinned to a stable version/release).
- `append-only-patterns` — authoritative guidance on append-only audit patterns and their implications for schema migrations and backups.
- `disaster-recovery` — docs describing safe rollback or repair strategies for immutable tables and irreversible data operations.

For each line, respond in this exact format:
- `item:` <link> — `approved|missing`

Include a short note (1 line) if any registry entries are present that must be used verbatim by the planner. Do NOT propose design solutions or migration steps — only confirm presence of authoritative docs and their versions.

End with the exact final line:

Handoff complete. Provide this report verbatim to the next agent.
