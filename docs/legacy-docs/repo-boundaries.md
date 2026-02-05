# Repository Boundaries & Ownership Enforcement

## 1. Purpose

This document defines **hard repository boundaries** and **ownership enforcement rules** for this monorepo.

Its goals are to:

- Prevent unintended coupling between teams, domains, and packages
- Make ownership explicit, reviewable, and enforceable
- Preserve architectural integrity as the codebase scales
- Align human accountability with automated enforcement

Boundaries are enforced through **directory structure, linting, ownership rules, and CI** — never trust.

---

## 2. Version Pinning & Behavior Policy

- **GitHub CODEOWNERS:** Behavior follows the current GitHub CODEOWNERS specification
- **Boundary enforcement tooling:** Exact versions MUST be pinned
- **CI enforcement:** Uses stable, non-preview GitHub rulesets only

Pinning is mandatory because:

- CODEOWNERS pattern evaluation is order-dependent and strict
- Linter behavior must match local and CI execution exactly
- Ownership enforcement must be deterministic and auditable

### Forbidden

- Relying on undocumented or assumed GitHub behavior
- Allowing boundary violations via warnings
- Bypassing ownership rules with manual approvals

---

## 3. Core Boundary Rules

### No Cross-Boundary Imports (Hard Rule)

- Packages MUST NOT import code across ownership boundaries
- Shared logic MUST live in explicitly designated shared packages
- Relative imports across domain roots are forbidden
- Path aliases do NOT bypass boundary rules

If a package needs another package’s internals, the architecture is incorrect.

---

### Ownership Is a Security Boundary

- Ownership is **authoritative**, not advisory
- Owners are accountable for all changes under their scope
- At least one owner approval is REQUIRED for changes
- Ownership applies to **directories**, not individuals

---

## 4. Source-of-Truth Hierarchy

**Authoritative sources (highest → lowest):**

1. `CODEOWNERS` on the base branch
2. Repository directory structure
3. Boundary lint rules
4. Branch protection / rulesets

### Conflict Resolution

1. CODEOWNERS rules override informal agreements
2. Linter violations override reviewer approval
3. CI failures block merges regardless of approvals

If ownership or boundaries are unclear, the change MUST NOT merge.

---

## 5. Canonical Usage in This Repo

### CODEOWNERS as the Boundary Definition

- Exactly one authoritative `CODEOWNERS` file
- Rule order matters (last match wins)
- Patterns are case-sensitive
- Negation (`!`) is NOT supported
- Invalid patterns are silently ignored by GitHub

Every boundary-enforced directory MUST have an owner.

---

### Linter Enforcement (Compile-Time Boundary)

- ESLint boundary rules enforce **import-level constraints**
- Violations fail local lint and CI
- Violations MUST be fixed before PR creation

Linter answers:
**“Is this dependency allowed?”**

---

### CODEOWNERS Enforcement (Review-Time Boundary)

- CODEOWNERS enforces **review authority**
- Required owner approval blocks unauthorized merges
- Owners validate intent, not just correctness

CODEOWNERS answers:
**“Who must approve this change?”**

---

## 6. Approved Validation Mechanisms

### Ownership Validation

- GitHub PR ownership indicators
- Required Code Owner review (rulesets)

### Boundary Validation

- `eslint .`
- CI lint jobs enforcing boundary rules

Manual overrides are NOT permitted.

---

## 7. Relationship to Automation & CI

### CI MUST

- Enforce boundary lint rules
- Fail on any cross-boundary import
- Enforce required Code Owner approvals

### CI MUST NOT

- Auto-approve boundary changes
- Modify CODEOWNERS
- Bypass ownership enforcement

---

### Defense-in-Depth Model

| Layer          | Responsibility          |
| -------------- | ----------------------- |
| Repo structure | Physical boundaries     |
| Linter         | Import-time enforcement |
| CODEOWNERS     | Review authority        |
| CI             | Final enforcement       |

All layers must agree for a change to merge.

---

## 8. Common Failure Modes

- **Silent cross-import**
  - Cause: Missing lint rule
  - Impact: Tight coupling

- **Unowned directory**
  - Cause: Missing CODEOWNERS entry
  - Impact: Unauthorized changes

- **Overlapping ownership**
  - Cause: Poor rule ordering
  - Impact: Ambiguous accountability

- **Manual override**
  - Cause: Weak branch protection
  - Impact: Boundary collapse

---

## 9. Troubleshooting Checklist

1. Identify modified paths
2. Resolve effective CODEOWNERS rule (last match)
3. Verify owner permissions
4. Validate boundary lint rules
5. Confirm ruleset enforcement
6. Re-check after rebase or force-push

If any step fails, the PR MUST NOT merge.

---

## 10. What This Doc Does NOT Cover

- Team org structure
- Git branching strategies
- Code review etiquette
- Commit conventions
- CI provider specifics
- Runtime authorization

---

## Appendix — Ownership Is Mandatory

Unowned code:

- Has no accountability
- Can be modified by anyone
- Is a structural defect

**Unowned code is a bug.**
