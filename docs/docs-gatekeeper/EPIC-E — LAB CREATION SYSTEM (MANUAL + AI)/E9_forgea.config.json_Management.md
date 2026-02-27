## FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E9 — forgea.config.json Management
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For each required concept below: technology, concept, official source, exact version requirement, why required, decision it informs, and what breaks without it.

- **Technology:** JSON Schema
  - **Concept:** Schema for `forgea.config.json` (validation rules, required fields, types)
  - **Official source:** https://json-schema.org/specification.html
  - **Exact version requirement:** JSON Schema 2020-12
  - **Why required:** Provides machine-readable validation for configs to prevent runtime surprises and enforce required fields before publish.
  - **Decision it informs:** Field-level validation, allowed values, and enforcement severity (strict vs advisory).
  - **What breaks without it:** Inconsistent validation implementations, increased runtime failures, and risk when locking configs.

- **Technology:** JSON Web Signature (JWS) / Signature Scheme
  - **Concept:** Machine-readable signature format for locked configs (integrity + provenance)
  - **Official source:** RFC 7515 (JWS) and RFC 8037 (EdDSA / Ed25519 for JOSE)
  - **Exact version requirement:** RFC 7515; RFC 8037
  - **Why required:** If locked configs require signatures, an authoritative spec is needed for verification across runtimes and CI.
  - **Decision it informs:** Signature algorithm choice, verification prerequisites, and key management.
  - **What breaks without it:** Ambiguous signature formats, incompatible verifiers, or insecure choices.

- **Technology:** Git & CI Hooking
  - **Concept:** Hook framework/CI job names for rejecting invalid or unlocked edits at commit/push/merge
  - **Official source:** Internal CI docs / chosen hook tool (e.g., pre-commit or server-side hook guidance)
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** To ensure authoritative enforcement of lock semantics across local and server-side operations.
  - **Decision it informs:** Where enforcement runs (local vs CI vs server-side) and required integration points.
  - **What breaks without it:** Locks enforced only by convention and easily bypassed.

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md
  - Coverage status: PARTIAL
  - Exact gaps: Recommendations and execution plan present, but no canonical schema, no lifecycle doc, and no canonical repo path for published configs.

- Doc path: /docs/official-docs/repo-boundaries.md
  - Coverage status: PARTIAL
  - Exact gaps: Does not specify canonical location for published `forgea.config.json` files or lock ownership policies.

### DOCUMENTATION COVERAGE DECISION

❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED

Required new docs (minimum):
- `/docs/official-docs/EPIC-E/forgea.config.schema.json` — JSON Schema 2020-12 for `forgea.config.json` (REQUIRED)
- `/docs/official-docs/EPIC-E/forgea-config-locking.md` — Lock lifecycle, states, transitions, triggers, and admin override process (REQUIRED)
- `/docs/official-docs/EPIC-E/forgea-config-signature.md` — Signature format specification (JWS + Ed25519) and verification guidance (REQUIRED)
- `/docs/official-docs/EPIC-E/forgea-config-examples.md` — Example `forgea.config.json` files (draft, published/locked) and example signed artifacts (REQUIRED)

### STUDY GUIDE FOR HUMAN

- **Why a JSON Schema exists:** Ensures deterministic validation before activation; alternatives (ad-hoc validators) are error-prone. When NOT to use: very small throwaway labs where locking is unnecessary. Common mistakes: leaving fields optional that must be immutable after publish.

- **Why signatures for locked configs:** Provide tamper-evidence and provenance. Alternatives: server-side ACL-only enforcement (no signatures) — less portable. When NOT to use signatures: internal-only workflows with trusted server controls. Common mistakes: choosing weak algorithms or not defining key rotation.

- **Lock lifecycle reasoning:** Draft → Published → Locked prevents post-publish mutable changes that can break reproducibility. Alternatives: allow patchable published configs with audit trails. Mistakes: making lock irreversible without emergency override process.

### INTERNAL DOCS TO ADD (NEW)

- Canonical path: `/docs/official-docs/EPIC-E/forgea.config.schema.json`
  - Purpose: Machine-readable JSON Schema (2020-12) for `forgea.config.json` with required fields, types, and validation keywords.
  - Exact knowledge to add: root-level required fields, lab metadata (id, version, author), immutable fields, allowed runtime hooks, validation for referenced artifacts (paths/globs), and signature metadata fields.
  - Required version pin: JSON Schema 2020-12

- Canonical path: `/docs/official-docs/EPIC-E/forgea-config-locking.md`
  - Purpose: Lock lifecycle and operational playbook (states, transitions, triggers, and emergency override flow)
  - Exact knowledge to add: allowed operations in each state, who may transition state, required approvals, and audit logging requirements.
  - Required version pin: N/A

- Canonical path: `/docs/official-docs/EPIC-E/forgea-config-signature.md`
  - Purpose: Signature format spec and verification steps (JWS + Ed25519 recommendation), key distribution and rotation guidance, and CI verification commands.
  - Exact knowledge to add: exact JWS header claims required, expected key IDs (kid) format, verification algorithm, and example `jwks.json` entry.
  - Required version pin: RFC 7515, RFC 8037

- Canonical path: `/docs/official-docs/EPIC-E/forgea-config-examples.md`
  - Purpose: Two example configs (draft vs locked) and sample signed artifacts with verification steps.
  - Exact knowledge to add: one minimal draft, one published/locked example, and sample error messages for validation failures.
  - Required version pin: N/A

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- What is the canonical repository path where published lab `forgea.config.json` must live? (e.g., `/labs/<lab-id>/forgea.config.json` or repo root) — BLOCKER
- Are administrative override flows allowed for locked configs? If yes, what approval process is required? — BLOCKER
- Which signature authority or key-distribution mechanism will be used (internal CA, JWKS endpoint)? — BLOCKER

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E9 — forgea.config.json Management
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for `forgea.config.json` schema, lock lifecycle, and signature requirements.
