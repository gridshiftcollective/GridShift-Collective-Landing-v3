import { LucideIcon, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  color?: string;
}

interface FeatureCardsProps {
  features: FeatureCard[];
  showFeatureList?: boolean;
  cardClassName?: string;
}

const FeatureCards = ({ 
  features, 
  showFeatureList = false, 
  cardClassName = "" 
}: FeatureCardsProps) => {
  return (
    <>
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <Card 
            key={index} 
            className={`bg-card border-border hover-lift group transition-all duration-300 ${cardClassName}`}
            data-testid={`feature-card-${index}`}
          >
            {/* Compact card layout for better scannability */}
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <IconComponent className={`w-6 h-6 ${feature.color || 'text-accent'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                  {showFeatureList && feature.features && (
                    <ul className="flex flex-wrap gap-2" data-testid={`feature-list-${index}`}>
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-xs bg-muted px-2 py-1 rounded-md border border-border">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default FeatureCards;