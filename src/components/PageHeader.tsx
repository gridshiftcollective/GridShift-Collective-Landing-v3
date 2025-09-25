import { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  description: string;
  className?: string;
}

const PageHeader = ({ title, description, className = "" }: PageHeaderProps) => {
  return (
    <section className={`relative min-h-[calc(60vh-64px)] flex items-center justify-center pt-16 pb-20 overflow-hidden bg-background hero-gradient ${className}`}>
      {/* Background elements similar to Hero */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-accent/5 bg-drift mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 smooth-reveal" data-testid="page-title">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto smooth-reveal smooth-reveal-delay-1" data-testid="page-description">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;
