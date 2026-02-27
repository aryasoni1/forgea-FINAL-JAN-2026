### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H5 — Verification Execution
- Source: docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md


### TASKS CHECKED

- Planner-Architect: draft execution contract for capture and result mapping
- Security-Sentinel: review governance for tamper resistance and error classification
- Implementer: build execution harness inside runner sandbox and instrument capture
- Integration-Checker: validate persistence and Verification API (H10) exposure


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md — Contains the feature analysis, required agents, an execution plan (four-step), and orchestrator improvement notes. The file specifies high risk and that the feature touches HARD LOCK.


### WHAT IS PARTIALLY IMPLEMENTED

- Execution planning: A high-level execution plan and required-agent list exist in the orchestrator output, but it is an outline rather than a formal contract.
- Orchestrator notes identify needs (canonical exit-code mapping, artifact-hashing helper), but these artifacts are not present in the repository.


### WHAT IS MISSING

- Canonical exit-code → normalized-result mapping document (explicit mapping of numeric exit codes and signals into PASS / FAIL / ERROR / INFRA-ERROR categories).
- Formal execution contract specifying: command invocation format, stdout/stderr capture rules, truncation policy, encoding, artifact hashing algorithm, expected metadata, and storage schema.
- Implemented execution harness inside the sandbox that captures stdout/stderr, exit code, duration, and crash signals (no runtime harness found in repo based on orchestrator output).
- Security validation artifacts or threat model showing tamper-resistance controls and detection boundaries.
- Integration test definitions and Verification API (H10) interface specs/examples proving persistence and surfacing of results.
- Artifact-hashing helper or standard (algorithm, canonical serialization) referenced by orchestrator notes.


### RISKS OR CONFLICTS

- Risk Level: High (as documented in orchestrator output).
- Touches HARD LOCK: Yes (as documented). This raises change control and deployment constraints.
- Ambiguity risk: absence of a canonical exit-code mapping risks inconsistent PASS/FAIL classification across implementers and infra.
- Integrity risk: no artifact-hashing standard nor tamper-resistance design present, increasing risk that results could be forged or misclassified.


### QUESTIONS FOR CLARIFICATION

- None strictly required to proceed with the next agent (planner-architect). The orchestrator output defines the next role and high-level tasks.


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Context: Use this code-scout report plus the orchestrator output located at [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H5_Verification Execution.md) as the source of truth for scope and constraints.

Deliverable (what to produce):
- A formal execution contract document that defines, at minimum:
  - The exact command invocation surface and accepted runtime environments.
  - Precise stdout and stderr capture semantics (encoding, line delimiting, binary vs text handling).
  - Truncation policy for long outputs and rules for artifact retention.
  - Exit-code and signal mapping into normalized result categories (explicit canonical mapping table for numeric exit codes and POSIX signals → PASS / FAIL / ERROR / INFRA-ERROR, including examples).
  - Duration measurement spec (start/stop semantics, wall-clock vs CPU time) and acceptable clock sources.
  - Crash detection rules (signals, non-zero exit behaviors, timeouts) and how they map to result categories.
  - Required metadata to store with each execution result (hashes, timestamps, runtime env, command args, PID, runner id).
  - The expected artifact-hashing algorithm(s) and canonical serialization format for hashing outputs/artifacts.
  - Output JSON schema (or similar) that the implementer and integration-checker must produce/consume for persistence and API exposure.
  - Export format and API contract points that the Integration-Checker will validate against Verification API (H10).

Constraints & notes:
- This feature is HIGH RISK and touches HARD LOCK; the contract must explicitly call out change-control expectations and any approvals required before altering the contract.
- Security-Sentinel will perform a follow-up review focused on tamper resistance; do not make security guarantees in this contract — instead enumerate observable signals and the minimal trust assumptions.
- Keep the deliverable implementation-agnostic (contract/spec only). Do not implement the harness in this step.

Acceptance criteria for the planner-architect deliverable (what the next agents will expect):
- A single canonical document (markdown) in the repo or specified docs location containing the full contract and the canonical exit-code mapping table.
- A clear list of artifacts the implementer will produce and the JSON schema for recorded results.
- A short checklist of items the Security-Sentinel must validate (tamper signals, hashing, failure modes) and the Integration-Checker must validate (storage schema, API fields).

Reference: this report and the orchestrator output file above.

