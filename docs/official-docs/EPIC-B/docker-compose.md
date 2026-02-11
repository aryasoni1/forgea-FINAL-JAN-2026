---
doc_id: docker-compose-orchestration
tool: Docker Compose
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Docker Compose — Orchestration Policy

## Purpose

Governs the definition of multi-container applications for local development, enforcing deterministic startup sequences via health checks and strict network isolation between components (e.g., App vs. Database).

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (Compose Specification / v2.x+)

## Scope

- Applies to: `docker-compose.yml` files, service definitions, network configurations, and dependency management (`depends_on`).
- Does NOT apply to: Swarm deployment configurations (unless strictly local), Kubernetes manifests, or production orchestration.

## Official Sources (Binding)

- Compose file reference (Docker Docs)
- Define services in Docker Compose (Docker Docs)
- Define and manage networks in Docker Compose (Docker Docs)
- Define and manage volumes in Docker Compose (Docker Docs)

## Evidence Coverage Matrix

| Policy Area        | Source Reference                  | Version Covered | Status  |
| ------------------ | --------------------------------- | --------------- | ------- |
| Service Definition | `services` top-level element      | Compose Spec    | COVERED |
| Startup Sequencing | `depends_on` (Long Syntax)        | v2.17.0+        | COVERED |
| Health Checks      | `healthcheck` attribute           | v2.x            | COVERED |
| Network Isolation  | `networks` / `internal` attribute | Compose Spec    | COVERED |
| Legacy Features    | `links` / Legacy Versions         | Legacy          | COVERED |

## Version & Compatibility

- **Tool version:** Docker Compose v2.x (Implements the Compose Specification).
- **Feature Availability:**
  - `depends_on` long syntax (condition) requires relatively modern Compose versions.
  - `post_start` and `pre_stop` hooks require Docker Compose 2.30.0+.

## Canonical Rules (Non-Negotiable)

- **Service Definition:**
  - The Compose file MUST declare a `services` top-level element as a map where keys are service names and values are definitions.
  - Services MUST be backed by a Docker image (via `image`) or a build configuration (via `build`).
- **Deterministic Startup (Sequencing):**
  - Services dependent on others (e.g., App depending on DB) MUST use the **long syntax** of `depends_on`.
  - The `condition` field in `depends_on` MUST be set to `service_healthy` for database dependencies to ensure the app waits until the database is ready to accept connections, not just started,.
  - The dependency service (e.g., the database) MUST define a `healthcheck` to report its status.
- **Network Isolation:**
  - Custom networks MUST be defined in the top-level `networks` element to reuse them across services.
  - Services communicating with each other MUST explicitly attach to the same shared network via the `networks` service attribute.
  - To create an externally isolated network (e.g., for a backend database tier), the network configuration MUST set `internal: true`.
- **Volume Management:**
  - Persistent data stores (e.g., Postgres data) MUST use named volumes defined in the top-level `volumes` element.
  - Bind mounts SHOULD be used for configuration files or code sync in development.

## Prohibited Configurations

- ❌ **Short Syntax `depends_on`:** Do NOT use the list-only syntax (e.g., `- db`) for critical infrastructure dependencies; it only waits for container start, not readiness,.
- ❌ **Legacy Linking:** Do NOT use `links`. Use `networks` and service discovery (DNS resolution by service name) instead,.
- ❌ **Network Mode Host:** Do NOT use `network_mode: host` if port mapping or network isolation is required, as it bypasses the container network stack.
- ❌ **Mixed Network/Network Mode:** You cannot mix `networks` and `network_mode` in the same service definition.

## Enforcement

- **Startup Validation:**
  - `docker compose up` respects dependency orders. If `condition: service_healthy` is used, Compose pauses starting the dependent service until the health check passes.
  - `docker compose config` validates the schema and structure of the file.
- **Health Check Behavior:**
  - If a health check fails repeatedly (exceeding `retries`), the container state becomes `unhealthy`, blocking dependents waiting on `service_healthy`.

## Failure Modes

- **Race Conditions:** Using `depends_on` without `service_healthy` leads to connection refused errors if the application starts before the database process is ready to accept TCP connections.
- **Isolation Breaches:** Failing to set `internal: true` on backend networks may expose database ports to external traffic if ports are inadvertently published.
- **Wait Deadlocks:** If a `healthcheck` is misconfigured (e.g., wrong test command) and never passes, dependent services will wait indefinitely (or until timeout) and fail to start.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgresql.md` (Defines the database service that requires health checks).
- Conflicts with:
  - Any policy enforcing strictly legacy Docker Compose v1 file formats (version 2.x/3.x without specification support).

## Planner Extraction Hints (Non-Human)

- If `service_type` == "database", `healthcheck` MUST BE present.
- If `service_type` == "backend", `depends_on` -> `db` -> `condition` MUST BE `service_healthy`.
- If `network_type` == "secure_backend", `internal` MUST BE `true`.
- `links` key is DEPRECATED -> Use `networks`.

## Verification Checklist

- [ ] Top-level `version` is omitted (preferred for Spec) or compliant.
- [ ] Database service includes a `healthcheck` block.
- [ ] Application service uses `depends_on` with `condition: service_healthy`.
- [ ] Networks are explicitly defined; backend networks use `internal: true` where appropriate.
- [ ] No `links` usage is present.

## Non-Decisions

- This document does not define specific `driver_opts` for networks or volumes (e.g., NFS vs local), as these vary by host environment.
- This document does not mandate a specific project name (defaults to directory name).

## Notes

- `depends_on` can also trigger restarts: `restart: true` restarts the service if the dependency updates.
- Relative paths in `volumes` are resolved from the Compose file's parent folder.
- The `default` network is created implicitly if no networks are defined; custom naming requires explicit declaration.
