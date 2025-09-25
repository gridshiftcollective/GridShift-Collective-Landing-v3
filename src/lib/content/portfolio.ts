// Simple frontmatter parser without external dependencies
export type ProjectMeta = {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  summary?: string;
  technologies?: string[];
  tags?: string[];
  authors?: string[];
  image?: string;
  gallery?: string[];
  links?: {
    site?: string;
    repo?: string;
    caseStudy?: string;
  };
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

const projectRawModules = import.meta.glob('/src/content/portfolio/*.md', { as: 'raw', eager: true });

function parseYAML(yamlString: string): Record<string, any> {
  const lines = yamlString.split('\n');
  const result: Record<string, any> = {};
  let currentObject: Record<string, any> | null = null;
  let currentKey = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    // Check for nested object start (key:)
    if (trimmedLine.endsWith(':') && !trimmedLine.includes(' ')) {
      const key = trimmedLine.slice(0, -1);
      currentObject = {};
      result[key] = currentObject;
      currentKey = key;
      continue;
    }

    // Check for indented nested properties
    if (currentObject && line.startsWith('  ') && trimmedLine.includes(':')) {
      const colonIndex = trimmedLine.indexOf(':');
      const nestedKey = trimmedLine.substring(0, colonIndex).trim();
      let nestedValue = trimmedLine.substring(colonIndex + 1).trim();

      // Remove quotes
      if ((nestedValue.startsWith('"') && nestedValue.endsWith('"')) ||
          (nestedValue.startsWith("'") && nestedValue.endsWith("'"))) {
        nestedValue = nestedValue.slice(1, -1);
      }

      // Parse nested values
      if (nestedValue === 'true') {
        currentObject![nestedKey] = true;
      } else if (nestedValue === 'false') {
        currentObject![nestedKey] = false;
      } else if (!isNaN(Number(nestedValue)) && nestedValue !== '') {
        currentObject![nestedKey] = Number(nestedValue);
      } else {
        currentObject![nestedKey] = nestedValue;
      }
      continue;
    }

    // Reset current object when we hit a non-indented line
    if (currentObject && !line.startsWith('  ')) {
      currentObject = null;
      currentKey = '';
    }

    // Parse regular top-level properties
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse values
    if (value === 'true') {
      result[key] = true;
    } else if (value === 'false') {
      result[key] = false;
    } else if (!isNaN(Number(value)) && value !== '') {
      result[key] = Number(value);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      // Simple array parsing
      try {
        result[key] = JSON.parse(value);
      } catch {
        result[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

function parseProject(raw: string): { frontmatter: ProjectMeta; body: string } {
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { frontmatter: {} as ProjectMeta, body: raw };
  }

  const frontmatterYAML = frontmatterMatch[1];
  const body = raw.replace(frontmatterMatch[0], '').trim();

  const data = parseYAML(frontmatterYAML);

  return { frontmatter: data as ProjectMeta, body };
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
