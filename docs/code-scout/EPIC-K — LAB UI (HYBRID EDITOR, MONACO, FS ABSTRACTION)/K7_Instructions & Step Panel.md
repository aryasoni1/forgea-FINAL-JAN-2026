FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K7 — Instructions & Step Panel
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md (Agent Orchestrator output)


TASKS CHECKED

- Identify where step instructions are stored and which artifacts/APIs provide instruction content (Orchestrator Step 1 for K7).


WHAT ALREADY EXISTS

- Documentation references (intents and requirements):
  - docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md — canonical gatekeeper brief referencing `.forgea/steps.json`, `steps.json` schema, mapping rules, and step persistence contract.
  - docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md — design brief for step metadata and file-binding semantics.
  - docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md — instructions authoring QA criteria.
  - docs/official-docs-registry.md — registry entries referencing canonical validation for `.forgea/steps.json` and step artifacts.
  - docs/tasks/master_tasks_V1/EPIC-F — GITHUB INTEGRATION FOR LABS.md — lists loader task: "Load step definitions from `.forgea/steps.json`."

- UI components (lesson/lab surfaces) that are likely consumers of instruction content:
  - forgea-monorepo/apps/forgea-lessons/components/lesson-renderer.tsx — lesson rendering surface.
  - forgea-monorepo/apps/forgea-lessons/components/lesson-sidebar.tsx — sidebar where instructions/TOC may appear.
  - forgea-monorepo/apps/forgea-lessons/components/lab-session-button.tsx — entry point for initializing labs; integrates with lab flows.

- Template / repo conventions referenced as instruction sources:
  - Lab template artifacts (referenced in docs): README.md (student instructions), `tests/` (verification), `forgea.config.json` (lab metadata), and `.forgea/` (runtime metadata and step artifacts).

- Verification & QA docs that reference instruction artifacts and acceptance criteria:
  - docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md — links step definitions to verification mapping needs.
  - docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md — checklist for instruction clarity and step solvability.


WHAT IS PARTIALLY IMPLEMENTED

- Authoring intent and design are documented across multiple EPICs (EPIC-F, EPIC-E, EPIC-H, EPIC-K), including requirements for a machine-readable `.forgea/steps.json` schema and step-to-verification mapping.
- UI consumers exist (lesson renderer, sidebar, lab flows), but their concrete integration points for step/step-panel data retrieval are not consistently specified in code or docs.


WHAT IS MISSING

- Canonical machine-readable `.forgea/steps.json` schema file (e.g., `steps.schema.json`): referenced in docs but not present in the repository.
- A documented, repository-hosted loader/service or API that returns step/instruction payloads for the UI (no authoritative `GET /api/lessons/:id/instructions` or equivalent found).
- A dedicated `StepPanel` UI component or a clearly identified step-panel implementation in the source tree (no `StepPanel` component found; existing components appear to be general lesson/lab surfaces).
- Step-to-verification mapping artifact (JSON or service contract linking step IDs to verification checks) — referenced but not found.
- Authoring guide machine artifacts (examples, JSON Schema, CLI validator) that implement the authoring rules in the gatekeeper docs.


RISKS OR CONFLICTS

- Divergence risk: Multiple documents reference `.forgea/steps.json` semantics without a single canonical schema — this will likely cause drift between authors, CI validators, and UI behavior.
- UX fragmentation: UI components exist but lack a documented API contract for instruction/step payloads; implementers may implement inconsistent fetch patterns (server-side vs client-side), risking edge-safety or performance issues.
- Blocking decisions: Without a canonical path/filename and schema for step artifacts (and a persistence contract), implementers cannot reliably implement step panels or CI-enforced blocking behaviors.


QUESTIONS FOR CLARIFICATION

- Confirm the canonical location for step artifacts inside lab repos (repo-root `.forgea/steps.json` vs per-lab path). This is required for deterministic loader behavior.
- Should instruction payloads be served by a new server API (e.g., `/api/labs/:labId/steps`) or loaded from the repo at runtime by client components? (Planner decision; scout only reports absence of an API.)


NEXT AGENT HANDOFF PROMPT (for planner-architect)

Planner-architect — consume this code-scout report at docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md and the Orchestrator output `docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md`.

Produce an approval-gated task document at `/docs/tasks/task-K7-<YYYY-MM-DD>.md` that, using only the factual gaps identified in this report, specifies:
- Exact artifact names and canonical locations to author and publish (e.g., `.forgea/steps.json` filename and repository path, `steps.schema.json` location in `docs/official-docs/EPIC-F/`).
- The machine-readable JSON Schema for `.forgea/steps.json` (or an explicit requirement to publish it as part of the task) and examples for common step types.
- The server-side API contract required by UI implementers (request path, payload shape, auth rules, caching expectations) to return instruction/step payloads to the UI.
- Acceptance criteria and gating: stakeholder approvals required for the canonical path/schema decision, tests that validate schema + example labs, UI acceptance tests for the `StepPanel` contract, and documentation publishing steps to `docs/official-docs/EPIC-F/` and `docs/official-docs-registry.md`.

Do NOT implement code. Only author the planner task document with clear acceptance gates, file names/paths to create, the API contract to implement, and explicit stakeholder sign-off points for the BLOCKERS identified above.


---

Report generated by `forgea-code-scout`: scanned repository docs and source for instruction sources, `.forgea` artifacts, and UI components consuming instructions. Findings are factual and limited to repository contents.
