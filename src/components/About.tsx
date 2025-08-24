import { Users, Target, Lightbulb, Award } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              The <span className="text-accent">Grid Shift</span> Vision
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're not just another agency. Grid Shift is a collective of independent creatives 
              who believe in the power of collaboration. Each member brings unique expertise while 
              working under our shared brand, building collective credibility and expanding our reach.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our approach is simple: individual talent, collective strength. When you work with 
              any Grid Shift member, you're tapping into our entire network of skills and experience.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">8+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover-lift">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Collective Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Access to diverse skills across development, design, and photography.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border hover-lift">
              <Target className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Focused Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Each project is handled by specialists while maintaining our quality standards.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border hover-lift">
              <Lightbulb className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Creative Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Fresh perspectives and creative solutions for every challenge.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border hover-lift">
              <Award className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                Building credibility through consistent, high-quality project delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;