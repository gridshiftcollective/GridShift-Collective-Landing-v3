import { ExternalLink, Calendar, User, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContentModule from "@/components/ContentModule";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "@/lib/content/portfolio";

const projects = getAllProjects();

const categories = ["All", "Web Development", "Photography", "Video Production", "Graphic Design", "App Design"];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isGridAnimating, setIsGridAnimating] = useState<boolean>(false);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    if (category === selectedCategory) return;
    // animate grid out, change selection, then animate in
    setIsGridAnimating(true);
    window.setTimeout(() => {
      setSelectedCategory(category);
      // small delay to allow DOM update, then animate in
      window.setTimeout(() => setIsGridAnimating(false), 120);
    }, 160);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHeader
        title={<>Our <span className="text-accent">Portfolio</span></>}
        description="Explore our collective achievements and the diverse range of projects that showcase our expertise across different creative disciplines."
      />

      {/* Projects Grid with Filter Categories - unified dark sections and equal breathing space */}
      <ContentModule moduleIndex={1} paddingClass="py-20 md:py-24" className="bg-background">
        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              className="mb-2"
              onClick={() => handleCategoryClick(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-200 ${isGridAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {filteredProjects.map((project, index) => (
            <Link key={index} to={`/portfolio/${project.slug}`} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-4xl text-accent/30">📁</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {project.date}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-accent text-sm font-medium mb-2">{project.client}</p>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.summary ?? project.seo?.description ?? ''}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags?.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      {project.authors ? project.authors.join(', ') : ''}
                    </div>
                    {project.links?.site && (
                      <a
                        href={project.links.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${project.title} live site`}
                      >
                        <Button variant="ghost" size="sm">
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
      </ContentModule>

      <Footer />
    </div>
  );
};

export default Portfolio;