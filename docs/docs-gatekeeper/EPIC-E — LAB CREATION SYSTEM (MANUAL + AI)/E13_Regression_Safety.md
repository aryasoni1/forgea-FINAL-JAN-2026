FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E13 Regression Safety
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13_Regression_Safety.md
  - /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13*Regression_Safety.md


REQUIRED OFFICIAL DOCUMENTATION

1) CI Workflow / GitHub Actions
- Technology / Concept: CI workflow orchestration and workflow triggers
- Official source: https://docs.github.com/en/actions
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Authoritative guidance for event triggers, workflow permissions, and recommended safe patterns for triggering verification jobs on edits.
- Decision it informs: Workflow trigger semantics (push, pull_request, workflow_dispatch), required permissions for snapshot rebuilds, and safe artifact handling.
- What breaks without it: Misconfigured triggers causing missed re-verification or accidental production runs.

2) Snapshot / Artifact Storage & Immutability
- Technology / Concept: Immutable artifact storage and snapshot retention (object storage / S3 semantics)
- Official source: AWS S3 docs (e.g., https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) or equivalent provider docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines durable, immutable storage patterns, lifecycle, and retrieval semantics for preserving prior attempts and snapshots.
- Decision it informs: Snapshot write/replace rules, retention, immutability guarantees, and retrieval APIs for historical attempts.
- What breaks without it: Risk of overwriting or losing prior attempts; inability to prove non-modification.

3) Database Backup & Restore Guidance (Postgres)
- Technology / Concept: Backup & restore best practices for relational DBs
- Official source: https://www.postgresql.org/docs/current/backup.html
- Exact version requirement: Follow repo PostgreSQL pin (see registry) — VERSION MUST MATCH DB engine used (e.g., 18.1)
- Why required: Ensures safe rollback procedures, point-in-time recovery guidance, and constraints for test snapshotting vs production backups.
- Decision it informs: Rollback steps, staging rollback safety, and limits on automated data-migration during verification runs.
- What breaks without it: Unsafe rollback, data loss risk when rebuilding snapshots or reverting published labs.

4) Deployment Patterns (Canary / Blue-Green)
- Technology / Concept: Canary/Blue-Green deployment guidance for safe staged rollout
- Official source: Kubernetes rollout docs or canonical CI/CD patterns (e.g., https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides recommended rollout and rollback strategies for minimizing user impact during lab updates.
- Decision it informs: Staging channel behavior, percentage-based rollouts, and automated rollback triggers on regression detection.
- What breaks without it: Larger blast radius during lab updates and unclear staging semantics.


EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13_Regression_Safety.md — PARTIAL
  - Gap: Orchestrator output defines plan and roles but contains no Implementer artifacts (workflow files, tests) or Integration Checker runbooks.

- /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13*Regression_Safety.md — PARTIAL
  - Gap: Code-scout lists missing workflow hooks and tests, but no machine-checkable acceptance artifacts.

- /docs/official-docs-registry.md — PARTIAL
  - Gap: Backup & Restore guidance and Docker/CI guidance exist elsewhere, but registry lacks an explicit snapshot/immutable-artifact entry to map to this feature.


DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add or extend before Implementer/QA work:
- `/docs/official-docs/EPIC-E/regression-safety.md` (new)
- `/docs/official-docs/EPIC-E/snapshot-storage.md` (new)
- `/docs/official-docs/EPIC-E/staging-and-rollout.md` (new)
- `/docs/official-docs/EPIC-E/ci-workflows.md` (extend/align with GitHub Actions guidance)


STUDY GUIDE FOR HUMAN

- CI Workflows:
  - Why: Triggers must be well-scoped to avoid accidental production runs; alternatives: manual triggers (slower). Mistakes: granting workflows excessive write permissions or allowing unreviewed `workflow_dispatch`.

- Snapshot Storage & Immutability:
  - Why: Preserving prior attempts is a legal/audit requirement and supports reproducible verification. Alternatives: mutable DB rows (dangerous). Mistakes: overwriting snapshots rather than creating immutable versions.

- Backup & Restore:
  - Why: Recovery and rollback depend on tested backups. Mistakes: relying on ad-hoc exports or assuming snapshots are atomic across subsystems.

- Staging / Rollout:
  - Why: Minimize user impact with staged rollouts and automatic rollback on regressions. Mistakes: skipping canary checks or not automating rollback triggers.


INTERNAL DOCS TO ADD OR EXTEND

1) /docs/official-docs/EPIC-E/regression-safety.md
  - Purpose: Acceptance criteria, required workflow hooks, and verification step definitions for regression safety.
  - Exact knowledge to add: Event-to-action mappings (e.g., lab edit → `ci:verify` job + `snapshot:rebuild`), required permissions, and safe guardrails (no auto-publish without passing verification).
  - Required version pin: Reference CI docs (GitHub Actions) and snapshot storage provider.

2) /docs/official-docs/EPIC-E/snapshot-storage.md
  - Purpose: Canonical snapshot format, storage API, immutability constraints, retention, and retrieval APIs for prior attempts/proofs.
  - Exact knowledge to add: Artifact naming conventions (immutable ids), write semantics (append-only), retention policy, and restore API examples.
  - Required version pin: Object storage provider docs (S3-like) and DB version for metadata storage.

3) /docs/official-docs/EPIC-E/staging-and-rollout.md
  - Purpose: Staging channel design, rollout percentages, canary health checks, and automated rollback triggers.
  - Exact knowledge to add: Staging channel configuration, health-check thresholds, and rollback playbook.
  - Required version pin: CI/CD platform guidance (GitHub Actions / Kubernetes) as applicable.

4) /docs/official-docs/EPIC-E/ci-workflows.md (extend)
  - Purpose: Provide concrete workflow YAML snippets for triggering verification and snapshot rebuilds on lab edit events and PR merges.
  - Exact knowledge to add: Example `workflow` definitions, required secrets/permissions, and test harness invocation commands.
  - Required version pin: GitHub Actions docs reference.


OPEN QUESTIONS / AMBIGUITIES

- What storage provider will hold snapshots (S3-compatible, internal blobstore)? This affects immutability and retention mechanics.
- Is automatic snapshot rebuild allowed on main/published branches, or must it only run in staging until manual approval?
- Are there existing artifact-naming conventions for labs and attempts to reuse or must we define new ones?


MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E13 — Regression Safety
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13_Regression_Safety.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for regression safety, snapshot immutability, and safe rollouts.
