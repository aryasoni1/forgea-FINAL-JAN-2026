
# WHATWG URL / RFC 3986

- Category: Web Std
- Epics: K, J
- Version / Requirement: Pin required
- Intent / Critical Decision: URL normalization and parsing rules.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use WHATWG URL and RFC 3986 normalization for file and lesson routing in the lab UI, ensuring consistent path handling and navigation.
- Other important points:
	- Normalize lesson and file URLs for VFS and editor access.
	- Prevent path traversal and encoding mismatches in lesson navigation.
	- Integrate with permission and anti-cheat models for safe routing.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Routing & Rendering (J4)
- EPIC-J intent: Canonicalize URL parsing and normalization for lesson routing to avoid collisions and encoding mismatches.
- Important points:
	- Document when to apply Unicode normalization vs percent-encoding and how to normalize `:domain` and `:lessonId` path segments prior to route generation.
	- Reference RFC 3986 allowances and the WHATWG URL living-standard differences where relevant for browsers and server parsers.
	- Ensure server and client parsers share a canonical normalization pipeline to prevent mismatched navigation or duplicate resources.

