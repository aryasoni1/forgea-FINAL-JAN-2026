Based on the comprehensive documentation provided regarding **ESLint, Prettier, TypeScript, Zod, and Project Tooling**, I have curated a list of 50 questions. These range from basic "how-to" queries for beginners to deep architectural and migration strategies for senior engineers.

---

### **Beginner Level (Foundational Concepts)**

_Focus: What are these tools and why do we use them?_

1. **ESLint:** What is the primary difference between a "Stylistic" rule and a "Code-quality" rule in ESLint?
2. **Prettier:** What does it mean when we say Prettier is an "opinionated" code formatter?
3. **TypeScript:** What is the difference between `interface` and `type` in everyday TypeScript usage?
4. **Zod:** How do I define a simple object schema for a user with a `name` (string) and `age` (number)?
5. **General:** Why should I use Prettier for formatting and ESLint for catching bugs instead of using ESLint for both?
6. **TypeScript:** What are the basic primitives available in TypeScript (Everyday Types)?
7. **EditorConfig:** What is the purpose of a `.editorconfig` file in a project?
8. **Zod:** What is the difference between `.parse()` and `.safeParse()`?
9. **ESLint:** What is a "Rule Violation" and what components does it usually include (e.g., message, range)?
10. **AWS SDK:** How do I initialize a basic S3 client using the AWS SDK for JavaScript v3?

### **Junior Level (Implementation & Standard Usage)**

_Focus: Practical application, CLI usage, and basic configuration._

11. **ESLint:** How do I ignore specific files or directories in a flat configuration (`eslint.config.js`)?
12. **TypeScript:** How does "Narrowing" work in TypeScript, and what is a common example using `typeof`?
13. **Prettier:** How do I use the `--check` flag in the CLI, and what does it tell me?
14. **Zod:** How can I use Zod to "coerce" a string input from a form into a number?
15. **ESLint:** If I get the error "ESLint couldn't find the plugin," what are the standard steps to resolve it?
16. **TypeScript:** What are "Generics" and how do they help in creating reusable components?
17. **Prettier:** How do I integrate Prettier with ESLint so they don't conflict (e.g., `eslint-config-prettier`)?
18. **Zod:** How do I add a custom error message to a Zod string validation for "too short"?
19. **TypeScript:** What is the purpose of the `tsconfig.json` file and what does the `strict: true` flag do?
20. **ESLint:** What is a "Shareable Config" and how do I consume one in my project?
21. **Zod:** How do I validate an optional field versus a nullable field in Zod?
22. **TypeScript:** How do I use "Triple-Slash Directives" to include declaration files?
23. **Prettier:** What is the purpose of the `.prettierignore` file?
24. **ESLint:** How do I set the `ecmaVersion` and `sourceType` in my configuration?
25. **AWS SDK:** What is the benefit of using the "Command" pattern (e.g., `PutObjectCommand`) in v3 of the AWS SDK?

### **Mid-Level (Integration, Optimization & Best Practices)**

_Focus: Tooling interoperability, advanced types, and performance._

26. **ESLint:** What is a "Processor" in ESLint, and how would you use one to lint JavaScript inside Markdown files?
27. **TypeScript:** Explain the difference between `unknown` and `any`. When is `unknown` preferred?
28. **Zod:** What are "Pipes" (`.pipe()`) in Zod, and how do they differ from "Transforms" (`.transform()`)?
29. **TypeScript:** How do "Mapped Types" and "Template Literal Types" allow for generating complex dynamic types?
30. **ESLint:** How do you migrate a project from the legacy `.eslintrc` format to the new Flat Config system?
31. **Zod:** How does "Discriminated Unions" improve type safety and narrowing when using Zod?
32. **TypeScript:** What are "Declaration Merging" and "Global Augmentation" in the context of `.d.ts` files?
33. **Prettier:** Explain the "Option Philosophy" of Prettier. Why do they resist adding many configuration options?
34. **ESLint:** How can you use the Node.js API of ESLint to programmatically lint strings of code?
35. **TypeScript:** What is "Downleveling" in the TypeScript compilation process?
36. **Zod:** How do you use `z.infer` to extract a TypeScript type from a Zod schema?
37. **TypeScript:** Explain "Project References" and how they help with build times in monorepos.
38. **ESLint:** What is the role of the `espree` parser in the ESLint architecture?
39. **Zod:** How do you handle circular or recursive dependencies in Zod schemas using `z.lazy()`?
40. **TypeScript:** How do "Indexed Access Types" allow you to look up a specific property on another type?

### **Senior Level (Architecture, Extension & Strategy)**

_Focus: Building custom tools, migration at scale, and internal mechanics._

41. **ESLint:** Describe the internal architecture difference between the `Linter` object and the `CLIEngine` (or `ESLint`) class.
42. **Zod:** What is "Zod Mini," and in what specific scenarios would a senior engineer choose it over the standard Zod package?
43. **ESLint:** Walk through the process of creating a **Custom Rule**: how do you use the `context.report()` API and define a schema for rule options?
44. **TypeScript:** Explain the implications of the `moduleResolution: "nodenext"` setting for a library author.
45. **Zod:** How do you implement a **Custom Registry** in Zod to store and retrieve metadata like `id`, `title`, or `description` for JSON Schema generation?
46. **ESLint:** How would you write a **Custom Parser** to allow ESLint to work with a non-standard syntax?
47. **Zod:** Explain the performance benefits of "100x reduction in `tsc` instantiations" introduced in Zod 4.
48. **TypeScript:** What are "Variance Annotations" (in/out) in Generics, and how do they affect type compatibility?
49. **Project Strategy:** If a large codebase has "Circular fixes detected" in ESLint, how would you architect a solution to debug and resolve this?
50. **Tooling:** How would you set up an **MCP (Model Context Protocol) Server** for ESLint to allow AI agents to lint and fix code in a developer's IDE?

---

### **Suggested Diagram: Tooling Workflow**

To provide a deeper and more project-specific set of questions, I have cross-referenced the **Tooling Documentation (Part 1)** with the **Master Task Epics (A-O)**.

This list avoids the general "what is" questions and focuses on how these specific tools are intended to be used within the architecture of your project (e.g., Monorepo, FS Abstractions, and AI Integration).

### **Beginner Level (Tooling & Project Onboarding)**

_Focus: How to start contributing to the specific epics._

1. **Monorepo Entry:** According to **EPIC-A**, what are the first three developer tools I must verify are running before making my first commit?
2. **Environment Sync:** How does the `.editorconfig` file ensure that a contributor on Windows and a contributor on Mac maintain the same line endings for **EPIC-L** integration files?
3. **Basic Linting:** If I am working on the **Admin Core Console (EPIC-N)** and see a red squiggle, how do I determine if it's a TypeScript type error or an ESLint rule violation?
4. **Formatting:** In the context of **EPIC-J (Lesson UX)**, why should I never manually indent code and instead rely on the Prettier "Opinionated" system?
5. **Schema Definition:** If I need to create a new "Lesson" object for **EPIC-D**, how do I use Zod’s `z.object` to ensure the `title` is never empty?
6. **Version Control:** According to the **Submit a Pull Request** doc, what is the mandatory format for a commit message when fixing a bug in **EPIC-B (Database)**?
7. **CLI Usage:** What command from the **TypeScript CLI** docs should I run to check for type errors across the entire monorepo without generating output files?
8. **Ignore Rules:** If I want to add a temporary scratchpad file in the **Lab UI (EPIC-K)** folder, how do I make sure Prettier and ESLint ignore it?
9. **Basic Types:** When defining a "User Role" for **EPIC-C (RBAC)**, should I use a TypeScript `enum` or a Zod `z.enum`?
10. **AWS Basics:** Based on the **AWS SDK Get Started** guide, what is the default way to provide credentials when running the backend integration for **EPIC-L** locally?

---

### **Junior Level (Task Implementation & Validation)**

_Focus: Applying patterns found in the docs to the Epics._

11. **Architectural Boundaries:** How can we use the `eslint-plugin-boundaries` (from the provided GitHub doc) to prevent the **Frontend (EPIC-L)** from directly importing internal **Database logic (EPIC-B)**?
12. **Zod Coercion:** When capturing form input for **EPIC-E (Lab Creation)**, how do I use `z.coerce` to ensure a stringified "max_students" input is treated as a number?
13. **Strictness:** Why does **EPIC-B** require `strictNullChecks: true` in `tsconfig.json`, and how does it prevent "Cannot read property of null" errors in our database queries?
14. **Pre-commit Hooks:** How does the **Prettier Pre-commit Hook** documentation suggest we prevent unformatted code from ever reaching the **GitHub Integration (EPIC-F)**?
15. **Error Handling:** When a user enters an invalid email in **EPIC-C (Auth)**, how do I use `result.error.flatten()` from Zod to return a clean error object to the UI?
16. **TypeScript Narrowing:** In **EPIC-I (Anti-Cheat)**, how would you use a "Type Guard" to check if a `LogEntry` is specifically an `AttemptError`?
17. **S3 Operations:** Using the **AWS SDK v3** docs, write the `Send` command syntax required to upload a lab snapshot for **EPIC-G**.
18. **ESLint Shared Config:** If we want to enforce a specific "No Console" rule only for the **Admin Session Operations (EPIC-O)**, how do we override the global config in that directory?
19. **Zod Literals:** How do I use `z.literal` to ensure that a `Status` field in **EPIC-M (Admin Content)** only accepts the strings "draft", "published", or "archived"?
20. **Debugging:** If the **Lab Testing Engine (EPIC-H)** is failing silently, what ESLint CLI flag should I use to see the full debug trace of the configuration?

---

### **Mid-Level (Feature Engineering & Refactoring)**

_Focus: Optimization and interoperability._

21. **Performance Tuning:** Based on the **Zod Release Notes**, why might we switch a large schema in **EPIC-B** to use object destructuring instead of `.extend()`?
22. **Custom Processors:** If we store lab instructions as Markdown files in **EPIC-D**, how would we configure an ESLint "Processor" to lint code blocks inside those Markdown files?
23. **Generic Factories:** How would you create a generic "Response Wrapper" in TypeScript that can handle any data type returned by the **Backend ↔ Frontend Integration (EPIC-L)**?
24. **Zod Pipes:** Explain how to use `.pipe()` in Zod to first validate a string is a valid UUID and then transform it into a database-ready object for **EPIC-F**.
25. **Flat Config Migration:** What are the three main changes we must make to our `.eslintrc` file to make it compatible with the **ESLint Flat Config** system used in **EPIC-A**?
26. **Module Resolution:** For **EPIC-K (Lab UI)**, how does the `moduleResolution: "bundler"` setting in `tsconfig.json` affect how we import CSS modules or assets?
27. **Zod Lazy:** How do you handle a "Nested Comment" system (where a comment can have sub-comments) in **EPIC-J** using `z.lazy()`?
28. **ESLint Rule Creation:** If we want to forbid the use of `localStorage` in the **Anti-Cheat system (EPIC-I)**, how would we define a simple custom ESLint rule?
29. **AWS Pagination:** Using the `paginateListObjectsV2` pattern from the AWS SDK docs, how would you list all files in a lab's S3 folder for **EPIC-G**?
30. **Type Utility:** How can we use the `Pick` or `Omit` utility types to create a "Public Profile" type from our "Full User" database record in **EPIC-C**?

---

### **Senior Level (Architecture & Strategy)**

_Focus: Scale, system integrity, and developer experience._

31. **Library Architecture:** According to the **For Library Authors (Zod)** doc, why should we import from `zod/v4/core` when building our custom **FS Abstraction (EPIC-K)**?
32. **Strategic Tooling:** When would you advise the team to use **Zod Mini** instead of standard Zod for the **Frontend (EPIC-L)**, and what are the trade-offs regarding Intellisense?
33. **Monorepo Boundaries:** How do **Project References** in TypeScript (documented in the reference files) allow us to build the **Admin Console (EPIC-N)** without re-compiling the **Lab Engine (EPIC-H)**?
34. **AI Integration Strategy:** How can we implement an **MCP (Model Context Protocol) Server** for our custom ESLint rules to help the **AI Lab Creator (EPIC-E)** write better code?
35. **Circular Fix Resolution:** If a developer triggers a "Circular fixes detected" warning while working on **EPIC-B**, what architectural conflict between Prettier and ESLint is likely the cause?
36. **Security Hardening:** How can we use Zod's `.readonly()` and TypeScript's `readonly` modifiers to ensure that **RBAC permissions (EPIC-C)** are immutable at runtime?
37. **Custom Parsers:** If we develop a custom DSL for lab testing in **EPIC-H**, what are the requirements (based on the "Custom Parsers" doc) to make it lintable by ESLint?
38. **Type Inference Leaks:** Based on the **TypeScript 5.9** release notes, how should we handle "type variable leaks" in our complex generic functions in the **Testing Engine (EPIC-H)**?
39. **Release Strategy:** According to the **Manage Releases** doc, what are the criteria for a "TSC member" to approve a major version bump of our internal shared UI library?
40. **Governance:** If a new rule is proposed to enforce security in **EPIC-I**, what is the process for "Championing" that rule into the project's core configuration?

### **Bonus: Questions for specific Epics not yet covered:**

41. **EPIC-G (Push Flow):** How do we use `jiti` to allow our build scripts to read `eslint.config.ts` files natively?
42. **EPIC-K (Monaco Editor):** How does the **TypeScript DOM Manipulation** doc help us bridge the gap between Monaco's internal model and the browser's DOM?
43. **EPIC-B (Database):** How do we use `z.brand` to ensure that a "User ID" cannot be accidentally used where a "Lesson ID" is expected?
44. **EPIC-F (GitHub Integration):** How do we use the **ESLint Stats Data** API to generate a report on code quality for our GitHub Actions?
45. **EPIC-H (Verification):** How can we use `ruleTester.run` to unit test the verification logic of our labs?
46. **EPIC-L (Integration):** How does the `esModuleInterop` flag affect how we import legacy CommonJS libraries in our modern ESM-based backend?
47. **EPIC-M (Admin Ops):** How do we use `z.metadata` and registries to attach "Human Readable" labels to our database schemas for the Admin UI?
48. **EPIC-N (Admin Console):** How do we configure `noUncheckedIndexedAccess` to make our Admin dashboard more resilient to undefined data?
49. **EPIC-A (Monorepo):** What is the "Downleveling" process, and how does it affect our deployment of the Monorepo to older Node.js environments?
50. **EPIC-C (Auth):** How can we use TypeScript "Template Literal Types" to create a type-safe permission string like `admin:read` or `user:write`?

## EPIC-A-A1: Repository & Structure

### [ ] Setup (Level 1)

- Based on the provided documentation in `08-code-language-tooling-linters.md`: Which ESLint plugins and exact versions are recommended to enforce import boundaries (e.g., `eslint-plugin-boundaries`), and where do these recommendations appear in the notebook?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: How do you configure a minimal root ESLint config that blocks cross-app imports while permitting `packages/*` shared imports? Provide the rule names and configuration keys to validate.
- Based on the provided documentation in `08-code-language-tooling-linters.md`: What are the minimal local developer steps to test the boundary rules (CLI commands and expected exit codes)?

### [ ] Integration (Level 2)

- Based on the provided documentation in `08-code-language-tooling-linters.md`: How should `tsconfig` `paths` and `include` be coordinated with ESLint so the editor and lint runner resolve the same modules across `apps/*`, `packages/*`, and `services/*`? (List verification steps.)
- Based on the provided documentation in `08-code-language-tooling-linters.md`: What CI job structure and lint script should be used to fail the build on cross-app imports, and how can exceptions be recorded and reviewed?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: How do you write tests for custom ESLint rules (RuleTester examples) that assert prohibited imports cause failures?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `08-code-language-tooling-linters.md`: For HARD LOCK invariants, what logging, audit hooks, or PR-level enforcement must exist so attempts to bypass ESLint rules are detectable and traceable? (Specify the kind of logs and retention expectations.)
- Based on the provided documentation in `08-code-language-tooling-linters.md`: What exact machine-checkable invariants should the planner include (e.g., `eslint` exit code non-zero on cross-app import, `tsc --noEmit` passes, `CODEOWNERS` exists)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: If an ESLint plugin version is listed as `VERSION UNKNOWN`, what question must we ask NotebookLM to determine the industry-standard pin for compatibility with TypeScript 5.9.3 and pnpm 10.28.1?

## EPIC-A-A6: A6 — Prettier (Formatting Only)

### [ ] Setup (Level 1)

- Based on the provided documentation, what exact repository file paths and filenames should be present to declare a canonical Prettier policy for this monorepo (minimum: root `.prettierrc`, repository `.prettierignore`, and any recommended per-package override locations)?
- Based on the provided documentation, how does pinning Prettier as a root `devDependency` differ in practice from invoking Prettier at runtime via `pnpm -w dlx prettier` for contributors and CI, and what are the trade-offs for reproducibility and security?
- Based on the provided documentation, what minimal editor integrations and settings should developers enable to ensure consistent on-save formatting across common editors (VS Code, WebStorm, Vim)?
- Based on the provided documentation, how do `.prettierignore` patterns differ semantically from `.gitignore`, and what patterns must be present to avoid formatting generated artifacts in this repo?
- Based on the provided documentation, where should the canonical example `.prettierrc` and the pinned Prettier semver be recorded in the internal docs registry so implementers can find it easily?

### [ ] Integration (Level 2)

- Based on the provided documentation, what exact CI commands and workflow snippet should be used to `check` Prettier formatting and fail PRs (include workspace-aware invocation and caching recommendations)?
- Based on the provided documentation, what is the recommended sharing strategy for Prettier config in a monorepo (single root config with overrides vs per-package configs), and what precedence rules govern overrides?
- Based on the provided documentation, what is the recommended configuration and ordering to harmonize Prettier with ESLint (use of `eslint-config-prettier`, `eslint-plugin-prettier`, autofix ordering) to avoid circular fixes and ensure deterministic autofix behavior?
- Based on the provided documentation, what staged rollout/migration steps should be used to introduce a pinned Prettier version to a large codebase with minimal churn (e.g., subset formatting, CI gating, opt-in directories)?
- Based on the provided documentation, how should Prettier caching or execution be instrumented in CI to reduce runtime while guaranteeing correctness across workspaces?

### [ ] Constraints (Level 3)

- Based on the provided documentation, for HARD-LOCKED formatting invariants what machine-checkable invariants and audit hooks must be implemented (e.g., enforce non-zero CI exit on format drift, PR-blocking checks, retention of check logs, and where those logs are stored)?
- Based on the provided documentation, what governance policy should be used for approving Prettier version bumps (who must review, what compatibility tests run, and what rollback policy exists)?
- Based on the provided documentation, should Prettier be pinned at the root `devDependencies` or invoked via workspace tooling from a trusted artifact, and what are the security and reproducibility implications of each choice?
- Based on the provided documentation, how can the system detect and prevent attempts to bypass formatting checks (e.g., force-pushing bypassing CI), and what forensic traces should exist to support audits?
- Based on the provided documentation, what automated tests or metrics should be added to validate that a Prettier config change does not create widespread churn across packages (e.g., diff-sample checks, statistical change thresholds)?

## EPIC-A-A5: A5 — ESLint (Minimal & Safe)

### [ ] Setup (Level 1)

- Based on the provided documentation, what exact minimal set of files must exist (repo-root eslint config or `eslint.config.*`, `.eslintignore`, and `packages/config` export) so that `apps/*` invoking `eslint .` will succeed in a fresh workspace install? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what is the minimal recommended structure and metadata for the `@forgea/config` package so it can distribute a shared ESLint config (package.json fields, export surface, and consumption example)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, how should `eslint` be pinned in a pnpm workspace (root `devDependencies` vs per-package installs) to avoid `eslint: command not found` while keeping install size reasonable? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what minimal `.eslintignore` entries should be present at repo root to avoid linting build outputs, lockfiles, and node_modules across all platforms? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what quick CI-level troubleshooting steps (commands and expected outputs) should be included to diagnose `eslint: command not found` and permission/path issues? (Notebook: division_category/08-code-language-tooling-linters.md)

### [ ] Integration (Level 2)

- Based on the provided documentation, how must `tsconfig.json` `paths`, `rootDir`, and the ESLint resolver be configured together so both editor and CI linting resolve imports identically across `apps/*` and `packages/*`? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what is the recommended CI job snippet (exact commands and flags) to run lint in CI in a reproducible way (frozen lockfile, caching considerations, and fail-on-error)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what validation steps should be included in PR checks to ensure `@forgea/config` changes do not unintentionally relax boundary rules (test runner commands, sample tests to run)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what are the exact steps to locally exercise and unit-test `eslint-plugin-boundaries` rules (how to write and run a RuleTester case and a CLI smoke test)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what packaging and semantic-versioning guidance should `packages/config` follow so consumers can opt into patch/minor/major changes safely? (Notebook: division_category/08-code-language-tooling-linters.md)

### [ ] Constraints (Level 3)

- Based on the provided documentation, which HARD-LOCK invariants must be recorded (e.g., non-zero exit on cross-app imports, CI gate name, required audit log fields) and what exact CI signals should trigger an enforced rollback? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what audit logging schema should be used for recorded lint failures (fields, severity, user/PR id, timestamp) to ensure forensics and automated alerts are possible? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what fail-closed mechanism should exist if the shared config package is missing or incompatible (CI behavior, notification channels, and emergency bypass process)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what explicit compatibility questions must we ask NotebookLM to produce a small matrix mapping `eslint` major versions, `eslint-plugin-boundaries` versions, TypeScript versions, and supported Node versions? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what formal acceptance criteria (files present, CI job names, example PR with boundary violation failing) must be documented in the task and test plan before enabling HARD-LOCK enforcement? (Notebook: division_category/08-code-language-tooling-linters.md)

## EPIC-A-A4: A4 — TypeScript Base Configuration

### [ ] Setup (Level 1)

- Based on the provided documentation, where should the canonical `tsconfig.base.json` live in a pnpm monorepo (root vs `packages/config`), and what are the trade-offs of each approach for `extends` paths? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what exact `tsc` commands should developers run to validate the base config and per-app configs locally (commands and expected exit codes)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what is the authoritative `moduleResolution` casing and allowed values for TypeScript `5.9.x`, and how should the planner resolve the observed `Bundler` vs `bundler` inconsistency? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what minimal `tsconfig` `compilerOptions` must be present in the base to support Next.js apps and shared packages (e.g., `target`, `module`, `jsx`, `strict`)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what documentation entry should be added to `/docs/` demonstrating how to extend the base config for a new app? (Notebook: division_category/08-code-language-tooling-linters.md)

### [ ] Integration (Level 2)

- Based on the provided documentation, what compatibility checks must be added to CI to verify `typescript@5.9.3` works with the current `moduleResolution` and `paths` settings (exact test commands)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, how should `types` entries be curated between base and app configs to avoid global type pollution (recommendation and verification steps)? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what rules should be added to the planner's test plan to detect when a `tsconfig` change introduces type errors across the monorepo? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, should `tsconfig.base.json` be copied or referenced by path in other packages and what are the maintainability considerations? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what exact acceptance criteria should be included in the task for verifying per-app compilation success before merging a `tsconfig` change? (Notebook: division_category/08-code-language-tooling-linters.md)

### [ ] Constraints (Level 3)

- Based on the provided documentation, which HARD-LOCK invariants must be enforced for TypeScript configuration (pinned `typescript` version, canonical base present, `strict: true`) and how should they be validated automatically? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what compatibility matrix must be produced before changing TypeScript minors/majors (TypeScript ↔ Node ↔ bundlers/editors), and which team roles must review it? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what rollback steps should be defined if a `tsconfig` relocation breaks editor resolution or CI builds? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what audit logs and retention policy should be required for changes to `tsconfig.base.json` in a HARD-LOCK zone? (Notebook: division_category/08-code-language-tooling-linters.md)
- Based on the provided documentation, what formal test cases (file paths and commands) must be present in the test plan before marking A4 done? (Notebook: division_category/08-code-language-tooling-linters.md)

 - Based on the provided documentation, what formal test cases (file paths and commands) must be present in the test plan before marking A4 done? (Notebook: division_category/08-code-language-tooling-linters.md)

### EPIC-A Additions

- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what minimal `.editorconfig` keys must be present to stabilize cross-platform commits (`end_of_line`, `charset`, `indent_style`, `indent_size`, `trim_trailing_whitespace`, `insert_final_newline`)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what CI checks should be added to fail PRs if `.editorconfig` is missing or differs from the canonical template?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, where should shared linter/formatter config be documented so editors and CI pick it up automatically (`packages/config`, `/docs/master_docs.md`)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, how should the linter/formatter policy be validated across workspace packages in CI (workspace-aware invocation examples)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what compatibility matrix must be produced before approving major tooling upgrades (matrix axes: tool ↔ Node ↔ TypeScript ↔ pnpm)?
