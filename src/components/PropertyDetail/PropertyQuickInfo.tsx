
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Home } from 'lucide-react';

interface PropertyQuickInfoProps {
  property: Property;
}

const PropertyQuickInfo = ({ property }: PropertyQuickInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Price Range</h3>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gold" />
            <span className="text-xl font-semibold">
              ${property.priceRange.min.toLocaleString()} - ${property.priceRange.max.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Starting price for available units</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Property Type</h3>
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-gold" />
            <span className="text-xl font-semibold">{property.propertyType}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {property.availability} • Built in {property.yearBuilt}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Contact Info</h3>
          <div className="space-y-2">
            <p className="font-medium">{property.contactInfo.phone}</p>
            <p className="text-sm text-muted-foreground">{property.contactInfo.email}</p>
            {property.petFriendly && (
              <p className="text-sm mt-2">
                <span className="bg-gold/10 text-gold px-2 py-1 rounded-full text-xs">
                  Pet Friendly
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyQuickInfo;
