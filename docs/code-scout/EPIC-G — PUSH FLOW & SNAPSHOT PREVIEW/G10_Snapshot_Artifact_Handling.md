# FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G10 — Snapshot Artifact Handling
- Source: Agent Orchestrator Output: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G10_Snapshot_Artifact_Handling.md


### TASKS CHECKED

- planner-architect — Specify snapshot ID format, hashing rules, and storage policy.
- implementer — Implement artifact upload, immutability, and read-only hosting constraints.
- security-sentinel — Ensure storage permissions, hashing integrity, and prevention of backend artifact uploads.
- integration-checker — Validate storage provider compatibility and ACL requirements.
- documenter-historian — Document snapshot ID scheme and retrieval process.
- qa-tester — Optional (Planner may require retention/deletion tests).


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G10_Snapshot_Artifact_Handling.md — Orchestrator feature analysis listing required agents, execution plan, and an improvement note recommending a rollback/recovery plan.
- Cross-EPIC references discovered in repository: several existing docs reference snapshot and artifact storage semantics:
  - docs/official-docs-registry.md — Contains a “Snapshot & Artifact Storage” section describing immutable S3-like storage, write-once semantics, retrieval APIs, and mentions `/docs/official-docs/EPIC-E/snapshot-storage.md` as required.
  - docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md — Lab-side snapshot planning doc exists and is linked from master docs.
  - Multiple EPIC-G code-scout reports (G2, G3, G5, G6) reference snapshot/linking or audit logging which are related concerns.


### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level plan: The G10 orchestrator file defines roles and the ordered execution plan (planner → integration-checker → implementer → security → documenter), but it does not contain the concrete policy artifacts (ID format, hashing rules) or implementation code.
- Official-docs references: `docs/official-docs-registry.md` contains high-level guidance for immutable snapshot storage and points to an internal doc path (`/docs/official-docs/EPIC-E/snapshot-storage.md`) — that target file is referenced but not present (marked REQUIRED in registry). This indicates partial documentation coverage but missing canonical storage doc.


### WHAT IS MISSING

- Canonical policy document for G10: no explicit `snapshot ID format`, hashing algorithm choice, canonical storage path/namespace schema, or immutability contract for snapshots was found for EPIC-G.
- Implementation artifacts: no service, API endpoint, uploader, or storage integration code specific to G10 was found under EPIC-G sources implementing artifact upload, write-once enforcement, or read-only hosting constraints.
- Integration validation: no `integration-checker` results or compatibility matrix for target storage providers (S3, GCS, Azure Blob) and ACL expectations were found.
- Snapshot metadata/audit schema: no formal schema defining required metadata fields (creator, timestamp, source session, content hash, size, retention tag, legal hold flag) or retention/deletion lifecycle rules was found for G10.
- Rollback & recovery plan: orchestrator suggested a rollback/recovery plan for accidental deletions; no such plan artifact was found.
- Security review artefacts: `security-sentinel` signoff, permission matrices, and attack-surface notes for backend artifact uploads are missing.


### RISKS OR CONFLICTS

- Risk Level: High (as marked by the orchestrator).
- Missing canonical doc: References to snapshot storage exist in `docs/official-docs-registry.md` and EPIC-E docs, but the lack of a single canonical G10 policy risks divergence between lab-side and push-flow implementations.
- Integration mismatch risk: Without an `integration-checker` matrix, implementers may select incompatible storage features (e.g., lacking object immutability or required ACL support) causing later rework.
- Security & integrity risk: Absence of a defined hashing scheme and audit metadata increases risk of undetected corruption or unauthorized artifact replacement.
- Legal/retention risk: No documented retention/purge/legal-hold policy was discovered, which may conflict with compliance goals.


### QUESTIONS FOR CLARIFICATION

- Confirm next agent: Should the `planner-architect` be the next agent to act (as listed in orchestrator)?
- Confirm whether G10 must reuse EPIC-E snapshot-storage artifacts, or produce a separate G10-specific canonical policy.


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Use this report: docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G10_Snapshot_Artifact_Handling.md

Prompt:

You are the `planner-architect` assigned as the next agent for G10 — Snapshot Artifact Handling. Based on the attached code-scout report and the Agent Orchestrator output (docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G10_Snapshot_Artifact_Handling.md), please produce the following artifacts and return them as discrete documents:

- A canonical policy document named `G10-snapshot-policy.md` that DEFINES ONLY (no implementation):
  - The exact `snapshot ID` format (syntax, character set, namespacing rules) and an example.
  - The canonical hashing rules (algorithm(s) to use, canonicalization steps before hashing, and how to represent multi-part/dir snapshots), including migration notes if upgrading algorithms later.
  - Storage namespace and path schema (bucket/object naming conventions, tenant/session scoping, and immutability contract such as write-once semantics and expected storage features required from providers).
  - Required snapshot metadata fields (creator ID, creation timestamp, source session/attempt ID, content hash, size, retention tag, legal-hold flag) and types.
  - Retention, purge, and legal-hold policies at a high level (retention durations, purge triggers, and required approvals) — DO NOT implement; define policy only.
  - A short rollback & recovery plan outline for accidental snapshot deletion (roles to contact, required logs/IDs to recover, and high-level RTO/RPO targets).

- A concise implementer checklist named `G10-implementer-checklist.md` describing the exact inputs and outputs the `implementer` will need to implement upload, immutability, and hosting constraints. The checklist MUST include:
  - Expected API endpoints and request/response shapes (only schema-level: e.g., `POST /snapshots` accepts metadata + binary stream, returns `snapshot_id` and HTTP status codes), and precise acceptance criteria and error codes.
  - Required storage provider capabilities (e.g., object immutability, versioning, server-side encryption, ACL model) and acceptable fallbacks.
  - The audit/metadata record schema the implementer must write to the system DB when a snapshot is created (field names and types matching the policy doc) and the standardized event codes to log for success/failure.
  - The expected integration-checker inputs (list of provider endpoints, auth methods, and permissions to verify) and pass/fail criteria.

Constraints: Do not implement or change code. Do not propose specific implementation libraries or code snippets. Focus strictly on precise policy definitions, metadata/hashing formats, API-level schemas, and the exact acceptance criteria the `implementer` will need.

Reference this code-scout report when producing the artifacts. Return the two documents and a single-line confirmation when complete.


Handoff complete. Provide this report verbatim to the next agent.