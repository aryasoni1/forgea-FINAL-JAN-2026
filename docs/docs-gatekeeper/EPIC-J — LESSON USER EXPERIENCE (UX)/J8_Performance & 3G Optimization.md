# J8 — Performance & 3G Optimization (Docs Gatekeeper Brief)

**FEATURE CONTEXT**

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J8 — Performance & 3G Optimization
- Source read: /docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J8_Performance & 3G Optimization.md

---

The following is a concise, implementation-ready specification of measurable budgets, policies, and acceptance criteria for lesson pages targeting 3G-class networks.

1. PERFORMANCE BUDGET (network bytes, gzipped over-the-wire)

- Max total initial JS (first-load): 150 KiB gz
- Max hydrated/client JS (additional loaded to enable interactivity after initial render): 100 KiB gz
- Max critical CSS (CSS required for first meaningful paint): 20 KiB gz
- Fonts: max 50 KiB gz per family; total fonts per page <= 100 KiB gz
- Images: max 250 KiB total images above-the-fold per viewport (see image rules below)
- Third-party scripts: max 2 third-party script origins; total third-party JS <= 30 KiB gz

Notes:

- Budgets are enforced on Regular 3G emulation (see measurement plan).
- All budgets are per-page (path) for lesson detail pages; index pages should be equal-or-smaller.

2. FONT HOSTING POLICY

- Recommendation: Self-host subsets of required families in `/static/fonts/` (or CDN with same-origin cache headers) to avoid cross-origin font penalty.
- Subsetting: Ship only required glyph ranges (ASCII/Latin basic + common punctuation). For code fonts, subset to ASCII and common punctuation only.
- Formats: Serve `woff2` as primary; provide `woff` fallback only for legacy support.
- `font-display`: `swap` for body and UI fonts; `optional` for large display fonts used below-the-fold.
- Preload rules: Preload only 1 critical font file (largest fallback) per page using `<link rel=preload as=font crossorigin>`; do not preload all fonts.

3. IMAGE & MEDIA OPTIMIZATION STANDARDS

- Formats: Primary delivery AVIF, fallback WebP, fallback JPEG/PNG. Prefer AVIF for stills, WebP for broad support.
- Responsive srcset breakpoints (recommended widths): 320, 480, 640, 768, 1024, 1280, 1600
- Above-the-fold image budget: no more than 250 KiB total across responsive candidates for the largest breakpoint.
- Lazy-loading: Use native `loading="lazy"` for images below-the-fold. Above-the-fold images must be eager and properly sized.
- CDN/transforms: Prefer build-time resizing for author assets and CDN-on-the-fly transforms for user-generated content. All image URLs must include dimension hints to avoid CLS.

4. SSR & HYDRATION POLICY

- Rule: Lesson detail pages (`/lessons/[slug]`) must render fully server-side for core reading content (title, body, code blocks, navigation) without hydration required to read.
- Hydration allowed for interactive widgets only (e.g., code runners, quizzes). Each hydrated widget must keep its hydrated JS <= 40 KiB gz.
- Total hydrated budget (sum of all widgets) must not exceed the hydrated/client JS budget above (100 KiB gz).
- Client-side bailout is allowed only when a feature cannot be implemented without client JS; bailouts must be documented and approved.

5. LIGHTHOUSE KPI TARGETS (Regular 3G emulation)

- Emulation: Regular 3G network + 4x CPU slowdown (Lighthouse defaults)
- Performance score: >= 80
- FCP: <= 2.5 s
- LCP: <= 2.5 s
- TTI (or Interaction to Next Paint / INP): TTI <= 5.0 s OR INP <= 2.0 s
- Total Blocking Time (TBT): <= 200 ms
- Cumulative Layout Shift (CLS): <= 0.10

6. MINIMAL MEASUREMENT PLAN (for Implementer & Integration Checker)

- Pages to test (priority):
  1. Lesson detail page (`/lessons/[slug]`) — primary
  2. Lessons index (`/lessons`) — secondary
  3. Landing / home page where lessons are listed — tertiary
- Lighthouse run settings (Local & CI):
  - Network throttling: Regular 3G (RTT 150 ms, throughput 1.6 Mbps down, 750 kbps up)
  - CPU slowdown: 4x
  - Use headless Lighthouse or Lighthouse CI with the above settings.
- Pass/fail thresholds for CI (examples):
  - Fail PR if LCP > 2.5 s on Regular 3G for `/lessons/[slug]`
  - Fail PR if Performance score < 80 for `/lessons/[slug]`
  - Fail PR if TBT > 200 ms or CLS > 0.10

7. DELIVERABLES FOR INTEGRATION CHECKER AND QA

- Integration Checker inputs:
  - Per-PR Lighthouse report for changed lesson pages (artifact JSON + summary metrics).
  - Clear fail reasons: metric name, observed value, threshold, and top contributing assets (file paths).
- CI gating rules (prioritized):
  1. Fail when Performance score < 80 for lesson detail pages.
  2. Fail when LCP > 2.5s or FCP > 2.5s.
  3. Fail when hydrated JS > 100 KiB gz or initial JS > 150 KiB gz.
- QA checklist (manual / device):
  - Measure lesson pages on a low-end Android and an older iPhone under cellular (3G) conditions.
  - Verify fonts render without FOIT (flash of invisible text) and that `font-display: swap` is active.
  - Confirm images above the fold are sized correctly and do not cause CLS.

8. OPEN QUESTIONS / AMBIGUITIES

- Which apps/pages are in-scope (forgea-lessons only, or admin + learn)? Clarify scope to apply budgets.
- Acceptable tolerance for false positives in CI (should small regressions block merges or only warn?).

---

MASTER DOCS REGISTRY ACTION

- Append an entry to `/docs/master_docs.md` for EPIC-J / J8 — Performance & 3G Optimization (Status: ADDED (MISSING OFFICIAL DOCS)).

END
