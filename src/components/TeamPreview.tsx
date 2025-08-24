import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Linkedin, Globe } from "lucide-react";

const teamMembers = [
  {
    name: "Ali Niavarani",
    role: "Full-Stack Developer",
    skills: ["React", "Node.js", "UI/UX Design"],
    bio: "Passionate about creating seamless user experiences with modern web technologies.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    links: {
      github: "#",
      linkedin: "#",
      portfolio: "#"
    }
  },
  {
    name: "Sarah Chen",
    role: "Visual Designer",
    skills: ["Brand Identity", "Print Design", "Illustration"],
    bio: "Crafting visual stories that resonate with audiences and strengthen brand connections.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    links: {
      github: "#",
      linkedin: "#",
      portfolio: "#"
    }
  },
  {
    name: "Marcus Johnson",
    role: "Photographer",
    skills: ["Commercial Photography", "Portrait", "Event Coverage"],
    bio: "Capturing moments that tell compelling stories for brands and individuals.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    links: {
      github: "#",
      linkedin: "#",
      portfolio: "#"
    }
  }
];

const TeamPreview = () => {
  return (
    // Keep this section visually on the same background as the main site to avoid double-gray bands
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet the <span className="text-accent">Collective</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Talented individuals united by a shared commitment to excellence and innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-border hover-lift group">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-accent/20"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center gap-3">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Globe className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="outline" className="hover-lift">
            View All Team Members
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;