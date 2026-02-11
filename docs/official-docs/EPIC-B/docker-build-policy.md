---
doc_id: docker-build-policy
tool: Docker Build
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Docker — Build & Image Optimization Policy

## Purpose

Governs the creation of container images using Dockerfiles, enforcing the separation of build-time tools from runtime artifacts to minimize attack surface and image size, and mandating immutable base image references.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (BuildKit Backend)

## Scope

- Applies to: All `Dockerfile` definitions used for production artifacts.
- Does NOT apply to: Local development-only containers (though recommended).

## Official Sources (Binding)

- [Docker Build Best Practices](https://docs.docker.com/build/building/best-practices/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Build Secrets](https://docs.docker.com/build/building/secrets/)

## Evidence Coverage Matrix

| Policy Area             | Source URL     | Version Covered | Status  |
| ----------------------- | -------------- | --------------- | ------- |
| Multi-stage Builds      | Multi-stage    | BuildKit        | COVERED |
| Base Image Pinning      | Best Practices | General         | COVERED |
| Build Context Exclusion | Best Practices | General         | COVERED |
| Layer Optimization      | Best Practices | General         | COVERED |
| Secret Handling         | Build Secrets  | BuildKit        | COVERED |

## Version & Compatibility

- **Tool version:** Docker Engine v23.0+ (requires BuildKit enabled).
- **Backend:** `DOCKER_BUILDKIT=1` is assumed for features like secret mounts and efficient stage skipping.

## Canonical Rules (Non-Negotiable)

- **Mandatory Multi-Stage Builds:**
  - Production images MUST use multi-stage builds to separate build dependencies (compilers, SDKs) from runtime artifacts.
  - The final stage (`FROM ... AS final`) MUST contain _only_ the application binary/assets and the minimal runtime dependencies (e.g., `alpine`, `distroless`, or `scratch`),.
  - Artifacts from build stages MUST be transferred to the final stage using `COPY --from=<stage>`.
- **Immutable Base Image References:**
  - Production `FROM` instructions MUST pin base images to a specific **digest** (`image@sha256:...`) rather than a mutable tag.
  - Tags (e.g., `alpine:3.21`) MAY be included for human readability _before_ the digest (e.g., `FROM alpine:3.21@sha256:...`).
- **Build Context Exclusion:**
  - A `.dockerignore` file MUST be present in the build root to exclude sensitive files, git history (`.git`), and local environment configurations (`.env`) from the build context,.
- **Package Installation Hygiene:**
  - `RUN` instructions installing packages (e.g., `apt-get`) MUST combine `update`, `install`, and cache cleanup (e.g., `rm -rf /var/lib/apt/lists/*`) in a single layer to prevent stale cache issues and reduce image size,.
  - `RUN` instructions using pipes (`|`) MUST prepend `set -o pipefail` to ensure the build fails if any stage of the pipe errors.
- **Secure Secret Injection:**
  - Secrets required at build time (e.g., private repo tokens) MUST be injected using `RUN --mount=type=secret`.
  - Secrets MUST NOT be passed via `ARG` or `ENV`, as these persist in the image history,.

## Prohibited Configurations

- ❌ **Mutable Tags in Production:** Relying solely on tags like `:latest` or `:1.2` is PROHIBITED; they can change unexpectedly.
- ❌ **Root User (Runtime):** Containers SHOULD NOT run as `root`. Use the `USER` instruction to switch to a non-privileged user for the final stage.
- ❌ **Leaked Build Tools:** The final image stage MUST NOT contain build tools (e.g., `gcc`, `maven`, `go`).
- ❌ **Split Update/Install:** `RUN apt-get update` in a separate instruction from `RUN apt-get install` is PROHIBITED (causes caching issues).

## Enforcement

- **BuildKit Behavior:**
  - BuildKit skips unused stages automatically; legacy builders do not.
  - If `digest` pinning is violated, Docker Scout policy evaluation returns "non-compliant".
- **CI/CD Checks:**
  - Pipeline must verify `DOCKER_BUILDKIT=1`.
  - Static analysis must ensure `FROM` instructions contain `@sha256:`.

## Failure Modes

- **Supply Chain Compromise:** Using mutable tags allows upstream actors to inject malicious code into a "known" tag without changing the tag name.
- **Bloated Images:** Failing to use multi-stage builds results in shipping compilers and source code to production, increasing download times and attack surface.
- **Broken Builds:** Failing to use `pipefail` results in "successful" builds even when downloads or commands inside a pipe fail.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/docker-compose.md` (Runtime context).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `instruction` == `FROM` AND `environment` == `PRODUCTION`, `reference` MUST MATCH `sha256:[a-f0-9]{64}`.
- If `instruction` == `RUN` AND `command` CONTAINS `|`, `command` MUST START_WITH `set -o pipefail`.
- If `secret` IS_REQUIRED, USE `RUN --mount=type=secret`.

## Verification Checklist

- [ ] Dockerfile uses multi-stage pattern (`AS build` -> `AS final`).
- [ ] All `FROM` instructions include a sha256 digest.
- [ ] `.dockerignore` exists and excludes `.git` and `.env`.
- [ ] No secrets are passed via `ARG` or `ENV`.
- [ ] `apt-get install` lines include cache cleanup (`rm -rf`).

## Non-Decisions

- This document does not mandate a specific base OS (Alpine vs. Debian), provided the chosen OS is pinned and minimized.
- This document does not define the specific mechanism for rotating secrets.

## Notes

- `scratch` is a special empty image useful for Go/Rust binaries but requires manual handling of CA certificates and users.
- Use `docker build --pull` to force a check for newer base image versions if using tags during development.
