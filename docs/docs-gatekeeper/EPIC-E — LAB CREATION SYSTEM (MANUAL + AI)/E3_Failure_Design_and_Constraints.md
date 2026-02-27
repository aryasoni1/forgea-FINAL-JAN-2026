FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E3 Failure Design and Constraints
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E3_Failure_Design_and_Constraints.md
  - /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E3*Failure_Design_and_Constraints.md


REQUIRED OFFICIAL DOCUMENTATION

1) Deterministic Test & Failure Design
- Technology / Concept: Deterministic test design and reproducible failure injection
- Official source: https://reproducible-builds.org/ — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines practices and expectations for reproducible experiments (fixed seeds, environment pinning, hermetic fixtures).
- Decision informed: Determinism rules (fixed seeds, disabled network, controlled time sources) and allowed test harness primitives.
- What breaks without it: Non-reproducible failures, flaky labs, inability to assert single-root-cause symptoms.

2) Observability / Logging Standard
- Technology / Concept: Observability semantic conventions (tracing/metrics/logs)
- Official source: https://opentelemetry.io/specs/ — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines canonical observable signals (span attributes, log message formats, error codes) used to map failures → symptoms.
- Decision informed: Symptom selection (log line patterns, error codes) and required telemetry emitted by harnesses.
- What breaks without it: Ambiguous symptoms, inconsistent signal collection, inability to verify single-root-cause mapping.

3) Secrets & Sensitive Data Handling
- Technology / Concept: Secrets management and safe test fixture rules
- Official sources: https://www.vaultproject.io/docs | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html — Exact provider version MUST BE PINNED
- Why required: Ensures designs forbid secrets exposure and specify safe injection/rotation for tests.
- Decision informed: Forbidden failure types (secrets exposure), acceptable fixtures (mock secrets, fixtures that never persist secrets).
- What breaks without it: Risk of leaking credentials or persisting sensitive artifacts.

4) Container / Environment Isolation
- Technology / Concept: Container runtime and process isolation (Docker / Compose) guidance
- Official source: https://docs.docker.com/engine/ — Version: 25.0.x (recommended) OR: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines safe patterns for ephemeral environments, filesystem isolation, and avoiding host-side side-effects.
- Decision informed: Whether tests may mount host paths, allow network access, or require privileged capabilities.
- What breaks without it: Accidental persistence, host contamination, or unsafe fixture usage.


EXISTING INTERNAL DOCS (VERIFIED)

- /docs/official-docs-registry.md — PARTIAL
  - Gap: Registry lists Vault / cloud secret managers and Docker Engine as verified, but does not pin specific provider versions or provide a single guidance doc that maps those docs into lab-failure constraints.

- /docs/toolchain-versions.md — PARTIAL
  - Gap: Mentions deterministic installs and deterministic formatting, but lacks explicit reproducible-test rules (seeds, time control, network blocking) required by Planner spec.

- /docs/official-docs/EPIC-B/docker-secrets.md — PARTIAL
  - Gap: Focuses on secrets in Docker; lacks an explicit section on safe test harness fixtures and forbidden persistence for lab failures.


DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs that must be extended before Planner/QA work continues:
- `/docs/official-docs/EPIC-E/failure-determinism.md` (new doc — see below)
- `/docs/official-docs/observability/opentelemetry-guidelines.md` (extend to prescribe lab-signal formats)
- `/docs/official-docs/EPIC-B/docker-secrets.md` (extend with explicit test-harness fixture rules and forbidden mounts)


STUDY GUIDE FOR HUMAN

- Deterministic Test Design:
  - Why: Guarantees repeatable single-root-cause failures. Alternatives: manual ad-hoc tests (not acceptable). When NOT to use: interactive exploratory sessions. Common mistakes: leaving network/time sources uncontrolled, not fixing RNG seeds.

- Observability / Logging:
  - Why: Provides unambiguous, machine-parseable symptoms. Alternatives: ad-hoc log parsing (fragile). When NOT to use: tiny PoCs without CI verification. Common mistakes: relying on variable text, missing structured fields (error codes, trace ids).

- Secrets Handling:
  - Why: Prevents any test or failure design from exposing secrets or persisting sensitive data. Alternatives: embedding test-only secrets in code (forbidden). When NOT to use: any test that writes credentials to disk. Common mistakes: using real credentials in CI, mounting host secret volumes.

- Environment Isolation (Containers):
  - Why: Ensures labs cannot alter host state or persist across runs. Alternatives: VM snapshots (heavier). When NOT to use: when tests require hardware access. Common mistakes: accidental host mounts, privileged containers.


INTERNAL DOCS TO ADD OR EXTEND

Only the minimal set required to proceed safely:

1) /docs/official-docs/EPIC-E/failure-determinism.md
  - Purpose: Canonical Planner/Architect spec for allowed & forbidden failure types, deterministic rules, and fixture templates.
  - Exact knowledge to add: Bounded lists of allowed failure types + one-line definitions; forbidden list (data loss, secrets exposure) + rationale; mapping allowed type → single observable symptom; determinism rules (seeds, environment variables, disable network, time freeze); required fixture templates and explicit no-persist rules.
  - Required version pin: REFERENCE internal toolchain versions (Node/Docker) — VERSION UNKNOWN — MUST BE PINNED.

2) /docs/official-docs/observability/opentelemetry-guidelines.md
  - Purpose: Define the exact telemetry fields and log formats that lab harnesses must emit for symptom detection.
  - Exact knowledge to add: Span/trace attributes, log message canonical keys (error.code, failure.type, run.id), sampling rules, metric names.
  - Required version pin: OpenTelemetry spec pin — VERSION UNKNOWN — MUST BE PINNED.

3) /docs/official-docs/EPIC-B/docker-secrets.md (extend)
  - Purpose: Add a section prescribing safe test fixture patterns (mock secrets, ephemeral stores) and forbidden behaviors (no host mounts of /etc/credentials, no write-to-disk persistence of secrets).
  - Exact knowledge to add: Example docker-compose snippets for safe harnesses, `tmpfs` usage, and CI cleanup commands.
  - Required version pin: Docker Engine pin — 25.0.x preferred or explicit pin.


OPEN QUESTIONS / AMBIGUITIES

- Exact OpenTelemetry spec version to adopt for lab signal formats.
- Which secrets manager(s) (Vault / AWS / GCP) will be considered canonical for CI harnesses (affects fixture templates).
- Whether Planner should allow read-only network access to internal mocks (affects determinism rules).


MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E3 — Failure Design and Constraints
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E3_Failure_Design_and_Constraints.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for failure design, determinism, secrets handling, and observability.
