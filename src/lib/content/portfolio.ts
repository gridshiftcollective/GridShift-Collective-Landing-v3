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
  media?: Array<{
    type: "image" | "video" | "pdf";
    src: string;
    caption?: string;
    poster?: string;
    sources?: Array<{ src: string; type: string }>;
  }>;
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

// Collect project markdowns from the canonical src/content location
const projectRawModules = import.meta.glob('/src/content/portfolio/*/*.md', { query: '?raw', eager: true, import: 'default' });

function parseYAML(yamlString: string): Record<string, any> {
  const lines = yamlString.split('\n');
  const result: Record<string, any> = {};
  let currentObject: Record<string, any> | null = null;
  let currentKey = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    // Check for nested object start (key:) or array of objects start (key:)
    if (trimmedLine.endsWith(':') && !trimmedLine.includes(' ')) {
      const key = trimmedLine.slice(0, -1);
      // If next non-empty line starts with '-', treat as array of objects
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j < lines.length && lines[j].trim().startsWith('-')) {
        // Initialize as array and prepare to collect objects
        result[key] = [];
        currentKey = key;
        currentObject = null; // we will create per '-'
        continue;
      }

      currentObject = {};
      result[key] = currentObject;
      currentKey = key;
      continue;
    }

    // Check for indented nested properties (object entries)
    if ((currentObject && line.startsWith('  ') && trimmedLine.includes(':')) ||
        // Or we are within an array of objects and the line is indented nested property
        (currentKey && Array.isArray(result[currentKey]) && line.startsWith('  ') && trimmedLine.includes(':'))) {
      const colonIndex = trimmedLine.indexOf(':');
      const nestedKey = trimmedLine.substring(0, colonIndex).trim();
      let nestedValue = trimmedLine.substring(colonIndex + 1).trim();

      // Remove quotes
      if ((nestedValue.startsWith('"') && nestedValue.endsWith('"')) ||
          (nestedValue.startsWith("'") && nestedValue.endsWith("'"))) {
        nestedValue = nestedValue.slice(1, -1);
      }

      // Parse nested values
      const parsedValue = (nestedValue === 'true') ? true
        : (nestedValue === 'false') ? false
        : (!isNaN(Number(nestedValue)) && nestedValue !== '') ? Number(nestedValue)
        : nestedValue;

      if (currentObject) {
        currentObject![nestedKey] = parsedValue;
      } else if (currentKey && Array.isArray(result[currentKey])) {
        // Ensure there's a current object to attach nested properties to
        let arr = result[currentKey] as any[];
        if (arr.length === 0) {
          arr.push({});
        }
        arr[arr.length - 1][nestedKey] = parsedValue;
      }
      continue;
    }

    // Reset current object when we hit a non-indented line
    if (currentObject && !line.startsWith('  ')) {
      currentObject = null;
      currentKey = '';
    }

    // Handle array item start like '- key: value' or '-'
    if (currentKey && Array.isArray(result[currentKey]) && trimmedLine.startsWith('-')) {
      // Start a new object in the array
      const arr = result[currentKey] as any[];
      const rest = trimmedLine.slice(1).trim();
      if (rest === '') {
        arr.push({});
      } else if (rest.includes(':')) {
        // inline '- key: value'
        const colonIndex = rest.indexOf(':');
        const k = rest.substring(0, colonIndex).trim();
        let v = rest.substring(colonIndex + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        const parsedV = (v === 'true') ? true : (v === 'false') ? false : (!isNaN(Number(v)) && v !== '') ? Number(v) : v;
        arr.push({ [k]: parsedV });
      }
      continue;
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

  // Validate and enhance media array
  if (data.media && Array.isArray(data.media)) {
    data.media = data.media.filter(item =>
      item && (item.type === 'image' || item.type === 'video' || item.type === 'pdf') && item.src
    );
  }

  // Attach the raw markdown body so consumers can render the project description
  (data as any).body = body;

  return { frontmatter: data as ProjectMeta, body };
}

export function getAllProjects(): ProjectMeta[] {
  const projects = Object.values(projectRawModules)
    .map((raw: any) => parseProject(raw as string).frontmatter)
    .filter((p) => !p.draft && !p.hidden)
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0) || (b.date ?? '').localeCompare(a.date ?? ''));

  // Runtime debug: print detected project slugs to the browser console so we can verify
  if (typeof window !== 'undefined' && window.console && projects) {
    try {
      // eslint-disable-next-line no-console
      console.log('getAllProjects():', projects.map((p) => p.slug));
    } catch (e) {
      // ignore
    }
  }

  return projects;
}

export function getHomeProjects(limit = 3): ProjectMeta[] {
  return getAllProjects()
    .filter((p) => p.featuredOnHome)
    .sort((a, b) => (b.homeWeight ?? 0) - (a.homeWeight ?? 0))
    .slice(0, limit);
}
