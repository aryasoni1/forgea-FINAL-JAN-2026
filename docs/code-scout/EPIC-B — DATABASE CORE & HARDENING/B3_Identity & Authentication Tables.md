### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B3 — Identity & Authentication Tables
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

11. Create `User` table
12. Add unique constraint on user email
13. Add `role` enum (ADMIN, USER, RECRUITER)
14. Add `authProvider` enum (EMAIL, GOOGLE, GITHUB)
15. Add timestamps to User table
16. Create `AuthSession` table
17. Link AuthSession to User via foreign key
18. Add session expiry logic
19. Create `AuthIdentity` table
20. Link AuthIdentity to User
21. Support multiple auth providers per user
22. Enforce provider + providerUserId uniqueness

---

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `User` model exists with `id`, `email`, `role`, `githubId`, `icprScore`, and relations to `Account` and `Session`.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `email` has `@unique` constraint on `User`.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `UserRole` enum exists with values `CANDIDATE`, `ADMIN`, `RECRUITER`.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `Session` model exists with `userId` foreign key to `User` and `expires` timestamp.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `Account` model exists with `userId` foreign key to `User` and `@@unique([provider, providerAccountId])` constraint.
- /forgea-monorepo/packages/schema/prisma/migrations/20260124094856_add_auth_models/migration.sql — SQL creates `Account`, `Session`, and `VerificationToken` tables with foreign keys and unique indexes for `Session.sessionToken` and `Account` provider uniqueness.

---

### WHAT IS PARTIALLY IMPLEMENTED

- /forgea-monorepo/packages/schema/prisma/schema.prisma — Role enum is present but uses `CANDIDATE` instead of `USER`; required enum values (ADMIN, USER, RECRUITER) are not fully matched.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `Session` and `Account` models exist but are named differently from `AuthSession` and `AuthIdentity`; fields and enums for explicit auth providers are not defined (provider is `String`).
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `User` lacks explicit timestamp fields (e.g., `createdAt`, `updatedAt`).

---

### WHAT IS MISSING

- `authProvider` enum with values (EMAIL, GOOGLE, GITHUB) — Not found.
- `AuthSession` model (explicitly named) — Not found.
- `AuthIdentity` model (explicitly named) — Not found.
- User timestamps (created/updated) — Not found.

---

### RISKS OR CONFLICTS

- Existing auth schema aligns with NextAuth-style `Account`/`Session` models rather than `AuthIdentity`/`AuthSession`, which may conflict with Feature B3 naming and enum requirements.
- `UserRole` enum values differ from required `ADMIN, USER, RECRUITER` (currently `CANDIDATE, ADMIN, RECRUITER`).

---

### QUESTIONS FOR CLARIFICATION

- None.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B3 — Identity & Authentication Tables (EPIC-B). Use the code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B3_Identity & Authentication Tables.md as source of truth. Produce the authoritative task document for Feature B3 under /docs/tasks/ following the required task document structure. Base requirements on EPIC-B tasks 11–22 and the existing Prisma schema: `User`, `Account`, `Session`, `VerificationToken`, enums, and constraints. Do not write code. Focus on reconciling required models/enums (AuthSession/AuthIdentity/authProvider/UserRole values) with what exists, and enumerate specific tasks needed to reach compliance.
