# Robots / X-Robots-Tag

- Category: Security
- Epics: J
- Version / Requirement: Pin required
- Intent / Critical Decision: Crawl control and indexing rules.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Ensure preview URLs are not indexed or crawled by search engines; define header/meta rules for preview responses.
- Important points:
  - Recommend `X-Robots-Tag: noindex, noarchive, nofollow` on preview responses and add a short checklist for CDN and origin header injection to ensure consistent behavior.
  - Document robots.txt exemptions and short-lived sitemap rules for preview domains; include acceptance tests that assert `noindex` headers for all preview responses.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D3 Knowledge Ingestion)
- EPIC-D intent: Define crawl and preview indexing rules for content ingestion and preview hosts to avoid accidental indexing of draft or preview lesson content.
- Important points:
  - Recommend preview responses include `X-Robots-Tag: noindex, noarchive, nofollow` and ensure preview domains are excluded in `robots.txt` where applicable.
  - Document behavior for content ingestors/crawlers to respect `robots.txt` and provide guidelines for allowed seed lists and whitelists used by ingestion pipelines.
  - Add acceptance tests that verify preview responses and ingestion endpoints produce the expected non-indexing headers.
