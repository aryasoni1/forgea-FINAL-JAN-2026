### FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E7_Snapshot_and_Preview_Planning_Lab-Side (Snapshot & Preview Planning — Lab Side)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md


### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: Reproducible Builds / Deterministic Testing Guidance
   - Concept: Deterministic snapshot capture and hermetic test execution guidance
   - Official source: https://reproducible-builds.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines practices to make snapshot captures reproducible across environments and time (fixed seeds, hermetic runtimes, pinned toolchains).
   - Decision it informs: Determinism guarantees, test harness design, and CI validation strategies.
   - What breaks without it: Non-deterministic snapshots, flaky comparisons, and unreliable regressions.

2) Technology: OWASP Top Ten / Input Validation & Data Exposure Guidance
   - Concept: Security and privacy guidance for avoiding leaks, injection, and unsafe serialization
   - Official source: https://owasp.org/www-project-top-ten/
   - Exact version requirement: OWASP Top Ten 2021 (or later) — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Identifies classes of secrets, sensitive fields, and injection risks that previews/snapshots must never expose.
   - Decision it informs: Masking rules, forbidden fields, sanitizer acceptance criteria.
   - What breaks without it: Increased risk of leaking credentials, tokens, endpoints, PII, or enabling remote code execution via snapshot content.

3) Technology: Data Protection / Privacy Guidance
   - Concept: PII handling, retention, and redaction standards (legal & operational)
   - Official source: Organization legal policy and GDPR/CCPA guidance (link to be pinned)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines retention limits, access controls, and purging policies for stored snapshots containing user data.
   - Decision it informs: Snapshot retention policy, access controls, and audit logging.
   - What breaks without it: Legal compliance risk and unclear retention/privilege semantics.


### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator notes define agents and improvement ideas but do not provide snapshot semantics, masking rules, or acceptance criteria.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-scout summary highlights missing implementer & QA deliverables; no spec or sanitizer design is present.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend/add (high priority):
  - `/docs/official-docs/EPIC-E/snapshot_semantics_v1.md` — full spec of broken/fixed semantics and determinism guarantees.
  - `/docs/official-docs/EPIC-E/preview_sanitizer_spec.md` — masking rules, forbidden fields, and acceptable masking strategies.
  - `/docs/official-docs/EPIC-E/snapshot_storage_and_retention.md` — storage location, retention, access controls, and audit requirements.
  - `/docs/official-docs/EPIC-E/qa_snapshot_tests.md` — QA acceptance tests and CI integration for determinism and masking.

Reason: Existing orchestrator and code-scout outputs identify needs but do not provide definitive specifications or registry-backed guidance required to implement, test, and safely operate snapshot/preview features.


### STUDY GUIDE FOR HUMAN

- Reproducible Builds / Deterministic Testing: Why — ensures snapshot comparisons are meaningful; Alternatives — loose determinism with tolerance thresholds; When NOT to use — ad-hoc debugging-only snapshots. Common mistakes — not pinning timestamps, randomness, or runtime versions.

- OWASP / Input Validation: Why — identifies classes of vulnerabilities and data-exposure risks; Alternatives — internal threat model only (insufficient). When NOT to use — never; always consult for exposure-sensitive features. Common mistakes — treating previews as trusted output and failing to sanitize serialized objects.

- Data Protection & Retention: Why — legal compliance and user privacy. Alternatives — keep no snapshots (may hurt debugging). When NOT to use — ephemeral testing that must not store PII. Common mistakes — indefinite retention and overly broad access policies.


### INTERNAL DOCS TO ADD OR EXTEND

(Under `/docs/official-docs/EPIC-E/`)

- Path: snapshot_semantics_v1.md
  - Purpose: Define `broken` vs `fixed` snapshot semantics, determinism guarantees, and how verification maps snapshots to lab states.
  - Exact knowledge to add: Timestamp handling, deterministic seeds, environment pinning, acceptable diffs, and how to bind snapshots to commit SHAs.
  - Required version pin: Reproducible Builds guidance (pin exact reference).

- Path: preview_sanitizer_spec.md
  - Purpose: List forbidden fields (secrets, tokens, backend URLs), masking strategies (hashing, redaction, canonical placeholder), and sanitizer acceptance tests.
  - Exact knowledge to add: Regexes or matchers for common secrets, examples of acceptable masking, and instructions for sanitizer failure modes.
  - Required version pin: OWASP Top Ten guidance (pin exact reference).

- Path: snapshot_storage_and_retention.md
  - Purpose: Storage locations (S3 / object store), retention windows, access control, and audit logging requirements.
  - Exact knowledge to add: Retention periods, owner roles, access-review cadence, and purge workflow.
  - Required version pin: Data protection policy (legal reference).

- Path: qa_snapshot_tests.md
  - Purpose: QA harness and CI jobs to validate determinism and sanitizer correctness.
  - Exact knowledge to add: Test vectors, CI job names, failure semantics, and example snapshots for tests.
  - Required version pin: JSON Schema 2020-12 (if used for snapshot metadata validation).


### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Who owns HARD LOCK/approval for snapshot storage and retention policy? Must be assigned before locking artifacts.
- Which storage backend(s) are approved for snapshot retention (S3, internal blobstore)?
- Are there existing sanitizer libraries the org mandates or forbids?


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E7 — Snapshot & Preview Planning (Lab-Side)
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for snapshot semantics, masking, retention, and QA.


---
