# EPIC-E — Combined: REQUIRED OFFICIAL DOCUMENTATION

This document aggregates the "REQUIRED OFFICIAL DOCUMENTATION" sections from each EPIC-E feature brief.

---

## E1_Base_SaaS_and_Template_Setup.md — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Template Repositories / Repository API
  - Concept: Supported mechanisms to instantiate a repository from a template (UI "Use this template" vs REST API automation). Determines clone-time replacements and required token scopes.
  - Official source: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs cloning strategy, permissions, and supported metadata (topics, default branch, template files).
  - Decision it informs: whether to implement automation using the template API, to vendor a local scaffolder, or to add packages inside the monorepo.
  - What breaks without it: insecure or non-repeatable cloning; incorrect assumptions about token scopes or template features.

- Technology: pnpm (Workspaces)
  - Concept: Workspace package discovery and install semantics for cloned labs placed under `packages/`.
  - Official source: https://pnpm.io/
  - Exact version requirement: 10.4.x
  - Why required: Ensures cloned lab package is correctly discovered and installed in the monorepo.
  - Decision it informs: clone destination, required `package.json` fields, and workspace updates.
  - What breaks without it: clones not included in monorepo installs or CI builds.

- Technology: Turborepo (pipeline)
  - Concept: How cloned labs integrate with `turbo` pipelines, caching, and CI verification tasks.
  - Official source: https://turborepo.org/docs
  - Exact version requirement: 2.1.x
  - Why required: Integration Checker must know which tasks to run and how to add cloned packages into the dependency graph.
  - Decision it informs: CI wiring, `turbo.json` entries, and verification task names.
  - What breaks without it: CI will not validate cloned labs or will require manual pipeline edits.

- Technology: Node.js
  - Concept: Runtime version for build/test (engines/.nvmrc) in template.
  - Official source: https://nodejs.org/en/about/releases/
  - Exact version requirement: 20.x (>=20.11.0 <21.0.0)
  - Why required: Reproducible builds and compatibility with pnpm/turbo stacks.
  - Decision it informs: `.nvmrc`/`engines` and CI images.
  - What breaks without it: inconsistent dev environments and build failures.

- Technology: Git / CODEOWNERS (locking markers)
  - Concept: File-level ownership and branch protections used to mark immutable/locked surfaces in the template.
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
  - Exact version requirement: N/A (file format)
  - Why required: Enables enforceable ownership and review workflow for locked template areas.
  - Decision it informs: which files are automatically protected and require specific reviewers.
  - What breaks without it: accidental edits to locked surfaces and lack of an enforcement mechanism.

- Technology: GitHub Actions / CI
  - Concept: Reusable workflow templates or CI steps the Integration Checker will run to validate clones.
  - Official source: https://docs.github.com/en/actions
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED (action versions)
  - Why required: Defines canonical verification (install, lint, test, build) for cloned labs.
  - Decision it informs: whether clones embed workflows or use centralized reusable workflows.
  - What breaks without it: inconsistent CI across clones and missing verification gates.

- Technology: GitHub REST API / Token scopes
  - Concept: API endpoints and least-privilege token scopes required for programmatic cloning or repo creation.
  - Official source: https://docs.github.com/en/rest
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures automation uses least-privilege flows and predictable API behavior.
  - Decision it informs: automated cloning flow and secrets management.
  - What breaks without it: security exposure or broken automation.

---

## E2_Canonical_Lab_Definition_Manual.md — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema (machine-readable schema specification)
   - Concept: Structural validation and machine-readable contract for lab definitions
   - Official source: https://json-schema.org/specification-links.html#2020-12
   - Exact version requirement: 2020-12
   - Why required: Provides canonical rules for validating lab definitions (types, required fields, formats, allowed values).
   - Decision it informs: Validator implementation (QA/Tester), schema drafting (Planner/Architect), AI-output acceptance rules (E8).
   - What breaks without it: Ambiguous validation behavior, incompatible validators across services, inability to automtically reject unsafe/invalid lab definitions.

2. Technology: Semantic Versioning
   - Concept: `version` field semantics and compatibility rules for lab definitions
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Defines how `version` increments relate to compatibility and migration policy.
   - Decision it informs: Versioning policy, compatibility rules for verification harness, migration guidance.
   - What breaks without it: Inconsistent version bumps, accidental breaking changes labeled as compatible, migration confusion.

3. Technology: OWASP Top Ten / Input Validation guidance
   - Concept: Security guidance for input validation, injection, and secret handling
   - Official source: https://owasp.org/www-project-top-ten/
   - Exact version requirement: OWASP Top Ten 2021 (or later pinned) — VERSION MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Identifies classes of risky fields (injection, secrets) and informs forbidden-field policies.
   - Decision it informs: Security Sentinel review, forbidden-fields list, and CI checks to reject secrets/executable payloads.
   - What breaks without it: Increased risk of secret leakage, code-execution vectors in lab definitions, unsafe AI-generated content.

---

## E3_Failure_Design_and_Constraints.md — REQUIRED OFFICIAL DOCUMENTATION

1. Deterministic Test & Failure Design

- Technology / Concept: Deterministic test design and reproducible failure injection
- Official source: https://reproducible-builds.org/ — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines practices and expectations for reproducible experiments (fixed seeds, environment pinning, hermetic fixtures).
- Decision informed: Determinism rules (fixed seeds, disabled network, controlled time sources) and allowed test harness primitives.
- What breaks without it: Non-reproducible failures, flaky labs, inability to assert single-root-cause symptoms.

2. Observability / Logging Standard

- Technology / Concept: Observability semantic conventions (tracing/metrics/logs)
- Official source: https://opentelemetry.io/specs/ — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines canonical observable signals (span attributes, log message formats, error codes) used to map failures → symptoms.
- Decision informed: Symptom selection (log line patterns, error codes) and required telemetry emitted by harnesses.
- What breaks without it: Ambiguous symptoms, inconsistent signal collection, inability to verify single-root-cause mapping.

3. Secrets & Sensitive Data Handling

- Technology / Concept: Secrets management and safe test fixture rules
- Official sources: https://www.vaultproject.io/docs | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html — Exact provider version MUST BE PINNED
- Why required: Ensures designs forbid secrets exposure and specify safe injection/rotation for tests.
- Decision informed: Forbidden failure types (secrets exposure), acceptable fixtures (mock secrets, fixtures that never persist secrets).
- What breaks without it: Risk of leaking credentials or persisting sensitive artifacts.

4. Container / Environment Isolation

- Technology / Concept: Container runtime and process isolation (Docker / Compose) guidance
- Official source: https://docs.docker.com/engine/ — Version: 25.0.x (recommended) OR: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines safe patterns for ephemeral environments, filesystem isolation, and avoiding host-side side-effects.
- Decision informed: Whether tests may mount host paths, allow network access, or require privileged capabilities.
- What breaks without it: Accidental persistence, host contamination, or unsafe fixture usage.

---

## E4_Repo_and_Code_Surface_Rules.md — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Repository Boundaries
  - Concept: Canonical repo & package boundary policy (ownership, locked vs editable paths)
  - Official source: /docs/official-docs/repo-boundaries.md (internal)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines which paths are considered core IP vs user-editable surface; needed to author forbidden-path globs.
  - Decision it informs: What to lock in templates, enforcement scope, package-level vs repo-wide rules.
  - What breaks without it: Inconsistent enforcement, accidental exposure or edits to core IP.

- Technology: Build & Orchestration (Turborepo)
  - Concept: Pipeline conventions and CI job names influencing enforcement placement
  - Official source: https://turborepo.org/docs
  - Exact version requirement: 2.1.x
  - Why required: CI job names and pipeline layout inform where checks run (pre-merge, post-merge), and where scaffolders execute.
  - Decision it informs: CI enforcement placement and how scaffolding scripts must be constrained.
  - What breaks without it: Enforcement may be bypassed by CI or scaffolding tasks.

- Technology: Package Manager (pnpm)
  - Concept: Workspace discovery and install semantics
  - Official source: https://pnpm.io/
  - Exact version requirement: 10.4.x
  - Why required: Determines workspace-scoped enforcement tooling installation and canonical hook execution points.
  - Decision it informs: Whether rules apply per-package or repo-wide and how to run checks in CI.
  - What breaks without it: Non-deterministic installs or missing enforcement in some workspaces.

- Technology: Linting / Import Boundaries (ESLint + plugin)
  - Concept: Enforce import and edit boundaries using lint rules
  - Official source: https://eslint.org/ and https://github.com/bryanrsmith/eslint-plugin-boundaries
  - Exact version requirement: ESLint 9.39.x; eslint-plugin-boundaries 4.2.x
  - Why required: Lint rules are a primary enforcement mechanism preventing forbidden edits and cross-package leakage.
  - Decision it informs: Choice of enforcement (lint vs hooks vs CI vs central service).
  - What breaks without it: No reliable static prevention of imports or edits; more runtime or review-time failures.

- Technology: Git & CI Hooking
  - Concept: Pre-commit / pre-receive / CI hook framework (how to block forbidden edits at commit/push/merge)
  - Official source: VERSION UNKNOWN — MUST BE PINNED (examples: pre-commit, lint-staged, server-side hooks)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Needed to implement actionable enforcement (local + server) that cannot be bypassed by simple edits.
  - Decision it informs: Which hook framework to require and how implementers will integrate checks.
  - What breaks without it: Enforcement will be advisory only, easily bypassed.

---

## E5_Step_Based_Lab_Design_Optional.md — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema
   - Concept: Schema for `step` metadata and lab config
   - Official source: https://json-schema.org/specification-links.html
   - Exact version requirement: 2020-12
   - Why required: Defines machine-usable contract for step metadata (IDs, titles, file bindings, progression rules) that implementers will validate programmatically.
   - Decision it informs: Validation, codegen (TypeScript/JSON Schema), CI enforcement inputs.
   - What breaks without it: Interoperability across services, validator ambiguity, and mismatched enforcement behavior.

2. Technology: Semantic Versioning
   - Concept: Versioning rules for step-schema and lab-config artifacts
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Establishes how breaking/non-breaking changes to step definitions are signalled and migrated.
   - Decision it informs: Migration rules, deploy gating, and rollback semantics.
   - What breaks without it: Unclear upgrade/migration policy risking runtime incompatibility.

3. Technology: Glob / Pathspec semantics
   - Concept: File-path binding pattern syntax used to pledge files to steps (matching rules)
   - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Enforcement (CI/linter/hook) needs an exact pattern grammar (e.g., gitignore vs minimatch vs bash glob) to deterministically map files to steps.
   - Decision it informs: Canonical matching engine used in enforcement hooks.
   - What breaks without it: Divergent matching implementations causing false positives/negatives in enforcement.

---

## E6_Verification_Design_Lab-Level.md — REQUIRED OFFICIAL DOCUMENTATION

- CI / Verification harness (Playwright + pipeline orchestration)
  - Concept: Canonical verification entry, artifact schema, exit-code semantics, forbidden-pattern reporting, artifact upload semantics.
  - Official source references: Playwright docs plus CI provider docs (pin exact versions in final docs)
  - Why required: Defines the authoritative verification CLI, report schema, artifact requirements, and forbidden-pattern semantics that implementers and QA will rely on.
  - What breaks without it: Inconsistent verifier behavior, unverifiable artifacts, and ambiguous rejection semantics.

---

## E7_Snapshot_and_Preview_Planning_Lab-Side.md — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Reproducible Builds / Deterministic Testing Guidance
   - Concept: Deterministic snapshot capture and hermetic test execution guidance
   - Official source: https://reproducible-builds.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines practices to make snapshot captures reproducible across environments and time (fixed seeds, hermetic runtimes, pinned toolchains).
   - What breaks without it: Non-deterministic snapshots, flaky comparisons, and unreliable regressions.

2. Technology: OWASP Top Ten / Input Validation & Data Exposure Guidance
   - Concept: Security and privacy guidance for avoiding leaks, injection, and unsafe serialization
   - Official source: https://owasp.org/www-project-top-ten/
   - Exact version requirement: OWASP Top Ten 2021 (or later) — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Identifies classes of secrets, sensitive fields, and injection risks that previews/snapshots must never expose.
   - What breaks without it: Increased risk of leaking credentials, tokens, endpoints, PII, or enabling remote code execution via snapshot content.

3. Technology: Data Protection / Privacy Guidance
   - Concept: PII handling, retention, and redaction standards (legal & operational)
   - Official source: Organization legal policy and GDPR/CCPA guidance (link to be pinned)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines retention limits, access controls, and purging policies for stored snapshots containing user data.
   - What breaks without it: Legal compliance risk and unclear retention/privilege semantics.

---

## E8_AI-Assisted_Lab_Generation.md — REQUIRED OFFICIAL DOCUMENTATION

1. JSON Schema (Validation)

- Technology / Concept: JSON Schema (validation and structural guarantees)
- Official source: https://json-schema.org/specification-links.html
- Exact version requirement: 2020-12
- Why required: Provides canonical schema syntax and validation semantics for generated lab artifacts and automated rejection rules.
- What breaks without it: Inconsistent validation rules, ambiguous rejection behavior, and risk of publishing malformed or unsafe artifacts.

2. Model Provider API & Use Policy

- Technology / Concept: Model provider API and safety/use policy (example: OpenAI)
- Official source: https://platform.openai.com/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines API behavior, rate limits, content policy constraints, and provider-specific safety controls used by Implementer and Security Sentinel.
- What breaks without it: Noncompliant generation, undetected policy violations, unexplained model behavior or provenance gaps.

3. AI Explainability / Model Cards Guidance

- Technology / Concept: Model cards / explainability best practices
- Official source: https://modelcards.withgoogle.com/ (or equivalent canonical guidance)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Specifies minimal explainability artifacts and metadata to record model inputs, prompts, and deltas for reviewer transparency.
- What breaks without it: Insufficient evidence for human reviewers, inability to trace or justify generation changes.

4. Responsible AI / Governance Principles

- Technology / Concept: Responsible AI / governance principles (OECD / organizational policy)
- Official source: https://www.oecd.org/going-digital/ai/principles/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides high-level constraints on allowed use cases, risk classification, and human-review gating for high-risk outputs.
- What breaks without it: Unclear governance causing inconsistent reviewer decisions and unsafe publishes.

---

## E9_forgea.config.json_Management.md — REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Schema for `forgea.config.json` (validation rules, required fields, types)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: JSON Schema 2020-12
  - Why required: Provides machine-readable validation for configs to prevent runtime surprises and enforce required fields before publish.
  - Decision it informs: Field-level validation, allowed values, and enforcement severity (strict vs advisory).
  - What breaks without it: Inconsistent validation implementations, increased runtime failures, and risk when locking configs.

- Technology: JSON Web Signature (JWS) / Signature Scheme
  - Concept: Machine-readable signature format for locked configs (integrity + provenance)
  - Official source: RFC 7515 (JWS) and RFC 8037 (EdDSA / Ed25519 for JOSE)
  - Exact version requirement: RFC 7515; RFC 8037
  - Why required: If locked configs require signatures, an authoritative spec is needed for verification across runtimes and CI.
  - Decision it informs: Signature algorithm choice, verification prerequisites, and key management.
  - What breaks without it: Ambiguous signature formats, incompatible verifiers, or insecure choices.

- Technology: Git & CI Hooking
  - Concept: Hook framework/CI job names for rejecting invalid or unlocked edits at commit/push/merge
  - Official source: Internal CI docs / chosen hook tool (e.g., pre-commit or server-side hook guidance)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To ensure authoritative enforcement of lock semantics across local and server-side operations.
  - Decision it informs: Where enforcement runs (local vs CI vs server-side) and required integration points.
  - What breaks without it: Locks enforced only by convention and easily bypassed.

---

## E10_Versioning_and_Immutability.md — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Semantic Versioning

- Concept: Version assignment rules and compatibility semantics for published lab artifacts
- Official source: https://semver.org/spec/v2.0.0.html
- Exact version requirement: 2.0.0
- Why required: Defines how to signal breaking vs non-breaking changes in lab schema/published artifacts and drives migration policies.
- What decision it informs: Version numbering, publish gating, migration workflows, and client compatibility checks.
- What breaks without it: Risk of incompatible changes, unclear migration expectations, and accidental breaking deployments.

2. Technology: JSON Schema

- Concept: Schema for publish metadata and version records (machine-validation)
- Official source: https://json-schema.org/specification-links.html
- Exact version requirement: 2020-12
- Why required: Provides precise validation contract for publish records, preventing divergent interpretations across services.
- What decision it informs: API payload validation, DB schema mapping, and CI enforcement inputs.
- What breaks without it: Inconsistent record formats and validation gaps across implementers.

3. Technology: JSON Web Signature (JWS)

- Concept: Immutable-claim signatures for publish proofs / immutability attestations
- Official source: RFC 7515 (JWS) — https://datatracker.ietf.org/doc/html/rfc7515
- Exact version requirement: RFC 7515 (2015)
- Why required: Standard, interoperable method to cryptographically sign publish records or version snapshots.
- What decision it informs: Choice of signature format and verification flow for immutability proofs.
- What breaks without it: No standard proof format; harder cross-system verification and weaker auditability.

4. Technology: Content-Addressed Storage / CID semantics

- Concept: How immutable blobs are referenced by content hash (for lab snapshots and artifacts)
- Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (e.g., multiformats CID spec)
- Why required: Guarantees immutable addressing semantics and deduplication behavior for snapshot storage.
- What decision it informs: Storage layout, deduplication policy, and retrieval/garbage-collection semantics.
- What breaks without it: Non-deterministic addressing, risk of silent mutations, and storage/GC ambiguity.

---

## E11_Quality_and_Review.md — REQUIRED OFFICIAL DOCUMENTATION

MANUAL REVIEW WORKFLOW (high-level)

- Gate points: Draft → Verification → Manual Review → Publish. Manual review required after Verification PASS and before Publish for any lab marked `requires_review: true`.
- Reviewer roles:
  - Reviewer: human subject-matter reviewer with `reviewer` permission to sign-off labs.
  - Supervisor: reviewer with `senior_reviewer` permission for escalations and appeals.
  - Automated agents: provide evidence (verification artifacts) but cannot sign-off.
- Checkpoints:
  - Completeness: all required assets present (instructions, tests, fixtures).
  - Solvability verification: QA-run evidence attached (Playwright report / verification JSON).
  - Security check: quick scan for secrets/exfil patterns (verifier report).
  - Content quality: clarity, concept alignment, estimated time-on-task.

PASS / FAIL CRITERIA FOR REVIEW

- PASS (approve): lab is solvable within estimated time, concept focus is correct, instructions are clear, no forbidden content or secrets, verification artifacts present and clean.
- FAIL (reject): unsolvable, misleading instructions, missing verification artifacts, contains forbidden content or secrets, or attempts to bypass verification.
- Conditional (revise): minor clarity or time-estimate adjustments required — reviewer marks `needs_revision` with notes.

REVIEWER CHECKLIST TEMPLATE (concise)

- Metadata: `lab_id`, `version`, `commit`, `author` present.
- Solvability: run verification artifacts; results show PASS and reproducible steps.
- Time estimate: reasonable and verified via sample runs (expected vs observed).
- Concept fit: lab aligns with stated learning objectives.
- Clarity: instructions unambiguous; examples provided if needed.
- Security: no secrets, no external data-loading, no host filesystem access.
- Accessibility & UX: basic accessibility checks and clear error handling.

SHORT REVIEW REPORT TEMPLATE

- Reviewer: <github-id>
- Date: <ISO-8601>
- Lab: <lab-id>@<commit>
- Decision: Approve | Reject | Needs Revision
- Notes: short justification and required changes (if any)

LAB METADATA ADDITIONS (fields & formats)

- `reviewed_by`: string (github handle) — optional until signed.
- `reviewed_at`: ISO-8601 timestamp.
- `review_decision`: enum {approved,rejected,needs_revision}.
- `review_notes`: string (free-form, optional).
- `reviewed_commit`: commit SHA that was reviewed and locked by the sign-off.
- `requires_review`: boolean (flag to trigger manual gate).

---

## E12_Storage_and_Organization.md — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: PostgreSQL (JSONB storage)

- Concept: Relational primary datastore with JSONB columns for full lab definition payloads
- Official source: https://www.postgresql.org/docs/
- Exact version requirement: 18.1
- Why required: Canonical guidance for JSONB indexing, functional indexes, concurrency, and migrations.
- Decision it informs: Table design, index strategy, and migration patterns.
- What breaks without it: Poor indexing/performance, incompatible JSONB assumptions, or unsafe migration practices.

2. Technology: JSON Schema (machine-readable schema)

- Concept: Schema contract for lab definition payloads (validation and example shapes)
- Official source: https://json-schema.org/specification-links.html#2020-12
- Exact version requirement: 2020-12
- Why required: Ensures validator interoperability and precise data contract for API and storage.
- Decision it informs: Validator implementation, QA tests, and CI schema checks.
- What breaks without it: Inconsistent validation across services and increased runtime errors.

3. Technology: OpenAPI / REST API contract

- Concept: API specification for create/read/list/delete operations and pagination
- Official source: https://spec.openapis.org/oas/v3.1.0
- Exact version requirement: OpenAPI 3.1.0
- Why required: Provides canonical request/response shapes, pagination semantics, and example payloads for implementers and clients.
- Decision it informs: API design, client integration, and automated contract tests.
- What breaks without it: Divergent API implementations and fragile integrations.

4. Technology: Backup & Restore / DB Migrations Guidance

- Concept: Backup, restore, and safe migration patterns for Postgres
- Official source: https://www.postgresql.org/docs/current/backup.html
- Exact version requirement: Follow Postgres vendor docs matching deployed version (18.1)
- Why required: Ensures safe schema evolution and recovery strategies for immutable/published lab artifacts.
- Decision it informs: Migration cadence, rolling changes, and disaster recovery.
- What breaks without it: Data loss risk and migration-induced downtime.

5. Technology: Data Protection & Retention (legal)

- Concept: PII handling, retention windows, and access control guidance (GDPR/CCPA)
- Official source: Organization legal policy / GDPR guidance (pin exact doc)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Governs retention, access controls, and purge policies for stored lab definitions and snapshots.
- Decision it informs: Retention periods, access roles, and audit logging requirements.
- What breaks without it: Compliance risk and unclear retention semantics.

---

## E13_Regression_Safety.md — REQUIRED OFFICIAL DOCUMENTATION

1. CI Workflow / GitHub Actions

- Technology / Concept: CI workflow orchestration and workflow triggers
- Official source: https://docs.github.com/en/actions
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Authoritative guidance for event triggers, workflow permissions, and recommended safe patterns for triggering verification jobs on edits.
- Decision it informs: Workflow trigger semantics (push, pull_request, workflow_dispatch), required permissions for snapshot rebuilds, and safe artifact handling.
- What breaks without it: Misconfigured triggers causing missed re-verification or accidental production runs.

2. Snapshot / Artifact Storage & Immutability

- Technology / Concept: Immutable artifact storage and snapshot retention (object storage / S3 semantics)
- Official source: AWS S3 docs (e.g., https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) or equivalent provider docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines durable, immutable storage patterns, lifecycle, and retrieval semantics for preserving prior attempts and snapshots.
- Decision it informs: Snapshot write/replace rules, retention, immutability guarantees, and retrieval APIs for historical attempts.
- What breaks without it: Risk of overwriting or losing prior attempts; inability to prove non-modification.

3. Database Backup & Restore Guidance (Postgres)

- Technology / Concept: Backup & restore best practices for relational DBs
- Official source: https://www.postgresql.org/docs/current/backup.html
- Exact version requirement: Follow repo PostgreSQL pin (see registry) — VERSION MUST MATCH DB engine used (e.g., 18.1)
- Why required: Ensures safe rollback procedures, point-in-time recovery guidance, and constraints for test snapshotting vs production backups.
- Decision it informs: Rollback steps, staging rollback safety, and limits on automated data-migration during verification runs.
- What breaks without it: Unsafe rollback, data loss risk when rebuilding snapshots or reverting published labs.

4. Deployment Patterns (Canary / Blue-Green)

- Technology / Concept: Canary/Blue-Green deployment guidance for safe staged rollout
- Official source: Kubernetes rollout docs or canonical CI/CD patterns (e.g., https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides recommended rollout and rollback strategies for minimizing user impact during lab updates.
- Decision it informs: Staging channel behavior, percentage-based rollouts, and automated rollback triggers on regression detection.
- What breaks without it: Larger blast radius during lab updates and unclear staging semantics.

---

## Notes

- Each extracted block above is verbatim from the feature brief files in the EPIC-E folder. Several entries include "VERSION UNKNOWN — MUST BE PINNED" placeholders; those should be resolved by product/tech owners before implementation.

---

Generated by Docs Gatekeeper extraction on request.

---

## Notes

- Each extracted block above is verbatim from the feature brief files in the EPIC-E folder. Several entries include "VERSION UNKNOWN — MUST BE PINNED" placeholders; those should be resolved by product/tech owners before implementation.

---

Generated by Docs Gatekeeper extraction on request.
