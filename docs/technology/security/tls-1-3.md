# TLS 1.3 (ACME)

- Category: Security
- Epics: G, J
- Version / Requirement: RFC 8446
- Intent / Critical Decision: Modern TLS and automated cert provisioning.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Ensure preview domains and webhook endpoints use modern TLS (1.3) and certificate automation for trust and availability.
- Important points:
  - Recommend TLS 1.3 for preview domains and webhook endpoints, document ACME or managed certificate approaches, and specify whether TLS termination happens at the CDN or origin.
  - Include certificate rotation and monitoring runbooks as part of the preview-infra-checklist to avoid expired cert outages for preview access or webhook delivery failures.
