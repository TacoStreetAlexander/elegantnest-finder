
import { useEffect, memo, useState, useCallback } from 'react';
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
  
  // Memoize the property select handler to prevent recreating on each render
  const handlePropertySelect = useCallback((id: number) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setSelectedProperty(property);
    }
    onPropertySelect(id);
  }, [properties, onPropertySelect]);
  
  // Use our custom hook to manage markers
  const { hasAddedMarkers } = useMapMarkers({
    map,
    properties,
    selectedPropertyId,
    onPropertySelect: handlePropertySelect,
    isMobile
  });
  
  // Log marker status for debugging
  useEffect(() => {
    console.log('Marker status updated:', { hasAddedMarkers });
  }, [hasAddedMarkers]);
  
  // When dialog closes, ensure markers stay in proper position
  const handleDialogClose = useCallback(() => {
    setSelectedProperty(null);
    
    // Resize map to ensure markers stay in proper position
    setTimeout(() => {
      if (map) {
        map.resize();
      }
    }, 100);
  }, [map]);
  
  // Add enhanced style element to ensure markers and popups interact properly
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'marker-position-fix';
    styleEl.textContent = `
      .marker {
        position: absolute !important;
      }
      
      .mapboxgl-popup {
        pointer-events: auto !important;
        z-index: 20 !important;
      }
      
      .mapboxgl-popup-content {
        pointer-events: auto !important;
        padding: 0 !important;
        overflow: visible !important;
      }
      
      /* Add a larger hover bridge to prevent flickering */
      .marker-popup-bridge {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        background: transparent;
        pointer-events: auto !important;
        z-index: 15;
      }
      
      /* Bridge below popup */
      .bridge-bottom {
        bottom: -15px;
      }
      
      /* Bridge above popup */
      .bridge-top {
        top: -15px;
      }
      
      /* Keep popup contents interactive */
      .property-popup {
        pointer-events: auto !important;
      }
      
      .property-popup-content, 
      .property-popup-content * {
        pointer-events: auto !important;
      }
      
      /* Enhance popup link interaction */
      .popup-link {
        pointer-events: auto !important;
        cursor: pointer !important;
        display: block;
        text-align: center;
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
