
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

  // Effect to fix marker positioning when dialog closes
  useEffect(() => {
    // Add global styles to ensure markers remain absolutely positioned
    const styleEl = document.createElement('style');
    styleEl.id = 'marker-position-fix';
    styleEl.textContent = `
      .mapboxgl-marker {
        position: absolute !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Cleanup
    return () => {
      const existingStyle = document.getElementById('marker-position-fix');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
  
  return (
    <>
      {selectedProperty && (
        <PropertyDetailDialog
          property={selectedProperty}
          isOpen={true}
          onClose={() => {
            setSelectedProperty(null);
            // Force reflow to maintain marker positions
            setTimeout(() => {
              if (map) {
                map.resize();
              }
            }, 50);
          }}
        />
      )}
    </>
  );
});

// Add display name for better debugging
PropertyMapMarkers.displayName = 'PropertyMapMarkers';

export default PropertyMapMarkers;
