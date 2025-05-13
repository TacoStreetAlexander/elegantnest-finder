
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Property } from '@/types/property';
import { MapPin, Star } from 'lucide-react';
import ResponsiveImage from '../ResponsiveImage';

interface PropertyDetailDialogProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailDialog = ({ property, isOpen, onClose }: PropertyDetailDialogProps) => {
  // Format price as $X,XXX
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif">{property.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin size={16} className="mr-1" />
            <span>{property.address}, {property.city}, {property.state}</span>
          </div>
          
          {/* Featured Badge */}
          {property.featured && (
            <div className="flex items-center text-gold">
              <Star className="w-4 h-4 fill-gold mr-1" />
              <span className="text-sm font-medium">Featured Property</span>
            </div>
          )}
          
          {/* Floor Plans */}
          <div className="space-y-2">
            <h3 className="font-medium">Available Floor Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.floorPlans.map((plan, index) => (
                <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                  <div className="font-medium mb-1">{plan.name}</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Bedrooms: {plan.bedrooms}</div>
                    <div>Bathrooms: {plan.bathrooms}</div>
                    <div>Sq Ft: {plan.squareFeet}</div>
                    <div className="font-medium text-foreground">
                      Price: {formatPrice(plan.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Property Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-secondary rounded-full text-xs"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="font-medium">Contact Information</h3>
            <div className="text-sm space-y-1">
              <div>Phone: {property.contactInfo.phone}</div>
              <div>Email: {property.contactInfo.email}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailDialog;
