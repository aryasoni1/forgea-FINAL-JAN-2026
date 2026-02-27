FEATURE CONTEXT
- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: Integrity Hub — `EngineeringSkillTree` source presence check
- Source: Agent Orchestrator Output

TASKS CHECKED
- Locate source file(s) referenced by compiled artifacts for `EngineeringSkillTree` / `skill-tree.tsx`.

WHAT ALREADY EXISTS
- /apps/forgea-labs/.next compiled artifacts reference:
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-labs/components/integrity-hub/skill-tree.tsx (client component id 7450) — observed in multiple client-reference-manifest and page bundles (examples: `.next/server/app/integrity/page_client-reference-manifest.js`, `.next/server/app/integrity/page.js`, `.next/static/chunks/app/integrity/page-c73080ac0f88fe99.js`).
  - `.next` trace and cache files contain entries referencing `skill-tree.tsx` (e.g., `.next/trace`, `.next/cache/.tsbuildinfo`).
  - The integrity page server bundle references `EngineeringSkillTree` as a client component that is expected to exist at the path above.

WHAT IS PARTIALLY IMPLEMENTED
- Build/compiled outputs exist and include `EngineeringSkillTree` references, implying the component was built previously.
- The runtime/bundle wiring (RSC/client-reference manifests) expects a client component with that path and export `EngineeringSkillTree`.

WHAT IS MISSING
- The source file at `forgea-monorepo/apps/forgea-labs/components/integrity-hub/skill-tree.tsx` cannot be opened/read from the repository working tree.
- No matching source file was found by repository search; only compiled `.next` references point to the path.

RISKS OR CONFLICTS
- If source was removed but `.next` remains, runtime/server bundles may still reference a component that cannot be rebuilt, causing build failures or runtime errors when rebuilding the app.
- Presence of compiled artifacts without source can indicate stale build outputs checked into the repo or an incomplete commit that removed source files.

QUESTIONS FOR CLARIFICATION
- Was `components/integrity-hub/skill-tree.tsx` intentionally removed or moved to another path/branch?
- Is there a canonical source location for integrity-hub components (monorepo package, separate repo, or generated at build-time)?
- Should the next agent attempt to recover the file from VCS history or treat it as intentionally deleted?

NEXT AGENT HANDOFF PROMPT (MANDATORY)
Use the following prompt verbatim for the next agent (Recovery / Implementer):

"You have this repository and this code-scout report: docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J-IntegrityHub-SkillTree-SourceCheck.md.

Task:
- Locate the missing source file `apps/forgea-labs/components/integrity-hub/skill-tree.tsx` referenced by compiled `.next` artifacts and by the `integrity` app bundles.

Deliverables:
- A factual summary of where the source currently exists or why it's missing (e.g., moved path, deleted in commit X, generated elsewhere).
- If source exists elsewhere in the repo, provide the exact path(s) and confirm exports (does it export `EngineeringSkillTree`?).
- If source is missing, list VCS commits or branches to check (if available) and recommend the single next action (restore from commit X, or open issue for owner).

Constraints:
- Do not implement new code or attempt repairs beyond locating and documenting the source status; this task is strictly investigative.

Reference: this report documents compiled artifact evidence and the absence of source in the working tree. Use it verbatim in your findings." 

Handoff complete. Provide this report verbatim to the next agent.
