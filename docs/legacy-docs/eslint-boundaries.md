# ESLint — Boundary Enforcement & Import Rules

## 1. Purpose

Boundary enforcement exists in this monorepo to **prevent architectural erosion** as the codebase scales.

It ensures that:

- Packages, layers, and domains cannot import from invalid locations
- Cross-project dependencies are explicit and intentional
- Refactors do not silently introduce tight coupling
- The monorepo remains modular, testable, and scalable

ESLint is the **enforcement point**, because violations must be caught **at author time**, not at CI or runtime.

---

## 2. Version Pinning Policy

All linting behavior MUST be deterministic.

- **eslint:** Exact version pinned in the workspace lockfile
- **eslint-plugin-boundaries:** Exact version pinned
- **eslint-plugin-import:** Exact version pinned (if used)
- **Configuration format:** ESLint Flat Config only, if repo-standard

Pinning is mandatory because:

- Rule semantics change across plugin versions
- Resolver behavior is version-sensitive
- Boundary rules must remain stable to avoid false positives or gaps

### Forbidden

- Floating versions (`latest`, `^`, `~`)
- Mixed plugin versions across packages
- Editor-bundled ESLint binaries
- Per-package ESLint binaries

All linting MUST resolve from workspace `node_modules`.

---

## 3. Core Concepts & Rules

- A **boundary** defines which parts of the codebase may depend on others
- Boundaries are enforced by **static import analysis**
- Boundary violations are **errors**, never warnings
- Enforcement is based on **paths and structure**, not runtime behavior

Two enforcement categories exist:

1. **Structural boundaries**
   - layer → layer
   - package → package
   - domain → domain
2. **Import hygiene**
   - unresolved imports
   - cycles
   - invalid paths

---

## 4. Source-of-Truth Policy

**Authoritative files (highest → lowest):**

1. Root `eslint.config.js`
2. Shared ESLint config package (if present)
3. Workspace directory structure

### Conflict Resolution

- Root config overrides all package configs
- Boundary rules override developer convenience
- File system layout is the ultimate source of truth

If ESLint and runtime behavior disagree, **ESLint is correct**.

---

## 5. Boundary Enforcement Tooling

### Primary Tool: eslint-plugin-boundaries

This repo uses **`eslint-plugin-boundaries`** for architectural enforcement.

**Why boundaries**

- Explicit modeling of architectural elements
- Clear allow/deny rules
- Scales cleanly in monorepos
- Enforces intent, not just paths

**Why not only eslint-plugin-import**

- `no-restricted-paths` is path-based, not architectural
- Rules become brittle at scale
- No native concept of domains or layers

`eslint-plugin-import` is used **only** for import correctness, not architecture.

---

## 6. Approved Commands / Operations

- `eslint .`
- `eslint <path>`
- `eslint --fix` (ONLY for non-boundary rules)

Boundary violations MUST NEVER be auto-fixed.

---

## 7. Common Failure Modes

- **Accidental cross-boundary import**
  - Cause: Missing or permissive rule
  - Impact: Tight coupling, refactor risk

- **False positives**
  - Cause: Incorrect element definitions
  - Impact: Developer friction

- **Boundary bypass**
  - Cause: Path aliases not covered
  - Impact: Silent architectural drift

- **Overly permissive defaults**
  - Cause: Default-allow rules
  - Impact: Boundaries become meaningless

---

## 8. Troubleshooting Checklist

1. Verify pinned plugin versions in lockfile
2. Confirm element patterns match directory layout
3. Ensure default policy is `disallow`
4. Validate path alias resolution
5. Check both `from` and `allow` rules
6. Run ESLint from repo root
7. Inspect the violating import literally

Stop immediately if a boundary violation is ignored.

---

## 9. What This Doc Does NOT Cover

- ESLint performance tuning
- Editor-specific configuration
- Formatting rules
- Code style enforcement
- CI wiring
- Runtime dependency validation
- TypeScript project references
