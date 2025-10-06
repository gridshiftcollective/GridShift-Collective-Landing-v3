export type Member = {
  id: string;
  slug: string;
  name: string;
  role: string;
  pronouns?: string;
  location?: string;
  bio?: string;
  image: string;
  skills?: string[];
  tags?: string[];
  links?: {
    website?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  availability?: 'open' | 'closed' | 'busy';
  email?: string;
  startDate?: string;
  draft?: boolean;
  hidden?: boolean;
  featuredOnHome?: boolean;
  homeWeight?: number;
  order?: number;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  meta?: {
    updatedAt?: string;
    createdBy?: string;
  };
};

const memberModules = import.meta.glob<Member>('/public/media/content/team/*/*.json', { eager: true });

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

