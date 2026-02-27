### Feature Summary

- EPIC-A / A4 — TypeScript Base Configuration: Capture the observed TypeScript configuration facts, produce NotebookLM questions targeted to verify TypeScript settings and compatibility, and provide a manual readiness checklist for the planner/implementer. Do not change repository files — use code-scout facts only.

### Notebook Breakdown

- **Notebook: division_category/08-code-language-tooling-linters.md**
  - Source Links (verbatim excerpts found in this notebook):
    - https://www.typescriptlang.org/docs/
    - https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
    - https://www.typescriptlang.org/docs/handbook/release-notes/

### Observed Repository Facts (from Code-Scout)

- Canonical base config file location: `/forgea-monorepo/packages/config/tsconfig.base.json`.
- Root `/forgea-monorepo/tsconfig.json` extends `./packages/config/tsconfig.base.json` and adds repo `paths`, `baseUrl`, and `include` for packages and services.
- Sample app/package configs extend the base: `apps/forgea-admin/tsconfig.json`, `apps/forgea-lessons/tsconfig.json`, `apps/forgea-labs/tsconfig.json`, and `packages/audit/tsconfig.json`.
- Base `compilerOptions` highlights: `target: ES2022`, `module: ESNext`, `moduleResolution: "Bundler"`, `jsx: react-jsx`, `types: [node, react, react-dom]`, `strict: true`, `noImplicitAny: true`.
- Root `package.json` pins `typescript` at `5.9.3` in `devDependencies`.
- Observed inconsistency: `moduleResolution` uses capitalized "Bundler" in the base vs lowercase "bundler" in `apps/forgea-labs/tsconfig.json`.

### Targeted Questions (for NotebookLM review)

Beginner (Level 1)

1. Based on the provided documentation, is `packages/config/tsconfig.base.json` a valid canonical location for a monorepo base config, and what are the recommended relative `extends` patterns for apps and packages? (Notebook: division_category/08-code-language-tooling-linters.md)
2. Based on the provided documentation, what does `target: ES2022` guarantee in compiled output and which runtime Node versions are compatible by default? (Notebook: division_category/08-code-language-tooling-linters.md)
3. Based on the provided documentation, what is the authoritative casing and allowed values for `moduleResolution` including the `bundler` option for TypeScript `5.9.x`? (Notebook: division_category/08-code-language-tooling-linters.md)
4. Based on the provided documentation, what minimal `tsconfig.json` `paths` and `baseUrl` patterns should be present at repo root to allow consistent editor resolution across `apps/*` and `packages/*`? (Notebook: division_category/08-code-language-tooling-linters.md)
5. Based on the provided documentation, what does `strict: true` enable and what common flags must be understood by implementers when inheriting the base config? (Notebook: division_category/08-code-language-tooling-linters.md)

Intermediate (Level 2)

6. Based on the provided documentation, what compatibility checks must be performed between `typescript@5.9.3` and the `moduleResolution: bundler` option to avoid unexpected resolution differences in editors and CI? (Notebook: division_category/08-code-language-tooling-linters.md)
7. Based on the provided documentation, how should the planner document the canonical base config location (root vs `packages/config`) and what migration steps should be recommended if the team chooses to relocate it? (Notebook: division_category/08-code-language-tooling-linters.md)
8. Based on the provided documentation, what are the recommended `tsconfig` differences for Next.js apps versus node-only packages when extending a shared base? (Notebook: division_category/08-code-language-tooling-linters.md)
9. Based on the provided documentation, how must `types` entries (e.g., `node`, `react`, `react-dom`) be handled in base vs per-app configs to avoid global type leakage? (Notebook: division_category/08-code-language-tooling-linters.md)
10. Based on the provided documentation, what is the effect of `skipLibCheck: true` and when is it appropriate to enable it at the monorepo base? (Notebook: division_category/08-code-language-tooling-linters.md)

Senior (Level 3)

11. Based on the provided documentation, what machine-checkable invariants should the planner require for TypeScript configuration in a HARD-LOCK zone (e.g., `typescript` pin, canonical base present, `strict: true` enforced), and where should these invariants be recorded? (Notebook: division_category/08-code-language-tooling-linters.md)
12. Based on the provided documentation, what exact compatibility matrix entries must be validated before changing `moduleResolution` or TypeScript major/minor versions (TypeScript ↔ Node ↔ bundlers/editors), and how should those checks be expressed as test cases? (Notebook: division_category/08-code-language-tooling-linters.md)
13. Based on the provided documentation, what acceptance criteria (files present, `tsconfig.base.json` path, `typescript` version, sample app compile success) must be included in the planner's task and test plan before marking A4 complete? (Notebook: division_category/08-code-language-tooling-linters.md)
14. Based on the provided documentation, what migration rollback steps should be defined if relocating the base config breaks editor resolution across multiple apps? (Notebook: division_category/08-code-language-tooling-linters.md)
15. Based on the provided documentation, what documentation snippets should be added to `/docs/` to help contributors correctly extend the base `tsconfig` (examples and common pitfalls)? (Notebook: division_category/08-code-language-tooling-linters.md)

### Manual Readiness Checklist

- Confirm `packages/config/tsconfig.base.json` contents and record them in the planner task (do not modify the file).
- Record `typescript@5.9.3` in `/docs/toolchain-versions.md` as observed; ask Docs Gatekeeper to verify if this is the final pinned version.
- Decide canonical base location (root vs `packages/config`) in planner task; document chosen pattern and update contributor guide (planner to implement).
- Address `moduleResolution` casing inconsistency: include a test case that compiles all apps with both casings to detect differences and document the correct casing per TypeScript docs.
- Add test plan entries: `tsc --noEmit -p ./tsconfig.json` (root) and per-app `tsc --noEmit -p apps/<app>/tsconfig.json` and fail on any errors.

---

Reference: Code-Scout report `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A4_TypeScript Base Configuration.md`.
