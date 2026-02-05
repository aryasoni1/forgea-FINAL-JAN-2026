# Turborepo — Monorepo Task Orchestration & Caching

## 1. Purpose

Turborepo provides **deterministic task orchestration, dependency-aware scheduling, and build caching** across all workspace packages.

It solves:

- Redundant task execution
- Poor parallelization
- Unbounded CI runtime
- Inconsistent task ordering

Turborepo is treated as **infrastructure**, not developer convenience.

All cross-package tasks MUST flow through Turborepo.

---

## 2. Version Pinning Policy

- **turbo:** Exact version pinned in root `devDependencies`
- **Installation scope:** Workspace root only
- **Invocation:** Workspace-resolved binary only
- **Package manager:** Must match workspace package manager

Pinning is mandatory because:

- Task graph semantics change across versions
- Cache hashing is version-sensitive
- Remote cache compatibility is not guaranteed across majors

### Forbidden

- `latest`
- Floating semver ranges
- Global Turbo installations
- Multiple Turbo versions across environments

The pinned version is authoritative and enforced via the lockfile.

---

## 3. Core Concepts & Rules

- Tasks are discovered from `package.json` scripts
- Execution order is defined by the **task graph**
- Caching is **content-addressed**, not time-based
- Tasks MUST be deterministic to be cacheable
- Outputs MUST be declared for cache restoration

Two graphs exist:

- **Package Graph** — from workspace dependencies
- **Task Graph** — from `turbo.json`

Tasks without outputs cache logs only.

---

## 4. Source-of-Truth Policy

**Authoritative files:**

1. Root `turbo.json`
2. Package `package.json` scripts
3. Workspace lockfile
4. `.turbo/cache` (local cache only)

### Conflict Resolution

- Root `turbo.json` overrides all package configs
- Package-level extensions must not contradict root
- CLI flags do NOT override configuration semantics

All task behavior must be explainable from configuration alone.

---

## 5. Canonical Usage Within This Repo

### turbo.json Rules

- Exactly one root `turbo.json`
- No standalone package pipelines
- Package configs may only extend root

### Canonical Pipeline Structure

- Deterministic task ordering
- Explicit outputs for cacheable tasks
- Non-cached dev/watch tasks only

---

## 6. Approved Commands / Operations

- `turbo run <task>`
- `turbo run <task> --filter=<pkg>`
- `turbo run <task> --affected`
- `turbo run <task> --force`
- `turbo run <task> --dry`

No other orchestration mechanism is approved.

---

## 7. Common Failure Modes

- **Cache hit but missing files**
  - Cause: Outputs not declared
  - Impact: Runtime failures

- **Unexpected cache misses**
  - Cause: Undeclared inputs or env
  - Impact: CI slowdown

- **Incorrect ordering**
  - Cause: Missing `dependsOn`
  - Impact: Invalid builds

- **Non-deterministic tasks**
  - Cause: Time/env dependent behavior
  - Impact: Cache corruption

---

## 8. Troubleshooting Checklist

1. Confirm root `turbo.json` exists
2. Verify task names match scripts
3. Ensure outputs are declared
4. Validate `dependsOn` relationships
5. Check env inputs are declared
6. Run `turbo run <task> --dry`
7. Inspect cache summaries
8. Clear cache only as last resort

Do not proceed until the root cause is identified.

---

## 9. What This Doc Does NOT Cover

- CI vendor configuration
- Docker optimization
- turbo-ignore usage
- Code generation workflows
- Framework conventions
- Release pipelines
- Non-JS build systems
