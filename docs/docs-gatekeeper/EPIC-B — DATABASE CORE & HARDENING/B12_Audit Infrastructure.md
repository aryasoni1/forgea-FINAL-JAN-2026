### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B12 — Audit Infrastructure
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/audit/src/audit.service.ts
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B9_Admin & Control Tables.md

---

### REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable implementation the following external references should be added to the official registry and pinned.

- Technology: NIST
  - Concept: Log management / audit logging guidance (NIST SP 800-92)
  - Official source: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
  - Exact version requirement: NIST SP 800-92 (2006)
  - Why required: Authoritative guidance on collection, storage, and retention of system logs and audit telemetry.
  - Decision it informs: Log retention, secure storage, access controls, and reconstruction procedures for forensic audits.
  - What breaks without it: Weak or non-forensic log collection, unclear retention and access policies.

- Technology: PCI Council / PCI-DSS
  - Concept: Audit and logging requirements for payment card environments
  - Official source: https://www.pcisecuritystandards.org
  - Exact version requirement: PCI DSS v4.0 (pin before implementation)
  - Why required: If system processes cardholder data or billing touches card flows, PCI prescribes specific logging and retention controls.
  - Decision it informs: Which events must be logged, retention windows, and integrity controls for logs involving payments.
  - What breaks without it: Non-compliance risk and failed payment-card audits.

- Technology: AICPA / SOC 2
  - Concept: Trust Services Criteria for security, availability, and confidentiality (audit expectations)
  - Official source: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Sets auditor expectations for audit log completeness, immutability, and access control for services subject to SOC 2.
  - Decision it informs: Minimum event types, segregation of duties, and retention required by auditors.
  - What breaks without it: Unexpected auditor findings; inability to demonstrate compliance.

- Technology: ISO / Information Security
  - Concept: Audit logging and monitoring controls (ISO/IEC 27001)
  - Official source: https://www.iso.org/standard/54534.html
  - Exact version requirement: ISO/IEC 27001:2013 (pin if another edition is required)
  - Why required: Organizational controls and policy baseline for security and audit requirements.
  - Decision it informs: Organizational retention, policy-driven access, and incident response requirements.
  - What breaks without it: Misaligned org-level policies and audit expectations.

- Technology: Elastic / Logging Schema
  - Concept: Canonical event schema for logs (Elastic Common Schema — ECS)
  - Official source: https://www.elastic.co/guide/en/ecs/current/index.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides a practical JSON-schema-style field set for consistent event fields, easing search and cross-service correlation.
  - Decision it informs: Field names for `metadata`, timestamp conventions, and normalization rules for `AuditLog.metadata`.
  - What breaks without it: Inconsistent metadata shapes across producers, harder search and aggregation.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies `packages/audit` and producers but lacks a single, versioned JSON Schema or an authoritative internal `audit-log-guidelines.md` file.

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/audit/src/audit.service.ts
  - Coverage status: PARTIAL
  - Exact gaps: Implements typed `AuditMetadataMap` and append-only writes, but no exported JSON Schema or versioned event contract; truncation logic present without formal policy.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B9_Admin & Control Tables.md
  - Coverage status: PARTIAL
  - Exact gaps: Calls out the need for `/docs/official-docs/EPIC-B/audit-log-guidelines.md` but the canonical file does not exist.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Which docs must be extended:

- `/docs/official-docs/EPIC-B/audit-log-guidelines.md` — NEW (required): canonical JSON Schema for `AuditLog.metadata`, required top-level fields, field size limits, PII redaction rules, and severity mapping.
- `/docs/official-docs/EPIC-B/prisma_migrations.md` — EXTEND: add immutable audit table migration/backfill and retention/archival patterns.
- `/docs/official-docs/billing-provider.md` — EXTEND: call out PCI logging requirements for payment-related events if billing will handle cardholder data.

---

### STUDY GUIDE FOR HUMAN

- Why audit standards exist: To guarantee event completeness, immutability, and forensic readiness for security and compliance audits.
- Why multiple standards: Different stakeholders (security auditors, payment councils, regulatory auditors) require overlapping but distinct controls.
- When NOT to adopt a DB-enforced schema: If logs must be schema-flexible for rapid product telemetry — still enforce canonical fields at ingestion and keep an append-only raw blob for forensic replay.
- Common engineering mistakes: Relying on ad-hoc `metadata` shapes, not verifying destructor/truncation semantics, failing to sign/verify telemetry ingestion, and omitting retention/archival plans.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/audit-log-guidelines.md
  - Purpose: Single source-of-truth JSON Schema (example .json) for `AuditLog.metadata`, required fields (`action`, `actor`, `resource`, `severity`, `timestamp`), field size limits, redaction rules, and sample producer code.
  - Exact knowledge to add: JSON Schema file, example Prisma audit model, recommended ECS mapping, truncation policy, and retention/archival steps.
  - Required version pin: Link to chosen ECS version and to NIST/PCI references (versions pinned above).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/audit-compliance-refs.md
  - Purpose: Collect SOC2, PCI-DSS, NIST references with implementation notes and what to provide to auditors.
  - Exact knowledge to add: Exact sections of each external spec relevant to logging, sample evidence artifacts, and recommended retention durations.
  - Required version pin: PCI DSS v4.0 and pinned NIST/SOC2 references.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Is the product target subject to PCI-DSS scoped environments? (BLOCKER — required to determine PCI logging requirements.)
- Does the organization target SOC 2 attestation? (BLOCKER — required to pin SOC2 expectations.)
- Which ECS / logging schema version should we adopt as canonical? (BLOCKER — pin before writing schema.)
- Confirm current production `AuditLog` shape and whether older entries must be backfilled to a new schema (DB inspection required).

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B12 — Audit Infrastructure
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required external references (NIST, PCI, SOC2, ECS), missing internal schema, and blockers for safe implementation.
