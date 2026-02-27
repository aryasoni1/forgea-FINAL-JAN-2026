## REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable editor permission enforcement the following external docs are required.

- Technology: OpenID Connect Core
  - Concept: Session claims, ID token validation, session lifetimes
  - Official source: https://openid.net/specs/openid-connect-core-1_0.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical session claim semantics consumed by `parseSessionUser()` and session validation in server APIs.
  - Decision informed: Which session claims are authoritative for RBAC and session lifetime checks.
  - Breaks without it: Inconsistent claim handling across services causing auth bypass or denial.

- Technology: OWASP Path Traversal guidance
  - Concept: Path canonicalization, traversal prevention, encoded-path bypasses
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Establishes canonicalization and normalization rules for editor file path validation.
  - Decision informed: Allowed path prefixes, normalization, and rejection criteria for traversal attempts.
  - Breaks without it: Directory-traversal vulnerabilities allowing unauthorized file access.

- Technology: Unicode Normalization (UAX#15)
  - Concept: NFC normalization to avoid canonical-equivalence collisions
  - Official source: https://www.unicode.org/reports/tr15/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Prevents attacker-controlled filename collisions via unicode variants.
  - Decision informed: Normalization applied before path canonicalization and glob matching.
  - Breaks without it: Confusing duplicates, bypasses of locked-paths, audit ambiguity.

- Technology: WHATWG URL Standard / RFC 3986
  - Concept: URL parsing and percent-encoding rules for path segments
  - Official source: https://url.spec.whatwg.org/ and https://datatracker.ietf.org/doc/html/rfc3986
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures server and client canonicalization of `path` and `:lessonId` segments match.
  - Decision informed: Percent-encoding handling, allowed characters, canonical path form.
  - Breaks without it: Mismatched parsing allowing bypass via alternate encodings.

- Technology: Locked-Paths Manifest / Glob semantics
  - Concept: Canonical locked-path glob semantics used to enforce write restrictions
  - Official source: (pick and pin: minimatch / pathspec / gitignore semantics) — VERSION UNKNOWN
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Specifies how lockedGlobs are matched against normalized canonical paths.
  - Decision informed: Which implementations and flags to use for glob matching and precedence.
  - Breaks without it: Inconsistent enforcement across services and editors.
