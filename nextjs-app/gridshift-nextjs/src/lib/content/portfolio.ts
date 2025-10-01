import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { Project, ProjectMeta } from './types';

const portfolioDirectory = path.join(process.cwd(), 'src/content/portfolio');

export function getAllProjects(): ProjectMeta[] {
  const fileNames = fs.readdirSync(portfolioDirectory);
  const allProjects = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(portfolioDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        ...data,
        slug,
      } as ProjectMeta;
    })
    .filter(project => !project.draft && !project.hidden)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allProjects;
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(portfolioDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown content to HTML
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      ...data,
      slug,
      content: contentHtml,
    } as Project;
  } catch {
    return null;
  }
}

export function getFeaturedProjects(limit: number = 3): ProjectMeta[] {
  return getAllProjects()
    .filter(project => project.featuredOnHome)
    .sort((a, b) => b.homeWeight - a.homeWeight)
    .slice(0, limit);
}
