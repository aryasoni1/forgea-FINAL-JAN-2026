---
doc_id: terraform-security-policy
tool: Terraform
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Terraform — State & Security Policy

## Purpose

Governs the protection of Terraform state files, the handling of sensitive execution plans, credential management for remote backends (HCP Terraform/Enterprise), and concurrency locking requirements to prevent corruption and data leakage.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v1.x)

## Scope

- Applies to: State file management (`terraform.tfstate`), execution plans (`tfplan`), CLI credential storage, and remote backend authentication.
- Does NOT apply to: Provider-specific IAM policies (AWS/Azure/GCP permissions) unless related to backend access.

## Official Sources (Binding)

- "Configuring the Terraform CLI Global Settings"
- "Mastering Terraform State Commands"
- "Terraform Apply Command Reference"
- "Terraform Plan Command Reference Guide"
- "Terraform Login Command Reference"

## Evidence Coverage Matrix

| Policy Area           | Source Reference                              | Version Covered | Status  |
| --------------------- | --------------------------------------------- | --------------- | ------- |
| State Locking         | Terraform Apply/Plan Reference                | v1.x            | COVERED |
| Sensitive Plan Data   | Terraform Plan Command Reference              | v1.x            | COVERED |
| State Backups         | Mastering Terraform State Commands            | v1.x            | COVERED |
| Credential Storage    | Configuring the Terraform CLI Global Settings | v1.x            | COVERED |
| HCP/Enterprise Tokens | Configuring the Terraform CLI Global Settings | v1.x            | COVERED |

## Version & Compatibility

- **Tool version:** Terraform v1.x
- **Token Compatibility:** Organization tokens are explicitly **invalid** for command-line actions; User or Team tokens MUST be used.

## Canonical Rules (Non-Negotiable)

- **Mandatory State Locking:**
  - Operations that modify state (apply, refresh, import) MUST hold a state lock.
  - Disabling locking via `-lock=false` is **PROHIBITED** in shared/remote environments as it risks state corruption,.
  - If a lock cannot be acquired, the process MUST wait or fail; use `-lock-timeout` to handle contention gracefully.
- **Sensitive Artifact Protection:**
  - **Plan Files:** Saved plan files (`-out=tfplan`) contain the **full configuration and all values** (including secrets) in cleartext, even if obscured in terminal output. They MUST be treated as sensitive artifacts-.
  - **State Backups:** Terraform forces every state modification command to write a local backup file. This behavior **cannot be disabled**. These files MUST be manually removed if they contain sensitive data-.
- **Credential Precedence & Storage:**
  - Credentials MUST be resolved in the following priority order (highest to lowest):
    1. Environment Variables (`TF_TOKEN_hostname`).
    2. CLI Configuration (`credentials` block or `terraform login`).
    3. Credentials Helper.
  - `terraform login` saves tokens in **plain text** in `credentials.tfrc.json`. For higher security, a `credentials_helper` MUST be configured to store tokens in an external secrets manager-.
- **HCP/Enterprise Integration:**
  - **Hostname Consistency:** The credentials hostname MUST match the hostname in the `backend` configuration. If an Enterprise instance has multiple hostnames, ONE must be selected and used consistently.
  - **Token Type:** Users MUST use **User** or **Team** API tokens. Organization tokens are not supported for CLI operations.
- **Privacy & Telemetry:**
  - To prevent the CLI from sending anonymous usage data or checking for updates, `disable_checkpoint` MUST be set to `true` in the CLI configuration or `CHECKPOINT_DISABLE` env var must be set,.

## Prohibited Configurations

- ❌ **Disabling Locks in CI:** Using `-lock=false` in CI pipelines is prohibited.
- ❌ **Committing Credential Files:** `credentials.tfrc.json` MUST NOT be committed to version control.
- ❌ **Long-Lived Plan Artifacts:** Plan files MUST NOT be stored indefinitely; they are strictly transient artifacts for the immediate `apply` step.
- ❌ **Organization Tokens:** Do NOT attempt to use HCP Organization-level tokens for CLI authentication.

## Enforcement

- **CLI Behavior:**
  - `terraform apply` and `terraform plan` will error if the state is locked by another user.
  - `terraform login` warns user before saving plaintext credentials.
- **Environment Variables:**
  - `TF_TOKEN_<hostname>` (with periods replaced by underscores) enforces authentication without touching disk config.
  - `TF_IN_AUTOMATION=1` suppresses "next step" instructions to reduce log noise, preventing sensitive context leakage in logs.

## Failure Modes

- **State Corruption:** Running concurrent apply operations without locking will corrupt the state file.
- **Secret Leakage:** Committing a saved plan file (`tfplan`) to git leaks all secrets contained in that plan.
- **Auth Failure:** Mismatched hostnames (e.g., `app.terraform.io` vs `atlas.hashicorp.com`) in `credentials` vs `backend` config will cause authentication errors.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/db-provisioning.md` (Workflow definitions).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `command` == "apply" AND `remote_backend` == TRUE -> `flags` MUST NOT contain `-lock=false`.
- If `artifact` == "plan_file" -> `sensitivity` = "CRITICAL".
- If `auth_method` == "token" -> `token_type` MUST BE "USER" or "TEAM".
- `credentials.tfrc.json` -> `action` = "IGNORE" (Do not track).

## Verification Checklist

- [ ] `credentials.tfrc.json` is in `.gitignore`.
- [ ] CI pipeline handles `tfplan` files as secrets (encryption or ephemeral storage).
- [ ] `disable_checkpoint` is set to true for air-gapped/strict environments.
- [ ] `credentials_helper` is configured if plaintext local storage is forbidden.

## Non-Decisions

- This document does not define the specific IAM roles required within the cloud provider (AWS/Azure), only the Terraform backend access.
- This document does not mandate a specific remote backend type (S3 vs Consul vs HCP), only the security rules governing them.

## Notes

- `terraform state` subcommands (like `list` or `mv`) also respect remote state locking.
- Environment variable credentials for domains with hyphens can use double underscores (e.g., `TF_TOKEN_xn____caf__dma_fr`).
