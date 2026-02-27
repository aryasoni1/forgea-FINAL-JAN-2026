# FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: FEATURE K6 — Step-Based Editing Rules
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md


### TASKS CHECKED

- 37: Load current active step
- 38: Restrict editable files to current step scope
- 39: Lock files belonging to future steps
- 40: Visually indicate locked future-step files
- 41: Update UI when step changes


### WHAT ALREADY EXISTS

- /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md — Orchestrator feature brief requiring `forgea-code-scout` inventory (this file).
- /docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md — Epic task list that enumerates FEATURE K6 items (lines 37–41).
- /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md — Gatekeeper doc referencing a canonical `.forgea/steps.json` schema and step-mapping expectations (referenced by multiple epics).
- /docs/official-docs-registry.md — Registry entries referencing canonical validation for `.forgea/steps.json` and `StepMetadata`/`LabConfig` artifacts used across EPICs.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — Current Prisma schema for the system (contains `Lab`, `LabSession`, `VerificationLog`, etc.).


### WHAT IS PARTIALLY IMPLEMENTED

- Documentation coverage: Multiple docs reference `.forgea/steps.json`, `StepMetadata`, and step-based UX expectations (EPIC-F, EPIC-E, EPIC-H, EPIC-K, EPIC-L). These specify the need and intent but do not include machine-readable schema files or definitive mapping artifacts in the repository.


### WHAT IS MISSING (explicitly not found in repository)

- Canonical `.forgea/steps.json` machine-readable schema (JSON Schema or equivalent) — no `steps.schema.json` or equivalent found.
- Any database model or Prisma schema for per-step persistence (no `StepVerification`, `VerificationStep`, `LabAttempt` or equivalent model in `packages/schema/prisma/schema.prisma`).
- Backend API surface to: (a) load the current active step for a `LabSession`, and (b) persist/mark step completion state per session/commit SHA — no service endpoints or loader implementations discovered.
- Frontend implementation artifacts (apps/lab-ui/** or packages/virtual-fs/**) implementing step-scoped edit enforcement or future-step locking — the expected owners (`apps/lab-ui`, `packages/virtual-fs`) are listed in epic metadata but corresponding source trees or implementations are not present in the repository.
- Step-to-verification mapping document / service that links step names (from `.forgea/steps.json`) to verification check IDs or CI jobs — referenced in docs but not present.
- Event contract or notification channel for step-change notifications (orchestrator suggested this improvement; repository contains no event contract file).


### RISKS OR CONFLICTS (observed from repository state)

- Missing persistence model for per-step state increases risk of race conditions and inability to enforce ordering/atomicity at the system boundary (noted across EPIC-H and related docs).
- Divergence risk: multiple docs reference `.forgea/steps.json` but without a single canonical schema in the repo, implementations (when added) may drift across services and UI.
- Ownership ambiguity: epic metadata names `apps/lab-ui` and `packages/virtual-fs` as owners, but those code areas are absent; this blocks implementation and makes responsibility unclear.


### QUESTIONS FOR CLARIFICATION

- None strictly required to proceed to Planner; the report documents explicit gaps. (If Planner needs different scope, ask orchestrator.)


### NEXT AGENT HANDOFF PROMPT (FOR planner-architect)

You are `planner-architect` and will produce the task document `/docs/tasks/task-K6-<YYYY-MM-DD>.md` that defines the runtime invariants, access rules, locking semantics, and UI update signals required for FEATURE K6 — Step-Based Editing Rules.

Use this code-scout report as the authoritative source of repository truth: /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md

Deliverables required from you (do not implement; specify requirements only):

- Define the canonical location and machine-readable schema for `.forgea/steps.json` (schema filename and validation expectations).
- Specify the persistence contract for per-step state (decide whether to extend `LabSession`, add `LabAttempt`, or a dedicated `StepVerification` model). Include required fields, types, nullability, uniqueness constraints (e.g., one verification attempt per `commitSha` + `stepName`), indexes, and FK relations. Reference this code-scout report when noting the current `schema.prisma` file lacks such a model.
- Define backend API contracts required by the UI: endpoints to fetch current active step for a session, to list step-scoped editable file globs for the active step, and to persist/mark step completion. For each endpoint, include input/output shapes, auth requirements, and error semantics.
- Specify UI-side signals and behaviors: how the frontend will receive/update active-step changes (polling vs event), the visible UI states (editable, locked-future, locked-past), and explicit UX messages for blocked edits. Reference the absence of `apps/lab-ui` and `packages/virtual-fs` implementation in this repo.
- State retention and retention-policy guidance for step-state records and audit logs (how long to keep per-step records, forensics needs).
- Provide a concise list of required artifacts that implementers will need (canonical schema file path, Prisma model addition with suggested file reference, API route signatures and example responses, frontend contract hooks and event names).

Do not propose code-level solutions or change repository files. Use only factual findings from this code-scout report when drafting the task doc. Keep outputs prescriptive but implementation-agnostic.


Handoff complete. Provide this report verbatim to the next agent.
