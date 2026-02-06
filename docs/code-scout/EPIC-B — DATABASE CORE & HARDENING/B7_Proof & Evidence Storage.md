## FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B7_Proof & Evidence Storage
- Source: docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B7_Proof & Evidence Storage.md

### TASKS CHECKED

- docs-gatekeeper — Confirm official docs for artifact storage patterns and allowed artifact types.
- forgea-code-scout — Locate any existing `ProofArtifact` models, storage adapters, or references to artifact types.
- planner-architect — Produce the authoritative task document for Feature B7 (not executed yet).
- implementer — Implement the approved task document and create the required test plan (not executed yet).

### WHAT ALREADY EXISTS

- /packages/schema/prisma/schema.prisma — Database schema present; includes `VerificationLog`, `AuditLog`, `ResumeBullet` models and related enums. `VerificationLog` contains CI verification metadata (commit, prDiff, ciOutput) and is used as the immutable record of verification.
- /packages/schema/prisma/migrations/* — Timestamped SQL migrations exist that create `VerificationLog` and related tables; one migration adds immutability triggers enforcing append-only behavior for `VerificationLog`, `AuditLog`, and `ResumeBullet`.
- /packages/audit/src/audit.service.ts — `AuditService` implements append-only audit writes, scrubbing/size rules, and contains a TODO noting archival of AuditLogs to S3/BigQuery.
- apps/forgea-labs/components/workspace/proof-diff.tsx — `ProofDiffViewer` UI component present; renders diffs and proof details (source-level implementation, no storage client code in this file).
- apps/forgea-labs/components/workspace/success-modal.tsx — `SuccessModal` displays an immutable proof artifact hash (IPFS-like `Qm...` example), and shows copy/download UI.
- apps/forgea-labs/components/workspace/main-shell.tsx — UI wires `onSubmitProof={() => {}}` placeholders; proof submission flow appears stubbed at UI layer.

### WHAT IS PARTIALLY IMPLEMENTED

- UI-level proof surface: Proof display, diff viewer, and proof-hash presentation are implemented in the frontend components, demonstrating a UX for immutable proof artifacts.
- DB immutability enforcement: Migrations include triggers to prevent destructive actions on `VerificationLog`/`AuditLog`/`ResumeBullet` (server-side enforcement exists).

### WHAT IS MISSING

- No explicit `ProofArtifact` model found in the Prisma schema (no dedicated table for storing artifact payloads discovered).
- No centralized storage adapter implementation located in source (no clear S3/minio client, IPFS/web3.storage client, or object-store adapter found in inspected source files).
- No environment/config entries for object storage (e.g., `S3_BUCKET`, `MINIO_ENDPOINT`, `WEB3_STORAGE_API_KEY`) discovered in the inspected sources.
- No end-to-end implementation connecting the frontend proof submission UI to a persistent artifact store — UI shows proof hashes but the storage/backing flow is not present in source-level scans.
- Tests and task doc for Feature B7 not present.

### RISKS OR CONFLICTS

- Proof payload handling is visible in compiled UI artifacts and source-level components, but without a clear storage backend the system risks inconsistent persistence and potential data loss.
- DB immutability triggers exist and will prevent destructive actions; implementing any storage flow must respect these invariants (writes-only for immutable records).
- Audit/archival TODOs reference S3/BigQuery but no configuration or adapter was found; this creates a gap between intended archival policies and implemented code.

### QUESTIONS FOR CLARIFICATION

- None strictly required by the Code-Scout; orchestration requests docs-gatekeeper confirmation before design decisions.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the Docs Gatekeeper. Use this Code-Scout report at /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B7_Proof & Evidence Storage.md as input. Confirm and provide version-pinned, official documentation links (or mark `missing`) for each item below. Do NOT propose design solutions — only confirm authoritative docs and their presence/absence.

For each line, respond in this exact format:
- `item:` <link> — `approved|missing`

Items to verify:
- `storage-options` — official docs comparing storing artifacts in relational DB vs object store (versioned or canonical source).
- `metadata-vs-payload` — docs describing patterns for storing artifact metadata in DB and payloads in object stores (best-practice guidance, pinned to a source and version).
- `allowed-artifact-types` — authoritative guidance listing allowed artifact types (e.g., LOG, DIFF, SCREENSHOT) and any size/retention recommendations.
- `compliance-retention` — official compliance/retention guidance for immutable evidence (retention windows, archival tiers, GDPR/PII notes if applicable).

Reference this Code-Scout report in your response. End with the exact final line:

Handoff complete. Provide this report verbatim to the next agent.
