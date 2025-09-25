import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Globe, Github, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllProjects, type ProjectMeta } from "@/lib/content/portfolio";
import { getAllMembers } from "@/lib/content/members";

const PortfolioProject = () => {
  const { slug } = useParams<{ slug: string }>();
  const projects = getAllProjects();
  const members = getAllMembers();

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/portfolio">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get author details
  const authors = project.authors?.map(authorSlug =>
    members.find(member => member.slug === authorSlug)
  ).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{project.category}</Badge>
                  {project.status && (
                    <Badge variant="outline">{project.status}</Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.date || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {project.client && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {project.client}
                    </div>
                  )}
                </div>

                <p className="text-lg text-muted-foreground mb-8">{project.summary}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.links?.site && (
                    <Button asChild>
                      <a href={project.links.site} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 w-4 h-4" />
                        View Live Site
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.links?.repo && (
                    <Button variant="outline" asChild>
                      <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 w-4 h-4" />
                        View Code
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.links?.caseStudy && (
                    <Button variant="outline" asChild>
                      <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 w-4 h-4" />
                        Case Study
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Hero Image / Slideshow */}
              <div className="relative">
                {(() => {
                  const slideshowImages: string[] = (project.gallery && project.gallery.length > 0)
                    ? project.gallery
                    : (authors.length > 0 ? authors.map(a => a.image).filter(Boolean) : (project.image ? [project.image] : []));

                  if (slideshowImages.length === 0) return null;

                  const cycleSec = 3; // seconds per image
                  const totalDuration = slideshowImages.length * cycleSec;

                  return (
                    <>
                      <div className="project-slideshow w-full h-80 md:h-96 rounded-lg overflow-hidden relative">
                        {slideshowImages.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`${project.title} - ${i + 1}`}
                            loading="lazy"
                            className="slideshow-item absolute inset-0 w-full h-full object-cover"
                            style={{ animationDuration: `${totalDuration}s`, animationDelay: `${i * cycleSec}s` }}
                          />
                        ))}
                      </div>

                      <style>{`
                        .project-slideshow { position: relative; }
                        .project-slideshow .slideshow-item { 
                          position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; 
                          opacity: 0; transform: translateX(100%);
                          animation-name: slideFade; animation-timing-function: ease-in-out; animation-iteration-count: infinite;
                        }

                        @keyframes slideFade {
                          0% { transform: translateX(100%); opacity: 0; }
                          10% { transform: translateX(0%); opacity: 1; }
                          60% { transform: translateX(0%); opacity: 1; }
                          85% { transform: translateX(-20%); opacity: 0.6; }
                          100% { transform: translateX(-100%); opacity: 0; }
                        }

                        /* Small tweak to reduce jank on very small screens */
                        @media (max-width: 640px) {
                          .project-slideshow { height: 240px; }
                        }
                      `}</style>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">

          {/* Technologies & Tags */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {project.technologies && project.technologies.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {project.tags && project.tags.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Project Dates */}
          {(project.startDate || project.endDate) && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Project Timeline</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.startDate && (
                    <div>
                      <span className="font-medium">Started:</span>{' '}
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                  {project.endDate && (
                    <div>
                      <span className="font-medium">Completed:</span>{' '}
                      {new Date(project.endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team Members */}
          {authors.length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Project Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {authors.map((author) => (
                    <div key={author.id} className="flex items-center gap-4">
                      <img
                        src={author.image}
                        alt={author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{author.name}</h4>
                        <p className="text-sm text-muted-foreground">{author.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">About This Project</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Detailed project information and description would go here. This section can contain
                  the full project narrative, challenges faced, solutions implemented, and outcomes achieved.
                  The content would be parsed from the Markdown body of the project file.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioProject;
