import { ReactNode } from "react";

interface ContentModuleProps {
  children: ReactNode;
  moduleIndex: number;
  className?: string;
  containerClassName?: string;
}

const ContentModule = ({ 
  children, 
  moduleIndex, 
  className = "", 
  containerClassName = "container mx-auto px-6"
}: ContentModuleProps) => {
  // Alternate backgrounds: odd modules get muted background, even get background
  const isOdd = moduleIndex % 2 === 1;
  const bgClass = isOdd ? "bg-muted/50" : "bg-background";
  
  return (
    <section className={`py-16 md:py-20 ${bgClass} ${className}`} data-testid={`content-module-${moduleIndex}`}>
      <div className={containerClassName}>
        {children}
      </div>
    </section>
  );
};

export default ContentModule;