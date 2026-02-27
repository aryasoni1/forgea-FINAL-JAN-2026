### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K2 — Virtual File System (FS Abstraction)
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below we list the official source, version requirement (or note), why it's required, what decision it informs, and what breaks without it.

- Technology: Git / Git provider repository tree API
  - Official source: https://docs.github.com/en/rest/reference/git#get-a-tree
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical APIs to enumerate repository trees, shallow vs recursive tree semantics, rate limits, and pagination.
  - Decision it informs: Whether server-side VFS should call provider APIs directly, what API shapes to support, and rate-limit/error handling.
  - What breaks without it: Implementers may use incorrect tree endpoints, cause unintended full-repo downloads, or misunderstand platform constraints leading to data exposure or rate-limit failures.

- Technology: Path traversal / directory traversal guidance (OWASP)
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Canonical threat patterns and mitigations for path normalization, blacklists vs allowlists, and canonicalization pitfalls.
  - Decision it informs: Path-normalization strategy, allowed character sets, and failure modes (reject vs sanitize).
  - What breaks without it: Risk of directory traversal vulnerabilities allowing read of unexpected paths or secret files.

- Technology: POSIX filesystem semantics (symlink behavior)
  - Official source: The Open Group Base Specifications (POSIX) — https://pubs.opengroup.org/onlinepubs/9699919799/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies symlink resolution semantics, expected behavior for lstat/stat, and platform differences.
  - Decision it informs: Whether to support symlink traversal, how to canonicalize paths, and invariant enforcement (no symlink resolution).
  - What breaks without it: Inconsistent symlink handling could allow escapes from intended repo roots or inconsistent behavior across runtimes.

- Technology: URI syntax and normalization (RFC 3986 / WHATWG URL)
  - Official sources: https://datatracker.ietf.org/doc/html/rfc3986 and https://url.spec.whatwg.org/
  - Exact version requirement: RFC 3986 (VERIFIED), WHATWG URL (LIVING STANDARD — MUST BE PINNED)
  - Why required: Guides canonicalization of URL/path segments provided to VFS APIs and percent-encoding rules.
  - Decision it informs: How to validate and normalize incoming path parameters, and whether to accept encoded separators.
  - What breaks without it: Ambiguous input normalization leading to multiple representations of the same path and potential traversal bypass.

### EXISTING INTERNAL DOCS (VERIFIED)

- docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator defines required agents and high-level plan but does not supply the FS contract, invariants, or API surface.

- docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - Coverage status: PARTIAL
  - Exact gaps: Inventory confirms lack of server-side implementation and notes missing task doc; does not supply the required invariant list, API schemas, or acceptance tests.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend and why:
- `/docs/official-docs/EPIC-K/fs_contract.md` — required: add canonical FS contract, invariants (no symlink resolution, explicit path-traversal rejection, per-request/path limits), and API schemas.
- `/docs/tasks/task-K2-<YYYY-MM-DD>.md` — required: planner-architect task spec (implementation-ready) referencing the code-scout and orchestrator outputs.

### STUDY GUIDE FOR HUMAN

- Git / Provider Tree API:
  - Why this exists: Provider APIs are the canonical source of truth for repository trees and metadata.
  - Why alternatives exist: Local git cloning or `libgit2` provide offline access; provider API offers hosted-rate-limited, authenticated access.
  - When NOT to use it: When implementing on-prem or when working with local-only test fixtures; prefer `libgit2` or direct filesystem in those cases.
  - Common mistakes: Assuming recursive tree returns full blob contents, ignoring rate limits/pagination, and not considering private-repo auth scopes.

- Path-normalization & traversal rules:
  - Why this exists: Prevents attackers from crafting paths that escape intended roots.
  - Alternatives: Full allowlist of permitted paths vs blacklist; allowlist is safer.
  - When NOT to use a naive sanitizer: Never rely on simple substring filters (e.g., stripping "..") without canonicalization.
  - Common mistakes: Normalizing with inconsistent encodings, missing Unicode normalization, and ignoring percent-encoded separators.

- Symlink handling:
  - Why this exists: Symlinks can cause repo-root escapes or point to sensitive FS areas.
  - Alternatives: Disallow symlinks entirely (recommended) or resolve symlinks under a strict chroot with review.
  - When NOT to resolve: For multi-tenant or untrusted content, never resolve symlinks automatically.
  - Common mistakes: Resolving symlinks before authorization checks or assuming same behavior across OS.

### INTERNAL DOCS TO ADD OR EXTEND

Only include these if coverage is PARTIAL (it is):

- Path: /docs/official-docs/EPIC-K/fs_contract.md
  - Purpose: Canonical FS contract and API schema for K2 VFS.
  - Exact knowledge to add: Invariants (explicit list), API surface (endpoints, params, responses), rate-limit guidance, canonical failure responses, per-request size/time limits, allowed file types, and testing checklist.
  - Required version pin: `Git provider API` version must be pinned (provider-specific), and reference RFC 3986 / WHATWG URL versioning guidance.

- Path: /docs/tasks/task-K2-<YYYY-MM-DD>.md
  - Purpose: Planner-architect task doc (implementation-ready) — the same deliverable requested by code-scout.
  - Exact knowledge to add: Copy-paste-ready task spec including API schemas, invariants, acceptance tests, expected file/package locations, and required security reviews.
  - Required version pin: N/A (task doc) — must reference pinned official docs where applicable.

### OPEN QUESTIONS / AMBIGUITIES

- Which git provider(s) must be supported initially? (GitHub only, or GitHub + GitLab + self-hosted?)
- Will the VFS service be allowed to fetch full blob contents, or only tree metadata and file-level blobs on demand?
- Which runtime/host will implement the service (existing monorepo service, new service, or serverless)? This affects package placement and auth patterns.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K2 — Virtual File System (FS Abstraction)
- Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
- Status: ADDED (EXTEND)
- Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for the VFS contract and security review.
- Date: 2026-02-14
### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K2 — Virtual File System (FS Abstraction)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - /Users/aryasoni/Desktop/Forgea/docs/toolchain-versions.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below we list the technology, official source, version requirement status, why it is required, what decision it informs, and what breaks without it.

- **Technology:** Git (repository tree semantics)
  - **Concept:** How Git represents trees/blobs and how to enumerate repository trees (git ls-tree, objects)
  - **Official source:** https://git-scm.com/docs
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Defines canonical behavior for listing, filtering, and resolving repository content.
  - **Decision it informs:** API contract for exposing tree listings, canonical path normalization, and caching semantics.
  - **What breaks without it:** Incorrect assumptions about paths, submodules, or packed objects may cause data corruption or information leakage.

- **Technology:** POSIX (symlink and path semantics)
  - **Concept:** Symlink resolution rules, canonicalization, and path traversal semantics
  - **Official source:** https://pubs.opengroup.org/onlinepubs/9699919799/
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Informs invariant: "no symlink resolution" must be implemented consistently across platforms.
  - **Decision it informs:** Server-side enforcement of symlink handling and path traversal rejection.
  - **What breaks without it:** Inconsistent symlink handling could allow bypass of path filters and data-exfiltration.

- **Technology:** HTTP API semantics (RFC 7231)
  - **Concept:** Request/response semantics, status codes, cache control, and safety/idempotency considerations
  - **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
  - **Exact version requirement:** RFC7231 (stable)
  - **Why required:** Ensures API error handling and caching are correct for tree-listing endpoints.
  - **Decision it informs:** Error codes for invalid paths, caching TTLs for repository trees.
  - **What breaks without it:** Wrong caching or error semantics leading to stale or insecure responses.

- **Technology:** Node.js `fs` and platform runtime docs
  - **Concept:** Platform fs behaviors and safe APIs for pathname operations
  - **Official source:** https://nodejs.org/docs/
  - **Exact version requirement:** 20.11.x (per /docs/toolchain-versions.md)
  - **Why required:** If implementation uses Node.js, runtime APIs determine canonical behaviors and available safeguards.
  - **Decision it informs:** Which APIs to use for path checks, atomic reads, and stream-safe operations.
  - **What breaks without it:** Platform-specific behavior mismatches and unsafe fs calls.

- **Technology:** OWASP guidance (path traversal and information leakage)
  - **Concept:** Class of vulnerabilities and mitigation patterns for filesystem and API exposure
  - **Official source:** https://owasp.org/www-project-top-ten/ and https://owasp.org/www-community/attacks/Path_Traversal
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Security controls and threat-modeling guidance for safe tree-listing APIs.
  - **Decision it informs:** Input validation, rejection of traversal attempts, logging and alerting requirements.
  - **What breaks without it:** Implementation may miss common exploitation patterns leading to severe data exposure.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - Coverage status: PARTIAL
  - Exact gaps: Contains execution plan and agent list but does not specify the FS contract invariants or API surface.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
  - Coverage status: PARTIAL
  - Exact gaps: Inventory and risk notes exist; missing a copy-paste-ready task specification with explicit invariants and acceptance criteria.

- /Users/aryasoni/Desktop/Forgea/docs/toolchain-versions.md
  - Coverage status: SUFFICIENT (for runtime version pinning, e.g., Node.js 20.11.x)
  - Exact gaps: Not specific to FS invariants or API requirements.

- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: No explicit master entry for K2; registry must be appended with a short feature listing and references.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Missing explicit official-doc entries for Git tree semantics, POSIX symlink spec, and OWASP path-traversal guidance targeted to K2.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs requiring extension:
- Extend `/docs/official-docs-registry.md` with pinned entries for:
  - Git repository tree semantics (pin the git-scm docs or a specific Git implementation version)
  - POSIX path/symlink spec
  - OWASP path-traversal guidance
  - Node.js runtime docs (verify pinned Node.js 20.11.x)
- Add a new canonical internal doc at `/docs/official-docs/fs-contract-template.md` describing the FS contract (invariants, canonicalization rules).

### STUDY GUIDE FOR HUMAN

- **Git tree semantics**: Why — canonical representation of repository contents; Alternatives — using a filesystem mirror (not recommended for live repos); When NOT to use — when only blob contents are needed without history; Common mistakes — treating file paths as unique IDs across branches or mis-handling submodules.
- **POSIX symlink rules**: Why — to prevent symlink-based escapes; Alternatives — enforce app-level virtual paths; When NOT to use — pure object-store backends with no POSIX layer; Common mistakes — resolving symlinks prematurely or inconsistently across platforms.
- **HTTP API semantics (RFC7231)**: Why — stable error and caching behavior; Alternatives — custom error mapping (avoid); When NOT to use — internal-only RPC systems (use gRPC instead); Common mistakes — returning 200 with error payloads, incorrect cache headers.
- **OWASP path-traversal guidance**: Why — known exploits and mitigations; Alternatives — strong sandboxing + capability checks; When NOT to use — placeholder prototypes without secrets (still follow best practices); Common mistakes — insufficient normalization and logging.

### INTERNAL DOCS TO ADD OR EXTEND

Only when coverage is PARTIAL; recommended canonical paths and content:

- Path: `/docs/official-docs/fs-contract-template.md`
  - Purpose: Provide a reusable FS contract template for all VFS implementations.
  - Exact knowledge to add: required invariants (no symlink resolution, explicit path-traversal rejection, per-request node limits, max recursion depth, size limits), canonical path normalization algorithm, acceptable error codes, and required telemetry/logging points.
  - Required version pin: Node.js 20.11.x (if Node implementation); Git docs pinned to a stable reference (TBD).

- Path: `/docs/tasks/task-K2-<YYYY-MM-DD>.md` (planner-architect deliverable)
  - Purpose: Implementation-ready task doc with acceptance criteria and checklist (this doc should be created by planner-architect; see code-scout handoff for contents).

### OPEN QUESTIONS / AMBIGUITIES

- Implementation runtime and language choice (Node.js assumed; confirm with planner).
- Intended persistence backend for VFS (live Git access vs exported snapshot vs object store).
- Which repository namespaces are in-scope (single repo, org-wide, private-only?)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (exact text below):

```
- EPIC-K — K2 Virtual File System (FS Abstraction): Adds a secure VFS API for listing and reading repository trees with strict invariants (no symlink resolution, path-traversal rejection, per-request limits). See docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md and docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K2_Virtual File System (FS Abstraction).md
```

---

Feature brief prepared by docs-gatekeeper on 2026-02-14.
