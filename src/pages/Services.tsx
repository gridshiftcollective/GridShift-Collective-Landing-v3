import { Camera, Code, Palette, Video, Target, Award, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContentModule from "@/components/ContentModule";
import GridSection from "@/components/GridSection";
import FeatureCards, { FeatureCard } from "@/components/FeatureCards";

const services: FeatureCard[] = [
  {
    icon: Camera,
    title: "Photography",
    description: "Professional commercial and personal photography services",
    features: ["Commercial Photography", "Product Photography", "Portrait Sessions", "Event Coverage", "Brand Photography"]
  },
  {
    icon: Code,
    title: "Websites & Apps",
    description: "Modern web development and mobile app solutions",
    features: ["Custom Web Development", "E-commerce Platforms", "Mobile Applications", "CMS Development", "API Integration"]
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Creative design solutions for print and digital media",
    features: ["Brand Identity Design", "Print Design", "Magazine & Brochures", "Digital Marketing Materials", "Packaging Design"]
  },
  {
    icon: Video,
    title: "Filming & Editing",
    description: "Professional video production and post-production services",
    features: ["Commercial Videos", "Corporate Content", "Event Filming", "Motion Graphics", "Video Editing"]
  }
];

const processSteps = [
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
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Module 0: Page Header */}
      <PageHeader
        title={<>Our <span className="text-accent">Services</span></>}
        description="From concept to completion, we offer comprehensive creative services that bring your vision to life across all digital and traditional media."
      />

      {/* Module 1: Services Grid */}
      <ContentModule moduleIndex={1}>
        <GridSection columns="2" gap="lg">
          <FeatureCards features={services} showFeatureList={true} />
        </GridSection>
      </ContentModule>

      {/* Module 2: Process Section */}
      <ContentModule moduleIndex={2}>
        <GridSection 
          title="Our Process"
          description="Every project follows our proven methodology to ensure exceptional results and a smooth collaborative experience."
          columns="4"
          gap="md"
        >
          {processSteps.map((phase, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`process-step-${index}`}>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="font-semibold text-lg mb-3">{phase.title}</h3>
                <p className="text-muted-foreground text-sm">{phase.description}</p>
              </CardContent>
            </Card>
          ))}
        </GridSection>
      </ContentModule>

      {/* Module 3: Stats & Values */}
      <ContentModule moduleIndex={3}>
        <GridSection 
          title="Why Choose GridShift"
          description="Our collective approach ensures you get the best expertise while maintaining consistent quality and communication."
          columns="4"
          gap="md"
        >
          {[
            { icon: Users, title: "Collective Expertise", desc: "Access to diverse skills and perspectives" },
            { icon: Target, title: "Focused Delivery", desc: "Each specialist handles what they do best" },
            { icon: Lightbulb, title: "Creative Innovation", desc: "Fresh ideas from multiple creative minds" },
            { icon: Award, title: "Proven Quality", desc: "Consistent results across all service areas" }
          ].map((item, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow" data-testid={`value-card-${index}`}>
              <CardContent className="p-0">
                <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </GridSection>
      </ContentModule>

      {/* Module 4: CTA Section */}
      <ContentModule moduleIndex={4}>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="cta-title">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Let's discuss your needs and create something amazing together. 
            Get in touch for a free consultation.
          </p>
          <Button size="lg" className="magnetic-hover" data-testid="button-consultation">
            Get Free Consultation
          </Button>
        </div>
      </ContentModule>

      <Footer />
    </div>
  );
};

export default Services;