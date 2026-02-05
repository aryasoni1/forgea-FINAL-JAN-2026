---
doc_id: node-runtime-policy
tool: Node.js
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Node.js — Runtime Policy

## Purpose

Governs the selection of Node.js release lines for production and development environments, and defines the relationship between the runtime and bundled tooling (Corepack).

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: CLASS-BASED RULE (LTS-ONLY)

## Scope

- Applies to: Node.js runtime versions, release lifecycles, and bundled Corepack availability.
- Does NOT apply to: Specific package manager behaviors (npm/yarn/pnpm) unless bridged by the runtime.

## Official Sources (Binding)

- Corepack.md
- nodejs-previous-releases.md
- nvm-readme.md
- volta.md

## Evidence Coverage Matrix

| Policy Area                 | Source URL                  | Version Covered     | Status  |
| --------------------------- | --------------------------- | ------------------- | ------- |
| Release Lifecycle (LTS)     | nodejs-previous-releases.md | v0 - v25            | COVERED |
| Production Eligibility      | nodejs-previous-releases.md | General             | COVERED |
| Corepack Bundling           | Corepack.md                 | v14.19.0 - <v25.0.0 | COVERED |
| Version Enforcement (nvm)   | nvm-readme.md               | v0.40.4             | COVERED |
| Version Enforcement (Volta) | volta.md                    | Undefined           | COVERED |

## Version & Compatibility

- **Release Status (per Source):**
  - **Current:** v25
  - **Active LTS:** v24
  - **Maintenance LTS:** v22, v20
  - **End-of-life (EoL):** v23, v21, v19, v18, v17, v16, v15, v14, v13, v12, v11, v10, v9, v8, v7, v6, v5, v4, v0
- **Supported Architectures:**
  - **Apple Silicon:** Full support added in v16.0; experimental in v15.3.
  - **Alpine Linux:** Incompatible with standard pre-compiled binaries (glibc vs musl).

## Canonical Rules (Non-Negotiable)

- **Production Environment Constraint:** Production applications MUST use "Active LTS" or "Maintenance LTS" releases.
- **Odd-Numbered Release Lifecycle:** Odd-numbered releases become unsupported after six months.
- **LTS Duration:** Long-term support (LTS) typically guarantees critical bug fixes for a total of 30 months.
- **Corepack Availability:** Corepack is distributed with Node.js from version 14.19.0 up to (but not including) 25.0.0.
- **Apple Silicon Requirement:** For versions prior to v16.0 on Apple Silicon, the runtime MUST be compiled targeting x86_64 Intel architecture (via Rosetta 2) or use specific compilation flags,.

## Prohibited Configurations

- ❌ **Production use of "Current" status releases:** Explicitly restricted to Active/Maintenance LTS.
- ❌ **Standard binary installation on Alpine Linux:** `nvm install` of standard binaries on Alpine fails due to musl/glibc incompatibility.
- ❌ **Corepack invocation on Node.js v25+:** Corepack is distributed only up to (but not including) v25.0.0.

## Enforcement

- **Runtime Selection (nvm):**
  - Controlled via `.nvmrc` file containing a version number or alias (e.g., `lts/*`),.
  - Directory traversal looks upwards for `.nvmrc`.
- **Runtime Selection (Volta):**
  - Controlled via `package.json` "volta" field (e.g., `"volta": { "node": "20.16.0" }`).
  - Pinned using `volta pin node@<version>`.
- **Corepack Gatekeeping:**
  - Enabled via `corepack enable`.
  - Strictly enforces package manager versions via `packageManager` field in `package.json`.
  - Strictness configurable via `COREPACK_ENABLE_STRICT` (defaults to error on mismatch if not 0).

## Failure Modes

- **Lifecycle Expiry:** Odd-numbered releases receive no support after six months; EOL releases receive no security updates.
- **Architecture Mismatch (Alpine):** Invoking standard Node binaries results in "...does not exist" errors.
- **Architecture Mismatch (Apple Silicon):** Older versions (<v16) produce compilation errors or out-of-memory errors unless run via Rosetta.
- **Corepack Strictness:** If `packageManager` is defined and `COREPACK_ENABLE_STRICT` is active (default), using a mismatched package manager throws an error.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/package-manager-policy.md` (implied by Corepack constraints)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- Map "Production" environment to `status IN ["Active LTS", "Maintenance LTS"]`.
- If Node version >= 25.0.0, Corepack is NOT bundled.
- If OS == "Alpine Linux", standard `nvm install` command is INVALID; requires source compilation (`-s`).
- If OS == "macOS" AND CPU == "arm64" AND Node < 16.0.0, execution context MUST be Rosetta (x86_64).

## Verification Checklist

- [ ] Production target matches Active or Maintenance LTS release line.
- [ ] If using Corepack, Node.js version is between 14.19.0 and 24.x.
- [ ] `.nvmrc` or `package.json` (Volta) explicitly defines the version.

## Non-Decisions

- This document does not select a specific version manager (nvm vs Volta); it documents rules for both.
- This document does not define the default package manager (npm/yarn/pnpm).

## Notes

- Node.js v25 is listed as "Current" in sources but is excluded from Corepack distribution,.
- `nvm` treats `lts/*` as a valid alias for the latest LTS version.
- Volta stores pinned tool versions in `package.json`, allowing version control commit.
