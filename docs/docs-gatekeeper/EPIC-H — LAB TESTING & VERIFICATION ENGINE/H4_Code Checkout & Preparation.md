FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H4_Code Checkout & Preparation
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Git (core)
   - Concept: SHA-based checkout semantics, ref formats, clone/fetch behaviors
   - Official source: https://git-scm.com/docs
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines authoritative behaviour for resolving commit SHAs, shallow vs full clones, refspecs and fetch semantics used for pinned checkouts.
   - Decision it informs: Allowed ref formats, whether shallow clones are acceptable, required git options for atomic checkouts.
   - What breaks without it: Inconsistent checkout results, non-reproducible builds, ambiguous ref resolution.

2. Technology: Git Signed Commits & Tags
   - Concept: Git native support for signed commits and tags; verification flows
   - Official source: https://git-scm.com/docs/git-commit (gpg-signing) and https://git-scm.com/docs/git-tag
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Establishes canonical verification commands and signature pointers (commit vs tag) and signer trust chains.
   - Decision it informs: Whether to accept signed commits only, whether to prefer signed tags, verification order.
   - What breaks without it: Ambiguous trust boundaries; acceptance of unsigned artifacts.

3. Technology: OpenPGP (signing spec)
   - Concept: Signature format and canonical verification (OpenPGP)
   - Official source: RFC 4880 — https://www.rfc-editor.org/rfc/rfc4880
   - Exact version requirement: RFC 4880
   - Why required: Defines signature formats that Git/GPG use for commit/tag verification and interoperability constraints.
   - Decision it informs: Allowed signature algorithms, canonical verification expectations.
   - What breaks without it: Incompatible verification tools, misinterpreted signatures.

4. Technology: GitHub Branch Protection & Signed Commit Enforcement
   - Concept: Provider-side enforcement of signed commits, required status checks and protected-branch rules
   - Official source: https://docs.github.com/en/repositories/configuring-branches-and-merges/about-protected-branches
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: To design runtime enforcement and CI gating that aligns with provider capabilities.
   - Decision it informs: Enforcement location (provider vs runner), required webhook signals, rejection modes.
   - What breaks without it: Mismatched enforcement semantics; inability to rely on provider-enforced invariants.

5. Technology: KMS / HSM for signing key custody
   - Concept: Cloud KMS / HSM key usage patterns and signing APIs (e.g., AWS KMS, GCP KMS, HashiCorp Vault Transit)
   - Official source: HashiCorp Vault https://www.vaultproject.io/docs and provider KMS docs (AWS KMS/GCP KMS)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines how private keys are stored, used for signing, audited, and rotated.
   - Decision it informs: Key storage architecture, signing delegation, rotation policy.
   - What breaks without it: Unsound key custody assumptions; inability to audit or rotate signing keys safely.

6. Technology: POSIX / OS-level immutable flags (file protection)
   - Concept: Filesystem immutability primitives and their semantics (e.g., chattr, chflags)
   - Official source: POSIX / platform manpages (e.g., macOS `chflags`, Linux `chattr`) — VERSION UNKNOWN
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: To specify OS-level enforcement options that prevent runner-process mutation of locked files.
   - Decision it informs: Enforcement mechanism (OS flags vs git hooks vs CI gate).
   - What breaks without it: Relying solely on in-process checks that can be bypassed by malicious runners.

7. Technology: JSON Schema (manifests)
   - Concept: Machine-readable manifest schema for verification artifacts and lock manifests
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12
   - Why required: Ensures deterministic parsing and validation of manifest files that record pinned SHAs, checksums, and metadata.
   - Decision it informs: Manifest field names, versioning, schema validation tooling.
   - What breaks without it: Incompatible manifest formats leading to verification failures.

8. Technology: CI / Runner Isolation & Permissions (example: GitHub Actions)
   - Concept: Runner permission model, token scoping, workspace protection features
   - Official source: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions and runner docs
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: To design enforcement and rollback behavior compatible with runner capabilities.
   - Decision it informs: Whether OS-level protections are possible; required privileges for verification steps.
   - What breaks without it: Implementations assuming unavailable privileges on managed runners.

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains high-level orchestration and agent assignment but no implementation-ready checkout rules, verification order, or file paths for artifacts.

- /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts and risks but does not specify canonical manifest layout or enforcement primitives.

- /docs/official-docs/EPIC-H/ (directory currently absent or lacking specific files)
  - Coverage status: INSUFFICIENT
  - Exact gaps: No canonical `checkout-by-sha` spec, no locked-file enforcement doc, no verification artifact manifest.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend or add:
- `/docs/official-docs/EPIC-H/checkout_by_sha_spec.md` — add exact pinning rules, allowed refs, fetch/cloning guidance.
- `/docs/official-docs/EPIC-H/verification_artifacts_manifest.md` — add canonical manifest schema, storage paths, and verification order.
- `/docs/official-docs/EPIC-H/locked_file_protections.md` — enumerate OS-level, git-level, and CI-level enforcement options and tradeoffs.

STUDY GUIDE FOR HUMAN (CONCISE)

- `Git (core)`:
  - Why: Source-of-truth for resolving SHAs and ref semantics.
  - Alternatives: Other VCS (Mercurial) — only relevant if supporting non-git repos.
  - When NOT to use: Never substitute local ref names for SHAs in security-critical checkouts.
  - Common mistakes: Accepting lightweight/ref names without verifying final SHA.

- `OpenPGP / Git signed commits`:
  - Why: Provides cryptographic provenance on commits/tags.
  - Alternatives: SSH commit signing / CI-signed artifacts — useful where OpenPGP is not available.
  - When NOT to use: For ephemeral developer-only proofs where transport-level TLS suffices.
  - Common mistakes: Verifying tag signature but trusting unsigned commit it points to.

- `KMS / HSM`:
  - Why: Secure key custody and auditable signing.
  - Alternatives: Local private keys (not recommended), hardware tokens.
  - When NOT to use: Prototype/dev runs where KMS is not provisioned (but then treat as non-production).
  - Common mistakes: Storing private keys inline in repo or secrets manager without rotation/audit.

- `OS-level immutability`:
  - Why: Harder to tamper with locked files at runtime.
  - Alternatives: CI gate or kernel-level mandatory access control.
  - When NOT to use: Managed ephemeral runners that do not expose chflags/chattr.
  - Common mistakes: Relying on `chmod` alone or relying on checks that run after mutation.

INTERNAL DOCS TO ADD OR EXTEND (DETAILS)

1. Path: `/docs/official-docs/EPIC-H/checkout_by_sha_spec.md`
   - Purpose: Canonical, implementation-ready checkout rules for pinned SHAs.
   - Exact knowledge to add: SHA format constraints; allowed ref expressions (exact SHAs only); fetch and clone options (depth, single-branch, no-tags), canonical git command invocations, timeout/retry semantics, and acceptance of annotated vs lightweight tags.
   - Required version pin: Git client version (EXACT) — VERSION UNKNOWN placeholder until CI image is selected.

2. Path: `/docs/official-docs/EPIC-H/verification_artifacts_manifest.md`
   - Purpose: JSON Schema and canonical storage layout for verification artifacts (manifests, checksums, signature bundles).
   - Exact knowledge to add: JSON Schema (2020-12) for manifest, canonical verification order (commit SHA -> commit signature -> tag signature -> artifact checksums), and canonical artifact paths under `/.forgea/verification/`.
   - Required version pin: JSON Schema 2020-12

3. Path: `/docs/official-docs/EPIC-H/locked_file_protections.md`
   - Purpose: Enumerate mechanisms to make repo files immutable for runners with tradeoffs and CI gating patterns.
   - Exact knowledge to add: OS-level commands per supported runner OS (`chflags uchg`, `chattr +i`), git-level protection patterns, CI job permission models, rollback and blocking behavior on mutation detection, and detection logging schema.
   - Required version pin: Platform manpages / CI provider docs — VERSION UNKNOWN until OS/CI selection.

OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which VCS providers must be supported (GitHub only, or GitLab/Bitbucket)?
- Where will signing keys be stored (Cloud KMS, Vault, HSM)?
- What Git client versions are target CI images and runners using?
- Which runner OS families are in use (Ubuntu, macOS, Windows)?
- Is provider-enforced signed-commit checks required or optional for rollout?

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-H / H4 — Code Checkout & Preparation
  - Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief identifying required official docs, internal doc gaps, and registry updates for secure, atomic checkouts.
