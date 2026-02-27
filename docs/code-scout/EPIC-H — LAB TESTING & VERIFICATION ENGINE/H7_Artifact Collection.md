FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H7 — Artifact Collection
- Source: docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md

### TASKS CHECKED

- Step 1: Planner-Architect defines artifact contract (log capture, size limits, truncation semantics, diff/report collection rules).
- Step 2: Security-Sentinel reviews for sensitive data leakage and redaction/obfuscation rules.
- Step 3: Implementer implements collectors, truncation, hashing, and stores artifact metadata immutably.
- Step 4: Documenter-Historian publishes artifact retrieval and retention docs.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md — Contains the feature analysis, required agents (planner-architect, implementer, security-sentinel, documenter-historian), execution plan (Steps 1–4), risk classification (High), HARD LOCK annotation, and orchestrator improvement notes recommending an artifact-metadata JSON schema and a hashing/signing utility.

### WHAT IS PARTIALLY IMPLEMENTED

- Not found — The orchestrator output documents roles and an execution plan but does not include any implementation artifacts, schemas, migration scripts, or partial code for artifact collection or storage.

### WHAT IS MISSING

- A formal "Artifact Contract" describing artifact types to capture, retention/TTL rules, truncation semantics, and acceptable diff/reporting policies.
- A reusable artifact-metadata JSON schema for artifact records.
- Collector implementations or adapters for capturing logs, reports, and diffs.
- Safe truncation utilities and rules (what to truncate, how to mark truncated artifacts) and proofs that truncation preserves auditable integrity.
- Hashing/signing utility or guidance (immutable metadata, integrity verification) and storage requirements for hashes.
- Security redaction/obfuscation rules and validators to prevent secret leakage in artifacts.
- Immutable metadata storage/migration tasks and operational retrieval guidance.
- Documented retention and legal/forensic compliance notes.

### RISKS OR CONFLICTS

- High risk: Feature marked High risk and touches HARD LOCK — changes may block releases.
- Sensitive-data leakage: Without redaction guidance and validators, artifact capture may expose secrets or PII.
- Evidence integrity risk: Truncation without clear rules and hashing/signing may undermine forensic utility.

### QUESTIONS FOR CLARIFICATION

- Not required / none.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Reference: This report (docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md) and the original orchestrator output at docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md

You are the planner-architect. Based strictly on the facts in this report and the orchestrator output, produce the following artifacts (do not implement code):

- A single "Artifact Contract" document that specifies:
  - Artifact types to capture (logs, runner outputs, diffs, reports)
  - Retention and TTL rules per artifact type
  - Truncation semantics and how truncated artifacts are marked
  - Integrity requirements: hashing/signing guidance and where hashes are stored
  - Metadata schema (artifact-metadata JSON schema) including required fields for indexing and audit
  - Redaction/obfuscation requirements and rules for secrets/PII

- A prioritized task breakdown for the implementer, security-sentinel, and documenter-historian listing deliverables:
  - Artifact-metadata JSON schema file and example records
  - Collector adapter interfaces and persistence tasks (high-level API surface)
  - Truncation utility spec and validation checks
  - Hashing/signing utility spec and where to store/verifiy hashes
  - Security review checklist to validate no secrets leak and truncation safety
  - Documentation tasks for retrieval, retention, and legal/compliance notes

- Operational notes outline required for migration, monitoring, and audits (high-level bullets only).

Constraints: Do not write implementation code or propose specific library implementations. Reference only the facts recorded in this report and the orchestrator output. Deliverables should be precise and actionable so implementers can proceed without major redesigns.

Place your artifacts under `docs/tasks` or `docs/specs` and reference this code-scout report in the header.
