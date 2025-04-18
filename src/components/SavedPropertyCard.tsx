
import { Link } from 'react-router-dom';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import UnsaveButton from '@/components/UnsaveButton';

interface SavedPropertyCardProps {
  property: Property;
  onUnsave: () => void;
}

const SavedPropertyCard = ({ property, onUnsave }: SavedPropertyCardProps) => {
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
    <div className="rounded-xl overflow-hidden border border-border bg-white shadow-sm hover-lift">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to={propertyLink}>
          <img 
            src={property.images[0]} 
            alt={property.name}
            className="w-full h-full object-cover"
          />
          {property.featured && (
            <div className="absolute top-3 left-3 bg-gold px-2 py-1 rounded text-xs font-medium text-white">
              Featured
            </div>
          )}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
            property.availability === 'Available' 
              ? 'bg-green-100 text-green-800' 
              : property.availability === 'Limited Availability'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {property.availability}
          </div>
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <Link to={propertyLink} className="block flex-1">
            <h3 className="font-serif font-bold text-lg">{property.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <span>{property.city}, {property.state}</span>
            </div>
          </Link>
          {property.metroRegion && (
            <div className="flex items-center bg-gold/10 text-gold rounded-full px-2 py-1">
              <span className="text-xs font-medium">{property.metroRegion}</span>
            </div>
          )}
        </div>
        
        {/* Floor Plan Types */}
        <div className="my-4 space-y-1">
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
          <div className="flex gap-2">
            <Link 
              to={propertyLink} 
              className="bg-primary text-white text-center py-1 px-3 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View
            </Link>
            <UnsaveButton propertyId={property.id} className="text-xs" onUnsave={onUnsave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPropertyCard;
