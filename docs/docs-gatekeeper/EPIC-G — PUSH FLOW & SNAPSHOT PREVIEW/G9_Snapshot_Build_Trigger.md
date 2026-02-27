# FEATURE DOCS BRIEF — G9: Snapshot Build Trigger

## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G9 — Snapshot Build Trigger
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G9_Snapshot_Build_Trigger.md

## REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Actions / CI provider docs
   - Concept: Workflow triggers, event payloads, and recommended runner guarantees
   - Official source: Provider docs (e.g., https://docs.github.com/en/actions)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines canonical trigger fields and safe execution models for snapshot builds.
   - Decision it informs: Which webhook events and payload fields are authoritative for SHA resolution.
   - What breaks without it: Non-deterministic triggers and unsupported runner expectations.

2. Technology: Reproducible Builds Guidance / Build tool docs
   - Concept: Deterministic build flags, pinned toolchain versions, and manifest formats
   - Official source: Tool-specific docs (e.g., Node.js, pnpm, Turborepo) and reproducible build best-practices
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Ensures build commands can be reproduced and artifacts matched to SHAs.
   - Decision it informs: Manifest format, pinning strategy, and bootstrap steps.
   - What breaks without it: Non-reproducible artifacts and unverifiable provenance.

3. Technology: Artifact Provenance / Signing standards
   - Concept: Metadata and signatures for build artifacts (what to capture, signing format)
   - Official source: Supply-chain provenance specs (e.g., in-toto, Sigstore) — pin exact spec
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Provides canonical signatures and metadata expectations for audit and verification.
   - Decision it informs: Which fields are mandatory in artifact metadata and signature verification steps.
   - What breaks without it: Missing provenance, inability to validate artifact origin.

4. Technology: HTTP Semantics (RFC 7231) — Idempotency & Retry Patterns
   - Concept: Retry classification, idempotency behaviors for trigger handlers
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231
   - Why required: Guides idempotency key designs and retry policies for build triggers.
   - Decision it informs: Dedup and retry behavior for repeated webhook deliveries.
   - What breaks without it: Duplicate builds or lost triggers under retry.

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G9_Snapshot_Build_Trigger.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level requirements present; missing canonical build manifest format, gating rules, idempotency key definition, runner contract, and provenance schema.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: General CI/webhook/retry guidance present; missing explicit references to artifact provenance specs (in-toto/Sigstore) and reproducible-build guidance.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend:

- Add planner spec `/docs/planner_specs/EPIC-G/G9_snapshot_build_spec.md` (required by orchestrator — contains gating rules, manifest schema, SHA resolution, runner contract, failure semantics, provenance schema, acceptance tests).
- Extend `/docs/official-docs-registry.md` to include Artifact Provenance (in-toto/Sigstore) and Reproducible Builds guidance.

## STUDY GUIDE FOR HUMAN

- `CI Provider Docs` — Why: authoritative trigger semantics and runner guarantees; Alternatives: self-hosted runners with documented contracts; When NOT to use: if provider cannot supply required runner determinism; Mistakes: trusting unpinned toolchain versions.
- `Artifact Provenance (in-toto / Sigstore)` — Why: ensures artifacts can be verified; Alternatives: custom signing (riskier); When NOT to use: none — provenance is required for high-risk snapshot builds; Mistakes: omitting commit SHA or build manifest in provenance metadata.
- `Reproducible Builds Guidance` — Why: ensures identical artifact outputs; Alternatives: acceptance of non-deterministic artifacts (not acceptable here); Mistakes: not pinning tool versions or not recording environment variables.

## INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/planner_specs/EPIC-G/G9_snapshot_build_spec.md
   - Purpose: Planner deliverable requested by Orchestrator — prescriptive spec with gating rules, build manifest schema, SHA resolution algorithm, runner contract, failure semantics, provenance schema, and acceptance tests.
   - Exact knowledge to add:
     - Gating rules (PASS/FAIL conditions and reporting format),
     - Versioned build manifest schema (fields, sample JSON/YAML, schema versioning),
     - Exact SHA resolution algorithm (webhook field names, API fallbacks, idempotency key format),
     - Runner contract (required tools, pinned versions, env vars, resource limits, artifact signing steps),
     - Failure categories with retry semantics and rollback checklist,
     - Artifact provenance metadata schema (commit SHA, manifest version, runner id, build timestamp, signature),
     - Acceptance criteria and at least two concrete tests (reproducibility test and provenance validation).
   - Required version pin: reference specific CI provider and provenance spec versions.

2. Path: /docs/official-docs/in-toto.md (or /docs/official-docs/sigstore.md)
   - Purpose: Pin in-toto and/or Sigstore specs used to record and verify artifact provenance.
   - Exact knowledge to add: Which one is chosen, exact spec version, minimal integration steps.
   - Required version pin: MUST specify chosen spec/version.

3. Path: /docs/official-docs/EPIC-G/build-manifest-format.md
   - Purpose: Publish canonical, versioned build manifest format and pin toolchain/versioning fields referenced by manifest.
   - Exact knowledge to add: Schema, field semantics, allowed values, sample manifests, and validation rules.

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which CI providers/runners are acceptable (GitHub Actions, self-hosted runners, cloud sandboxes)?
- Which provenance standard will be used (`in-toto`, `Sigstore`, or internal)?
- What is the acceptable retention policy and storage location for signed artifacts and provenance metadata?
- Who signs build artifacts (runner service account, operator, or hardware-backed key)?

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G9 — Snapshot Build Trigger
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G9_Snapshot_Build_Trigger.md
  - Status: ADDED (EXTEND)
  - Reason: Planner brief required to define gating rules, manifest format, runner contract, SHA resolution, and provenance schema.

---

End of brief.
