# FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: FEATURE H1 — Verification Job Model
- Source: Agent Orchestrator output: [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md)


### TASKS CHECKED
(List of tasks from EPIC-H that belong to this feature)

- Define VerificationJob schema
- Link VerificationJob to LabAttempt
- Store commit SHA (immutable)
- Store lab version reference
- Store job status (QUEUED, RUNNING, PASSED, FAILED, ERROR)
- Store created and completed timestamps
- Enforce one job per commit SHA


### WHAT ALREADY EXISTS
(Factual, read-only references to repository files observed)

- [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md) — Agent Orchestrator feature analysis, required agents, and execution plan for H1.
- [docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md](docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md) — EPIC-H master task list; H1 tasks enumerated (items 1–7).
- [docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md](docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md) — Gatekeeper notes referencing VerificationJob schema essentials and integration checklist.
- [docs/official-docs-registry.md](docs/official-docs-registry.md) — Registry entries mentioning where `VerificationJob` should be added (packages/schema/prisma/schema.prisma) and high-level contract guidance.
- [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma) — Current Prisma schema: contains `VerificationLog` and `VerificationToken`, `LabSession`, `Lab`, and other models; no `VerificationJob` or `LabAttempt` models found.


### WHAT IS PARTIALLY IMPLEMENTED

- `VerificationLog` model exists in `packages/schema/prisma/schema.prisma` (immutable record per session) but is not the same as a queued `VerificationJob` record. The existing `VerificationLog` has `sessionId` uniqueness and stores an immutable verification snapshot; it does NOT satisfy the H1 requirement to persist queued/run state and enforce uniqueness by commit SHA.
- Documentation references (docs-gatekeeper and official-docs-registry) include VerificationJob contract guidance and where to add the model, but no concrete Prisma model or migration is present in the schema package.


### WHAT IS MISSING
(Explicit, observed gaps blocking H1 implementation)

- Prisma model `VerificationJob` in `forgea-monorepo/packages/schema/prisma/schema.prisma` (not found).
- `LabAttempt` model or equivalent ledger for attempts (not found in Prisma schema).
- DB migration files and rollbacks to add `VerificationJob` and `LabAttempt` models (no migrations for these models observed).
- Enforcement of "one job per commit SHA" via DB uniqueness constraint or transactional enqueue pattern (not implemented in schema).
- Linkage contract and FK fields connecting `VerificationJob` to a `LabAttempt` or `LabSession` (missing).


### RISKS OR CONFLICTS
(Only based on observed code and docs)

- `VerificationLog` currently has a unique constraint on `sessionId`, implying one immutable verification record per session; H1 requires one job per commit SHA which is a different uniqueness axis (commit SHA vs session). Without a `LabAttempt` ledger and a `VerificationJob` model, enforcing the commit-SHA uniqueness and correct deduplication semantics is not possible.
- Docs reference where the model should live (`packages/schema/prisma/schema.prisma`) but the absence of model + migration creates a potential drift between docs and code if not reconciled atomically.
- H1 is marked HIGH RISK and TOUCHES HARD LOCK (truth engine); missing the schema and invariant enforcement is a blocker for downstream implementer and security review steps.


### QUESTIONS FOR CLARIFICATION
(None strictly required from repository truth; planner should confirm policy-level choices if needed)


### NEXT AGENT HANDOFF PROMPT (for planner-architect)

Planner-Architect (next agent): use this repository report as your authoritative input. Do not implement—draft the task document required by the Agent Orchestrator.

Copy-paste-ready prompt for the planner-architect:

---
Planner-Architect,

Refer to the code-scout report at docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md (this file). Based on the repository truth included there, please produce the authoritative, docs-linked task document required by the Orchestrator. Your deliverable must include:

- A precise Prisma `VerificationJob` model contract (fields, types, nullable, indexes) and where to add it (`forgea-monorepo/packages/schema/prisma/schema.prisma`).
- A `LabAttempt` ledger contract (or clear mapping to existing `LabSession`/`VerificationLog` if intentional), including idempotency keys and retention guidance.
- Exact DB invariants and constraints required to enforce: "one job per commit SHA" (specify uniqueness constraints and transactional patterns required for safe enqueue), immutability of completed jobs, and append-only artifact storage semantics.
- A migration plan (up/down considerations), including required index changes and any backfill/compatibility steps if adding models impacts existing `VerificationLog` semantics.
- A short security checklist for `security-sentinel` to review (race conditions, transactional enqueue, idempotency key derivation, and attacker-controlled fields like commit SHA).
- References to existing docs and files observed: [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md), [docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md](docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md), [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma), and relevant gatekeeper notes in [docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md](docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md).

Produce the task doc as a markdown file under `docs/tasks/` following existing EPIC-H conventions. Do NOT change code or run migrations. Stop and escalate if any of the invariants cannot be specified from the available docs.

---

Handoff complete. Provide this report verbatim to the next agent.