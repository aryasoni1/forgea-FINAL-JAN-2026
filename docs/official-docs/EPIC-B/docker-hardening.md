---
doc_id: docker-hardening-policy
tool: Docker
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Docker — Container Security & Hardening Policy

## Purpose

Governs the mandatory security posture for runtime containers to prevent privilege escalation and minimize the attack surface of the database and application tiers. This policy enforces non-root execution, immutable file systems, and capability minimization.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (Docker Engine v20.10+ / Compose v2.x)

## Scope

- Applies to: `Dockerfile` instructions (`USER`), Docker Compose service definitions (`read_only`, `cap_drop`, `security_opt`), and runtime configurations.
- Does NOT apply to: Build-time ephemeral containers (unless acting as final artifacts) or `scratch` images where user context is not applicable.

## Official Sources (Binding)

- "Best practices | Docker Docs"
- "Running containers | Docker Docs"
- "Define services in Docker Compose | Docker Docs"
- "Seccomp security profiles for Docker | Docker Docs"
- "Isolate containers with a user namespace | Docker Docs"

## Evidence Coverage Matrix

| Policy Area                      | Source Reference                      | Version Covered | Status  |
| -------------------------------- | ------------------------------------- | --------------- | ------- |
| Non-Root Execution (`USER`)      | Best practices / Running containers   | v20.10+         | COVERED |
| Read-Only Root (`read_only`)     | Compose services                      | v2.x            | COVERED |
| Capability Dropping (`cap_drop`) | Running containers / Compose services | v2.x            | COVERED |
| Seccomp Profiles                 | Seccomp security profiles             | v20.10+         | COVERED |
| No New Privileges                | Docker security non-events            | General         | COVERED |

## Version & Compatibility

- **Tool version:** Docker Engine v20.10+ and Docker Compose v2.x.
- **Kernel Dependency:** `seccomp` requires kernel configuration `CONFIG_SECCOMP=y`.

## Canonical Rules (Non-Negotiable)

- **Mandatory Non-Root User:**
  - Containers MUST be configured to run as a non-root user.
  - The `USER` instruction MUST be present in the `Dockerfile` with a valid UID/GID or username,.
  - If the base image defaults to root, the `Dockerfile` MUST create a user (e.g., `RUN useradd ...`) and switch to it using `USER`,.
  - In Docker Compose, the `user` attribute MAY be used to override the image default, but upstream hardening in the image is preferred,.
- **Immutable Root Filesystem:**
  - Service containers MUST set `read_only: true` in their Docker Compose definition to mount the container's root filesystem as read-only.
  - Writable data MUST be explicitly mounted using `volumes` or `tmpfs`,.
- **Capability Minimization (`cap_drop`):**
  - Containers MUST drop unnecessary Linux capabilities to reduce the kernel attack surface.
  - The `cap_drop` attribute in Docker Compose MUST be used.
  - **Standard Hardening:** `cap_drop: ["ALL"]` is the recommended baseline. Necessary capabilities (e.g., `NET_BIND_SERVICE`) MUST be explicitly added back via `cap_add`,.
  - If `ALL` is not feasible, the following defaults MUST be evaluated for removal: `MKNOD`, `SETUID`, `SETGID`, `NET_RAW`.
- **No New Privileges:**
  - Security options SHOULD include `no-new-privileges:true` to prevent processes from gaining more privileges (e.g., via `setuid` binaries) during execution.

## Prohibited Configurations

- ❌ **Running as Root:** Omitting `USER` or running with UID 0 is PROHIBITED for application workloads.
- ❌ **Privileged Mode:** Using `privileged: true` or `--privileged` is STRICTLY PROHIBITED as it grants access to all devices and bypasses Seccomp/AppArmor,.
- ❌ **Writable Root:** Running with a writable root filesystem (default behavior) is PROHIBITED for production services; `read_only: true` is required.
- ❌ **Implicit Capabilities:** Relying on the default capability set (which includes `MKNOD` and `NET_RAW`) without review is PROHIBITED.

## Enforcement

- **Runtime Constraints:**
  - `docker run` and `docker compose up` enforce `read_only` and `cap_drop` at container creation time.
  - `USER` instruction in `Dockerfile` enforces the default execution context.
- **Seccomp Profiles:**
  - The default Seccomp profile blocks 44+ system calls by default.
  - Custom profiles can be applied via `security_opt: seccomp=/path/to/profile.json`,.

## Failure Modes

- **Write Errors:** If `read_only: true` is enabled, applications attempting to write to local paths (logs, cache, PID files) will crash.
  - _Remediation:_ Mount `tmpfs` to specific paths (e.g., `/tmp`, `/var/log`).
- **Permission Denied:** If `cap_drop` removes required capabilities (e.g., `CHOWN` for database initialization), the service will fail to start.
  - _Remediation:_ Identify the specific capability required and add it via `cap_add`.
- **Port Binding Failure:** Non-root users cannot bind to ports < 1024 unless `NET_BIND_SERVICE` capability is granted or `sysctl` is tuned.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/docker-compose.md` (Service definition syntax).
- Conflicts with:
  - Legacy applications requiring root access for package installation at runtime (must be moved to build time).

## Planner Extraction Hints (Non-Human)

- If `service` definition missing `read_only: true` -> MARK INVALID.
- If `Dockerfile` missing `USER` instruction -> MARK INVALID.
- If `privileged: true` is detected -> STOP PLANNING.
- If `cap_drop` is missing -> WARN.

## Verification Checklist

- [ ] `Dockerfile` contains `USER <uid>:<gid>`.
- [ ] `docker-compose.yml` sets `read_only: true` for services.
- [ ] `docker-compose.yml` defines `cap_drop: ["ALL"]` (or specific list).
- [ ] Writable paths are handled via `volumes` or `tmpfs`.
- [ ] No services use `privileged: true`.

## Non-Decisions

- This document does not define specific AppArmor or SELinux profiles, only the use of `seccomp` defaults and `cap_drop`.
- This document does not cover `userns-remap` (User Namespaces) configuration on the daemon, focusing instead on container-level configuration.

## Notes

- `read_only` containers are significantly more secure as attackers cannot modify executables or configuration files on the ephemeral filesystem.
- `MKNOD` capability allows creating special files (block/character devices); dropping it prevents device node creation attacks.
- `NET_RAW` capability allows crafting raw packets; dropping it mitigates certain network spoofing attacks.
