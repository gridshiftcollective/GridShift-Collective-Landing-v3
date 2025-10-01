// Content types for portfolio and team content

export interface ProjectMeta {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  date: string;
  startDate: string;
  endDate: string;
  status: string;
  summary: string;
  technologies: string[];
  tags: string[];
  authors: string[];
  image: string;
  gallery: string[];
  links: {
    site?: string;
    repo?: string;
  };
  draft: boolean;
  hidden: boolean;
  featuredOnHome: boolean;
  homeWeight: number;
  order: number;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  meta: {
    updatedAt: string;
    createdBy: string;
  };
}

export interface Project extends ProjectMeta {
  content: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  pronouns: string;
  location: string;
  bio: string;
  image: string;
  skills: string[];
  tags: string[];
  links: {
    website?: string;
    github?: string;
    linkedin?: string;
  };
  availability: string;
  email: string;
  startDate: string;
  draft: boolean;
  hidden: boolean;
  featuredOnHome: boolean;
  homeWeight: number;
  order: number;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  meta: {
    updatedAt: string;
    createdBy: string;
  };
}
