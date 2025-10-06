import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Globe, Github, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllProjects, type ProjectMeta } from "@/lib/content/portfolio";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectMediaSection } from "@/components/ProjectMediaSection";

const PortfolioProject = () => {
  const { slug } = useParams<{ slug: string }>();
  const projects = getAllProjects();

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

  // Preload hero image for performance
  useEffect(() => {
    if (project.image) {
      const heroImg = new Image();
      heroImg.src = project.image;
    }

    // Preload critical gallery images for better performance
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.slice(0, 3).forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
      });
    }

    // Preload video posters for media section
    if (project.media && project.media.length > 0) {
      project.media.forEach(item => {
        if (item.poster) {
          const posterImg = new Image();
          posterImg.src = item.poster;
        }
      });
    }

    // Set up performance monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // Set up error boundary for media loading
    const handleMediaError = (e: ErrorEvent) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) {
        console.warn('Media loading failed:', e.target.src);
      }
    };

    window.addEventListener('error', handleMediaError, true);

    return () => {
      window.removeEventListener('error', handleMediaError, true);
    };
  }, [project.image, project.gallery, project.media]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <header>
                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project categories">
                  {project.category && <Badge variant="secondary">{project.category}</Badge>}
                  {project.status && (
                    <Badge variant="outline">{project.status}</Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

                {project.summary && (
                  <p className="text-lg text-muted-foreground mb-8">{project.summary}</p>
                )}

                {/* Action Buttons */}
                <nav aria-label="Project links">
                  <div className="flex flex-wrap gap-4">
                    {project.links?.site && (
                      <Button asChild>
                        <a href={project.links.site} target="_blank" rel="noopener noreferrer" aria-label={`View live site for ${project.title}`}>
                          <Globe className="mr-2 w-4 h-4" aria-hidden="true" />
                          View Live Site
                          <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                    {project.links?.repo && (
                      <Button variant="outline" asChild>
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" aria-label={`View code repository for ${project.title}`}>
                          <Github className="mr-2 w-4 h-4" aria-hidden="true" />
                          View Code
                          <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                    {project.links?.caseStudy && (
                      <Button variant="outline" asChild>
                        <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer" aria-label={`View case study for ${project.title}`}>
                          <FileText className="mr-2 w-4 h-4" aria-hidden="true" />
                          Case Study
                          <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                  </div>
                </nav>
              </header>

              {/* Hero Image */}
              {project.image && (
                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Content/Narrative */}
              <section aria-labelledby="project-description">
                <h2 id="project-description" className="sr-only">Project Description</h2>
                <div className="prose prose-gray max-w-none">
                  <div className="text-muted-foreground leading-relaxed">
                    {/* This would be populated with project.body content */}
                    <p>Detailed project information and description would be parsed from the Markdown body of the project file.</p>
                  </div>
                </div>
              </section>

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <section aria-labelledby="project-gallery">
                  <h2 id="project-gallery" className="text-2xl font-bold mb-6">Gallery</h2>
                  <ProjectGallery gallery={project.gallery} projectSlug={project.slug} />
                </section>
              )}

              {/* Project Media Section */}
              {project.media && project.media.length > 0 && (
                <section aria-labelledby="project-media">
                  <h2 id="project-media" className="text-2xl font-bold mb-6">Media</h2>
                  <ProjectMediaSection media={project.media} projectSlug={project.slug} />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Project information">
              <ProjectSidebar project={project} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioProject;
