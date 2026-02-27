---
doc_id: audit-compliance-refs
tool: Compliance
version_pinned: true
change_sensitivity: HIGH
lifecycle: DRAFT
---

# Audit Compliance References — EPIC-B

This document pins the external compliance references required by Task B12 and explains which sections are normative for audit evidence.

Pinned references (authoritative):

- **NIST SP 800-92** — Guide to Computer Security Log Management (NIST Special Publication 800-92). Reference for log collection, storage, and retention guidance.
- **PCI DSS v4.0** — Payment Card Industry Data Security Standard v4.0. Applies only if the product is in scope for cardholder data. (See `PCI scope` decision below.)
- **SOC 2** — Trust Services Criteria (as applicable). Organization-level attestation; confirm target criteria before mapping evidence.
- **ISO/IEC 27001:2013** — Information security management system standard; cite relevant annex controls for logging and retention.
- **Elastic Common Schema (ECS)** — Field naming and mapping guidance for JSON structured logs. (Proposed pin: ECS 1.14.0 — confirm with Observability team.)

Scope decisions & owners

- **PCI scope:** Owner: Security. Recommendation: default to *out of PCI scope* if cardholder data is fully handled by Stripe (no card data stored or processed in our systems). Security must confirm within 3 business days and record the decision in this file.

- **SOC 2 commitment:** Owner: Leadership / Compliance. Action: leadership to confirm whether an SOC 2 attestation is required and which Trust Services Criteria apply. If committed, Compliance team to produce mapping plan.

- **ECS version:** Owner: Observability/Logging team. Proposed: ECS 1.14.0 (tunable). Observability should confirm within 3 business days and update this doc.

Normative sections for auditors

- Log collection architecture and append-only storage (NIST SP 800-92 mapping).
- Retention windows and archival proof (checksum, JSONL archives) as evidence for ISO/PCI controls.
- Evidence of schema validation and metadata truncation policy for producers (this ensures tamper-resistance and consistent auditability).

Next steps

1. Security confirms PCI scope and updates this doc with the decision and rationale.
2. Observability confirms ECS version and updates this doc.
3. Compliance/Leadership confirms SOC 2 commitment.
4. After confirmations, update `/docs/official-docs-registry.md` to add pinned references and versions.

Owners & Contacts

- Security: [security-team@example.com]
- Observability: [observability-team@example.com]
- Compliance/Leadership: [compliance-lead@example.com]
- Document owner: Documenter (TBD)
