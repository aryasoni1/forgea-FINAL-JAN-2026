# UTS #46 (IDNA)

- Category: Unicode
- Epics: K, J
- Version / Requirement: Pin required
- Intent / Critical Decision: Internationalized domain handling.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use UTS #46 IDNA normalization for domain-like inputs in lab UI routing and file access.
- Other important points:
  - Normalize domain and path segments for lesson and file routing.
  - Prevent mismatches and encoding errors in navigation.
  - Integrate with anti-cheat and audit models for safe domain handling.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Routing & Rendering (J4)
- EPIC-J intent: Apply IDNA normalization rules when domain-like inputs are used in lesson routes to avoid host/route inconsistencies.
- Important points:
  - Document when to apply IDNA (UTS #46) vs percent-encoding and how to treat punycode conversions in routing normalization.
  - Include guidance for validation and rejection of invalid labels to avoid certificate/hostname mismatches.
