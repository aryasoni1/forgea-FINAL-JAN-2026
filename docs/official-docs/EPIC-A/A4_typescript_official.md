---
doc_id: typescript-compiler-semantics
tool: TypeScript
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# TypeScript — Compiler Semantics

## Purpose

Governs the behavior of the TypeScript compiler (`tsc`), including configuration inheritance, module resolution strategies, type checking strictness, and project reference constraints.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (TypeScript 5.9.3)

## Scope

- Applies to: `tsconfig.json` configuration, CLI flags, project references (`composite`), and compilation semantics.
- Does NOT apply to: Editor-specific integrations (VS Code behavior) beyond explicit compiler flags, or non-standard transpilers (Babel/SWC) unless strictly referencing interop flags.

## Official Sources (Binding)

- tsconfig.md
- tsconfig2.md
- typescript-project-refrences.md

## Evidence Coverage Matrix

| Policy Area                           | Source URL                      | Version Covered                      | Status  |
| ------------------------------------- | ------------------------------- | ------------------------------------ | ------- |
| Configuration Inheritance (`extends`) | tsconfig.md                     | v2.1+                                | COVERED |
| Strictness Flags                      | tsconfig.md                     | v2.3+                                | COVERED |
| Module Resolution                     | tsconfig.md                     | v1.6 - v5.8                          | COVERED |
| Project References (`composite`)      | typescript-project-refrences.md | v3.0+                                | COVERED |
| Erasable Syntax                       | tsconfig2.md                    | v5.8 (implied via Node 23.6 context) | COVERED |
| Verbatim Module Syntax                | tsconfig2.md                    | v5.0+                                | COVERED |

## Version & Compatibility

- **Tool version:** 5.9.3 (pinned per `/docs/toolchain-versions.md`).
- **Runtime Compatibility:**
  - Node.js v12+ requires `moduleResolution: "node16"` or `"nodenext"` for correct ESM/CJS interop.
  - Node.js v23.6+ supports `erasableSyntaxOnly` mode for direct execution.

## Canonical Rules (Non-Negotiable)

- **Canonical Base Location:** The canonical TypeScript base configuration lives at `forgea-monorepo/packages/config/tsconfig.base.json`. It MUST NOT be relocated.
- **Inheritance Requirement:** All root, app, and package `tsconfig.json` files MUST extend the canonical base config.
- **Allowed Overrides:**
  - MUST NOT override: `target`, `module`, `moduleResolution`, `strict`, `noEmit`, `useDefineForClassFields`, `skipLibCheck`, `incremental`.
  - MAY override: `lib`, `jsx`, `types`, `baseUrl`, `paths` (additive), `outDir`, `rootDir`, `references`.
  - Any other override requires explicit documentation and review.
- **moduleResolution Casing:** `moduleResolution` MUST be set to `"Bundler"` (capital B) everywhere.
- **Configuration Inheritance:**
  - `extends` allows a configuration file to inherit from another; the base file is loaded first, then overridden by the inheriting file.
  - `files`, `include`, and `exclude` from the inheriting file **overwrite** (do not merge with) those from the base config.
  - Relative paths in the base config are resolved relative to the _base config file_.
  - `references` are **excluded** from inheritance.
  - Circularity between configuration files is prohibited.
- **Strictness Hierarchy:**
  - Enabling `strict: true` automatically enables the entire strict family (e.g., `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`).
  - Individual strict flags can be explicitly disabled to override the family setting.
- **Module Resolution:**
  - `moduleResolution: "bundler"` MUST be used with bundlers; it mimics Node.js resolution but permits extension-less imports.
  - `moduleResolution: "node16"` or `"nodenext"` MUST be used for modern Node.js to strictly enforce ESM/CJS rules (requiring extensions on relative imports).
- **Project References (Composite):**
  - A project marked `composite: true` MUST have `declaration: true` enabled (defaults to true).
  - All implementation files MUST be matched by an `include` pattern or listed in `files`.
  - `rootDir` defaults to the directory containing `tsconfig.json` if not explicitly set.
- **Verbatim Module Syntax:**
  - When `verbatimModuleSyntax` is enabled (v5.0+), imports without a `type` modifier are preserved in output; imports with `type` are dropped.
  - This replaces `importsNotUsedAsValues` and `preserveValueImports`.

## Prohibited Configurations

- ❌ **Circular Config Inheritance:** Configuration files MUST NOT extend themselves or form a loop.
- ❌ **Implicit Any (Strict):** If `noImplicitAny` is true (or strict), code relying on inferred `any` types causes compilation errors.
- ❌ **Erasable Syntax Violations:** If `erasableSyntaxOnly` is true, the following constructs are prohibited:
  - `enum` declarations.
  - `namespace` and `module` with runtime code.
  - Parameter properties in classes.
  - `import =` assignments.
- ❌ **Missing Extensions in ESM:** When using `moduleResolution: "node16"` or `"nodenext"`, relative imports MUST include file extensions (e.g., `.js`, `.mjs`),.

## Enforcement

- **Compiler Behavior:**
  - `tsc` exits with error codes on syntax/type violations unless `noEmitOnError` is `false` (default).
  - `tsc --build` acts as if `noEmitOnError` is enabled for all projects.
- **File Inclusion Logic:**
  - `files`: Explicit whitelist; error if file missing.
  - `include`: Glob patterns resolved relative to `tsconfig.json`,.
  - `exclude`: Removes files from `include` result; does NOT prevent inclusion via import statements or `files` list.

## Failure Modes

- **Inconsistent Casing:** If `forceConsistentCasingInFileNames` is true (default), imports with incorrect casing fail build on all OSs (simulating case-sensitive FS).
- **Stale Builds (Composite):** In incremental builds (`tsc -b`), missing a `composite` flag or proper reference dependency prevents upstream projects from rebuilding when downstream types change,.
- **Runtime Import Failure:** Using `allowSyntheticDefaultImports` without `esModuleInterop` may allow compilation but fail at runtime if the target module does not have a default export,.
- **Macro/Decorator Erasure:** If `isolatedModules` or `erasableSyntaxOnly` is enabled, features requiring cross-file analysis (like `const enum`) or runtime emit (decorators without standard support) cause build errors,.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Node.js version dictates `target` and `module` settings).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `module` == "node16" OR "nodenext", enforce explicit extensions on imports.
- If `composite` == true, `declaration` MUST be true.
- `extends` does NOT inherit `references`.
- `exclude` does NOT prevent a file from being part of the compilation if imported by an included file.

## Verification Checklist

- [ ] `tsconfig.json` exists at project root.
- [ ] If `extends` is used, circular references are absent.
- [ ] If target environment is Node.js, `moduleResolution` matches the runtime version (e.g., `nodenext`).
- [ ] `strict` mode is explicitly defined.
- [ ] If using Project References, `composite: true` is set on referenced projects.

## Non-Decisions

- This document does not mandate a specific `target` version (e.g., `es2020` vs `esnext`); this depends on the runtime policy.
- This document does not select a specific package manager.

## Notes

- `tsc -b` (build mode) manages build order and incrementality for project references automatically.
- `skipLibCheck` is recommended to speed up compilation by ignoring types in `node_modules`.
- `ts-node` or other execution engines may require `module: "commonjs"` unless configured for native ESM.
