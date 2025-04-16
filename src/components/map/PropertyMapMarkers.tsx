
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
      /* Create a larger invisible bridge between marker and popup */
      .marker-popup-bridge {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 40px; /* Wider bridge */
        height: 40px; /* Taller bridge */
        background: transparent;
        pointer-events: auto !important;
        z-index: 15;
      }
      
      /* Bridge below popup - extend further down */
      .bridge-bottom {
        bottom: -20px;
      }
      
      /* Bridge above popup - extend further up */
      .bridge-top {
        top: -20px;
      }
      
      /* Add a hover area around the marker for easier interaction */
      .marker {
        position: relative;
      }
      
      .marker::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: transparent;
        border-radius: 50%;
        z-index: -1;
      }
      
      /* Ensure popup and its contents are interactive */
      .property-popup {
        pointer-events: auto !important;
        z-index: 20 !important;
      }
      
      .property-popup-content, 
      .property-popup-content * {
        pointer-events: auto !important;
      }
      
      /* Add a slight transition for smoother hover effects */
      .marker, .mapboxgl-popup {
        transition: transform 0.2s ease, filter 0.2s ease;
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
