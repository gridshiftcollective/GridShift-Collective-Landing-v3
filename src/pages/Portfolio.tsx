import { ExternalLink, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const projects = [
  {
    title: "E-commerce Platform Redesign",
    client: "TechStart Inc.",
    category: "Web Development",
    date: "2024",
    description: "Complete redesign and development of a modern e-commerce platform with improved UX and performance.",
    image: "/placeholder.svg",
    tags: ["React", "TypeScript", "Stripe", "Tailwind"],
    author: "Ali Niavarani",
    link: "#"
  },
  {
    title: "Brand Identity & Photography",
    client: "Artisan Coffee Co.",
    category: "Photography",
    date: "2024",
    description: "Complete brand identity design with professional product photography for a premium coffee brand.",
    image: "/placeholder.svg",
    tags: ["Brand Design", "Product Photography", "Adobe Creative Suite"],
    author: "Sarah Chen",
    link: "#"
  },
  {
    title: "Corporate Website & CMS",
    client: "Innovation Labs",
    category: "Web Development",
    date: "2024",
    description: "Modern corporate website with custom CMS for a technology consulting firm.",
    image: "/placeholder.svg",
    tags: ["Vue.js", "Nuxt", "Headless CMS", "SEO"],
    author: "Marcus Rodriguez",
    link: "#"
  },
  {
    title: "Product Launch Video Campaign",
    client: "FitTech Wearables",
    category: "Video Production",
    date: "2024",
    description: "Comprehensive video campaign for a new wearable device launch, including promotional and tutorial content.",
    image: "/placeholder.svg",
    tags: ["Video Production", "Motion Graphics", "After Effects"],
    author: "Emma Thompson",
    link: "#"
  },
  {
    title: "Mobile App UI/UX Design",
    client: "HealthTrack Pro",
    category: "App Design",
    date: "2023",
    description: "Complete UI/UX design for a health tracking mobile application with focus on user engagement.",
    image: "/placeholder.svg",
    tags: ["UI/UX", "Mobile Design", "Prototyping", "User Testing"],
    author: "Ali Niavarani",
    link: "#"
  },
  {
    title: "Annual Report Design",
    client: "GreenEnergy Corp",
    category: "Graphic Design",
    date: "2023",
    description: "Professional annual report design with infographics and data visualization for sustainability company.",
    image: "/placeholder.svg",
    tags: ["Print Design", "Data Visualization", "InDesign", "Infographics"],
    author: "Sarah Chen",
    link: "#"
  }
];

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

      {/* Filter Categories */}
      <section className="pb-12 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
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
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-200 ${isGridAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {filteredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={project.link || '#'} className="inline-block">
                      <Button asChild variant="secondary" size="sm">
                        <span>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </span>
                      </Button>
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {project.date}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-accent text-sm font-medium mb-2">{project.client}</p>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      {project.author}
                    </div>
                    <a href={project.link || '#'} aria-label={`Open ${project.title} details`}>
                      <Button asChild variant="ghost" size="sm">
                        <span aria-hidden="true">
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied clients. Let's discuss how we can bring your vision to life.
          </p>
          <Button size="lg" className="animate-pulse">
            Get In Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;