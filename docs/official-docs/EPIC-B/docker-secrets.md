---
doc_id: docker-secrets-policy
tool: Docker Compose
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Docker — Secrets & Sensitive Data Policy

## Purpose

Governs the secure injection of sensitive credentials (passwords, API keys, certificates) into containers at runtime, strictly prohibiting the use of environment variables or image layers for secret storage to prevent unintentional data exposure.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (Compose Specification)

## Scope

- Applies to: `docker-compose.yml` top-level `secrets` definition, service-level `secrets` mounting, and build-time secret injection (`RUN --mount=type=secret`).
- Does NOT apply to: Non-sensitive configuration data (use `configs` instead).

## Official Sources (Binding)

- Secrets in Compose | Docker Docs
- Define services in Docker Compose | Docker Docs
- Build secrets | Docker Docs

## Evidence Coverage Matrix

| Policy Area                     | Source Reference                  | Version Covered | Status  |
| ------------------------------- | --------------------------------- | --------------- | ------- |
| Top-level Definition            | Secrets in Compose                | Compose Spec    | COVERED |
| Service-level Mounting          | Define services in Docker Compose | Compose Spec    | COVERED |
| Mount Location (`/run/secrets`) | Secrets in Compose                | Compose Spec    | COVERED |
| Build-time Secrets              | Build secrets                     | Compose Spec    | COVERED |
| Prohibited Patterns             | Secrets in Compose                | Compose Spec    | COVERED |

## Version & Compatibility

- **Tool version:** Docker Compose v2.x+ (Implementing Compose Specification).
- **Feature Availability:**
  - Build secrets require Docker BuildKit backend.
  - Long syntax attributes (`uid`, `gid`, `mode`) for secrets backed by files are explicitly **not implemented** in Docker Compose due to bind-mount limitations.

## Canonical Rules (Non-Negotiable)

- **Definition Requirement:**
  - Secrets MUST be defined in the top-level `secrets` element of the Compose file.
  - Secrets MUST be sourced from either a file (`file:`) or an environment variable (`environment:`) on the host.
- **Injection Mechanism:**
  - Services requiring access to a secret MUST explicitly request it using the `secrets` attribute within the service definition.
  - Granting access is granular; defining a secret at the top level does not automatically expose it to all services.
- **Runtime Mount Invariant:**
  - By default, secrets MUST be mounted as read-only files at `/run/secrets/<secret_name>` inside the container.
  - Applications MUST be configured to read secrets from these files (e.g., using `_FILE` convention environment variables like `MYSQL_PASSWORD_FILE`), rather than raw environment variables.
- **Build-Time Protection:**
  - Secrets required during image construction (e.g., `git` credentials, `npm` tokens) MUST use `RUN --mount=type=secret` in the Dockerfile and the `secrets` section in `build` definition.
  - Build arguments (`ARG`) and environment variables (`ENV`) MUST NOT be used for secrets as they persist in the final image history.

## Prohibited Configurations

- ❌ **Environment Variables for Secrets:** Do NOT use the `environment` key to inject raw passwords or keys. These are visible in `docker inspect`, logs, and process listings.
- ❌ **Baking Secrets into Images:** Do NOT `COPY` or `ADD` secret files into the image layers during build.
- ❌ **Version Controlling Secrets:** Do NOT commit the actual secret files (referenced by `file:`) to version control.

## Enforcement

- **Runtime Behavior:**
  - If a secret defined in `secrets` (marked `external: true` or file-based) is missing at runtime, Docker Compose will fail to deploy the stack.
  - Attempting to use `uid`, `gid`, or `mode` on a file-backed secret in Docker Compose will result in those attributes being ignored (limitation of bind mounts).

## Failure Modes

- **Deployment Failure:** If a service references a secret that is not defined in the top-level `secrets` block, validation fails.
- **Permission Denied:** If the application process runs as a non-root user and the secret file permissions (default `0444` world-readable, or host-dependent for bind mounts) prevent access.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/docker-compose.md` (Orchestration context)
- Conflicts with:
  - Any legacy pattern using `.env` files for password injection.

## Planner Extraction Hints (Non-Human)

- If `type` == "database_credentials", method MUST BE `secrets`.
- If `attribute` == "environment", content MUST NOT resemble "password" or "key".
- If `build_step` requires credentials, use `--mount=type=secret`.

## Verification Checklist

- [ ] Top-level `secrets` block exists.
- [ ] Database service uses `_FILE` environment variables pointing to `/run/secrets/`.
- [ ] No secrets are passed via `environment` list.
- [ ] `.gitignore` includes the source files of the secrets.

## Non-Decisions

- This document does not decide the specific mechanism for secret rotation.
- **Limitation:** Docker Compose does not support `uid`, `gid`, or `mode` options for secrets sourced from files (bind mounts). Secrets will appear with permissions determined by the host file system or default bind mount behavior.

## Notes

- To use secrets with different names inside the container than on the host, use the long syntax: `target: filename` inside the `secrets` list of the service.
- BuildKit must be enabled to use build-time secrets.
