import { Globe, FileImage, Smartphone, Book, Camera, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description: "Custom websites and web applications built with modern technologies and stunning design.",
    color: "text-blue-400"
  },
  {
    icon: FileImage,
    title: "Posters & Banners",
    description: "Eye-catching visual designs for marketing campaigns, events, and brand promotion.",
    color: "text-green-400"
  },
  {
    icon: Smartphone,
    title: "Web Applications",
    description: "Interactive web apps with seamless user experiences and robust functionality.",
    color: "text-purple-400"
  },
  {
    icon: Book,
    title: "Magazines & Brochures",
    description: "Professional print and digital publications for businesses and organizations.",
    color: "text-orange-400"
  },
  {
    icon: Camera,
    title: "Professional Photography",
    description: "Commercial and personal photography services capturing moments with artistic vision.",
    color: "text-pink-400"
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete branding solutions including logos, color schemes, and brand guidelines.",
    color: "text-accent"
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-accent">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to completion, we deliver comprehensive creative solutions 
            that elevate your brand and engage your audience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-card border-border hover-lift group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;