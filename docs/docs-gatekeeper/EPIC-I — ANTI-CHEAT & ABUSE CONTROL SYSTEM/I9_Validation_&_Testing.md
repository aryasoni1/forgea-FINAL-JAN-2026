### FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I9 Validation & Testing
- Exact input files read:
  - /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9_Validation*&\_Testing.md
  - /docs/tasks/master_tasks_V1/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM.md
  - /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9*Validation*&\_Testing.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema

- Concept: Machine-readable schema for test payloads, verification intake, and test-matrix artifacts
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12
- Why required: Defines a canonical, versioned schema for producing and validating test vectors and verification intake payloads used by QA and verification tooling.
- Decision it informs: Schema compatibility, ingestion validation, and CI acceptance tests.
- What breaks without it: Non-deterministic test payload interpretation, incompatible runner inputs, and flaky CI validation.

2. Technology: POSIX process exit semantics

- Concept: Canonical interpretation of exit codes and signal termination for verification runners
- Official source: https://pubs.opengroup.org/onlinepubs/9699919799/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Needed to deterministically map runner outcomes to PASS/FAIL/INFRA-ERROR in validation scenarios.
- Decision it informs: Classification of verification results and acceptable failure modes.
- What breaks without it: Misclassification of infra vs test failures and inconsistent enforcement triggers.

3. Technology: Git reference manual

- Concept: Authoritative git behavior (commit, push, reflog, SHA semantics) used to craft realistic commit/flooding/diff-reuse scenarios
- Official source: https://git-scm.com/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Simulations rely on precise Git semantics (SHA reuse, force-push, reflog visibility) to be realistic and reproducible.
- Decision it informs: Test harness design, fixture capture, and expected repository state transitions.
- What breaks without it: Tests may miss edgecases or produce non-representative artifacts.

4. Technology: OpenTelemetry (Tracing)

- Concept: Standard tracing format and propagation used to correlate validation runs and signals across services
- Official source: https://opentelemetry.io/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Correlating signals, QA runs, and enforcement actions across microservices requires a pinned tracing contract.
- Decision it informs: Telemetry fields included in audit and test artifacts.
- What breaks without it: Loss of traceability between test scenarios and observed signals in production-like runs.

5. Technology: Test-runner / language runner conventions (pytest / JUnit / mocha)

- Concept: Runner-specific exit code semantics and output formats used by verification harnesses
- Official sources: Runner docs (e.g., https://docs.pytest.org/, https://junit.org/)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER-RUNNER BEFORE IMPLEMENTATION
- Why required: Tasks require mapping runner behavior to canonical verification results and designing harness adapters.
- Decision it informs: How CI harness interprets runner failures vs infra issues.
- What breaks without it: Flaky CI, inconsistent PASS/FAIL mapping, mis-triggered enforcement.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9_Validation*&\_Testing.md
  - Coverage status: PARTIAL
  - Gaps: Provides analysis and execution plan but does not include the required planner-approved task doc, mapping scenarios→signals, or test matrix artifacts.

- /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9*Validation*&\_Testing.md
  - Coverage status: PARTIAL
  - Gaps: Code-Scout identifies missing artifacts and hands off to Planner-Architect but does not supply test vectors or harness specs.

- /docs/tasks/master_tasks_V1/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM.md
  - Coverage status: PARTIAL
  - Gaps: Epic-level scope and feature list present, but lacks the approved task doc and the explicit scenario→signal mapping required for safe execution.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9_Validation_&_Testing.md` — add the approved task doc path and final test-matrix reference.
- `/docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9_Validation_&_Testing.md` — update `WHAT IS MISSING` to reference the new planner task doc and QA result artifacts.
- `/docs/tasks/master_tasks_V1/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM.md` — add a note linking the planner-approved task doc and validation acceptance criteria.

### STUDY GUIDE FOR HUMAN

- **JSON Schema**: Why — ensures machine-validated test vectors; Alternatives — ad-hoc schemas (avoid); When NOT to use — for transient internal-only payloads; Common mistakes — unpinned spec and permissive schemas that allow incompatible inputs.
- **POSIX exit semantics**: Why — deterministic classification of runner outcomes; Alternatives — runner-specific heuristics (less reliable); When NOT to use — Windows-only runner scenarios without POSIX mapping; Common mistakes — treating non-zero exit as ALWAYS test-failure (ignores signals/oom).
- **Git reference**: Why — realistic commit/force-push/diff scenarios; Alternatives — mocked VCS behaviors (useful for unit tests but not for system validation); When NOT to use — tiny unit tests where Git state is unnecessary; Common mistakes — assuming SHA reuse is impossible or not simulating reflog/force-push properly.
- **OpenTelemetry**: Why — traceability across services for test runs and signals; Alternatives — ad-hoc correlation ids (fragile); When NOT to use — isolated unit tests; Common mistakes — missing required attributes or unpinned propagation format.
- **Test-runner conventions**: Why — map runner outputs to canonical PASS/FAIL; Alternatives — custom wrappers for each runner (required if unpinned); When NOT to use — when a single runner is used and pinned; Common mistakes — not documenting the runner version and exit-code mapping.

### INTERNAL DOCS TO ADD OR EXTEND

Only include these additions if coverage is PARTIAL (required here):

1. Path: /docs/official-docs/EPIC-I/I9_test_matrix_and_task.md

- Purpose: Planner-Architect approved task doc containing the complete test matrix, explicit mapping from each scenario → validated signal, success criteria, and required fixtures.
- Exact knowledge to add: Full test matrix table, scenario descriptions, expected signal(s), severity, acceptance thresholds, and artifact naming conventions.
- Required version pin: N/A (internal planner doc) — reference pinned external specs where required (JSON Schema 2020-12, POSIX pin).

2. Path: /docs/official-docs/EPIC-I/I9_test_harness_requirements.md

- Purpose: Implementer-facing harness contract describing required hooks, endpoints, fixtures, and deterministic-run commands.
- Exact knowledge to add: HTTP test endpoints, reproducible repo fixtures, `forgea-test-runner` CLI contract, expected telemetry fields, and idempotency keys for reruns.
- Required version pin: Pin runner adapters and tracing libs used (e.g., OpenTelemetry package version).

3. Path: /docs/official-docs/EPIC-I/I9_signal_registry.md

- Purpose: Canonical registry of signals, types, severity, and enforcement mapping used by QA to map scenarios to signals.
- Exact knowledge to add: Signal id, description, detection rule, severity, enforcement action, and example artifact payload (JSON Schema reference).
- Required version pin: Reference JSON Schema (2020-12) for payload examples.

### OPEN QUESTIONS / AMBIGUITIES

- Which exact set of signals (ids) are authoritative for validation (planner must confirm canonical `signal_id` list)?
- Which runners and versions should QA use as canonical (pytest, junit, node)? Pinning required.
- Which execution environments (container runtime / OS images) must be used for reproducible tests?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-I / I9 — Validation & Testing
  - Doc path: /docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I9*Validation*&\_Testing.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief identifying required official docs, internal doc gaps, and required planner task doc for validation and testing.
