### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H5 — Verification Execution
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md


### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: POSIX process model & signals
- Concept: Exit codes and signal semantics (numeric exit codes, signal names, default behavior on uncaught signals)
- Official source: https://pubs.opengroup.org/onlinepubs/9699919799/
- Exact version requirement: POSIX.1-2017
- Why required: Defines canonical mapping of process termination semantics used to classify PASS/FAIL/ERROR/INFRA-ERROR.
- What decision it informs: How non-zero exits and signals are interpreted by the verification runner and downstream consumers.
- What breaks without it: Inconsistent classification of crashes vs test failures across platforms and runtimes.

2) Technology: JSON Schema
- Concept: Schema for recorded execution result payloads and validation semantics
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12
- Why required: Ensures all implementers produce/consume the same result JSON schema.
- What decision it informs: Shape of persisted records, API contracts (H10), and validation rules.
- What breaks without it: Ingest failures, ambiguous fields, and incompatible integrations.

3) Technology: SHA-2 / SHA-256 (FIPS)
- Concept: Artifact hashing (digest algorithm and canonical byte ordering)
- Official source: https://csrc.nist.gov/publications/detail/fips/180/4
- Exact version requirement: FIPS 180-4
- Why required: Trusted, well-known digest used for provenance and tamper-evidence.
- What decision it informs: Which digest algorithm to record and accept; interoperability with signing and attestation flows.
- What breaks without it: Weak or incompatible integrity proofs; Security-Sentinel cannot reason about tamper evidence.

4) Technology: RFC 3339 (timestamps)
- Concept: Canonical timestamp format for recorded events and duration measurements
- Official source: https://datatracker.ietf.org/doc/html/rfc3339
- Exact version requirement: RFC 3339
- Why required: Unambiguous timestamping across services and audit trails.
- What decision it informs: How `started_at`, `stopped_at`, and artifact timestamps are represented and compared.
- What breaks without it: Inconsistent timezone handling and unreliable duration computations.

5) Technology: OCI Runtime / Container signal semantics
- Concept: Expected behavior of containers/OCI runtimes for forwarded signals, exit codes, and kill timeouts
- Official source: https://github.com/opencontainers/runtime-spec
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: When runners use containers, the runtime spec determines how signals are delivered and how exit codes surface.
- What decision it informs: Container timeout strategies, graceful shutdown windows, and mapping of container exit states.
- What breaks without it: Misinterpreting container termination as test failure or infra error.


### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md — COVERAGE: SUFFICIENT for high-level scope and agent list (source of truth for Planner-Architect handoff).
- /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md — COVERAGE: PARTIAL. Contains missing concrete artifacts and gaps called out (exit-code mapping, hashing helper).

Exact gaps (if not SUFFICIENT):
- No canonical exit-code → normalized-result mapping document.
- No formal execution contract covering stdout/stderr capture rules, truncation, encoding.
- No canonical artifact-hashing helper or canonical serialization rules.
- No JSON Schema for recorded execution results required by H10.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md` — convert outline into a formal contract and embed canonical mapping table.
- Create formal internal docs under `/docs/official-docs/EPIC-H/` (detailed below).


### STUDY GUIDE FOR HUMAN (required concepts)

- POSIX process model & signals: Why — defines termination semantics; Alternatives — platform-specific wrappers (Windows) with different semantics; When NOT to use — when using language VMs that abstract process model; Common mistakes — assuming exit code `1` always means same failure class.
- JSON Schema (2020-12): Why — validation and compatibility; Alternatives — ad-hoc schemas (avoid); When NOT to use — tiny ephemeral debug artifacts; Common mistakes — not including `schema_version` and incompatible optional fields.
- SHA-256 (FIPS 180-4): Why — tamper evidence and signing compatibility; Alternatives — SHA-1 (deprecated), BLAKE2 (acceptable with pinning); When NOT to use — non-security-critical debug logs; Common mistakes — hashing human-readable rendered output instead of canonical bytes.
- RFC 3339 timestamps: Why — unambiguous audit timestamps; Alternatives — epoch seconds (ok if documented); When NOT to use — internal ephemeral timing (still prefer RFC 3339); Common mistakes — mixing local time and UTC without tz tags.
- OCI Runtime semantics: Why — containerized runners rely on the spec for signal forwarding; Alternatives — non-containerized runtime contracts; When NOT to use — pure in-process harnesses; Common mistakes — ignoring SIGKILL windows and assuming SIGTERM gives immediate process exit.


### INTERNAL DOCS TO ADD OR EXTEND

Create under `/docs/official-docs/EPIC-H/`:

- `execution_contract.md`
  - Purpose: Formal execution contract describing command invocation surface, accepted runtime environments (shell, container, language runtimes), stdout/stderr capture semantics (encoding, binary/text handling), truncation policy, duration measurement, and required metadata to persist.
  - Exact knowledge to add: invocation CLI examples, environment variable expectations, truncation limits, evidence retention windows, and change-control (HARD LOCK) approval notes.
  - Required version pin: Reference POSIX.1-2017 for exit semantics; JSON Schema 2020-12 for result payload.

- `exit_code_mapping.md`
  - Purpose: Canonical exit-code & signal → normalized result mapping table (numeric exit codes, common signals, examples) mapping to `PASS` / `FAIL` / `ERROR` / `INFRA-ERROR`.
  - Exact knowledge to add: explicit table including `0 -> PASS`, `1..127 -> FAIL` (examples), signals `SIGTERM`, `SIGKILL`, `SIGSEGV` mapped to categories and example runner-reported messages.
  - Required version pin: POSIX.1-2017

- `artifact_hashing.md`
  - Purpose: Canonical artifact hashing algorithm, canonical serialization rules for artifacts (stdout, stderr, logs, files), and example helper CLI/library usage.
  - Exact knowledge to add: use `sha256` (FIPS 180-4), canonical UTF-8 encoding for text artifacts, newline normalization rules, and example code snippets for computing hashes.
  - Required version pin: FIPS 180-4

- `verification_result_schema.md`
  - Purpose: JSON Schema (2020-12) for recorded execution results, with example record, field descriptions, retention guidance, and API ingestion contract summary for H10.
  - Exact knowledge to add: full JSON Schema file, example payloads for PASS/FAIL/ERROR/INFRA-ERROR, and sample HTTP intake request/response.
  - Required version pin: JSON Schema 2020-12


### OPEN QUESTIONS / AMBIGUITIES

- Clock source: which service provides the canonical wall-clock for duration (host clock vs NTP-synced host vs metadata service). This must be pinned before finalizing duration semantics.
- Container runtime pin: which OCI/Docker runtime version will be used in CI/runner images (affects signal behavior).


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-H / H5 — Verification Execution
- Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md
- Status: ADDED (EXTEND)
- Reason: Planner-Architect deliverable — formal execution contract and canonical exit-code mapping required before implementer work.


### SECURITY & CHANGE CONTROL NOTES (HARD LOCK)

- This feature touches HARD LOCK. Any changes to `exit_code_mapping.md`, `execution_contract.md`, or `verification_result_schema.md` must be approved by HARD LOCK owners and documented in the change log in `/docs/official-docs/EPIC-H/change_control.md` before implementation.
