
import { Property } from '@/types/property';
import MapPropertyCard from '@/components/MapPropertyCard';

interface PropertyListProps {
  properties: Property[];
  selectedProperty: number | null;
  onSelect: (id: number) => void;
}

const PropertyList = ({ properties, selectedProperty, onSelect }: PropertyListProps) => {
  return (
    <>
      <div className="text-sm text-muted-foreground mb-1 px-1">
        {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
      </div>
      <div className="grid grid-cols-1 gap-2">
        {properties.map((property) => (
          <MapPropertyCard 
            key={property.id} 
            property={property} 
            isSelected={selectedProperty === property.id} 
            onSelect={() => onSelect(property.id)}
          />
        ))}
      </div>
    </>
  );
};

export default PropertyList;
