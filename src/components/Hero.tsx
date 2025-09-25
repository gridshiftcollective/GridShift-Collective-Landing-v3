import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    // Center the hero content within the viewport minus the fixed header height
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center pt-16 overflow-hidden bg-background hero-gradient">
      {/* Animated grid background with loading effect */}
      {/* Grid pattern: reveal-only (no persistent transform) */}
      <div className="absolute inset-0 grid-pattern opacity-40 grid-reveal"></div>
      {/* Gradient layer: allow gentle drift separately so animations don't conflict */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/40 to-accent/6 bg-drift mix-blend-overlay"></div>
      
      {/* Floating geometric elements: larger squares positioned to the left and right of the hero (not centered behind text) */}
      <div className="hidden lg:block absolute top-1/3 hero-square-filled parallax-float z-0 pointer-events-none" style={{ left: 'calc(50% - 760px)', borderRadius: '20px' }}></div>
      <div className="hidden lg:block absolute top-1/2 hero-square-outlined parallax-float-delay z-0 pointer-events-none" style={{ left: 'calc(50% - 660px)', borderRadius: '14px', borderWidth: '4px' }}></div>
      <div className="hidden lg:block absolute top-1/3 hero-square-outlined parallax-float-delay z-0 pointer-events-none" style={{ right: 'calc(50% - 660px)', borderRadius: '14px', borderWidth: '4px' }}></div>
      <div className="hidden lg:block absolute top-1/2 hero-square-outlined parallax-float z-0 pointer-events-none" style={{ right: 'calc(50% - 760px)', borderRadius: '14px', borderWidth: '4px' }}></div>
      
      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 max-w-5xl flex flex-col justify-center py-20">
        {/* Logo with smooth reveal - enlarged and balanced (use responsive utility spacing) */}
        <div className="mt-6 mb-6 lg:mb-8 smooth-reveal">
          <img
            src="/logos/GridShift-Full-T v2.png"
            alt="GridShift"
            className="w-16 md:w-24 lg:w-40 xl:w-56 mx-auto opacity-95 hover:opacity-100 transition-all duration-500"
          />
        </div>
        
        {/* Main headline with refined typography - reduced size for balance */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] mb-8 smooth-reveal smooth-reveal-delay-1">
            Where <span className="text-gradient">Structure</span>
            <br />
            Meets <span className="text-accent">Creativity</span>
          </h1>
          
          <p className="text-base lg:text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed smooth-reveal smooth-reveal-delay-2">
            A curated collective of independent creators, uniting our skills to build exceptional digital experiences.
          </p>
        </div>
        
        {/* Minimal CTA section */}
        <div className="smooth-reveal smooth-reveal-delay-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              size="lg" 
              className="text-base px-8 py-4 magnetic-hover bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              View Our Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-4 magnetic-hover border-border hover:border-accent/50 hover:bg-accent/5"
            >
              Meet the Team
            </Button>
          </div>
          
        </div>
      </div>
      
    </section>
  );
};

export default Hero;