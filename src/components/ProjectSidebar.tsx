import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ProjectMeta } from '../lib/content/portfolio';

interface ProjectSidebarProps {
  project: ProjectMeta;
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.client && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
              <p className="text-sm">{project.client}</p>
            </div>
          )}

          {project.category && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Category</h4>
              <p className="text-sm">{project.category}</p>
            </div>
          )}

          {project.status && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
              <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                {project.status}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      {(project.startDate || project.endDate) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.startDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Started</span>
                  <span>{formatDate(project.startDate)}</span>
                </div>
              )}
              {project.endDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span>{formatDate(project.endDate)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team */}
      {project.authors && project.authors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.authors.map((author, index) => (
                <div key={index} className="text-sm">
                  {author}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Links */}
      {project.links && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.links.site && (
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  🌐 Live Site
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  📁 Repository
                </a>
              )}
              {project.links.caseStudy && (
                <a
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  📋 Case Study
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

