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
