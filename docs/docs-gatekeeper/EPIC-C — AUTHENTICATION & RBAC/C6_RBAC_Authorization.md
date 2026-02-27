## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C6_RBAC_Authorization
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C6_RBAC_Authorization.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C6_RBAC_Authorization.md
  - /Users/aryasoni/Desktop/Forgea/packages/config/src/permissions.ts (referenced in code-scout)
  - /Users/aryasoni/Desktop/Forgea/packages/schema/prisma/schema.prisma (referenced in code-scout)

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Enum mapping, migrations, and schema defaults
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Authoritative behavior of Prisma enum generation and migration SQL; needed to design safe enum renames and backfills.
  - Decision it informs: Migration order and whether Prisma will generate `CREATE TYPE` / `ALTER TYPE` semantics compatible with Postgres.
  - What breaks without it: Incorrect migration assumptions can produce runtime errors or broken enum values in deployed DBs.

- Technology: PostgreSQL
  - Concept: Enum types, DDL semantics, transactional ALTERs, and CHECK constraints
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: 18.1
  - Why required: Clarifies safe patterns for renaming enum labels, adding/removing values, and atomic backfills.
  - Decision it informs: Safe migration order (create new value → backfill rows → update app → drop old value).
  - What breaks without it: Enum operations may fail or leave incompatible enum labels across environments.

- Technology: OWASP — Access Control Guidance
  - Concept: Access-control design patterns, least-privilege, and audit logging
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html
  - Exact version requirement: LIVING DOCUMENT — REVIEW BEFORE IMPLEMENTATION
  - Why required: Governs recommended enforcement semantics (default-deny, server-side checks, audit hooks) and common pitfalls to avoid.
  - Decision it informs: Whether enforcement is safe in Edge middleware or must live server-side and which audit hooks to require.
  - What breaks without it: Inconsistent enforcement and privilege escalation risks.

### EXISTING INTERNAL DOCS (VERIFIED)

- `packages/schema/prisma/schema.prisma`
  - Coverage status: PARTIAL
  - Exact gaps: Defines `UserRole` enum (`ADMIN`, `USER`, `RECRUITER`) but does not document canonical role intent or include frontend-only values like `MODERATOR`.

- `packages/config/src/permissions.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Contains authoritative `PERMISSIONS` matrix and helpers (`parseSessionUser`, `canUserPerform`) but lacks a documented enforcement integration point and shows drift (references to `CANDIDATE`).

- `apps/forgea-labs/middleware.ts`
  - Coverage status: INSUFFICIENT
  - Exact gaps: Only checks cookie presence and explicitly avoids RBAC enforcement; does not consume `packages/config/src/permissions.ts` for default-deny enforcement.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Rationale: Core technical references (Prisma, PostgreSQL, OWASP access control) exist or are applicable, but repo lacks pinned adapter/runtime guidance and internal policy docs that declare canonical role values, enforcement architecture, and middleware API. These internal docs must be added before safe migrations and enforcement rollouts.

### STUDY GUIDE FOR HUMAN

- `Prisma enums`: Why — determines migration SQL for enum changes; Alternatives — represent roles as text/varchar (safer to evolve but weaker schema enforcement); When NOT to use enums — when roles change frequently; Common mistakes — renaming enum labels in-place without backfill steps.
- `PostgreSQL enums`: Why — DB-level enforcement and storage efficiency; Alternatives — canonical lookup table + FK (recommended when roles change often); When NOT to use enums — when anticipating frequent role additions/removals; Common mistakes — assuming enum label renames are atomic across versions.
- `Access Control (OWASP)`: Why — provides common threat model and recommended patterns (default-deny, server-side checks); Alternatives — simple role checks in UI (insufficient); When NOT to use client-only enforcement; Common mistakes — trusting client-supplied role claims and inconsistent checks across services.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-C/rbac_policy.md
  - Purpose: Canonical RBAC policy for the project (role definitions, capability mapping, audit requirements, default-deny rule).
  - Exact knowledge to add: Authoritative role list, capability mappings referencing `packages/config/src/permissions.ts`, audit-event requirements (which actions require `emitAuditEvent`), and rollback guidance for role changes.
  - Required version pin: reference Prisma 7.3.0 and PostgreSQL 18.1 in header.

- Path: /docs/official-docs/EPIC-C/role_enum_policy.md
  - Purpose: Database representation decision for roles (Postgres enum vs lookup table) and migration guidelines for renaming/backfilling role labels.
  - Exact knowledge to add: Chosen canonical approach, migration step order, backfill scripts guidance, and acceptance tests.
  - Required version pin: reference Prisma 7.3.0 and PostgreSQL 18.1 in header.

- Path: /docs/official-docs/EPIC-C/authorization_integration.md
  - Purpose: Enforcement architecture doc — specify whether Edge middleware or server-side middleware is authoritative, and the middleware API signature.
  - Exact knowledge to add: `authorizeRoute(req: Request, rule: RouteRule): Promise<void|Response>` signature, usage examples, and mapping to `packages/config/src/permissions.ts` helpers.
  - Required version pin: Node.js 20.x, Next.js pinned version (if Edge middleware chosen).

### OPEN QUESTIONS / AMBIGUITIES

- Which role list is canonical for the product? (`packages/schema/prisma/schema.prisma` shows `ADMIN`, `USER`, `RECRUITER`, but UI references `MODERATOR` and `packages/config` references `CANDIDATE`.)
- Should roles be stored as a Postgres enum or a normalized lookup table with FK (this affects migration complexity and release strategy)?
- Should RBAC enforcement be attempted in Edge middleware (runtime constraints) or centralized in server-side middleware that consumes `packages/config/src/permissions.ts`?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C6 — RBAC Authorization
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C6_RBAC_Authorization.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for RBAC and role-model consistency.

---

End of brief.
