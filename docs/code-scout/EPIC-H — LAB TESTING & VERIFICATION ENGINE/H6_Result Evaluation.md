# FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: FEATURE H6 — Result Evaluation
- Source: Agent Orchestrator output: [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md)


### TASKS CHECKED
(List of tasks from EPIC-H that belong to this feature)

- Map exit codes to PASS / FAIL / ERROR
- Enforce deterministic result mapping
- Reject ambiguous outcomes
- Mark job final state immutably


### WHAT ALREADY EXISTS
(Factual, read-only references to repository files observed)

- [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md) — Orchestrator analysis, required agents, and execution plan for H6.
- [docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md](docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md) — EPIC-H master task list referencing result-evaluation requirements (FEATURE H6 items 30–33).
- [docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md](docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md) — Gatekeeper notes include exit-code examples and reference to a canonical CLI wrapper (`scripts/verify-lab.sh` or `bin/verify-lab.js`).
- [docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md](docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md) — Code-scout notes identify that a canonical exit-code → normalized-result mapping document is expected but not present.
- Repository services: `forgea-monorepo/services/verification-runner` exists as a directory but contains only `.gitkeep` (no implemented runner or mapping logic observed).


### WHAT IS PARTIALLY IMPLEMENTED

- Documentation fragments exist that discuss exit codes and a canonical CLI wrapper, but they stop short of an authoritative numeric-to-category mapping and ambiguity rules required by H6.
- Gatekeeper and orchestrator files state expectations (deterministic mapping, immutability), but no implementation or policy artifact that enforces these rules is present in code or schema.


### WHAT IS MISSING
(Explicit, observed gaps blocking H6 implementation)

- A canonical, repository-wide numeric exit-code → normalized-result mapping document (PASS/FAIL/ERROR/INFRA-ERROR) — not found.
- Implementation of mapping logic in a runner or verification service (`verification-runner`) — not found.
- Enforcement mechanism to mark job final state immutably in the DB or persistence layer (no `VerificationJob` model present to record final state; see H1 report).
- Ambiguity resolution rules for non-standard exits, signals (SIGKILL, SIGTERM), and wrapper vs test process exit codes.
- Structured, audit-ready event emission for final result (no event contract or implementation found).


### RISKS OR CONFLICTS
(Only based on observed code and docs)

- Without a canonical numeric mapping, different implementers may interpret exit codes inconsistently, risking false PASS/FAIL decisions and violating EPIC-H invariants.
- Absence of handling for termination signals and runtime crashes opens avenues for exit-code spoofing or ambiguous states that could be exploited to mark infra errors as PASS or vice versa.
- No immutable final-state enforcement observed in schema or services, increasing risk of race conditions or retroactive mutation of results (contradicts HARD LOCK requirement).
- The repo contains gatekeeper guidance that references a CLI wrapper; if the wrapper semantics are not enforced centrally, individual lab verification scripts could deviate and produce inconsistent exit semantics.


### QUESTIONS FOR CLARIFICATION
(None strictly required from repository truth; planner should confirm policy-level choices if needed)


### NEXT AGENT HANDOFF PROMPT (for planner-architect)

Planner-Architect (next agent): use this repository report as your authoritative input. Do not implement—draft the task document required by the Orchestrator.

Copy-paste-ready prompt for the planner-architect:

---
Planner-Architect,

Refer to the code-scout report at docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md (this file). Based on the repository truth included there, produce an authoritative, docs-linked task document that defines the deterministic result-evaluation rules required by EPIC-H. Your deliverable must include:

- A canonical numeric exit-code → normalized-result mapping table (explicit integers and category for each entry). Include handling for:
  - `0` (success)
  - Non-zero, well-known test-run failure conventions
  - Signals (e.g., SIGKILL, SIGTERM)
  - Container/runtime termination vs test harness exit codes
  - A catch-all rule for unknown/non-standard exits (must be classified as ERROR or INFRA-ERROR with rationale)
- Precise ambiguity rules for partial or missing outputs (stdout/stderr empty, truncated logs) and when to classify outcomes as `ERROR` vs `FAIL`.
- Requirements for the verification CLI wrapper contract (example: `scripts/verify-lab.sh` / `bin/verify-lab.js`) including required flags, output schema, and guaranteed exit-code semantics.
- The immutability policy for final job state and the DB-side invariants/events required to enforce it (reference H1 report for `VerificationJob` absence). Specify what must be enforced atomically at finalization time.
- A short security checklist for `security-sentinel` to review (exit-code spoofing, signal masking, race conditions during finalization, attacker-controlled inputs like commit SHA affecting mapping decisions).
- A list of concrete artifacts for implementer: where to add mapping logic (`forgea-monorepo/services/verification-runner/`), required tests (tie to H14), and the canonical docs path where the mapping will be published.

Produce the task doc as a markdown file under `docs/tasks/` following existing EPIC-H conventions. Do NOT change code or run migrations. Stop and escalate if any invariant cannot be specified from the available docs or if a hard security question remains unresolved.

---

Handoff complete. Provide this report verbatim to the next agent.