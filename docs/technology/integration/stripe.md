# Stripe (Billing Provider)

- Category: Integration
- Epics: B
- Version / Requirement: Pin provider API version required
- Intent / Critical Decision: Billing provider integration for invoicing, subscription, and payment events.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B10 Billing)
- EPIC-B intent: Integrate a billing provider (e.g., Stripe) for minimal MVP billing; document provider API version and idempotent event handling.
- Important points:
  - Pin Stripe API version and SDK versions used in the repo.
  - Document webhook verification, idempotency keys, and how billing events map to local billing tables in Prisma.
  - Capture GDPR/data-retention considerations for billing records and PCI scope guidance; route sensitive payment data through the provider, not local DB.
