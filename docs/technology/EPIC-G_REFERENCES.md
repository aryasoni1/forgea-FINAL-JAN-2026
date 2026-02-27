EPIC-G — Technology updates and missing tech docs

Updated tech files (EPIC-G notes appended):

- docs/technology/integration/github-webhooks.md
- docs/technology/security/hmac-sha256.md
- docs/technology/runtime/nodejs.md
- docs/technology/http/rfc-7231.md
- docs/technology/http/rfc-7234.md
- docs/technology/queue/aws-sqs.md
- docs/technology/streaming/redis-streams.md
- docs/technology/database/postgresql.md
- docs/technology/framework/nextjs.md
- docs/technology/schema/json-schema.md
- docs/technology/security/content-security-policy.md
- docs/technology/security/robots-x-robots-tag.md
- docs/technology/security/security-headers.md
- docs/technology/security/tls-1-3.md
- docs/technology/cdn/cloudfront.md

Notes:

- I attempted to append EPIC-G notes to `docs/technology/secrets/vault-cloud-kms.md` but the edit failed; I'll retry if you want me to finish that in-file update.

Referenced technologies from EPIC-G that do NOT have a dedicated tech doc in `docs/technology/` and should be added:

- Artifact provenance (in-toto) — recommend: add `/docs/technology/security/in-toto.md` or under `official-docs` with pinned spec.
- Sigstore integration / transparency logs — recommend: add `/docs/technology/security/sigstore.md`.
- Reproducible builds guidance (pinning toolchains, reproducible build flags) — recommend: `/docs/technology/builds/reproducible-builds.md`.

Next steps (pick one):

- I can retry appending EPIC-G notes to `secrets/vault-cloud-kms.md` (requires a quick retry).
- I can create the missing tech docs (in-toto, Sigstore, reproducible-builds) with starter content and references.
- I can run a grep across EPIC-G files to ensure no other tech mentions were missed.

Tell me which next step you want me to take.
