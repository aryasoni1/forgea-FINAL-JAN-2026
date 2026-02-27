# Reproducible Builds Guidance

- Category: Builds
- Epics: G
- Version / Requirement: Pin toolchain versions and reproducibility guidance per `G9` spec
- Intent / Critical Decision: Ensure snapshot build outputs are deterministic and verifiable.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW (G9_Snapshot_Build_Trigger)
- EPIC-G intent: Define build manifest, pinned toolchain versions, and reproducibility acceptance tests for snapshot artifacts.
- Important points:
  - Require pinned toolchain versions (Node, pnpm, turborepo, compilers) recorded in build manifest and enforced by CI runner images.
  - Capture build environment variables, seed values, and deterministic flags in a canonical build manifest that travels with the artifact and is included in provenance metadata.
  - Provide CI jobs that perform reproducibility checks: given source + manifest produce artifact, compute content hash, and verify matches recorded `content_hash`.
  - Document sample manifests, deterministic build flags, and common causes of non-determinism (timestamps, file ordering, compression differences) plus mitigation patterns.

## Quick Tests

- Rebuild artifact in a pinned container image and assert `sha256` matches recorded content-hash.
- Run two independent CI runners with same manifest and assert binary equality.
