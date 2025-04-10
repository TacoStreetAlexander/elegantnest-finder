
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapPropertyCardProps {
  property: Property;
  isSelected: boolean;
  onSelect: () => void;
}

const MapPropertyCard = ({ property, isSelected, onSelect }: MapPropertyCardProps) => {
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

  // Determine route path
  const propertyLink = property.urlSlug ? 
    `/properties/${property.urlSlug}` : 
    `/properties/${property.id}`;

  return (
    <div 
      id={`property-card-${property.id}`}
      className={`rounded-lg overflow-hidden border bg-white shadow-sm transition-all duration-200 cursor-pointer p-3 ${
        isSelected ? 'ring-2 ring-primary border-primary bg-secondary/20' : 'hover:bg-secondary/10'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-start gap-1">
            <h3 className="font-medium text-base font-serif">{property.name}</h3>
            {property.featured && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-block bg-gold text-white text-xs px-1.5 py-0.5 rounded-full">★</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Featured Property</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center text-muted-foreground text-xs">
            <MapPin size={12} className="mr-1 flex-shrink-0" />
            <span>{property.city}, {property.state}</span>
            {property.metroRegion && (
              <span className="ml-1 text-xs bg-secondary px-1.5 py-0.5 rounded-full">
                {property.metroRegion}
              </span>
            )}
          </div>
          
          {/* Availability Status */}
          {property.availability && property.availability.toLowerCase().includes('available') && (
            <div className="text-xs text-green-600 font-medium">
              {property.availability}
            </div>
          )}
          
          {/* Floor Plan Types */}
          <div className="mt-2 space-y-0.5">
            {(hasStudioPlan || has1BedPlan || has2BedPlan || has3BedPlan) ? (
              <div className="space-y-0.5">
                {hasStudioPlan && (
                  <div className="flex justify-between items-center text-xs">
                    <span>Studio:</span>
                    <span className="font-medium">{studioPrice ? formatPrice(studioPrice) + '+' : 'Call'}</span>
                  </div>
                )}
                
                {has1BedPlan && (
                  <div className="flex justify-between items-center text-xs">
                    <span>1 Bedroom:</span>
                    <span className="font-medium">{bed1Price ? formatPrice(bed1Price) + '+' : 'Call'}</span>
                  </div>
                )}
                
                {has2BedPlan && (
                  <div className="flex justify-between items-center text-xs">
                    <span>2 Bedroom:</span>
                    <span className="font-medium">{bed2Price ? formatPrice(bed2Price) + '+' : 'Call'}</span>
                  </div>
                )}
                
                {has3BedPlan && (
                  <div className="flex justify-between items-center text-xs">
                    <span>3 Bedroom:</span>
                    <span className="font-medium">{bed3Price ? formatPrice(bed3Price) + '+' : 'Call'}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                Contact for floor plan information
              </div>
            )}
          </div>
          
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded-full truncate max-w-[100px]">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-muted-foreground">+{property.amenities.length - 3} more</span>
              )}
            </div>
          )}
        </div>
        
        <Link 
          to={propertyLink} 
          className="text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <Button 
            size="sm" 
            variant="secondary"
            className="text-xs px-2 py-1 h-auto font-normal"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MapPropertyCard;
