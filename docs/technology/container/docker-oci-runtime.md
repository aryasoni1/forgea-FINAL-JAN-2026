# Docker / OCI Runtime

- Category: Container
- Epics: H
- Version / Requirement: Pin required
- Intent / Critical Decision: Deterministic test runners and exit/signal semantics.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING
- EPIC-B intent: Provide deterministic local and CI containers for running migration jobs, local Postgres instances, and data-processing tasks.
- Important points:
  - Document exact Docker Compose service definitions for a local Postgres with required extensions and deterministic volumes for tests.
  - Recommend pinned base images and runtime configuration for reproducible behavior in migration jobs and backup/restore tests.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Define secure, hermetic runner environments for verification and snapshot capture.
- Important points:
  - Runners must default to network-disabled for lab processes, mount the workspace read-only, and use a small writable `tmp` volume (or `tmpfs`) to prevent host contamination.
  - Provide example `docker-compose` snippets showing safe mounts, user namespace remapping, and seccomp/AppArmor profiles; avoid privileged containers and host mounts of sensitive paths.
  - Include CI runner resource and timeout recommendations to avoid flakiness and guarantee determinism across runs.
