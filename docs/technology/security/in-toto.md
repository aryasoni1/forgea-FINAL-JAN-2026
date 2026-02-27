# in-toto (Artifact Provenance)

- Category: Security / Supply Chain
- Epics: G
- Version / Requirement: Pin chosen spec version (in-toto v1/v2) in official docs
- Intent / Critical Decision: Record and verify the provenance of build artifacts produced by snapshot build triggers.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW (G9_Snapshot_Build_Trigger)
- EPIC-G intent: Provide canonical provenance metadata for snapshot artifacts so verifiers can validate origin, builder identity, and reproducibility.
- Important points:
  - Recommend adopting an established provenance standard (in-toto or Sigstore) and pinning the exact spec/version in `/docs/official-docs/EPIC-G/`.
  - Define which metadata fields are mandatory in provenance (commit SHA, build manifest version, builder id, build timestamp, signature, toolchain versions).
  - Provide example integration: how the snapshot builder emits in-toto link metadata, where provenance is stored (sidecar artifact or registry), and how verifiers fetch and validate it.
  - Include sample CLI steps for verifying provenance and tie to CI acceptance tests in `G9_snapshot_build_spec.md`.

## References

- in-toto: https://in-toto.io/
- Note: Pin exact release or spec revision in `/docs/official-docs/EPIC-G/`.
