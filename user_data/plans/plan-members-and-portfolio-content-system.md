# Implementation Blueprint (SPARC): Members and Portfolio Content System (JSON + Markdown) for Sitewide Lists and Home Previews

## 0. Executive Overview (Context Pack)
- Objective: Replace hardcoded Members and Portfolio arrays with a maintainable content system using Members as JSON files and Portfolio as Markdown files, powering About/Team, Portfolio pages, and the home page previews.
- High-Level Overview: We will introduce `src/content/team/*.json` and `src/content/portfolio/*.md` as single sources of truth. Lightweight loader utilities will expose typed functions like `getAllMembers()`, `getHomeMembers()`, `getAllProjects()`, and `getHomeProjects()` for consumption by `About`, `TeamPreview`, `Portfolio`, and `WorkPreview`. We will parse Portfolio Markdown at runtime using `import.meta.glob(..., { as: 'raw' })` combined with frontmatter parsing, avoiding SSR or heavy bundler plugins.
- Divergence Synthesis: From prior divergence, we selected per-file JSON for members (granular, audit-friendly) and per-file Markdown for portfolio (rich body + frontmatter). We defined shared preview metadata (`featuredOnHome`, `homeWeight`, `order`, `draft`, `hidden`) and standardized image paths under `public/images/...`. Blog is excluded for now.
- Business Impact & Success Metrics: Non-developers (or devs) can add/update members and projects without touching component code; home previews update automatically; reduced duplication and risk of divergence across pages. Success: zero hardcoded arrays; updates via content files only; home previews reflect `featuredOnHome` with correct sorting; build remains fast.
- Constraints & Assumptions: Keep Vite + React SPA (no SSR). Avoid new backend. Keep performance excellent. Use runtime Markdown parsing to avoid Vite plugin complexity. No admin UI (e.g., Decap) in this phase; can be added later.

## S — Specification
- Problem Statement and Current-State Summary:
  - Hardcoded arrays exist across pages/components:
    - `src/pages/About.tsx` — `const teamMembers = [...]` (lines ~8–37)
    - `src/components/TeamPreview.tsx` — `const teamMembers = [...]` (lines ~6–43)
    - `src/pages/Portfolio.tsx` — `const projects = [...]` (lines ~10–77)
    - `src/components/WorkPreview.tsx` — `const recentWork = [...]` (lines ~6–37)
  - This duplicates data, requires code edits for updates, and risks inconsistencies.

- Functional Requirements (numbered):
  1. Create content directories and file patterns:
     - Members: `src/content/team/<member-slug>.json`
     - Portfolio: `src/content/portfolio/<yyyy-mm>-<project-slug>.md`
  2. Define canonical templates (schemas) capturing all fields discussed:
     - Members JSON template (id, slug, name, role, pronouns, location, bio, image, skills, tags, links, availability, email, dates, draft, hidden, featuredOnHome, homeWeight, order, seo, meta)
     - Portfolio Markdown frontmatter template (id, slug, title, client, category, date, startDate, endDate, status, summary, technologies, tags, authors, image, gallery, links, draft, hidden, featuredOnHome, homeWeight, order, seo, meta) + rich Markdown body
  3. Implement loader utilities:
     - `getAllMembers()`, `getHomeMembers(limit)` using `import.meta.glob('/src/content/team/*.json', { eager: true })`
     - `getAllProjects()`, `getHomeProjects(limit)` using `import.meta.glob('/src/content/portfolio/*.md', { as: 'raw', eager: true })` + frontmatter parsing
  4. Replace hardcoded arrays in `About.tsx`, `TeamPreview.tsx`, `Portfolio.tsx`, and `WorkPreview.tsx` with loader calls.
  5. Home previews must use `featuredOnHome: boolean` and sort by `homeWeight` desc, with limit defaults (e.g., 3 items).
  6. Respect `draft` and `hidden` flags (exclude from lists; `hidden` could be used for direct links later).
  7. Image conventions under `public/images/team/<slug>.*` and `public/images/portfolio/<slug>/...`.
  8. Strict TypeScript definitions for member and portfolio metadata exposed to components.
  9. Document how to add new entries with file templates and naming rules.

- Non-Functional Requirements:
  - Security: No PII beyond optional public links/email displayed intentionally; no external requests.
  - Performance: Keep bundle lean; use eager glob with minimal processing; lazy-load large images.
  - Availability: Pure static content; no backend dependency.
  - Privacy: No tracking added; content is static.

- Scope (In / Out):
  - In: Members and Portfolio content sources, loaders, page integrations, home previews.
  - Out: Blog, CMS admin UI (Decap/SaaS), SSR, search.

- Stakeholders & User Scenarios:
  - Editor adds a new member file; About + home TeamPreview update after deploy.
  - Editor adds a new project MD; Portfolio + home WorkPreview update after deploy.

- Dependencies:
  - Runtime frontmatter parsing (e.g., `gray-matter`) and Markdown rendering for detail views (future) via `react-markdown` (optional in this phase if no detail page).
  - Existing tech: Vite + React + React Router + Tailwind.

- Acceptance Criteria:
  - All four hardcoded arrays are removed and replaced by loader outputs.
  - Home previews honor `featuredOnHome` + `homeWeight` and exclude `draft/hidden`.
  - Types are defined and used; build remains successful; images resolve.
  - Adding/deleting content files updates the UI without code changes.

## P — Pseudocode (End-to-End and Module-Level)
- System-level flow:
  1) Content files live under `src/content/team` and `src/content/portfolio`.
  2) Loader modules expose typed lists for pages and previews.
  3) Pages/components import loader functions and render lists accordingly.

- Module-level pseudocode:

```ts
// src/lib/content/members.ts
export type Member = {
  id: string; slug: string; name: string; role: string; pronouns?: string; location?: string;
  bio?: string; image: string; skills?: string[]; tags?: string[];
  links?: { website?: string; github?: string; linkedin?: string; portfolio?: string };
  availability?: 'open' | 'closed' | 'busy'; email?: string;
  startDate?: string; draft?: boolean; hidden?: boolean;
  featuredOnHome?: boolean; homeWeight?: number; order?: number;
  seo?: { title?: string; description?: string; ogImage?: string };
  meta?: { updatedAt?: string; createdBy?: string };
};

const memberModules = import.meta.glob<Member>('/src/content/team/*.json', { eager: true });

export function getAllMembers(): Member[] {
  return Object.values(memberModules)
    .map((m: any) => m.default ?? m)
    .filter((m: Member) => !m.draft && !m.hidden)
    .sort((a: Member, b: Member) => (b.order ?? 0) - (a.order ?? 0));
}

export function getHomeMembers(limit = 3): Member[] {
  return getAllMembers()
    .filter((m) => m.featuredOnHome)
    .sort((a, b) => (b.homeWeight ?? 0) - (a.homeWeight ?? 0))
    .slice(0, limit);
}
```

```ts
// src/lib/content/portfolio.ts
import matter from 'gray-matter';

export type ProjectMeta = {
  id: string; slug: string; title: string; client?: string; category?: string;
  date?: string; startDate?: string; endDate?: string; status?: string; summary?: string;
  technologies?: string[]; tags?: string[]; authors?: string[]; image?: string; gallery?: string[];
  links?: { site?: string; repo?: string; caseStudy?: string };
  draft?: boolean; hidden?: boolean; featuredOnHome?: boolean; homeWeight?: number; order?: number;
  seo?: { title?: string; description?: string; ogImage?: string };
  meta?: { updatedAt?: string; createdBy?: string };
};

const projectRawModules = import.meta.glob('/src/content/portfolio/*.md', { as: 'raw', eager: true });

function parseProject(raw: string): { frontmatter: ProjectMeta; body: string } {
  const { data, content } = matter(raw);
  return { frontmatter: data as ProjectMeta, body: content };
}

export function getAllProjects(): ProjectMeta[] {
  return Object.values(projectRawModules)
    .map((raw: any) => parseProject(raw as string).frontmatter)
    .filter((p) => !p.draft && !p.hidden)
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0) || (b.date ?? '').localeCompare(a.date ?? ''));
}

export function getHomeProjects(limit = 3): ProjectMeta[] {
  return getAllProjects()
    .filter((p) => p.featuredOnHome)
    .sort((a, b) => (b.homeWeight ?? 0) - (a.homeWeight ?? 0))
    .slice(0, limit);
}
```

- Interface contracts:
  - Member JSON must include at least `{ id, slug, name, role, image }`.
  - Project frontmatter must include `{ id, slug, title }`.

## A — Architecture
- Component/Module Boundaries and Responsibilities:
  - `src/content/` holds source files (team JSON, portfolio MD). No imports from components into content.
  - `src/lib/content/` exposes pure functions to retrieve typed data.
  - Pages/components (`About`, `TeamPreview`, `Portfolio`, `WorkPreview`) only consume these functions.

- Data Model & Schema Changes:
  - Files, not a DB. Canonical templates below (copy/paste for new entries).

- API Contracts:
  - None (local static content only). Interfaces provided in TypeScript.

- Deployment & Environment:
  - No env vars. Content is bundled at build time via Vite glob imports.

- Observability:
  - Minimal; consider console warnings if required fields missing (non-blocking).

- Security & Compliance:
  - Avoid storing sensitive PII. Email/link fields are optional and intended for public display.

- Performance Considerations:
  - Keep gallery lists short; use `loading="lazy"` for images. Home previews limited (e.g., 3 items each).

- Migration & Backward Compatibility Strategy:
  - Replace arrays in place; keep mapping fields identical where feasible. Commit small initial content set so pages render.

## R — Refinement
- Alternative Approaches & Trade-offs:
  - Vite MDX plugin (@mdx-js/rollup) vs runtime parse with `gray-matter`:
    - Chosen: runtime parse to avoid bundler changes and keep footprint minimal. If performance or advanced MDX is needed, we can migrate.
  - Single `members.json` file vs per-member JSON:
    - Chosen: per-member for fewer merge conflicts and granular history.

- Risks & Mitigations:
  - Missing required fields in content → add basic runtime validation and console warnings; provide clear templates.
  - Image path mistakes → standardized directories and example files.
  - Sorting ambiguities → documented precedence: `order` then `date`.

- Failure Modes & Rollback Plan:
  - If loaders fail, reintroduce temporary static arrays (kept in git history) to restore UI quickly. Changes are isolated and reversible.

- Edge Cases & Error Handling Strategy:
  - Exclude `draft`/`hidden`. If no featured items, previews show latest by `order`.

- Testing Strategy:
  - Unit-test loaders with sample fixtures (validate exclusion of draft/hidden and sorting rules).
  - Smoke check pages render with empty content arrays.

## C — Completion: Roadmap & Atomic Tasks

### Phased Implementation Roadmap
- Phase 1: Content Scaffolding & Loaders — Create directories, add 2–3 sample members and projects, implement loaders, add types.
  - Exit Criteria: `getAllMembers`, `getHomeMembers`, `getAllProjects`, `getHomeProjects` return expected arrays from sample files.
- Phase 2: Page Integration — Replace hardcoded arrays in `About.tsx`, `TeamPreview.tsx`, `Portfolio.tsx`, `WorkPreview.tsx` with loaders; wire previews to featured logic.
  - Exit Criteria: All four components render from content; no hardcoded arrays remain.
- Phase 3: QA & Documentation — Add README section for adding content; basic loader tests; verify image paths and performance.
  - Exit Criteria: Docs updated; tests pass; Lighthouse unchanged or improved.

### Atomic Task Breakdown

| Step | File(s) To Modify | Task Description & Rationale | Acceptance Criteria | Pseudocode / Snippet | Dependencies |
|:----:|:-------------------|:-----------------------------|:--------------------|:---------------------|:-------------|
| 1.1 | `src/content/team/` (new) | Create directory and add 2 sample member JSON files following the template below | `import.meta.glob` discovers 2 members; `getAllMembers()` returns them sorted | n/a | none |
| 1.2 | `src/content/portfolio/` (new) | Create directory and add 2 sample project `.md` files following the template below | `import.meta.glob` discovers 2 projects; `getAllProjects()` returns them sorted | n/a | none |
| 1.3 | `package.json` | Add `gray-matter` dependency for frontmatter parsing | Build succeeds; loaders compile | `npm i gray-matter` | none |
| 1.4 | `src/lib/content/members.ts` (new) | Implement Member type and loaders | Functions compile; unit tests pass | see pseudocode above | 1.1 |
| 1.5 | `src/lib/content/portfolio.ts` (new) | Implement ProjectMeta type and loaders using `gray-matter` | Functions compile; unit tests pass | see pseudocode above | 1.2, 1.3 |
| 2.1 | `src/pages/About.tsx` (lines ~8–37) | Remove `const teamMembers = [...]`; import and use `getAllMembers()` | Renders members from content | `const members = getAllMembers();` | 1.4 |
| 2.2 | `src/components/TeamPreview.tsx` (lines ~6–43) | Remove `const teamMembers = [...]`; import and use `getHomeMembers(3)` | Renders featured members | `const members = getHomeMembers(3);` | 1.4 |
| 2.3 | `src/pages/Portfolio.tsx` (lines ~10–77) | Remove `const projects = [...]`; import and use `getAllProjects()` | Renders projects from content | `const projects = getAllProjects();` | 1.5 |
| 2.4 | `src/components/WorkPreview.tsx` (lines ~6–37) | Remove `const recentWork = [...]`; import and use `getHomeProjects(3)` | Renders featured projects | `const projects = getHomeProjects(3);` | 1.5 |
| 3.1 | `README.md` | Add a "Content Guide" for adding team/portfolio entries | Editors can add entries without dev help | n/a | 1.1, 1.2 |
| 3.2 | `tests/` (new or existing) | Add unit tests for loaders (sorting, featured, draft/hidden) | Tests pass in CI | Example: mock content modules | 1.4, 1.5 |

### Templates (Authoritative)

- Members JSON Template — place as `src/content/team/<slug>.json`

```json
{
  "id": "ali-niavarani",
  "slug": "ali-niavarani",
  "name": "Ali Niavarani",
  "role": "Full-Stack Developer & Team Lead",
  "pronouns": "he/him",
  "location": "Tehran, IR",
  "bio": "Passionate about creating seamless digital experiences and leading collaborative development projects.",
  "image": "/images/team/ali-niavarani.jpg",
  "skills": ["React", "Node.js", "TypeScript", "UI/UX Design"],
  "tags": ["engineering", "leadership"],
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/alin",
    "linkedin": "https://linkedin.com/in/alin"
  },
  "availability": "open",
  "email": "ali@example.com",
  "startDate": "2022-06-01",
  "draft": false,
  "hidden": false,
  "featuredOnHome": true,
  "homeWeight": 90,
  "order": 10,
  "seo": {
    "title": "Ali Niavarani — Full-Stack Developer",
    "description": "Full-stack engineer and team lead at GridShift.",
    "ogImage": "/images/team/ali-niavarani-og.jpg"
  },
  "meta": {
    "updatedAt": "2025-09-26",
    "createdBy": "editor-username"
  }
}
```

- Portfolio Markdown Template — place as `src/content/portfolio/<yyyy-mm>-<slug>.md`

```markdown
---
id: "2025-09-gridshift-site"
slug: "gridshift-site"
title: "GridShift Corporate Website & Design System"
client: "GridShift Collective"
category: "Web Development"
date: "2025-09-15"
startDate: "2025-07-01"
endDate: "2025-09-15"
status: "launched"
summary: "Modern corporate site with component library and performance optimizations."
technologies: ["React", "Vite", "Tailwind", "Playwright"]
tags: ["design-system", "performance"]
authors: ["ali-niavarani", "sarah-chen"]
image: "/images/portfolio/gridshift-site/cover.jpg"
gallery:
  - "/images/portfolio/gridshift-site/hero.jpg"
  - "/images/portfolio/gridshift-site/components.png"
links:
  site: "https://gridshift.example.com"
  repo: "https://github.com/org/repo"
  caseStudy: "https://example.com/case-study"
draft: false
hidden: false
featuredOnHome: true
homeWeight: 85
order: 20
seo:
  title: "GridShift Website — Case Study"
  description: "Building a performant, scalable site and design system."
  ogImage: "/images/portfolio/gridshift-site/og.jpg"
meta:
  updatedAt: "2025-09-26"
  createdBy: "editor-username"
---

## Project Overview
Brief overview of the engagement and goals.

## Role & Responsibilities
- Design system architecture
- Performance budgets and CI checks

## Highlights
- Lighthouse 98+ on key pages
- Component library across marketing and blog

## Challenges & Solutions
- Challenge: Editor-friendly content without SSR
- Solution: Git-based CMS patterns and MD content with previews

## Outcomes
- +30% engagement, -45% TTFB on critical paths

## Media
![Components](/images/portfolio/gridshift-site/components.png)
```

### File-level Integration Points (Search Anchors)
- `src/pages/About.tsx`: remove/replace `const teamMembers = [` starting near top (lines ~8–37). Use `const members = getAllMembers();`
- `src/components/TeamPreview.tsx`: remove/replace `const teamMembers = [` (lines ~6–43). Use `const members = getHomeMembers(3);`
- `src/pages/Portfolio.tsx`: remove/replace `const projects = [` (lines ~10–77). Use `const projects = getAllProjects();`
- `src/components/WorkPreview.tsx`: remove/replace `const recentWork = [` (lines ~6–37). Use `const projects = getHomeProjects(3);`

### Documentation & Change Management
- Update `README.md` with a "Content Guide" covering:
  - How to add a member (copy template JSON, set `featuredOnHome` and `homeWeight` if needed)
  - How to add a portfolio project (copy template MD; fill frontmatter; image placement)
  - Naming and slug rules; image conventions; preview selection logic
- Note future extension path: Optional Decap CMS at `/public/admin` with collections mapping to these directories.
