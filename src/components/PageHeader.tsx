import { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  description: string;
  className?: string;
}

const PageHeader = ({ title, description, className = "" }: PageHeaderProps) => {
  return (
    <section className={`pt-20 pb-12 px-6 bg-background ${className}`}>
      <div className="container mx-auto text-center">
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
