import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { getHomeProjects } from "@/lib/content/portfolio";

const projects = getHomeProjects(3);

const WorkPreview = () => {
  return (
    <section className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Recent <span className="text-accent">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our latest projects and the collective impact of our team's expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Link key={index} to={`/portfolio/${project.slug}`} className="group">
              <Card className="bg-card border-border hover-lift group overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <div className="text-2xl text-accent/30">📁</div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.date || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-accent font-medium mb-2">
                    Client: {project.client}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                    {project.summary ?? project.seo?.description ?? ''}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">
                      By {project.authors ? project.authors.join(', ') : ''}
                    </span>
                    {project.links?.site && (
                      <a
                        href={project.links.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${project.title} live site`}
                      >
                        <Button variant="ghost" size="sm" className="p-2">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="outline" className="hover-lift">
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkPreview;