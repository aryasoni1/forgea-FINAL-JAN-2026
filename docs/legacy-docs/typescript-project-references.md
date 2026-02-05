# TypeScript — Project References & Monorepo Usage

## 1. Purpose

TypeScript project references exist to make large TypeScript monorepos **scalable, deterministic, and enforceable**.

Within this monorepo, project references are used to:

- Enforce explicit dependency boundaries between projects
- Prevent circular dependencies and architectural drift
- Enable incremental, graph-based type checking
- Reduce memory usage and execution time in local and CI environments
- Model TypeScript dependencies the same way Node.js packages are consumed

Project references are **mandatory** for any TypeScript code spanning multiple packages or applications in this repository.

---

## 2. Version Pinning Policy

All TypeScript behavior MUST be deterministic.

- **TypeScript:** Exact version pinned in the workspace lockfile
- **Node.js:** Must match the repo-wide pinned Node version
- **tsc invocation:** Workspace-installed `typescript` binary only

Pinning is mandatory because:

- Project reference semantics change across TypeScript versions
- Incremental metadata (`.tsbuildinfo`) is version-sensitive
- Module resolution and emit behavior differ between releases

### Forbidden

- Using editor-bundled TypeScript
- Using `latest` or semver ranges (`^`, `~`)
- Mixed TypeScript versions across projects
- Global `tsc` binaries

TypeScript MUST resolve from `node_modules/typescript`.

---

## 3. Core Concepts & Rules

- Each TypeScript project MUST have its own `tsconfig.json`
- Projects may only import from:
  - Their own source files
  - Explicitly referenced projects
- References form a **directed acyclic graph (DAG)**
- Referenced projects expose **declarations only**
- Source imports across project boundaries are forbidden unless mediated by references

All referenced projects MUST:

- Enable `composite`
- Emit declarations (directly or indirectly)
- Be buildable in isolation

If a project cannot be built independently, the graph is invalid.

---

## 4. Source-of-Truth Policy

**Authoritative files (highest → lowest):**

1. Root `tsconfig.json` (solution graph only)
2. Shared compiler options file (e.g. `tsconfig.options.json`)
3. Project-level `tsconfig.json`
4. `.tsbuildinfo` (incremental state)

### Conflict Resolution

- Project references override implicit imports
- Root `tsconfig.json` defines the complete graph
- Compiler errors override editor behavior

Imports that bypass references are invalid even if they appear to work temporarily.

---

## 5. Canonical Usage Within This Repo

### Root Configuration Rules

The root `tsconfig.json` is a **solution file only**.

Rules:

- No `compilerOptions`
- No `include`
- No source files
- Only `references`

Its sole responsibility is to define the project graph.

---

### Shared Compiler Options

Shared compiler options MUST live in a dedicated file (e.g. `tsconfig.options.json`).

Required properties:

- `composite: true`
- `declaration: true`
- `incremental: true`
- `noEmitOnError: true`

This file defines **policy**, not project behavior.

---

### Project-Level Configuration Rules

**Applications**

- May set `noEmit: true`
- Must still be `composite`
- Must participate in the reference graph

**Packages / Libraries**

- Must emit declarations
- Must NOT emit runtime JS unless explicitly required
- Must never depend on application projects

All projects MUST explicitly declare their references.

---

## 6. Approved Commands / Operations

- `tsc --build`
  Builds and typechecks the full project graph.

- `tsc --build <path>`
  Builds a specific project and its dependencies.

- `tsc --build --verbose`
  Diagnoses graph ordering and rebuild causes.

- `tsc --build --clean`
  Clears incremental outputs safely.

No other TypeScript execution modes are approved for monorepo-wide validation.

---

## 7. Common Failure Modes

- **Import outside project boundary**
  - Cause: Missing or incorrect reference
  - Impact: Hard compiler failure

- **Circular project references**
  - Cause: Bidirectional dependencies
  - Impact: Graph invalidation

- **Missing declarations**
  - Cause: Referenced project not emitting `.d.ts`
  - Impact: Type resolution failure

- **Stale incremental state**
  - Cause: Version mismatch or manual file edits
  - Impact: Incorrect diagnostics

- **Unexpected full rebuilds**
  - Cause: Root config contains source files
  - Impact: CI and local performance regression

---

## 8. Troubleshooting Checklist

1. Confirm every TS project has a `tsconfig.json`
2. Verify `composite: true` is enabled
3. Ensure referenced projects emit declarations
4. Validate reference paths are correct and relative
5. Confirm no circular references exist
6. Delete `.tsbuildinfo` and rerun `tsc --build`
7. Ensure editor uses workspace TypeScript
8. Run `tsc --build --verbose` from repo root

Do not proceed until all steps pass.

---

## 9. What This Doc Does NOT Cover

- ESLint integration
- Build tooling (Vite, Webpack, etc.)
- CI optimization strategies
- Release or versioning workflows
- Runtime module resolution
- Non-reference TypeScript architectures
