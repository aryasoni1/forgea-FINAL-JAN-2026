---
doc_id: terraform-configuration-policy
tool: Terraform
version_pinned: false
change_sensitivity: HIGH
lifecycle: BLOCKED
---

# Terraform — Configuration & CLI Policy

## Purpose

Governs the configuration of the Terraform CLI (`.terraformrc`), provider installation rules, input variable assignment precedence, and environment-specific behaviors.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official Terraform CLI documentation only
- Version status: BLOCKED – SOURCE AMBIGUOUS (Sources cover CLI v0.12–v1.x behaviors but do not pin a specific version)

## Scope

- Applies to: Terraform CLI execution (`terraform`), `.terraformrc` configuration, provider installation (`provider_installation`), and environment variable usage.
- Does NOT apply to: Terraform Configuration Language (HCL) syntax rules (Resource blocks, Module blocks, Variable `validation` blocks) as these sources were not provided.

## Official Sources (Binding)

- "Configuring the Terraform CLI Global Settings"
- "Mastering the Terraform CLI Environment Variables"
- "Terraform Init Command Reference Guide"
- "Terraform Plan Command Reference Guide"

## Evidence Coverage Matrix

| Policy Area                 | Source URL | Version Covered | Status      |
| --------------------------- | ---------- | --------------- | ----------- |
| CLI Config (`.terraformrc`) | Source     | General         | COVERED     |
| Provider Installation       | Source     | v0.13+          | COVERED     |
| Plugin Caching              | Source     | General         | COVERED     |
| Variable Precedence         | Source,    | General         | COVERED     |
| Language Syntax (HCL)       | N/A        | N/A             | **BLOCKED** |
| PostgreSQL Provider         | N/A        | N/A             | **BLOCKED** |

## Version & Compatibility

- **Tool version:** BLOCKED (Sources reference range from v0.12 to v1.2.0+).
- **Related tooling compatibility:**
  - **HCP Terraform:** Supported via `credentials` blocks and `login` command.

## Canonical Rules (Non-Negotiable)

- **CLI Configuration Location:**
  - On Windows, the file MUST be named `terraform.rc` and located in `%APPDATA%`.
  - On non-Windows, the file MUST be named `.terraformrc` and located in the user's home directory.
  - Location can be overridden via `TF_CLI_CONFIG_FILE`.
- **Provider Installation:**
  - If a `provider_installation` block is present, Terraform will NOT use the implied default installation methods (scanning local directories) unless explicitly configured.
  - `network_mirror` URLs MUST use the `https:` scheme.
  - `filesystem_mirror` MUST contain a nested directory structure: `HOSTNAME/NAMESPACE/TYPE/VERSION/TARGET` (Unpacked) or `HOSTNAME/NAMESPACE/TYPE/terraform-provider-TYPE_VERSION_TARGET.zip` (Packed).
- **Plugin Caching:**
  - `plugin_cache_dir` MUST point to an existing directory; Terraform will not create it.
  - The cache directory MUST NOT overlap with configured `filesystem_mirror` directories.
  - Caching behavior is NOT concurrency safe; multiple concurrent `init` calls are undefined.
- **Dependency Lock File:**
  - `terraform init` writes selected provider versions to the dependency lock file.
  - Users MUST commit the dependency lock file to version control.
  - To bypass the lock file and upgrade, use `terraform init -upgrade`.
- **Variable Assignment Precedence:**
  - Command-line flags (`-var`, `-var-file`) take precedence over environment variables (`TF_VAR_name`).

## Prohibited Configurations

- ❌ **Global Installation:** Relying on global plugin caches without verifying concurrency safety in CI pipelines.
- ❌ **Development Overrides in Production:** `dev_overrides` blocks MUST NOT be used for general provider installation; they disable checksum/version verification.
- ❌ **Implicit Provider Sources:** Using short names (e.g., `hashicorp/aws`) implies `registry.terraform.io`; strictly explicit source addresses are recommended for local mirrors.
- ❌ **Windows Path Separators:** In `.terraformrc`, backslashes (`\`) MUST NOT be used for paths; forward slashes (`/`) are required.

## Enforcement

- **CLI Behavior:**
  - `terraform init` fails if `plugin_cache_dir` is defined but missing.
  - `terraform validate` checks syntactic validity but does not check remote APIs.
- **File Naming:**
  - On Windows, `terraform.rc.txt` is ignored; extension must be `.rc`.

## Failure Modes

- **Cache Corruption:** Concurrent `terraform init` runs using a shared `plugin_cache_dir` may corrupt the cache.
- **Lock File Divergence:** Installing a provider from a cache without a matching lock file entry (via `plugin_cache_may_break_dependency_lock_file`) creates a lock file valid ONLY for that specific OS/Arch.
- **Credential Priority:** `TF_TOKEN_` environment variables override `credentials` block in config (Terraform 1.2+).

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/nextjs-environment-variables.md` (Variable loading patterns overlap in concept but differ in syntax).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `provider_installation` block overrides ALL default lookup logic.
- `TF_VAR_name` is lower precedence than `-var`.
- `TF_IN_AUTOMATION` = 1 suppresses cosmetic output suggestions.
- `TF_INPUT` = 0 disables interactive prompts.

## Verification Checklist

- [ ] `.terraformrc` uses `provider_installation` for strict mirror control.
- [ ] `plugin_cache_dir` is set for CI performance but scoped to the job to prevent concurrency issues.
- [ ] Dependency lock file is tracked in git.
- [ ] **FAIL**: Input variable validation rules (`validation {}` block) are undefined in sources.
- [ ] **FAIL**: PostgreSQL provider configuration patterns are undefined in sources.

## Non-Decisions

- This document does not define the syntax for `resource`, `data`, or `module` blocks in HCL.
- This document does not define input variable validation logic (`condition` / `error_message`).

## Notes

- **BLOCKED**: The source material provided covers the Terraform _CLI_ and _Runtime_, but explicitly excludes the _Configuration Language_ (HCL) syntax required to define resources and variable validation rules. The section on PostgreSQL provider configuration is also missing.
