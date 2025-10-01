# Implementation Blueprint (SPARC): Next.js Migration + Brand-First Asset Structure (Part A)

## 0. Executive Overview (Context Pack)
- Objective (1–2 lines)
Migrate the current Vite + React SPA to Next.js (App Router) with static generation for content pages, while refactoring static assets into a brand-first `public/` structure and eliminating `dist/` duplication.

- High-Level Overview (1 short paragraph)
We will stand up a Next.js App Router project alongside the current app for a safe, incremental migration. We will restructure assets under `public/brand` (logos, fonts, shared UI) and `public/content` (team, portfolio images/videos), centralize asset path constants, replace React Router with file‑based routing, and adopt a robust content loader (Contentlayer or `fs + gray-matter`). This establishes a foundation for Part B (portfolio media UI).

- Divergence Synthesis (key insights adopted, conflicts resolved, rationale for choice)
Adopt typed content loaders and a brand/content-oriented asset layout. Keep fonts as brand assets and load via `next/font/local` for performance. Use a side-by-side migration to de-risk, and prefer Contentlayer if we want strong typing and DX; otherwise, `fs + gray-matter` is sufficient.

- Business Impact & Success Metrics
Improved SEO and performance (SSR/SSG, `next/image`, `next/font`), cleaner asset governance, easier content evolution, and safer deployments. Success criteria: build parity, no broken assets, Lighthouse ≥ baseline, and zero regressions in nav/SEO.

- Constraints & Assumptions
No production downtime; avoid large binary video additions in repo; do not commit `dist/`. Assume hosting on Vercel or compatible Node environment.

## S — Specification
- Problem Statement and Current-State Summary
Current app is Vite + React Router with ad‑hoc loaders and duplicated assets under `dist/` and `public/`. We need SSR/SSG capabilities, SEO/asset optimization, and a maintainable asset scheme.

- Functional Requirements (numbered)
1. Create a Next.js App Router project with TypeScript and Tailwind.
2. Implement routes for home, portfolio list, and portfolio detail ([slug]) with SSG.
3. Replace React Router links/usages with Next.js routing primitives.
4. Introduce brand-first asset structure; update all references.
5. Load fonts via `next/font/local` using brand font files.
6. Replace `import.meta.glob` with Contentlayer (preferred) or `fs + gray-matter`.
7. Add a broken-asset path validation script and remove `dist/` from VCS.

- Non-Functional Requirements
Performance (optimize fonts/images; no auto carousels on hero), accessibility (semantic nav, keyboardable), maintainability (typed content), security (no unsafe HTML rendering by default), portability (works locally and CI).

- Scope (In / Out)
In: Next.js app shell, routing, content loading, asset structure, fonts, linting/build scripts. Out: Part B portfolio UI specifics (media/lightbox), complex analytics.

- Stakeholders & User Scenarios
Marketing/design (branding, assets), engineering (migration), SEO.

- Dependencies
Next.js 14+, Tailwind, shadcn/ui, `gray-matter` (already present), Contentlayer (if chosen), `yet-another-react-lightbox` preinstall optional.

- Acceptance Criteria
Parity of existing pages, no 404 assets, green build in CI, Lighthouse equal or improved on key pages.

## P — Pseudocode (End-to-End and Module-Level)
- System-level flow
1. Initialize Next.js app.
2. Port layout, navigation, and footer.
3. Move assets and update paths.
4. Implement portfolio list/detail with SSG.
5. Switch to next/font and next/image.
6. Validate paths, remove `dist/` from VCS.

- Module-level pseudocode
Portfolio loader (Contentlayer):
```ts
// contentlayer.config.ts (if adopted)
defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'src/content/portfolio/*.md',
  fields: { id: { type: 'string', required: true }, slug: { type: 'string', required: true }, image: { type: 'string' }, gallery: { type: 'list', of: { type: 'string' } }, /* ... */ },
}))

// or fs + gray-matter in a server module
export function getAllProjects(): ProjectMeta[] {
  const files = glob('src/content/portfolio/*.md')
  return files.map(f => {
    const raw = fs.readFileSync(f, 'utf8')
    const { data } = matter(raw)
    return data as ProjectMeta
  }).filter(p => !p.draft && !p.hidden)
}
```

Next fonts:
```ts
// src/app/fonts.ts
import localFont from 'next/font/local'
export const brandSans = localFont({ src: [{ path: '../../public/brand/fonts/YourFont-Variable.woff2', weight: '100 900', style: 'normal' }], variable: '--font-brand' })
```

Routes:
```ts
// src/app/portfolio/[slug]/page.tsx (SSG)
export async function generateStaticParams() { return getAllProjects().map(p => ({ slug: p.slug })) }
export default async function ProjectPage({ params }) { const project = await getProject(params.slug); return <UI project={project} /> }
```

- Interface contracts
`ProjectMeta`: same fields as today; Part B adds `media` later. Asset path constants in `src/lib/paths.ts`.

## A — Architecture
- Component/Module Boundaries
App shell (`src/app/layout.tsx`), pages (`app/portfolio`, `app/team`), UI components reused from current app, content loaders in `src/lib/content`.

- Data Model & Schema Changes
No DB. Content schema remains; later extension for `media` is anticipated.

- Deployment & Environment
Next.js scripts: `dev`, `build`, `start`. Env prefix switch `VITE_` → `NEXT_PUBLIC_` if any.

- Observability
Add basic console logging for content loader counts and path validation script output in CI.

- Security & Compliance
Sanitize any markdown rendering (Part B). No PII introduced.

- Performance Considerations
Use `next/font`, `next/image`, SSG where possible, and lazy load non-critical images.

- Migration & Backward Compatibility Strategy
Side-by-side project; parity verification; cutover when acceptance criteria pass. Keep Vite app until flip.

## R — Refinement
- Alternative Approaches & Trade-offs
Contentlayer vs fs+gray-matter: Contentlayer adds DX/typing at build-time; fs is lighter. Choose Contentlayer if we expect many content types.

- Risks & Mitigations
Broken asset paths → central constants + validation script. Font regressions → test with fallback stacks. Routing regressions → sitemap diff and manual QA.

- Failure Modes & Rollback Plan
If Next build fails or parity is not met, continue serving Vite app; fix and retry. No destructive DB changes; rollback is trivial.

- Edge Cases & Error Handling Strategy
Missing fields in frontmatter → defensively render with fallbacks; skip drafts/hidden.

- Testing Strategy
Unit tests for loaders; smoke/e2e for core routes; link checker for assets.

## C — Completion: Roadmap & Atomic Tasks

### Phased Implementation Roadmap
- Phase 1: Bootstrap Next App — Goal: scaffold Next.js (App Router) with Tailwind/shadcn; Exit: app runs locally with base layout.
- Phase 2: Asset Structure — Goal: brand-first `public/` and path constants; Exit: all references compile and resolve.
- Phase 3: Content Loading — Goal: implement SSG loaders; Exit: portfolio list/detail render real content.
- Phase 4: Parity & Cleanup — Goal: navigation/SEO parity; Exit: remove `dist/` from VCS; CI green.

### Atomic Task Breakdown
| Step | File(s) To Modify | Task Description & Rationale | Acceptance Criteria | Pseudocode / Snippet | Dependencies |
|:----:|:----|:-----|:-----|:---|:----|
| 1.1 | (terminal) | Initialize Next.js (App Router, TS, Tailwind) | `npm run dev` serves Next app | `npx create-next-app@latest --ts --src-dir --app --tailwind` | — |
| 1.2 | `src/app/layout.tsx`, `src/app/page.tsx` | Port base layout, Navigation, Footer | Layout renders; no TS errors | Import existing components; resolve paths | 1.1 |
| 2.1 | `public/brand/*`, `public/content/*` | Create target dirs and move assets accordingly | Assets exist in new paths | See structure above | 1.2 |
| 2.2 | `src/lib/paths.ts` | Centralize asset path constants | One source of truth | `export const BRAND_LOGOS_BASE='/brand/logos'` | 2.1 |
| 2.3 | `src/components/*`, `src/pages/*` | Update asset references to new paths | No 404s in UI | Search/replace guided by constants | 2.2 |
| 2.4 | `.gitignore` | Ensure `dist/` ignored | `dist/` not tracked | Add `dist/` | 2.1 |
| 3.1 | `contentlayer.config.ts` or `src/lib/content/*` | Implement project/member loaders (SSG) | Portfolio list/detail render content | Contentlayer schemas or fs+gray-matter | 1.2 |
| 3.2 | `src/app/portfolio/page.tsx` | Render project list (SSG) | Page shows all non-draft projects | Map over `getAllProjects()` | 3.1 |
| 3.3 | `src/app/portfolio/[slug]/page.tsx` | Render project detail (SSG) | Detail page builds for all slugs | `generateStaticParams()` with slugs | 3.1 |
| 4.1 | `scripts/validate-assets.ts` | Add asset path checker (CI) | CI passes, no missing files | Node script walking content refs | 2.3 |
| 4.2 | `package.json`, CI | Update scripts and add build checks | `next build` passes | `build`, `start`, link check | 3.3 |

### Documentation & Change Management
- Update `README.md` with Next.js usage, dev/build/run, asset guidelines.
- Note new asset locations and how to add brand fonts with `next/font/local`.
- Record migration notes and cleanup checklist (dist de-dupe, routes parity).
