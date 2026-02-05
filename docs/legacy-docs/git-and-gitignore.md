# Git & .gitignore — Repository Policy Reference

## 1. Purpose

This document defines **how Git and `.gitignore` are used in this monorepo**.

Its goals are to:

- Ensure deterministic repository state across machines
- Prevent accidental commits of generated or secret files
- Keep the Git index clean and reviewable
- Standardize ignore behavior across a monorepo

This is an **internal policy and reference**, not a Git tutorial.

---

## 2. Version & Behavior Policy

- **Git:** ≥ 2.40 recommended
- **Behavioral assumptions:** Based on modern Git `.gitignore` specification

Pinning matters because:

- Ignore precedence is strict and version-defined
- Hook and attribute behavior varies in older versions
- Modern Git features are assumed

### Forbidden

- Relying on undocumented Git behavior
- Using editor-managed Git with unknown versions

---

## 3. Core Rules

### Git Is the Source of Truth

- The index defines reality
- `.gitignore` only affects **untracked files**
- Tracked files are never ignored retroactively

### Ignore Precedence (Highest → Lowest)

1. Command-line rules
2. Local `.gitignore` (nearest directory wins)
3. `.git/info/exclude`
4. Global excludes (`core.excludesFile`)

### Design Rules

- Shared rules → root `.gitignore`
- Personal/editor rules → global excludes
- Repo-specific but unshared rules → `.git/info/exclude`

---

## 4. Source-of-Truth Files

**Authoritative**

- Root `.gitignore`
- Scoped `.gitignore` files (only when justified)
- `.gitattributes` (when applicable)

### Conflict Resolution

- Deeper `.gitignore` overrides parent
- Last matching rule wins
- Negation cannot re-include ignored directories

If Git status is unexpected, **the ignore rules are wrong**.

---

## 5. Canonical Ignore Policy

### Required Root Ignore Patterns

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
out/
coverage/
.turbo/
.next/
.cache/

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Environment
.env
.env.*
!.env.example

# OS / Editor
.DS_Store
Thumbs.db
.idea/
.vscode/
*.swp

# Temporary
tmp/
temp/
Monorepo-Specific Rules
packages/*/dist/
packages/*/build/
apps/*/.next/
apps/*/dist/
.eslintcache
6. Allowed vs Forbidden
Allowed
Root .gitignore for shared rules

Scoped .gitignore when unavoidable

Explicit negation for tracked files

Forbidden
Ignoring source directories

Ignoring lockfiles

Ignoring config affecting builds

Blanket ignores without re-includes

7. Approved Git Operations
Inspection
git status

git check-ignore -v <path>

git ls-files --others --ignored --exclude-standard

Correction
git rm --cached <file>

git restore --staged <file>

Validation
git diff --stat

git diff --name-only

No Git command may be aliased to alter ignore behavior.

8. Common Failure Modes
Ignored but tracked

Cause: .gitignore misunderstanding

Impact: Leaked artifacts

Over-broad ignore

Cause: ** misuse

Impact: Missing source

Secrets committed

Cause: Late ignore rules

Impact: Security incident

9. Troubleshooting Checklist
Confirm file is untracked

Run git check-ignore -v

Identify matching rule

Check ignored parents

Verify rule order

Remove from index if tracked

Re-check status

Git always explains why a file is ignored.

10. What This Doc Does NOT Cover
Branching strategy

Commit conventions

Rebasing policy

Submodules

LFS

CI Git behavior

Editor Git integrations

```
