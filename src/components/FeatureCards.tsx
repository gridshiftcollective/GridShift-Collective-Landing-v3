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
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                  <IconComponent className={`w-8 h-8 ${feature.color || 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {showFeatureList && feature.features && (
                <ul className="space-y-3" data-testid={`feature-list-${index}`}>
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default FeatureCards;