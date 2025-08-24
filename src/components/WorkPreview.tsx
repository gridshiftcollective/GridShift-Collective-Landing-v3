import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Calendar } from "lucide-react";

const recentWork = [
  {
    title: "E-commerce Platform Redesign",
    client: "TechFlow Solutions",
    category: "Web Development",
    date: "December 2024",
    description: "Complete redesign and development of a modern e-commerce platform with improved UX and performance.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    tags: ["React", "UI/UX", "E-commerce"],
    author: "Ali Niavarani"
  },
  {
    title: "Brand Identity System",
    client: "Sustainable Living Co.",
    category: "Branding",
    date: "November 2024",
    description: "Comprehensive brand identity including logo design, color palette, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Branding", "Logo Design", "Print"],
    author: "Sarah Chen"
  },
  {
    title: "Corporate Event Photography",
    client: "Innovation Summit 2024",
    category: "Photography",
    date: "October 2024",
    description: "Professional event coverage capturing key moments and networking opportunities at the annual summit.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    tags: ["Event Photography", "Corporate", "Portrait"],
    author: "Marcus Johnson"
  }
];

const WorkPreview = () => {
  return (
    <section className="py-24 bg-background">
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
          {recentWork.map((project, index) => (
            <Card key={index} className="bg-card border-border hover-lift group overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-accent font-medium mb-2">
                  Client: {project.client}
                </p>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    By {project.author}
                  </span>
                  <a href="#" aria-label={`Open ${project.title}`}>
                    <Button asChild variant="ghost" size="sm" className="p-2">
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