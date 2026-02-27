# EPIC-H — REQUIRED OFFICIAL DOCUMENTATION (Combined)

This document aggregates the "REQUIRED OFFICIAL DOCUMENTATION" sections from the EPIC-H gatekeeper briefs.

---

## H1_Verification Job Model

For safe, auditable implementation the following external/authoritative docs must be referenced and pinned before implementation.

- Technology: Prisma (schema & migrate)
  - Concept: Schema modelling, migrations, safe DDL patterns with Prisma Migrate
  - Official source: https://www.prisma.io/docs/concepts/components/prisma-schema
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: PostgreSQL DDL & Transaction semantics
  - Concept: Unique constraints, transactional DDL, index creation, concurrent index build, FK semantics
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: JSON Schema
  - Concept: Verification intake / artifact metadata schema
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12

- Technology: HTTP & Idempotency / Retry Patterns
  - Concept: Idempotency semantics and retry behavior for intake/enqueue endpoints
  - Official source: RFC 7231 (HTTP/1.1 Semantics)
  - Exact version requirement: RFC 7231

---

## H10_Verification API Surface

1. Technology: OpenAPI (OpenAPI 3.1.0)

- Official source: https://spec.openapis.org/oas/v3.1.0
- Exact version requirement: OpenAPI 3.1.0

2. Technology: JSON Schema

- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12

3. Technology: RFC 7231 (HTTP Semantics)

- Official source: https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC 7231

4. Technology: RFC 7807 (Problem Details for HTTP APIs)

- Official source: https://datatracker.ietf.org/doc/html/rfc7807
- Exact version requirement: RFC 7807

5. Technology: RFC 6750 (Bearer Token Usage)

- Official source: https://datatracker.ietf.org/doc/html/rfc6750
- Exact version requirement: RFC 6750

---

## H11_Step-Based Verification Support

- Technology: JSON Schema (Step manifest)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12

- Technology: PostgreSQL DDL & Transaction semantics
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Pathspec / Glob semantics
  - Concept: File-to-step mapping semantics
  - Official source: Choose implementation (gitignore / minimatch / pathspec) and pin
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

## H12_Audit & Observability

- Technology: Telemetry & Tracing (OpenTelemetry or equivalent)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Logging best-practices & structured logs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Metrics naming & ingestion conventions
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Data protection & logging PII guidance
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

## H14_Testing & Validation

1. Technology: JSON Schema
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12

2. Technology: xUnit-style test conventions
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER chosen framework

3. Technology: CI Runner / Workflow docs (example: GitHub Actions)
   - Official source: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED TO chosen CI images

4. Technology: OpenTelemetry (optional)
   - Official source: https://opentelemetry.io/specs/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED IF USED

---

## H2_Job Queue & Scheduling

- Technology: Queue durability & DLQ options (VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION)
- Technology: Locking & concurrency primitives (distributed locks) (VERSION UNKNOWN)
- Technology: Retry & idempotency guidance (VERSION UNKNOWN)
- Technology: HTTP & status-code semantics (RFC 7231)

---

## H3_Runner Isolation

- Technology: Linux Seccomp / BPF
  - Official source: https://www.kernel.org/doc/html/latest/userspace-api/seccomp_filter.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: cgroups v2 (resource control)
  - Official source: https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html

- Technology: OCI Runtime Specification
  - Official source: https://github.com/opencontainers/runtime-spec

- Technology: Container runtime security docs (containerd / runc)

- Technology: AppArmor / SELinux

- Technology: KVM / QEMU (if VM isolation chosen)

- Technology: JSON Schema (for runner API/message schema)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12

---

## H4_Code Checkout & Preparation

1. Technology: Git (core)
   - Official source: https://git-scm.com/docs
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Technology: Git Signed Commits & Tags
   - Official source: https://git-scm.com/docs/git-commit

3. Technology: OpenPGP (RFC 4880)
   - Official source: https://www.rfc-editor.org/rfc/rfc4880

4. Technology: GitHub Branch Protection & Signed Commit Enforcement

5. Technology: KMS / HSM for signing key custody

6. Technology: POSIX / OS-level immutable flags

7. Technology: JSON Schema (manifests)
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12

8. Technology: CI / Runner Isolation & Permissions

---

## H5_Verification Execution

1. Technology: POSIX process model & signals
   - Official source: https://pubs.opengroup.org/onlinepubs/9699919799/
   - Exact version requirement: POSIX.1-2017

2. Technology: JSON Schema
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12

3. Technology: SHA-2 / SHA-256 (FIPS)
   - Official source: https://csrc.nist.gov/publications/detail/fips/180/4
   - Exact version requirement: FIPS 180-4

4. Technology: RFC 3339 (timestamps)
   - Official source: https://datatracker.ietf.org/doc/html/rfc3339
   - Exact version requirement: RFC 3339

5. Technology: OCI Runtime / Container signal semantics

---

## H6_Result Evaluation

- Technology: POSIX Exit Status & Signal Semantics (POSIX)
- Technology: OCI Runtime / Container Exit Semantics
- Technology: JSON Schema (verification CLI output)
- Technology: HTTP / Idempotency & Intake Semantics (RFC 7231)

---

## H7_Artifact Collection

- Technology: Data retention & legal compliance (VERSION UNKNOWN)
- Technology: Cryptographic hashing & signing guidance (VERSION UNKNOWN)
- Technology: Sensitive data redaction & PII handling (VERSION UNKNOWN)

---

## H9_Failure & Abuse Handling

1. Technology: NIST SP 800-92 (Computer Security Incident Handling Guide)
   - Official source: https://csrc.nist.gov/publications/detail/sp/800-92/rev-1
   - Exact version requirement: SP 800-92 Rev-1

2. Technology: OpenTelemetry (metrics/traces/logs)
3. Technology: Linux Audit (auditd) / OS Audit APIs
4. Technology: OpenPGP / KMS signing guidance (RFC 4880)
5. Technology: JSON Schema (manifests & audit record schema)
6. Technology: Privacy / Pseudonymization Guidance (jurisdictional)

---

End of combined extraction.
