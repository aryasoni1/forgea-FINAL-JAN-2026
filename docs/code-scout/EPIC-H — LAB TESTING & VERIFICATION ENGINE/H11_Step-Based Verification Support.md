# FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: FEATURE H11 — Step-Based Verification Support
- Source: Agent Orchestrator output: [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md)


### TASKS CHECKED
(List only tasks from the EPIC file that belong to this feature)

- Map verification checks to lab steps
- Enforce sequential step completion
- Reject out-of-order step verification
- Persist step-level verification state


### WHAT ALREADY EXISTS
- [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md) — Orchestrator feature analysis and required agents for H11 (planner-architect, implementer, integration-checker, security-sentinel).
- [docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md](docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md) — EPIC-H master task list enumerating FEATURE H11 (items 52–55).
- [docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md](docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md) — Gatekeeper doc for step-based lab support referenced by multiple epics; references a `.forgea/steps.json` schema and step-based design artifacts used by F10.
- [docs/official-docs-registry.md](docs/official-docs-registry.md) — Registry includes entries for Step-Based Lab Design and references to canonical validation for `.forgea/steps.json` used by step-based features.


### WHAT IS PARTIALLY IMPLEMENTED
- Documentation and design artifacts: there are multiple docs referencing step-based lab design, `.forgea/steps.json`, and step-related UI/UX requirements across EPICs (EPIC-F, EPIC-E, EPIC-K, EPIC-L). These provide guidance but do not define the verification-specific step-to-check mapping, allowed transitions, or persistence contract required by H11.


### WHAT IS MISSING
- No database model or Prisma schema for step-level verification state was found (no `VerificationStep`, `StepVerification`, or `LabStep` model in `forgea-monorepo/packages/schema/prisma/schema.prisma`).
- No `LabAttempt` ledger or explicit attempt model to anchor per-attempt, per-step verification state (referenced by several docs but absent from schema).
- No service implementation or API surface for step-level verification persistence in `forgea-monorepo/services/verification-runner` (directory present but empty) or `api` surfaces.
- No canonical mapping document that defines: how verification checks map to named lab steps, ordering rules, allowed state transitions, and the API shapes for marking a step verified or rejected.
- No integration tests or task artifacts that validate step-level enforcement behavior (H14 lists testing but artifacts absent).


### RISKS OR CONFLICTS
- Without a persistent, authoritative step-state model, enforcing sequential completion and rejecting out-of-order verification is not enforceable at the system boundary — this can be abused to bypass required verification for later steps.
- Multiple docs reference `.forgea/steps.json` and step-based UI behavior; divergence between the step-definition format and a yet-undefined verification mapping could create drift and inconsistent behavior across Runner, API, and UI implementations.
- H11 touches HARD LOCK invariants (ordering and enforcement). Missing atomic persistence and transactional guarantees for step-state increases risk of race conditions and attacker-driven state manipulation.


### QUESTIONS FOR CLARIFICATION
- None strictly required from repository truth; the Planner should confirm whether `LabStep` state should be stored on `LabSession`, `LabAttempt`, or a dedicated `VerificationStep` table.


### NEXT AGENT HANDOFF PROMPT (for planner-architect)

Planner-Architect (next agent): use this repository report at docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md as the authoritative input. Do not implement—draft the task document required by the Orchestrator.

Copy-paste-ready prompt for the planner-architect:

---
Planner-Architect,

Refer to the code-scout report at docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md (this file). Based on the repository truth included there, produce the authoritative, docs-linked task document that defines step-based verification behavior required by EPIC-H.

Your deliverable must include:

- A precise mapping format that links named lab steps (as defined in `.forgea/steps.json`) to verification checks (IDs/names), including a sample JSON mapping.
- A state-machine for step-level verification states (e.g., READY, QUEUED, RUNNING, VERIFIED, FAILED, BLOCKED) with allowed transitions and reasons for each transition.
- The persistence contract: whether step-state lives on `LabSession`, a new `LabAttempt` ledger, or a dedicated `VerificationStep`/`StepVerification` Prisma model, with exact field definitions (types, nullability, indexes, FK relations) and suggested uniqueness constraints to enforce "one verification attempt per step per commit SHA".
- API surface and example endpoints for: marking a step verification request, reporting step result, querying step-level state, and rejecting out-of-order attempts. Include required authorizations and idempotency keys.
- Transactional patterns and invariants to avoid race conditions (e.g., enqueue-first, transactional upsert with uniqueness index, or advisory locks) and a short checklist for `security-sentinel` to review.
- Integration points with runner: where the runner will read the mapping, how it reports per-step artifacts, and the artifact metadata contract (hashing, retention, and append-only rules).
- References to observed docs and files: [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md), [docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md](docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md), [docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md](docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md), and the `packages/schema/prisma/schema.prisma` location for where models should be added.

Produce the task doc as a markdown file under `docs/tasks/` following EPIC-H conventions. Do NOT change code or run migrations. Stop and escalate if any invariant cannot be specified from the available docs.

---

Handoff complete. Provide this report verbatim to the next agent.