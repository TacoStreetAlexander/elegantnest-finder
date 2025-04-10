
import { Link } from 'react-router-dom';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  // For properties with a slug, use that, otherwise fall back to ID
  const propertyLink = property.urlSlug ? 
    `/properties/${property.urlSlug}` : 
    `/properties/${property.id}`;

  // Format price as $X,XXX
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  // Helper to determine if a property has specific floor plan types
  const hasStudioPlan = property.floorPlans.some(plan => 
    plan.name.toLowerCase().includes('studio') || 
    (plan.bedrooms === 0 && plan.name.toLowerCase().includes('studio')));
  
  const has1BedPlan = property.floorPlans.some(plan => 
    plan.bedrooms === 1 || plan.name.toLowerCase().includes('1 bed'));
  
  const has2BedPlan = property.floorPlans.some(plan => 
    plan.bedrooms === 2 || plan.name.toLowerCase().includes('2 bed'));
  
  const has3BedPlan = property.floorPlans.some(plan => 
    plan.bedrooms === 3 || plan.name.toLowerCase().includes('3 bed'));

  // Get starting price for each floor plan type
  const getStartingPrice = (bedrooms: number) => {
    const plans = property.floorPlans.filter(plan => 
      plan.bedrooms === bedrooms || 
      (bedrooms === 0 && plan.name.toLowerCase().includes('studio')));
    
    if (plans.length === 0) return null;
    
    const prices = plans.map(plan => plan.price);
    return Math.min(...prices);
  };

  const studioPrice = getStartingPrice(0);
  const bed1Price = getStartingPrice(1);
  const bed2Price = getStartingPrice(2);
  const bed3Price = getStartingPrice(3);

  return (
    <Link to={propertyLink}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {property.featured && (
            <div className="absolute top-3 left-3 bg-gold text-white text-xs px-3 py-1 rounded">
              Featured
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 text-xs px-3 py-1 rounded">
            {property.availability}
          </div>
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
            {property.city}, {property.state}
          </p>
          
          {/* Floor Plan Types */}
          <div className="mb-3 space-y-1">
            {(hasStudioPlan || has1BedPlan || has2BedPlan || has3BedPlan) ? (
              <div className="space-y-1">
                {hasStudioPlan && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Studio:</span>
                    <span className="font-medium">{studioPrice ? formatPrice(studioPrice) + '+' : 'Call for pricing'}</span>
                  </div>
                )}
                
                {has1BedPlan && (
                  <div className="flex justify-between items-center text-sm">
                    <span>1 Bedroom:</span>
                    <span className="font-medium">{bed1Price ? formatPrice(bed1Price) + '+' : 'Call for pricing'}</span>
                  </div>
                )}
                
                {has2BedPlan && (
                  <div className="flex justify-between items-center text-sm">
                    <span>2 Bedroom:</span>
                    <span className="font-medium">{bed2Price ? formatPrice(bed2Price) + '+' : 'Call for pricing'}</span>
                  </div>
                )}
                
                {has3BedPlan && (
                  <div className="flex justify-between items-center text-sm">
                    <span>3 Bedroom:</span>
                    <span className="font-medium">{bed3Price ? formatPrice(bed3Price) + '+' : 'Call for pricing'}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Contact for floor plan information
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs gap-1 bg-secondary/50 px-2 py-1 rounded">
              <Home className="h-3 w-3" />
              <span>{property.propertyType}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
