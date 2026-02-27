## Feature Summary

Feature A1 — Repository & Structure (EPIC-A) ensures the monorepo workspace, TypeScript configuration, ownership, and import-boundary enforcement are defined, aligned, and verifiable. This study guide collects the NotebookLM sources to query and a curated question set for Beginner, Intermediate, and Senior engineers to extract authoritative implementation details.

## Notebook Breakdown

- **Notebook:** DevOps / CI/CD / Infra Tooling
  - **Source Link:** docs/technology/docs-tech-notebooklm/division_category/07-devops-ci-cd-infra-tooling.md
  - **Targeted Questions (Beginner / Intermediate / Senior):**
    - Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Should `pnpm-workspace.yaml` include `services/*` when `package.json` `workspaces` already lists `services/*`? (Beginner)
    - Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: What exact pnpm CLI and YAML schema steps are required to validate workspace alignment across `pnpm-workspace.yaml` and `package.json` `workspaces`? (Beginner)
    - Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: What are the deterministic CI behaviors when workspace lists diverge between pnpm and other tools? (Intermediate)
    - Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: How should Turborepo be pinned and what `turbo.json` features must be documented to guarantee reproducible pipelines? (Intermediate)
    - Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: What machine-checkable verification steps should CI run to assert workspace consistency (e.g., a script that compares `pnpm-workspace.yaml` and `package.json` `workspaces`)? (Senior)
    - Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: How to design CI gates that fail fast on workspace or Turbo version drift and what remediation steps should be automated? (Senior)

- **Notebook:** Code / Language / Tooling / Linters
  - **Source Link:** docs/technology/docs-tech-notebooklm/division_category/08-code-language-tooling-linters.md
  - **Targeted Questions (Beginner / Intermediate / Senior):**
    - Based on the provided documentation in `08-code-language-tooling-linters.md`: What ESLint plugin options are documented for enforcing import boundaries (examples and recommended plugins)? (Beginner)
    - Based on the provided documentation in `08-code-language-tooling-linters.md`: How do you write a minimal ESLint config that blocks cross-app imports while allowing shared `packages/*` imports? (Beginner)
    - Based on the provided documentation in `08-code-language-tooling-linters.md`: How should `tsconfig.json` `include` and `paths` be structured so editors and type-checker consistently resolve `packages/*`, `apps/*`, and `services/*`? (Intermediate)
    - Based on the provided documentation in `08-code-language-tooling-linters.md`: What are the recommended test strategies to ensure lint rules fail the build for prohibited cross-app imports (local dev and CI)? (Intermediate)
    - Based on the provided documentation in `08-code-language-tooling-linters.md`: What invariants and middleware (pre-commit, CI, branch protection) must be implemented to ensure a fail-closed enforcement of import boundaries? (Senior)
    - Based on the provided documentation in `08-code-language-tooling-linters.md`: For a HARD LOCK zone, what audit and audit-log requirements must be implemented so that attempts to bypass lint rules are detectable and forensically traceable? (Senior)

## Manual Readiness Checklist

- Confirm `pnpm` pinned version (from `/docs/official-docs-registry.md`) and verify CLI commands to validate workspaces.
- Decide whether to add `services/*` to `pnpm-workspace.yaml` to match `package.json` and document the decision in `/docs/official-docs/pnpm-workspaces.md`.
- Decide whether root `tsconfig.json` should include `apps/` and document `references` vs `paths` approach in `/docs/official-docs/tsconfig.md`.
- Add repository-level `README.md`, `CONTRIBUTING.md`, and `CODEOWNERS` at repository root and record expected patterns in `/docs/official-docs/repo-boundaries.md`.
- Select and pin an ESLint boundary enforcement plugin; document config and CI test steps in `/docs/official-docs/eslint-boundaries.md`.

## Mapping of Questions to NotebookLM sources

- All Beginner, Intermediate, and Senior questions above are targeted at one of the two notebooks listed in the Notebook Breakdown. Use those notebook files to extract exact commands, config examples, and version pins. If any notebook page is silent on a required exact-version or schema, ask: "What is the industry-standard version/approach for [X] when used with [Y]?"

End of Feature Study Guide for EPIC-A / FEATURE A1.

## **Notebook:** DevOps / CI/CD / Infra Tooling

Yes, you should include `"services/*"` in your `pnpm-workspace.yaml` file.

In the JavaScript ecosystem, different package managers use slightly different configurations to define a multi-package workspace (monorepo). While npm, Yarn, and Bun rely on the `workspaces` array inside the root `package.json`, **pnpm specifically requires and relies on the `pnpm-workspace.yaml` file** to define the workspace root and determine which directories are included.

Because pnpm dictates its workspace structure exclusively through `pnpm-workspace.yaml`, it will ignore the `workspaces` array in your `package.json`.

To ensure pnpm correctly identifies and links the packages inside your services directory, you should explicitly list it under the `packages` key in your `pnpm-workspace.yaml`:

```yaml
packages:
  - "services/*"
  # include any other directories you need, such as:
  # - "apps/*"
  # - "packages/*"
```

_(Note: By default, if you have a `pnpm-workspace.yaml` file but do not define a `packages` array at all, pnpm will automatically include all packages in all subdirectories. However, if you are explicitly defining a `packages` array to control your workspace structure, `services/_` must be included).\*

Based on the provided sources, there are no exact pnpm CLI commands or built-in YAML schema steps specifically designed to "validate workspace alignment" between a `pnpm-workspace.yaml` file and a `package.json` `workspaces` field.

This is because **pnpm and other package managers configure workspaces differently**, and pnpm does not rely on the `package.json` `workspaces` field. Instead, pnpm strictly requires a `pnpm-workspace.yaml` file at the root of the repository to define the workspace and its packages. The `workspaces` array inside a root `package.json` is the convention used by npm, Yarn, and Bun.

While there is no direct "alignment validation" command, you can configure your `pnpm-workspace.yaml` correctly and use CLI commands to verify that your packages are being discovered as expected.

### 1. YAML Schema for `pnpm-workspace.yaml`

To define your workspace in pnpm, you use the `packages` field inside `pnpm-workspace.yaml` to explicitly include or exclude directories. By default, if the file is present but empty, all packages in all subdirectories are included.

To explicitly configure it, use the following schema:

```yaml
packages:
  # specify a package in a direct subdir of the root
  - "my-app"
  # all packages in direct subdirs of packages/
  - "packages/*"
  # all packages in subdirs of components/
  - "components/**"
  # exclude packages that are inside test directories
  - "!**/test/**"
```

_(Note: The root package is always included automatically, even when custom location wildcards are used)_.

### 2. CLI Commands to Verify Discovered Packages

To check if your workspace packages are correctly recognized by pnpm (which effectively validates that your `pnpm-workspace.yaml` is configured properly), you can use the following CLI commands:

**Using pnpm:**
You can use the `pnpm list` (or `pnpm ls`) command to output a tree-structure of the installed packages.

- Run **`pnpm ls -r --depth -1`** (or `--recursive` instead of `-r`). The `-r` flag runs the command on every workspace package, and `--depth -1` limits the output to list only the projects themselves rather than their dependencies.

**Using Turborepo:**
If you are using Turborepo on top of pnpm, you can use the `turbo ls` command.

- Run **`turbo ls`** to print a list of all the packages Turborepo has discovered in your workspace and their exact file paths.

The provided sources do not explicitly detail the CI behaviors for a scenario where the workspace package lists diverge between pnpm and other tools. However, the sources do explain how pnpm and Turborepo enforce deterministic behavior and handle ambiguity regarding workspaces and continuous integration (CI):

- **Preventing Ambiguous Workspace Structures:** Package managers in the JavaScript ecosystem can have ambiguous behavior when handling nested workspaces. To prevent this from causing issues, Turborepo strictly prohibits nested packages (such as using `apps/**` or `packages/**` globs that result in packages existing at both `apps/a` and `apps/a/b`). If this structure is detected, Turborepo will deterministically throw an error.
- **Strict Lockfile Enforcement in CI:** To guarantee deterministic dependency resolution in a CI environment, pnpm automatically enables the `--frozen-lockfile` setting. If the `pnpm-lock.yaml` file is out of sync with your workspace's actual manifests (which would happen if your workspace definitions or dependencies diverged) or if the lockfile is missing entirely, the `pnpm install` command will intentionally fail rather than attempting to perform an update.
- **Lockfiles for Predictable Task Graphs:** Turborepo relies heavily on your package manager's lockfile to understand the dependencies between internal packages and to construct its Package Graph. If the lockfile is missing or out of sync, Turborepo warns that you may see unpredictable behavior.
- **Enforcing the Package Manager:** To further stabilize behavior, Turborepo 2.0 requires you to define the `packageManager` field in your root `package.json` so it knows exactly which tool's rules to follow. While you can bypass this using the `--dangerously-disable-package-manager-check` flag, doing so forces Turborepo to attempt a "best-effort discovery," and you assume the risks of unpredictable behavior.

**Pinning Turborepo**

To ensure consistent execution across all environments, Turborepo should be pinned in two ways:

- **Repository Level:** Install `turbo` as a `devDependency` in the root of your repository. This maintains a pinned version for all developers collaborating on the project, ensuring everyone uses the exact same version.
- **Global CI Installation:** In your Continuous Integration (CI) pipelines, you should pin your global installation of `turbo` to the major version (or the exact patch version for maximum stability) found in your `package.json`. This is especially critical because some CI workflows require running commands like `turbo prune` to construct Docker images _before_ your package manager has installed the local dependencies.

**`turbo.json` Features for Reproducible Pipelines**

To guarantee that your pipelines are reproducible and that Turborepo's caching is deterministic (never restoring incorrect artifacts), you must strictly document and configure the following features:

- **Strict Environment Mode (`envMode`):** By default, Turborepo operates in Strict Mode, which filters the environment variables available to a task down to **only** the ones you explicitly list. You should maintain this setting, as it ensures tasks fail if an environment variable is missing, protecting you from caching a build with the wrong environment configuration.
- **Environment Variable Declarations (`env` and `globalEnv`):** You must document and list every environment variable that impacts a build. Variables that alter specific tasks go in the `env` array, while variables that impact the entire workspace go in `globalEnv`.
- **Global Dependencies (`globalDependencies`):** Use this feature to document arbitrary files that should impact the hash of all tasks across the workspace. For example, you must include files like `.env` or a root `tsconfig.json` here so that any modification correctly invalidates the entire cache.
- **Explicit Inputs and Outputs (`inputs` / `outputs`):**
  - **`outputs`:** You must document the exact file and directory globs generated by a task (e.g., `"outputs": ["dist/**"]`). If omitted, Turborepo will not cache any file outputs, which leads to broken pipelines when a cache hit only restores terminal logs.
  - **`inputs`:** If a task only depends on specific files, use `inputs` to define them. If your tasks depend on arbitrary configuration files (like a `.env` file), ensure they are captured in the inputs array.
- **Lockfile and Package Manager Validation:** Turborepo natively uses your package manager's lockfile to determine hashing and caching behavior. You must document the `packageManager` field in your root `package.json` and avoid using the `dangerouslyDisablePackageManagerCheck` setting in `turbo.json`, ensuring `turbo` enforces lockfile stability for predictable pipeline behavior.
- **Platform and Runtime Handling:** If your pipelines are sensitive to the Node.js runtime version, you should specify the `engines` field in your root `package.json`, which Turborepo automatically includes in its hashing. For OS or architecture-dependent tasks, you can document a workflow that writes these values to a `turbo-cache-key.json` file and adds that file to the `inputs` or `globalDependencies` array.

Based on the sources, there is no mention of a script to compare `pnpm-workspace.yaml` and the `package.json` `workspaces` array. Because pnpm solely relies on `pnpm-workspace.yaml` to define the workspace structure, it does not use the `package.json` `workspaces` field.

Instead of custom comparison scripts, the sources recommend configuring several built-in strictness settings in pnpm and Turborepo to automatically assert workspace consistency and halt CI with a non-zero exit code if issues are found:

**1. Enforce Package Manager Consistency**

- **`packageManagerStrictVersion: true` (pnpm):** Set this in your pnpm configuration to force CI to fail if the pnpm version executing the install doesn't exactly match the version defined in the root `package.json`'s `packageManager` field.
- **Turborepo `packageManager` enforcement:** By default, Turborepo validates the `packageManager` field in your root `package.json` to ensure lockfile stability. It will fail if the field is missing or mismatched, unless you explicitly bypass it with the `--dangerously-disable-package-manager-check` flag.

**2. Assert Dependency and Graph Health**

- **`disallowWorkspaceCycles: true` (pnpm):** Enabling this setting causes the pnpm installation to fail if it detects circular dependencies between workspace packages.
- **`strictPeerDependencies: true` (pnpm):** This setting forces CI commands to fail if there is a missing or invalid peer dependency anywhere in the dependency tree.
- **`turbo boundaries` (Turborepo):** You can use the `boundaries` key in `turbo.json` to define strict architectural rules (allowlists and denylists) based on package tags. Running `turbo boundaries` in CI will verify that no packages are violating these dependency rules.

**3. Verify Script Availability**

- **`requiredScripts` (pnpm):** You can define an array of scripts (e.g., `["build"]`) in your pnpm configuration. If any project in the workspace is missing one of these scripts, recursive commands like `pnpm -r run <script name>` will fail.
- **`failIfNoMatch: true` (pnpm):** When set, the pnpm CLI will exit with a non-zero code if you run a command with a filter (like `--filter`) and no packages match the criteria.

**4. Assert Secure Installations**

- **`strictDepBuilds: true` (pnpm):** When enabled, CI installations will exit with a non-zero code if any dependencies attempt to run unreviewed build scripts (like `postinstall`), protecting your workspace from untrusted executions.

**5. Programmatic Change Detection**

- **`turbo-ignore`:** In CI pipelines, you can run `npx turbo-ignore` to programmatically check if a package's source code or its internal dependencies have changed. It exits with a `1` status code if changes are detected (meaning CI should proceed) and a `0` if no changes occurred.

To ensure your monorepo remains stable and reproducible, you can design your Continuous Integration (CI) pipeline to instantly catch configuration drift related to your workspace and Turborepo versions.

Here is how to design those CI gates and set up automated remediation.

### Designing CI Gates to Fail Fast

**1. Enforce Lockfile Synchronization**
By default, if your CI pipeline sets standard environment variables (like `CI=true`), `pnpm` will automatically detect the CI environment. In this mode, `pnpm install` will **fail immediately** if your `pnpm-lock.yaml` is missing or is out of sync with your workspace's manifest files. To be absolutely explicit in your workflows, you can also run `pnpm install --frozen-lockfile`.

**2. Strictly Enforce the Package Manager Version**
Turborepo relies heavily on your package manager's lockfile to determine caching behavior and build your workspace's Package Graph. Turborepo 2.0 requires you to define a `packageManager` field (e.g., `"packageManager": "pnpm@9.2.0"`) in your root `package.json`. Turborepo will check this field to ensure behavioral predictability and will fail if the environment's package manager drifts from this definition, unless you explicitly override it.

**3. Pin the Global Turbo Version in CI**
In CI workflows, you often use global `turbo` commands (like `turbo prune` for Docker builds) before your package manager has actually installed the local dependencies. To prevent version drift between your local developers and the CI machine, **pin your global installation of `turbo` in CI to the major version defined in your `package.json`**.

**4. Prevent Workspace Cycles**
To ensure your workspace graph doesn't drift into an unresolvable state, you can configure pnpm to explicitly reject circular dependencies. By setting `disallowWorkspaceCycles: true` in your configuration, the installation gate will instantly fail if cyclic workspace dependencies are detected.

**5. Catch Environment Variable Drift**
Unaccounted environment variables cause cache poisoning and deployment drift. Add the **`eslint-config-turbo`** package to your linting gate. This will fail your CI build if developers introduce environment variables in the source code without explicitly declaring them in the `turbo.json` configuration.

---

### Automated Remediation Steps

When these CI gates fail or when the ecosystem updates, you can automate several remediation steps to reduce manual developer toil:

**1. Automated Tooling and Dependency Updates**
Instead of manually fixing version drift across your monorepo, enable **Dependabot version updates**. Dependabot will automatically scan your repository and open pull requests to bump your `turbo` version, `pnpm` version, and any GitHub Actions you are using in your workflows to their latest secure versions.

**2. Automated Turborepo Upgrades via Codemods**
If your repository falls behind on major Turborepo versions (e.g., drifting from 1.x to 2.x), you do not need to manually rewrite your configuration files. You can automatically remediate breaking changes by running Turborepo's migration codemod:

```bash
pnpm dlx @turbo/codemod migrate
```

This automated script will update your `turbo.json` syntax and automatically inject the required `packageManager` field into your `package.json` if it is missing.

**3. Automated Workflow Responses via GitHub CLI**
If a gate fails—such as someone modifying protected workspace files or creating drift—you can automate a remediation response using the GitHub CLI directly in your workflow. For example, if a user edits core configuration files they shouldn't, an automated CI step can use `gh pr comment` to instantly notify them with contributing guidelines and use `gh pr edit --add-label 'invalid'` to flag the drift.

## **Notebook:** Code / Language / Tooling / Linters

The recommended plugin for enforcing import boundaries is **`eslint-plugin-boundaries`**. This plugin helps maintain a clean architecture in JavaScript and TypeScript projects by allowing you to define architectural elements (like layers) and specify dependency rules for how they are allowed to interact, giving you instant ESLint errors when a boundary is violated.

Here are the documented configuration options and examples for using this plugin:

**1. Installation**
First, install the plugin alongside ESLint:

```bash
npm install eslint eslint-plugin-boundaries --save-dev
```

**2. Defining Architectural Elements**
You define the different elements of your project's architecture within your ESLint configuration using the `settings` object under the `"boundaries/elements"` key. In the following example, the project is divided into `controllers`, `models`, and `views` based on file path patterns:

```javascript
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "controllers", pattern: "controllers/*" },
        { type: "models", pattern: "models/*" },
        { type: "views", pattern: "views/*" },
      ],
    },
  },
];
```

**3. Configuring Dependency Rules**
Once your elements are defined, you can enforce import boundaries using the `"boundaries/element-types"` rule. This option accepts a default behavior (such as `"disallow"`) and an array of rules specifying what imports are allowed or disallowed from certain element types:

```javascript
{
  rules: {
    "boundaries/element-types": [2, {
      default: "disallow",
      rules: [
        { from: "controllers", allow: ["models", "views"] },
        { from: "views", allow: ["models"] },
        { from: "models", disallow: ["*"] }
      ]
    }]
  }
}
```

**Resulting Behavior**
With the above rules configured, ESLint will catch violations in real time. For example, if you attempt to import a `View` into a `model` component, it will trigger an architectural boundary violation error because `models` are explicitly configured to disallow imports from any other element (`["*"]`):

```javascript
// In src/models/model.js
import View from "../views/view"; // ❌ Error: Architectural boundary violated
```

To write a minimal ESLint configuration that blocks cross-app imports while allowing shared package imports, you can use **`eslint-plugin-boundaries`**. This plugin is specifically designed to enforce architectural boundaries and dependency rules, making it perfect for monorepos.

Because ESLint v9 and v10 use the "flat config" format (`eslint.config.js`) by default, you will import the plugin as an object and define your boundaries in the `settings` and `rules` objects.

Here is a minimal `eslint.config.js` file to achieve this:

```javascript
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        {
          type: "app",
          pattern: "apps/*", // Identifies anything in the apps directory as an "app"
        },
        {
          type: "package",
          pattern: "packages/*", // Identifies anything in the packages directory as a "package"
        },
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,
        {
          // By default, disallow all imports between defined elements unless explicitly allowed below
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["package"], // Apps can import from packages. Because "app" isn't listed here, cross-app imports are blocked.
            },
            {
              from: "package",
              allow: ["package"], // Packages can import from other shared packages, but not from apps.
            },
          ],
        },
      ],
    },
  },
];
```

### How it works:

1. **`boundaries/elements` setting**: This tells the plugin how to categorize different parts of your codebase. We define two elements: `app` (matching `apps/*`) and `package` (matching `packages/*`).
2. **`boundaries/element-types` rule**: We set the `default` behavior to `"disallow"`, meaning all interactions between our defined elements are strictly forbidden unless we specify otherwise.
3. **Allowances**: We explicitly configure the rules so that elements of type `app` are only allowed to import from elements of type `package`. Because `app` is missing from the `allow` array, attempting to import from one app into another app will trigger an immediate ESLint error.
   Based on the official TypeScript documentation, the most important rule for structuring your codebase is that **you should not use the `paths` option to artificially resolve packages in a monorepo**.

While it is a common misconception to use `paths` to point to `packages/*` or `apps/*`, doing so overrides standard package resolution features (like `main`, `types`, and `exports` fields in your `package.json`), which can lead to runtime failures and surprising behavior.

Instead, you should structure your repository using **package manager workspaces** alongside **TypeScript Project References**. Here is the recommended way to set this up so that editors and the type-checker consistently resolve your code:

### 1. Use Workspaces for Resolution

Use the workspace feature of your package manager (npm, yarn, or pnpm) to symlink your packages into the central `node_modules` directory. This allows TypeScript, as well as your bundler or runtime, to perform real, accurate `node_modules` package lookups.

### 2. Set up a "Solution-Style" Root `tsconfig.json`

At the root of your repository, do not use a massive `include` array to pull in every file. Instead, create a "solution-style" `tsconfig.json`. This file should have an empty `files` array to prevent double-compilation, and use the `references` array to point to the actual sub-projects.

```json
// tsconfig.json (Root)
{
  "files": [],
  "references": [
    { "path": "./packages/ui-lib" },
    { "path": "./packages/core" },
    { "path": "./services/api" },
    { "path": "./apps/web" }
  ]
}
```

_Note: You can point the `path` directly to the directory containing the sub-project's `tsconfig.json`._

### 3. Structure Individual Project `tsconfig.json` Files

Inside each specific package, app, or service, create an individual `tsconfig.json`.

In these files, you will use the `include` array strictly scoped to that specific project's source files. Crucially, any project that is referenced by another project must have the **`composite`** compiler option enabled so that TypeScript can easily track its build outputs.

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

If one of your internal projects depends on another, you should reference it directly in that project's `tsconfig.json` rather than relying on `paths`:

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "references": [{ "path": "../../packages/core" }]
}
```

When you reference a project this way, importing from it will correctly load its output `.d.ts` declaration file, and editors will transparently navigate and edit code across your project boundaries.

### When should you actually use `paths`?

The `paths` array should be reserved for **convenience path aliases within a single project** (e.g., mapping `@app/components/*` to `./src/components/*`), usually to match an identical alias set up in your bundler configuration. It should not be used to bridge boundaries between separate packages.
To ensure that prohibited cross-app imports (architectural boundary violations) automatically fail your build processes, you should combine the enforcement features of the `eslint-plugin-boundaries` plugin with standard ESLint workflow strategies.

Here are the recommended strategies for both local development and Continuous Integration (CI):

### 1. Configure the Rule Severity to "Error"

The foundation of failing a build is ensuring your lint rules emit the correct severity. In your ESLint configuration, set the `boundaries/element-types` rule severity to `"error"` (or `2`).

- **Why this matters:** By default, ESLint only exits with a non-zero exit code (which fails a build) when it encounters an `"error"`. Setting the rule to `"warn"` will just output a warning and the build will continue to pass.

### 2. Local Development Strategies

To catch prohibited imports before they are even pushed to your repository, employ the following strategies locally:

- **Editor Integration:** Because `eslint-plugin-boundaries` provides immediate feedback, ensure developers have an ESLint extension (like the VS Code ESLint extension) installed and configured. This highlights prohibited imports directly in the code editor in real time.
- **Pre-commit Hooks:** Use tools like `husky` and `lint-staged` to automatically run ESLint on changed files right before a commit is finalized. If the pre-commit script detects an architectural violation (an error), the commit is aborted, forcing the developer to fix the cross-app import locally.

### 3. Continuous Integration (CI) Strategies

In your CI pipeline, the goal is to gate merges and deployments if architectural rules are broken:

- **Standard CLI Execution:** Run the ESLint CLI (e.g., `npx eslint .`) as a mandatory step in your CI pipeline. If any cross-app import violations are found, ESLint will automatically return an exit code of `1`. Most CI systems will interpret this non-zero exit code as a failure and halt the pipeline.
- **Enforcing Strict Warning Thresholds:** If you have chosen to set the boundary rule (or any other rule) to `"warn"` instead of `"error"`, you can force the CI build to fail anyway by using the `--max-warnings` flag. Running `npx eslint . --max-warnings 0` will force ESLint to exit with an error status if even a single warning-level violation is found.
  To ensure a fail-closed enforcement of import boundaries (meaning any architectural violation explicitly prevents the code from being committed or merged), you must implement a combination of configuration invariants and pipeline middleware.

Here are the specific requirements documented for a robust, fail-closed setup:

### 1. Invariant: Strict "Error" Rule Severity

The foundational invariant is that your `eslint-plugin-boundaries` rules **must be configured with a severity of `"error"` (or `2`)**.

- **Why it's required:** ESLint is designed to exit with a non-zero status code (Exit Code 1) if and only if a rule configured as an `"error"` is triggered. If the rule is configured as `"warn"`, it will output a message but exit with code 0, allowing the build to pass and failing the closed-loop enforcement.

### 2. Middleware: Pre-Commit Hooks (Local Enforcement)

To catch import boundary violations before they even enter version control, you should implement pre-commit checks.

- **How to implement:** You can use tools like **`husky`** combined with **`lint-staged`** to automatically run ESLint on staged files before allowing a commit.
- **Configuration Note:** If you are running both ESLint and a code formatter (like Prettier) in your pre-commit hook, ensure that `lint-staged` is configured to run ESLint _before_ the formatter.

### 3. Middleware: Continuous Integration (CI)

Local hooks can be bypassed (e.g., using `git commit --no-verify`), so you must enforce compliance during continuous integration testing.

- **How to implement:** Add an ESLint verification step (e.g., `npx eslint .`) to your CI pipeline. Because your boundaries rule is set to `"error"`, any cross-app import violations will return Exit Code 1, successfully failing the CI build.
- **Strict Warning Enforcement (Optional):** If you want to ensure that even boundary rules temporarily downgraded to `"warn"` fail the build, you can run ESLint in your CI with the **`--max-warnings 0`** flag. This forces ESLint to exit with an error status if even a single warning is present.

### 4. Middleware: Branch Protection Rules (Pull Request Enforcement)

Finally, to completely seal the repository from boundary violations, your version control system (e.g., GitHub, GitLab) must enforce branch protection.

- **How to implement:** Configure your repository settings to require the ESLint CI status checks to pass before a Pull Request can be merged. The project maintainer guidelines emphasize that a pull request with failing automated tests or CI builds should **never** be merged.
  Based on the provided sources, there is no mention of a "HARD LOCK zone" or specific "audit and audit-log requirements" for forensically tracing lint bypasses.

However, the sources do detail several configuration options in ESLint that can be used to strictly enforce lint rules and prevent developers from bypassing them:

- **Disabling Inline Configuration (`noInlineConfig`):** You can completely prevent developers from using inline comments like `/* eslint-disable */` or `// eslint-disable-line` to bypass rules. If someone attempts to add an inline configuration comment, ESLint will simply ignore it. This can be enforced by setting `noInlineConfig: true` in your `linterOptions` within `eslint.config.js` or by using the `--no-inline-config` CLI flag.
- **Tracking Unused Disable Directives (`reportUnusedDisableDirectives`):** If you do allow inline disable comments, you can require ESLint to report an error or warning if a disable directive is left in the code but isn't actually suppressing an error. This prevents old suppressions from lingering and masking future issues. This is configured in `linterOptions` or via the `--report-unused-disable-directives` CLI flag.
- **Tracking Unused Inline Configs (`reportUnusedInlineConfigs`):** You can also instruct ESLint to report inline config comments (like `/* eslint rule-name: "error" */`) that match what is already configured, keeping the files devoid of misleading clutter.

If you are implementing a custom security standard (like a "HARD LOCK zone"), you may need to rely on external CI/CD pipeline auditing tools, Git commit histories, and code review branch protection rules to forensically trace configuration file tampering, as ESLint itself does not generate separate audit logs.
