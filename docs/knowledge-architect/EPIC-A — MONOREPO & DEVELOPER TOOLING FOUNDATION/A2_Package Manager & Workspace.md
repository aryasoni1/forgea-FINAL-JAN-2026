### Feature Summary

- EPIC-A / A2 — Package Manager & Workspace: Resolve pnpm workspace inconsistencies and produce a minimal, authoritative workspace configuration and checklist ensuring `pnpm` operations (install, hoisting, turbo runs) include `apps/*`, `packages/*`, and `services/*` consistently across developer machines and CI.

### Notebook Breakdown

- **Notebook: division_category/07-devops-ci-cd-infra-tooling.md**
  - Source Links (verbatim excerpts found in this notebook):
    - https://pnpm.io/
    - https://pnpm.io/workspaces
    - https://pnpm.io/installation
    - https://turbo.build/repo/docs
    - https://nodejs.org/en/

### Targeted Questions (for NotebookLM review)

Beginner (Level 1) — local setup and reproducible installs:

1. Based on the provided documentation, what exact `pnpm` and Node version pairs should be used to match `packageManager: pnpm@10.28.1` in the repo, and what minimal local install commands must a developer run to replicate CI (`pnpm install --frozen-lockfile`)? (Notebook: pnpm-Documentation.md)
2. Based on the provided documentation, which file is canonical for workspace package globs in pnpm workspaces (root `package.json` `workspaces` vs `pnpm-workspace.yaml`) and what are the consequences of mismatches? (Notebook: 07-devops-ci-cd-infra-tooling.md)
3. Based on the provided documentation, what minimal check list can a developer run locally to detect missing workspace packages (commands and expected outputs)? (Notebook: pnpm-Documentation.md)
4. Based on the provided documentation, what is the minimal `pnpm-workspace.yaml` entry to ensure `services/*` participates in workspace linking and hoisting? (Notebook: pnpm-Documentation.md)
5. Based on the provided documentation, what guidance should be recorded in `/docs/toolchain-versions.md` to avoid `pnpm` version drift across contributors? (Notebook: 07-devops-ci-cd-infra-tooling.md)

Intermediate (Level 2) — integration, CI, and turbo interactions:

6. Based on the provided documentation, how should `package.json` `workspaces` and `pnpm-workspace.yaml` be reconciled and validated in CI (what exact commands or scripts to run in a CI job)? (Notebook: Turborepo-Documentation.md)
7. Based on the provided documentation, what are the recommended CI steps to ensure `pnpm` installs, Turbo caches, and `turbo run` commands all see the same set of workspace packages, and what caching flags are recommended? (Notebook: Turborepo-Documentation.md)
8. Based on the provided documentation, how should `services/*` be included in monorepo tooling (turbo, tsconfig references, and workspace scripts) to avoid resolution errors? (Notebook: 07-devops-ci-cd-infra-tooling.md)
9. Based on the provided documentation, what automated validation (pre-merge or CI lint) can detect `workspaces`/`pnpm-workspace.yaml` drift and fail the PR with a clear remediation message? (Notebook: pnpm-Documentation.md)
10. Based on the provided documentation, what are the minimal `packageManager` and `engines` fields that should be present in `package.json` to help enforce environment consistency? (Notebook: 07-devops-ci-cd-infra-tooling.md)

Senior (Level 3) — invariants, fail-closed, and auditability:

11. Based on the provided documentation, what machine-checkable invariants must be recorded for HARD-LOCK enforcement (e.g., `pnpm` version pin present, `pnpm-workspace.yaml` includes `services/*`, CI enforces `--frozen-lockfile`) and where should they be recorded? (Notebook: 07-devops-ci-cd-infra-tooling.md)
12. Based on the provided documentation, what steps and signals should the CI produce when workspace mismatches are detected (exit codes, log snippets, and suggested remediation steps)? (Notebook: pnpm-Documentation.md)
13. Based on the provided documentation, what rollback or remediation process should be defined if a workspace change breaks CI due to missing packages (who to notify, emergency revert steps)? (Notebook: Turborepo-Documentation.md)
14. Based on the provided documentation, what compatibility checks should be added to the task to validate `pnpm@10.28.1` against the repository's Node and `turbo` versions before enforcing a hard lock? (Notebook: 07-devops-ci-cd-infra-tooling.md)
15. Based on the provided documentation, what exact acceptance criteria (files present, CI job names, and validation commands) must be satisfied before the planner marks A2 as complete? (Notebook: pnpm-Documentation.md)

### Manual Readiness Checklist

- Ensure `/forgea-monorepo/pnpm-workspace.yaml` includes `services/*` to match root `package.json` `workspaces` array.
- Record `pnpm@10.28.1` and Node engine constraints in `/docs/toolchain-versions.md`.
- Add an automated CI validation that runs `pnpm -v`, `pnpm install --frozen-lockfile`, and a workspace listing check (`pnpm -w recursive exec -- pnpm ls --depth 0` or equivalent) and fails on mismatch.
- Create a short README entry under `/docs/` describing the canonical source-of-truth for workspace globs (package.json vs pnpm-workspace.yaml) and the chosen policy.
- Include placeholder for Docs Gatekeeper approval artifact in the task doc (if gatekeeper not yet run).

---

Reference: This study guide is derived from the Code Scout report `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md` and is intended for NotebookLM review and planner consumption.

Based on the provided documentation, what exact pnpm and Node version pairs should be used to match packageManager: pnpm@10.28.1 in the repo, and what minimal local install commands must a developer run to replicate CI (pnpm install --frozen-lockfile)?

Based on the provided documentation, here are the version pairs and commands you need:

1. Compatible pnpm and Node.js Version Pairs To run pnpm@10.28.1 (which falls under the pnpm v10 releases), you must use one of the following supported Node.js versions:
   Node.js 18 (specifically v18.12 or higher)
   Node.js 20
   Node.js 22
   Node.js 24
   (Note: Node.js 14 and 16 are not supported by pnpm v10.)
2. Minimal Local Install Commands to Replicate CI To strictly match the packageManager: pnpm@10.28.1 field and perform a clean install that mimics your CI pipeline, a developer should run the following commands:
   corepack enable pnpm
   pnpm install --frozen-lockfile
   Why these commands?
   corepack enable pnpm: Because Node.js ships with Corepack (an experimental package manager manager), running this command tells your system to automatically download and run the exact pnpm version specified in the packageManager field of your package.json.
   pnpm install --frozen-lockfile: This replicates the standard CI behavior by strictly installing dependencies from pnpm-lock.yaml. It prevents pnpm from generating or updating the lockfile, and it will intentionally fail if the lockfile is missing or out of sync with the manifest.
   How do I setup pnpm caching in GitHub Actions?
   What is pnpm engineStrict and should I enable it?
   How does Corepack manage different pnpm versions automatically?

Based on the provided documentation, which file is canonical for workspace package globs in pnpm workspaces (root package.json workspaces vs pnpm-workspace.yaml) and what are the consequences of mismatches?

In pnpm workspaces, the pnpm-workspace.yaml file is the canonical location for defining workspace package globs. A pnpm workspace must have this file in its root, and it uses the packages field to include or exclude directories (e.g., apps/_, packages/_).
By contrast, the workspaces array inside the root package.json is the configuration convention used by other package managers like npm, Yarn, and Bun. Turborepo's structural examples specifically omit the workspaces array from the root package.json when setting up a pnpm workspace, while explicitly requiring it for the others.
Consequences of mismatches The provided documentation does not explicitly detail the exact consequences of a direct mismatch between a pnpm-workspace.yaml file and a package.json workspaces array. However, the sources highlight the following consequences for improper workspace configuration:
Missing Canonical Configuration: If the pnpm-workspace.yaml file is missing, pnpm will fail to recognize the workspace, which results in errors such as --workspace-root may only be used inside a workspace during installation.
Resolution Issues: Failing to correctly configure the workspace paths causes "workspace resolution errors" that must be fixed for the monorepo tools to function.
Glob Ambiguity Errors: Regardless of which file is used, configuring nested packages using double-star globs (like apps/** or packages/**) leads to "ambiguous behavior among package managers in the JavaScript ecosystem." Because of this ambiguity, using these globs will result in a direct error from Turborepo.
What are the errors for nested double-star globs?
How do I fix workspace resolution errors in pnpm?
Tell me more about the pnpm-workspace.yaml packages field.

Based on the provided documentation, what minimal check list can a developer run locally to detect missing workspace packages (commands and expected outputs)?

Here is a minimal checklist a developer can run locally to detect and troubleshoot missing workspace packages, based on the provided documentation:

1. List discovered packages using Turborepo
   Command: turbo ls
   Expected Output: A list of all packages successfully discovered in your repository alongside their file paths (e.g., @repo/ui packages/ui). If a package is missing from this output, it has not been properly registered in the workspace.
2. List projects recognized by the package manager
   Command: pnpm ls --depth -1 -r (or pnpm ls --depth -1 inside the workspace)
   Expected Output: A list displaying only the projects (packages) that pnpm recognizes in the workspace. If a package is missing here, the issue is with pnpm's resolution rather than Turborepo.
3. Validate workspace dependency resolution
   Command: pnpm install
   Expected Output: The installation should complete successfully without any workspace resolution errors. If there are misconfigured internal dependencies (e.g., requesting a version of a workspace package that doesn't exist), this command will throw an error.
4. Verify configuration requirements (if packages are still missing) If the commands above indicate a package is missing, verify the following workspace requirements:
   Check pnpm-workspace.yaml: Ensure the configuration file explicitly declares the directories containing your packages (e.g., apps/_ and packages/_).
   Check for package.json: Every package directory must contain its own package.json file with a valid name field. Without it, the package manager and Turborepo cannot discover the directory as a package.
   Check for unsupported nesting: Ensure you are not using nested globs like apps/** or packages/** in your workspace configuration, as Turborepo does not support nested packages due to ambiguous package manager behavior.
   How do I add an internal package to an app?
   What is the difference between pnpm deploy and turbo prune?
   How do I configure shared TypeScript configs in a monorepo?

Based on the provided documentation, what is the minimal pnpm-workspace.yaml entry to ensure services/\* participates in workspace linking and hoisting?

Based on the provided documentation, the minimal pnpm-workspace.yaml entry to ensure the services/\* directory participates in the workspace is:
packages:

- "services/\*"
  If you are setting this up to match the full monorepo structure outlined in the "EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION" requirements, your configuration should also include your apps and packages:
  packages:
- "apps/\*"
- "packages/\*"
- "services/_"
  How it works: The pnpm-workspace.yaml file defines the root of the workspace and uses the packages array to determine which directories to include or exclude. By adding "services/_" to this list, pnpm will automatically discover any directory within services/ that contains a package.json file and treat it as a package within the workspace, allowing it to participate in local linking and dependency hoisting.
  How do I add the apps and packages directories too?
  Can pnpm automatically discover these service packages in subdirectories?
  What is the benefit of using workspace linking and hoisting?

Based on the provided documentation, what guidance should be recorded in /docs/toolchain-versions.md to avoid pnpm version drift across contributors?

Based on the provided documentation, you should record the following guidance in your /docs/toolchain-versions.md to ensure reproducible environments and prevent pnpm version drift across contributors:
Pin the version with Corepack: Instruct contributors to use Node.js's experimental Corepack feature by running corepack enable pnpm followed by corepack use pnpm@<version> (e.g., corepack use pnpm@latest-10). This automatically adds a "packageManager" field to the root package.json.
Rely on the packageManager field: Document that the "packageManager" field in the root package.json is the authoritative source for the repository's pnpm version. This instructs Corepack to always use the specified version for that project, ensuring all developers use the exact same version.
Enforce strict versioning: To strictly enforce this across the workspace, you can configure packageManagerStrictVersion to true in your pnpm settings. When enabled, pnpm will fail to run if its version doesn't exactly match the version specified in the packageManager field.
Leverage automatic version management: Note that by default, pnpm has managePackageManagerVersions set to true, which allows it to automatically download and run the specific version of pnpm declared in the packageManager field.
How do I set the packageManagerStrictVersion in pnpm?
How do I configure pnpm in a GitHub Actions workflow?
What does managePackageManagerVersions do for developers?

Based on the provided documentation, how should package.json workspaces and pnpm-workspace.yaml be reconciled and validated in CI (what exact commands or scripts to run in a CI job)?

The provided sources do not contain any specific instructions, exact commands, or scripts for explicitly reconciling a package.json workspaces field with pnpm-workspace.yaml in a CI job.
However, the documentation clarifies how these files function and how the workspace is generally validated:
Configuration Differences: pnpm uses the pnpm-workspace.yaml file to define workspace package directories (e.g., apps/_, packages/_, services/\*). The workspaces array in package.json is the equivalent configuration used by other package managers like yarn, npm, and bun.
Workspace Validation: To validate the workspace layout and check for workspace resolution errors, the prescribed step is to run the pnpm install command. In a CI pipeline, this is typically executed as pnpm install --frozen-lockfile, which will intentionally fail if the lockfile is missing or out of sync with the current workspace and dependencies.
Future Tooling: The project's orchestrator notes acknowledge a current gap in dedicated validation tooling, specifically suggesting a future improvement to "Add a 'workspace-config verifier' agent to validate pnpm workspace topology quickly".
How can I automate workspace validation using pnpm's engineStrict setting?
What is the benefit of using a single pnpm-lock.yaml file?
How do I configure pnpm to avoid merge conflicts in lockfiles?

Based on the provided documentation, what are the recommended CI steps to ensure pnpm installs, Turbo caches, and turbo run commands all see the same set of workspace packages, and what caching flags are recommended?

To ensure pnpm and turbo work together seamlessly in continuous integration (CI) and consistently understand your monorepo's workspace topology, you should follow a specific sequence of steps and caching strategies.
Recommended CI Steps
A robust GitHub Actions CI pipeline for a Turborepo using pnpm should be structured as follows:
Check out the code with history: Use actions/checkout@v4 and set fetch-depth: 2 (or greater). This is critical because Turborepo needs Git history to accurately use the --affected flag to determine which packages changed.
Cache the Turborepo outputs: Use actions/cache@v4 to cache the .turbo directory before running your build steps. This allows Turborepo to restore previously built artifacts.
Set up pnpm: Use the pnpm/action-setup action to install pnpm.
Set up Node.js and cache pnpm dependencies: Use actions/setup-node@v4 to specify your Node version and set cache: 'pnpm'. This caches the pnpm global store, speeding up future dependency installations.
Install dependencies: Run pnpm install. Because it is a CI environment, pnpm automatically defaults to --frozen-lockfile=true, meaning it will strictly use the pnpm-lock.yaml file and intentionally fail if the lockfile is missing or needs updates.
Run Turborepo tasks: Delegate your CI execution to Turbo by running the scripts defined in your root package.json (e.g., pnpm build or pnpm test), which should alias to turbo run build or turbo run test.
Ensuring Both Tools See the Same Workspace Packages
To guarantee that pnpm, your local caches, and turbo run all resolve the exact same set of workspace packages, you must align their configuration:
Define the workspace consistently: Ensure you have a pnpm-workspace.yaml file that explicitly lists your package locations (e.g., apps/_, packages/_, services/\*). Turborepo natively understands this file and uses it to discover your packages.
Declare the Package Manager: You must add the packageManager field to your root package.json (e.g., "packageManager": "pnpm@10.28.1"). Turborepo relies heavily on this field and your lockfile to stabilize the workspace, understand the dependency graph, and create caching hashes.
Commit the Lockfile: Ensure pnpm-lock.yaml is committed. Turborepo uses the lockfile to understand the dependencies between internal packages within your workspace. Missing lockfiles can result in unpredictable behavior.
Recommended Caching Flags and Configurations
To optimize performance, the following caching configurations are recommended:
For pnpm: Use cache: 'pnpm' inside the actions/setup-node step. When running the install, pnpm install inherently respects the lockfile in CI (equivalent to --frozen-lockfile), which prevents unnecessary dependency resolution overhead.
For Turborepo Local Caching: Configure the actions/cache@v4 step with the path .turbo, using a dynamic cache key like ${{ runner.os }}-turbo-${{ github.sha }} and a restore key of ${{ runner.os }}-turbo-. This allows CI to hit the cache on subsequent runs despite changes in the Git SHA.
For Turborepo Execution (turbo run): Use the --affected flag (e.g., turbo run build --affected) to instruct Turborepo to solely run tasks for packages that have source control changes.
For Turborepo Remote Caching: If using a remote cache (like Vercel Remote Cache), inject the TURBO_TOKEN and TURBO_TEAM environment variables into your pipeline. Remote cache allows your CI to pull cached artifacts generated by your teammates and previous workflows without recalculating them.
How do I enable Remote Caching in my CI?
What are the best practices for setting up Turbo tasks?
How can I use the --affected flag to speed up CI?

Based on the provided documentation, how should services/\* be included in monorepo tooling (turbo, tsconfig references, and workspace scripts) to avoid resolution errors?

To ensure services/\* is properly included in your monorepo tooling and to avoid workspace resolution errors, you must integrate it through your package manager's workspace file, root configurations, and package-level settings:

1. Workspace Inclusion (The Prerequisite) Before any monorepo tooling can recognize services/_, it must be explicitly defined in your package manager's workspace configuration. For a pnpm monorepo, you must add - "services/_" to the packages array in your pnpm-workspace.yaml. Additionally, every individual service within that directory must have its own package.json file with a valid name field for the package manager and Turborepo to discover it.
2. Turborepo Configuration (turbo) Turborepo automatically understands your repository structure by reading the package manager's workspace configuration, meaning you do not need to explicitly list services/_ inside your turbo.json. To include a service in a Turbo pipeline:
   Ensure the service's package.json includes the scripts (e.g., build, dev, lint, test) that correspond to the tasks defined in your root turbo.json.
   When you run a command like turbo run build, Turborepo will automatically search the workspace (including services/_) for packages with a matching script and execute them.
3. TypeScript Configuration (tsconfig references) The provided documentation specifically recommends against using TypeScript Project References, noting that they introduce unnecessary complexity and an extra caching layer that can cause problems in a Turborepo. Instead, to avoid resolution errors and ensure proper caching, each service inside services/\* should have its own local tsconfig.json file. This local configuration should extend a shared base configuration package from your workspace (e.g., using "extends": "@repo/typescript-config/base.json") rather than referencing a root tsconfig.json directly.
4. Workspace Scripts For workspace-level scripts, you should define commands in your root package.json that delegate directly to Turborepo (e.g., "build": "turbo run build", "dev": "turbo run dev"). You should avoid writing turbo commands into the package.json of the services themselves to prevent recursive calls. Because services/\* is registered in the pnpm-workspace.yaml, running these root scripts will automatically orchestrate and execute the appropriate tasks across all apps, packages, and services in the correct dependency order.
   How do I configure TypeScript base files for services?
   What is the best way to handle service environmental variables?
   How can I test the monorepo from a cold start?

Based on the provided documentation, what automated validation (pre-merge or CI lint) can detect workspaces/pnpm-workspace.yaml drift and fail the PR with a clear remediation message?

Based on the provided documentation, there is no native CLI command or out-of-the-box CI linter explicitly designed to detect drift between package.json workspaces and pnpm-workspace.yaml and fail a PR with a remediation message.
However, the documentation outlines the following current practices and planned automated validations for this exact issue:

1. The Planned "Workspace-Config Verifier" The project's orchestrator notes explicitly identify this validation gap. The documented plan is to introduce a custom automated agent to handle this:
   "Add a 'workspace-config verifier' agent to validate pnpm workspace topology quickly." This agent would presumably act as the automated check to fail PRs when topology drift occurs.
2. The forgea-code-scout Agent Currently, the documentation defines a forgea-code-scout agent whose specific task is to scan for these configuration files and identify drift or partial setups. Its instructions are to:
   "Scan for existing pnpm-workspace.yaml, root package.json, packageManager field, scripts section, and any workspace resolution issues."
   "Report what exists, partials, and missing."
3. Standard CI Validation (pnpm install) Until the custom verifier agent is implemented, the documented step for validating the workspace configuration and catching missing packages or configuration drift is to run the package manager's install command:
   Running pnpm install will actively validate the workspace. If the configuration is out of sync or packages are missing, it will throw "workspace resolution errors". In a CI/pre-merge environment, running this (typically as pnpm install --frozen-lockfile) acts as the primary gatekeeper, naturally failing the PR if the workspace is broken.
   How can I set up the planned workspace-config verifier?
   Tell me more about the forgea-code-scout agent's capabilities.
   How does Turborepo use the packageManager field for stability?

Based on the provided documentation, what are the minimal packageManager and engines fields that should be present in package.json to help enforce environment consistency?

Based on the provided documentation, here are the minimal packageManager and engines fields that should be present in your root package.json to enforce environment consistency:
{
"packageManager": "pnpm@10.28.1",
"engines": {
"node": ">=18.12",
"pnpm": ">=10"
}
}
Why these fields are required for consistency:

1. The packageManager field
   Corepack Enforcement: Adding this field instructs Node.js's Corepack to always automatically download and run the exact specified version of the package manager for all contributors, ensuring reproducibility.
   Turborepo Stability: Turborepo relies on the packageManager field to understand your repository's lockfile, determine caching behavior, and build the Package Graph accurately.
2. The engines field
   Local Development Validation: You can specify the required versions of node and pnpm that your project works on. During local development, pnpm will automatically fail with an error message if the active pnpm version does not match what is specified in the engines field.
   Turborepo Cache Hashing: Turborepo specifically looks at the engines field in the root package.json and incorporates it into the global hash. This means if you bump your Node.js version requirements, Turborepo will automatically invalidate the cache so you don't use artifacts built for a different Node environment.
   Strict Dependency Resolution: To strictly enforce that no contributor installs a dependency incompatible with your Node.js version, you can define engines alongside the engineStrict: true and nodeVersion configurations in your pnpm-workspace.yaml (or .npmrc). When enabled, pnpm will actively refuse to install packages that claim to be incompatible with your environment.
   How do I setup Turborepo Remote Caching in CI?
   How does engineStrict protect my production Node.js environment?
   How can I avoid merge conflicts in pnpm-lock.yaml?

Based on the provided documentation, what machine-checkable invariants must be recorded for HARD-LOCK enforcement (e.g., pnpm version pin present, pnpm-workspace.yaml includes services/\*, CI enforces --frozen-lockfile) and where should they be recorded?

Based on the provided documentation for the "EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION," the following machine-checkable invariants must be established to satisfy the HARD-LOCK enforcement, along with their designated recording locations:
Machine-Checkable Invariants To finalize the monorepo foundation and trigger the HARD LOCK, the following structural and tooling invariants must be strictly met:
Workspace Paths Configured: The pnpm-workspace.yaml must explicitly declare the workspace paths to include apps/_, packages/_, and services/\*.
Package Manager Pinning: The exact pnpm version must be locked using the packageManager field inside the root package.json.
Root Privacy: The root package.json must be explicitly set to "private": true.
Boundary Enforcement: A strict "no cross-app imports" convention must be enforced, and folder boundaries between apps/, packages/, and services/ must be respected.
Dependency Health: The repository must be validated to ensure there are no circular dependencies and that workspace isolation is maintained.
Configuration Lock: Once the epic is complete, all root configuration files, workspace configurations, and specific tooling configs (Turbo, TS, ESLint, Prettier) are declared under a "HARD LOCK," meaning any future modifications require explicit lock override approval.
Where They Should Be Recorded The documentation specifies several locations where these invariants and their validation mechanisms must be recorded:
Architecture & Invariants Documentation: Under Feature A10, these rules should be officially recorded as "monorepo invariants" alongside the architecture notes.
Task Documents: The authoritative task documents dictating these scope and invariant requirements are produced by the planner-architect agent and placed in /docs/tasks/.
Mandatory Test Plans: The actionable, machine-checkable test steps used to verify these invariants are recorded by the implementer agent in mandatory test plans located at /docs/tests/task-<ID>-tests.md.
Future Verifier Agent: Finally, the orchestrator notes specify a planned improvement to add a dedicated "workspace-config verifier" agent, which will be responsible for rapidly validating this pnpm workspace topology.
How is the HARD LOCK enforced on root configurations?
What are the recommended TypeScript best practices for Turborepo?
How do you configure the planned workspace verifier agent?

Based on the provided documentation, what steps and signals should the CI produce when workspace mismatches are detected (exit codes, log snippets, and suggested remediation steps)?

Based on the provided documentation, here is how the CI should detect, signal, and help remediate workspace mismatches and resolution errors:

1. CI Execution Steps for Detection To detect workspace mismatches in CI, the pipeline should run pnpm install. In a CI environment, pnpm automatically detects the environment and acts strictly (equivalent to using the --frozen-lockfile flag). It will actively validate the workspace and fail if the lockfile is out of sync with the manifest, if an update is needed, or if the lockfile is missing.
2. Signals and Exit Codes
   Non-zero exit code: If a workspace mismatch or resolution error occurs during the installation or build step, the process will yield a non-zero exit code.
   Check Run Failure: GitHub Actions interprets any non-zero exit code as a step failure, automatically marking the job and the overall check suite with a failure status.
   failIfNoMatch Exit Code: If a script explicitly tries to filter for a specific workspace package that cannot be found due to a configuration mismatch, setting failIfNoMatch: true in the pnpm configuration will force the CLI to exit with a non-zero code.
3. Expected Log Snippets When the CI job fails due to workspace issues, developers should look for the following log snippets:
   Out-of-sync lockfile errors: Logs indicating that the lockfile is out of sync with the package.json manifest.
   Workspace resolution errors: Logs indicating workspace resolution issues where a package cannot resolve a local dependency.
   Cyclic dependency warnings: There are cyclic workspace dependencies (if the mismatch introduces a dependency loop, pnpm will output this specific warning and display the dependencies causing the cycle).
4. Suggested Remediation Steps If the CI produces these signals, the developer should follow these remediation steps locally:
   Fix cycle errors: If cyclic dependencies are flagged, inspect the dependencies, devDependencies, and optionalDependencies in the relevant workspace packages to break the loop.
   Verify workspace configuration: Ensure that the pnpm-workspace.yaml file properly includes all package directories (e.g., apps/_, packages/_, services/\*).
   Re-run installation locally: Run pnpm install locally to fix any workspace resolution errors and properly synchronize the pnpm-lock.yaml file, then commit the updated lockfile and configuration to source control.
   Future Automation: As noted in the architecture plans, developers will eventually be able to rely on a dedicated "workspace-config verifier" agent to quickly validate the pnpm workspace topology.
   How do I configure the workspace-config verifier agent?
   Tell me more about the forgea-code-scout agent's capabilities.
   What are the common causes of cyclic workspace dependencies?

Based on the provided documentation, what rollback or remediation process should be defined if a workspace change breaks CI due to missing packages (who to notify, emergency revert steps)?

Based on the provided documentation, there is no specific rollback or remediation process defined for when a workspace change breaks CI due to missing packages. The sources do not contain an emergency contact list (who to notify) or explicit step-by-step emergency revert instructions.
However, the documentation does outline several guardrails and concepts that would govern or assist such a remediation process:
HARD LOCK and Approvals: Once the initial monorepo foundation (EPIC-A) is completed, the workspace configurations are placed under a "HARD LOCK" policy. Any future modifications to these root and workspace configuration files require "explicit lock override approval". If an emergency revert is needed, it would presumably need to navigate or override this lock policy.
Scanning for Missing Packages: The forgea-code-scout agent is specifically tasked with scanning for "workspace resolution issues" and reporting what is "missing," which would be useful for identifying the root cause during an incident.
Easier Reverts: The general GitHub documentation notes that enforcing a "strictly linear commit history can help teams revert changes more easily," which would be beneficial if an emergency rollback is required.
Because this specific operational runbook is missing from your sources, you will need to independently define and document the emergency revert steps and the exact notification protocols for your team.
How do I define custom protection rules for environments?
Tell me more about the planned workspace-config verifier agent
What is the policy for lock override approval exactly?

Based on the provided documentation, what compatibility checks should be added to the task to validate pnpm@10.28.1 against the repository's Node and turbo versions before enforcing a hard lock?

To validate pnpm@10.28.1 against the repository's Node.js and turbo versions before enforcing the final "HARD LOCK" in EPIC-A, the following compatibility checks and configurations should be added to the task:

1. Node.js Version Compatibility Checks
   Verify Supported Node.js Versions: pnpm v10 requires Node.js v18.12 or higher. Ensure the environment is restricted to the supported Node.js versions: 18, 20, 22, or 24 (Node.js 14 and 16 are explicitly not supported by pnpm 10).
   Enforce engines and engineStrict: The root package.json must specify the compatible Node.js and pnpm versions in the engines field. To make this a strict machine-checkable invariant, enable the engineStrict: true setting in your pnpm configuration so that pnpm actively refuses to install dependencies if the Node version is incompatible.
   Align .nvmrc or useNodeVersion: Ensure the developer environment guardrails (Feature A9) specify a compatible Node version in .nvmrc, or use pnpm's useNodeVersion setting in pnpm-workspace.yaml to automatically install and use the exact required Node.js version.
2. Turborepo Compatibility Checks
   Validate the packageManager Field: Turborepo relies on the packageManager field in the root package.json to understand your lockfile, build the package graph, and guarantee predictable caching behavior. The task must verify this is exactly set to "packageManager": "pnpm@10.28.1".
   Ensure dangerouslyDisablePackageManagerCheck is False: Ensure Turborepo's dangerouslyDisablePackageManagerCheck option is set to false (the default). This guarantees Turborepo will actively validate the lockfile against the declared pnpm version rather than attempting a risky "best-effort" discovery.
3. Strict Package Manager Enforcement
   Enable packageManagerStrictVersion: To prevent version drift across contributors, configure packageManagerStrictVersion: true in pnpm's settings. This forces pnpm to fail immediately if the running version does not perfectly match the 10.28.1 version declared in the package.json.
   Ensure Corepack Setup: Validate that corepack enable pnpm and corepack use pnpm@latest-10 commands are documented or enforced so Corepack seamlessly manages the strict pnpm version.
4. Final Quality Gates (Pre-Lock Validation) Before marking EPIC-A as complete and triggering the "HARD LOCK" on tooling configs, the Feature A11 Verification & Quality Gates must pass:
   Perform a "Cold-Start" Test: Verify that a fresh clone correctly installs dependencies using the pinned pnpm and Node versions without workspace resolution errors.
   Verify Turbo Execution: Run turbo run build and lint to ensure turbo properly recognizes the pnpm lockfile, correctly executes tasks in topological order, and successfully hits the local cache.
   How do I configure the engineStrict setting for environment validation?
   What are the specific storage limits for GitHub Actions caching?
   How can I set up a PostgreSQL service container in CI?

Based on the provided documentation, what exact acceptance criteria (files present, CI job names, and validation commands) must be satisfied before the planner marks A2 as complete?

Based on the provided documentation, the exact acceptance criteria to mark Feature A2 ("Package Manager & Workspace") as complete are as follows:

1. Files Present The following files must be created and properly configured:
   pnpm-workspace.yaml: Must explicitly configure the workspace paths to include apps/_, packages/_, and services/\*.
   Root package.json: Must be created and include "private": true, a placeholder scripts section, and lock the exact pnpm version using the packageManager field.
   Test Plan: The implementer must create a mandatory test plan located at /docs/tests/task-<ID>-tests.md.
2. Validation Commands
   pnpm install: This command must be run to actively validate the workspace and ensure any workspace resolution errors are fixed.
3. CI Job Names
   None are required. The documentation explicitly states that for Feature A2, the qa-tester and integration-checker agents are "Not Required" because there is "No execution verification requested at this stage" and "No end-to-end integration changes". Furthermore, the implementer is explicitly instructed: "Do not run tests".
   Stop Condition The planner and orchestrator consider the feature complete and stop execution when the Implementer finishes executing the approved task document exactly to scope/invariants and the required test plan is successfully created.
