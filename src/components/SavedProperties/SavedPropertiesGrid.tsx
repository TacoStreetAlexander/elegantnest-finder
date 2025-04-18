
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Property } from '@/types/property';
import SavedPropertyCard from '@/components/SavedPropertyCard';

interface SavedPropertiesGridProps {
  properties: Property[];
  onUnsave: (propertyId: number) => void;
}

export const SavedPropertiesGrid = ({ properties, onUnsave }: SavedPropertiesGridProps) => {
  return (
    <div className="container-custom py-12">
      <div className="mb-6">
        <Link to="/properties">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <SavedPropertyCard 
            key={property.id} 
            property={property} 
            onUnsave={() => onUnsave(property.id)}
          />
        ))}
      </div>
    </div>
  );
};
