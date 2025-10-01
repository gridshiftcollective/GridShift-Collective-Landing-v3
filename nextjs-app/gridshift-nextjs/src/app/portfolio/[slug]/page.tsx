import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProject } from '@/lib/content';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all portfolio projects
export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.seo.title,
    description: project.seo.description,
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: project.seo.ogImage ? [{ url: project.seo.ogImage }] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Back button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          ← Back to Portfolio
        </Link>

        {/* Project header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Client</h3>
              <p className="text-muted-foreground">{project.client}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Timeline</h3>
              <p className="text-muted-foreground">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mb-12">
            {project.links.site && (
              <a
                href={project.links.site}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover-lift transition-all"
              >
                View Live Site
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all"
              >
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Project content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br>') }} />
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gradient">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team */}
        {project.authors && project.authors.length > 0 && (
          <div className="border-t border-border pt-16">
            <h2 className="text-3xl font-bold mb-8 text-gradient">Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.authors.map((author) => (
                <div key={author} className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
                  <p className="font-medium">{author.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
