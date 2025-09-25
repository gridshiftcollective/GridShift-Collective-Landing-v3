import { ReactNode } from "react";

interface ContentModuleProps {
  children: ReactNode;
  moduleIndex: number;
  className?: string;
  containerClassName?: string;
  paddingClass?: string;
}

const ContentModule = ({ 
  children, 
  moduleIndex, 
  className = "", 
  containerClassName = "container mx-auto px-6",
  paddingClass = "py-16 md:py-20"
}: ContentModuleProps) => {
  // Alternate backgrounds: now odd modules use the darker background and even use muted (swap)
  const isOdd = moduleIndex % 2 === 1;
  const bgClass = isOdd ? "bg-background" : "bg-muted/50";
  
  return (
    <section className={`${paddingClass} ${bgClass} ${className}`} data-testid={`content-module-${moduleIndex}`}>
      <div className={containerClassName}>
        {children}
      </div>
    </section>
  );
};

export default ContentModule;