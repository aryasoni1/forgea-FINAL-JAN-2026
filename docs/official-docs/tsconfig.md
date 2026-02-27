# TypeScript Configuration Strategy for Monorepos

## Overview

This document describes the TypeScript configuration strategy for the Forgea monorepo, which uses **Project References** and **workspace symlinks** instead of the `paths` compiler option.

## Architecture

The Forgea monorepo uses a solution-style root `tsconfig.json` combined with TypeScript Project References to ensure consistent type checking and proper package resolution across all workspace packages.

### Why Not `paths`?

While it may seem convenient to use the `paths` compiler option to map workspace packages (e.g., `"@forgea/schema": ["packages/schema"]`), this approach has significant drawbacks:

1. **Overrides Package Resolution** — `paths` bypasses the `main`, `types`, and `exports` fields in `package.json`, causing runtime failures when code relies on correct export points
2. **Editor Inconsistency** — IDEs may resolve imports differently from the runtime, leading to "works locally, fails in CI" scenarios
3. **Build Tool Incompatibility** — Bundlers and runtime environments don't respect `paths`, causing code to work in TypeScript but fail after compilation

The recommended approach is to use **package manager workspaces** (pnpm symlinks all packages into `node_modules`) combined with **TypeScript Project References** for proper type checking.

## Root tsconfig.json

The root `tsconfig.json` uses a solution-style configuration with no `include` array:

```json
{
  "files": [],
  "references": [
    { "path": "./apps/forgea-admin" },
    { "path": "./apps/forgea-labs" },
    { "path": "./apps/forgea-learn" },
    { "path": "./apps/forgea-lessons" },
    { "path": "./packages/audit" },
    { "path": "./packages/config" },
    { "path": "./packages/design" },
    { "path": "./packages/markdown" },
    { "path": "./packages/schema" },
    { "path": "./packages/ui" },
    { "path": "./services/api-core" },
    { "path": "./services/content-engine" },
    { "path": "./services/verification-runner" }
  ]
}
```

**Key Point:** The root `tsconfig.json` does NOT include `apps/` in an `include` array. Each application must have its own `tsconfig.json`.

## Individual Package Configuration

Each app, package, or service must have its own `tsconfig.json` in its root directory.

### Example: Shared Library (packages/schema)

```json
{
  "compilerOptions": {
    "composite": true,
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

**Important:** The `composite: true` setting must be enabled for packages that are referenced by other packages (via `references` in their `tsconfig.json`).

### Example: Application (apps/forgea-labs)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../../packages/schema" },
    { "path": "../../packages/config" },
    { "path": "../../packages/ui" }
  ]
}
```

When an app has dependencies on shared packages, those packages are listed in the `references` array.

## Package Resolution

With this setup:

1. **pnpm creates symlinks** in `node_modules/@forgea/` for all workspace packages
2. **TypeScript resolves imports** via package.json `main` and `types` fields (not `paths`)
3. **Editors and bundlers** see consistent import resolution
4. **Type checking** is incremental and fast due to Project References

### Example Import

```typescript
// In apps/forgea-labs/src/main.ts
import { createClient } from "@forgea/schema"; // Resolved via pnpm symlink to packages/schema
```

TypeScript:

- Finds `@forgea/schema` in `node_modules/@forgea/schema/` (pnpm symlink)
- Reads `package.json` to find `types` or `main` field
- Loads the `.d.ts` file from the compiled output

This is the same resolution process used by Node.js at runtime, ensuring consistency.

## Build and Type-Checking

### Type Checking All Projects

```bash
tsc --build
```

This command uses the root `tsconfig.json` and builds all referenced projects incrementally.

### Type Checking Single Project

```bash
cd packages/schema
tsc
```

This checks only the schema package and its dependencies.

### Watch Mode

```bash
tsc --build --watch
```

Enables watch mode for incremental compilation.

## Path Aliases Within Single Project

Path aliases are fine for convenience within a single project:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
  }
}
```

These internal aliases should match bundler configuration (Webpack, Vite, Next.js) to maintain consistency.

## Validation Checklist

- ✅ Root `tsconfig.json` has empty `files` array
- ✅ Root `tsconfig.json` has `references` pointing to all sub-projects
- ✅ Each sub-project `tsconfig.json` has appropriate `include` array
- ✅ Shared library packages have `composite: true`
- ✅ Applications with dependencies list those in `references`
- ✅ No `paths` are used to resolve workspace packages
- ✅ `tsc --build` completes without errors

## References

- [TypeScript Project References Documentation](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [TypeScript tsconfig.json Reference](https://www.typescriptlang.org/tsconfig)
- [Official TypeScript Monorepo Documentation](https://www.typescriptlang.org/docs/handbook/project-references.html#_examples)
