## Official Docs Registry Additions — EPIC-F / F2 Repository Lifecycle Management

This file contains the exact registry entries to be appended to `/docs/official-docs-registry.md` for EPIC-F / F2. If automated edit of the main registry fails, merge these lines manually into the registry under an appropriate section.

### GitHub REST API — Create Repository (Organization)

- **Technology:** GitHub REST API
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest/repos/repos#create-a-repository-for-an-organization
- **Feature usage:** Definitive reference for `create repository` semantics, responses, and error payloads used by EPIC-F / F2 create-repo flows and rollback mapping.
- **Status:** REQUIRED

### GitHub Apps — Authentication & Installation Model

- **Technology:** GitHub Apps (Auth model)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/apps
- **Feature usage:** Auth model, JWT / installation token lifecycle, and permission scoping required for implementing least-privilege repo creation.
- **Status:** REQUIRED

### GitHub Organization Repository Policies

- **Technology:** GitHub Organization settings (repo creation / visibility control)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/organizations/managing-organization-settings/repository-creation
- **Feature usage:** Defines org-level defaults and enforcement knobs (prevent public repos, default visibility) that affect service responsibilities.
- **Status:** REQUIRED

### GitHub Branch Protection API

- **Technology:** GitHub REST API — Branch Protection
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest/branches/branch-protection
- **Feature usage:** Programmatic application of branch protection rules to newly created repositories; used by Implementer to ensure policy compliance on repo creation.
- **Status:** REQUIRED

### GitHub Repository Templates / Topics / Labels API

- **Technology:** GitHub REST API — Repository configuration endpoints
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest/repos
- **Feature usage:** Setting templates, default labels, and topics at repo creation time; guidance for metadata vs canonical store decisions.
- **Status:** REQUIRED
