# Sigstore (Artifact Signing & Transparency)

- Category: Security / Supply Chain
- Epics: G
- Version / Requirement: Pin Sigstore component versions (cosign, rekor, fulcio) where used
- Intent / Critical Decision: Provide short-lived signing and transparent logs for build artifacts and snapshot proofs.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW (G9_Snapshot_Build_Trigger)
- EPIC-G intent: Use Sigstore tooling (cosign, rekor) to sign and publish snapshot artifacts and to provide immutable transparency logs for provenance.
- Important points:
  - Define who holds signing authority for snapshots (service account, operator, or hardware key) and store signing keys securely in Vault or HSM.
  - Describe integration flow: builder signs artifact with `cosign`, publishes signature and transparency record to `rekor`, and stores signature alongside artifact metadata.
  - Provide examples for verification (cosign verify) and CI acceptance tests that fail the build if signature/provenance is missing or invalid.
  - Link Sigstore usage to emergency key-rotation runbooks and to the provenance spec chosen (in-toto / Sigstore mapping).

## References

- Sigstore: https://sigstore.dev/
