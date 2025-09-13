import { ReactNode } from "react";

interface GridSectionProps {
  children: ReactNode;
  title?: string | ReactNode;
  description?: string;
  columns?: "1" | "2" | "3" | "4";
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const GridSection = ({ 
  children, 
  title, 
  description, 
  columns = "3", 
  gap = "md",
  className = "" 
}: GridSectionProps) => {
  const gridCols = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  };

  const gapSizes = {
    "sm": "gap-4",
    "md": "gap-6 md:gap-8", 
    "lg": "gap-8 md:gap-12"
  };

  return (
    <div className={className}>
      {(title || description) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="grid-section-title">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="grid-section-description">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className={`grid ${gridCols[columns]} ${gapSizes[gap]}`} data-testid="grid-container">
        {children}
      </div>
    </div>
  );
};

export default GridSection;