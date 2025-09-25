import { describe, it, expect, vi } from 'vitest'
import { getAllProjects, getHomeProjects } from '../portfolio'

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn((content: string) => {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) return { data: {}, content: '' }

    // Simple frontmatter parser for test
    const frontmatter = frontmatterMatch[1]
    const data: any = {}

    // Parse basic fields for test
    const lines = frontmatter.split('\n')
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim().replace(/['"]/g, '')
        // Convert boolean strings and numbers
        if (value === 'true') data[key.trim()] = true
        else if (value === 'false') data[key.trim()] = false
        else if (!isNaN(Number(value))) data[key.trim()] = Number(value)
        else data[key.trim()] = value
      }
    })

    return {
      data,
      content: content.replace(frontmatterMatch[0], '').trim()
    }
  })
}))

// Mock import.meta.glob
const mockProjectFiles = [
  `---
id: "2025-09-gridshift-site"
slug: "gridshift-site"
title: "GridShift Corporate Website"
client: "GridShift Collective"
date: "2025-09-15"
order: 20
draft: false
hidden: false
featuredOnHome: true
homeWeight: 85
---
Project content here`,

  `---
id: "2025-08-ecommerce-platform"
slug: "ecommerce-platform"
title: "E-Commerce Platform"
client: "TechCorp Inc."
date: "2025-08-30"
order: 19
draft: false
hidden: false
featuredOnHome: true
homeWeight: 80
---
Another project content`,

  `---
id: "2025-07-draft-project"
slug: "draft-project"
title: "Draft Project"
client: "Draft Client"
date: "2025-07-15"
order: 15
draft: true
hidden: false
featuredOnHome: false
homeWeight: 0
---
Draft project content`,

  `---
id: "2025-06-hidden-project"
slug: "hidden-project"
title: "Hidden Project"
client: "Hidden Client"
date: "2025-06-30"
order: 10
draft: false
hidden: true
featuredOnHome: false
homeWeight: 0
---
Hidden project content`
]

// Mock the import.meta.glob
vi.mock('import-meta-glob', () => ({
  importMetaGlob: vi.fn(() => mockProjectFiles),
}))

describe('Portfolio Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllProjects', () => {
    it('should return all non-draft and non-hidden projects', () => {
      const projects = getAllProjects()
      expect(projects).toHaveLength(2)
      expect(projects.map(p => p.id)).toEqual(['2025-09-gridshift-site', '2025-08-ecommerce-platform'])
    })

    it('should sort projects by order descending, then by date', () => {
      const projects = getAllProjects()
      expect(projects[0].order).toBe(20) // gridshift-site
      expect(projects[1].order).toBe(19) // ecommerce-platform
    })

    it('should filter out draft projects', () => {
      const projects = getAllProjects()
      const draftProjects = projects.filter(p => p.draft)
      expect(draftProjects).toHaveLength(0)
    })

    it('should filter out hidden projects', () => {
      const projects = getAllProjects()
      const hiddenProjects = projects.filter(p => p.hidden)
      expect(hiddenProjects).toHaveLength(0)
    })

    it('should parse frontmatter correctly', () => {
      const projects = getAllProjects()
      const firstProject = projects[0]
      expect(firstProject.id).toBe('2025-09-gridshift-site')
      expect(firstProject.slug).toBe('gridshift-site')
      expect(firstProject.title).toBe('GridShift Corporate Website')
      expect(firstProject.client).toBe('GridShift Collective')
      expect(firstProject.date).toBe('2025-09-15')
      expect(firstProject.featuredOnHome).toBe(true)
      expect(firstProject.homeWeight).toBe(85)
    })
  })

  describe('getHomeProjects', () => {
    it('should return only featured projects sorted by homeWeight', () => {
      const projects = getHomeProjects()
      expect(projects).toHaveLength(2)
      expect(projects[0].id).toBe('2025-09-gridshift-site') // homeWeight: 85
      expect(projects[1].id).toBe('2025-08-ecommerce-platform') // homeWeight: 80
    })

    it('should limit results to specified number', () => {
      const projects = getHomeProjects(1)
      expect(projects).toHaveLength(1)
      expect(projects[0].id).toBe('2025-09-gridshift-site')
    })

    it('should return all featured projects if limit is higher than available', () => {
      const projects = getHomeProjects(10)
      expect(projects).toHaveLength(2)
    })

    it('should default to limit of 3', () => {
      const projects = getHomeProjects()
      expect(projects).toHaveLength(2) // We only have 2 featured projects
    })
  })
})
