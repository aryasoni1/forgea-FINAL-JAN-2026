FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F3 — Lab Template Injection
- Exact input files read (full paths):
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md

---

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema

- Concept: Template manifest / lab-template schema (machine-readable template payload schema)
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12
- Why required: Validate template payload structure (`forgea.config.json` placement, required files, checksum fields) before injection.
- What decision it informs: Acceptance criteria for injected payloads and schema-driven validators.
- What breaks without it: Non-deterministic validation, inconsistent template formats, injection failures across implementers.

2. Technology: Glob / Pathspec (file binding grammar)

- Concept: Locked-path globs used by injection and protection enforcement
- Official source: (choose and pin one implementation: gitignore semantics / minimatch / pathspec) — URL depends on choice
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines exact semantics for locked-path matching across CI, GitHub branch protection, and server-side guards.
- What decision it informs: Which globs are enforceable, how to express locked paths, and edge-case semantics (negations, directory vs file matching).
- What breaks without it: Inconsistent protection, bypassable locked paths, false positives/negatives in enforcement.

3. Technology: JSON Web Signature (JWS) + Ed25519 (EdDSA)

- Concept: Config signature format for `forgea.config.json` provenance and tamper-evidence
- Official source: https://datatracker.ietf.org/doc/html/rfc7515 and https://datatracker.ietf.org/doc/html/rfc8037
- Exact version requirement: RFC 7515 and RFC 8037
- Why required: Tamper-evidence for critical config that must be locked and enforced after injection.
- What decision it informs: Signature verification step in integrity checks and approval workflows.
- What breaks without it: Unverifiable config artifacts, inability to prove provenance for locked configs.

4. Technology: GitHub Branch Protection / Repository Protection (operational guidance)

- Concept: Branch protection rules and API semantics used to enforce locked paths post-injection
- Official source: https://docs.github.com/en/rest/branches/branch-protection
- Exact version requirement: VERSION UNKNOWN — use GitHub REST API v3 semantics (pin at implementation time)
- Why required: Mechanism to enforce that locked files cannot be edited by maintainers/students via PRs.
- What decision it informs: Whether enforcement uses GitHub branch protections, CODEOWNERS, or server-side checks.
- What breaks without it: Locked-path enforcement will be unreliable or require alternate lockdown mechanisms.

---

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md
  - Coverage status: PARTIAL
  - Exact gaps: Planner-level guidance present but no machine-readable schema, no deterministic error codes, and no canonical repo path for `forgea.config.json`.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains `forgea.config.json` management notes and explicitly marks canonical repo path as BLOCKER — no canonical path defined.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: References `forgea.config.json` schema and lock expectations but lacks a published lab-template manifest/schema and locked-path manifest for EPIC-F.

- apps/forgea-admin (built frontend artifacts referencing `baseRepoUrl`)
  - Coverage status: PARTIAL
  - Exact gaps: UI references `baseRepoUrl` but no canonical base template repository exists in source; mismatched visibility vs source artifacts.

- WHAT IS MISSING (repo truths)
  - A concrete base lab template repository or package (none found under `packages/` or `apps/`).
  - No implementation code for repository template injection via the GitHub App.
  - No machine-readable, published template manifest/schema artifact under `/docs/official-docs/`.
  - No deterministic error code specification for rollback behavior.

---

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend/add (minimum):

- `/docs/official-docs/EPIC-F/lab-template-schema.json` (machine-readable JSON Schema for template payload)
- `/docs/official-docs/EPIC-F/locked-paths-manifest.md` (canonical locked-path globs and enforcement semantics)
- `/docs/official-docs/EPIC-E/forgea-config-canonical-path.md` (explicit canonical repo path for `forgea.config.json`)
- `/docs/official-docs/EPIC-F/template-injection-error-codes.md` (deterministic error code map and rollback semantics)

Reason: Without these explicit, versioned docs implementers cannot deterministically validate payloads, enforce locks, or map failures to rollout/rollback actions.

---

STUDY GUIDE FOR HUMAN (CONCISE)

- `JSON Schema (2020-12)`:
  - Why this exists: Validates structure and fields of template payloads.
  - Why alternatives exist: Schemas like OpenAPI are heavier; JSON Schema is standard for data payloads.
  - When NOT to use: For binary-only artifacts or large file trees where manifest-based validation is insufficient.
  - Common mistakes: Not pinning the schema draft version; allowing loose `additionalProperties` that hide missing required fields.

- `Glob / Pathspec`:
  - Why this exists: Deterministic expression of locked paths across systems.
  - Why alternatives exist: Regex-based matchers or explicit path lists — alternatives trade readability for precision.
  - When NOT to use: When exact file-hash based locking is required instead of pattern matching.
  - Common mistakes: Ambiguous negation patterns, mismatched engine semantics between client/CI/server.

- `JWS + Ed25519`:
  - Why this exists: Provide tamper-evidence and provenance for `forgea.config.json`.
  - Why alternatives exist: Detached GPG signatures, PKI-based certificates — alternatives add operational complexity.
  - When NOT to use: Non-critical metadata where provenance is not required.
  - Common mistakes: Failing to pin the signature algorithm/version or not storing signer metadata.

- `Template Manifest (lab-template-schema)`:
  - Why this exists: Declarative list of files, checksums, locked paths, and metadata for injection.
  - Why alternatives exist: Ad-hoc folder copy (fast), but lacks machine validation.
  - When NOT to use: One-off labs that will never be validated or reused.
  - Common mistakes: Missing checksum entries, inconsistent relative paths, and mixing transient build artifacts into the template.

---

INTERNAL DOCS TO ADD OR EXTEND

- `/docs/official-docs/EPIC-F/lab-template-schema.json`
  - Purpose: Machine-readable JSON Schema for lab template payloads.
  - Exact knowledge to add: Required top-level fields (`files[]`, `lockedGlobs[]`, `checksums{}`, `forgea.config.json` placement rules, optional `baseRepoUrl`), sample payload, and validation examples.
  - Required version pin: JSON Schema 2020-12

- `/docs/official-docs/EPIC-F/locked-paths-manifest.md`
  - Purpose: Canonical locked-path globs consumed by injectors and enforcement hooks.
  - Exact knowledge to add: Exact glob engine chosen, canonical list of globs for lab templates, rationale per glob, and enforcement mapping to GitHub protections.
  - Required version pin: Glob engine + version (e.g., minimatch 5.x or pathspec vX) — MUST BE PINNED

- `/docs/official-docs/EPIC-E/forgea-config-canonical-path.md`
  - Purpose: Resolve the BLOCKER in E9 by declaring canonical storage path for `forgea.config.json` (repo root vs /labs/<lab-id>/forgea.config.json).
  - Exact knowledge to add: Canonical path decision, migration plan for existing artifacts, and validation semantics.
  - Required version pin: N/A (policy doc) — must be approved by stakeholders.

- `/docs/official-docs/EPIC-F/template-injection-error-codes.md`
  - Purpose: Deterministic error code map for implementers and rollback orchestration.
  - Exact knowledge to add: Numeric codes, human-readable names, HTTP mapping, and suggested rollback action for each code.
  - Required version pin: N/A — policy doc but must be stable across releases.

---

OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Canonical repository path for `forgea.config.json` remains BLOCKER (refer to `/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md`).
- Ownership: Which EPIC/Team owns the canonical template repo and locked-path manifest (EPIC-E vs EPIC-F)?
- Glob engine: Which exact glob/pathspec implementation should be pinned for consistent server/CI/client behavior?
- Error codes: Approve deterministic numeric assignment for failure modes before Implementer work begins.

---

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-F / F3 — Lab Template Injection
- Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md
- Status: ADDED (EXTEND)
- Reason: Docs Gatekeeper brief enumerating required official docs, locked-path manifest, and implementer handoff for lab template injection.

---

NEXT AGENT HANDOFF (VERBATIM)

You are the Planner / Architect. Use this code-scout report at `docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md` as the factual source.
Do NOT implement code. Using only the repository truths recorded in that report, produce the following (copy-paste-ready outputs for the Implementer agent):

- A precise list of files to include in the lab template payload (paths and short purpose for each file: e.g., README.md — student instructions; tests/ — autograder tests; forgea.config.json — lab metadata; .forgea/ — runtime metadata).
- A definitive glob list of locked paths that must be protected post-injection (exact globs, e.g., `tests/**`, `forgea.config.json`, `.forgea/**`) and a short rationale for each glob.
- Integrity validation rules and failure criteria expressed as boolean checks (e.g., SHA256 checksum presence, presence of required files, no secrets regex matches) and the deterministic error codes to return for common failure modes (e.g., MISSING_FILE=1001, CHECKSUM_MISMATCH=1002, SECRET_LEAK=1003).
- Explicit canonical repository path recommendation for `forgea.config.json` (one of: repo root, `/labs/<lab-id>/forgea.config.json`, or other). If you cannot decide, mark as BLOCKER and list exactly what information you need from stakeholders.
- A concise list of required audit/log entries the Implementer must emit after injection (file list, checksums, protected-branch status, timestamp, injector identity).

Reference: this report documents that a base template repo and injection implementation were not found, and that `E9_forgea.config.json_Management.md` marks the canonical path as a blocker. Your outputs should be strictly deterministic, atomic, and constrained to design decisions (no code or implementation).

Handoff complete. Provide this report verbatim to the next agent.
