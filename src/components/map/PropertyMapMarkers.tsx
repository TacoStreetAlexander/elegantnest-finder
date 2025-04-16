
import { useEffect, memo, useState } from 'react';
import { useMapMarkers } from '../../hooks/map';
import mapboxgl from 'mapbox-gl';
import { Property } from '../../types/property';
import PropertyDetailDialog from './PropertyDetailDialog';

interface PropertyMapMarkersProps {
  map: mapboxgl.Map;
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
  isMobile: boolean;
}

const PropertyMapMarkers = memo(({ 
  map, 
  properties, 
  selectedPropertyId, 
  onPropertySelect,
  isMobile
}: PropertyMapMarkersProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Use our custom hook to manage markers
  const { hasAddedMarkers } = useMapMarkers({
    map,
    properties,
    selectedPropertyId,
    onPropertySelect: (id: number) => {
      const property = properties.find(p => p.id === id);
      if (property) {
        setSelectedProperty(property);
      }
      onPropertySelect(id);
    },
    isMobile
  });
  
  // Log marker status for debugging
  useEffect(() => {
    console.log('Marker status updated:', { hasAddedMarkers });
  }, [hasAddedMarkers]);
  
  return (
    <>
      {selectedProperty && (
        <PropertyDetailDialog
          property={selectedProperty}
          isOpen={true}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
});

// Add display name for better debugging
PropertyMapMarkers.displayName = 'PropertyMapMarkers';

export default PropertyMapMarkers;
