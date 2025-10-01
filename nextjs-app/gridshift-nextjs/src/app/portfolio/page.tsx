import Link from 'next/link';
import { getAllProjects } from '@/lib/content';
import { ProjectMeta } from '@/lib/content/types';

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our diverse collection of projects spanning web development,
            graphic design, branding, and digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No projects available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover-lift transition-all duration-300"
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-3 line-clamp-2">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {project.client} • {new Date(project.date).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
