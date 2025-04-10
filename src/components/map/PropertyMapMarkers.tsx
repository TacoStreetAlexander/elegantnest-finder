
import { useEffect, memo } from 'react';
import { useMapMarkers } from '../../hooks/map';
import mapboxgl from 'mapbox-gl';
import { Property } from '../../types/property';

interface PropertyMapMarkersProps {
  map: mapboxgl.Map;
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
  isMobile: boolean;
}

/**
 * Component responsible for rendering property markers on the map
 * Memoized to prevent unnecessary re-renders
 */
const PropertyMapMarkers = memo(({ 
  map, 
  properties, 
  selectedPropertyId, 
  onPropertySelect,
  isMobile
}: PropertyMapMarkersProps) => {
  // Log component props for debugging
  useEffect(() => {
    console.log('PropertyMapMarkers rendering with:', {
      mapAvailable: !!map,
      propertiesCount: properties.length,
      selectedProperty: selectedPropertyId,
      isMobile
    });
  }, [map, properties.length, selectedPropertyId, isMobile]);
  
  // Use our custom hook to manage markers
  const { hasAddedMarkers } = useMapMarkers({
    map,
    properties,
    selectedPropertyId,
    onPropertySelect,
    isMobile
  });
  
  // Log marker status for debugging
  useEffect(() => {
    console.log('Marker status updated:', { hasAddedMarkers });
  }, [hasAddedMarkers]);
  
  // This component doesn't render anything visible
  return null;
});

// Add display name for better debugging
PropertyMapMarkers.displayName = 'PropertyMapMarkers';

export default PropertyMapMarkers;
