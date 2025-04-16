
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
  
  // When dialog closes, ensure markers stay in proper position
  const handleDialogClose = () => {
    setSelectedProperty(null);
    
    // Resize map to ensure markers stay in proper position
    setTimeout(() => {
      if (map) {
        map.resize();
      }
    }, 100);
  };
  
  // Add style element to ensure markers stay fixed
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'marker-position-fix';
    styleEl.textContent = `
      .marker {
        position: absolute !important;
      }
      
      .mapboxgl-popup {
        pointer-events: auto !important;
      }
      
      .mapboxgl-popup-content {
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(styleEl);
    
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
          onClose={handleDialogClose}
        />
      )}
    </>
  );
});

// Add display name for better debugging
PropertyMapMarkers.displayName = 'PropertyMapMarkers';

export default PropertyMapMarkers;
