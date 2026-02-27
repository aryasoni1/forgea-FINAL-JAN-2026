## FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: FEATURE H6 — Result Evaluation
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/verification-runner
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md

## REQUIRED OFFICIAL DOCUMENTATION

For deterministic, auditable result evaluation the following authoritative references must be pinned before implementation.

- Technology: POSIX Exit Status & Signal Semantics
  - Concept: Process exit status conventions and signal semantics (e.g., how shells report exit codes for killed/terminated processes)
  - Official source: The Open Group Base Specifications (POSIX): https://pubs.opengroup.org/onlinepubs/9699919799/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical interpretation for exit codes, signals (SIGKILL, SIGTERM), and mapping of signal-terminated processes to numeric codes.
  - Decision it informs: How to classify signals vs normal exit codes into PASS/FAIL/ERROR/INFRA-ERROR.
  - What breaks without it: Ambiguous classification of signal-terminated runs and inconsistent cross-platform behavior.

- Technology: OCI Runtime / Container Exit Semantics
  - Concept: Container runtime exit semantics and differentiation between application exit and runtime-level failures
  - Official source: OCI Runtime Specification: https://github.com/opencontainers/runtime-spec
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Runners will likely use containers; OCI spec informs how to interpret container exit statuses, OOM, and runtime errors.
  - What breaks without it: Misclassification of container infra failures as test failures (or vice versa).

- Technology: JSON Schema (verification CLI output payload)
  - Concept: Canonical schema for verification-wrapper structured output (result payload, metadata, artifact references)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Ensures consistent machine-readable output from `verify-lab` wrapper consumed by intake services.
  - What breaks without it: Inconsistent parsing, missing fields, or insecure artifact references.

- Technology: HTTP / Idempotency & Intake Semantics
  - Concept: HTTP semantics for retries and idempotent POST/PUT semantics (RFC 7231 and idempotency patterns)
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Guides how intake endpoints should respond to retries and how to design idempotent submission of final results.
  - What breaks without it: Duplicate result ingestion and race conditions between runner and intake.

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md
  - Coverage status: SUFFICIENT
  - Notes: Orchestrator-level expectations, agents required, and execution plan for H6.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md
  - Coverage status: SUFFICIENT
  - Notes: Master task list references H6 requirements (mapping, determinism, immutability).

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing canonical mapping and runner implementation; no numeric mapping table provided.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains example exit-code discussion and wrapper references but lacks authoritative numeric mapping and wrapper contract.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/verification-runner
  - Coverage status: INSUFFICIENT
  - Exact gaps: Directory exists but no implemented runner or mapping logic; no `verify-lab` wrapper present.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md
  - Coverage status: PARTIAL
  - Exact gaps: H6 depends on `VerificationJob`/DB invariants from H1; H1 brief exists but models/migrations are missing.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Reason: High-level expectations and examples exist, but an authoritative numeric exit-code → normalized-result mapping, ambiguity rules, and a runner/wrapper contract are missing. Implementation cannot proceed safely without these docs and pinned external references (POSIX/OCI/JSON Schema).

## STUDY GUIDE FOR HUMAN

- Why mapping exists: To guarantee deterministic classification (PASS/FAIL/ERROR/INFRA-ERROR) across runners, OSes, and container runtimes.
  - Alternatives: Let implementers decide per-language mappings (dangerous — leads to inconsistency).
  - When NOT to use: Do not rely on unstructured stdout/stderr for final classification.
  - Common mistakes: Treating non-zero as always FAIL; ignoring signals/oom as INFRA-ERROR; allowing runner wrappers to swallow signals.

- Why wrapper contract exists: The wrapper (`verify-lab`) normalizes exit semantics, captures structured JSON output, and ensures signals/timeouts are reported predictably.
  - Alternatives: Individual lab scripts implementing their own conventions (leads to drift).
  - When NOT to use: Only omit wrapper when verifying extremely simple labs with guaranteed behavior.
  - Common mistakes: Not exposing a machine-readable payload; not enforcing exit-code invariants; not flushing/truncating logs safely.

- Ambiguity rules (high-level): If logs are truncated/missing or the runner is OOM/killed, classify as `ERROR` or `INFRA-ERROR` (NOT PASS). Only deliberate test harness failures map to `FAIL`.
  - Mistakes: Classifying SIGKILL as FAIL; treating missing output as PASS.

## INTERNAL DOCS TO ADD OR EXTEND

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/verification_exit_code_map.md
  - Purpose: Provide the authoritative numeric mapping table and ambiguity rules.
  - Exact knowledge to add:
    - Explicit mapping table (see recommended structure below).
    - Rules for signals, truncation, and container runtime outcomes.
    - Example decision flow for ambiguous cases.
  - Required version pin: POSIX / OCI docs as above.

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/verification_wrapper_contract.md
  - Purpose: Define the `verify-lab` wrapper API/CLI contract: flags, expected JSON output schema, exit semantics, timeout behavior, and artifact references.
  - Exact knowledge to add:
    - CLI flags: `--commit-sha`, `--session-id`, `--output-json <path>`, `--timeout-seconds`.
    - JSON output schema (versioned) with fields: `status`, `exitCode`, `signal`, `artifacts`, `logsSummary`, `durationMs`.
    - Guarantee: wrapper never returns 0 unless status == PASS.
  - Required version pin: JSON Schema 2020-12.

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/verification_finalization_invariants.md
  - Purpose: DB-side finalization invariants and atomic event emission requirements (ties to H1).
  - Exact knowledge to add:
    - Atomic finalization transaction: write final state, append immutable artifact record, emit audit event.
    - Enforcement: completed jobs immutable; finalization idempotent.

## OPEN QUESTIONS / AMBIGUITIES

- Should signals (SIGKILL/SIGTERM) be classified as `INFRA-ERROR` always, or allow `SIGTERM` graceful test harnesses to map to `FAIL`?
- Exact JSON output schema versioning and retention for logs/artifacts.
- Whether to normalize exit codes from language test runners (e.g., JUnit, pytest) or map by convention per-test-runner.

## MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md` (new):

- Epic / Feature: EPIC-H / H6 — Result Evaluation
  - Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H6_Result Evaluation.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and missing canonical exit-code mapping and runner contract.
