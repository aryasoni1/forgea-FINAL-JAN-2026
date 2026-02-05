---
doc_id: typescript-tsconfig-guidelines
tool: TypeScript
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# TypeScript — TSConfig Guidelines

## Purpose

Governs the structure, inheritance logic, compiler options, and file inclusion strategies defined within `tsconfig.json` files for TypeScript projects.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: `tsconfig.json` files, `jsconfig.json` files, CLI compiler flags, and build mode (`-b`) behavior.
- Does NOT apply to: Editor-specific settings (VS Code) not reflected in the config file, or third-party transpiler behaviors (Babel/SWC) unless explicitly referenced via interop flags.

## Official Sources (Binding)

- tsconfig.md
- tsconfig2.md
- typescript-project-refrences.md

## Evidence Coverage Matrix

| Policy Area                               | Source URL                | Version Covered | Status  |
| ----------------------------------------- | ------------------------- | --------------- | ------- |
| Inheritance (`extends`)                   | tsconfig.md               | v2.1+           | COVERED |
| File Inclusion (`files`/`include`)        | tsconfig.md               | v2.0+           | COVERED |
| Module Resolution                         | tsconfig.md               | v1.6 - v5.8     | COVERED |
| Strict Mode                               | tsconfig.md               | v2.3+           | COVERED |
| Syntax Constraints (`erasableSyntaxOnly`) | tsconfig2.md              | v5.8+           | COVERED |
| Emit Behavior                             | tsconfig.md, tsconfig2.md | General         | COVERED |

## Version & Compatibility

- **Tool version:** Sources cover features up to TypeScript 5.8 (e.g., `node18` module mode replacement, `erasableSyntaxOnly`).
- **Runtime Compatibility:**
  - Node.js v23.6+ supports running TypeScript directly if `erasableSyntaxOnly` constraints are met.
  - `module: "nodenext"` implies `target: "esnext"`.

## Canonical Rules (Non-Negotiable)

- **Configuration Inheritance:**
  - A `tsconfig.json` may inherit from another via `extends`.
  - The base configuration is loaded first, then overridden by the inheriting file.
  - `files`, `include`, and `exclude` fields in the inheriting file **overwrite** (do not merge with) the base configuration.
  - Relative paths in the base configuration are resolved relative to the **base file**.
  - `references` are explicitly excluded from inheritance.
- **File Inclusion Semantics:**
  - `files` is an explicit allowlist; compilation fails if a file listed here is missing.
  - `include` specifies glob patterns relative to the config file.
  - `exclude` only filters the results of `include`; it does **NOT** prevent a file from being included if it is imported by code or listed in `files`.
- **Strict Mode Family:**
  - Setting `strict: true` enables a suite of checks (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, etc.).
  - Individual strict flags can be disabled in the same config to override the `strict` default.
- **Module Resolution:**
  - `moduleResolution: "node16"` or `"nodenext"` MUST be used for modern Node.js support (enforcing extensions on relative imports).
  - `moduleResolution: "bundler"` allows extension-less imports but mimics Node resolution for `exports`/`imports`.
- **Verbatim Module Syntax:**
  - When `verbatimModuleSyntax` is enabled (TS 5.0+), imports/exports **without** the `type` modifier are preserved in output; those **with** the `type` modifier are dropped.
- **Output Structure:**
  - `rootDir` defaults to the longest common path of non-declaration input files.
  - TypeScript refuses to write files outside the `outDir`.

## Prohibited Configurations

- ❌ **Circular Inheritance:** Configuration files MUST NOT create a circular dependency chain via `extends`.
- ❌ **Legacy Module Resolution:** `moduleResolution: "classic"` MUST NOT be used.
- ❌ **Erasable Syntax Violations (if enabled):** When `erasableSyntaxOnly` is true, the following are prohibited: `enum`, `namespace`, `module` (with runtime code), parameter properties, and `import =` assignments.
- ❌ **Deprecated Options:**
  - `out` (replaced by `outFile`).
  - `charset` (replaced by UTF-8 default).
  - `keyofStringsOnly` (legacy behavior).
  - `noStrictGenericChecks`.
- ❌ **Misleading Exclusions:** Do NOT rely on `exclude` to prevent file compilation if the file is imported by an included file.

## Enforcement

- **Compiler validation:**
  - `tsc` exits with error if `files` entries are missing.
  - `tsc` exits with error on casing mismatches if `forceConsistentCasingInFileNames` is true.
- **Strictness:**
  - `noImplicitAny` raises errors for inferred `any` types.
  - `noImplicitOverride` enforces the `override` keyword on subclass methods.
  - `noUncheckedIndexedAccess` forces handling of `undefined` for index signature lookups.
- **Emit Prevention:**
  - `noEmitOnError: true` prevents generating JavaScript/Declaration files if any type errors exist.

## Failure Modes

- **Runtime Import Failure:** Using `moduleResolution: "node16"` without file extensions in imports causes runtime errors in Node.js.
- **Overwritten Settings:** Defining `files` in an extending config completely discards the base config's `files` list, potentially breaking the build if expected files are dropped.
- **Case Sensitivity:** If `forceConsistentCasingInFileNames` is false (or default on some OSs), builds may succeed locally but fail on case-sensitive CI environments.
- **Stale output:** If `noEmitOnError` is false (default), invalid code may be emitted and executed, leading to runtime crashes.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Node version dictates `target` and `module` settings).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `extends` is present, treat `files`/`include`/`exclude` as REPLACEMENT, not MERGE.
- If `module` is `node16` or `nodenext`, validation MUST ensure import paths include extensions.
- `strict: true` implies `noImplicitAny: true`, `strictNullChecks: true`, etc., unless explicitly set to `false`.
- `erasableSyntaxOnly: true` implies `enum` is illegal.

## Verification Checklist

- [ ] `tsconfig.json` is present in the project root.
- [ ] `extends` paths are valid and non-circular.
- [ ] `strict` is explicitly defined (true/false).
- [ ] `moduleResolution` aligns with the target environment (Bundler vs Node).
- [ ] `forceConsistentCasingInFileNames` is set to `true`.

## Non-Decisions

- This document does not mandate a specific `target` ECMAScript version (e.g., ES2020 vs ESNext).
- This document does not define specific `paths` aliases.

## Notes

- `tsc -b` (build mode) acts as if `noEmitOnError` is enabled for all projects.
- `skipLibCheck` is recommended to save compilation time by skipping checks in declaration files (often `node_modules`).
- `module: "preserve"` (TS 5.4+) preserves import/export syntax for bundlers/Bun.
