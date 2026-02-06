```markdown
## FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B14 — Retention & Cost Controls
- Source: docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B14_Retention & Cost Controls.md

### TASKS CHECKED

- Step 1: Enumerate existing artifact storage, indexes, and proof-hash references.
- Step 2: Identify retention points and any existing retention/immutability logic.
- Step 3: Locate candidate surfaces for cost metadata and billing displays.

### WHAT ALREADY EXISTS

- /apps/forgea-labs/components/workspace/success-modal.tsx : Frontend UI that surfaces an immutable proof artifact/hash example (const proofHash = "QmX7a9c2k3d5e8f1g4h6i9j2k5l8n1p4r7s0t3u6v9w2x5y8z"). The UI renders and exposes a proof hash to users.
- /apps/forgea-labs/app/(workspace)/ticket/[labId]/page.tsx (and built artifacts) : Workspace ticket page shows an "Immutable Proof Artifact" block with a proof-hash string rendered in the UI.
- /apps/forgea-labs/app/(public)/proof/[username]/page.tsx and /apps/forgea-labs/app/proof/page.tsx : Public proof pages and proof portal exist as UI surfaces for displaying proof artifacts.
- /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B7_Proof & Evidence Storage.md : Prior code-scout notes explicitly state that the UI surfaces proof hashes but an end-to-end persistent artifact store/backing flow was not found during scans.
- /packages/schema/prisma/schema.prisma : Prisma schema defines `VerificationLog` (immutable record of CI verification) with fields `commitSha`, `prDiff`, and `ciOutput`. This is the canonical DB model for verification artifacts.
- /packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql : Contains CREATE TABLE for `VerificationLog` and related constraints (primary key, unique index on `sessionId`).
- /packages/schema/prisma/migrations/20260124070452_add_immutability_triggers/migration.sql : Adds `prevent_destructive_action()` trigger and attaches immutability triggers to `VerificationLog` and `AuditLog` (append-only enforcement).
- /packages/schema/src/db.ts and packages/schema tooling : Prisma client init and migration tooling exist (`prisma` scripts, prisma.config.mjs), indicating DB and migrations are authoritative for persistent models.
- /apps/forgea-admin and /apps/forgea-labs (billing pages) : Admin UI includes "System & Billing" / "Credit Ledger" surfaces and app settings include `/settings/billing` pages (UI surfaces to display cost/credit metrics). Built artifacts (.next) reference billing pages and credit-ledger sample data.

### WHAT IS PARTIALLY IMPLEMENTED

- UI-level proof artifact surfaces: The frontend renders proof hashes (examples present) but there is no detected code path that uploads/stores large proof artifacts (e.g., objects/binaries) to an external object store or manifests the storage location in the DB.
- DB verification model: `VerificationLog` exists and is immutable; it stores `commitSha`, `prDiff`, and `ciOutput` (text fields). A discrete column for an external artifact storage pointer (object URL, bucket path, or IPFS CID) was not found in `VerificationLog` model.
- Billing surface: Admin/UI surfaces for billing/credit ledger exist and show sample metrics, but repository lacks a concrete billing provider integration or DB billing record model (no obvious `cost`/`charge` column on verification or lab-session models discovered in quick scans).

### WHAT IS MISSING

- No end-to-end archival pipeline discovered: there is no clear service or worker that moves proofs/artifacts to cold storage (S3/GCS/MinIO/IPFS) nor any manifest format for archived batches.
- No explicit artifact-storage model column: `VerificationLog` does not contain an explicit `artifactUrl`, `storagePath`, or `artifact_cid` column in the Prisma model discovered.
- No cost-tracking column or triggers found: repository scanning did not surface a `cost`, `storage_cost_cents`, or similar column on primary models, nor DB triggers that calculate or log storage/bandwidth cost per archival operation.
- No archival manifest or recovery helper: there is no located CSV/JSON manifest schema for archived batches or recovery runbook in docs.

### RISKS OR CONFLICTS

- Immutability enforcement (DB triggers) means any plan that requires updating verification rows must preserve immutability invariants (use new records/relations rather than updates). Planner must account for append-only constraints.
- Frontend exposes proof hashes (potentially IPFS-like CIDs) with no documented custody: if the UI surfaces CIDs without a durable backing store, recoverability risk exists.
- Billing UI surfaces sample metrics but no source-of-truth for cost numbers were found; risk of divergence between displayed metrics and actual measured costs if a cost pipeline is later added without reconciliation logic.

### QUESTIONS FOR CLARIFICATION

- Should external artifact pointers be added to the existing `VerificationLog` model, or should a new related `Artifact` table be introduced? (planner decision required.)
- Preferred cold storage destination(s) (S3/GCS/MinIO/IPFS) and access model (public CID vs. signed URL) are not present — which destination does the org approve? (planner decision required.)

### NEXT AGENT HANDOFF PROMPT (FOR planner-architect)

Use this exact prompt (copy-paste) for the planner-architect agent. Reference this code-scout report file when running.

You are the planner-architect for Feature B14 — Retention & Cost Controls (EPIC-B). Use the code-scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B14_Retention & Cost Controls.md as the factual source of truth. Based only on the findings in that report, produce `/docs/tasks/task-B14-<YYYY-MM-DD>.md` (DRAFT) that includes:

- Retention policy (durations for hot/nearline/cold storage) and explicit acceptance criteria.
- Archival pipeline design: where artifacts are archived (list approved destinations), who/what moves them (worker/service), manifest format per batch (CSV/JSON schema), and recovery procedure for rehydration.
- Proof-hash preservation plan: whether to add an `artifact` pointer column to `VerificationLog` or create a new related `Artifact` model; migration approach that preserves immutability invariants (no destructive updates to append-only tables).
- Cost tracking plan: DB schema changes (columns/tables) and triggers or scheduled jobs to compute storage costs per archived item/batch; how to surface cost metadata to the existing Admin `Credit Ledger` and billing pages.
- Low-risk migration steps and verification tests to validate (artifact integrity, manifest completeness, proof-hash presence after archival, cost calculation correctness).

Do NOT implement code. Do NOT propose technology-specific vendor lock-in without explicit approval. Keep the task doc scoped to the repository invariants in this report and follow existing patterns (Prisma migrations, append-only triggers, audit practices).

Handoff complete. Provide this report verbatim to the next agent.
```
