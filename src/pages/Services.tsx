import { Camera, Code, Palette, Video, ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Camera,
    title: "Photography",
    description: "Professional commercial and personal photography services",
    features: ["Commercial Photography", "Product Photography", "Portrait Sessions", "Event Coverage", "Brand Photography"],
    link: "/services/photography"
  },
  {
    icon: Code,
    title: "Websites & Apps",
    description: "Modern web development and mobile app solutions",
    features: ["Custom Web Development", "E-commerce Platforms", "Mobile Applications", "CMS Development", "API Integration"],
    link: "/services/websites-apps"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Creative design solutions for print and digital media",
    features: ["Brand Identity Design", "Print Design", "Magazine & Brochures", "Digital Marketing Materials", "Packaging Design"],
    link: "/services/graphic-design"
  },
  {
    icon: Video,
    title: "Filming & Editing",
    description: "Professional video production and post-production services",
    features: ["Commercial Videos", "Corporate Content", "Event Filming", "Motion Graphics", "Video Editing"],
    link: "/services/filming-editing"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Title section - centered like hero (excludes fixed header) */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 grid-pattern opacity-18"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-accent/5 bg-drift"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 smooth-reveal">Our <span className="text-accent">Services</span></h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto smooth-reveal smooth-reveal-delay-1">
            From concept to completion, we offer comprehensive creative services that bring your vision to life across all digital and traditional media.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Removed Learn More button as requested */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every project follows our proven methodology to ensure exceptional results 
              and a smooth collaborative experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We start with a deep dive into your goals, audience, and challenges to understand your vision."
              },
              {
                step: "02",
                title: "Strategy & Design",
                description: "Our team develops a comprehensive strategy and creates initial designs based on your requirements."
              },
              {
                step: "03",
                title: "Development & Build",
                description: "We bring the designs to life using cutting-edge technologies and best practices."
              },
              {
                step: "04",
                title: "Launch & Support",
                description: "After thorough testing, we launch your project and provide ongoing support and maintenance."
              }
            ].map((phase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your needs and create something amazing together. 
            Get in touch for a free consultation.
          </p>
          <Button size="lg" className="animate-pulse">
            Get Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;