import { describe, it, expect, vi } from 'vitest'
import { getAllMembers, getHomeMembers } from '../members'

// Mock import.meta.glob to return sample data
const mockMembers = [
  {
    id: 'ali-niavarani',
    slug: 'ali-niavarani',
    name: 'Ali Niavarani',
    role: 'Full-Stack Developer & Team Lead',
    image: '/images/team/ali-niavarani.jpg',
    skills: ['React', 'Node.js', 'TypeScript', 'UI/UX Design'],
    order: 10,
    draft: false,
    hidden: false,
    featuredOnHome: true,
    homeWeight: 90,
  },
  {
    id: 'sarah-chen',
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'UI/UX Designer & Creative Director',
    image: '/images/team/sarah-chen.jpg',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Design Systems'],
    order: 9,
    draft: false,
    hidden: false,
    featuredOnHome: true,
    homeWeight: 85,
  },
  {
    id: 'draft-member',
    slug: 'draft-member',
    name: 'Draft Member',
    role: 'Developer',
    image: '/images/team/draft-member.jpg',
    skills: ['JavaScript'],
    order: 5,
    draft: true,
    hidden: false,
    featuredOnHome: false,
    homeWeight: 0,
  },
  {
    id: 'hidden-member',
    slug: 'hidden-member',
    name: 'Hidden Member',
    role: 'Designer',
    image: '/images/team/hidden-member.jpg',
    skills: ['Photoshop'],
    order: 1,
    draft: false,
    hidden: true,
    featuredOnHome: false,
    homeWeight: 0,
  },
]

// Mock the import.meta.glob
vi.mock('import-meta-glob', () => ({
  importMetaGlob: vi.fn(() => mockMembers),
}))

describe('Members Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllMembers', () => {
    it('should return all non-draft and non-hidden members', () => {
      const members = getAllMembers()
      expect(members).toHaveLength(2)
      expect(members.map(m => m.id)).toEqual(['ali-niavarani', 'sarah-chen'])
    })

    it('should sort members by order descending', () => {
      const members = getAllMembers()
      expect(members[0].order).toBe(10) // ali-niavarani
      expect(members[1].order).toBe(9)  // sarah-chen
    })

    it('should filter out draft members', () => {
      const members = getAllMembers()
      const draftMembers = members.filter(m => m.draft)
      expect(draftMembers).toHaveLength(0)
    })

    it('should filter out hidden members', () => {
      const members = getAllMembers()
      const hiddenMembers = members.filter(m => m.hidden)
      expect(hiddenMembers).toHaveLength(0)
    })
  })

  describe('getHomeMembers', () => {
    it('should return only featured members sorted by homeWeight', () => {
      const members = getHomeMembers()
      expect(members).toHaveLength(2)
      expect(members[0].id).toBe('ali-niavarani') // homeWeight: 90
      expect(members[1].id).toBe('sarah-chen')    // homeWeight: 85
    })

    it('should limit results to specified number', () => {
      const members = getHomeMembers(1)
      expect(members).toHaveLength(1)
      expect(members[0].id).toBe('ali-niavarani')
    })

    it('should return all featured members if limit is higher than available', () => {
      const members = getHomeMembers(10)
      expect(members).toHaveLength(2)
    })

    it('should default to limit of 3', () => {
      const members = getHomeMembers()
      expect(members).toHaveLength(2) // We only have 2 featured members
    })
  })
})
