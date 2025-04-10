
import { useRef, useState, useEffect, useCallback } from 'react';
import { Property } from '../../types/property';
import { useMapInitialization } from '../../hooks/map';
import MapContainer from './MapContainer';
import MapLoadingIndicator from './MapLoadingIndicator';
import MapErrorState from './MapErrorState';
import MapLegend from './MapLegend';
import PropertyMapMarkers from './PropertyMapMarkers';

interface PropertyMapViewProps {
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
  isComponentMounted: boolean;
  isMobile: boolean;
}

const PropertyMapView = ({ 
  properties, 
  selectedPropertyId, 
  onPropertySelect,
  isComponentMounted,
  isMobile
}: PropertyMapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapRenderAttempts, setMapRenderAttempts] = useState(0);
  
  // Use our map initialization hook
  const { map, mapLoaded, mapError, isInitializing, updateMapboxToken } = useMapInitialization(
    isComponentMounted ? mapContainer : null,
    {
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 10,
      center: [-97.7431, 30.2672], // Default to Austin, TX
      minZoom: 2,
      maxZoom: 18
    }
  );
  
  // Memoize property selection handler to avoid rerenders
  const handlePropertySelect = useCallback((id: number) => {
    onPropertySelect(id);
  }, [onPropertySelect]);
  
  // Force re-render if map fails to load after 5 seconds
  useEffect(() => {
    if (isInitializing && !mapLoaded && mapRenderAttempts < 3) {
      const timer = setTimeout(() => {
        console.log('Map load timeout - retrying initialization');
        setMapRenderAttempts(prev => prev + 1);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isInitializing, mapLoaded, mapRenderAttempts]);
  
  // Hide loading indicator when map is loaded
  useEffect(() => {
    if (mapLoaded && isMapLoading) {
      // Add slight delay to ensure markers are added
      const timer = setTimeout(() => {
        console.log('Map loaded, hiding loading indicator');
        setIsMapLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [mapLoaded, isMapLoading]);
  
  // Show error state if there's a map error
  if (mapError) {
    return <MapErrorState 
      errorMessage={mapError} 
      properties={properties} 
      updateMapboxToken={updateMapboxToken} 
    />;
  }
  
  return (
    <MapContainer>
      <div 
        ref={mapContainer} 
        className="w-full h-full relative" 
        style={{ minHeight: '500px' }} 
        data-testid="map-container"
      />
      
      {/* Only render markers if map is loaded and available */}
      {map && mapLoaded && (
        <PropertyMapMarkers
          map={map}
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          onPropertySelect={handlePropertySelect}
          isMobile={isMobile}
        />
      )}
      
      {(isInitializing || isMapLoading) && <MapLoadingIndicator overlay />}
      {!isMobile && mapLoaded && <MapLegend />}
    </MapContainer>
  );
};

export default PropertyMapView;
